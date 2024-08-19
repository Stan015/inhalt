<script setup lang="ts">
import type { Article } from "~/types/tables.types";

import formatDateTime from "~/utils/formatDateTime";
import { useArticleReadTracker } from "~/composables/useArticleReadTracker";

const article = ref<Article | null>(null);
const isLoading = ref(true);

const route = useRoute();
const articleId = parseInt(route.params.id as string, 10) || undefined;
const articleTitle = (route.params.title as string) || undefined;

const fetchArticle = async () => {
  if (!articleId || !articleTitle) {
    console.error("Article ID or title is missing.");
    return;
  }

  isLoading.value = true;

  try {
    const response = await $fetch<Article>(
      `/api/articles/fetch-single-article?id=${articleId}&title=${articleTitle}`
    );

    if (response) {
      article.value = response;
      const { date, time } = formatDateTime(response.created_at);
      article.value.formattedDate = date;
      article.value.formattedTime = time;
    }
  } catch (error) {
    console.error("Error fetching article:", error);
  } finally {
    isLoading.value = false;
  }
};

const { scrollDepth, timeSpent } = useArticleReadTracker(articleId!);
console.log(scrollDepth.value, timeSpent.value);

onMounted(() => {
  fetchArticle();
});

watch(
  () => route.params,
  () => {
    fetchArticle();
  },
  { immediate: true }
);
</script>

<template>
  <div class="w-full min-h-main flex gap-4 py-6 px-[12%] max-md:px-[7%]">
    <main
      class="flex flex-col gap-6 w-3/4 max-lg:w-[65%] max-md:w-full h-full pb-6"
    >
      <section
        class="rendered-markdown-content-container w-full flex flex-col gap-4"
      >
        <article
          class="w-full h-max rounded-2xl border border-white relative overflow-hidden"
        >
          <NuxtImg
            v-if="article?.cover_image"
            :src="article?.cover_image_url"
            :alt="`cover photo of ${article?.title}`"
            class="w-full !max-h-[17rem] !max-sm:max-h-[11rem] !mb-0 block"
          />
          <div
            class="w-full h-max bg-white text-primary dark:text-primary p-4 border-b"
          >
            <h1
              class="w-full text-center font-bold !text-[1.5rem] max-sm:!text-[1.2rem]"
            >
              {{ article?.title }}
            </h1>
            <div class="grid grid-cols-3 justify-between gap-4">
              <div class="flex flex-col justify-end">
                <p class="!mb-0 w-max !text-[0.6rem] max-sm:!text-[0.5rem]">
                  {{ article?.formattedTime }}
                </p>
                <p class="!mb-0 w-max !text-[0.6rem] max-sm:!text-[0.5rem]">
                  {{ article?.formattedDate }}
                </p>
                <p class="!mb-0 w-max !text-[0.6rem] max-sm:!text-[0.5rem]">
                  10 min read
                </p>
              </div>
              <div
                class="flex gap-4 cursor-default w-full justify-center items-end h-max place-self-end"
              >
                <LikeButton v-if="article" :article-id="article.id" />
                <CommentButton v-if="article" :article-id="article?.id" />
                <BookmarkButton v-if="article" :article-id="article?.id" />
                <ShareButton
                  v-if="article"
                  :article-id="article?.id"
                  :title="article?.title"
                  :author-username="article?.author_username"
                />
              </div>
              <ProfileCard
                :user-profile-link="`${article?.author_username}`"
                :name="`${article?.author_fullname}`"
                :occupation="`${article?.author_occupation}`"
                :profilePhotoSrc="`${article?.author_avatar}`"
                class-name="profile-card items-end dark:text-primary justify-end"
              />
            </div>
          </div>
          <div class="flex flex-col gap-2 p-4 bg-white dark:text-primary">
            <MarkdownRenderer :content="article?.markdown_content!" />
          </div>
          <div
            class="flex items-end p-4 border-t bg-white dark:text-primary justify-between gap-6"
          >
            <ProfileCard
              :user-profile-link="`${article?.author_username}`"
              :authorTag="true"
              :name="`${article?.author_fullname}`"
              :occupation="`${article?.author_occupation}`"
              :profilePhotoSrc="`${article?.author_avatar}`"
              class-name="profile-card"
            />
            <div class="flex gap-4 cursor-default h-max">
              <LikeButton v-if="article" :article-id="article.id" />
              <CommentButton v-if="article" :article-id="article.id" />
              <BookmarkButton v-if="article" :article-id="article.id" />
              <ShareButton
                v-if="article"
                :article-id="article?.id"
                :title="article?.title"
                :author-username="article?.author_username"
              />
            </div>
            <div class="flex flex-col justify-end items-end">
              <p class="!mb-0 w-max !text-[0.6rem] max-sm:!text-[0.5rem]">
                {{ article?.formattedTime }}
              </p>
              <p class="!mb-0 w-max !text-[0.6rem] max-sm:!text-[0.5rem]">
                {{ article?.formattedDate }}
              </p>
              <p class="!mb-0 w-max !text-[0.6rem] max-sm:!text-[0.5rem]">
                10 min read
              </p>
            </div>
          </div>
        </article>
        <CommentSection markdown-class-name="comment-section" id="comments" />
      </section>
      <section>
        <h2 class="font-bold text-md w-full border-b border-b-accent mb-4 mt-5">
          Related inhalts
        </h2>
        <article
          class="w-full h-max flex rounded-2xl border border-white relative overflow-hidden max-md:flex-col"
        >
          <NuxtLink
            to=""
            class="w-[8rem] min-h-full max-md:max-h-[7rem] overflow-hidden max-md:w-full"
          >
            <NuxtImg
              src="/img1.png"
              alt="cover photo"
              class="w-full h-full object-cover"
            />
          </NuxtLink>
          <div
            class="!w-full h-max max-h-[9rem] bg-white p-4 dark:text-primary"
          >
            <NuxtLink to="" class="w-full h-max !mb-1 max-md:w-full !text-center text-sm flex justify-center">
              Mastering ChatGPT Blog Creation: Dos and Don'ts for SaaS Marketing
              Managers
            </NuxtLink>
            <div class="flex items-end justify-between gap-2">
              <div
                class="!mb-0 flex flex-nowrap max-sm:flex-col gap-1 !text-[0.6rem] max-sm:!text-[0.5rem]"
              >
                <span class="text-nowrap">Jul 9</span>
                <span class="text-nowrap">10 min read</span>
              </div>

              <div class="flex gap-4 cursor-default h-max">
                <LikeButton />
                <CommentButton />
                <BookmarkButton />
                <ShareButton />
              </div>

              <ProfileCard
                user-profile-link="/Stan015"
                name="Stanley Azi"
                occupation="Frontend Developer"
                profile-photo-src="/img2.png"
                class-name="profile-card items-end"
              />
            </div>
          </div>
        </article>
      </section>
    </main>
    <aside
      class="flex flex-col justify-between gap-4 min-w-[15rem] h-max min-h-[calc(100svh-8rem)] text-primary dark:text-primary max-md:absolute max-md:w-[20rem] max-md:right-[7%] max-md:hidden"
    >
      <section class="w-full h-[20rem] bg-white rounded-2xl p-4">
        <h2 class="w-full border-b border-b-accent">Promotion</h2>
        <div class="w-full h-[20rem]"></div>
      </section>

      <section class="w-full h-[20rem] bg-white rounded-2xl p-4 mb-4">
        <h2 class="w-full border-b border-b-accent">
          Hot Trends <Icon name="fluent-emoji-flat:fire" />
        </h2>
        <div class="w-full h-max overflow-y-scroll flex flex-col gap-2">
          <NuxtLink
            to=""
            class="border-b hover:border-b-accent rounded-xl text-[0.8rem] px-2"
            >Rendering images the good way</NuxtLink
          >
          <NuxtLink
            to=""
            class="border-b hover:border-b-accent rounded-xl text-[0.8rem] px-2"
            >18 tools to master Nuxt</NuxtLink
          >
          <NuxtLink
            to=""
            class="border-b hover:border-b-accent rounded-xl text-[0.8rem] px-2"
            >Vue is getting super fun!</NuxtLink
          >
          <NuxtLink
            to=""
            class="border-b hover:border-b-accent rounded-xl text-[0.8rem] px-2"
            >Iconify + Nuxt</NuxtLink
          >
          <NuxtLink
            to=""
            class="border-b hover:border-b-accent rounded-xl text-[0.8rem] px-2"
            >Next vs Nuxt</NuxtLink
          >
        </div>
      </section>
    </aside>
  </div>
  <NuxtPage />
</template>
