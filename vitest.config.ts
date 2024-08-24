import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: { environment: "node", globals: true, exclude: ["tests/e2e/**"] },
});
