<script setup lang="ts">
import { getNodeStyle } from "@/utils/style";
import useDocumentSettings from "~/composables/use-document-settings";

const { name } = defineProps<{
  name: string;
}>();

const settings = useDocumentSettings();
</script>

<template>
  <h1 v-if="name" :style="getNodeStyle(settings.name, 'title')">
    {{ name }}
  </h1>
</template>
