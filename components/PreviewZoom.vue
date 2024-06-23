<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";

const { zoomLevel } = storeToRefs(useEditorStore());
</script>

<template>
  <label for="previewZoomLevel" class="text-pink-500">
    <span class="label">Zoom</span>
    <div class="flex gap-2 items-center">
      <input
        id="previewZoomLevel"
        class="w-36"
        type="range"
        min="50"
        max="150"
        v-model="zoomLevel"
      />
      <output class="w-[3rem] text-blue-500">{{ zoomLevel }}%</output>
    </div>
  </label>
</template>
