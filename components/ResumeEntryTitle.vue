<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { templateSettings } from "@/globals";

const { isThemeCustomized, template } = storeToRefs(useProfileStore());

const { settings: storeSettings } = storeToRefs(useResumeStore());

const { entryTitle } = defineProps<{
  entryTitle: string;
}>();

const settings = computed(() => {
  return isThemeCustomized.value
    ? storeSettings.value
    : templateSettings[template.value].resume;
});
</script>

<template>
  <span
    v-if="entryTitle"
    :style="{
      fontFamily: settings.entryTitle.font,
      fontSize: `${settings.entryTitle.fontSize}px`,
      lineHeight: settings.entryTitle.lineHeight,
      fontWeight: settings.entryTitle.fontWeight,
      fontStyle: settings.entryTitle.isItalic ? 'italic' : 'initial',
      textTransform: settings.entryTitle.isUppercase ? 'uppercase' : 'initial',
      color: settings.entryTitle.color,
    }"
  >
    {{ entryTitle }}
  </span>
</template>
