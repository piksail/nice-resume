<script setup lang="ts">
import { getNodeStyle } from "@/utils/style";
import useDocumentSettings from "~/composables/use-document-settings";

const { title } = defineProps<{
  title: string;
}>();

const settings = useDocumentSettings();
</script>

<template>
  <h2 v-if="title" :style="getNodeStyle(settings.title, 'title')">
    {{ title }}
  </h2>
</template>
