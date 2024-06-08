<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useProfileStore } from "@/stores/profile";
import { templateSettings } from "@/globals";

const { documentType } = storeToRefs(useEditorStore());

const { template } = storeToRefs(useProfileStore());

const { title } = defineProps<{
  title: string;
}>();

// TODO fix below
// const settings = ref(templateSettings[template.value][documentType.value]);
console.log(documentType);
const settings = computed(() => {
  return templateSettings[template.value].resume;
});
</script>

<template>
  <h2
    v-if="title"
    :style="{
      fontFamily: settings.title.font,
      fontSize: `${settings.title.fontSize}px`,
      lineHeight: settings.title.lineHeight,
      letterSpacing: `${settings.title.letterSpacing}px`,
      fontWeight: settings.title.fontWeight,
      fontStyle: settings.title.isItalic ? 'italic' : 'initial',
      textTransform: settings.title.isUppercase ? 'uppercase' : 'initial',
      color: settings.title.color,
      backgroundColor: settings.title.backgroundColor,
      marginTop: `${settings.title.margin[0]}px`,
      marginRight: `${settings.title.margin[1]}px`,
      marginBottom: `${settings.title.margin[2]}px`,
      marginLeft: `${settings.title.margin[3]}px`,
      borderTop: `solid ${settings.title.borderColor} ${settings.title.border[0]}px`,
      borderRight: `solid ${settings.title.borderColor} ${settings.title.border[1]}px`,
      borderBottom: `solid ${settings.title.borderColor} ${settings.title.border[2]}px`,
      borderLeft: `solid ${settings.title.borderColor} ${settings.title.border[3]}px`,
      borderRadius: `${settings.title.borderRadius}px`,
      paddingTop: `${settings.title.padding[0]}px`,
      paddingRight: `${settings.title.padding[1]}px`,
      paddingBottom: `${settings.title.padding[2]}px`,
      paddingLeft: `${settings.title.padding[3]}px`,
    }"
  >
    {{ title }}
  </h2>
</template>
