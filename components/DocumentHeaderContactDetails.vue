<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { templateSettings } from "@/globals";
import ContactDetailIcon from "@/components/ContactDetailIcon.vue";

const { documentType } = storeToRefs(useEditorStore());

const { template } = storeToRefs(useProfileStore());

const { contactDetails } = storeToRefs(useResumeStore());

// TODO fix below
// const settings = ref(templateSettings[template.value][documentType.value]);
console.log(documentType);
const settings = ref(templateSettings[template.value].resume);
</script>

<template>
  <ul
    class="flex items-end"
    :style="{
      flexDirection: settings.contactDetails.listOrientation,
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
      <span>{{ detail.value }}</span>
    </li>
  </ul>
</template>
