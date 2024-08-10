<script setup lang="ts">
import { useUserStore } from "~/store/userStore";
import { tags } from "~/utils/tags";

const userStore = useUserStore();

const searchTag = ref("");

const filteredTags = computed(() => {
  return tags.filter((tag) =>
    tag.toLowerCase().includes(searchTag.value.toLowerCase())
  );
});

const currentTagsFromStore = userStore.userCredentials?.tags || [];
const selectedTags = ref<Array<string>>(currentTagsFromStore);

const handleSelectTag = (tag: string) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((t) => t !== tag);
  } else {
    selectedTags.value.push(tag);
  }

  userStore.userCredentials.tags = selectedTags.value;
  selectedTags.value = userStore.userCredentials.tags;

  // console.log(selectedTags.value);
};

defineExpose({
  selectedTags,
});
</script>

<template>
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
      class="w-full min-h-[6rem] p-1 flex flex-wrap gap-2 overflow-y-scroll scroll-bar justify-center"
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
</template>
