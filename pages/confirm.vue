<script setup lang="ts">
const user = useSupabaseUser();

watch(
  user,
  () => {
    if (user.value) {
      return navigateTo("/");
    }
  },
  { immediate: true }
);
</script>

<template>
  <section>
    <h1>Waiting to sign in...</h1>
  </section>
</template>
