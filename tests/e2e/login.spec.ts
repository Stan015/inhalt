import { test, expect } from "@playwright/test";

test("user can log in", async ({ page }) => {
  await page.goto("/login");

  await page.fill('input[name="email"]', "testuser@example.com");
  await page.fill('input[name="password"]', "password123");
  await page.click('button[type="submit"]');

  await page.waitForSelector("/confirm"); // Replace with a selector that appears after login

  const url = page.url();
  expect(url).toBe("http://localhost:3000/confirm"); // Replace with the expected URL after login
});
