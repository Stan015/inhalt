import type { Article } from "~/types/tables.types";

export const useArticlesStore = defineStore("articlesStore", () => {
  const fetchedArticles = ref<Array<Article>>([]);
  const fetchError = ref<Error>()

  return {
    fetchedArticles,
    fetchError,
  };
});
