<script setup lang="ts">
import type { Article } from "~/types/tables.types";

import { useUserStore } from "../../store/userStore";
import { useCreateInhaltStore } from "~/store/articlesStore";
import { useSaveAlgoliaRecord } from "~/composables/algolia/useSaveAlgoliaRecord";

const coverImg = ref<HTMLInputElement | null>(null);
const convertedCoverImgFile = ref<string | null>(null);
const createdArticleData = ref<Article | null>(null);
const articleTitle = ref<string>("");
const isLoading = ref(false);

const userStore = useUserStore();

const markdownEditor = ref<{
  getMarkdown: () => string;
  getHTML: () => string;
} | null>(null);

const submitPost = async () => {
  const selectedCreateTags = useCreateInhaltStore().selectedCreateTags;
  const selectedTagsIsExcess = ref(false);
  const noSelectedTags = ref(true);
  const selectedTagsIsBelowMinimum = ref(false);

  if (selectedCreateTags.length > 0) noSelectedTags.value = false;

  if (selectedCreateTags.length > 4) {
    selectedTagsIsExcess.value = true;
    alert("You can only select 4 tags.");
    return;
  }

  if (selectedCreateTags.length < 3) {
    selectedTagsIsBelowMinimum.value = true;
    alert("Select at least 3 tags.");
    return;
  }

  if (
    markdownEditor.value &&
    !noSelectedTags.value &&
    !selectedTagsIsBelowMinimum.value &&
    !selectedTagsIsExcess.value
  ) {
    isLoading.value = true;

    const markdownContent = markdownEditor.value.getMarkdown();
    // const htmlContent = markdownEditor.value?.getHTML();
    const title = articleTitle.value;
    const coverImageFile = coverImg.value?.files?.[0];
    const submittedAt = new Date().toISOString();
    const userId = userStore.userCredentials.user_id;
    const username = userStore.userCredentials.username;
    const avatar = userStore.userCredentials.avatar;
    const fullName = userStore.userCredentials.fullName;
    const occupation = userStore.userCredentials.occupation;
    const email = userStore.userCredentials.email;

    const formData = new FormData();

    if (coverImageFile) {
      formData.append("cover_img", coverImageFile as Blob);
    }
    formData.append("article_title", title);
    formData.append("markdown_content", markdownContent);
    // formData.append("html_content", htmlContent);
    formData.append("submitted_at", submittedAt);
    formData.append("user_id", userId!);
    formData.append("username", username!);
    formData.append("author_fullname", fullName!);
    formData.append("author_occupation", occupation!);
    formData.append("author_avatar", avatar!);
    formData.append("author_email", email!);
    formData.append("article_tags", `{${selectedCreateTags.join(",")}}`!);

    try {
      const response = await $fetch<{ body: Article; statusCode: number }>(
        "/api/articles/create-article",
        {
          method: "post",
          body: formData,
        }
      );

      console.log(response);

      if (response.statusCode === 200) {
        const data = response.body;
        const article_title = data.title;
        const article_id = data.id;
        const author_username = data.author_username;

        alert("Article created successfully!");

        useCreateInhaltStore().selectedCreateTags = [];

        createdArticleData.value = data;

        navigateTo(
          `/${author_username}/articles/${article_id}--${article_title
            .replace(/\s+/g, "-")
            .toLowerCase()}`
        );
      } else {
        alert("Error creating article.");
      }
    } catch (error) {
      console.error("Error creating article:", (error as Error).message);
      alert("Error creating article.");
    } finally {
      isLoading.value = false;
    }
  }
};

// save article data to algolia
watch(createdArticleData, (newArticle) => {
  if (newArticle) {
    useSaveAlgoliaRecord({
      title: newArticle.title,
      author_username: newArticle.author_username,
      author_fullname: newArticle.author_fullname,
      author_occupation: newArticle.author_occupation,
      cover_image_url: newArticle.cover_image_url,
    }, "inhalt_articles");
  }
});

const handleImagePreview = (file: File) => {
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onloadend = () => {
    convertedCoverImgFile.value = reader.result as string;
  };
};

const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) {
    handleImagePreview(file);
  }
};
</script>

<template>
  <section
    class="w-full min-h-main flex gap-4 py-6 px-[12%] text-primary dark:text-secondary max-md:px-[7%]"
  >
    <article
      class="w-full px-[1.8rem] lg:px-[2.3rem] h-full flex flex-col items-center gap-6"
    >
      <h1
        class="text-[1.5rem] font-bold border-b border-b-accent text-primary dark:text-secondary"
      >
        Write A New Article
      </h1>
      <form
        @submit.prevent="submitPost"
        class="flex flex-col gap-6 justify-center items-center"
      >
        <input
          class="w-[20rem] h-10 text-center pt-[0.2rem] pl-1 bg-accent file:border-secondary file:rounded-2xl text-secondary dark:text-white rounded-3xl outline-none border-2 border-accent transition-all hover:border-secondary focus:border-accent"
          type="file"
          @change="onFileChange"
          ref="coverImg"
          accept="image/*"
          title="Upload cover image"
        />
        <div v-if="convertedCoverImgFile">
          <img
            class="w-full max-h-[18rem]"
            :src="convertedCoverImgFile"
            alt="Image Preview"
          />
        </div>
        <input
          type="text"
          v-model="articleTitle"
          placeholder="Article title"
          required
          class="w-full max-w-full h-12 rounded-3xl p-4 pl-10 bg-white text-primary dark:text-primary text-[1.2rem] text-center font-medium outline-none border-2 border-white transition-all hover:border-accent focus:border-accent"
        />
        <MarkdownEditor
          box-height="500px"
          class-name="w-full bg-white text-primary dark:text-primary rounded-xl overflow-scroll max-md:w-[30rem] max-lg:w-[32rem] max-sm:w-[20rem]"
          ref="markdownEditor"
        />
        <CreateInhaltTags />
        <button
          class="w-[8.5rem] text-center bg-accent rounded-2xl px-4 py-2 text-secondary dark:text-secondary transition-all hover:translate-x-2 hover:translate-y-1"
          type="submit"
        >
          <span v-if="isLoading" class="flex items-center gap-2"
            >Publishing <Icon name="line-md:uploading-loop"
          /></span>
          <span v-else>Publish</span>
        </button>
      </form>
    </article>
  </section>
</template>
