<script setup lang="ts">
const markdownEditor = ref<{ getMarkdown: () => string, getHTML: () => string } | null>(null);
const content = useContent();

const submitPost = async () => {
  const markdownContent = markdownEditor.value.getMarkdown();
  const htmlContent = markdownEditor.value.getHTML();

  console.log("Markdown Content:", markdownContent);
  console.log("HTML Content:", htmlContent);

  await content
    .create({
      body: markdownContent,
      title: "New Post",
      date: new Date().toISOString(),
    })
    .catch((err) => console.error(err));
};
</script>

<template>
  <section class="w-full min-h-main flex flex-col gap-4 py-6 px-[12%]">
    <h1>Write A New Article</h1>
    <div>
      <MarkdownEditor ref="markdownEditor" />
      <button @click="submitPost">Submit</button>
    </div>
  </section>
</template>
