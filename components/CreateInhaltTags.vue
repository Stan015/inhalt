<script setup lang="ts">
import { useCreateInhaltStore } from "~/store/articlesStore";
import { tags } from "~/utils/tags";

const createInhaltStore = useCreateInhaltStore();

const searchTag = ref("");

const filteredTags = computed(() => {
  return tags.filter((tag) =>
    tag.toLowerCase().includes(searchTag.value.toLowerCase())
  );
});

const currentTagsFromStore = createInhaltStore.selectedCreateTags || [];
const selectedTags = ref<Array<string>>(currentTagsFromStore);
const selectedTagsIsExcess = ref(false);

watch(selectedTags, () => {
  if (selectedTags.value.length > 4) {
    selectedTagsIsExcess.value = true;
    alert("You can only select 4 tags.");
  }
}, {immediate: true, deep: true});

const handleSelectTag = (tag: string) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((t) => t !== tag);
  } else {
    selectedTags.value.push(tag);
  }

  createInhaltStore.selectedCreateTags = selectedTags.value;
  selectedTags.value = createInhaltStore.selectedCreateTags;

  // console.log(selectedTags.value);
};

defineExpose({
  selectedTags,
});
</script>

<template>
  <div id="tags" class="w-full flex flex-col gap-4 items-center">
    <input
      type="search"
      class="w-1/2 max-sm:w-full h-8 rounded-3xl p-4 pl-10 bg-white text-primary dark:text-primary text-[1rem] text-center font-medium outline-none border-2 border-white transition-all hover:border-accent focus:border-accent"
      name="search-tags"
      v-model="searchTag"
      id="search_tags"
      placeholder="Search tags"
    />
    <div
      class="w-full min-h-[5.5rem] max-h-[5.5rem] p-1 flex flex-wrap gap-2 overflow-y-scroll scroll-bar justify-center"
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
