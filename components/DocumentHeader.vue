<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { getNodeStyle } from "@/utils/style";
import DocumentHeaderAbout from "@/components/DocumentHeaderAbout.vue";
import DocumentHeaderName from "@/components/DocumentHeaderName.vue";
import DocumentHeaderTitle from "@/components/DocumentHeaderTitle.vue";
import DocumentHeaderContactDetails from "@/components/DocumentHeaderContactDetails.vue";

const { documentType } = storeToRefs(useEditorStore());

const { about, contactDetails, name, title } = storeToRefs(useProfileStore());

const { isHeaderSimple, settings: resumeSettings } =
  storeToRefs(useResumeStore());
const { settings: letterSettings } = storeToRefs(useLetterStore());

const settings = computed(() => {
  return documentType.value === "letter"
    ? letterSettings.value
    : resumeSettings.value;
});
</script>

<template>
  <header class="flex" :style="getNodeStyle(settings.header, 'block')">
    <template v-if="settings.header.layout === 1">
      <div class="flex flex-col">
        <DocumentHeaderName :name="name" />
        <DocumentHeaderTitle :title="title" />
      </div>
      <DocumentHeaderContactDetails
        v-if="!isHeaderSimple"
        :contact-details="contactDetails"
      />
      <DocumentHeaderAbout v-if="!isHeaderSimple" :about="about" />
    </template>
    <template v-else-if="settings.header.layout === 2">
      <div class="flex-1">
        <DocumentHeaderName :name="name" />
        <DocumentHeaderTitle :title="title" />
        <DocumentHeaderAbout v-if="!isHeaderSimple" :about="about" />
      </div>
      <DocumentHeaderContactDetails
        v-if="!isHeaderSimple"
        :contact-details="contactDetails"
      />
    </template>
    <template v-else-if="settings.header.layout === 3">
      <div class="flex-col">
        <div class="flex items-baseline">
          <DocumentHeaderName :name="name" />
          <!-- prettier-ignore -->
          <span v-if="name && title" :style="{ fontSize: `${settings.name.fontSize}px`, color: settings.name.color }">,&nbsp;</span>
          <DocumentHeaderTitle :title="title" />
        </div>
        <DocumentHeaderContactDetails
          v-if="!isHeaderSimple"
          :contact-details="contactDetails"
        />
        <DocumentHeaderAbout v-if="!isHeaderSimple" :about="about" />
      </div>
    </template>
    <template v-else-if="settings.header.layout === 4">
      <div class="flex-1">
        <DocumentHeaderName :name="name" />
        <DocumentHeaderContactDetails
          v-if="!isHeaderSimple"
          :contact-details="contactDetails"
        />
        <DocumentHeaderTitle :title="title" />
        <DocumentHeaderAbout v-if="!isHeaderSimple" :about="about" />
      </div>
    </template>
    <template v-else-if="settings.header.layout === 5">
      <div class="flex-1">
        <DocumentHeaderName :name="name" />
        <DocumentHeaderTitle :title="title" />
        <DocumentHeaderAbout v-if="!isHeaderSimple" :about="about" />
        <DocumentHeaderContactDetails
          v-if="!isHeaderSimple"
          :contact-details="contactDetails"
        />
      </div>
    </template>
    <template v-else>
      <div class="flex-1">
        <DocumentHeaderName :name="name" />
        <DocumentHeaderTitle :title="title" />
        <DocumentHeaderContactDetails
          v-if="!isHeaderSimple"
          :contact-details="contactDetails"
        />
        <DocumentHeaderAbout v-if="!isHeaderSimple" :about="about" />
      </div>
    </template>
  </header>
</template>
