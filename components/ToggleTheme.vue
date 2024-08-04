<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>

<template>
  <button 
  type="button"
    aria-labelledby="toggle theme"
    class="absolute top-1 w-8 h-4 bg-light dark:bg-dark border border-accent rounded-3xl flex items-center px-[0.15rem] dark:justify-end transition-all"
    @click="isDark = !isDark"
  >
    <span
      class="w-[0.7rem] h-[0.7rem] rounded-full bg-dark dark:bg-light block transition-all"
    >
    </span>
  </button>
</template>
