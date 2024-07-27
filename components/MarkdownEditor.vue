<script setup lang="ts">
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/editor";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

const props = defineProps({
  className: String,
  boxHeight: String,
})

const editorRef = ref<HTMLElement | null>(null);
let editorInstance: Editor | null = null;

onMounted(() => {
  if (editorRef.value) {
    editorInstance = new Editor({
      el: editorRef.value,
      height: props.boxHeight,
      initialEditType: "markdown",
      previewStyle: "tab",
      plugins: [codeSyntaxHighlight, colorSyntax],
    });

    // const editorEl = editorRef.value.querySelector(".toastui-editor-contents");
    // if (editorEl) {
    //   const styleEl = document.createElement("style");
    //   styleEl.textContent = `
    //     .toastui-editor-contents h1 {
    //       text-decoration: none;
    //     }
    //   `;
    //   editorEl.appendChild(styleEl);
    // }
  }
});

const getMarkdown = () => editorInstance.getMarkdown();
const getHTML = () => editorInstance.getHTML();

defineExpose({ getMarkdown, getHTML });
</script>

<template>
  <div :class="`${className}`">
    <div ref="editorRef" />
  </div>
</template>
