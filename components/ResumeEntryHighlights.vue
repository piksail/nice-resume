<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { themeSettings } from "@/globals";
import { getListMarker } from "@/utils/editor";
import { getNodeStyle, getNodeClass } from "@/utils/style";
import type { Category } from "~/types";

const { isThemeCustomized, theme } = storeToRefs(useProfileStore());

const { settings: storeSettings } = storeToRefs(useResumeStore());

const { focusedInput } = storeToRefs(useEditorStore());

const { categoryIndex, entryHighlights, entryIndex } = defineProps<{
  categoryIndex: number;
  categoryLayout: Category["layout"];
  entryHighlights: string[];
  entryIndex: number;
}>();

const settings = computed(() => {
  return isThemeCustomized.value
    ? storeSettings.value
    : themeSettings[theme.value].resume;
});
</script>

<template>
  <ul
    v-if="entryHighlights.length"
    class="flex"
    :style="{
      flexDirection: settings.entryHighlight.listOrientation,
      gap: `${settings.entryHighlight.gap}px`,
      listStylePosition: settings.entryHighlight.listMarkerPosition,
      listStyleType: getListMarker(settings.entryHighlight.listMarker),
      color: `${settings.entryHighlight.listMarkerColor}`,
      ...getNodeStyle(settings.entryHighlight, 'block'),
    }"
  >
    <li
      v-for="(highlight, highlightIndex) in entryHighlights"
      :key="highlightIndex"
      :class="
        getNodeClass(
          `categoryList${categoryIndex}EntryList${entryIndex}HighlightList${highlightIndex}_${categoryLayout}`,
          focusedInput,
        )
      "
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
      <span :style="{ color: `${settings.entryHighlight.color}` }">
        {{ highlight }}
      </span>
    </li>
  </ul>
</template>
