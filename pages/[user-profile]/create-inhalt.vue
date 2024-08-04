<script setup lang="ts">
import { useUserStore } from "../../store/userStore";

const coverImg = ref<HTMLInputElement | null>(null);
const articleTitle = ref("");

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

    try {
      const response = await $fetch("/api/articles/create-article", {
        method: "post",
        body: formData,
      });

      console.log(response);

      if (response.statusCode === 200) {
        alert("Article created successfully!");
      } else {
        alert("Error creating article.");
      }
    } catch (error) {
      console.error("Error creating article:", (error as Error).message);
      alert("Error creating article.");
    }
  }
};
</script>


<template>
  <section class="w-full min-h-main flex gap-4 py-6 px-[12%]  text-primary dark:text-secondar">
    <article>
      <h1 class="  text-primary dark:text-secondary">Write A New Article</h1>
      <form @submit.prevent="submitPost" class="flex flex-col gap-6">
        <input type="file" ref="coverImg" placeholder="Upload cover image" />
        <input
          type="text"
          v-model="articleTitle"
          placeholder="Article title"
          required
        />
        <MarkdownEditor
          box-height="500px"
          class-name="w-full"
          ref="markdownEditor"
        />
        <button type="submit">Submit</button>
      </form>
    </article>
    <!-- <aside class="flex flex-col gap-6 w-[20rem] h-full">
      <section class="w-full h-max bg-white rounded-2xl p-4">
        <h2>Promotion</h2>
        <div class="w-full h-[20rem]"></div>
      </section>
      <section class="w-full h-max bg-white rounded-2xl p-4">
        <h2>Hot Trends <Icon name="fluent-emoji-flat:fire" /></h2>
        <div class="w-full h-[25rem]">
          <h3>Rendering images the good way</h3>
          <h3>18 tools to master Nuxt</h3>
          <h3>Vue is getting super fun!</h3>
          <h3>Iconify + Nuxt</h3>
          <h3>Next vs Nuxt</h3>
        </div>
      </section>
    </aside> -->
  </section>
</template>
