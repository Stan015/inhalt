<script setup lang="ts">
import type { Article } from "~/types/tables.types";
import type { User } from "~/types/user.types";

import { signOut } from "~/auth/auth";
import { useUserStore } from "~/store/userStore";
import { useShowEditProfile } from "~/composables/useShowEditProfile";
import { useGetWindowWidth } from "~/composables/useGetWindowWidth";
import ProfileCardSkeleton from "~/components/skeletons/ProfileCardSkeleton.vue";

const userStore = useUserStore();
const userProfileName = userStore.userCredentials.username;
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
const userInhalts = ref<Array<Article> | null>(null);
const isLoadingProfile = ref(true);
const isLoadingInhalts = ref(true);

const handleUserProfile = async () => {
  isLoadingProfile.value = true;

  try {
    const data = await $fetch(`/api/user/user-profile?user=${userProfileName}`);

    if (!data) {
      throw new Error("Failed to fetch data");
    }

    user.value = transformUser(data);
    userStore.userCredentials.bio = user.value.bio;
    userStore.userCredentials.tags = user.value.tags;
    userStore.userCredentials.socials = user.value.socials;
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
      `/api/user/user-inhalts?user=${userProfileName}`
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

const showEditProfile = useState("show-edit-profile", () => false);
const toggleEditProfile = (value: boolean) => {
  showEditProfile.value = useShowEditProfile(value);
};

const { isDashboardMenuOpen } = useGetWindowWidth();
const setDashboardMenu = ref(isDashboardMenuOpen);

const toggleDashboardMenu = () => {
  setDashboardMenu.value = !setDashboardMenu.value;
};

onMounted(() => {
  handleUserProfile();
  handleUserInhalts();
});
</script>

<template>
  <div
    class="py-6 px-[12%] max-lg:px-[7%] min-h-main w-full text-primary dark:text-primary relative"
  >
    <div class="flex w-full gap-6 justify-between">
      <h1 class="font-bold text-[1.5rem] max-sm:text-[1.3rem] mb-4 text-primary dark:text-secondary">
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
            aria-current="true"
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
      <main class="flex flex-col gap-4 w-full">
        <section class="w-full min-h-[16rem] h-max bg-white rounded-2xl p-4">
          <h1
            class="text-[1.5rem] max-sm:text-[1.3rem] font-bold mb-4 w-full border-b-2 border-b-accent"
          >
            Profile
          </h1>
          <div class="w-full flex flex-col gap-4 items-center">
            <div
              v-if="!isLoadingProfile"
              class="flex flex-row max-sm:flex-col gap-4 items-center max-md:justify-center w-full justify-between"
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
                  class="w-full h-full rounded-full"
                />
              </span>
              <div class="flex flex-col items-center gap-1">
                <h2 class="mb-0 text-center text-[1.3rem] max-sm:text-[1.1rem]">
                  {{ user?.fullName }}
                </h2>
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
              <div
                class="max-md:max-w-[18rem] h-full max-w-[22rem] flex flex-col gap-4 items-center"
              >
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

                <button
                  class="mt-2 bg-action text-secondary rounded-2xl px-4 py-1 hover:-translate-y-1 hover:translate-x-1 transition-all text-nowrap"
                  type="button"
                  @click="toggleEditProfile(true)"
                >
                  Edit Profile
                </button>
                <EditProfile
                  v-if="showEditProfile"
                  @close="toggleEditProfile(false)"
                />
              </div>
            </div>
            <ProfileCardSkeleton class-name="!flex-row max-sm:!flex-col !gap-4 !items-center max-md:!justify-center !w-full !justify-evenly" v-else />
          </div>
        </section>
        <section class="flex max-md:flex-col gap-4 w-full">
          <div
            class="grid grid-cols-3 place-items-center gap-2 text-base border-b-2 pb-2 max-md:p-2 bg-white rounded-2xl w-1/2 max-md:w-full"
          >
            <p
              class="min-w-[10rem] max-sm:min-w-max p-4 flex flex-col items-center justify-center max-sm:text-[0.8rem] max-md:p-1"
            >
              <span
                class="font-bold text-[1.2rem] max-sm:text-base text-accent h-6"
                >{{ user?.total_likes || 0 }}</span
              >
              Likes
            </p>
            <p
              class="min-w-[10rem] max-sm:min-w-max p-4 flex flex-col items-center justify-center max-sm:text-[0.8rem] max-md:p-1"
            >
              <span
                class="font-bold text-[1.2rem] max-sm:text-base text-accent h-6"
                >{{ user?.total_articles! + user?.total_videos! || 0 }}</span
              >
              Inhalts
            </p>
            <NuxtLink
              to="/dashboard/bookmarks"
              class="min-w-[10rem] max-sm:min-w-max p-4 flex flex-col items-center justify-center max-sm:text-[0.8rem] max-md:p-1"
            >
              <span
                class="font-bold text-[1.2rem] max-sm:text-base text-accent h-6"
                >{{ user?.total_bookmarks || 0 }}</span
              >
              Bookmarks
            </NuxtLink>
            <NuxtLink
              to="/dashboard/followers"
              class="min-w-[10rem] max-sm:min-w-max p-4 flex flex-col items-center justify-center max-sm:text-[0.8rem] max-md:p-1"
            >
              <span
                class="font-bold text-[1.2rem] max-sm:text-base text-accent h-6"
                >{{ user?.followers?.length || 0 }}</span
              >
              Followers
            </NuxtLink>
            <NuxtLink
              to="/dashboard/following"
              class="min-w-[10rem] max-sm:min-w-max p-4 flex flex-col items-center justify-center max-sm:text-[0.8rem] max-md:p-1"
            >
              <span
                class="font-bold text-[1.2rem] max-sm:text-base text-accent h-6"
                >{{ user?.following?.length || 0 }}</span
              >
              Following
            </NuxtLink>
            <p
              class="min-w-[10rem] max-sm:min-w-max p-4 flex flex-col items-center justify-center max-sm:text-[0.8rem] max-md:p-1"
            >
              <span
                class="font-bold text-[1.2rem] max-sm:text-base text-accent h-6"
                >{{ user?.total_comments || 0 }}</span
              >
              Comments
            </p>
          </div>
          <div
            class="grid grid-cols-3 place-items-center gap-2 text-base border-b-2 pb-2 max-md:p-2 bg-white rounded-2xl w-1/2 max-md:w-full"
          >
            <p
              class="min-w-[10rem] max-sm:min-w-max p-4 flex flex-col items-center justify-center max-sm:text-[0.8rem] max-md:p-1"
            >
              <span
                class="font-bold text-[1.2rem] max-sm:text-base text-accent h-6"
                >{{ user?.total_bookmarks || 0 }}</span
              >
              Rank
            </p>
            <p
              class="min-w-[10rem] max-sm:min-w-max p-4 flex flex-col items-center justify-center max-sm:text-[0.8rem] max-md:p-1"
            >
              <span
                class="font-bold text-[1.2rem] max-sm:text-base text-accent h-6"
                >{{ 0 }}</span
              >
              Watched
            </p>
            <p
              class="min-w-[10rem] max-sm:min-w-max p-4 flex flex-col items-center justify-center max-sm:text-[0.8rem] max-md:p-1"
            >
              <span
                class="font-bold text-[1.2rem] max-sm:text-base text-accent h-6"
                >{{ user?.followers?.length || 0 }}</span
              >
              Super Usefull
            </p>
            <p
              class="min-w-[10rem] max-sm:min-w-max p-4 flex flex-col items-center justify-center max-sm:text-[0.8rem] max-md:p-1"
            >
              <span
                class="font-bold text-[1.2rem] max-sm:text-base text-accent h-6"
                >{{ user?.total_likes || 0 }}</span
              >
              Read
            </p>
            <NuxtLink
              to="/dashboard/tags"
              class="min-w-[10rem] max-sm:min-w-max p-4 flex flex-col items-center justify-center max-sm:text-[0.8rem] max-md:p-1"
            >
              <span
                class="font-bold text-[1.2rem] max-sm:text-base text-accent h-6"
                >{{ userStore.userCredentials.tags?.length || 0 }}</span
              >
              My Tags
            </NuxtLink>
            <p
              class="min-w-[10rem] max-sm:min-w-max p-4 flex flex-col items-center justify-center max-sm:text-[0.8rem] max-md:p-1"
            >
              <span
                class="font-bold text-[1.2rem] max-sm:text-base text-accent h-6"
                >{{ user?.total_comments || 0 }}</span
              >
              My Comments
            </p>
          </div>
        </section>
        <section class="w-full">
          <div
            class="w-full min-h-[21rem] rounded-2xl flex flex-col gap-4 bg-white"
          ></div>
        </section>
      </main>
    </div>
  </div>
</template>
