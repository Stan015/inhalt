<script setup lang="ts">
const props = defineProps<{ content: string }>();
const htmlContent = useState();

const handleMarkdownConversion = async () => {
  try {
    const response = await $fetch<{ html: string }>(
      "/api/articles/convert-markdown-to-content",
      {
        method: "POST",
        body: { markdown: props.content },
      }
    );

    if (response) {
      htmlContent.value = response.html;
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
