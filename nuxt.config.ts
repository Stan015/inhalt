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
    "@nuxt/test-utils/module",
    "@vueuse/nuxt",
    "@nuxtjs/algolia",
    "@nuxtjs/algolia",
  ],
  supabase: {
    url: process.env.NUXT_PUBLIC_SUPABASE_URL!,
    key: process.env.NUXT_PUBLIC_SUPABASE_KEY!,
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      include: [
        "/dashboard",
        "/dashboard/*",
        "/*/create-inhalt",
        "/*/notification",
      ],
      exclude: ["/", "/sign-up"],
    },
  },
  algolia: {
    applicationId: process.env.NUXT_PUBLIC_ALGOLIA_APP_ID!,
    apiKey: process.env.NUXT_PUBLIC_ALGOLIA_API_KEY!,
    instantSearch: {
      theme: "algolia",
    },
    globalIndex: "",
    lite: true,
    cache: false,
    useFetch: false,
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
            secondary: "#EFEFEF",
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
