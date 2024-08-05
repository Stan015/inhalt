<script setup lang="ts">
import { useUserStore } from "../store/userStore";
// import { useArticlesStore } from '../store/articlesStore';
import type { Article, Comment } from "~/types/tables.types";

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
// const articlesStore = useArticlesStore();

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

      console.log(comment);

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
          
          // console.log(
          //   "test from commentBox component",
          //   articleComments.value, commentInfo
          // );
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

    const commentedBy = userStore.userCredentials.username;
    const commentedAt = new Date().toISOString();

    // console.log(commentMarkdownContent, commentedBy, commentedAt);

    const comments = articleComments.value;
    comments.push({
      comment: commentMarkdownContent,
      commented_by: commentedBy!,
      commented_at: commentedAt,
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
  <section class="w-full">
    <div
      v-if="convertedArticleComments.length > 0"
      class="w-full"
    >
      <h2>Comments:</h2>
      <div class=" flex flex-col gap-4">
        <div
          v-for="comment in convertedArticleComments"
          :key="comment.commented_at"
          class="w-full h-max rounded-2xl border p-4 border-white"
        >
          <ProfileCard
            user-profile-link="/stan015"
            name="Stanley Azi"
            occupation="Frontend Developer"
            profile-photo-src="/img2.png"
            class-name="profile-card"
          />
          <div v-html="comment.comment" :class="`${markdownClassName}`"></div>
          <div class="flex gap-4 cursor-default">
            <button type="button" aria-labelledby="likes">
              <Icon name="mdi:heart-outline" />
            </button>
            <button type="button" aria-labelledby="comments">
              <Icon name="uil:comment" />
            </button>
          </div>
          <p>{{ comment.commented_at }}</p>
        </div>
      </div>
    </div>
    <form
      @submit.prevent="handleComment"
      class="flex flex-col w-full justify-center items-center mt-6 gap-2"
    >
      <h4 class="text-md font-bold">Write a comment</h4>
      <MarkdownEditor
        box-height="300px"
        class-name="w-[35rem]"
        ref="markdownCommentEditor"
      />
      <button type="submit">Comment</button>
    </form>
  </section>
</template>
