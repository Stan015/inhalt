<script setup lang="ts">
import type { User } from "~/types/user.types";

import { signOut } from "~/auth/auth";
import { useUserStore } from "../../store/userStore";
import { useGetWindowWidth } from "~/composables/useGetWindowWidth";

const userStore = useUserStore();
const selectedTags = computed(() => userStore.userCredentials.tags || []);
const isEditing = ref(false);
const isLoading = ref(false);

const stopWatcher = watch(
  selectedTags,
  () => {
    isEditing.value = true;
    console.log("Selected tags updated:", selectedTags.value);
  },
  { deep: true }
);

const handleUpdateTags = async () => {
  const supabase = useSupabaseClient<User>();
  isLoading.value = true;

  try {
    const { data, error } = await supabase
      .from("users")
      .update({
        tags: selectedTags.value,
      })
      .eq("username", userStore.userCredentials.username)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    console.log(data);
  } catch (error) {
    console.error((error as Error).message);
  } finally {
    isLoading.value = false;
    isEditing.value = false;
  }
};

const { isDashboardMenuOpen } = useGetWindowWidth();
const setDashboardMenu = ref(isDashboardMenuOpen);

const toggleDashboardMenu = () => {
  setDashboardMenu.value = !setDashboardMenu.value;
};

onUnmounted(() => {
  stopWatcher();
});
</script>

<template>
  <div
    class="py-6 px-[12%] max-lg:px-[7%] min-h-main w-full text-primary dark:text-primary relative"
  >
    <div class="flex w-full gap-6 justify-between">
      <h1
        class="font-bold text-[1.5rem] max-sm:text-[1.3rem] mb-4 text-primary dark:text-secondary"
      >
        My Dashboard
      </h1>
      <button
        @click="toggleDashboardMenu"
        type="button"
        class="w-8 h-8 rounded-full hidden max-md:block"
      >
        <Icon
          class="bg-accent w-8 h-8"
          name="streamline:horizontal-menu-circle-solid"
        />
      </button>
    </div>
    <div class="w-full min-h-[calc(100svh-13rem)] h-full flex gap-4">
      <section
        v-if="setDashboardMenu"
        class="rounded-2xl flex flex-col justify-between items-center gap-6 h-[calc(100%-5rem)] min-w-[12rem] relative max-md:absolute max-md:right-[7%] max-md:top-[5rem] max-md:bg-black/[0.9] max-md:z-20 max-md:pl-8 max-md:py-8 transition-all"
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
            aria-current="true"
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
            aria-current="false"
            class="flex flex-shrink-0 items-center gap-3 w-[90%] bg-white border-b-2 border-b-white hover:border-b-accent transition-all px-4 py-[1.5px] rounded-l-lg relative after:content-[' '] after:w-2 after:h-full after:absolute after:right-[-10%] after:rounded-l-2xl after:bg-white after:pointer-events-none aria-[current=true]:after:bg-accent"
            ><Icon name="simple-line-icons:user-following" />
            Following</NuxtLink
          >
        </nav>
        <section class="w-full h-[18rem] bg-white rounded-2xl p-4">
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
        class="w-full min-h-screen h-full flex flex-col gap-4 bg-white rounded-2xl p-4"
      >
        <h2
          class="text-[1.5rem] font-semibold mb-2 w-full border-b-2 border-b-accent"
        >
          My Tags
        </h2>
        <div class="w-full h-full flex flex-col gap-4 items-center">
          <MyTags />
          <SaveButton
            v-if="isEditing"
            @click="handleUpdateTags"
            :is-loading="isLoading"
            name="Save Changes"
          />
        </div>
      </main>
    </div>
  </div>
</template>
