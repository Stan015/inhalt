<script setup lang="ts">
const isLiked = ref(false)
</script>

<template>
  <button @click="isLiked = !isLiked" class="relative" type="button" aria-labelledby="likes">
    <Icon v-if="isLiked" class="text-[1.3rem] text-red-500" name="mdi:heart" />
    <Icon v-else class="text-[1.3rem]" name="mdi:heart-outline" />
    <span class="absolute -top-2  right-0 text-[10px]">32</span>
  </button>
</template>
