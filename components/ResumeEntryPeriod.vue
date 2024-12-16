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

const { entryPeriod } = defineProps<{
  entryPeriod: string;
}>();

const settings = computed(() => {
  return isThemeCustomized.value
    ? storeSettings.value
    : themeSettings[theme.value].resume;
});
</script>

<template>
  <span
    v-if="entryPeriod"
    :style="{
      ...getNodeStyle(settings.entryPeriod, 'block'),
      ...getNodeStyle(settings.entryPeriod, 'text'),
    }"
  >
    <span v-if="settings.entryPeriod.beforeSeparator">
      {{ getStringFromSeparator(settings.entryPeriod.beforeSeparator) }}
    </span>
    <span>{{ entryPeriod }}</span>
  </span>
</template>
