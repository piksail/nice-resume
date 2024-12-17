<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import Field from "./Field.vue";

const { zoomLevel } = storeToRefs(useEditorStore());
</script>

<template>
  <Field
    id="previewZoomLevel"
    :label="$t('zoom')"
    type="range"
    :min="50"
    :max="150"
    v-model="zoomLevel"
  />
</template>
