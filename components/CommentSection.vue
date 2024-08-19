<script setup lang="ts">
import type { Article, Comment } from "~/types/tables.types";
import { useUserStore } from "../store/userStore";
import formatDateTime from "~/utils/formatDateTime";

const props = defineProps({
  markdownClassName: String,
  id: String,
});

const supabase = useSupabaseClient<Article>();

const route = useRoute();
const { id: articleId } = route.params;

const markdownCommentEditor = ref<{
  getMarkdown: () => string;
  getHTML: () => string;
} | null>(null);

const userStore = useUserStore();
const username = userStore.userCredentials.username;

const articleComments = ref<Array<Comment>>([]);
const isNewCommentAdded = ref(false);
const convertedArticleComments = ref<Array<Comment>>([]);

// Fetch the existing comments
const handleFetchExistingComments = async () => {
  try {
    const { data: articleData, error } = await supabase
      .from("articles")
      .select("comments")
      .eq("id", articleId)
      .single();

    if (error) throw new Error(error.message);

    if (articleData && articleData.comments) {
      articleComments.value = [...(articleData.comments as Comment[])];
      convertedArticleComments.value = [...articleComments.value];

      convertedArticleComments.value.forEach(async (commentInfo) => {
        const convertedComment = { ...commentInfo };
        const { date, time } = formatDateTime(convertedComment.commented_at);
        commentInfo.formatedDate = date;
        commentInfo.formatedTime = time;

        try {
          const { data: response } = await useAsyncData(() =>
            $fetch<{ html: string }>(
              "/api/articles/convert-markdown-to-content",
              {
                method: "POST",
                body: { markdown: convertedComment.comment },
              }
            )
          );

          convertedComment.comment =
            response.value?.html || convertedComment.comment;
        } catch (conversionError) {
          console.error("Error converting markdown comment:", conversionError);
        }

        return convertedComment;
      });

      console.log(
        convertedArticleComments.value,
        "Converted",
        articleComments.value,
        "Original"
      );
    }

    isNewCommentAdded.value = false;
  } catch (error) {
    console.error("Error fetching article comments:", (error as Error).message);
  }
};

const handleComment = async () => {
  if (markdownCommentEditor.value) {
    const commentMarkdownContent = markdownCommentEditor.value.getMarkdown();

    const { username, fullName, avatar } = userStore.userCredentials;
    const commentedAt = new Date().toISOString();

    const newComment: Comment = {
      comment: commentMarkdownContent,
      commented_by: {
        username: username!,
        full_name: fullName!,
        avatar: avatar!,
      },
      commented_at: commentedAt,
    };

    articleComments.value.push(newComment);

    try {
      const { data: updateData, error: updateError } = await supabase
        .from("articles")
        .update({ comments: articleComments.value })
        .eq("id", articleId)
        .select("comments");

      if (updateError) throw new Error(updateError.message);

      articleComments.value = updateData[0].comments as Comment[];
      isNewCommentAdded.value = true;
      console.log("Successfully added comment", updateData[0].comments);
    } catch (updateError) {
      console.error("Error adding comment:", updateError);
    }
  }
};

// delete comment
const commentDeleted = ref(false);
const commentEdited = ref(false);

const deleteComment = async (commentIndex: number) => {
  try {
    articleComments.value.splice(commentIndex, 1);

    const { data: updateData, error: updateError } = await supabase
      .from("articles")
      .update({ comments: articleComments.value })
      .eq("id", articleId)
      .select("comments");

    if (updateError) throw new Error(updateError.message);

    articleComments.value = updateData[0].comments as Comment[];
    convertedArticleComments.value = [...articleComments.value];

    commentDeleted.value = true;
    // console.log("Comment deleted successfully", updateData[0].comments);
  } catch (error) {
    console.error("Error deleting comment:", (error as Error).message);
  } finally {
    commentDeleted.value = false;
  }
};
//

// edit comment
const isEditingComment = ref(false);
const isSavingEditedComment = ref(false);
const indexOfCommentToEdit = ref<number | null>(null);
const currentCommentContent = ref<string | null>(null);
const markdownCommentEditorForEdit = ref<{
  getMarkdown: () => string;
  getHTML: () => string;
} | null>(null);

const startEditingComment = (index: number, commentContent: string) => {
  indexOfCommentToEdit.value = index;
  currentCommentContent.value = commentContent;
  isEditingComment.value = true;
};

const saveEditedComment = async () => {
  if (
    !markdownCommentEditorForEdit.value ||
    indexOfCommentToEdit.value === null
  )
    return;

  isSavingEditedComment.value = true;

  const updatedCommentMarkdown =
    markdownCommentEditorForEdit.value.getMarkdown();

  if (articleComments.value[indexOfCommentToEdit.value]) {
    articleComments.value[indexOfCommentToEdit.value].comment =
      updatedCommentMarkdown;
  }

  try {
    const { data: updateData, error: updateError } = await supabase
      .from("articles")
      .update({ comments: articleComments.value })
      .eq("id", articleId)
      .select("comments");

    if (updateError) throw new Error(updateError.message);

    articleComments.value = updateData[0].comments as Comment[];
    isEditingComment.value = false;
    indexOfCommentToEdit.value = null;
  } catch (updateError) {
    console.error("Error saving edited comment:", updateError);
  } finally {
    isSavingEditedComment.value = false;
    isEditingComment.value = false;
  }
};

const cancelEditingComment = () => {
  isEditingComment.value = false;
  indexOfCommentToEdit.value = null;
  currentCommentContent.value = null;
};

onMounted(() => {
  handleFetchExistingComments();
});

watch(
  [isNewCommentAdded, commentDeleted],
  () => {
    if (isNewCommentAdded.value) {
      handleFetchExistingComments();
    }
  },
  { immediate: true }
);
</script>

<template>
  <section class="w-full rounded-2xl" :id="id">
    <div v-if="convertedArticleComments.length > 0" class="w-full">
      <h2 class="w-full border-b border-b-accent mb-4 mt-5">Comments:</h2>
      <div class="flex flex-col gap-4 rounded-2xl dark:text-primary">
        <div
          v-for="(comment, index) in convertedArticleComments"
          :key="comment.commented_at"
          class="w-full h-max rounded-2xl border p-4 border-white bg-white"
        >
          <div
            class="w-dull border-b mb-2 grid grid-cols-3 justify-between items-center gap-4"
          >
            <ProfileCard
              :user-profile-link="`/${comment.commented_by.username}`"
              :name="`${comment.commented_by.full_name}`"
              :occupation="`${comment.commented_by.occupation}`"
              :profile-photo-src="`${comment.commented_by.avatar}`"
              class-name="profile-card w-max mb-1"
            />

            <div
              class="flex gap-6 w-max h-max !text-primary dark:!text-primary place-self-center"
              v-if="comment.commented_by.username === username"
            >
              <button
                @click="deleteComment(index)"
                class="flex items-center justify-center h-[1.6rem] w-[1.6rem] rounded-3xl border-b-2 dark:border-dark max-md:dark:border-light hover:border-accent transition-all"
              >
                <Icon name="fluent:delete-48-filled" />
              </button>
              <!-- <button
                class="flex items-center justify-center h-[1.6rem] w-[1.6rem] rounded-3xl border-b-2 dark:border-dark max-md:dark:border-light hover:border-accent transition-all"
                @click="
                  startEditingComment(index, articleComments[index].comment)
                "
              >
                <Icon name="iconamoon:edit-bold" />
              </button> -->
            </div>

            <span class="flex flex-col justify-end !mb-2 items-end  col-end-4">
              <p class="!mb-0 !text-[0.6rem]">{{ comment?.formatedTime }}</p>
              <p class="!mb-0 !text-[0.6rem]">{{ comment?.formatedDate }}</p>
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
        <!-- <div
          v-if="isEditingComment"
          class="fixed inset-0 bg-black/[0.7] flex items-center justify-center z-40"
        >
          <div class="w-max flex flex-col gap-2">
            <MarkdownEditor
              box-height="300px"
              class-name="w-[35rem] max-sm:w-[20rem] max-lg:w-[22rem] overflow-scroll bg-white rounded-2xl"
              ref="markdownCommentEditorForEdit"
            />

            <div class="w-max self-end flex gap-2">
              <button
                class="w-max bg-white rounded-2xl px-4 py-2 text-primary dark:text-primary transition-all hover:translate-x-2 hover:translate-y-1"
                type="button"
                @click="cancelEditingComment"
              >
                cancel
              </button>
              <button
                class="w-max bg-accent rounded-2xl px-4 py-2 text-secondary dark:text-secondary transition-all hover:translate-x-2 hover:translate-y-1"
                type="button"
                @click="
                  saveEditedComment
                "
              >
                save
              </button>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="flex flex-col w-full justify-center items-center mt-6">
      <form
        @submit.prevent="handleComment"
        class="flex flex-col w-max justify-center items-center gap-4"
      >
        <h4 class="text-md font-bold w-full border-b border-b-accent">
          Write a comment
        </h4>
        <MarkdownEditor
          box-height="300px"
          class-name="w-[35rem] max-sm:w-[20rem] max-lg:w-[22rem] overflow-scroll bg-white rounded-2xl"
          ref="markdownCommentEditor"
        />
        <button
          class="bg-accent rounded-2xl px-4 py-2 text-secondary dark:text-secondary transition-all hover:translate-x-2 hover:translate-y-1"
          type="submit"
        >
          Comment
        </button>
      </form>
    </div>
  </section>
</template>
