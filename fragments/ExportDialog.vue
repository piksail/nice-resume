<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import Button from "primevue/button";
import Message from "primevue/message";
import SplitButton from "primevue/splitbutton";
import Step from "primevue/step";
import StepPanel from "primevue/steppanel";
import Stepper from "primevue/stepper";
import StepItem from "primevue/stepitem";
import type { JsonResume } from "@/types";
import { useEditorStore } from "@/stores/editor";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { moveDown, moveUp, remove } from "@/utils/array";
import { focusNextInput } from "@/utils/editor";
import { download, downloadHtml } from "@/utils/file";
import { formatResumeAsJsonResume } from "@/utils/json-resume";
import { capitalize } from "@/utils/string";
import { jsonResumeSchemaUrl } from "~/globals";

// eslint-disable-next-line no-undef
const { t } = useI18n({
  useScope: "local",
});

const { documentType } = storeToRefs(useEditorStore());
const { about, contactDetails, name, title } = storeToRefs(useProfileStore());
const { categories } = storeToRefs(useResumeStore());

const isExportDialogOpen = ref(false);

const isJsonResumeExportDialogOpen = ref(false);
const jsonResumeExportSteps = ref<string[]>([]);
const jsonResume = ref<JsonResume>();

const isExportError = ref(false);

const exportItems = computed(() => {
  const items = [
    {
      label: t("saveAsJson"),
      icon: "pi pi-file-export",
      command: () => exportToJson(),
    },
  ];

  if (documentType.value === "resume") {
    items.push({
      label: t("exportToJsonResume"),
      icon: "pi pi-file",
      command: () => exportResumeToJsonResume(),
    });
  }
  return items;
});

function addReference(index: number) {
  jsonResume.value?.references.push({ name: "", reference: "" });

  focusNextInput(`#referenceList${index} input`);
}

function downloadPdf() {
  window.print();
}

/**
 * Export document to the relevant format.
 */
function exportDocument() {
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
    profile: JSON.parse(rawProfile ?? "{}"),
    resume: JSON.parse(rawResume ?? "{}"),
    letter: JSON.parse(rawLetter ?? "{}"),
    email: JSON.parse(rawEmail ?? "{}"),
  };
  download(toExport, "nice-resume");
}

/**
 * Create and export a JSON-Resume-compliant resume as a JSON.
 */
function exportResumeToJsonResume() {
  const profile = {
    name: name.value,
    title: title.value,
    contactDetails: contactDetails.value,
  };
  const resume = {
    about: about.value,
    categories: categories.value,
  };
  jsonResume.value = formatResumeAsJsonResume(profile, resume);
  jsonResumeExportSteps.value.push("profile");
  Object.entries(jsonResume.value).forEach(([key, value]) => {
    if (value.length) {
      jsonResumeExportSteps.value.push(key);
    }
  });
  // Allow non-Nice Resume sections to be filled
  jsonResumeExportSteps.value.push("references");
  isExportDialogOpen.value = false;
  isJsonResumeExportDialogOpen.value = true;
}
</script>

<template>
  <SplitButton
    :label="capitalize($t('toExport'))"
    icon="pi pi-download"
    size="small"
    :aria-label="capitalize($t('toDownload'))"
    :model="exportItems"
    @click="exportDocument"
  />

  <Dialog
    v-model:visible="isJsonResumeExportDialogOpen"
    modal
    class="max-w-screen-xl"
  >
    <Message icon="pi pi-info-circle">
      <a :href="jsonResumeSchemaUrl" target="_blank" class="underline">
        {{ t("referToSchema") }}
      </a>
    </Message>
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
                    <Field
                      v-model="jsonResume.basics.profiles[profileIndex].network"
                    />
                    <Field
                      v-model="
                        jsonResume.basics.profiles[profileIndex].username
                      "
                    />
                    <Field
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
                :header="`${item.position} | ${item.name}`"
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
                :id="`referenceList${index}`"
              >
                <Field
                  :label="$t('name')"
                  v-model="jsonResume.references[index].name"
                />
                <Field
                  :label="$t('reference')"
                  v-model="jsonResume.references[index].reference"
                />
                <ListActions
                  :index="index"
                  :list-length="jsonResume.references.length"
                  @moveUp="moveUp(jsonResume.references, index)"
                  @moveDown="moveDown(jsonResume.references, index)"
                  @remove="remove(jsonResume.references, index)"
                />
              </FormBlockRow>
              <Button
                icon="pi pi-plus"
                :label="capitalize(`${$t('toAdd')} ${$t('reference')}`)"
                variant="outlined"
                size="small"
                @click="addReference(index)"
              />
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
              </FormBlockRow>
            </div>
            <div v-if="index === 0" class="pt-6 flex justify-end">
              <Button
                :label="$t('toSubmit')"
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
                :label="$t('toSubmit')"
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
</template>

<i18n lang="json">
{
  "br": {
    "saveAsJson": "TODO",
    "exportToJsonResume": "TODO",
    "referToSchema": "TODO"
  },
  "de": {
    "saveAsJson": "TODO",
    "exportToJsonResume": "TODO",
    "referToSchema": "Format sehen"
  },
  "en": {
    "saveAsJson": "Save data in a file",
    "exportToJsonResume": "Export data for JSON Resume",
    "referToSchema": "Refer to the schema"
  },
  "es": {
    "saveAsJson": "TODO",
    "exportToJsonResume": "TODO",
    "referToSchema": "TODO"
  },
  "fr": {
    "saveAsJson": "Sauvegarder dans un fichier",
    "exportToJsonResume": "Exporter au format JSON Resume",
    "referToSchema": "Consulter le format"
  },
  "it": {
    "saveAsJson": "TODO",
    "exportToJsonResume": "TODO",
    "referToSchema": "TODO"
  }
}
</i18n>
