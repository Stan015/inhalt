import { test, expect } from "@playwright/test";

test("homepage has expected title", async ({ page }) => {
  await page.goto("/");
  const title = await page.title();
  expect(title).toBe("home");
});
