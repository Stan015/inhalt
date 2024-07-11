<template>
  <header class="w-full h-[6rem] flex items-center justify-between px-[12%]">
    <Logo />

    <Search />

    <NuxtLink to="/create-inhalt" class="flex items-center gap-1">
      <Icon name="ph:plus-bold" />
      create inhalt
    </NuxtLink>

    <NuxtLink to="notification">
      <NotificationButton />
    </NuxtLink>

    <div class="flex gap-6 items-center">
      <NuxtLink to="/login">Login</NuxtLink>
      <NuxtLink to="/sign-up">Sign Up</NuxtLink>
    </div>
  </header>
</template>
