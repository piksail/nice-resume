<script setup lang="ts">
import { ref, watch } from "vue";
import { navigateTo } from "nuxt/app";
import { storeToRefs } from "pinia";
import { DocumentArrowDownIcon } from "@heroicons/vue/24/outline";
import { useEditorStore } from "@/stores/editor";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { documentTypes, templates } from "@/globals";
import { download } from "@/utils/file";
import { formatResumeAsJsonResume } from "@/utils/json-resume";
import packageJson from "../package.json";

console.info("Version: ", packageJson.version);

const { documentType, zoomLevel } = storeToRefs(useEditorStore());
const { name, template, title } = storeToRefs(useProfileStore());
const { about, categories, contactDetails } = storeToRefs(useResumeStore());

const dialog = ref(null);

function downloadPdf() {
  window.print();
  closeModal();
}

/**
 * Retrieve and export state from localStorage as a JSON file.
 */
function exportToJson() {
  const rawProfile = localStorage.getItem("profile");
  const rawResume = localStorage.getItem("resume");
  const rawLetter = localStorage.getItem("letter");
  const toExport = {
    isNiceResumeExport: true,
    profile: JSON.parse(rawProfile ?? ""),
    resume: JSON.parse(rawResume ?? ""),
    letter: JSON.parse(rawLetter ?? ""),
  };
  download(toExport, "nice-resume");
  closeModal();
}

/**
 * Create and export a JSON-Resume-compliant resume as a JSON.
 */
function exportResumeToJsonResume() {
  const resume = {
    name: name.value,
    title: title.value,
    about: about.value,
    contactDetails: contactDetails.value,
    categories: categories.value,
  };
  const toExport = formatResumeAsJsonResume(resume);
  download(toExport, "nice-resume-to-json-resume");
  closeModal();
}

function closeModal() {
  // @ts-expect-error TODO type
  dialog.value.close();
}

function openModal() {
  // @ts-expect-error TODO type
  dialog.value.showModal();
}

watch(documentType, (newValue) => {
  newValue === "letter" ? navigateTo("/letter") : navigateTo("/resume");
});
</script>

<template>
  <dialog
    ref="dialog"
    class="print:hidden max-w-screen-sm m-auto p-16 rounded-lg backdrop:bg-black/50 backdrop:backdrop-blur-sm"
  >
    <p class="mb-8 text-center text-2xl font-bold text-pink-500">
      What do you want to download?
    </p>
    <!-- TODO use checkbox instead -->
    <div class="flex flex-col gap-4">
      <Button class="shadow" @click="downloadPdf">
        {{ documentType }} as PDF
      </Button>
      <Button class="shadow" @click="exportToJson">
        Nice Resume data (save it for later)
      </Button>
      <Button class="shadow" @click="exportResumeToJsonResume">
        JSON Resume compatible data*
      </Button>
      <p class="text-blue-500 text-center">
        *Full compatibility will be soon available. In The meantime,
        double-check dates, highlights and tags, and add missing elements such
        as profile image, awards, publications and references directly in JSON
        Resume.
      </p>
      <!-- <p v-if="isImportError" class="text-red-500 text-center">
        Error exporting data. TODO handle errors
      </p> -->
    </div>
  </dialog>
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

      <button class="text-blue-500 flex items-center gap-1" @click="openModal">
        <DocumentArrowDownIcon class="h-6" />
        Download
      </button>
    </div>
  </header>
</template>
