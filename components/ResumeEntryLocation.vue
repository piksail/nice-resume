<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { templateSettings } from "@/globals";
import { getStringFromSeparator } from "@/utils/string";
import { getNodeStyle } from "@/utils/style";

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
      ...getNodeStyle(settings.entryLocation, 'text'),
      // order: settings.entryLocation.order,
    }"
  >
    <span v-if="settings.entryLocation.beforeSeparator">
      {{ getStringFromSeparator(settings.entryLocation.beforeSeparator) }}
    </span>
    <span>{{ entryLocation }}</span>
  </span>
</template>
