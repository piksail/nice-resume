<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useProfileStore } from "@/stores/profile";
import { templateSettings } from "@/globals";

const { documentType } = storeToRefs(useEditorStore());

const { template } = storeToRefs(useProfileStore());

const { name } = defineProps<{
  name: string;
}>();

// TODO fix below
// const settings = ref(templateSettings[template.value][documentType.value]);
console.log(documentType);
const settings = computed(() => {
  return templateSettings[template.value].resume;
});
</script>

<template>
  <h1
    v-if="name"
    :style="{
      fontFamily: settings.name.font,
      fontSize: `${settings.name.fontSize}px`,
      lineHeight: settings.name.lineHeight,
      letterSpacing: `${settings.name.letterSpacing}px`,
      fontWeight: settings.name.fontWeight,
      fontStyle: settings.name.isItalic ? 'italic' : 'initial',
      textTransform: settings.name.isUppercase ? 'uppercase' : 'initial',
      color: settings.name.color,
      textAlign: settings.name.textAlign,
      backgroundColor: settings.name.backgroundColor,
      marginTop: `${settings.name.margin[0]}px`,
      marginRight: `${settings.name.margin[1]}px`,
      marginBottom: `${settings.name.margin[2]}px`,
      marginLeft: `${settings.name.margin[3]}px`,
      borderTop: `solid ${settings.name.borderColor} ${settings.name.border[0]}px`,
      borderRight: `solid ${settings.name.borderColor} ${settings.name.border[1]}px`,
      borderBottom: `solid ${settings.name.borderColor} ${settings.name.border[2]}px`,
      borderLeft: `solid ${settings.name.borderColor} ${settings.name.border[3]}px`,
      borderRadius: `${settings.name.borderRadius}px`,
      paddingTop: `${settings.name.padding[0]}px`,
      paddingRight: `${settings.name.padding[1]}px`,
      paddingBottom: `${settings.name.padding[2]}px`,
      paddingLeft: `${settings.name.padding[3]}px`,
    }"
  >
    {{ name }}
  </h1>
</template>
