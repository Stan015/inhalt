<script setup lang="ts">
import type { Article } from "~/types/tables.types";

const article = ref<Article | null>(null);
const isLoading = ref(true);

const fetchArticle = async () => {
  const route = useRoute();
  const articleId = parseInt(route.params.id as string, 10) || undefined;
  const articleTitle = route.params.title as string || undefined;

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
    }
  } catch (error) {
    console.error("Error fetching article:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchArticle();
});

const route = useRoute();
watch(
  () => route.params,
  () => {
    fetchArticle();
  },
  { immediate: true }
);
</script>

<template>
  <div class="w-full min-h-main flex gap-4 py-6 px-[12%]">
    <!-- <div class="flex flex-col gap-4 justify-between w-full h-full">
        <nav class="flex flex-col gap-4 w-full h-max">
          <NuxtLink
            to="/"
            class="flex flex-shrink-0 items-center gap-3 w-[90%] bg-white px-4 py-[1.5px] rounded-l-lg relative after:content-[' '] after:w-2 after:h-full after:absolute after:right-[-10%] after:rounded-l-2xl after:bg-white after:pointer-events-none"
            ><Icon name="icon-park-outline:data-all" /> All</NuxtLink
          >
          <NuxtLink
            to="/articles"
            class="flex flex-shrink-0 items-center gap-3 w-[90%] bg-white px-4 py-[1.5px] rounded-l-lg relative after:content-[' '] after:w-2 after:h-full after:absolute after:right-[-10%] after:rounded-l-2xl after:bg-white after:pointer-events-none"
            ><Icon name="gravity-ui:square-article" /> Articles</NuxtLink
          >
          <NuxtLink
            to="/"
            class="flex flex-shrink-0 items-center gap-3 w-[90%] bg-white px-4 py-[1.5px] rounded-l-lg relative after:content-[' '] after:w-2 after:h-full after:absolute after:right-[-10%] after:rounded-l-2xl after:bg-white after:pointer-events-none"
            ><Icon name="lets-icons:video-fill" /> Video inhalt</NuxtLink
          >
        </nav>
        <section class="w-full h-max bg-white rounded-2xl p-4">
          <h2>News</h2>
          <div class="w-full h-[20rem]"></div>
        </section>
      </div> -->
    <main class="flex flex-col gap-6 w-3/4 h-full pb-6">
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
            class="w-full max-h-[18rem] !mb-0"
          />
          <div class="w-full h-max bg-white dark:bg-dark text-primary dark:text-secondary p-4">
            <h1 class="w-full text-center font-bold text-[1.5rem]">
              {{ article?.title }}
            </h1>
            <div class="flex items-end justify-between gap-6">
              <div class="text-[0.7rem]">
                <span>{{ article?.created_at }}</span> .
                <span>10 min read</span>
              </div>
              <div class="flex gap-4 cursor-default">
                <LikeButton :article-id="article?.id" />
                <CommentButton :article-id="article?.id" />
                <BookmarkButton :article-id="article?.id" />
                <ShareButton
                  :article-id="article?.id"
                  :title="article?.title"
                  :author-username="article?.author_username"
                />
              </div>
              <ProfileCard
                user-profile-link="/stan015"
                name="Stanley Azi"
                occupation="Frontend Developer"
                profile-photo-src="/img2.png"
                class-name="profile-card items-end"
              />
            </div>
          </div>
          <div class="flex flex-col gap-2 p-4">
            <MarkdownRenderer :content="article?.markdown_content!" />
          </div>
          <div
            class="flex items-end p-4 border-t border-white justify-between gap-6"
          >
            <ProfileCard
              user-profile-link="/stan015"
              :authorTag="true"
              name="Stanley Azi"
              occupation="Frontend Developer"
              profilePhotoSrc="/img2.png"
              class-name="profile-card"
            />
            <div class="flex gap-4 cursor-default">
              <LikeButton :article-id="article?.id" />
              <CommentButton :article-id="article?.id" />
              <BookmarkButton :article-id="article?.id" />
              <ShareButton
                :article-id="article?.id"
                :title="article?.title"
                :author-username="article?.author_username"
              />
            </div>
            <div class="text-[0.7rem]"><span>Jul 9 2023 .</span> 10:02AM</div>
          </div>
        </article>
        <CommentSection markdown-class-name="comment-section" />
      </section>
      <section>
        <h2 class="font-bold text-md">Related inhalts</h2>
        <article
          class="w-full h-max flex rounded-2xl border border-white relative overflow-hidden"
        >
          <NuxtLink
            to="username/title"
            class="w-[8rem] h-[7rem] overflow-hidden"
          >
            <NuxtImg src="/img1.png" alt="cover photo" class="w-full h-full" />
          </NuxtLink>
          <div class="w-full h-max bg-white p-4">
            <NuxtLink to="username/title" class="w-20 h-20 overflow-hidden">
              <h2 class="w-full text-center font-bold text-[1rem]">
                Mastering ChatGPT Blog Creation: Dos and Don'ts for SaaS
                Marketing Managers
              </h2>
            </NuxtLink>
            <div class="flex items-end justify-between gap-6">
              <div class="text-[0.7rem]">
                <span>Jul 9</span> .
                <span>10 min read</span>
              </div>

              <div class="flex gap-4 cursor-default">
                <!-- <LikeButton /> -->
                <!-- <CommentButton /> -->
                <BookmarkButton />
                <ShareButton />
              </div>

              <ProfileCard
                user-profile-link="/stan015"
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
    <aside class="flex flex-col gap-6 w-[30rem] h-full">
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
    </aside>
  </div>
  <NuxtPage />
</template>
