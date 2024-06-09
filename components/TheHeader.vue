<script setup lang="ts">
import { watch } from "vue";
import { navigateTo } from "nuxt/app";
import { storeToRefs } from "pinia";
import {
  ArrowDownOnSquareIcon,
  DocumentArrowDownIcon,
} from "@heroicons/vue/24/outline";
import { useEditorStore } from "@/stores/editor";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { documentTypes, templates } from "@/globals";
import { download } from "@/utils/file";
import packageJson from "../package.json";

console.log("Version: ", packageJson.version);

const { documentType, zoomLevel } = storeToRefs(useEditorStore());

const { template } = storeToRefs(useProfileStore());

const profileStore = useProfileStore();
const profile = storeToRefs(profileStore);
const letterStore = useLetterStore();
const letter = storeToRefs(letterStore);
const resumeStore = useResumeStore();
const resume = storeToRefs(resumeStore);

function downloadPdf() {
  window.print();
}

function exportToJson() {
  const toExport = {
    ...letter,
    ...profile,
    ...resume,
  };
  Object.entries(toExport).forEach(([key, value]) => {
    // @ts-expect-error Build object on the fly
    toExport[key] = value.value;
  });

  // @ts-expect-error Build object on the fly
  toExport.isNiceResumeExport = true;
  download(toExport, "nice-resume");
}

watch(documentType, (newValue) => {
  newValue === "letter" ? navigateTo("/letter") : navigateTo("/resume");
});
</script>

<template>
  <header
    class="print:hidden sticky top-0 z-10 h-[100px] flex justify-between items-center gap-2 px-10 bg-white text-pink-500 shadow-lg"
  >
    <NuxtLink to="/">
      <h1
        class="bg-gradient-to-br from-blue-700 to-pink-500 text-transparent bg-clip-text text-center text-4xl font-black tracking-widest uppercase"
        :data-version="packageJson.version"
      >
        Nice
        <br />
        Resume
      </h1>
    </NuxtLink>
    <div class="flex items-end gap-8 h-[60%]">
      <label for="template">
        Template
        <select id="template" v-model="template" class="select block">
          <option v-for="template in templates" :key="template" class="option">
            {{ template }}
          </option>
        </select>
      </label>

      <label for="documentType">
        Document
        <select
          id="documentType"
          v-model="documentType"
          class="select block capitalize"
        >
          <option
            v-for="documentType in documentTypes"
            :key="documentType"
            class="option"
          >
            {{ documentType }}
          </option>
        </select>
      </label>

      <label for="editorZoomLevel">
        Zoom
        <div class="flex gap-2 items-center">
          <input
            id="editorZoomLevel"
            class="w-36"
            type="range"
            min="50"
            max="150"
            v-model="zoomLevel"
          />
          <output class="w-[3rem] text-blue-500">{{ zoomLevel }}%</output>
        </div>
      </label>

      <button
        class="text-blue-500 flex items-center gap-1"
        @click="exportToJson"
      >
        <ArrowDownOnSquareIcon class="h-6" />
        Export data
      </button>

      <button
        class="text-blue-500 flex items-center gap-1"
        @click="downloadPdf"
      >
        <DocumentArrowDownIcon class="h-6" />
        Download PDF
      </button>
    </div>
  </header>
</template>
