<script setup lang="ts">
import { storeToRefs } from "pinia";
import Slider from "primevue/slider";
import { useEditorStore } from "@/stores/editor";

const { zoomLevel } = storeToRefs(useEditorStore());
</script>

<template>
  <label for="previewZoomLevel" class="text-pink-500">
    <span class="label">Zoom</span>
    <div class="flex gap-2 items-center">
      <Slider
        inputId="previewZoomLevel"
        v-model="zoomLevel"
        class="w-36"
        :min="50"
        :max="150"
      />
      <output class="w-[3rem] text-blue-500">{{ zoomLevel }}%</output>
    </div>
  </label>
</template>
