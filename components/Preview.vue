<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";

const { zoomLevel } = storeToRefs(useEditorStore());
</script>

<template>
  <aside class="lg:overflow-y-auto print:hidden">
    <section
      class="flex w-[210mm] h-[297mm] bg-white shadow m-auto overflow-hidden"
      :style="`transform: scale(${zoomLevel / 100}); transform-origin: top left;`"
    >
      <Document />
    </section>
  </aside>
  <Document class="hidden print:block" />
</template>
