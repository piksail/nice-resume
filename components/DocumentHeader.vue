<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { templateSettings } from "@/globals";
import DocumentHeaderContactDetails from "@/components/DocumentHeaderContactDetails.vue";

const { name, template, title } = storeToRefs(useProfileStore());

const { about } = storeToRefs(useResumeStore());

// TODO fix below
// const settings = ref(templateSettings[template.value][documentType.value]);
const settings = ref(templateSettings[template.value].resume);
console.log(settings);
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
      borderTop: `solid ${settings.header.borderColor} ${settings.header.border[0]}px`,
      borderRight: `solid ${settings.header.borderColor} ${settings.header.border[1]}px`,
      borderBottom: `solid ${settings.header.borderColor} ${settings.header.border[2]}px`,
      borderLeft: `solid ${settings.header.borderColor} ${settings.header.border[3]}px`,
      borderRadius: `${settings.header.borderRadius}px`,
      paddingTop: `${settings.header.padding[0]}px`,
      paddingRight: `${settings.header.padding[1]}px`,
      paddingBottom: `${settings.header.padding[2]}px`,
      paddingLeft: `${settings.header.padding[3]}px`,
    }"
  >
    <div class="flex-1">
      <h1 v-if="name">{{ name }}</h1>
      <h2>
        {{ title }}
      </h2>
      <p v-if="about">{{ about }}</p>
    </div>
    <DocumentHeaderContactDetails />
  </header>
</template>
