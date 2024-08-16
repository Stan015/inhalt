<script setup lang="ts">
const props = defineProps({
  currentPage: String,
});
</script>

<template>
  <nav class="flex gap-4 max-md:gap-2 mb-4 text-primary dark:text-secondary">
    <NuxtLink
      to="/algo/for-you"
      :aria-current="props.currentPage === 'for-you' ? true : false"
      class="text-nowrap text-sm rounded-2xl border-b border-b-light dark:border-b-dark px-2 aria-[current=true]:border-b-accent max-sm:text-[0.7rem]"
      >For you</NuxtLink
    >
    <NuxtLink
      to="/algo/recent"
      :aria-current="props.currentPage === 'recent' ? true : false"
      class="text-nowrap text-sm rounded-2xl border-b border-b-light dark:border-b-dark px-2 aria-[current=true]:border-b-accent max-sm:text-[0.7rem]"
      >Recent</NuxtLink
    >
    <NuxtLink
      to="/algo/trending"
      :aria-current="props.currentPage === 'trending' ? true : false"
      class="text-nowrap text-sm rounded-2xl border-b border-b-light dark:border-b-dark px-2 aria-[current=true]:border-b-accent max-sm:text-[0.7rem]"
      >Trending</NuxtLink
    >
    <NuxtLink
      to="/algo/following"
      :aria-current="props.currentPage === 'following' ? true : false"
      class="text-nowrap text-sm rounded-2xl border-b border-b-light dark:border-b-dark px-2 aria-[current=true]:border-b-accent max-sm:text-[0.7rem]"
      >Following</NuxtLink
    >
  </nav>
</template>
