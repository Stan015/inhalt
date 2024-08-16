<script setup lang="ts">
const route = useRouter();
</script>

<template>
  <section
    class="w-full h-screen flex flex-col items-center justify-start pt-10"
  >
    <div class="flex flex-col gap-2 items-center">
      <h1 class="text-[1.5rem] font-bold">Something went Wrong</h1>
      <p>An error occured, go back to previous page...</p>
      <button
        @click="route.back()"
        class="px-4 py-1 my-4 rounded-3xl border-b-2 border-dark text-primary dark:text-secondary dark:border-white hover:border-accent transition-all text-base flex items-center w-max"
        type="button"
      >
        Go Back
      </button>
    </div>
  </section>
</template>
