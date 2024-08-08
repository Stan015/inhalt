<script setup lang="ts">
import { useUserStore } from "~/store/userStore";
import { tags } from "~/utils/tags";

const emit = defineEmits(["close"]);
const handleClose = () => {
  emit("close");
};

const userStore = useUserStore();

const searchTag = ref("");

const filteredTags = computed(() => {
  return tags.filter((tag) =>
    tag.toLowerCase().includes(searchTag.value.toLowerCase())
  );
});

const avatar = ref<HTMLInputElement | null>(null);
const convertedAvatarImgFile = ref<string | null>(null);
const currentUserAvatar = userStore.userCredentials?.avatar || null;

const firstName = ref(userStore.userCredentials?.firstName);
const lastName = ref(userStore.userCredentials?.lastName);
const occupation = ref(userStore.userCredentials?.occupation);
let bio = ref(userStore.userCredentials?.bio);

const currentTagsFromStore = userStore.userCredentials?.tags || [];
const selectedTags = ref<Array<string>>(currentTagsFromStore);

const handleSelectTag = (tag: string) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((t) => t !== tag);
  } else {
    selectedTags.value.push(tag);
  }

  userStore.userCredentials.tags = selectedTags.value;

  console.log(selectedTags.value);
};

const handleImagePreview = (file: File) => {
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onloadend = () => {
    convertedAvatarImgFile.value = reader.result as string;
  };
};

const onFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (file) {
    handleImagePreview(file);
  }
};

const wordCount = ref(0);

const checkWordLimit = () => {
  const words = bio.value?.trim().split(/\s+/);
  wordCount.value = words?.length!;

  // Check if the word count exceeds 100
  if (wordCount.value > 100) {
    bio.value = words?.slice(0, 100).join(" ");
    wordCount.value = 100;
  }
};
</script>

<template>
  <div
    class="flex items-center absolute left-0 top-0 bg-dark/[0.5] backdrop:bg-white w-full min-h-screen justify-center"
  >
    <form
      class="flex flex-col items-center p-6 mt-[6rem] z-10 rounded-2xl bg-white gap-4 w-[30rem] max-sm:w-[18rem]"
    >
      <span class="w-full flex gap-4 justify-center relative">
        <h1
          class="font-bold text-lg w-full border-b border-b-accent text-center"
        >
          Edit Profile
        </h1>

        <button
          type="button"
          class="px-2 rounded-3xl border-b-2 border-light dark:border-dark hover:border-accent transition-all text-[1.2rem] flex items-center absolute right-0 -top-3"
          aria-labelledby="cancel edit"
          @click="handleClose"
        >
          X
        </button>
      </span>

      <div class="flex flex-col w-full gap-4">
        <div class="w-full h-[4rem] flex gap-4 items-center justify-between">
          <div v-if="!convertedAvatarImgFile && currentUserAvatar">
            <img
              class="w-[4rem] h-[4rem] rounded-full border border-accent overflow-hidden"
              :src="currentUserAvatar"
              alt="Image Preview"
            />
          </div>
          <div
            class="w-[4rem] h-[4rem] rounded-full border border-accent overflow-hidden"
            v-else-if="!convertedAvatarImgFile && !currentUserAvatar"
          >
            <Icon name="hugeicons:user" class="w-full h-full rounded-full" />
          </div>
          <div v-else>
            <img
              class="w-[4rem] h-[4rem] rounded-full border border-accent overflow-hidden"
              :src="convertedAvatarImgFile"
              alt="Image Preview"
            />
          </div>
          <label
            class="relative w-[7rem] h-[1.8rem] flex items-center justify-center bg-accent border-2 border-secondary rounded-3xl text-secondary dark:text-white text-center text-[0.8rem] transition-all hover:border-accent focus:border-accent cursor-pointer"
          >
            Upload avatar
            <input
              class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              type="file"
              @change="onFileChange"
              ref="avatar"
              accept="image/*"
              title="avatar"
            />
          </label>
        </div>
        <div class="flex w-full items-center gap-4">
          <label class="w-full flex flex-col gap-1">
            First Name
            <input
              type="text"
              class="w-full bg-white text-primary text-sm p-2 rounded-lg border-2 border-light outline-none hover:border-accent focus:border-accent"
              v-model="firstName"
              name="first-name"
              id="first-name"
              required
              placeholder="Enter your first name..."
            />
          </label>
          <label class="w-full flex flex-col gap-1">
            Last Name
            <input
              type="text"
              class="w-full bg-white text-primary text-sm p-2 rounded-lg border-2 border-light outline-none hover:border-accent focus:border-accent"
              v-model="lastName"
              name="last-name"
              id="last-name"
              required
              placeholder="Enter your last name..."
            />
          </label>
        </div>

        <label class="w-full flex flex-col gap-1">
          Occupation
          <input
            type="text"
            class="w-full bg-white text-primary text-sm p-2 rounded-lg border-2 border-light outline-none hover:border-accent focus:border-accent"
            v-model="occupation"
            name="occupation"
            id="occupation"
            required
            placeholder="Enter a occupation..."
          />
        </label>
        <label class="w-full flex flex-col gap-1">
          Bio
          <textarea
            type="text"
            class="w-full bg-white text-primary text-sm p-2 rounded-lg border-2 border-light outline-none hover:border-accent focus:border-accent"
            name="username"
            id="username"
            pattern="^[^\s]+$"
            v-model="bio"
            cols="3"
            @input="checkWordLimit"
            placeholder="Enter a username..."
          />
        </label>
        <div class="w-full flex flex-col gap-1">
          <label class="w-full flex gap-2 justify-between" for="tags">
            Tags
          </label>

          <div id="tags" class="w-full flex flex-col gap-4">
            <input
              type="search"
              class="w-full bg-white text-primary text-sm p-2 rounded-lg border-2 border-light outline-none hover:border-accent focus:border-accent"
              name="search-tags"
              v-model="searchTag"
              id="search_tags"
              placeholder="Search tags"
            />
            <div
              class="w-full h-[6rem] p-1 flex flex-wrap gap-2 overflow-y-scroll scroll-bar justify-center"
            >
              <p
                v-for="tag in filteredTags"
                :key="tag"
                @click="handleSelectTag(tag)"
                :aria-labelledby="`tag: ${tag}`"
                :class="
                  selectedTags?.includes(tag)
                    ? 'bg-accent text-secondary dark:text-secondary'
                    : 'bg-white text-primary dark:text-primary'
                "
                class="w-max h-max text-nowrap px-1 rounded-2xl border text-[0.8rem] border-accent cursor-pointer"
              >
                {{ tag }}
              </p>
            </div>
          </div>
        </div>
        <div class="w-full">
          <p class="text-base mb-1 border-b border-b-accent w-full">Socials</p>
          <div class="w-full flex flex-wrap gap-2 items-center pt-2" >
            <label
              class="border-b border-b-accent w-max text-[0.7rem] rounded-2xl px-2"
              >Github

              <input
                type="url"
                class="w-[4.7rem] bg-white text-primary text-[0.7rem] px-2 py-1 rounded-lg border border-light outline-none hover:border-accent focus:border-accent"
                name="github"
                id="github"
                placeholder="paste url..."
              />
            </label>
            <label
              class="border-b border-b-accent w-max text-[0.7rem] rounded-2xl px-2"
            >
              Twitter/X

              <input
                type="url"
                class="w-[4.7rem] bg-white text-primary text-[0.7rem] px-2 py-1 rounded-lg border border-light outline-none hover:border-accent focus:border-accent"
                name="twitter"
                id="twitter"
                placeholder="paste url..."
              />
            </label>

            <label
              class="border-b border-b-accent w-max text-[0.7rem] rounded-2xl px-2"
            >
              LinkedIn

              <input
                type="url"
                class="w-[4.7rem] bg-white text-primary text-[0.7rem] px-2 py-1 rounded-lg border border-light outline-none hover:border-accent focus:border-accent"
                name="linkedin"
                id="linkedin"
                placeholder="paste url..."
              />
            </label>
          </div>
        </div>
      </div>
      <div class="w-full flex items-center justify-end gap-4">
        <button
          type="button"
          class="w-[6rem] h-10 bg-white border border-accent text-primary rounded-lg hover:shadow-sm hover:shadow-accent transition-all"
          @click="handleClose"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="w-[6rem] h-10 bg-action border-0 text-secondary rounded-lg hover:shadow-sm hover:shadow-accent transition-all"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>
