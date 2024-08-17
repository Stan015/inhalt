<script setup lang="ts">
import type { Article } from "~/types/tables.types";

import { useUserStore } from "../../store/userStore";

const coverImg = ref<HTMLInputElement | null>(null);
const convertedCoverImgFile = ref<string | null>(null);
const articleTitle = ref<string>("");

const userStore = useUserStore();

const markdownEditor = ref<{
  getMarkdown: () => string;
  getHTML: () => string;
} | null>(null);

const submitPost = async () => {
  if (markdownEditor.value) {
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
    }
  }
};

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
    <article class="w-full h-full flex flex-col items-center gap-6">
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
          class="w-full h-12 rounded-3xl p-4 pl-10 bg-white text-primary dark:text-primary text-[1.2rem] text-center font-medium outline-none border-2 border-white transition-all hover:border-accent focus:border-accent"
        />
        <MarkdownEditor
          box-height="500px"
          class-name="w-full bg-white text-primary dark:text-primary rounded-xl overflow-scroll max-md:w-[30rem] max-lg:w-[32rem] max-sm:w-[20rem]"
          ref="markdownEditor"
        />
        <button
          class="bg-accent rounded-2xl px-4 py-2 text-secondary dark:text-secondary transition-all hover:translate-x-2 hover:translate-y-1"
          type="submit"
        >
          Publish
        </button>
      </form>
    </article>
  </section>
</template>
