<script setup lang="ts">
import { storeToRefs } from "pinia";
import { getNodeClass, getNodeStyle } from "@/utils/style";
import { useEditorStore } from "@/stores/editor";
import useDocumentSettings from "~/composables/use-document-settings";

const { title } = defineProps<{
  title: string;
}>();

const { focusedInput } = storeToRefs(useEditorStore());

const settings = useDocumentSettings();
</script>

<template>
  <h2
    v-if="title"
    :class="getNodeClass('profileTitle', focusedInput)"
    :style="getNodeStyle(settings.title, 'title')"
  >
    {{ title }}
  </h2>
</template>
