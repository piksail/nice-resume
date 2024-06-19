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
  <span v-if="entryTitle" :style="getNodeStyle(settings.entryTitle, 'text')">
    <span v-if="settings.entryTitle.beforeSeparator">
      {{ getStringFromSeparator(settings.entryTitle.beforeSeparator) }}
    </span>
    <span>{{ entryTitle }}</span>
  </span>
</template>
