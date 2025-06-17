<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import useDocumentSettings from "~/composables/use-document-settings";
import Document from "./Document.vue";
import PreviewZoom from "./PreviewZoom.vue";
import type { PaperDocumentSettings } from "~/types";

const { documentType, zoomLevel } = storeToRefs(useEditorStore());
const settings = useDocumentSettings();
</script>

<template>
  <aside
    ref="preview"
    class="print:!block print:!w-full mx-auto relative xl:w-[210mm] xl:!h-screen overflow-y-auto group"
    :style="{
      backgroundColor:
        documentType === 'email'
          ? ''
          : (settings as unknown as PaperDocumentSettings).document
              .backgroundColor,
    }"
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
