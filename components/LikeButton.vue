<script setup lang="ts">
import { useUserStore } from "../store/userStore";
import type { Article, Likes } from "../types/tables.types";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const supabase = useSupabaseClient<Article>();

const props = defineProps({
  articleId: Number,
});

let notyf: Notyf | null;

onMounted(() => {
  notyf = new Notyf({
    duration: 3000,
    position: {
      x: "right",
      y: "top",
    },
  });
});

const userStore = useUserStore();

const isLiked = ref(false);
const currentLikes = ref<Likes>();
const numberOfLikesIsZero = ref(false);
const username = userStore.userCredentials.username;

// Fetch the existing likes data
const fetchArticleLikes = async () => {
  const { data: article, error: fetchError } = await supabase
    .from("articles")
    .select("likes")
    .eq("id", props.articleId)
    .single();

  if (fetchError) {
    console.error("Error fetching article:", fetchError);
  }

  // Check if user already liked the article
  if (article) {
    currentLikes.value = article?.likes;

    currentLikes.value?.number_of_likes === 0
      ? (numberOfLikesIsZero.value = true)
      : (numberOfLikesIsZero.value = false);

    for (let i = 0; i < currentLikes.value?.liked_by.length!; i++) {
      if (
        userStore.isLoggedIn &&
        currentLikes.value?.liked_by[i].name === username
      ) {
        isLiked.value = true;
        // console.log("user already liked this article");
      } else {
        isLiked.value = false;
        // console.log("user hasn't liked this article");
      }
    }
  }
};
//

// reusable function to update the likes data on db
const handleToggleLikeOnDB = async (liked: boolean) => {
  const likes = currentLikes.value!;
  if (liked) {
    likes.liked_by.push({
      name: username!,
      at: new Date().toISOString(),
    });
    likes.number_of_likes = likes.liked_by.length;

    // console.log("from like", currentLikes.value);
  } else {
    const filteredLikes = likes.liked_by.filter(
      ({ name }) => name !== username
    );
    likes.liked_by = filteredLikes;
    likes.number_of_likes = likes.liked_by.length;
    // console.log("from unlike", currentLikes.value, filteredLikes);
  }

  // Update the article with new likes data
  const { error: updateError } = await supabase
    .from("articles")
    .update({ likes })
    .eq("id", props.articleId);

  if (updateError) {
    notyf?.error("Error liking article.");
    console.error("Error liking article:", updateError);
  } else if (liked) {
    isLiked.value = true;
    notyf?.success("Article liked successfully");
    // console.log("Article liked successfully");
  } else {
    isLiked.value = false;
    notyf?.success("Article unliked successfully");
    // console.log("Article unliked successfully");
  }
};

const handleLike = async () => {
  // increment like
  if (userStore.isLoggedIn && !isLiked.value) {
    handleToggleLikeOnDB(true);
  }

  // decrement like
  if (userStore.isLoggedIn && isLiked.value) {
    handleToggleLikeOnDB(false);
  }

  if (!userStore.isLoggedIn) {
    notyf?.error("Sign in to like post.");
  }
};

onMounted(() => {
  fetchArticleLikes();
});

watch(
  isLiked,
  () => {
    fetchArticleLikes();
    // console.log(isLiked.value);
  },
  { immediate: true }
);
</script>

<template>
  <button
    @click="handleLike"
    class="relative flex flex-col items-center justify-end"
    type="button"
    aria-labelledby="likes"
  >
    <Icon v-if="isLiked" class="text-[1.2rem] text-red-500" name="mdi:heart" />
    <Icon v-else class="text-[1.2rem]" name="mdi:heart-outline" />
    <span v-if="!numberOfLikesIsZero" class="absolute -top-2 right-0 text-[10px]">{{
      currentLikes?.number_of_likes 
    }}</span>
  </button>
</template>
