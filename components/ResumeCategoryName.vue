<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { themeSettings } from "@/globals";
import { getNodeStyle } from "@/utils/style";

const { isThemeCustomized, theme } = storeToRefs(useProfileStore());

const { settings: storeSettings } = storeToRefs(useResumeStore());

const { categoryName } = defineProps<{
  categoryName: string;
}>();

const settings = computed(() => {
  return isThemeCustomized.value
    ? storeSettings.value
    : themeSettings[theme.value].resume;
});

const getSeparatorFlexDirection = () => {
  switch (settings.value.categoryNameSeparator.position) {
    case "bottom":
      return "flex-col";
    case "left":
      return "flex-row-reverse justify-end";
    case "right":
      return "flex-row";
    case "top":
      return "flex-col-reverse";
  }
};

const getWidth = () => {
  if (settings.value.categoryName.widthType !== "custom")
    return settings.value.categoryName.widthType;
  return `${settings.value.categoryName.width}%`;
};
</script>

<template>
  <div
    class="flex"
    :class="getSeparatorFlexDirection()"
    :style="{
      width: getWidth(),
    }"
  >
    <h3
      v-if="categoryName"
      :style="{
        ...getNodeStyle(settings.categoryName, 'title'),
        width: settings.categoryName.widthType === 'custom' ? '100%' : 'auto',
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
        ...getNodeStyle(settings.categoryNameSeparator, 'title'),
        height: `${settings.categoryNameSeparator.height}px`,
      }"
    />
  </div>
</template>
