<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import type { Profile } from "@/types";
import { useEditorStore } from "@/stores/editor";
import { useProfileStore } from "@/stores/profile";
import { templateSettings } from "@/globals";
import { getListMarker } from "@/utils/editor";
import { getNodeStyle } from "@/utils/style";
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
      ...getNodeStyle(settings.contactDetails, 'block'),
    }"
  >
    <li
      v-for="detail in contactDetails"
      :key="`${detail.value}${detail.icon}`"
      class="flex items-center"
      :style="{
        flexDirection: settings.contactDetails.isIconFirst
          ? 'row'
          : 'row-reverse',
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
      <span :style="getNodeStyle(settings.contactDetails, 'text')">
        {{ detail.value }}
      </span>
    </li>
  </ul>
</template>
