export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  app: {
    head: {
      title: "Inhalt",
      titleTemplate: "%s | The contents app.",
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/supabase",
    "@nuxtjs/google-fonts",
    "@nuxt/image",
    "@nuxt/icon",
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
  ],
  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL,
    key: process.env.NUXT_PUBLIC_SUPABASE_KEY,
    // redirect: false,
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      include: ["/stan015/dashboard", "/stan015/create-inhalt", "/stan015/notification"],
      exclude: ["/", "/sign-up"],
      // cookieRedirect: false,
    },
  },
  css: ["~/assets/css/global.css"],
  googleFonts: {
    families: {
      Poppins: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    display: "swap",
  },
  tailwindcss: {
    editorSupport: true,
    config: {
      content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
      ],
      theme: {
        fontFamily: {
          sans: ["Poppins", "ui-sans-serif", "system-ui"],
        },
        extend: {
          colors: {
            primary: "black",
            secondary: "white",
            accent: "#6D28D9",
          },
          backgroundColor: {
            light: "#EFEFEF",
            dark: "#000000",
            secondary: "#969696",
            action: "#6D28D9",
          },
          borderColor: {
            light: "#EFEFEF",
            dark: "#000000",
            accent: "#6D28D9",
          },
          minHeight: {
            main: "calc(100svh - 6rem)",
          },
        },
      },
    },
  },
});