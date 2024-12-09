<script setup lang="ts">
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import Button from "primevue/button";
import Divider from "primevue/divider";
import FileUpload, { type FileUploadSelectEvent } from "primevue/fileupload";
import Message from "primevue/message";
import Step from "primevue/step";
import StepPanel from "primevue/steppanel";
import Stepper from "primevue/stepper";
import StepItem from "primevue/stepitem";
import Toolbar from "primevue/toolbar";
import type { Export, JsonResume } from "@/types";
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

// eslint-disable-next-line no-undef
const { t } = useI18n({
  useScope: "local",
});

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

const isJsonResumeExportDialogOpen = ref(false);
const jsonResumeExportSteps = ref<string[]>([]);
const jsonResume = ref<JsonResume>();

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
  const rawEmail = localStorage.getItem("email");
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
  jsonResume.value = formatResumeAsJsonResume(resume);
  jsonResumeExportSteps.value.push("profile");
  Object.entries(jsonResume.value).forEach(([key, value]) => {
    if (value.length) {
      jsonResumeExportSteps.value.push(key);
    }
  });
  // Allow non-Nice Resume sections to be filled
  jsonResumeExportSteps.value.push("references");
  isJsonResumeExportDialogOpen.value = true;
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

  <Dialog
    v-model:visible="isExportDialogOpen"
    modal
    :header="t('exportTitle')"
    class="max-w-screen-sm"
  >
    <div class="flex flex-col gap-4">
      <Field
        id="isDocumentExportIncluded"
        :label="`${capitalize(documentType)} as ${documentType === 'email' ? 'HTML' : 'PDF'}`"
        type="checkbutton"
        v-model="isDocumentExportIncluded"
      />
      <Field
        id="isExportToJsonIncluded"
        label="Nice Resume data (save it for later)"
        help-text="This includes all documents (resume, cover letter, email signature)"
        type="checkbutton"
        v-model="isExportToJsonIncluded"
      />
      <Field
        v-if="documentType === 'resume'"
        id="isExportToJsonResumeIncluded"
        label="JSON Resume compatible data"
        help-text="Fill in the gaps between Nice Resume and JSON Resume formats"
        type="checkbutton"
        v-model="isExportToJsonResumeIncluded"
      />
      <Button
        icon="pi pi-download"
        :label="t('exportSubmit')"
        variant="outlined"
        @click="downloadSelection"
      />
      <p v-if="isExportError" class="text-red-500 text-center">
        Error exporting data.
      </p>
    </div>
  </Dialog>

  <Dialog
    v-model:visible="isJsonResumeExportDialogOpen"
    modal
    :header="t('editAndConfirmJsonResumeMapping')"
    class="max-w-screen-lg"
  >
    <p>
      Consult schema
      <a href="https://jsonresume.org/schema">https://jsonresume.org/schema</a>
    </p>
    <div class="card flex justify-center" v-if="jsonResume">
      <Stepper :value="jsonResumeExportSteps[0]" linear>
        <StepItem
          v-for="(step, index) in jsonResumeExportSteps"
          :key="`jsonResumeExportStep${index}`"
          :value="step"
        >
          <Step>{{ capitalize($t(step)) }}</Step>
          <StepPanel
            v-slot="{ activateCallback }"
            :value="jsonResumeExportSteps[index]"
          >
            <div v-if="step === 'profile'" class="formBlock">
              <Field :label="$t('email')" v-model="jsonResume.basics.email" />
              <Field :label="$t('phone')" v-model="jsonResume.basics.phone" />
              <Field label="URL" v-model="jsonResume.basics.url" />
              <Field
                :label="$t('address')"
                v-model="jsonResume.basics.location.address"
              />
              <Field
                :label="$t('postalCode')"
                v-model="jsonResume.basics.location.postalCode"
              />
              <Field
                :label="$t('city')"
                v-model="jsonResume.basics.location.city"
              />
              <Field
                :label="$t('countryCode')"
                v-model="jsonResume.basics.location.countryCode"
              />
              <Field
                :label="$t('region')"
                v-model="jsonResume.basics.location.region"
              />
              <label class="flex flex-col gap-1" for="profiles">
                <span class="label">{{ capitalize($t("profiles")) }}</span>
                <ul
                  v-if="jsonResume.basics.profiles.length"
                  id="profileList"
                  class="inputList"
                >
                  <li
                    v-for="(_profile, profileIndex) in jsonResume.basics
                      .profiles"
                    :key="profileIndex"
                    class="inputListItem"
                  >
                    <InputText
                      class="!text-sm"
                      size="small"
                      v-model="jsonResume.basics.profiles[profileIndex].network"
                    />
                    <InputText
                      class="!text-sm"
                      size="small"
                      v-model="
                        jsonResume.basics.profiles[profileIndex].username
                      "
                    />
                    <InputText
                      class="!text-sm"
                      size="small"
                      v-model="jsonResume.basics.profiles[profileIndex].url"
                    />
                    <ListActions
                      :index="profileIndex"
                      :list-length="jsonResume.basics.profiles.length"
                      @moveUp="moveUp(jsonResume.basics.profiles, profileIndex)"
                      @moveDown="
                        moveDown(jsonResume.basics.profiles, profileIndex)
                      "
                      @remove="remove(jsonResume.basics.profiles, profileIndex)"
                    />
                  </li>
                </ul>
              </label>
            </div>
            <div v-if="step === 'work'" class="formBlock">
              <FormBlockRow
                v-for="(item, index) in jsonResume.work"
                :key="item.position"
                :header="`${item.position} x ${item.name}`"
              >
                <Field label="URL" v-model="jsonResume.work[index].url" />
              </FormBlockRow>
            </div>
            <div v-if="step === 'volunteer'" class="formBlock">
              <FormBlockRow
                v-for="(item, index) in jsonResume.volunteer"
                :key="item.position"
                :header="item.position"
              >
                <Field label="URL" v-model="jsonResume.volunteer[index].url" />
              </FormBlockRow>
            </div>
            <div v-if="step === 'education'" class="formBlock">
              <FormBlockRow
                v-for="(item, index) in jsonResume.education"
                :key="item.area"
                :header="item.area"
              >
                <Field
                  :label="$t('startDate')"
                  v-model="jsonResume.education[index].startDate"
                />
                <Field
                  :label="$t('endDate')"
                  v-model="jsonResume.education[index].endDate"
                />
                <Field label="URL" v-model="jsonResume.education[index].url" />
                <Field
                  :label="$t('area')"
                  v-model="jsonResume.education[index].area"
                />
                <Field
                  :label="$t('studyType')"
                  v-model="jsonResume.education[index].studyType"
                />
                <Field
                  :label="$t('score')"
                  v-model="jsonResume.education[index].score"
                />
              </FormBlockRow>
            </div>
            <div v-if="step === 'awards'" class="formBlock">
              <FormBlockRow
                v-for="(award, index) in jsonResume.awards"
                :key="award.title"
                :header="award.title"
              >
                <Field
                  :label="$t('date')"
                  v-model="jsonResume.awards[index].date"
                  helpText="Please type the date in the YYYY-MM-DD format"
                />
              </FormBlockRow>
            </div>
            <div v-if="step === 'certificates'" class="formBlock">
              <FormBlockRow
                v-for="(certificate, index) in jsonResume.certificates"
                :key="certificate.name"
                :header="certificate.name"
              >
                <Field
                  :label="$t('date')"
                  v-model="jsonResume.certificates[index].date"
                  helpText="Please type the date in the YYYY-MM-DD format"
                />
                <Field
                  label="URL"
                  v-model="jsonResume.certificates[index].url"
                />
              </FormBlockRow>
            </div>
            <div v-if="step === 'publications'" class="formBlock">
              <FormBlockRow
                v-for="(publication, index) in jsonResume.publications"
                :key="publication.name"
                :header="publication.name"
              >
                <Field
                  :label="$t('releaseDate')"
                  v-model="jsonResume.publications[index].releaseDate"
                  helpText="Please type the date in the YYYY-MM-DD format"
                />
                <Field
                  label="URL"
                  v-model="jsonResume.publications[index].url"
                />
              </FormBlockRow>
            </div>
            <div v-if="step === 'skills'" class="formBlock">
              <FormBlockRow
                v-for="(skill, index) in jsonResume.skills"
                :key="skill.name"
                :header="skill.name"
              >
                <Field
                  :label="$t('level')"
                  v-model="jsonResume.skills[index].level"
                />
              </FormBlockRow>
            </div>
            <div v-if="step === 'languages'" class="formBlock">
              <FormBlockRow
                v-for="(language, index) in jsonResume.languages"
                :key="language.language"
                :header="language.language"
              >
                <Field
                  :label="$t('fluency')"
                  v-model="jsonResume.languages[index].fluency"
                />
              </FormBlockRow>
            </div>
            <div v-if="step === 'interests'" class="formBlock">
              <FormBlockRow
                v-for="(interest, index) in jsonResume.interests"
                :key="interest.name"
                :header="interest.name"
              >
                <Field
                  :label="$t('keywords')"
                  v-model="jsonResume.interests[index].keywords"
                />
              </FormBlockRow>
            </div>
            <div v-if="step === 'references'" class="formBlock">
              <FormBlockRow
                v-for="(reference, index) in jsonResume.references"
                :key="reference.name"
                :header="reference.name"
              >
                <Field
                  :label="$t('reference')"
                  v-model="jsonResume.references[index].reference"
                />
              </FormBlockRow>
              <!-- TODO listactions order etc. add+ -->
            </div>
            <div v-if="step === 'projects'" class="formBlock">
              <FormBlockRow
                v-for="(project, index) in jsonResume.projects"
                :key="project.name"
                :header="project.name"
              >
                <Field
                  :label="$t('startDate')"
                  v-model="jsonResume.projects[index].startDate"
                  helpText="Please type the date in the YYYY-MM-DD format"
                />
                <Field
                  :label="$t('endDate')"
                  v-model="jsonResume.projects[index].endDate"
                  helpText="Please type the date in the YYYY-MM-DD format"
                />
                <Field label="URL" v-model="jsonResume.projects[index].url" />
                <Field
                  :label="$t('highlights')"
                  v-model="jsonResume.projects[index].highlights"
                />
                <!-- TODOlul li listactions loop pour reorder -->
              </FormBlockRow>
            </div>
            <div v-if="index === 0" class="pt-6 flex justify-end">
              <Button
                :label="$t('submit')"
                icon="pi pi-arrow-right"
                iconPos="right"
                @click="activateCallback(jsonResumeExportSteps[index + 1])"
              />
            </div>
            <div
              v-else-if="index === jsonResumeExportSteps.length - 1"
              class="pt-6"
            >
              <Button
                :label="$t('previous')"
                severity="secondary"
                icon="pi pi-arrow-left"
                @click="activateCallback(jsonResumeExportSteps[index - 1])"
              />
              <Button
                :label="$t('submit')"
                icon="pi pi-check"
                iconPos="right"
                @click="download(jsonResume, 'nice-resume-to-json-resume')"
              />
            </div>
            <div v-else class="pt-6 flex justify-between">
              <Button
                :label="$t('previous')"
                severity="secondary"
                icon="pi pi-arrow-left"
                @click="activateCallback(jsonResumeExportSteps[index - 1])"
              />
              <Button
                :label="$t('next')"
                icon="pi pi-arrow-right"
                iconPos="right"
                @click="activateCallback(jsonResumeExportSteps[index + 1])"
              />
            </div>
          </StepPanel>
        </StepItem>
      </Stepper>
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
            :options="availableLocales"
            :aria-label="$t('switchLanguage')"
            :model-value="locale"
            @update:model-value="setLocale"
          />
        </div>
      </template>
    </Toolbar>
  </header>
</template>

<i18n lang="json">
{
  "en": {
    "resumeTitle": "How do you want to start editing?",
    "resumeContinue": "Continue where you left off",
    "resumeFromScratch": "Start from scratch",
    "resumeFromFakeData": "Edit pre-filled data",
    "importSaveFile": "Import a save file from a previous session",
    "importJsonResume": "Import a JSON Resume file",
    "exportTitle": "What do you want to download?",
    "exportSubmit": "Download selection",
    "editAndConfirmJsonResumeMapping": "Edit and confirm data"
  },
  "es": {
    "resumeTitle": "todo",
    "resumeContinue": "todo",
    "resumeFromScratch": "todo",
    "resumeFromFakeData": "todo",
    "importSaveFile": "todo",
    "importJsonResume": "todo",
    "exportTitle": "todo",
    "exportSubmit": "todo",
    "editAndConfirmJsonResumeMapping": "todo"
  },
  "fr": {
    "resumeTitle": "Comment souhaitez-vous commencer ?",
    "resumeContinue": "Reprendre là où vous en étiez resté",
    "resumeFromScratch": "Commencer à partir de rien",
    "resumeFromFakeData": "Reprendre à partir d'un exemple",
    "importSaveFile": "Importer une sauvegarde d'une session précédente",
    "importJsonResume": "Importer un fichier JSON Resume",
    "exportTitle": "Comment souhaitez-vous exporter votre travail ?",
    "exportSubmit": "Exporter la sélection",
    "editAndConfirmJsonResumeMapping": "Editez et confirmez les informations"
  }
}
</i18n>
