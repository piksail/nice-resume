<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useEmailStore } from "@/stores/email";
import { useProfileStore } from "@/stores/profile";
import { templateSettings } from "@/globals";
import DocumentHeaderAbout from "./DocumentHeaderAbout.vue";
import DocumentHeaderContactDetails from "./DocumentHeaderContactDetails.vue";
import DocumentHeaderName from "./DocumentHeaderName.vue";
import DocumentHeaderTitle from "./DocumentHeaderTitle.vue";

const { about, contactDetails, isThemeCustomized, name, template, title } =
  storeToRefs(useProfileStore());

const { settings: storeSettings } = storeToRefs(useEmailStore());

const settings = computed(() => {
  return isThemeCustomized.value
    ? storeSettings.value
    : templateSettings[template.value].email;
});
</script>

<template>
  <footer>
    <template v-if="settings.document.layout === 1">
      <div class="flex flex-col">
        <DocumentHeaderName :name="name" />
        <DocumentHeaderTitle :title="title" />
      </div>
      <DocumentHeaderContactDetails :contact-details="contactDetails" />
      <DocumentHeaderAbout :about="about" />
    </template>
    <template v-else-if="settings.document.layout === 2">
      <div class="flex-1">
        <DocumentHeaderName :name="name" />
        <DocumentHeaderTitle :title="title" />
        <DocumentHeaderAbout :about="about" />
      </div>
      <DocumentHeaderContactDetails :contact-details="contactDetails" />
    </template>
    <template v-else-if="settings.document.layout === 3">
      <div class="flex-col">
        <div class="flex items-baseline">
          <DocumentHeaderName :name="name" />
          <!-- prettier-ignore -->
          <span v-if="name && title" :style="{ fontSize: `${settings.name.fontSize}px`, color: settings.name.color }">,&nbsp;</span>
          <DocumentHeaderTitle :title="title" />
        </div>
        <DocumentHeaderContactDetails :contact-details="contactDetails" />
        <DocumentHeaderAbout :about="about" />
      </div>
    </template>
    <template v-else-if="settings.document.layout === 4">
      <div class="flex-1">
        <DocumentHeaderName :name="name" />
        <DocumentHeaderContactDetails :contact-details="contactDetails" />
        <DocumentHeaderTitle :title="title" />
        <DocumentHeaderAbout :about="about" />
      </div>
    </template>
    <template v-else-if="settings.document.layout === 5">
      <div class="flex-1">
        <DocumentHeaderName :name="name" />
        <DocumentHeaderTitle :title="title" />
        <DocumentHeaderAbout :about="about" />
        <DocumentHeaderContactDetails :contact-details="contactDetails" />
      </div>
    </template>
    <template v-else>
      <div class="flex-1">
        <DocumentHeaderName :name="name" />
        <DocumentHeaderTitle :title="title" />
        <DocumentHeaderContactDetails :contact-details="contactDetails" />
        <DocumentHeaderAbout :about="about" />
      </div>
    </template>
  </footer>
</template>
