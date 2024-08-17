<script setup lang="ts">
const props = defineProps({
  parentPage: String,
  currentPage: String,
});
</script>

<template>
  <nav class="flex gap-4 max-md:gap-2 mb-4 text-primary dark:text-secondary">
    <NuxtLink
      :to="
        parentPage === 'articles'
          ? '/articles/algo/for-you'
          : parentPage === 'videos'
          ? '/videos/algo/for-you'
          : '/algo/for-you'
      "
      :aria-current="props.currentPage === 'for-you' ? true : false"
      class="text-nowrap text-sm rounded-2xl border-b border-b-light dark:border-b-dark px-2 aria-[current=true]:border-b-accent max-sm:text-[0.7rem]"
      >For you</NuxtLink
    >
    <NuxtLink
      :to="
        parentPage === 'articles'
          ? '/articles/algo/recent'
          : parentPage === 'videos'
          ? '/videos/algo/recent'
          : '/algo/recent'
      "
      :aria-current="props.currentPage === 'recent' ? true : false"
      class="text-nowrap text-sm rounded-2xl border-b border-b-light dark:border-b-dark px-2 aria-[current=true]:border-b-accent max-sm:text-[0.7rem]"
      >Recent</NuxtLink
    >
    <NuxtLink
      :to="
        parentPage === 'articles'
          ? '/articles/algo/trending'
          : parentPage === 'videos'
          ? '/videos/algo/trending'
          : '/algo/trending'
      "
      :aria-current="props.currentPage === 'trending' ? true : false"
      class="text-nowrap text-sm rounded-2xl border-b border-b-light dark:border-b-dark px-2 aria-[current=true]:border-b-accent max-sm:text-[0.7rem]"
      >Trending</NuxtLink
    >
    <NuxtLink
      :to="
        parentPage === 'articles'
          ? '/articles/algo/following'
          : parentPage === 'videos'
          ? '/videos/algo/following'
          : '/algo/following'
      "
      :aria-current="props.currentPage === 'following' ? true : false"
      class="text-nowrap text-sm rounded-2xl border-b border-b-light dark:border-b-dark px-2 aria-[current=true]:border-b-accent max-sm:text-[0.7rem]"
      >Following</NuxtLink
    >
  </nav>
</template>
