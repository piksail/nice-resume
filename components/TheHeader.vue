<script setup lang="ts">
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { DocumentArrowDownIcon } from "@heroicons/vue/24/outline";
import type { Export } from "@/types";
import { useEditorStore } from "@/stores/editor";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { documentTypes, templates } from "@/globals";
import { download, downloadHtml } from "@/utils/file";
import { formatResumeAsJsonResume } from "@/utils/json-resume";
import { capitalize } from "@/utils/string";
import Field from "@/components/Field.vue";
import useDialog from "~/composables/use-dialog";
import packageJson from "../package.json";
import { generateStores } from "~/utils/editor";

console.info("Version: ", packageJson.version);

const { documentType, zoomLevel } = storeToRefs(useEditorStore());
const { about, contactDetails, name, template, title } =
  storeToRefs(useProfileStore());
const { categories } = storeToRefs(useResumeStore());

const profileStore = useProfileStore();
const profile = storeToRefs(profileStore);
const resumeStore = useResumeStore();
const resume = storeToRefs(resumeStore);
const letterStore = useLetterStore();
const letter = storeToRefs(letterStore);

const {
  dialog: exportDialog,
  openDialog: openExportDialog,
  closeDialog: closeExportDialog,
} = useDialog();
const {
  dialog: importDialog,
  openDialog: openImportDialog,
  closeDialog: closeImportDialog,
} = useDialog();

const isImportError = ref(false);

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
  closeExportDialog();
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
  const jsonResume = {
    name: name.value,
    title: title.value,
    about: about.value,
    contactDetails: contactDetails.value,
    categories: categories.value,
  };
  const toExport = formatResumeAsJsonResume(jsonResume);
  download(toExport, "nice-resume-to-json-resume");
}

/**
 * Generate random data to edit.
 */
function generateRandomData() {
  generateStores(profileStore, resumeStore, letterStore);
  closeImportDialog();
}

/**
 * Import a JSON Resume schema.
 */
function importFromJsonResume(event: Event) {
  isImportError.value = false;
  try {
    // @ts-expect-error It seems there is no default <input type=file /> native TS type...
    const file = event.currentTarget?.files[0];

    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = function (fileReaderEvent) {
      if (!fileReaderEvent.target?.result) {
        isImportError.value = true;
        return;
      }

      const toImport: Export = JSON.parse(
        fileReaderEvent.target.result.toString(),
      );

      // TODO start user-journey to apply mapping
      // TODO improve mapping (startDate/endDate->period)
      // TODO improve mapping (highlights/tags->handle)
      // TODO improve mapping (references->lost)

      Object.entries(toImport).forEach(([key, value]) => {
        // @ts-expect-error Build object on the fly
        if (letter[key]) {
          // @ts-expect-error Build object on the fly
          letter[key].value = value;
        }
        // @ts-expect-error Build object on the fly
        if (profile[key]) {
          // @ts-expect-error Build object on the fly
          profile[key].value = value;
        }
        // @ts-expect-error Build object on the fly
        if (resume[key]) {
          // @ts-expect-error Build object on the fly
          resume[key].value = value;
        }
      });

      closeImportDialog();
    };
    fileReader.onerror = function () {
      isImportError.value = true;
    };
  } catch {
    isImportError.value = true;
  }
}

/**
 * Import exported JSON data from a previous session.
 */
function importSaveFile(event: Event) {
  isImportError.value = false;
  try {
    // @ts-expect-error It seems there is no default <input type=file /> native TS type...
    const file = event.currentTarget?.files[0];

    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = function (fileReaderEvent) {
      if (!fileReaderEvent.target?.result) {
        isImportError.value = true;
        return;
      }

      const toImport: Export = JSON.parse(
        fileReaderEvent.target.result.toString(),
      );
      if (!toImport.isNiceResumeExport) {
        isImportError.value = true;
        return;
      }

      Object.entries(toImport).forEach(([key, value]) => {
        // @ts-expect-error Build object on the fly
        if (letter[key]) {
          // @ts-expect-error Build object on the fly
          letter[key].value = value;
        }
        // @ts-expect-error Build object on the fly
        if (profile[key]) {
          // @ts-expect-error Build object on the fly
          profile[key].value = value;
        }
        // @ts-expect-error Build object on the fly
        if (resume[key]) {
          // @ts-expect-error Build object on the fly
          resume[key].value = value;
        }
      });

      closeImportDialog();
    };
    fileReader.onerror = function () {
      isImportError.value = true;
    };
  } catch {
    isImportError.value = true;
  }
}

/**
 * Reset all stores.
 */
function resetStores() {
  profileStore.$reset();
  resumeStore.$reset();
  letterStore.$reset();
  closeImportDialog();
}

onMounted(() => {
  openImportDialog();
});
</script>

<template>
  <dialog ref="importDialog" class="dialog max-w-screen-sm">
    <p class="mb-8 text-center text-2xl font-bold text-pink-500">
      How do you want to start editing?
    </p>
    <div class="flex flex-col gap-4">
      <button class="button bgGradient p-[2px]" @click="closeImportDialog">
        <div class="button bg-white h-full w-full rounded-sm">
          <span class="textGradient">Continue where I left off</span>
        </div>
      </button>
      <button class="button bgGradient p-[2px]" @click="resetStores">
        <div class="button bg-white h-full w-full rounded-sm">
          <span class="textGradient">Start from scratch</span>
        </div>
      </button>
      <button class="button bgGradient p-[2px]" @click="generateRandomData">
        <div class="button bg-white h-full w-full rounded-sm">
          <span class="textGradient">Edit pre-filled data</span>
        </div>
      </button>
      <label
        for="editorSaveFileReader"
        class="button bgGradient p-[2px] cursor-pointer"
      >
        <div class="button bg-white h-full w-full rounded-sm">
          <span class="textGradient">
            Import a save file from a previous session
          </span>
          <input
            id="editorSaveFileReader"
            class="hidden"
            type="file"
            accept=".json"
            @change="importSaveFile"
          />
        </div>
      </label>
      <label
        for="editorJsonResumeFileReader"
        class="button bgGradient p-[2px] cursor-pointer"
      >
        <div class="button bg-white h-full w-full rounded-sm">
          <span class="textGradient">Import a JSON Resume file*</span>
          <input
            id="editorJsonResumeFileReader"
            class="hidden"
            type="file"
            accept=".json"
            @change="importFromJsonResume"
          />
        </div>
      </label>
      <p class="text-blue-500 text-center">
        *Full compatibility will be soon available. In The meantime,
        double-check dates, highlights and tags after import, and be informed
        that profile image and references are not supported yet.
      </p>
      <p v-if="isImportError" class="text-red-500 text-center">
        Error while importing data from local file.
      </p>
    </div>
  </dialog>
  <!-- TODO close top-right -->
  <dialog ref="exportDialog" class="dialog max-w-screen-sm">
    <p class="mb-8 text-center text-2xl font-bold text-pink-500">
      What do you want to download?
    </p>
    <div class="flex flex-col gap-4">
      <Field
        id="isDocumentExportIncluded"
        :label="`${capitalize(documentType)} as ${documentType === 'email' ? 'HTML' : 'PDF'}`"
        type="checkbutton"
        v-model="isDocumentExportIncluded"
      />
      <div>
        <Field
          id="isExportToJsonIncluded"
          label="Nice Resume data (save it for later)"
          sub-label="This includes all documents (resume, cover letter, email signature)"
          type="checkbutton"
          v-model="isExportToJsonIncluded"
        />
      </div>
      <div v-if="documentType === 'resume'">
        <Field
          id="isExportToJsonResumeIncluded"
          label="JSON Resume compatible data"
          sub-label="Full compatibility will be soon available. In The meantime,
          double-check dates, highlights and tags, and add missing elements such
          as profile image and references directly in JSON Resume."
          type="checkbutton"
          v-model="isExportToJsonResumeIncluded"
        />
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
        Nice
        <br />
        Resume
      </h1>
    </NuxtLink>
    <div class="flex items-end gap-8 h-[60%]">
      <button class="button bgGradient p-[2px]" @click="openImportDialog">
        <div class="button bg-white h-full w-full rounded-sm">
          <span class="textGradient">Start again</span>
        </div>
      </button>

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

      <button class="button bgGradient text-white" @click="openExportDialog">
        <DocumentArrowDownIcon class="h-6" />
        Download
      </button>
    </div>
  </header>
</template>
