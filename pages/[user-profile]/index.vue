<script setup lang="ts">
import type { User } from "~/types/user.types";

const supabase = useSupabaseClient();

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  error ? console.log(error) : console.log("signed out");
  navigateTo("/");
};

const route = useRoute();

const userProfile = route.params.userprofile;

const transformUser = (dbUser: any): User => {
  return {
    ...dbUser,
    fullName: dbUser.full_name,
    firstName: dbUser.first_name,
    lastName: dbUser.last_name,
  };
};

const user = ref<User | null>(null);
const isLoading = ref(true);

const handleUserProfile = async () => {
  isLoading.value = true;

  try {
    const response = await useAsyncData("user-profile", () =>
      $fetch(`/api/user/user-profile?user=${userProfile}`)
    );

    if (!response) {
      throw new Error("Failed to fetch data");
    }

    user.value = transformUser(response.data.value);
  } catch (error) {
    console.error((error as Error).message);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => handleUserProfile());
</script>

<template>
  <div
    class="w-full min-h-main grid grid-cols-[15rem_minmax(20rem,_1fr)_20rem] grid-rows-1 gap-4 py-6 px-[12%]"
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
          <span>
            <NuxtImg
              v-if="user?.avatar"
              class="w-[6rem] h-[6rem] rounded-full border-2 border-accent"
              :src="user.avatar"
              alt="avatar"
            />
            <Icon
              v-else
              name="hugeicons:user"
              class="w-[6rem] h-[6rem] rounded-full border-2 border-accent"
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
          <span class="font-bold text-[1.2rem] text-accent">{{
            user?.total_likes
          }}</span>
          Likes
        </p>
        <p class="min-w-[10rem] p-4 flex flex-col items-center justify-center">
          <span class="font-bold text-[1.2rem] text-accent">32K</span> Inhalts
        </p>
        <p class="min-w-[10rem] p-4 flex flex-col items-center justify-center">
          <span class="font-bold text-[1.2rem] text-accent">{{
            user?.total_bookmarks
          }}</span>
          Bookmarks
        </p>
        <p class="min-w-[10rem] p-4 flex flex-col items-center justify-center">
          <span class="font-bold text-[1.2rem] text-accent">{{user?.followers?.length}}</span> Followers
        </p>
        <p class="min-w-[10rem] p-4 flex flex-col items-center justify-center">
          <span class="font-bold text-[1.2rem] text-accent">{{user?.following?.length}}</span> Following
        </p>
        <p class="min-w-[10rem] p-4 flex flex-col items-center justify-center">
          <span class="font-bold text-[1.2rem] text-accent">{{
            user?.total_comments
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
        <div class="w-full flex flex-col gap-4">
          <NuxtLink
            class="flex w-full justify-between items-center border-b-2 border-white rounded-2xl px-2 hover:border-accent transition-all"
            to="/"
          >
            <h3>inhalt title</h3>
            <div class="flex gap-4 cursor-default bg-red-500 w-[4rem] h-4">
              <!-- <LikeButton />
              <CommentButton />
              <BookmarkButton />
              <ShareButton /> -->
            </div>
          </NuxtLink>
        </div>
      </section>
    </main>
  </div>
</template>
