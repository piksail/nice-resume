<script setup lang="ts">
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import Button from "primevue/button";
import Message from "primevue/message";
import Toolbar from "primevue/toolbar";
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
import packageJson from "../package.json";
import { generateStores } from "~/utils/editor";
import StyleEditor from "~/fragments/StyleEditor.vue";

console.info("Version: ", packageJson.version);

// eslint-disable-next-line no-undef
const { availableLocales, locale, setLocale } = useI18n();
// eslint-disable-next-line no-undef
const localePath = useLocalePath();

const { documentType } = storeToRefs(useEditorStore());
const { about, contactDetails, name, template, title } =
  storeToRefs(useProfileStore());
const { categories } = storeToRefs(useResumeStore());

const profileStore = useProfileStore();
const profile = storeToRefs(profileStore);
const resumeStore = useResumeStore();
const resume = storeToRefs(resumeStore);
const letterStore = useLetterStore();
const letter = storeToRefs(letterStore);

const isImportDialogOpen = ref(false);
const isExportDialogOpen = ref(false);

const isImportError = ref(false);

const isExportError = ref(false);
const isDocumentExportIncluded = ref(true);
const isExportToJsonIncluded = ref(false);
const isExportToJsonResumeIncluded = ref(false);

// TODO enable below code and change moon/sun icon accordingly
// const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
// if (darkThemeMq.matches) {
//   // Theme set to dark.
// } else {
//   // Theme set to light.
// }

function toggleDarkMode() {
  document.documentElement.classList.toggle("dark-mode");
}

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
  isExportDialogOpen.value = false;
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
  isExportDialogOpen.value = false;
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

      isExportDialogOpen.value = false;
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

      isImportDialogOpen.value = false;
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
  isImportDialogOpen.value = false;
}

onMounted(() => {
  isImportDialogOpen.value = true;
});
</script>

<template>
  <Dialog
    v-model:visible="isImportDialogOpen"
    modal
    header="Hey!"
    class="max-w-screen-sm"
  >
    <p class="mb-8 text-center text-2xl font-bold text-pink-500">
      How do you want to start editing?
    </p>
    <div class="flex flex-col gap-4">
      <button
        class="button bgGradient p-[2px]"
        @click="isImportDialogOpen = false"
      >
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
      <Message size="small" variant="simple" class="text-center">
        *Full compatibility will be soon available. In The meantime,
        double-check dates, highlights and tags after import, and be informed
        that profile image and references are not supported yet.
      </Message>
      <Message v-if="isImportError" severity="error" class="text-center">
        Error while importing data from local file.
      </Message>
    </div>
  </Dialog>

  <Dialog
    v-model:visible="isExportDialogOpen"
    modal
    header="Hey!"
    class="max-w-screen-sm"
  >
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
  </Dialog>

  <header class="sticky top-0 z-10 h-[80px]">
    <Toolbar class="h-full !border-none shadow">
      <template #start>
        <NuxtLink :to="localePath('/')">
          <h1
            class="bgGradient textGradient text-center text-2xl leading-none"
            :data-version="packageJson.version"
          >
            Nice
            <br />
            Resume
          </h1>
        </NuxtLink>
      </template>

      <template #center>
        <div class="flex gap-2 items-end h-[60%]">
          <Field
            type="selectbutton"
            :label="$t('document')"
            v-model="documentType"
            :options="documentTypes"
          />

          <Field
            id="template"
            type="select"
            :label="$t('theme')"
            v-model="template"
            :options="templates"
          />

          <StyleEditor />
        </div>
      </template>

      <template #end>
        <div class="flex gap-2 items-end h-[60%]">
          <Button
            icon="pi pi-refresh"
            variant="outlined"
            size="small"
            :aria-label="capitalize($t('restart'))"
            @click="isImportDialogOpen = true"
          />
          <!-- <Button label="Start again" asChild> TODO save style
              <button
                class="button bgGradient p-[2px]"
                @click="isImportDialogOpen = true"
              >
                <div class="button bg-white h-full w-full rounded-sm">
                  <span class="textGradient">Start again</span>
                </div>
              </button>
            </Button> -->
          <!-- <button
              class="button bgGradient p-[2px]"
              @click="isImportDialogOpen = true"
            >
              <div class="button bg-white h-full w-full rounded-sm">
                <span class="textGradient">Start again</span>
              </div>
            </button> -->

          <!-- <label for="editorZoomLevel" class="hidden">
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
            </label> -->

          <Button
            icon="pi pi-download"
            size="small"
            :aria-label="'todo phrase'"
            @click="isExportDialogOpen = true"
          />
          <!-- <Button  class="bg-red-500"> TODO save style
              <button
                class="button bgGradient text-white"
                @click="isExportDialogOpen = true"
              >
                <DocumentArrowDownIcon class="h-6" />
                {{ $t("download") }}
              </button>
            </Button> -->

          <Button
            :icon="// document.documentElement.classList.includes('dark-mode')
            //   ? 'pi pi-sun'
            //   : 'pi pi-moon'
            'pi pi-sun'"
            size="small"
            :aria-label="'todo phrase'"
            @click="toggleDarkMode"
          />

          <Field
            type="select"
            :default-value="locale"
            :options="availableLocales"
            :aria-label="'todo phrase'"
            @value-change="setLocale"
          />
        </div>
      </template>
    </Toolbar>
  </header>
</template>
