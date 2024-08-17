<script setup lang="ts">
import type { Article, ArticleCard } from "~/types/tables.types";

import { useArticlesStore } from "~/store/articlesStore";
import formatDateTime from "~/utils/formatDateTime";
import InhaltCardSkeleton from "~/components/skeletons/InhaltCardSkeleton.vue";

const articlesStore = useArticlesStore();
const allArticleCards = useState<Array<ArticleCard>>();
const isLoading = ref(true);

const fecthArticles = async () => {
  isLoading.value = true;

  try {
    const response = await $fetch("/api/articles/fetch-articles");
    const data = response?.data;

    if (data) {
      articlesStore.fetchedArticles = data as Array<Article>;
      allArticleCards.value =
        articlesStore.fetchedArticles as Array<ArticleCard>;

      allArticleCards.value.forEach((articleCard) => {
        const { date, time } = formatDateTime(articleCard.created_at);
        articleCard.formattedDate = date;
        articleCard.formattedTime = time;
      });

      console.log(allArticleCards.value);
    }
  } catch (error) {
    console.log((error as Error).message);
    articlesStore.fetchError = error as Error;
  } finally {
    isLoading.value = false;
  }
};

onBeforeMount(() => {
  fecthArticles();
});
</script>

<template>
  <div
    class="w-full min-h-main flex gap-4 py-6 px-[12%] relative max-md:px-[7%]"
  >
    <div
      class="flex flex-col gap-4 min-w-[12rem] justify-between h-max min-h-[calc(100svh-8rem)] text-primary dark:text-primary max-md:hidden min-lg:min-w-[10rem]"
    >
      <nav class="flex flex-col gap-4 w-full h-max">
        <NuxtLink
          to="/"
          aria-current="true"
          class="flex flex-shrink-0 items-center gap-3 w-[90%] bg-white border-b-2 border-b-white hover:border-b-accent transition-all px-4 py-[1.5px] rounded-l-lg relative after:content-[' '] after:w-2 after:h-full after:absolute after:right-[-10%] after:rounded-l-2xl after:bg-white after:pointer-events-none aria-[current=true]:after:bg-accent"
          ><Icon name="icon-park-outline:data-all" /> All</NuxtLink
        >
        <NuxtLink
          to="/articles"
          aria-current="false"
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
      <section
        class="w-full h-[20rem] bg-white rounded-2xl p-4 text-primary dark:text-primary mb-4"
      >
        <h2 class="w-full border-b border-b-accent">News</h2>
        <div class="w-full"></div>
      </section>
    </div>
    <main class="block w-full h-full pb-6 text-primary dark:text-primary">
      <DiscoveryNavLinks current-page="for-you" />
      <section class="flex flex-col gap-4 w-full min-h-dvh h-full">
        <InhaltCard v-if="!isLoading" :all-article-cards="allArticleCards" />
        <template v-else>
          <InhaltCardSkeleton v-for="n in 8" :key="n" />
        </template>
      </section>
    </main>
    <aside
      class="flex flex-col justify-between gap-4 min-w-[15rem] h-max min-h-[calc(100svh-8rem)] text-primary dark:text-primary max-md:absolute max-md:w-[20rem] max-md:right-[7%] max-lg:hidden"
    >
      <section class="w-full h-[20rem] bg-white rounded-2xl p-4">
        <h2 class="w-full border-b border-b-accent">Promotion</h2>
        <div class="w-full h-[20rem]"></div>
      </section>

      <section class="w-full h-[20rem] bg-white rounded-2xl p-4 mb-4">
        <h2 class="w-full border-b border-b-accent">
          Hot Trends <Icon name="fluent-emoji-flat:fire" />
        </h2>
        <div class="w-full h-[25rem] flex flex-col gap-2">
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
