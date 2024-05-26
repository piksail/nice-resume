<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { templateSettings } from "@/globals";

const { isThemeCustomized, template } = storeToRefs(useProfileStore());

const { settings: storeSettings } = storeToRefs(useResumeStore());

const { entryLocation } = defineProps<{
  entryLocation: string;
}>();

const settings = computed(() => {
  return isThemeCustomized.value
    ? storeSettings.value
    : templateSettings[template.value].resume;
});
</script>

<template>
  <span
    v-if="entryLocation"
    :style="{
      fontFamily: settings.entryLocation.font,
      fontSize: `${settings.entryLocation.fontSize}px`,
      lineHeight: settings.entryLocation.lineHeight,
      fontWeight: settings.entryLocation.fontWeight,
      fontStyle: settings.entryLocation.isItalic ? 'italic' : 'initial',
      textTransform: settings.entryLocation.isUppercase
        ? 'uppercase'
        : 'initial',
      color: settings.entryLocation.color,
    }"
  >
    {{ entryLocation }}
  </span>
</template>
