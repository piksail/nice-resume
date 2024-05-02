<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { DocumentArrowDownIcon } from "@heroicons/vue/24/outline";
import { useEditorStore } from "@/stores/editor";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { documentTypes, templates } from "@/globals";
import { download, downloadHtml } from "@/utils/file";
import { formatResumeAsJsonResume } from "@/utils/json-resume";
import { capitalize } from "@/utils/string";
import Field from "@/components/Field.vue";
import packageJson from "../package.json";
import { useI18n } from "#imports";

console.info("Version: ", packageJson.version);

// @ts-expect-error - You see the error here, it's not a problem
const { setLocale } = useI18n();

const { documentType, zoomLevel } = storeToRefs(useEditorStore());

const { about, contactDetails, name, template, title } =
  storeToRefs(useProfileStore());

const { categories } = storeToRefs(useResumeStore());

const dialog = ref(null);
const isExportError = ref(false);
const isDocumentExportIncluded = ref(true);
const isExportToJsonIncluded = ref(false);
const isExportToJsonResumeIncluded = ref(false);

function downloadPdf() {
  window.print();
}

/**
 * Download selected files.
 */
function downloadSelection() {
  isExportError.value = false;
  if (isExportToJsonIncluded.value) {
    exportToJson();
  }
  if (documentType.value === "resume" && isExportToJsonResumeIncluded.value) {
    exportResumeToJsonResume();
  }
  if (isDocumentExportIncluded.value) {
    if (documentType.value === "email") {
      const preview = document.getElementById("preview");
      if (!preview) {
        isExportError.value = true;
      } else {
        downloadHtml(preview, "nice-resume-email");
      }
    } else {
      downloadPdf();
    }
  }
  closeModal();
}

/**
 * Retrieve and export state from localStorage as a JSON file.
 */
function exportToJson() {
  const rawProfile = localStorage.getItem("profile");
  const rawResume = localStorage.getItem("resume");
  const rawLetter = localStorage.getItem("letter");
  const rawEmail = localStorage.getItem("Email");
  const toExport = {
    isNiceResumeExport: true,
    profile: JSON.parse(rawProfile ?? ""),
    resume: JSON.parse(rawResume ?? ""),
    letter: JSON.parse(rawLetter ?? ""),
    email: JSON.parse(rawEmail ?? ""),
  };
  download(toExport, "nice-resume");
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
}

function closeModal() {
  // @ts-expect-error TODO type
  dialog.value.close();
}

function openModal() {
  // @ts-expect-error TODO type
  dialog.value.showModal();
}
</script>

<template>
  <!-- TODO close top-right -->
  <dialog
    ref="dialog"
    class="max-w-screen-sm m-auto p-16 rounded-lg backdrop:bg-black/50 backdrop:backdrop-blur-sm"
  >
    <p class="mb-8 text-center text-2xl font-bold text-pink-500">
      What do you want to download?
    </p>
    <div class="flex flex-col gap-4">
      <Field
        id="isDocumentExportIncluded"
        :label="`${capitalize(documentType)} as ${documentType === 'email' ? 'HTML' : 'PDF'}`"
        type="checkbox"
        v-model="isDocumentExportIncluded"
      />
      <div>
        <Field
          id="isExportToJsonIncluded"
          label="Nice Resume data (save it for later)*"
          type="checkbox"
          v-model="isExportToJsonIncluded"
        />
        <p class="text-xs">
          *This includes all documents (resume, cover letter, email signature)
        </p>
      </div>
      <div v-if="documentType === 'resume'">
        <Field
          id="isExportToJsonResumeIncluded"
          label="JSON Resume compatible data*"
          type="checkbox"
          v-model="isExportToJsonResumeIncluded"
        />
        <p class="text-xs">
          *Full compatibility will be soon available. In The meantime,
          double-check dates, highlights and tags, and add missing elements such
          as profile image and references directly in JSON Resume.
        </p>
      </div>
      <button class="button bgGradient p-[2px]" @click="downloadSelection">
        <div class="button bg-white h-full w-full rounded-sm">
          <span class="textGradient">Download selection</span>
        </div>
      </button>
      <p v-if="isExportError" class="text-red-500 text-center">
        Error exporting data.
      </p>
    </div>
  </dialog>
  <header
    class="sticky top-0 z-10 h-[100px] flex justify-between items-center gap-2 px-10 bg-white text-pink-500 shadow-lg"
  >
    <NuxtLink to="/">
      <h1
        class="bgGradient textGradient text-center text-4xl"
        :data-version="packageJson.version"
      >
        {{ $t("nice") }}
        <br />
        {{ $t("resume") }}
      </h1>
    </NuxtLink>
    <div class="flex items-end gap-8 h-[60%]">
      <label for="template">
        <span class="label">Template</span>
        <select
          id="template"
          v-model="template"
          class="select block text-blue-500"
        >
          <option v-for="template in templates" :key="template" class="option">
            {{ template }}
          </option>
        </select>
      </label>

      <label for="documentType">
        <span class="label">Document</span>
        <select
          id="documentType"
          v-model="documentType"
          class="select block capitalize text-blue-500"
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
      <label for="editorZoomLevel" class="hidden">
        <span class="label">Zoom</span>
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

      <button class="button bgGradient text-white" @click="openModal">
        <DocumentArrowDownIcon class="h-6" />
        Download
      </button>
    </div>
    <div>
      <div>
        <button @click="setLocale('en')">en</button>
        <br />
        <button @click="setLocale('fr')">fr</button>
        <br />
        <button @click="setLocale('br')">br</button>
      </div>
    </div>
  </header>
</template>
