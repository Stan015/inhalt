<script setup lang="ts">
type AuthorCard = {
  authorTag?: boolean;
  name: string;
  occupation: string;
  profilePhotoSrc: string;
  className?: string;
  userProfileLink: string;
};

defineProps<AuthorCard>();
</script>

<template>
  <NuxtLink
    :to="userProfileLink"
    :class="[
      'flex flex-col items-start text-[0.7rem]',
      className ? className : '',
    ]"
  >
    <h3 v-if="authorTag" class="font-bold text-md mb-2 underline">Author</h3>
    <span>
      <NuxtImg
        v-if="profilePhotoSrc !== 'null'"
        :src="profilePhotoSrc"
        :alt="name"
        class="w-6 h-6 rounded-full border"
      />
      <Icon v-else name="hugeicons:user" class="w-6 h-6 rounded-full border" />
    </span>
    <h4 v-if="name !== 'null'" class="text-end font-medium">{{ name }}</h4>
    <p v-if="occupation !== 'null'" class="text-end">{{ occupation }}</p>
  </NuxtLink>
</template>
