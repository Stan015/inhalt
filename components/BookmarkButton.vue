<script setup lang="ts">
import { useUserStore } from "../store/userStore";
import type { Article, Bookmark } from "../types/tables.types";

const supabase = useSupabaseClient<Article>();

const props = defineProps({
  articleId: Number,
});

const userStore = useUserStore();

const isBookmarked = ref(false);
const currentBookmarks = ref<Bookmark>();
const numberOfBookmarksIsZero = ref(false);
const username = userStore.userCredentials.username;

// Fetch the existing bookmarks
const fetchArticleBookmarks = async () => {
  const { data: article, error: fetchError } = await supabase
    .from("articles")
    .select("bookmarks")
    .eq("id", props.articleId)
    .single();

  if (fetchError) {
    console.error("Error fetching article:", fetchError);
  }

  // Check if user already bookmarked the article
  if (article) {
    currentBookmarks.value = article?.bookmarks;

    currentBookmarks.value?.number_of_bookmarks === 0
      ? (numberOfBookmarksIsZero.value = true)
      : (numberOfBookmarksIsZero.value = false);

    for (let i = 0; i < currentBookmarks.value?.bookmarked_by.length!; i++) {
      if (
        userStore.isLoggedIn &&
        currentBookmarks.value?.bookmarked_by[i].name === username
      ) {
        isBookmarked.value = true;
        console.log("user already bookmarked this article");
      } else {
        isBookmarked.value = false;
        console.log("user hasn't bookmarked this article");
      }
    }
  }
};
//

// reusable function to update the bookmark data on db
const handleToggleBookmarkOnDB = async (bookmarked: boolean) => {
  const bookmarks = currentBookmarks.value!;
  if (bookmarked) {
    bookmarks.bookmarked_by.push({
      name: username!,
      at: new Date().toISOString(),
    });
    bookmarks.number_of_bookmarks = bookmarks.bookmarked_by.length;

    console.log("from bookmark", currentBookmarks.value);
  } else {
    const filteredBookmarks = bookmarks.bookmarked_by.filter(
      ({ name }) => name !== username
    );
    bookmarks.bookmarked_by = filteredBookmarks;
    bookmarks.number_of_bookmarks = bookmarks.bookmarked_by.length;
    console.log("from unbookmark", currentBookmarks.value, filteredBookmarks);
  }

  // Update the article with new bookmark data
  const { error: updateError } = await supabase
    .from("articles")
    .update({ bookmarks })
    .eq("id", props.articleId);

  if (updateError) {
    console.error("Error liking article:", updateError);
  } else if (bookmarked) {
    isBookmarked.value = true;
    console.log("Article bookmarked successfully");
  } else {
    isBookmarked.value = false;
    console.log("Article unbookmarked successfully");
  }
};

const handleBookmark = async () => {
  // increment bookmark
  if (userStore.isLoggedIn && !isBookmarked.value) {
    handleToggleBookmarkOnDB(true);
  }

  // decrement bookmark
  if (userStore.isLoggedIn && isBookmarked.value) {
    handleToggleBookmarkOnDB(false);
  }

  if (!userStore.isLoggedIn) {
    alert("Sign in to bookmark post.");
  }
};

onMounted(() => {
  fetchArticleBookmarks();
});

watch(
  isBookmarked,
  () => {
    fetchArticleBookmarks();
    console.log(isBookmarked.value);
  },
  { immediate: true }
);
</script>
<template>
  <button
    @click="handleBookmark"
    class="relative flex flex-col items-center"
    type="button"
    aria-labelledby="bookmark"
  >
    <Icon v-if="isBookmarked" name="material-symbols:bookmark" />
    <Icon v-else name="material-symbols:bookmark-outline" />
    <span v-if="!numberOfBookmarksIsZero" class="absolute -top-2 right-0 text-[10px]">{{ currentBookmarks?.number_of_bookmarks }}</span>
  </button>
</template>
