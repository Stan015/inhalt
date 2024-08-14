<script setup lang="ts">
const emit = defineEmits(["toggleBurgerMenu"]);

const toggleMenu = () => {
  emit("toggleBurgerMenu");
};

defineProps({
  showMenu: Boolean,
});
</script>

<template>
  <button @click="toggleMenu" type="button" aria-labelledby="toggle menu" class="flex flex-col gap-1 h-full justify-center items-center">
    <div
      :class="`w-[2rem] h-[5px] bg-black dark:bg-white block rounded-2xl transition-all ${
        showMenu ? 'transform rotate-45 translate-y-1' : ''
      }`"
    ></div>
    <div :class="`w-[2rem] h-[5px] flex gap-1 items-center transition-all ${
        showMenu ? 'hidden' : ''
      }`">
      <span
        class="w-[7px] h-[5px] rounded-full bg-accent dark:bg-accent block "
      ></span>
      <span
        class="w-full h-[5px] bg-black dark:bg-white block rounded-2xl"
      ></span>
    </div>
    <div
      :class="`w-[2rem] h-[5px] bg-black dark:bg-white block rounded-2xl transition-all ${
        showMenu ? 'transform -rotate-45 -translate-y-1' : ''
      }`"
    ></div>
  </button>
</template>
