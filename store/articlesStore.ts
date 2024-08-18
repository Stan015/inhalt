import type { Article } from "~/types/tables.types";

export const useArticlesStore = defineStore("articlesStore", () => {
  const currentDisplayedArticles = ref<Array<Article>>([]);
  const currentDisplayedError = ref<Error>();

  const fetchedForYouArticles = ref<Array<Article>>([]);
  const fetchForYouError = ref<Error>();

  const fetchedRecentArticles = ref<Array<Article>>([]);
  const fetchRecentError = ref<Error>()

  const fetchedTrendingArticles = ref<Array<Article>>([]);
  const fetchTrendingError = ref<Error>()

  const fetchedFollowingArticles = ref<Array<Article>>([]);
  const fetchFollowingError = ref<Error>()

  return {
    currentDisplayedArticles,
    currentDisplayedError,
    fetchedForYouArticles,
    fetchForYouError,
    fetchedRecentArticles,
    fetchRecentError,
    fetchedTrendingArticles,
    fetchTrendingError,
    fetchedFollowingArticles,
    fetchFollowingError
  };
});

export const useCreateInhaltStore = defineStore("createInhaltsStore", () => {
  const selectedCreateTags = ref<Array<string>>([])

  return {
    selectedCreateTags
  }
})