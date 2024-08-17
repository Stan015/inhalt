<script setup lang="ts">
const props = defineProps({
    className: {
    type: String,
    default: "",
  }
});
</script>

<template>
  <div
    :class="[
      'flex flex-col max-md:flex-row max-sm:flex-col gap-4 items-center justify-center w-full',
      props.className,
    ]"
  >
    <span
      class="max-w-[6rem] max-h-[6rem] w-[6rem] h-[6rem] rounded-full border-2 border-accent overflow-hidden"
    >
      <div class="w-full h-full rounded-full bg-gray-300 animate-pulse block" />
    </span>
    <div class="flex flex-col items-center gap-1 w-full max-w-[8rem]">
      <div
        class="w-[6rem] h-[1rem] rounded-2xl bg-gray-300 animate-pulse block"
      />
      <div
        class="w-[4rem] h-[1rem] rounded-2xl bg-gray-300 animate-pulse block"
      />
      <div
        class="w-full h-[1.5rem] mt-3 rounded-2xl bg-gray-300 animate-pulse block"
      />
    </div>
    <div class="max-md:max-w-[18rem] h-full flex flex-col gap-4 items-center">
      <div class="flex flex-col gap-1 mt-2 w-full h-[5rem] items-center">
        <div
          class="w-full h-[1rem] rounded-2xl bg-gray-300 animate-pulse block"
        />
        <div
          class="w-full h-[0.8rem] rounded-2xl bg-gray-300 animate-pulse block"
        />
        <div
          class="w-full h-[0.8rem] rounded-2xl bg-gray-300 animate-pulse block"
        />
      </div>
      <div class="flex gap-4 items-center justify-center mb-2">
        <NuxtLink
          to=""
          class="p-2 rounded-3xl border-b-2 border-light dark:border-dark hover:border-accent transition-all text-[1.2rem] flex items-center"
        >
          <Icon name="mdi:linkedin" />
        </NuxtLink>
        <NuxtLink
          to=""
          class="p-2 rounded-3xl border-b-2 border-light dark:border-dark hover:border-accent transition-all text-[1.2rem] flex items-center"
          ><Icon name="mdi:github"
        /></NuxtLink>
        <NuxtLink
          to=""
          class="p-2 rounded-3xl border-b-2 border-light dark:border-dark hover:border-accent transition-all text-[1rem] flex items-center"
          ><Icon name="prime:twitter"
        /></NuxtLink>
      </div>
    </div>
  </div>
</template>
