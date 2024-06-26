<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { Profile } from "@/types";
import { useEditorStore } from "@/stores/editor";
import { useEmailStore } from "@/stores/email";
import { getListMarker } from "@/utils/editor";
import { getNodeStyle } from "@/utils/style";
import ContactDetailIcon from "@/components/ContactDetailIcon.vue";
import useDocumentSettings from "~/composables/use-document-settings";

const { documentType } = storeToRefs(useEditorStore());

const { isDetailClickable } = storeToRefs(useEmailStore());

const { contactDetails } = defineProps<{
  contactDetails: Profile["contactDetails"];
}>();

const settings = useDocumentSettings();

// TODO should we filter out type === 'email' if documentType === 'email'? As well as other details like driving license... maybe we should filter in, but we need a rework of contact details to accept a type
</script>

<template>
  <ul
    class="flex"
    :style="{
      flexDirection: settings.contactDetails.listOrientation,
      flexWrap:
        settings.contactDetails.listOrientation === 'row' ? 'wrap' : 'initial',
      alignItems: settings.contactDetails.alignment,
      columnGap:
        settings.contactDetails.listOrientation === 'column'
          ? 0
          : `${settings.contactDetails.gap}px`,
      rowGap:
        settings.contactDetails.listOrientation === 'row'
          ? 0
          : `${settings.contactDetails.gap}px`,
      listStyleType: getListMarker(settings.contactDetails.listMarker),
      color: settings.contactDetails.listMarkerColor,
      ...getNodeStyle(settings.contactDetails, 'block'),
    }"
  >
    <li v-for="detail in contactDetails" :key="`${detail.value}${detail.icon}`">
      <a
        v-if="
          documentType === 'email' &&
          detail.type === 'social' &&
          isDetailClickable
        "
        :href="detail.value"
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
          :style="{
            color: settings.contactDetails.iconColor,
            width: `${settings.contactDetails.iconSize}px`,
          }"
        />
        <span :style="getNodeStyle(settings.contactDetails, 'text')">
          {{ detail.value }}
        </span>
      </a>
      <span
        v-else
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
          :style="{
            color: settings.contactDetails.iconColor,
            width: `${settings.contactDetails.iconSize}px`,
          }"
        />
        <span :style="getNodeStyle(settings.contactDetails, 'text')">
          {{ detail.value }}
        </span>
      </span>
    </li>
  </ul>
</template>
