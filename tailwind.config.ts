import type { Config } from "tailwindcss";

export default <Partial<Config>>{
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
        accent: "#B78BF2"
      },
      backgroundColor: {
        light: "#EFEFEF",
        dark: "#000000",
        secondary: "#969696"
      },
      minHeight: {
        main: "calc(100svh - 6rem)"
      }
    },
  },
};
