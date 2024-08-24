import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: { environment: "node", include: ["tests/unit-tests/**"], exclude: ["tests/e2e/**"] },
});
