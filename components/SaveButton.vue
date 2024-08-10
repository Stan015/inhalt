<script setup lang="ts">
defineProps({
  name: String,
  isLoading: Boolean,
});
</script>

<template>
  <button
    type="submit"
    class="min-w-[6rem] px-4 h-10 bg-action border-0 text-secondary rounded-lg hover:shadow-sm hover:shadow-accent transition-all"
  >
    <Icon v-if="isLoading" name="line-md:uploading-loop" />
    <span v-else>{{ name }}</span>
  </button>
</template>
