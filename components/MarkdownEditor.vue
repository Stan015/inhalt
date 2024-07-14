<script setup lang="ts" >
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/editor";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

const editorRef = ref<HTMLElement | null>(null);
    let editorInstance: Editor;

onMounted(() => {
  editorInstance = new Editor({
    el: editorRef.value,
    height: "500px",
    initialEditType: "markdown",
    previewStyle: "tab",
    plugins: [codeSyntaxHighlight, colorSyntax],
  });
});

const getMarkdown = () => editorInstance.getMarkdown();
const getHTML = () => editorInstance.getHTML();

defineExpose({ getMarkdown, getHTML });
</script>

<template>
  <div>
    <div ref="editorRef" />
  </div>
</template>
