<script setup lang="ts">
// import { ref } from "vue";
import { storeToRefs } from "pinia";
// import { useResizeObserver } from "@vueuse/core";
import { useEditorStore } from "@/stores/editor";
// import { getA4Height } from "@/utils/file";
import Document from "./Document.vue";
import PreviewZoom from "./PreviewZoom.vue";

const { documentType, zoomLevel } = storeToRefs(useEditorStore());

// const preview = ref<HTMLDivElement>();
// const previewHeight = ref(0);

// useResizeObserver(preview, (nodes) => {
//   const node = nodes[0];
//   const { width } = node.contentRect;
//   previewHeight.value = getA4Height(width);
// });
</script>

<template>
  <aside
    ref="preview"
    class="print:!block mx-auto relative xl:w-[210mm] xl:!h-screen overflow-y-auto group"
  >
    <Document
      id="preview"
      class="print:!transform-none"
      :class="documentType === 'email' ? '' : 'h-full'"
      :style="`transform: scale(${zoomLevel / 100}); transform-origin: top left;`"
    />
    <PreviewZoom
      class="print:hidden hidden xl:block xl:fixed xl:z-10 xl:right-8 xl:bottom-8 xl:bg-white xl:px-6 xl:py-3 xl:rounded xl:shadow-lg opacity-0 group-hover:opacity-100 transition"
    />
  </aside>
</template>
