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

const getSeparatorFlexDirection = () => {
  switch (settings.value.categoryNameSeparator.position) {
    case "bottom":
      return "flex-col";
    case "left":
      return "flex-row-reverse";
    case "right":
      return "flex-row";
    case "top":
      return "flex-col-reverse";
  }
};
</script>

<template>
  <div class="flex" :class="getSeparatorFlexDirection()">
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
        textAlign: settings.categoryName.textAlign,
        backgroundColor: settings.categoryName.backgroundColor,
        marginTop: `${settings.categoryName.margin[0]}px`,
        marginRight: `${settings.categoryName.margin[1]}px`,
        marginBottom: `${settings.categoryName.margin[2]}px`,
        marginLeft: `${settings.categoryName.margin[3]}px`,
        borderTop: `${settings.categoryName.borderStyle} ${settings.categoryName.borderColor} ${settings.categoryName.border[0]}px`,
        borderRight: `${settings.categoryName.borderStyle} ${settings.categoryName.borderColor} ${settings.categoryName.border[1]}px`,
        borderBottom: `${settings.categoryName.borderStyle} ${settings.categoryName.borderColor} ${settings.categoryName.border[2]}px`,
        borderLeft: `${settings.categoryName.borderStyle} ${settings.categoryName.borderColor} ${settings.categoryName.border[3]}px`,
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
    <div
      :class="
        ['left', 'right'].includes(settings.categoryNameSeparator.position) &&
        'self-center'
      "
      :style="{
        backgroundColor: settings.categoryNameSeparator.backgroundColor,
        marginTop: `${settings.categoryNameSeparator.margin[0]}px`,
        marginRight: `${settings.categoryNameSeparator.margin[1]}px`,
        marginBottom: `${settings.categoryNameSeparator.margin[2]}px`,
        marginLeft: `${settings.categoryNameSeparator.margin[3]}px`,
        borderTop: `${settings.categoryNameSeparator.borderStyle} ${settings.categoryNameSeparator.borderColor} ${settings.categoryNameSeparator.border[0]}px`,
        borderRight: `${settings.categoryNameSeparator.borderStyle} ${settings.categoryNameSeparator.borderColor} ${settings.categoryNameSeparator.border[1]}px`,
        borderBottom: `${settings.categoryNameSeparator.borderStyle} ${settings.categoryNameSeparator.borderColor} ${settings.categoryNameSeparator.border[2]}px`,
        borderLeft: `${settings.categoryNameSeparator.borderStyle} ${settings.categoryNameSeparator.borderColor} ${settings.categoryNameSeparator.border[3]}px`,
        borderRadius: `${settings.categoryNameSeparator.borderRadius}px`,
        paddingTop: `${settings.categoryNameSeparator.padding[0]}px`,
        paddingRight: `${settings.categoryNameSeparator.padding[1]}px`,
        paddingBottom: `${settings.categoryNameSeparator.padding[2]}px`,
        paddingLeft: `${settings.categoryNameSeparator.padding[3]}px`,
        height: `${settings.categoryNameSeparator.height}px`,
        width:
          settings.categoryNameSeparator.width === 'fit'
            ? 'fit-content'
            : `${settings.categoryNameSeparator.width}%`,
      }"
    />
  </div>
</template>
