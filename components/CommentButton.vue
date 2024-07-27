<script setup lang="ts">
import type { Article } from "../types/tables.types";
import { useArticlesStore } from "../store/articlesStore";

const props = defineProps({
  articleId: Number,
});

const articlesStore = useArticlesStore();

const specificArticle = ref<Article>();

specificArticle.value = articlesStore.fetchedArticles?.find(
  ({ id }) => id === props.articleId
) as Article;

const commentList = specificArticle.value?.comments;
const commentIsZero = ref(false);

commentList.length === 0
  ? (commentIsZero.value = true)
  : (commentIsZero.value = false);

console.log(
  "test from commentButton component",
  specificArticle.value,
  commentList
);

watchEffect(() => {});
</script>

<template>
  <button class="relative" type="button" aria-labelledby="comments">
    <Icon name="uil:comment" />
    <span v-if="!commentIsZero" class="absolute -top-2 right-0 text-[10px]">
      {{ commentList.length }}
    </span>
  </button>
</template>
