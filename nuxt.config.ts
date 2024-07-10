export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ['~/assets/css/global.css'],
  app: {
    head: {
      title: "Inhalt",
      titleTemplate: "%s | The contents app.",
    },
  },
  modules: ["@nuxtjs/tailwindcss", "@nuxt/image", "@nuxt/icon"],
  // modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase"],
  // supabase: {
  //   url: process.env.NUXT_PUBLIC_SUPABASE_URL,
  //   key: process.env.NUXT_PUBLIC_SUPABASE_KEY,
  // },
});