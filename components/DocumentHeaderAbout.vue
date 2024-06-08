<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useProfileStore } from "@/stores/profile";
import { templateSettings } from "@/globals";

const { documentType } = storeToRefs(useEditorStore());

const { template } = storeToRefs(useProfileStore());

const { about } = defineProps<{
  about: string;
}>();

// TODO fix below
// const settings = ref(templateSettings[template.value][documentType.value]);
console.log(documentType);
const settings = computed(() => {
  return templateSettings[template.value].resume;
});
</script>

<template>
  <p
    v-if="about"
    class="flex-1"
    :style="{
      fontFamily: settings.about.font,
      fontSize: `${settings.about.fontSize}px`,
      lineHeight: settings.about.lineHeight,
      letterSpacing: `${settings.about.letterSpacing}px`,
      fontWeight: settings.about.fontWeight,
      fontStyle: settings.about.isItalic ? 'italic' : 'initial',
      textTransform: settings.about.isUppercase ? 'uppercase' : 'initial',
      color: settings.about.color,
      textAlign: settings.about.textAlign,
      backgroundColor: settings.about.backgroundColor,
      marginTop: `${settings.about.margin[0]}px`,
      marginRight: `${settings.about.margin[1]}px`,
      marginBottom: `${settings.about.margin[2]}px`,
      marginLeft: `${settings.about.margin[3]}px`,
      borderTop: `${settings.about.borderStyle} ${settings.about.borderColor} ${settings.about.border[0]}px`,
      borderRight: `${settings.about.borderStyle} ${settings.about.borderColor} ${settings.about.border[1]}px`,
      borderBottom: `${settings.about.borderStyle} ${settings.about.borderColor} ${settings.about.border[2]}px`,
      borderLeft: `${settings.about.borderStyle} ${settings.about.borderColor} ${settings.about.border[3]}px`,
      borderRadius: `${settings.about.borderRadius}px`,
      paddingTop: `${settings.about.padding[0]}px`,
      paddingRight: `${settings.about.padding[1]}px`,
      paddingBottom: `${settings.about.padding[2]}px`,
      paddingLeft: `${settings.about.padding[3]}px`,
    }"
  >
    <!-- TODO this is from Tootpaste (blue quote) -->
    <span class="text-3xl text-[color:var(--resume-color1)] leading-4">“</span>
    {{ about }}
  </p>
</template>
