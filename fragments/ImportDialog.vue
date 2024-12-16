<script setup lang="ts">
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import Button from "primevue/button";
import Divider from "primevue/divider";
import FileUpload, { type FileUploadSelectEvent } from "primevue/fileupload";
import Message from "primevue/message";
import type { Export, JsonResume } from "@/types";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { formatJsonResumeAsResume } from "@/utils/json-resume";
import { generateStores } from "~/utils/editor";

// eslint-disable-next-line no-undef
const { t: localizer } = useI18n();

// eslint-disable-next-line no-undef
const { t } = useI18n({
  useScope: "local",
});

const profileStore = useProfileStore();
const profile = storeToRefs(profileStore);
const resumeStore = useResumeStore();
const resume = storeToRefs(resumeStore);
const letterStore = useLetterStore();
const letter = storeToRefs(letterStore);

const isImportDialogOpen = ref(false);
const isImportError = ref(false);

/**
 * Generate random data to edit.
 */
function generateRandomData() {
  generateStores(profileStore, resumeStore, letterStore, localizer);
  isImportDialogOpen.value = false;
}

/**
 * Import exported JSON data from a previous session.
 */
function importSaveFile(event: FileUploadSelectEvent) {
  isImportError.value = false;

  try {
    const file = event.files[0];

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
 * Import a JSON Resume schema.
 */
function importFromJsonResume(event: FileUploadSelectEvent) {
  isImportError.value = false;

  try {
    const file = event.files[0];

    const fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = function (fileReaderEvent) {
      if (!fileReaderEvent.target?.result) {
        isImportError.value = true;
        return;
      }

      const jsonResume: JsonResume = JSON.parse(
        fileReaderEvent.target.result.toString(),
      );

      const toImport = formatJsonResumeAsResume(jsonResume, localizer);
      Object.entries(toImport).forEach(([key, value]) => {
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
  <Button
    icon="pi pi-refresh"
    variant="outlined"
    size="small"
    :aria-label="capitalize($t('toRestart'))"
    @click="isImportDialogOpen = true"
  />

  <Dialog
    v-model:visible="isImportDialogOpen"
    modal
    :header="t('resumeTitle')"
    class="max-w-screen-sm"
  >
    <div class="grid grid-cols-2 gap-x-4">
      <Button
        icon="pi pi-play"
        :label="t('resumeContinue')"
        class="col-span-2"
        @click="isImportDialogOpen = false"
      />
      <Divider class="col-span-2 uppercase text-sm">
        {{ $t("or") }}
      </Divider>
      <Button
        icon="pi pi-file"
        :label="t('resumeFromScratch')"
        variant="outlined"
        @click="resetStores"
      />
      <Button
        icon="pi pi-file-edit"
        :label="t('resumeFromFakeData')"
        variant="outlined"
        @click="generateRandomData"
      />
      <Divider class="col-span-2 uppercase text-sm">
        {{ $t("or") }}
      </Divider>
      <FileUpload
        class="size-full"
        mode="basic"
        accept="application/json"
        auto
        customUpload
        chooseIcon="pi pi-file-import"
        :chooseLabel="t('importSaveFile')"
        :choose-button-props="{ severity: 'secondary', variant: 'outlined' }"
        @select="importSaveFile"
      />
      <FileUpload
        class="size-full"
        mode="basic"
        accept="application/json"
        auto
        customUpload
        chooseIcon="pi pi-file-arrow-up"
        :chooseLabel="t('importJsonResume')"
        :choose-button-props="{ severity: 'secondary', variant: 'outlined' }"
        @select="importFromJsonResume"
      />
      <div class="col-span-2 mt-4">
        <Message size="small" variant="simple" class="text-center">
          *Full compatibility will be soon available. In The meantime,
          double-check dates, highlights and tags after import, and be informed
          that profile image and references are not supported yet.
        </Message>
        <Message
          v-if="isImportError"
          severity="error"
          class="col-span-2 text-center"
        >
          Error while importing data from local file.
        </Message>
      </div>
    </div>
  </Dialog>
</template>

<i18n lang="json">
{
  "br": {
    "resumeTitle": "TODO?",
    "resumeContinue": "TODO",
    "resumeFromScratch": "TODO",
    "resumeFromFakeData": "TODO",
    "importSaveFile": "Emporzhiañ gwared fichennaoueg kent estez",
    "importJsonResume": "Emporzhiañ JSON Resume fichennaoueg"
  },
  "de": {
    "resumeTitle": "TODO",
    "resumeContinue": "Machen Sie dort weiter, wo Sie aufgehört haben",
    "resumeFromScratch": "TODO",
    "resumeFromFakeData": "TODO",
    "importSaveFile": "Datei aus einer früheren Sitzung importieren",
    "importJsonResume": "JSON Resume Datei importieren"
  },
  "en": {
    "resumeTitle": "How do you want to start editing?",
    "resumeContinue": "Continue where you left off",
    "resumeFromScratch": "Start from scratch",
    "resumeFromFakeData": "Edit pre-filled data",
    "importSaveFile": "Import a save file from a previous session",
    "importJsonResume": "Import a JSON Resume file"
  },
  "es": {
    "resumeTitle": "TODO",
    "resumeContinue": "TODO",
    "resumeFromScratch": "TODO",
    "resumeFromFakeData": "TODO",
    "importSaveFile": "TODO",
    "importJsonResume": "TODO"
  },
  "fr": {
    "resumeTitle": "Comment souhaitez-vous commencer ?",
    "resumeContinue": "Reprendre là où vous en étiez resté",
    "resumeFromScratch": "Commencer à partir de rien",
    "resumeFromFakeData": "Reprendre à partir d'un exemple",
    "importSaveFile": "Importer une sauvegarde d'une session précédente",
    "importJsonResume": "Importer un fichier JSON Resume"
  }
}
</i18n>
