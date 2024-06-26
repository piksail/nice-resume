<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { templateSettings } from "@/globals";
import { getNodeStyle } from "@/utils/style";

const { isThemeCustomized, template } = storeToRefs(useProfileStore());

const { settings: storeSettings } = storeToRefs(useResumeStore());

const { entryTags } = defineProps<{
  entryTags: string[];
}>();

const settings = computed(() => {
  return isThemeCustomized.value
    ? storeSettings.value
    : templateSettings[template.value].resume;
});
</script>

<template>
  <ul
    v-if="entryTags.length"
    class="flex flex-wrap"
    :style="{
      marginTop: `${settings.entryTag.margin[0]}px`,
      marginRight: `${settings.entryTag.margin[1]}px`,
      marginBottom: `${settings.entryTag.margin[2]}px`,
      marginLeft: `${settings.entryTag.margin[3]}px`,
      gap: `${settings.entryTag.gap}px`,
    }"
  >
    <li
      v-for="(tag, tagIndex) in entryTags"
      :key="tagIndex"
      :style="{
        ...getNodeStyle(settings.entryTag, 'text'),
        backgroundColor: settings.entryTag.backgroundColor,
        borderTop: `${settings.entryTag.borderStyle} ${settings.entryTag.borderColor} ${settings.entryTag.border[0]}px`,
        borderRight: `${settings.entryTag.borderStyle} ${settings.entryTag.borderColor} ${settings.entryTag.border[1]}px`,
        borderBottom: `${settings.entryTag.borderStyle} ${settings.entryTag.borderColor} ${settings.entryTag.border[2]}px`,
        borderLeft: `${settings.entryTag.borderStyle} ${settings.entryTag.borderColor} ${settings.entryTag.border[3]}px`,
        borderRadius: `${settings.entryTag.borderRadius}px`,
        paddingTop: `${settings.entryTag.padding[0]}px`,
        paddingRight: `${settings.entryTag.padding[1]}px`,
        paddingBottom: `${settings.entryTag.padding[2]}px`,
        paddingLeft: `${settings.entryTag.padding[3]}px`,
      }"
    >
      {{ tag }}
    </li>
  </ul>
</template>
