<script setup lang="ts"></script>

<template>
  <div
    class="w-full min-h-main flex gap-4 py-6 px-[12%] relative max-md:px-[7%]"
  >
    <div
      class="flex flex-col gap-4 min-w-[12rem] justify-between h-max min-h-[calc(100svh-8rem)] text-primary dark:text-primary max-md:hidden min-lg:min-w-[10rem]"
    >
      <nav class="flex flex-col gap-4 w-full h-max">
        <NuxtLink
          to="/"
          aria-current="false"
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
          aria-current="true"
          class="flex flex-shrink-0 items-center gap-3 w-[90%] bg-white border-b-2 border-b-white hover:border-b-accent transition-all px-4 py-[1.5px] rounded-l-lg relative after:content-[' '] after:w-2 after:h-full after:absolute after:right-[-10%] after:rounded-l-2xl after:bg-white after:pointer-events-none aria-[current=true]:after:bg-accent"
          ><Icon name="lets-icons:video-fill" /> Videos</NuxtLink
        >
      </nav>
      <section
        class="w-full h-[20rem] bg-white rounded-2xl p-4 text-primary dark:text-primary mb-4"
      >
        <h2 class="w-full border-b border-b-accent">News</h2>
        <div class="w-full"></div>
      </section>
    </div>
    <main class="block w-full h-full pb-6 text-primary dark:text-primary">
      <DiscoveryNavLinks current-page="trending" parent-page="videos" />
      <section class="flex flex-col gap-4 w-full min-h-dvh h-full">
        <article
          class="w-full h-max rounded-2xl border border-white relative overflow-hidden text-primary dark:text-primary"
        >
          <NuxtLink to="" class="w-full h-max block">
            <NuxtImg
              src="/img4.jpg"
              alt="cover photo"
              loading="lazy"
              class="w-full max-h-[17rem] max-sm:max-h-[11rem]"
            />
          </NuxtLink>

          <div class="w-full h-max bg-white">
            <NuxtLink to="">
              <h2
                class="w-full text-center font-bold !text-[1.5rem] max-sm:!text-[1.2rem] px-4 pt-2"
              >
                Video inhalts coming soon! 🚀
              </h2>
            </NuxtLink>

            <div
              class="flex items-end justify-between gap-6 max-md:gap-3 rounded-2xl border-t border-t-accent px-4 pt-2 pb-4"
            >
              <div class="flex flex-col justify-end">
                <p class="!mb-0 w-max !text-[0.6rem] max-sm:!text-[0.5rem]">
                  Aug 16, 2024
                </p>
                <p class="!mb-0 w-max !text-[0.6rem] max-sm:!text-[0.5rem]">
                  10:00 AM
                </p>
                <p class="!mb-0 w-max !text-[0.6rem] max-sm:!text-[0.5rem]">
                  11 min read
                </p>
              </div>

              <div class="flex gap-4 cursor-default max-md:gap-3 items-center">
                <LikeButton />
                <CommentButton />
                <BookmarkButton />
                <ShareButton />
              </div>

              <ProfileCard
                user-profile-link=""
                name="Stanley Azi"
                occupation="Frontend Developer"
                profile-photo-src="/img2.png"
                class-name="items-end text-primary dark:text-primary"
              />
            </div>
          </div>
        </article>
      </section>
    </main>
    <aside
      class="flex flex-col justify-between gap-4 min-w-[15rem] h-max min-h-[calc(100svh-8rem)] text-primary dark:text-primary max-md:absolute max-md:w-[20rem] max-md:right-[7%] max-lg:hidden"
    >
      <section class="w-full h-[20rem] bg-white rounded-2xl p-4">
        <h2 class="w-full border-b border-b-accent">Promotion</h2>
        <div class="w-full h-[20rem]"></div>
      </section>

      <section class="w-full h-[20rem] bg-white rounded-2xl p-4 mb-4">
        <h2 class="w-full border-b border-b-accent">
          Hot Trends <Icon name="fluent-emoji-flat:fire" />
        </h2>
        <div class="w-full h-[25rem] flex flex-col gap-2">
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
  <NuxtPage />
</template>
