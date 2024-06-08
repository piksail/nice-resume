<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { templateSettings } from "@/globals";
import DocumentHeaderAbout from "@/components/DocumentHeaderAbout.vue";
import DocumentHeaderName from "@/components/DocumentHeaderName.vue";
import DocumentHeaderTitle from "@/components/DocumentHeaderTitle.vue";
import DocumentHeaderContactDetails from "@/components/DocumentHeaderContactDetails.vue";

const { name, template, title } = storeToRefs(useProfileStore());

const { about, contactDetails } = storeToRefs(useResumeStore());

const settings = computed(() => {
  // TODO fix templateSettings[template.value][documentType.value]
  return templateSettings[template.value].resume;
});
</script>

<template>
  <header
    class="flex"
    :style="{
      backgroundColor: settings.header.backgroundColor,
      marginTop: `${settings.header.margin[0]}px`,
      marginRight: `${settings.header.margin[1]}px`,
      marginBottom: `${settings.header.margin[2]}px`,
      marginLeft: `${settings.header.margin[3]}px`,
      borderTop: `${settings.header.borderStyle} ${settings.header.borderColor} ${settings.header.border[0]}px`,
      borderRight: `${settings.header.borderStyle} ${settings.header.borderColor} ${settings.header.border[1]}px`,
      borderBottom: `${settings.header.borderStyle} ${settings.header.borderColor} ${settings.header.border[2]}px`,
      borderLeft: `${settings.header.borderStyle} ${settings.header.borderColor} ${settings.header.border[3]}px`,
      borderRadius: `${settings.header.borderRadius}px`,
      paddingTop: `${settings.header.padding[0]}px`,
      paddingRight: `${settings.header.padding[1]}px`,
      paddingBottom: `${settings.header.padding[2]}px`,
      paddingLeft: `${settings.header.padding[3]}px`,
    }"
  >
    <template v-if="settings.header.layout === 1">
      <div class="flex flex-col">
        <DocumentHeaderName :name="name" />
        <DocumentHeaderTitle :title="title" />
      </div>
      <DocumentHeaderContactDetails :contact-details="contactDetails" />
      <DocumentHeaderAbout :about="about" />
    </template>
    <template v-else-if="settings.header.layout === 2">
      <div class="flex-1">
        <DocumentHeaderName :name="name" />
        <DocumentHeaderTitle :title="title" />
        <DocumentHeaderContactDetails :contact-details="contactDetails" />
        <DocumentHeaderAbout :about="about" />
      </div>
    </template>
    <template v-else-if="settings.header.layout === 3">
      <div class="flex-col">
        <div class="flex items-baseline">
          <DocumentHeaderName :name="name" />
          <!-- prettier-ignore -->
          <span v-if="name && title" :style="{fontSize: `${settings.name.fontSize}px`}">,&nbsp;</span>
          <DocumentHeaderTitle :title="title" />
        </div>
        <DocumentHeaderContactDetails :contact-details="contactDetails" />
        <DocumentHeaderAbout :about="about" />
      </div>
    </template>
    <template v-else>
      <div class="flex-1">
        <DocumentHeaderName :name="name" />
        <DocumentHeaderTitle :title="title" />
        <DocumentHeaderAbout :about="about" />
      </div>
      <DocumentHeaderContactDetails :contact-details="contactDetails" />
    </template>
  </header>
</template>
