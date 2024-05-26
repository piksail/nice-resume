<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import ContactIcon from "@/components/ContactIcon.vue";
import Document from "@/components/Document.vue";
import LetterBody from "@/components/LetterBody.vue";
import LinkIcon from "@/components/LinkIcon.vue";
import ResumeBody from "@/components/ResumeBody.vue";

const { documentType } = storeToRefs(useEditorStore());

const { name, title } = storeToRefs(useProfileStore());

const { about, contactDetails, socialLinks } = storeToRefs(useResumeStore());

const { isHeaderSimple } = storeToRefs(useLetterStore());
</script>

<template>
  <Document>
    <header
      v-if="documentType === 'resume' || !isHeaderSimple"
      class="flex p-8"
    >
      <h1
        v-if="name"
        class="text-3xl font-normal w-[26%] relative before:content-[''] before:absolute before:size-10 before:bg-[color:var(--resume-color1)] before:rotate-45 before:right-[103%] before:top-5 after:content-[''] after:absolute after:size-10 after:bg-[color:var(--resume-color0)] after:rotate-45 after:right-[103%] after:top-3"
      >
        {{ name }}
      </h1>
      <div class="flex-1 text-center px-8">
        <div class="flex items-center" v-if="title">
          <div class="flex-1 bg-[color:var(--resume-color0)] h-1" />
          <h2 class="text-2xl font-normal px-8">
            {{ title }}
          </h2>
          <div class="flex-1 bg-[color:var(--resume-color0)] h-1" />
        </div>
        <p v-if="about">{{ about }}</p>
      </div>
      <ul class="flex flex-col items-end w-[26%]">
        <li
          v-for="detail in contactDetails"
          :key="`${detail.value}${detail.icon}`"
          class="flex gap-1 items-center"
        >
          <ContactIcon
            v-if="detail.icon"
            :icon="detail.icon"
            class="w-4 text-[color:var(--resume-color0)]"
          />
          {{ detail.value }}
        </li>
        <li
          v-for="link in socialLinks"
          :key="`${link.url}${link.icon}`"
          class="flex gap-1 items-center"
        >
          <LinkIcon
            v-if="link.icon"
            :icon="link.icon"
            class="w-4 text-[color:var(--resume-color0)]"
          />
          {{ link.url }}
        </li>
      </ul>
    </header>
    <LetterBody v-if="documentType === 'letter'" />
    <ResumeBody v-else />
  </Document>
</template>

<style scoped>
.font-body {
  font-family: "Fira Sans";
}
</style>
