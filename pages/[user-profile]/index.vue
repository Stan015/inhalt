<script setup lang="ts">
import type { Article, ArticleCard } from "~/types/tables.types";
import type { User } from "~/types/user.types";
import { useRoute } from "vue-router";
import { useUserStore } from "../../store/userStore";
import {
  toggleFollow,
} from "../../utils/toggleFollow";
import ProfileCardSkeleton from "~/components/skeletons/ProfileCardSkeleton.vue";
import RecentInhaltListSkeleton from "~/components/skeletons/RecentInhaltListSkeleton.vue";

const userStore = useUserStore();
const socials = userStore.userCredentials.socials;

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
    const data = await $fetch<Array<Article>>(
      `/api/user/user-inhalts?user=${userProfile}`
    );

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

// toggle follow button
const username = userStore.userCredentials.username as string;
const fullName = userStore.userCredentials.fullName as string;
const userToFollow = route.params.userprofile as string;
const isLoadingFollow = ref(false);
const dateOfFollow = new Date().toISOString();
const following = ref(false);
const currentAuthUser = ref(false);
const currentFollowing = userStore.userCredentials.following;

if (username == userToFollow) {
  currentAuthUser.value = true;
}

if (currentFollowing?.some((user) => user.username === userToFollow)) {
  following.value = true;
}

const handleFollow = () => {
  toggleFollow({
    username,
    fullName,
    userToFollow,
    isLoadingFollow,
    following,
    dateOfFollow,
  });
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
    class="w-full min-h-main flex max-md:flex-col gap-4 py-6 px-[12%] max-lg:px-[7%] text-primary dark:text-primary"
  >
    <section
      class="bg-white p-6 rounded-2xl flex flex-col justify-between items-center h-[calc(100svh-8rem)] max-h-[calc(100svh-8rem)] max-md:h-max max-w-[15rem] max-md:max-w-full"
    >
      <div class="w-[15rem] max-md:w-full p-4">
        <h1
          class="text-[1.5rem] max-sm:text-[1.3rem] font-bold mb-4 w-full border-b-2 border-b-accent"
        >
          Profile
        </h1>
        <div v-if="!isLoadingProfile" class="w-full flex flex-col gap-4 items-center">
          <div
            class="flex flex-col max-md:flex-row max-sm:flex-col gap-4 items-center justify-center"
          >
            <span
              class="max-w-[6rem] max-h-[6rem] w-[6rem] h-[6rem] rounded-full border-2 border-accent overflow-hidden"
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
                class=" w-full h-full rounded-full"
              />
            </span>
            <div class="flex flex-col items-center gap-1">
              <h2 class="mb-0 text-center text-[1.3rem] max-sm:text-[1.1rem]">{{ user?.fullName }}</h2>
              <p class="text-base text-center text-accent">
                {{ user?.username }}
              </p>
              <p
                v-if="user?.occupation"
                class="text-base text-center border-2 border-black px-2 py-1 rounded-2xl mt-1 text-primary"
              >
                {{ user.occupation }}
              </p>
            </div>
            <div class="max-md:max-w-[18rem] h-full flex flex-col gap-4 items-center">
              <p
                v-if="user?.bio"
                class="text-base max-sm:text-[0.9rem] text-center text-primary text-balance mt-2"
              >
                {{ user.bio }}
              </p>
              <div class="flex gap-4 items-center justify-center mb-2">
                <NuxtLink
                  :to="socials?.linkedin"
                  class="p-2 rounded-3xl border-b-2 border-light dark:border-dark hover:border-accent transition-all text-[1.2rem] flex items-center"
                >
                  <Icon name="mdi:linkedin" />
                </NuxtLink>
                <NuxtLink
                  :to="socials?.github"
                  class="p-2 rounded-3xl border-b-2 border-light dark:border-dark hover:border-accent transition-all text-[1.2rem] flex items-center"
                  ><Icon name="mdi:github"
                /></NuxtLink>
                <NuxtLink
                  :to="socials?.twitter"
                  class="p-2 rounded-3xl border-b-2 border-light dark:border-dark hover:border-accent transition-all text-[1rem] flex items-center"
                  ><Icon name="prime:twitter"
                /></NuxtLink>
              </div>

              <FollowButton
              @toggleFollow="handleFollow"
              :is-loading-follow="isLoadingFollow"
              :following="following"
              :current-auth-user="currentAuthUser"
            />
            </div>
          </div>
          
        </div>
        <ProfileCardSkeleton v-else />
      </div>
    </section>
    <main class="bg-white p-6 rounded-2xl flex flex-col gap-4 w-full">
      <section
        class="grid grid-cols-3 place-items-center gap-2 text-base max-sm:text-[0.8rem] border-b-2 border-b-accent pb-2 w-full"
      >
        <p class="min-w-[10rem] max-sm:min-w-max p-4 flex flex-col items-center justify-center">
          <span class="font-bold text-[1.2rem] max-sm:text-base text-accent h-6">{{
            user?.total_likes || 0
          }}</span>
          Likes
        </p>
        <p class="min-w-[10rem] max-sm:min-w-max p-4 max-sm:p-2 flex flex-col items-center justify-center">
          <span class="font-bold text-[1.2rem] max-sm:text-base text-accent h-6">{{
            user?.total_articles! + user?.total_videos! || 0
          }}</span>
          Inhalts
        </p>
        <p class="min-w-[10rem] max-sm:min-w-max p-4 max-sm:p-2 flex flex-col items-center justify-center">
          <span class="font-bold text-[1.2rem] max-sm:text-base text-accent h-6">{{
            user?.total_bookmarks || 0
          }}</span>
          Bookmarks
        </p>
        <p class="min-w-[10rem] max-sm:min-w-max p-4 max-sm:p-2 flex flex-col items-center justify-center">
          <span class="font-bold text-[1.2rem] max-sm:text-base text-accent h-6">{{
            user?.followers?.length || 0
          }}</span>
          Followers
        </p>
        <p class="min-w-[10rem] max-sm:min-w-max p-4 max-sm:p-2 flex flex-col items-center justify-center">
          <span class="font-bold text-[1.2rem] max-sm:text-base text-accent h-6">{{
            user?.following?.length || 0
          }}</span>
          Following
        </p>
        <p class="min-w-[10rem] max-sm:min-w-max p-4 max-sm:p-2 flex flex-col items-center justify-center">
          <span class="font-bold text-[1.2rem] max-sm:text-base text-accent h-6">{{
            user?.total_comments || 0
          }}</span>
          Comments
        </p>
      </section>
      <span class="flex place-content-end w-full"
        ><NuxtLink
          class="text-secondary bg-action rounded-2xl px-4 py-2 place-self-end w-max max-sm:text-[0.8rem] max-sm:px-2 max-sm:py-1"
          to="/dashboard"
          >Go To My Dashboard</NuxtLink
        ></span
      >
      <section class="w-full">
        <h2 class="text-[1.3rem] max-sm:text-[1.1rem] w-full border-b border-b-accent mb-4 ">
          Recent inhalts
        </h2>
        <div class="w-full h-full flex flex-col gap-4">
          <div
            v-if="!isLoadingInhalts"
            v-for="inhalt in userInhalts"
            :key="inhalt.id"
            class="flex w-full h-max gap-2 justify-between items-center border-b-2 border-light rounded-2xl px-2 hover:border-accent transition-all"
          >
            <NuxtLink
              class="flex w-full h-max justify-between items-center text-[0.8rem] font-semibold"
              :to="`/${inhalt.author_username}/articles/${
                inhalt.id
              }--${inhalt.title.replace(/\s+/g, '-').toLowerCase()}`"
            >
              {{ inhalt?.title }}
            </NuxtLink>
            <div class="flex gap-4 h-max cursor-default z-10">
              <LikeButton :article-id="inhalt?.id" />
              <CommentButton :article-id="inhalt?.id" />
              <BookmarkButton :article-id="inhalt?.id" />
              <ShareButton
                :article-id="inhalt?.id"
                :title="inhalt?.title"
                :author-username="inhalt?.author_username"
              />
            </div>
          </div>
          <template  v-else>
            <RecentInhaltListSkeleton v-for="n in 8" :key="n"/>
          </template>
        </div>
      </section>
    </main>
    <aside
      class="flex flex-col justify-between gap-4 min-w-[15rem] max-w-[16rem] h-max min-h-[calc(100svh-8rem)] text-primary dark:text-primary max-md:absolute max-md:w-[20rem] max-md:right-[7%] max-lg:hidden"
    >
      <section class="w-full h-[20rem] bg-white rounded-2xl p-4">
        <h2 class="w-full border-b border-b-accent">Promotion</h2>
        <div class="w-full h-[20rem] flex flex-col gap-1 text-[0.8rem]">
          <p>🎉 Watch out for Sabinus.Meme!, the ultimate meme store app launching soon! 🎉</p>
          <p>This wonderful app aims at being your Go-to store where you can find funniest Investor Sabinus' memes! Users would be able to upload new Sabinus memes, add to favourites for easy reach and also store their other memes.🚀</p>
          <NuxtLink to="https://sabinusmeme.vercel.app/" target="blank" class="border-b hover:border-b-accent rounded-xl text-[0.8rem] px-2">Browing inhalt on a desktop? Take a look here! 🎉</NuxtLink>
        </div>
      </section>

      <section class="w-full h-[20rem] bg-white rounded-2xl p-4 mb-4">
        <h2 class="w-full border-b border-b-accent">
          Hot Trends <Icon name="fluent-emoji-flat:fire" />
        </h2>
        <div class="w-full h-max flex flex-col gap-2">
          <NuxtLink
            to=""
            class="border-b hover:border-b-accent rounded-xl text-[0.8rem] px-2"
            >Rendering images the good way</NuxtLink
          >
          <NuxtLink
            to=""
            class="border-b hover:border-b-accent rounded-xl text-[0.8rem] px-2"
            >18 tools to master Nuxt</NuxtLink
          >
          <NuxtLink
            to=""
            class="border-b hover:border-b-accent rounded-xl text-[0.8rem] px-2"
            >Vue is getting super fun!</NuxtLink
          >
          <NuxtLink
            to=""
            class="border-b hover:border-b-accent rounded-xl text-[0.8rem] px-2"
            >Iconify + Nuxt</NuxtLink
          >
          <NuxtLink
            to=""
            class="border-b hover:border-b-accent rounded-xl text-[0.8rem] px-2"
            >Next vs Nuxt</NuxtLink
          >
        </div>
      </section>
    </aside>
  </div>
</template>
