<script setup lang="ts">
const props = defineProps<{ content: string }>();
const htmlContent = useState();

const handleMarkdownConversion = async () => {
  try {
    const response = await useAsyncData(() =>
      $fetch<{ html: string }>("/api/articles/convert-markdown-to-content", {
        method: "POST",
        body: { markdown: props.content },
      })
    );

    if (response) {
      htmlContent.value = response.data.value?.html;
    }
  } catch (error) {
    console.error("Error converting markdown:", error);
  }
};

watchEffect(() => {
  if (props.content) {
    handleMarkdownConversion();
  }
});
</script>

<template>
  <div v-if="htmlContent" class="html-content-container w-full">
    <div class="content-wrapper w-full" v-html="htmlContent" />
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
