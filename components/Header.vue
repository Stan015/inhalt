<script setup lang="ts">
import { useUserStore } from "~/store/userStore";

const user = useUserStore();
const { firstName, username, avatar } = user.userCredentials;
</script>

<template>
  <header
    class="w-full h-[6rem] flex items-center justify-between px-[12%] gap-4 text-base max-md:px-[7%]"
  >
    <Logo />

    <Search />

    <nav class="flex items-center gap-4 justify-center h-8 mx-6">
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
  </header>
</template>
