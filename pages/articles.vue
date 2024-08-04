<script setup lang="ts">
import type { Article, ArticleCard } from "~/types/tables.types";
import { useArticlesStore } from "~/store/articlesStore";

const articlesStore = useArticlesStore();
const allArticleCards = useState<Array<ArticleCard>>();

const fecthArticles = async () => {
  try {
    const response = await $fetch("/api/articles/fetch-articles");
    const data = response.data;

    articlesStore.fetchedArticles = data as Array<Article>;
    allArticleCards.value = articlesStore.fetchedArticles as Array<ArticleCard>;

    console.log(allArticleCards.value);
  } catch (error) {
    console.log((error as Error).message);
    articlesStore.fetchError = error as Error;
  }
};

onBeforeMount(() => {
  fecthArticles();
});
</script>

<template>
  <div
    class="w-full min-h-main grid grid-cols-[13rem_minmax(20rem,_1fr)_20rem] grid-rows-1 gap-4 py-6 px-[12%] text-primary dark:text-primary"
  >
    <div
      class="flex flex-col gap-4 justify-between w-full h-full max-h-[calc(100svh-8rem)]"
    >
      <nav class="flex flex-col gap-4 w-full h-max">
        <NuxtLink
          to="/"
          aria-current="false"
          class="flex flex-shrink-0 items-center gap-3 w-[90%] bg-white border-b-2 border-b-white hover:border-b-accent transition-all px-4 py-[1.5px] rounded-l-lg relative after:content-[' '] after:w-2 after:h-full after:absolute after:right-[-10%] after:rounded-l-2xl after:bg-white after:pointer-events-none aria-[current=true]:after:bg-accent"
          ><Icon name="icon-park-outline:data-all" /> All</NuxtLink
        >
        <NuxtLink
          to="/articles"
          aria-current="true"
          class="flex flex-shrink-0 items-center gap-3 w-[90%] bg-white border-b-2 border-b-white hover:border-b-accent transition-all px-4 py-[1.5px] rounded-l-lg relative after:content-[' '] after:w-2 after:h-full after:absolute after:right-[-10%] after:rounded-l-2xl after:bg-white after:pointer-events-none aria-[current=true]:after:bg-accent"
          ><Icon name="gravity-ui:square-article" /> Articles</NuxtLink
        >
        <NuxtLink
          to="/videos"
          aria-current="false"
          class="flex flex-shrink-0 items-center gap-3 w-[90%] bg-white border-b-2 border-b-white hover:border-b-accent transition-all px-4 py-[1.5px] rounded-l-lg relative after:content-[' '] after:w-2 after:h-full after:absolute after:right-[-10%] after:rounded-l-2xl after:bg-white after:pointer-events-none aria-[current=true]:after:bg-accent"
          ><Icon name="lets-icons:video-fill" /> Videos</NuxtLink
        >
      </nav>
      <section class="w-full h-max bg-white rounded-2xl p-4">
        <h2>News</h2>
        <div class="w-full h-[20rem]"></div>
      </section>
    </div>
    <main class="block w-full h-full pb-6">
      <nav class="flex gap-4 mb-4 text-primary dark:text-secondary">
        <button type="button">For you</button>
        <button type="button">Recent</button>
        <button type="button">Trending</button>
        <button type="button">Following</button>
      </nav>

      <section class="flex flex-col gap-4 w-full min-h-dvh h-full">
        <article
          class="w-full h-max rounded-2xl border border-white relative overflow-hidden"
          v-for="article in allArticleCards"
          :key="article.id"
        >
          <NuxtLink
            :to="`/${article.author_username}/articles/${
              article.id
            }--${article.title.replace(/\s+/g, '-').toLowerCase()}`"
          >
            <NuxtImg
              v-if="article.cover_image"
              :src="article.cover_image_url"
              alt="cover photo"
              class="w-full max-h-[18rem]"
            />
          </NuxtLink>

          <div class="w-full h-max bg-white px-4 pb-4">
            <NuxtLink
              :to="`/${article.author_username}/articles/${
                article.id
              }--${article.title.replace(/\s+/g, '-').toLowerCase()}`"
            >
              <h2 class="w-full text-center font-bold text-[1.5rem] pt-4">
                {{ article.title }}
              </h2>
            </NuxtLink>

            <div class="flex items-end justify-between gap-6">
              <div class="text-[0.7rem]">
                <span>{{ article.created_at }}</span> .
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
                :user-profile-link="`/${article?.author_username}`"
                :name="`${article?.author_fullname}`"
                :occupation="`${article?.author_occupation}`"
                :profile-photo-src="`${article?.author_avatar}`"
                class-name="items-end"
              />
            </div>
          </div>
        </article>
      </section>
    </main>
    <aside class="flex flex-col gap-6 w-full h-full">
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
