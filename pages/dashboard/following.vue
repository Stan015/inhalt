<script setup lang="ts">
import { signOut } from "~/auth/auth";
import { useUserStore } from "../../store/userStore";
import { fetchUserFollowing, toggleFollow } from "~/utils/toggleFollow";
import type { Follower } from "~/types/user.types";

const userStore = useUserStore();
const username = userStore.userCredentials.username as string;

const fullName = userStore.userCredentials.fullName as string;
const userToFollow = ref<string>('');
const isLoadingFollow = ref(false);
const dateOfFollow = new Date().toISOString();
const followingUser = ref(true);
const currentAuthUser = ref(false);

if (username == userToFollow.value) {
  currentAuthUser.value = true;
}

const currentFollowing =
  (userStore.userCredentials.following as Array<Follower>) || [];

if (currentFollowing?.some((user) => user.username === userToFollow.value)) {
  followingUser.value = true;
}

// toggle follow button
const handleFollow = () => {
  if (userToFollow.value) {
    toggleFollow({
      username,
      fullName,
      userToFollow: userToFollow.value,
      isLoadingFollow,
      following: followingUser,
      dateOfFollow,
    });
  }
};

onMounted(() => {
  fetchUserFollowing({ username, isLoadingFollowing: { value: true } });
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
            aria-current="false"
            class="flex flex-shrink-0 items-center gap-3 w-[90%] bg-white border-b-2 border-b-white hover:border-b-accent transition-all px-4 py-[1.5px] rounded-l-lg relative after:content-[' '] after:w-2 after:h-full after:absolute after:right-[-10%] after:rounded-l-2xl after:bg-white after:pointer-events-none aria-[current=true]:after:bg-accent"
            ><Icon name="game-icons:shadow-follower" /> Followers</NuxtLink
          >
          <NuxtLink
            to="/dashboard/following"
            aria-current="true"
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
          My Following
        </h2>
        <div class="w-full h-full flex flex-col gap-4">
          <div
            class="flex w-full h-max justify-between items-center border-b-2 border-light rounded-2xl px-2 hover:border-accent transition-all"
            v-if="currentFollowing.length > 0"
            v-for="following in currentFollowing"
            :key="following.username"
          >
            <NuxtLink
              class="flex w-full h-max justify-between items-center"
              :to="`/${following.username}`"
            >
              <h3 class="!mb-0">{{ following.full_name }}</h3>
            </NuxtLink>
            <div class="flex gap-4 cursor-default mb-1">
              <FollowButton
                @toggle-follow="handleFollow"
                :is-loading-follow="isLoadingFollow"
                :following="followingUser"
                :current-auth-user="currentAuthUser"
                @click="userToFollow = following.username"
              />
            </div>
          </div>
          <div v-else class="w-full flex flex-col items-center gap-4">
            <p class="text-[1.1rem] font-medium text-center">
              You are not following anyone yet. Look up inhalt users and follow.
            </p>
            <NuxtLink
              to="/"
              class="flex items-center gap-1 flex-shrink-0 px-2 border-b-2 bg-action text-secondary dark:text-secondary hover:-translate-y-1 hover:translate-x-1 transition-all h-8 rounded-3xl w-max"
            >
              Go to homepage
            </NuxtLink>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
