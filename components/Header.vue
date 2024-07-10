<template>
  <header class="w-full h-[6rem] flex items-center justify-between px-[7%]">
    <Logo />

    <Search />

    <NuxtLink to="/create-post" class="flex items-center gap-1">
      <Icon name="ph:plus-bold" />
      create post
    </NuxtLink>

    <NuxtLink to="notification">
      <Notification />
    </NuxtLink>

    <div class="flex gap-6 items-center">
      <NuxtLink to="/login">Login</NuxtLink>
      <NuxtLink to="/sign-up">Sign Up</NuxtLink>
    </div>
  </header>
</template>
