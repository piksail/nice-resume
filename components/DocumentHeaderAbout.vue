<script setup lang="ts">
import { getNodeStyle } from "@/utils/style";
import useDocumentSettings from "~/composables/use-document-settings";

const { about } = defineProps<{
  about: string;
}>();

const settings = useDocumentSettings();
</script>

<template>
  <p v-if="about" class="flex-1" :style="getNodeStyle(settings.about, 'title')">
    <span
      v-if="settings.aboutQuote.isShown"
      class="leading-none"
      :style="{
        fontFamily: settings.aboutQuote.font,
        fontSize: `${settings.aboutQuote.fontSize}px`,
        fontWeight: settings.aboutQuote.fontWeight,
        fontStyle: settings.aboutQuote.isItalic ? 'italic' : 'initial',
        color: `${settings.aboutQuote.color}`,
      }"
    >
      “
    </span>
    <span>{{ about }}</span>
  </p>
</template>
