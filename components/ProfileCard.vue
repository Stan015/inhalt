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
    <h3 v-if="authorTag" class="font-bold !text-[1rem] mb-2 underline max-md:!text-[0.9rem]">Author</h3>
    <span>
      <NuxtImg
        v-if="profilePhotoSrc !== null && profilePhotoSrc !== 'null' && profilePhotoSrc !== 'undefined'"
        :src="profilePhotoSrc"
        :alt="name"
        class="w-6 h-6 rounded-full border"
      />
      <Icon v-else name="hugeicons:user" class="w-6 h-6 rounded-full border" />
    </span>
    <h4 v-if="name !== null && name !== 'null' && name !== 'undefined'" class="text-end !text-[0.6rem] !font-medium !mb-0 max-sm:!text-[0.5rem]">{{ name }}</h4>
    <p v-if="occupation !== null && occupation !== 'null' && occupation !== 'undefined'" class="text-end !mb-0 !text-[0.6rem] max-sm:!text-[0.5rem]">{{ occupation }}</p>
  </NuxtLink>
</template>
