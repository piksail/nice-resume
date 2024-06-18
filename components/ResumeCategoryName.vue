<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { templateSettings } from "@/globals";
import { getNodeStyle } from "@/utils/style";

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
      return "flex-row-reverse justify-end";
    case "right":
      return "flex-row";
    case "top":
      return "flex-col-reverse";
  }
};
</script>

<template>
  <div
    class="flex"
    :class="getSeparatorFlexDirection()"
    :style="{
      width:
        settings.categoryName.width === 'fit' && settings.categoryName.isAside
          ? 'fit-content'
          : `${settings.categoryName.width}%`,
    }"
  >
    <h3
      v-if="categoryName"
      :style="{
        ...getNodeStyle(settings.categoryName, 'title'),
        width:
          settings.categoryName.width === 'fit' &&
          !settings.categoryName.isAside
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
        ...getNodeStyle(settings.categoryNameSeparator, 'title'),
        height: `${settings.categoryNameSeparator.height}px`,
        width:
          settings.categoryNameSeparator.width === 'fit'
            ? 'fit-content'
            : `${settings.categoryNameSeparator.width}%`,
      }"
    />
  </div>
</template>
