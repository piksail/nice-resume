<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import type { Profile } from "@/types";
import { useEditorStore } from "@/stores/editor";
import { useProfileStore } from "@/stores/profile";
import { templateSettings } from "@/globals";
import { getListMarker } from "@/utils/editor";
import ContactDetailIcon from "@/components/ContactDetailIcon.vue";

const { documentType } = storeToRefs(useEditorStore());

const { template } = storeToRefs(useProfileStore());

const { contactDetails } = defineProps<{
  contactDetails: Profile["contactDetails"];
}>();

// TODO fix below
// const settings = ref(templateSettings[template.value][documentType.value]);
console.log(documentType);
const settings = computed(() => {
  return templateSettings[template.value].resume;
});
</script>

<template>
  <ul
    class="flex"
    :style="{
      flexDirection: settings.contactDetails.listOrientation,
      flexWrap:
        settings.contactDetails.listOrientation === 'row' ? 'wrap' : 'initial',
      alignItems: settings.contactDetails.alignment,
      gap: `${settings.contactDetails.gap}px`,
      rowGap: settings.contactDetails.listOrientation === 'row' ? 0 : 'initial',
      listStyleType: getListMarker(settings.contactDetails.listMarker),
      color: settings.contactDetails.listMarkerColor,
      backgroundColor: settings.contactDetails.backgroundColor,
      marginTop: `${settings.contactDetails.margin[0]}px`,
      marginRight: `${settings.contactDetails.margin[1]}px`,
      marginBottom: `${settings.contactDetails.margin[2]}px`,
      marginLeft: `${settings.contactDetails.margin[3]}px`,
      borderTop: `${settings.contactDetails.borderStyle} ${settings.contactDetails.borderColor} ${settings.contactDetails.border[0]}px`,
      borderRight: `${settings.contactDetails.borderStyle} ${settings.contactDetails.borderColor} ${settings.contactDetails.border[1]}px`,
      borderBottom: `${settings.contactDetails.borderStyle} ${settings.contactDetails.borderColor} ${settings.contactDetails.border[2]}px`,
      borderLeft: `${settings.contactDetails.borderStyle} ${settings.contactDetails.borderColor} ${settings.contactDetails.border[3]}px`,
      borderRadius: `${settings.contactDetails.borderRadius}px`,
      paddingTop: `${settings.contactDetails.padding[0]}px`,
      paddingRight: `${settings.contactDetails.padding[1]}px`,
      paddingBottom: `${settings.contactDetails.padding[2]}px`,
      paddingLeft: `${settings.contactDetails.padding[3]}px`,
    }"
  >
    <li
      v-for="detail in contactDetails"
      :key="`${detail.value}${detail.icon}`"
      class="flex items-center"
      :style="{
        gap: `${settings.contactDetails.iconGap}px`,
      }"
    >
      <ContactDetailIcon
        v-if="detail.icon"
        :icon="detail.icon"
        :type="detail.type"
        class="w-4"
        :style="{ color: settings.contactDetails.iconColor }"
      />
      <span
        :style="{
          fontFamily: settings.contactDetails.font,
          fontSize: `${settings.contactDetails.fontSize}px`,
          lineHeight: settings.contactDetails.lineHeight,
          fontWeight: settings.contactDetails.fontWeight,
          fontStyle: settings.contactDetails.isItalic ? 'italic' : 'initial',
          textTransform: settings.contactDetails.isUppercase
            ? 'uppercase'
            : 'initial',
          color: settings.contactDetails.color,
        }"
      >
        {{ detail.value }}
      </span>
    </li>
  </ul>
</template>
