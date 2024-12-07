<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { templateSettings } from "@/globals";
import { getListMarker } from "@/utils/editor";
import { getNodeStyle } from "@/utils/style";

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
      color: `#${settings.entryHighlight.listMarkerColor}`,
      ...getNodeStyle(settings.entryHighlight, 'block'),
    }"
  >
    <li
      v-for="(highlight, highlightIndex) in entryHighlights"
      :key="highlightIndex"
      :style="{
        fontFamily: settings.entryHighlight.font,
        fontSize: `${settings.entryHighlight.fontSize}px`,
        lineHeight: settings.entryHighlight.lineHeight ?? 'normal',
        fontWeight: settings.entryHighlight.fontWeight,
        fontStyle: settings.entryHighlight.isItalic ? 'italic' : 'initial',
        textTransform: settings.entryHighlight.isUppercase
          ? 'uppercase'
          : 'initial',
      }"
    >
      <span :style="{ color: `#${settings.entryHighlight.color}` }">
        {{ highlight }}
      </span>
    </li>
  </ul>
</template>
