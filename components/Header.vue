<script setup lang="ts">
import { useUserStore } from "~/store/userStore";
import { signOut } from "~/auth/auth";

const user = useUserStore();
const { firstName, username, avatar } = user.userCredentials;

const showMenu = ref(false);

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};
</script>

<template>
  <header class="w-full">
    <div
      class="w-full h-[6rem] flex items-center justify-between px-[12%] gap-4 text-base max-lg:px-[7%] max-md:hidden"
    >
      <Logo />
      <Search />
      <nav class="flex items-center gap-4 justify-center h-8 mx-6 max-sm:mx-4">
        <NuxtLink
          :to="`/${username}/create-inhalt`"
          class="flex items-center gap-1 flex-shrink-0 px-2 pt-1 border-b-2 dark:border-dark hover:border-accent transition-all h-10 rounded-3xl"
        >
          <Icon name="ph:plus-bold" />
          create inhalt
        </NuxtLink>
        <NuxtLink
          :to="`/${username}/notification`"
          class="px-2 pt-1 rounded-3xl border-b-2 border-light dark:border-dark hover:border-accent transition-all"
        >
          <NotificationButton />
        </NuxtLink>
      </nav>
      <div class="w-max h-full flex justify-center items-center relative">
        <NuxtLink
          :to="`/${username}`"
          class="flex items-center justify-center h-10 rounded-3xl text-base bg-accent text-secondary p-4"
          v-if="user.isLoggedIn"
        >
          <div class="flex items-center justify-center gap-4 pr-4 border-r-2">
            <Icon name="fluent:thumb-like-48-filled" />
            <span>1120</span>
          </div>
          <div class="flex items-center justify-center gap-4 pl-4">
            <span
              class="flex items-center justify-center border rounded-full gap-4 w-max h-max overflow-hidden"
            >
              <NuxtImg
                v-if="avatar"
                :src="avatar"
                alt="user"
                class="w-6 h-6 rounded-full"
              />
              <Icon
                v-else
                name="hugeicons:user"
                class="w-6 h-6 rounded-full m-1"
              />
            </span>
            <span v-if="firstName">{{ firstName }}</span>
          </div>
        </NuxtLink>
        <nav
          v-else
          class="flex items-center justify-center h-10 rounded-3xl text-base bg-accent text-secondary p-4 flex-shrink-0 gap-4"
        >
          <NuxtLink to="/login">Login</NuxtLink>
          <NuxtLink to="/sign-up">Sign Up</NuxtLink>
        </nav>
        <ToggleTheme />
      </div>
    </div>

    <!-- mobile v -->
    <div
      class="w-full h-[7rem] flex-col items-center gap-2 mt-4  px-[12%] text-base max-md:px-[7%] hidden max-md:flex"
    >
      <div
        class="w-full flex items-center justify-between gap-4 max-md:gap-2 relative"
      >
        <Logo />
        <nav
          class="flex items-center gap-4 max-sm:gap-3 justify-center h-8 mx-6"
        >
          <NuxtLink
            :to="`/${username}/create-inhalt`"
            class="flex items-center gap-1 flex-shrink-0 max-sm:text-[0.7rem] max-md:font-medium px-2 pt-1 border-b-2 dark:border-dark max-md:dark:border-light hover:border-accent transition-all h-10 max-sm:h-[1.9rem] rounded-3xl"
          >
            <Icon name="ph:plus-bold" />
            create inhalt
          </NuxtLink>
          <NuxtLink
            :to="`/${username}/notification`"
            class="px-2 pt-1 max-md:pt-[0.3rem] rounded-3xl border-b-2 dark:border-dark max-md:dark:border-light hover:border-accent transition-all"
          >
            <NotificationButton />
          </NuxtLink>
        </nav>
        <BurgerMenu @toggleBurgerMenu="toggleMenu" :show-menu="showMenu" />

        <div
          v-if="showMenu"
          class="flex flex-col items-end justify-between py-4 gap-3 w-full min-h-[calc(100dvh-4rem)] text-primary dark:text-primary bg-black/[0.9] absolute z-40 top-[4rem]"
        >
          <nav class="flex flex-col gap-4 w-1/2 h-max">
            <NuxtLink
              to="/"
              aria-current="true"
              class="flex flex-shrink-0 items-center gap-3 w-[90%] bg-white border-b-2 border-b-white hover:border-b-accent transition-all px-4 py-[1.5px] rounded-l-lg relative after:content-[' '] after:w-2 after:h-full after:absolute after:right-[-10%] after:rounded-l-2xl after:bg-white after:pointer-events-none aria-[current=true]:after:bg-accent"
              ><Icon name="icon-park-outline:data-all" /> All</NuxtLink
            >
            <NuxtLink
              to="/articles"
              aria-current="false"
              class="flex flex-shrink-0 items-center gap-3 w-[90%] bg-white border-b-2 border-b-white hover:border-b-accent transition-all px-4 py-[1.5px] rounded-l-lg relative after:content-[' '] after:w-2 after:h-full after:absolute after:right-[-10%] after:rounded-l-2xl after:bg-white after:pointer-events-none aria-[current=true]:after:bg-accent"
              ><Icon name="gravity-ui:square-article" /> Articles</NuxtLink
            >
            <NuxtLink
              to="/videos"
              aria-current="false"
              class="flex flex-shrink-0 items-center gap-3 w-[90%] bg-white border-b-2 border-b-white hover:border-b-accent transition-all px-4 py-[1.5px] rounded-l-lg relative after:content-[' '] after:w-2 after:h-full after:absolute after:right-[-10%] after:rounded-l-2xl after:bg-white after:pointer-events-none aria-[current=true]:after:bg-accent"
              ><Icon name="lets-icons:video-fill" /> Videos</NuxtLink
            >
          </nav>

          <div
            class="w-1/2 h-full flex flex-col gap-6 justify-center items-center"
          >
            <div class="w-1/2 h-full flex justify-center items-center relative">
              <NuxtLink
                :to="`/${username}`"
                class="flex items-center justify-center h-10 rounded-3xl text-base bg-accent text-secondary p-4"
                v-if="user.isLoggedIn"
              >
                <div
                  class="flex items-center justify-center gap-4 pr-4 border-r-2"
                >
                  <Icon name="fluent:thumb-like-48-filled" />
                  <span>1120</span>
                </div>
                <div class="flex items-center justify-center gap-4 pl-4">
                  <span
                    class="flex items-center justify-center border rounded-full gap-4 w-max h-max overflow-hidden"
                  >
                    <NuxtImg
                      v-if="avatar"
                      :src="avatar"
                      alt="user"
                      class="w-6 h-6 rounded-full"
                    />
                    <Icon
                      v-else
                      name="hugeicons:user"
                      class="w-6 h-6 rounded-full m-1"
                    />
                  </span>
                  <span v-if="firstName">{{ firstName }}</span>
                </div>
              </NuxtLink>
              <nav
                v-else
                class="flex items-center justify-center h-10 rounded-3xl text-base bg-accent text-secondary p-4 flex-shrink-0 gap-4"
              >
                <NuxtLink to="/login">Login</NuxtLink>
                <NuxtLink to="/sign-up">Sign Up</NuxtLink>
              </nav>
            </div>
            <ToggleTheme class-name="!relative" />
          </div>

          <div class="w-1/2 flex items-center justify-center mb-4">
            <button
              @click="signOut"
              class="px-4 py-1 rounded-3xl border-b-2 border-white text-secondary dark:text-secondary dark:border-white hover:border-accent transition-all text-base flex items-center w-max"
              type="button"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <Search />
    </div>
  </header>
</template>
