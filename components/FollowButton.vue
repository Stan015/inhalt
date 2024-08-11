<script setup lang="ts">
const emit = defineEmits(["toggleFollow"]);
const handleFollow = () => {
  emit("toggleFollow");
};

defineProps({
    currentAuthUser: Boolean,
    following: Boolean,
    isLoadingFollow: Boolean,
})
</script>

<template>
  <button
    v-if="!currentAuthUser"
    :class="
      following
        ? ' bg-light text-primary rounded-2xl px-4 py-1 hover:-translate-y-1 hover:translate-x-1 transition-all'
        : 'bg-accent text-secondary rounded-2xl px-4 py-1 hover:-translate-y-1 hover:translate-x-1 transition-all'
    "
    type="button"
    @click="handleFollow"
  >
    <Icon v-if="isLoadingFollow" name="line-md:uploading-loop" />
    <span v-if="following && !isLoadingFollow">Unfollow</span>
    <span v-else>Follow</span>
  </button>
</template>
