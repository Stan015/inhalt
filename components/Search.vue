<script setup lang="ts">
const { result, search } = useAlgoliaSearch("inhalt_articles");

type SearchResult = {
  id: number;
  title: string;
  author_username: string;
  author_occupation: string;
  author_fullname: string;
  cover_image_url: string;
  objectID: string;
};

const searchQuery = ref("");
const searchResults = ref<Array<SearchResult>>([]);

const updateSearchResults = () => {
  if (result?.value?.hits) {
    searchResults.value = result.value.hits.map((hit) => {
      const { _highlightResult, ...rest } = hit;

      return rest as SearchResult; 
    })
  }
};

watch(
  searchQuery,
  () => {
    search({ query: searchQuery.value });
    updateSearchResults();

    // console.log("returned result", searchResults.value);
  },
  { immediate: true }
);
</script>

<template>
  <div
    class="flex items-center relative w-3/4 max-md:w-full ml-4 max-md:ml-0 text-primary dark:text-primary"
  >
    <Icon name="cil:search" class="absolute ml-3 w-6 h-6 border" />
    <input
      v-model="searchQuery"
      class="w-full h-10 rounded-3xl p-4 pl-10 outline-none border-2 border-white text-sm transition-all hover:border-accent focus:border-accent"
      type="search"
      name="search-posts"
      id="search-posts"
    />
  </div>

  <div
    v-if="searchResults?.length > 0 && searchQuery.length > 0"
    class="absolute top-[6rem] max-md:top-[8rem] left-[12%] max-md:left-[7%] right-[12%] max-md:right-[7%] bg-white dark:bg-primary border-2 border-accent rounded-2xl shadow-lg z-20 flex justify-center flex-wrap gap-4 p-4 pb-6"
  >
    <NuxtLink
      v-for="res in searchResults"
      @click="searchQuery = ''"
      :key="res.id"
      :to="`/${res.author_username}/articles/${res.id}--${res.title
        .replace(/\s+/g, '-')
        .toLowerCase()}`"
      class="flex flex-col gap-1 overflow-hidden w-max max-w-[20rem] justify-center items-center border border-light rounded-2xl hover:border-accent transition-all"
    >
        <img
          v-if="res.cover_image_url"
          :src="res.cover_image_url"
          :alt="`cover photo of ${res.title}`"
          class="w-full h-36 object-cover"
        />
        <h3 class="block px-2 text-primary max-sm:text-[0.8rem] dark:text-secondary w-full text-center !mb-0">
          {{ res.title }}
        </h3>
        <p class="block px-2 mb-1 text-primary max-sm:text-[0.8rem] dark:text-secondary w-full text-center">by {{res.author_fullname}}</p>
    </NuxtLink>
  </div>
</template>
