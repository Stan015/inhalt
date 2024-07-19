<script setup lang="ts">
const props = defineProps<{ content: string }>();
const htmlContent = ref();

const handleMarkdownConversion = async () => {
  try {
    const response = await useFetch<{ html: string }>(
      "/api/convert-markdown-to-content",
      {
        method: "POST",
        body: { markdown: props.content },
      }
    );

    if (response.data.value) {
      htmlContent.value = response.data.value.html;
    } else if (response.error.value) {
      console.error("Error loading content:", response.error.value);
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
  <div v-if="htmlContent">
    <div v-html="htmlContent" />
    <!-- <prev>
      {{ htmlContent }}
    </prev> -->
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
