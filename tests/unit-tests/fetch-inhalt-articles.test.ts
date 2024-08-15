import { describe, it, expect, vi } from "vitest";

describe("test fetch articles", () => {
  it("fetches articles", async () => {
    const mockResponse = {
      articles: [
        {
          title: "Hello World",
          content: "This is a test of fetching articles.",
        },
        {
          title: "Hello World 2",
          content: "This is a test of fetching articles 2.",
        },
      ],
    };

    const $fetch = vi.fn().mockResolvedValue(mockResponse);

    const response = await $fetch("/api/articles/fetch-articles");

    expect(response).toEqual(mockResponse);
  });
});
