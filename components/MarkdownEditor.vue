<script setup lang="ts">
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/editor";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

const props = defineProps({
  className: String,
  boxHeight: String,
});

const editorRef = ref<HTMLElement | null>(null);
let editorInstance: Editor | null = null;

onMounted(() => {
  if (typeof window !== "undefined" && editorRef.value) {
    editorInstance = new Editor({
      el: editorRef.value,
      height: props.boxHeight,
      initialEditType: "markdown",
      previewStyle: "tab",
      plugins: [codeSyntaxHighlight, colorSyntax],
    });
  }
});

onBeforeUnmount(() => {
  if (editorInstance) {
    editorInstance.destroy();
    editorInstance = null;
  }
});

const getMarkdown = () => editorInstance?.getMarkdown() ?? "";
const getHTML = () => editorInstance?.getHTML() ?? "";

defineExpose({ getMarkdown, getHTML });
</script>

<template>
  <div >
    <div :class="`${className}`" ref="editorRef" />
  </div>
</template>

