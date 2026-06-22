<script setup lang="ts">
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import type { Export, JsonResume } from "@/types";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { formatJsonResumeAsResume } from "@/utils/json-resume";
import { generateStores } from "~/utils/editor";
import { capitalize } from "@/utils/string";
import MiniLabel from "~/components/MiniLabel.vue";

const { t: localizer } = useI18n();

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
function importSaveFile(event: Event) {
  isImportError.value = false;

  try {
    // @ts-expect-error TODO TODO TODO
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

      Object.entries(toImport.profile).forEach(([key, value]) => {
        // @ts-expect-error Build object on the fly
        if (profile[key]) {
          // @ts-expect-error Build object on the fly
          profile[key].value = value;
        }
      });
      Object.entries(toImport.resume).forEach(([key, value]) => {
        // @ts-expect-error Build object on the fly
        if (resume[key]) {
          // @ts-expect-error Build object on the fly
          resume[key].value = value;
        }
      });
      Object.entries(toImport.letter).forEach(([key, value]) => {
        // @ts-expect-error Build object on the fly
        if (letter[key]) {
          // @ts-expect-error Build object on the fly
          letter[key].value = value;
        }
      });
      Object.entries(toImport.email).forEach(([key, value]) => {
        // @ts-expect-error Build object on the fly
        if (letter[key]) {
          // @ts-expect-error Build object on the fly
          letter[key].value = value;
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
function importFromJsonResume(event: Event) {
  isImportError.value = false;

  try {
    // @ts-expect-error TODO TODO TODO
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
  <UButton
    :label="capitalize($t('toRestart'))"
    icon="i-lucide-rotate-ccw"
    variant="outline"
    size="sm"
    @click="isImportDialogOpen = true"
  />

  <UModal
    v-model:open="isImportDialogOpen"
    modal
    :title="t('resumeTitle')"
    class="max-w-lg"
  >
    <template #body>
      <div class="grid space-y-8">
        <UButton
          icon="i-lucide-play"
          :label="t('resumeContinue')"
          size="xl"
          variant="soft"
          @click="isImportDialogOpen = false"
        />
        <div class="grid gap-1">
          <MiniLabel :label="t('startAnew')" />
          <UButton
            icon="i-lucide-file"
            :label="t('resumeFromScratch')"
            variant="outline"
            color="neutral"
            @click="resetStores"
          />
          <UButton
            icon="i-lucide-file-edit"
            :label="t('resumeFromFakeData')"
            variant="outline"
            color="neutral"
            @click="generateRandomData"
          />
        </div>
        <div class="grid gap-1">
          <MiniLabel :label="t('useFile')" />
          <UFileUpload
            v-slot="{ open }"
            accept="application/json"
            auto
            custom-upload
            @select="importSaveFile"
          >
            <UButton
              :label="t('importSaveFile')"
              icon="i-lucide-upload"
              color="neutral"
              variant="outline"
              @click="open()"
            />
          </UFileUpload>
          <UFileUpload
            v-slot="{ open }"
            accept="application/json"
            auto
            custom-upload
            @select="importFromJsonResume"
          >
            <UButton
              :label="t('importJsonResume')"
              icon="i-lucide-file-braces-corner"
              color="neutral"
              variant="outline"
              @click="open()"
            />
          </UFileUpload>
          <UAlert
            size="sm"
            variant="outline"
            description="*Full compatibility will be soon available. In The meantime, double-check dates, highlights and tags after import, and be informed that profile image and references are not supported yet."
            class="text-center"
          />
        </div>
        <UAlert v-if="isImportError" color="error" class="text-center mt-4">
          Error while importing data from local file.
        </UAlert>
      </div>
    </template>
  </UModal>
</template>

<i18n lang="json">
{
  "br": {
    "resumeTitle": "TODO?",
    "resumeContinue": "TODO",
    "resumeFromScratch": "TODO",
    "resumeFromFakeData": "TODO",
    "importSaveFile": "Emporzhiañ gwared fichennaoueg kent estez",
    "importJsonResume": "Emporzhiañ JSON Resume fichennaoueg",
    "startAnew": "TODO",
    "useFile": "TODO"
  },
  "de": {
    "resumeTitle": "Wie möchten Sie wieder arbeiten?",
    "resumeContinue": "Machen Sie dort weiter, wo Sie aufgehört haben",
    "resumeFromScratch": "TODO",
    "resumeFromFakeData": "TODO",
    "importSaveFile": "Datei aus einer früheren Sitzung importieren",
    "importJsonResume": "JSON Resume Datei importieren",
    "startAnew": "TODO",
    "useFile": "TODO"
  },
  "en": {
    "resumeTitle": "How do you want to start editing?",
    "resumeContinue": "Continue where you left off",
    "resumeFromScratch": "Start from scratch",
    "resumeFromFakeData": "Edit pre-filled data",
    "importSaveFile": "Import a save file from a previous session",
    "importJsonResume": "Import a JSON Resume file",
    "startAnew": "New project",
    "useFile": "Use save file"
  },
  "es": {
    "resumeTitle": "¿Cómo quieres empezar?",
    "resumeContinue": "Continúa donde lo dejaste",
    "resumeFromScratch": "Empezar desde el principio",
    "resumeFromFakeData": "TODO",
    "importSaveFile": "Importar un archivo de una sesión anterior",
    "importJsonResume": "Importar un archivo de JSON Resume",
    "startAnew": "TODO",
    "useFile": "TODO"
  },
  "fr": {
    "resumeTitle": "Comment souhaitez-vous commencer ?",
    "resumeContinue": "Reprendre là où vous en étiez resté",
    "resumeFromScratch": "Commencer à partir de rien",
    "resumeFromFakeData": "Reprendre à partir d'un exemple",
    "importSaveFile": "Importer une sauvegarde d'une session précédente",
    "importJsonResume": "Importer un fichier JSON Resume",
    "startAnew": "Nouveau document",
    "useFile": "Réutiliser une sauvegarde"
  },
  "it": {
    "resumeTitle": "TODO?",
    "resumeContinue": "TODO",
    "resumeFromScratch": "TODO",
    "resumeFromFakeData": "TODO",
    "importSaveFile": "TODO",
    "importJsonResume": "TODO",
    "startAnew": "TODO",
    "useFile": "TODO"
  }
}
</i18n>
