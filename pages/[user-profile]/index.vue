<script setup lang="ts">
import { signOut } from "~/auth/auth";
import type { Article, ArticleCard } from "~/types/tables.types";
import type { User } from "~/types/user.types";
import { useRoute } from "vue-router";

const transformUser = (dbUser: any): User => {
  return {
    ...dbUser,
    fullName: dbUser.full_name,
    firstName: dbUser.first_name,
    lastName: dbUser.last_name,
  };
};

const user = ref<User | null>(null);
const userInhalts = ref<Array<ArticleCard> | null>(null);
const isLoadingProfile = ref(true);
const isLoadingInhalts = ref(true);

const route = useRoute();
const userProfile = route.params.userprofile;

const handleUserProfile = async () => {
  isLoadingProfile.value = true;

  try {
    const data = await $fetch(`/api/user/user-profile?user=${userProfile}`);

    if (!data) {
      throw new Error("Failed to fetch data");
    }

    user.value = transformUser(data);
  } catch (error) {
    console.error("Error fetching user profile:", (error as Error).message);
  } finally {
    isLoadingProfile.value = false;
  }
};

const handleUserInhalts = async () => {
  isLoadingInhalts.value = true;

  try {
    const data = await $fetch<Array<Article>>(`/api/user/user-inhalts?user=${userProfile}`);

    if (!data) {
      throw new Error("Failed to fetch data");
    }

    userInhalts.value = data;
  } catch (error) {
    console.error("Error fetching user inhalts:", (error as Error).message);
  } finally {
    isLoadingInhalts.value = false;
  }
};

onMounted(() => {
  handleUserProfile();
  handleUserInhalts();
});

watch(
  route,
  () => {
    handleUserProfile();
    handleUserInhalts();
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div
    class="w-full min-h-main grid grid-cols-[15rem_minmax(20rem,_1fr)_20rem] grid-rows-1 gap-4 py-6 px-[12%] text-primary dark:text-primary"
  >
    <section
      class="bg-white p-6 rounded-2xl flex flex-col justify-between items-center"
    >
      <div>
        <h1
          class="text-[1.5rem] font-bold mb-4 w-full border-b-2 border-b-accent"
        >
          Profile
        </h1>
        <div class="flex flex-col gap-4 items-center justify-center">
          <span
            class="w-[6rem] h-[6rem] rounded-full border-2 border-accent overflow-hidden"
          >
            <NuxtImg
              v-if="user?.avatar"
              class="w-full h-full rounded-full"
              :src="user.avatar"
              alt="avatar"
            />
            <Icon
              v-else
              name="hugeicons:user"
              class="w-full h-full rounded-full"
            />
          </span>
          <div class="flex flex-col items-center gap-1">
            <h2 class="mb-0 text-center text-[1.3rem]">{{ user?.fullName }}</h2>
            <p class="text-base text-center text-accent">
              {{ user?.username }}
            </p>
            <p
              v-if="user?.occupation"
              class="text-base text-center border-2 border-black px-2 py-1 rounded-2xl mt-1 text-primary"
            >
              {{ user.occupation }}
            </p>
            <p
              v-if="user?.bio"
              class="text-base text-center text-primary text-balance mt-2"
            >
              {{ user.bio }}
            </p>
          </div>
          <div class="flex gap-4 items-center justify-center">
            <NuxtLink
              to="/"
              class="p-2 rounded-3xl border-b-2 border-light dark:border-dark hover:border-accent transition-all text-[1.2rem] flex items-center"
            >
              <Icon name="mdi:linkedin" />
            </NuxtLink>
            <NuxtLink
              to="/"
              class="p-2 rounded-3xl border-b-2 border-light dark:border-dark hover:border-accent transition-all text-[1.2rem] flex items-center"
              ><Icon name="mdi:github"
            /></NuxtLink>
            <NuxtLink
              to="/"
              class="p-2 rounded-3xl border-b-2 border-light dark:border-dark hover:border-accent transition-all text-[1rem] flex items-center"
              ><Icon name="prime:twitter"
            /></NuxtLink>
          </div>
          <button
            class="mt-2 bg-action text-secondary rounded-2xl px-4 py-1 hover:-translate-y-1 hover:translate-x-1 transition-all"
            type="button"
          >
            Follow
          </button>
        </div>
      </div>
      <button
        @click="signOut"
        class="px-4 py-1 rounded-3xl border-b-2 border-light dark:border-dark hover:border-accent transition-all text-base flex items-center w-max"
        type="button"
      >
        Sign Out
      </button>
    </section>
    <main class="bg-white p-6 rounded-2xl flex flex-col gap-4">
      <section
        class="grid grid-cols-3 place-items-center gap-2 text-base border-b-2 border-b-accent pb-2 w-full"
      >
        <p class="min-w-[10rem] p-4 flex flex-col items-center justify-center">
          <span class="font-bold text-[1.2rem] text-accent h-6">{{
            user?.total_likes || 0
          }}</span>
          Likes
        </p>
        <p class="min-w-[10rem] p-4 flex flex-col items-center justify-center">
          <span class="font-bold text-[1.2rem] text-accent h-6">{{
            user?.total_articles! + user?.total_videos! || 0
          }}</span>
          Inhalts
        </p>
        <p class="min-w-[10rem] p-4 flex flex-col items-center justify-center">
          <span class="font-bold text-[1.2rem] text-accent h-6">{{
            user?.total_bookmarks || 0
          }}</span>
          Bookmarks
        </p>
        <p class="min-w-[10rem] p-4 flex flex-col items-center justify-center">
          <span class="font-bold text-[1.2rem] text-accent h-6">{{
            user?.followers?.length || 0
          }}</span>
          Followers
        </p>
        <p class="min-w-[10rem] p-4 flex flex-col items-center justify-center">
          <span class="font-bold text-[1.2rem] text-accent h-6">{{
            user?.following?.length || 0
          }}</span>
          Following
        </p>
        <p class="min-w-[10rem] p-4 flex flex-col items-center justify-center">
          <span class="font-bold text-[1.2rem] text-accent h-6">{{
            user?.total_comments || 0
          }}</span>
          Comments
        </p>
      </section>
      <span class="flex place-content-end w-full"
        ><NuxtLink
          class="text-secondary bg-action rounded-2xl px-4 py-2 place-self-end w-max"
          to="/dashboard"
          >Go To My Dashboard</NuxtLink
        ></span
      >
      <section class="w-full">
        <h2 class="text-[1.3rem]">Recent inhalts</h2>
        <div class="w-full h-full flex flex-col gap-4">
          <NuxtLink
            v-for="inhalt in userInhalts"
            :key="inhalt.id"
            class="flex w-full h-max justify-between items-center border-b-2 border-white rounded-2xl px-2 hover:border-accent transition-all"
            :to="`/${inhalt.author_username}/articles/${
              inhalt.id
            }--${inhalt.title.replace(/\s+/g, '-').toLowerCase()}`"
          >
            <h3>{{ inhalt?.title }}</h3>
            <div class="flex gap-4 cursor-default">
              <LikeButton :article-id="inhalt?.id" />
              <CommentButton :article-id="inhalt?.id" />
              <BookmarkButton :article-id="inhalt?.id" />
              <ShareButton
                :article-id="inhalt?.id"
                :title="inhalt?.title"
                :author-username="inhalt?.author_username"
              />
            </div>
          </NuxtLink>
        </div>
      </section>
    </main>
    <aside class="flex flex-col gap-6 w-full h-full">
      <section class="w-full h-max bg-white rounded-2xl p-4">
        <h2>Promotion</h2>
        <div class="w-full h-[20rem]"></div>
      </section>

      <section class="w-full h-max bg-white rounded-2xl p-4">
        <h2>Hot Trends <Icon name="fluent-emoji-flat:fire" /></h2>
        <div class="w-full h-[25rem]">
          <h3>Rendering images the good way</h3>
          <h3>18 tools to master Nuxt</h3>
          <h3>Vue is getting super fun!</h3>
          <h3>Iconify + Nuxt</h3>
          <h3>Next vs Nuxt</h3>
        </div>
      </section>
    </aside>
  </div>
</template>
