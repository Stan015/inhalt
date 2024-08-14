<script setup lang="ts">
import type { ArticleCard } from "~/types/tables.types";

defineProps({
  allArticleCards: Array<ArticleCard>,
});
</script>

<template>
  <article
    class="w-full h-max rounded-2xl border border-white relative overflow-hidden text-primary dark:text-primary"
    v-for="article in allArticleCards"
    :key="article.id"
  >
    <NuxtLink
      :to="`/${article.author_username}/articles/${article.id}--${article.title
        .replace(/\s+/g, '-')
        .toLowerCase()}`"
    >
      <NuxtImg
        v-if="article.cover_image"
        :src="article.cover_image_url"
        alt="cover photo"
        loading="lazy"
        class="w-full max-h-[17rem] max-sm:max-h-[11rem]"
      />
    </NuxtLink>

    <div class="w-full h-max bg-white">
      <NuxtLink
        :to="`/${article.author_username}/articles/${
          article.id
        }--${article.title.replace(/\s+/g, '-').toLowerCase()}`"
      >
        <h2
          class="w-full text-center font-bold !text-[1.5rem] max-sm:!text-[1.2rem] px-4 pt-2"
        >
          {{ article.title }}
        </h2>
      </NuxtLink>

      <div
        class="flex items-end justify-between gap-6 max-md:gap-3 rounded-2xl border-t border-t-accent px-4 pt-2 pb-4"
      >
        <div class="flex flex-col justify-end">
          <p class="!mb-0 w-max !text-[0.6rem] max-sm:!text-[0.5rem]">
            {{ article?.formattedDate }}
          </p>
          <p class="!mb-0 w-max !text-[0.6rem] max-sm:!text-[0.5rem]">
            {{ article?.formattedTime }}
          </p>
          <p class="!mb-0 w-max !text-[0.6rem] max-sm:!text-[0.5rem]">
            10 min read
          </p>
        </div>

        <div class="flex gap-4 cursor-default max-md:gap-3 items-center">
          <LikeButton :article-id="article?.id" />
          <CommentButton :article-id="article?.id" />
          <BookmarkButton :article-id="article?.id" />
          <ShareButton
            :article-id="article?.id"
            :title="article?.title"
            :author-username="article?.author_username"
          />
        </div>

        <ProfileCard
          :user-profile-link="`/${article?.author_username}`"
          :name="`${article?.author_fullname}`"
          :occupation="`${article?.author_occupation}`"
          :profile-photo-src="`${article?.author_avatar}`"
          class-name="items-end text-primary dark:text-primary"
        />
      </div>
    </div>
  </article>
</template>
