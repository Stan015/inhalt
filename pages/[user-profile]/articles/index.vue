<script setup lang="ts"></script>

<template>
        <h1>Hello articles page</h1>

    <div
      class="w-full min-h-main grid grid-cols-[13rem_minmax(20rem,_1fr)_20rem] grid-rows-1 gap-4 py-6 px-[12%]"
    >
      <div class="flex flex-col gap-4 justify-between w-full h-full">
        <nav class="flex flex-col gap-4 w-full h-max">
          <NuxtLink
            to="/"
            class="flex flex-shrink-0 items-center gap-3 w-[90%] bg-white px-4 py-[1.5px] rounded-l-lg relative after:content-[' '] after:w-2 after:h-full after:absolute after:right-[-10%] after:rounded-l-2xl after:bg-white after:pointer-events-none"
            ><Icon name="icon-park-outline:data-all" /> All</NuxtLink
          >
          <NuxtLink
            to="/articles"
            class="flex flex-shrink-0 items-center gap-3 w-[90%] bg-white px-4 py-[1.5px] rounded-l-lg relative after:content-[' '] after:w-2 after:h-full after:absolute after:right-[-10%] after:rounded-l-2xl after:bg-white after:pointer-events-none"
            ><Icon name="gravity-ui:square-article" /> Articles</NuxtLink
          >
          <NuxtLink
            to="/"
            class="flex flex-shrink-0 items-center gap-3 w-[90%] bg-white px-4 py-[1.5px] rounded-l-lg relative after:content-[' '] after:w-2 after:h-full after:absolute after:right-[-10%] after:rounded-l-2xl after:bg-white after:pointer-events-none"
            ><Icon name="lets-icons:video-fill" /> Video inhalt</NuxtLink
          >
        </nav>
        <section class="w-full h-max bg-white rounded-2xl p-4">
          <h2>News</h2>
          <div class="w-full h-[20rem]"></div>
        </section>
      </div>
      <main class="block w-full h-full pb-6">
        <nav class="flex gap-4 mb-4">
          <button type="button">For you</button>
          <button type="button">Recent</button>
          <button type="button">Trending</button>
          <button type="button">Following</button>
        </nav>
  
        <section>
          <NuxtLink to="/articles/123">
            <article
              class="w-full h-max rounded-2xl border border-white relative overflow-hidden"
            >
              <NuxtImg src="/img1.png" alt="cover photo" class="w-full h-11/12" />
              <div class="w-full h-max bg-white p-4">
                <h2 class="w-full text-center font-bold text-[1.5rem]">
                  Mastering ChatGPT Blog Creation: Dos and Don'ts for SaaS
                  Marketing Managers
                </h2>
                <div class="flex items-end justify-between gap-6">
                  <div class="text-[0.7rem]">
                    <span>Jul 9</span> . 
                    <span>10 min read</span>
                  </div>
  
                  <div class="flex gap-4 cursor-default" >
                      <button type="button" aria-labelledby="likes"><Icon name="mdi:heart-outline" /></button>
                      <button type="button" aria-labelledby="comments"><Icon name="uil:comment" /></button>
                      <button type="button" aria-labelledby="bookmark"><Icon name="material-symbols:bookmark-outline" /></button>
                      <button type="button" aria-labelledby="share"><Icon name="uil:share" /></button>
                  </div>
  
                  <NuxtLink to="/" class="flex flex-col items-end text-[0.7rem]">
                      <NuxtImg src="/img2.png" alt="user profile picture" class="w-6 h-6 rounded-full border" />
                      <h3 class="text-end font-medium">Stanley Azi</h3>
                      <p class="text-end">Frontend Developer</p>
                  </NuxtLink>
                </div>
              </div>
            </article>
          </NuxtLink>
        </section>
      </main>
      <aside
      class="flex flex-col justify-between gap-4 min-w-[15rem] h-max min-h-[calc(100svh-8rem)] text-primary dark:text-primary max-md:absolute max-md:w-[20rem] max-md:right-[7%] max-md:hidden"
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
  