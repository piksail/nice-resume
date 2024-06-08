<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { templateSettings } from "@/globals";
import { getListMarker } from "@/utils/editor";

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
</script>

<template>
  <ul
    v-if="entryHighlights.length"
    class="flex"
    :style="{
      flexDirection: settings.entryHighlight.listOrientation,
      gap: `${settings.entryHighlight.gap}px`,
      listStyleType: getListMarker(settings.entryHighlight.listMarker),
      color: settings.entryHighlight.listMarkerColor,
      backgroundColor: settings.entryHighlight.backgroundColor,
      marginTop: `${settings.entryHighlight.margin[0]}px`,
      marginRight: `${settings.entryHighlight.margin[1]}px`,
      marginBottom: `${settings.entryHighlight.margin[2]}px`,
      marginLeft: `${settings.entryHighlight.margin[3]}px`,
      borderTop: `${settings.entryHighlight.borderStyle} ${settings.entryHighlight.borderColor} ${settings.entryHighlight.border[0]}px`,
      borderRight: `${settings.entryHighlight.borderStyle} ${settings.entryHighlight.borderColor} ${settings.entryHighlight.border[1]}px`,
      borderBottom: `${settings.entryHighlight.borderStyle} ${settings.entryHighlight.borderColor} ${settings.entryHighlight.border[2]}px`,
      borderLeft: `${settings.entryHighlight.borderStyle} ${settings.entryHighlight.borderColor} ${settings.entryHighlight.border[3]}px`,
      borderRadius: `${settings.entryHighlight.borderRadius}px`,
      paddingTop: `${settings.entryHighlight.padding[0]}px`,
      paddingRight: `${settings.entryHighlight.padding[1]}px`,
      paddingBottom: `${settings.entryHighlight.padding[2]}px`,
      paddingLeft: `${settings.entryHighlight.padding[3]}px`,
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
