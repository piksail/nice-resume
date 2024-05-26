<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { templateSettings } from "@/globals";

const { isThemeCustomized, template } = storeToRefs(useProfileStore());

const { settings: storeSettings } = storeToRefs(useResumeStore());

const { categoryName } = defineProps<{
  categoryName: string;
}>();

const settings = computed(() => {
  return isThemeCustomized.value
    ? storeSettings.value
    : templateSettings[template.value].resume;
});
</script>

<template>
  <h3
    v-if="categoryName"
    :style="{
      fontFamily: settings.categoryName.font,
      fontSize: `${settings.categoryName.fontSize}px`,
      lineHeight: settings.categoryName.lineHeight,
      letterSpacing: `${settings.categoryName.letterSpacing}px`,
      fontWeight: settings.categoryName.fontWeight,
      fontStyle: settings.categoryName.isItalic ? 'italic' : 'initial',
      textTransform: settings.categoryName.isUppercase
        ? 'uppercase'
        : 'initial',
      color: settings.categoryName.color,
      backgroundColor: settings.categoryName.backgroundColor,
      marginTop: `${settings.categoryName.margin[0]}px`,
      marginRight: `${settings.categoryName.margin[1]}px`,
      marginBottom: `${settings.categoryName.margin[2]}px`,
      marginLeft: `${settings.categoryName.margin[3]}px`,
      borderTop: `solid ${settings.categoryName.borderColor} ${settings.categoryName.border[0]}px`,
      borderRight: `solid ${settings.categoryName.borderColor} ${settings.categoryName.border[1]}px`,
      borderBottom: `solid ${settings.categoryName.borderColor} ${settings.categoryName.border[2]}px`,
      borderLeft: `solid ${settings.categoryName.borderColor} ${settings.categoryName.border[3]}px`,
      borderRadius: `${settings.categoryName.borderRadius}px`,
      paddingTop: `${settings.categoryName.padding[0]}px`,
      paddingRight: `${settings.categoryName.padding[1]}px`,
      paddingBottom: `${settings.categoryName.padding[2]}px`,
      paddingLeft: `${settings.categoryName.padding[3]}px`,
      width:
        settings.categoryName.width === 'fit'
          ? 'fit-content'
          : `${settings.categoryName.width}%`,
    }"
  >
    {{ categoryName }}
  </h3>
</template>
