<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { Profile } from "@/types";
import { useEditorStore } from "@/stores/editor";
import { useEmailStore } from "@/stores/email";
import { getListMarker } from "@/utils/editor";
import { getNodeStyle, getNodeClass } from "@/utils/style";
import ContactDetailIcon from "@/components/ContactDetailIcon.vue";
import useDocumentSettings from "~/composables/use-document-settings";

const { documentType, focusedInput } = storeToRefs(useEditorStore());

const { isDetailClickable } = storeToRefs(useEmailStore());

const { contactDetails } = defineProps<{
  contactDetails: Profile["contactDetails"];
}>();

const settings = useDocumentSettings();
</script>

<template>
  <ul
    class="flex"
    :style="{
      listStylePosition: settings.contactDetails.listMarkerPosition,
      listStyleType: getListMarker(settings.contactDetails.listMarker),
      color: `${settings.contactDetails.listMarkerColor}`,
      ...getNodeStyle(settings.contactDetails, 'flex'),
      ...getNodeStyle(settings.contactDetails, 'block'),
    }"
  >
    <li
      v-for="(detail, index) in contactDetails"
      :key="`${detail.value}${detail.icon}`"
      :class="getNodeClass(`detailList${index}`, focusedInput)"
    >
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
