<script setup lang="ts">
const user = useSupabaseUser();
const route = useRouter();

watch(
  user,
  () => {
    if (user.value) {
      route.push("/");
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
