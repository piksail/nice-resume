<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { themeSettings } from "@/globals";
import { getStringFromSeparator } from "@/utils/string";
import { getNodeStyle } from "@/utils/style";

const { isThemeCustomized, theme } = storeToRefs(useProfileStore());

const { settings: storeSettings } = storeToRefs(useResumeStore());

const { entryTitle } = defineProps<{
  entryTitle: string;
}>();

const settings = computed(() => {
  return isThemeCustomized.value
    ? storeSettings.value
    : themeSettings[theme.value].resume;
});
</script>

<template>
  <span
    v-if="entryTitle"
    :style="{
      ...getNodeStyle(settings.entryTitle, 'text'),
      // order: settings.entryTitle.order,
    }"
  >
    <span v-if="settings.entryTitle.beforeSeparator">
      {{ getStringFromSeparator(settings.entryTitle.beforeSeparator) }}
    </span>
    <span>{{ entryTitle }}</span>
  </span>
</template>
