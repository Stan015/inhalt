<script setup lang="ts">
import { signOut } from "~/auth/auth";
import { useUserStore } from "../../store/userStore";
import { fetchUserFollowers, toggleFollow } from "~/utils/toggleFollow";
import type { Follower } from "~/types/user.types";

const userStore = useUserStore();
const username = userStore.userCredentials.username as string;

const route = useRoute();

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

const currentFollowers =
  (userStore.userCredentials.followers as Array<Follower>) || [];

// toggle follow button
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
  fetchUserFollowers({ username, isLoadingFollowers: { value: true } });
});
</script>

<template>
  <div class="py-6 px-[12%] min-h-main w-full text-primary dark:text-primary">
    <h1 class="font-bold text-[1.5rem] mb-4 text-primary dark:text-secondary">
      My Dashboard
    </h1>
    <div
      class="w-full min-h-[calc(100svh-13rem)] grid grid-cols-[15rem_1fr] grid-rows-1 gap-4"
    >
      <section
        class="rounded-2xl flex flex-col justify-between items-center gap-4"
      >
        <nav class="flex flex-col gap-4 w-full h-max">
          <NuxtLink
            to="/dashboard"
            aria-current="false"
            class="flex flex-shrink-0 items-center gap-3 w-[90%] bg-white border-b-2 border-b-white hover:border-b-accent transition-all px-4 py-[1.5px] rounded-l-lg relative after:content-[' '] after:w-2 after:h-full after:absolute after:right-[-10%] after:rounded-l-2xl after:bg-white after:pointer-events-none aria-[current=true]:after:bg-accent"
            ><Icon name="icon-park-outline:data-all" /> Home</NuxtLink
          >
          <NuxtLink
            to="/dashboard/articles"
            aria-current="false"
            class="flex flex-shrink-0 items-center gap-3 w-[90%] bg-white border-b-2 border-b-white hover:border-b-accent transition-all px-4 py-[1.5px] rounded-l-lg relative after:content-[' '] after:w-2 after:h-full after:absolute after:right-[-10%] after:rounded-l-2xl after:bg-white after:pointer-events-none aria-[current=true]:after:bg-accent"
            ><Icon name="gravity-ui:square-article" /> Articles</NuxtLink
          >
          <NuxtLink
            to="/dashboard/videos"
            aria-current="false"
            class="flex flex-shrink-0 items-center gap-3 w-[90%] bg-white border-b-2 border-b-white hover:border-b-accent transition-all px-4 py-[1.5px] rounded-l-lg relative after:content-[' '] after:w-2 after:h-full after:absolute after:right-[-10%] after:rounded-l-2xl after:bg-white after:pointer-events-none aria-[current=true]:after:bg-accent"
            ><Icon name="lets-icons:video-fill" /> Videos</NuxtLink
          >
          <NuxtLink
            to="/dashboard/likes"
            aria-current="false"
            class="flex flex-shrink-0 items-center gap-3 w-[90%] bg-white border-b-2 border-b-white hover:border-b-accent transition-all px-4 py-[1.5px] rounded-l-lg relative after:content-[' '] after:w-2 after:h-full after:absolute after:right-[-10%] after:rounded-l-2xl after:bg-white after:pointer-events-none aria-[current=true]:after:bg-accent"
          >
            <Icon name="fluent:thumb-like-48-filled" /> My Likes</NuxtLink
          >
          <NuxtLink
            to="/dashboard/bookmarks"
            aria-current="false"
            class="flex flex-shrink-0 items-center gap-3 w-[90%] bg-white border-b-2 border-b-white hover:border-b-accent transition-all px-4 py-[1.5px] rounded-l-lg relative after:content-[' '] after:w-2 after:h-full after:absolute after:right-[-10%] after:rounded-l-2xl after:bg-white after:pointer-events-none aria-[current=true]:after:bg-accent"
          >
            <Icon name="material-symbols:bookmark" /> Bookmarks</NuxtLink
          >
          <NuxtLink
            to="/dashboard/tags"
            aria-current="false"
            class="flex flex-shrink-0 items-center gap-3 w-[90%] bg-white border-b-2 border-b-white hover:border-b-accent transition-all px-4 py-[1.5px] rounded-l-lg relative after:content-[' '] after:w-2 after:h-full after:absolute after:right-[-10%] after:rounded-l-2xl after:bg-white after:pointer-events-none aria-[current=true]:after:bg-accent"
            ><Icon name="hugeicons:tags" /> My Tags</NuxtLink
          >
          <NuxtLink
            to="/dashboard/followers"
            aria-current="true"
            class="flex flex-shrink-0 items-center gap-3 w-[90%] bg-white border-b-2 border-b-white hover:border-b-accent transition-all px-4 py-[1.5px] rounded-l-lg relative after:content-[' '] after:w-2 after:h-full after:absolute after:right-[-10%] after:rounded-l-2xl after:bg-white after:pointer-events-none aria-[current=true]:after:bg-accent"
            ><Icon name="game-icons:shadow-follower" /> Followers</NuxtLink
          >
          <NuxtLink
            to="/dashboard/following"
            aria-current="false"
            class="flex flex-shrink-0 items-center gap-3 w-[90%] bg-white border-b-2 border-b-white hover:border-b-accent transition-all px-4 py-[1.5px] rounded-l-lg relative after:content-[' '] after:w-2 after:h-full after:absolute after:right-[-10%] after:rounded-l-2xl after:bg-white after:pointer-events-none aria-[current=true]:after:bg-accent"
            ><Icon name="simple-line-icons:user-following" />
            Following</NuxtLink
          >
        </nav>
        <section class="w-full h-max bg-white rounded-2xl p-4">
          <h2>News</h2>
          <div class="w-full h-[15rem]"></div>
        </section>
        <button
          @click="signOut"
          class="px-4 py-1 rounded-3xl border-b-2 border-dark text-primary dark:text-secondary dark:border-white hover:border-accent transition-all text-base flex items-center w-max"
          type="button"
        >
          Sign Out
        </button>
      </section>
      <main
        class="w-full min-h-[16rem] h-full flex flex-col gap-4 bg-white rounded-2xl p-4"
      >
        <h2
          class="text-[1.5rem] font-semibold mb-2 w-full border-b-2 border-b-accent"
        >
          My Follower
        </h2>
        <div class="w-full h-full flex flex-col gap-4">
          <div
            class="flex w-full h-max justify-between items-center border-b-2 border-light rounded-2xl px-2 hover:border-accent transition-all"
            v-if="currentFollowers.length > 0"
            v-for="follower in currentFollowers"
            :key="follower.username"
          >
            <NuxtLink
              class="flex w-full h-max justify-between items-center"
              :to="`/${follower.username}`"
            >
              <h3 class="!mb-0">{{ follower.full_name }}</h3>
            </NuxtLink>
            <div class="flex gap-4 cursor-default mb-1">
              <FollowButton
                @toggle-follow="handleFollow"
                :is-loading-follow="isLoadingFollow"
                :following="following"
                :current-auth-user="currentAuthUser"
              />
            </div>
          </div>
          <div v-else class="w-full flex flex-col items-center gap-4">
            <p class="text-[1.1rem] font-medium text-center">
              You do not have followers yet. Create inhalt to gain more
              visibility.
            </p>
            <NuxtLink
              :to="`/${username}/create-inhalt`"
              class="flex items-center gap-1 flex-shrink-0 px-2 border-b-2 bg-action text-secondary dark:text-secondary hover:-translate-y-1 hover:translate-x-1 transition-all h-10 rounded-3xl w-max"
            >
              <Icon name="ph:plus-bold" />
              create inhalt
            </NuxtLink>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
