<script setup lang="ts">
import type { Article, Comment } from "~/types/tables.types";

import { useUserStore } from "../store/userStore";
import formatDateTime from "~/utils/formatDateTime";

const props = defineProps({
  markdownClassName: String,
});

const supabase = useSupabaseClient<Article>();

const route = useRoute();
const { id: articleId } = route.params;

const markdownCommentEditor = ref<{
  getMarkdown: () => string;
  getHTML: () => string;
} | null>(null);

const userStore = useUserStore();

const articleComments = ref<Array<Comment>>([]);
const isNewCommentAdded = ref(false);
const convertedArticleComments = ref<Array<Comment>>([]);

// Fetch the existing comments
const handleFetchExistingComments = async () => {
  const { data: articleData, error } = await supabase
    .from("articles")
    .select("comments")
    .eq("id", articleId)
    .single();

  if (error) {
    console.error("Error fetching article:", error.message);
    return;
  }

  if (articleData && articleData.comments) {
    articleComments.value = articleData.comments as Comment[];

    articleComments.value.forEach(async (commentInfo) => {
      const comment = commentInfo.comment;

      const { date, time } = formatDateTime(commentInfo.commented_at);
      commentInfo.formatedDate = date;
      commentInfo.formatedTime = time;

      try {
        const response = await useAsyncData(() =>
          $fetch<{ html: string }>(
            "/api/articles/convert-markdown-to-content",
            {
              method: "POST",
              body: { markdown: comment },
            }
          )
        );

        if (response) {
          commentInfo.comment = response.data.value?.html!;
          convertedArticleComments.value = articleComments.value;
        }
      } catch (error) {
        console.error("Error converting markdown comment:", error);
      }
    });
  }

  isNewCommentAdded.value = false;
};

const handleComment = async () => {
  if (markdownCommentEditor.value) {
    const commentMarkdownContent = markdownCommentEditor.value?.getMarkdown();
    // const commentHtmlContent = markdownEditor.value?.getHTML();

    const username = userStore.userCredentials.username;
    const userFullName = userStore.userCredentials.fullName;
    const userAvatar = userStore.userCredentials.avatar;
    const commentedAt = new Date().toISOString();

    const comments = articleComments.value;
    comments.push({
      comment: commentMarkdownContent,
      commented_by: {
        username: username!,
        full_name: userFullName!,
        avatar: userAvatar!,
      },
      commented_at: commentedAt!,
    });

    // Update the article with new comments on db
    const { error: updateError } = await supabase
      .from("articles")
      .update({ comments })
      .eq("id", articleId);

    if (updateError) {
      console.error("Error adding comment:", updateError);
    } else {
      isNewCommentAdded.value = true;
      console.log("Comment added successfully");
    }
  }
};

onMounted(() => {
  handleFetchExistingComments();
});

watch(isNewCommentAdded, () => handleFetchExistingComments(), {
  immediate: true,
});
</script>

<template>
  <section class="w-full rounded-2xl">
    <div v-if="convertedArticleComments.length > 0" class="w-full">
      <h2 class="w-full border-b border-b-accent mb-4 mt-5">Comments:</h2>
      <div class="flex flex-col gap-4 rounded-2xl dark:text-primary">
        <div
          v-for="comment in convertedArticleComments"
          :key="comment.commented_at"
          class="w-full h-max rounded-2xl border p-4 border-white bg-white"
        >
          <div class="w-dull border-b mb-2 flex justify-between gap-4">
            <ProfileCard
              :user-profile-link="`/${comment.commented_by.username}`"
              :name="`${comment.commented_by.full_name}`"
              :occupation="`${comment.commented_by.occupation}`"
              :profile-photo-src="`${comment.commented_by.avatar}`"
              class-name="profile-card w-max mb-1"
            />

            <span class="flex flex-col justify-end !mb-2 items-end">
              <p class="!mb-0 !text-[0.8rem]">{{ comment?.formatedDate }}</p>
              <p class="!mb-0 !text-[0.8rem]">{{ comment?.formatedTime }}</p>
            </span>
          </div>

          <div
            v-html="comment.comment"
            :class="`${props.markdownClassName}`"
          ></div>
          <div class="flex gap-4 cursor-default">
            <button type="button" aria-labelledby="likes">
              <Icon name="mdi:heart-outline" />
            </button>
            <button type="button" aria-labelledby="comments">
              <Icon name="uil:comment" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col w-full justify-center items-center mt-6">
      <form
        @submit.prevent="handleComment"
        class="flex flex-col w-max justify-center items-center gap-4"
      >
        <h4 class="text-md font-bold w-full border-b border-b-accent">Write a comment</h4>
        <MarkdownEditor
          box-height="300px"
          class-name="w-[35rem] bg-white rounded-2xl"
          ref="markdownCommentEditor"
        />
        <button class="bg-accent rounded-2xl px-4 py-2 text-secondary dark:text-secondary transition-all hover:translate-x-2 hover:translate-y-1" type="submit">Comment</button>
      </form>
    </div>
  </section>
</template>
