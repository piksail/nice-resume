<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import type { ListMarker } from "@/types";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { templateSettings } from "@/globals";

const { isThemeCustomized, template } = storeToRefs(useProfileStore());

const { settings: storeSettings } = storeToRefs(useResumeStore());

const { entryHighlights } = defineProps<{
  entryHighlights: string[];
}>();

const settings = computed(() => {
  return isThemeCustomized.value
    ? storeSettings.value
    : templateSettings[template.value].resume;
});

function getListMarker(value: ListMarker) {
  switch (value) {
    case "hyphen":
      return "'- '";
    case null:
      return "none";
    default:
      return value;
  }
}
</script>

<template>
  <ul
    v-if="entryHighlights.length"
    :style="{
      listStyleType: getListMarker(settings.entryHighlight.listMarker),
      color: settings.entryHighlight.listMarkerColor,
    }"
  >
    <li
      v-for="(highlight, highlightIndex) in entryHighlights"
      :key="highlightIndex"
      :style="{
        fontFamily: settings.entryHighlight.font,
        fontSize: `${settings.entryHighlight.fontSize}px`,
        lineHeight: settings.entryHighlight.lineHeight,
        fontWeight: settings.entryHighlight.fontWeight,
        fontStyle: settings.entryHighlight.isItalic ? 'italic' : 'initial',
        textTransform: settings.entryHighlight.isUppercase
          ? 'uppercase'
          : 'initial',
      }"
    >
      <span :style="{ color: settings.entryHighlight.color }">
        {{ highlight }}
      </span>
    </li>
  </ul>
</template>
