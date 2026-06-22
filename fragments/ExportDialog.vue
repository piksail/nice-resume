<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
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
import type { StepperItem } from "@nuxt/ui";

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
      icon: "i-lucide-file-down",
      onSelect: () => exportToJson(),
    },
  ];

  if (documentType.value === "resume") {
    items.push({
      label: t("exportToJsonResume"),
      icon: "i-lucide-file-braces-corner",
      onSelect: () => exportResumeToJsonResume(),
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
  <UFieldGroup>
    <UButton
      icon="i-lucide-file-down"
      size="sm"
      :aria-label="capitalize($t('toDownload'))"
      @click="exportDocument"
    >
      {{ capitalize($t("toExport")) }}
    </UButton>
    <UDropdownMenu :items="exportItems" size="sm">
      <UButton
        color="neutral"
        variant="outline"
        icon="i-lucide-chevron-down"
        size="sm"
      />
    </UDropdownMenu>
  </UFieldGroup>

  <UModal
    v-model:open="isJsonResumeExportDialogOpen"
    modal
    class="max-w-screen-xl"
  >
    <template #body>
      <UAlert
        icon="i-lucide-info"
        title="JSON Resume"
        description="Double-check your data and fill in missing blank to match the JSON Resume schema."
        variant="subtle"
        :actions="[
          {
            href: jsonResumeSchemaUrl,
            target: '_blank',
            label: t('referToSchema'),
            class: 'underline',
          },
        ]"
        class="mb-5"
      />
      <div v-if="jsonResume" class="card flex justify-center">
        <UStepper
          :items="
            jsonResumeExportSteps.map((step) => ({
              slot: `${step}` as const,
              title: capitalize($t(step)),
              icon: 'i-lucide-user',
            })) satisfies StepperItem[]
          "
          class="w-full"
        >
          <template #profile>
            <div class="formBlock">
              <Field v-model="jsonResume.basics.email" :label="$t('email')" />
              <Field v-model="jsonResume.basics.phone" :label="$t('phone')" />
              <Field v-model="jsonResume.basics.url" label="URL" />
              <Field
                v-model="jsonResume.basics.location.address"
                :label="$t('address')"
              />
              <Field
                v-model="jsonResume.basics.location.postalCode"
                :label="$t('postalCode')"
              />
              <Field
                v-model="jsonResume.basics.location.city"
                :label="$t('city')"
              />
              <Field
                v-model="jsonResume.basics.location.countryCode"
                :label="$t('countryCode')"
              />
              <Field
                v-model="jsonResume.basics.location.region"
                :label="$t('region')"
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
                      v-model="
                        jsonResume.basics.profiles[profileIndex]!.network
                      "
                    />
                    <Field
                      v-model="
                        jsonResume.basics.profiles[profileIndex]!.username
                      "
                    />
                    <Field
                      v-model="jsonResume.basics.profiles[profileIndex]!.url"
                    />
                    <ListActions
                      :index="profileIndex"
                      :list-length="jsonResume.basics.profiles.length"
                      @move-up="
                        moveUp(jsonResume.basics.profiles, profileIndex)
                      "
                      @move-down="
                        moveDown(jsonResume.basics.profiles, profileIndex)
                      "
                      @remove="remove(jsonResume.basics.profiles, profileIndex)"
                    />
                  </li>
                </ul>
              </label>
            </div>
          </template>
          <template #work>
            <FormBlockRow
              v-for="(item, index) in jsonResume.work"
              :key="item.position"
              :header="`${item.position} | ${item.name}`"
            >
              <Field v-model="jsonResume.work[index]!.url" label="URL" />
            </FormBlockRow>
          </template>
          <template #volunteer>
            <div class="formBlock">
              <FormBlockRow
                v-for="(item, index) in jsonResume.volunteer"
                :key="item.position"
                :header="item.position"
              >
                <Field v-model="jsonResume.volunteer[index]!.url" label="URL" />
              </FormBlockRow>
            </div>
          </template>
          <template #education>
            <div class="formBlock">
              <FormBlockRow
                v-for="(item, index) in jsonResume.education"
                :key="item.area"
                :header="item.area"
              >
                <Field
                  v-model="jsonResume.education[index]!.startDate"
                  :label="$t('startDate')"
                />
                <Field
                  v-model="jsonResume.education[index]!.endDate"
                  :label="$t('endDate')"
                />
                <Field v-model="jsonResume.education[index]!.url" label="URL" />
                <Field
                  v-model="jsonResume.education[index]!.area"
                  :label="$t('area')"
                />
                <Field
                  v-model="jsonResume.education[index]!.studyType"
                  :label="$t('studyType')"
                />
                <Field
                  v-model="jsonResume.education[index]!.score"
                  :label="$t('score')"
                />
              </FormBlockRow>
            </div>
          </template>
          <template #awards>
            <div class="formBlock">
              <FormBlockRow
                v-for="(award, index) in jsonResume.awards"
                :key="award.title"
                :header="award.title"
              >
                <Field
                  v-model="jsonResume.awards[index]!.date"
                  :label="$t('date')"
                  help-text="Please type the date in the YYYY-MM-DD format"
                />
              </FormBlockRow>
            </div>
          </template>
          <template #certificates>
            <div class="formBlock">
              <FormBlockRow
                v-for="(certificate, index) in jsonResume.certificates"
                :key="certificate.name"
                :header="certificate.name"
              >
                <Field
                  v-model="jsonResume.certificates[index]!.date"
                  :label="$t('date')"
                  help-text="Please type the date in the YYYY-MM-DD format"
                />
                <Field
                  v-model="jsonResume.certificates[index]!.url"
                  label="URL"
                />
              </FormBlockRow>
            </div>
          </template>
          <template #publications>
            <div class="formBlock">
              <FormBlockRow
                v-for="(publication, index) in jsonResume.publications"
                :key="publication.name"
                :header="publication.name"
              >
                <Field
                  v-model="jsonResume.publications[index]!.releaseDate"
                  :label="$t('releaseDate')"
                  help-text="Please type the date in the YYYY-MM-DD format"
                />
                <Field
                  v-model="jsonResume.publications[index]!.url"
                  label="URL"
                />
              </FormBlockRow>
            </div>
          </template>
          <template #skills>
            <div class="formBlock">
              <FormBlockRow
                v-for="(skill, index) in jsonResume.skills"
                :key="skill.name"
                :header="skill.name"
              >
                <Field
                  v-model="jsonResume.skills[index]!.level"
                  :label="$t('level')"
                />
              </FormBlockRow>
            </div>
          </template>
          <template #languages>
            <div class="formBlock">
              <FormBlockRow
                v-for="(language, index) in jsonResume.languages"
                :key="language.language"
                :header="language.language"
              >
                <Field
                  v-model="jsonResume.languages[index]!.fluency"
                  :label="$t('fluency')"
                />
              </FormBlockRow>
            </div>
          </template>
          <template #interests>
            <div class="formBlock">
              <FormBlockRow
                v-for="(interest, index) in jsonResume.interests"
                :key="interest.name"
                :header="interest.name"
              >
                <Field
                  v-model="jsonResume.interests[index]!.keywords"
                  :label="$t('keywords')"
                />
              </FormBlockRow>
            </div>
          </template>
          <template #references>
            <div class="formBlock">
              <FormBlockRow
                v-for="(reference, index) in jsonResume.references"
                :id="`referenceList${index}`"
                :key="reference.name"
                :header="reference.name"
              >
                <Field
                  v-model="jsonResume.references[index]!.name"
                  :label="$t('name')"
                />
                <Field
                  v-model="jsonResume.references[index]!.reference"
                  :label="$t('reference')"
                />
                <ListActions
                  :index="index"
                  :list-length="jsonResume.references.length"
                  @move-up="moveUp(jsonResume.references, index)"
                  @move-down="moveDown(jsonResume.references, index)"
                  @remove="remove(jsonResume.references, index)"
                />
              </FormBlockRow>
              <UButton
                icon="i-lucide-plus"
                :label="capitalize(`${$t('toAdd')} ${$t('reference')}`)"
                variant="soft"
                size="sm"
                @click="
                  addReference(
                    jsonResume.references.length
                      ? jsonResume.references.length
                      : 0,
                  )
                "
              />
            </div>
          </template>
          <template #projects>
            <div class="formBlock">
              <FormBlockRow
                v-for="(project, index) in jsonResume.projects"
                :key="project.name"
                :header="project.name"
              >
                <Field
                  v-model="jsonResume.projects[index]!.startDate"
                  :label="$t('startDate')"
                  help-text="Please type the date in the YYYY-MM-DD format"
                />
                <Field
                  v-model="jsonResume.projects[index]!.endDate"
                  :label="$t('endDate')"
                  help-text="Please type the date in the YYYY-MM-DD format"
                />
                <Field v-model="jsonResume.projects[index]!.url" label="URL" />
                <Field
                  v-model="jsonResume.projects[index]!.highlights"
                  :label="$t('highlights')"
                />
              </FormBlockRow>
            </div>
            <!-- <div class="pt-6">
              <UButton
                :label="$t('previous')"
                severity="secondary"
                icon="i-lucide-arrow-left"
                @click="
                  activeStep =
                    jsonResumeExportSteps[
                      jsonResumeExportSteps.findIndex('projects') - 1
                    ]
                "
              />
              <UButton
                :label="$t('toSubmit')"
                icon="i-lucide-check"
                icon-pos="right"
                @click="download(jsonResume, 'nice-resume-to-json-resume')"
              />
            </div> -->
          </template>
          <UStepItem
            v-for="(step, stepIndex) in jsonResumeExportSteps"
            :key="`jsonResumeExportStep${stepIndex}`"
            :value="step"
          >
            <Step>{{ capitalize($t(step)) }}</Step>
            <StepPanel
              v-slot="{ activateCallback }"
              :value="jsonResumeExportSteps[stepIndex]"
            >
              <div v-if="stepIndex === 0" class="pt-6 flex justify-end">
                <UButton
                  :label="$t('toSubmit')"
                  icon="i-lucide-arrow-right"
                  icon-pos="right"
                  @click="
                    activateCallback(jsonResumeExportSteps[stepIndex + 1]!)
                  "
                />
              </div>
              <div
                v-else-if="stepIndex === jsonResumeExportSteps.length - 1"
                class="pt-6"
              >
                <UButton
                  :label="$t('previous')"
                  severity="secondary"
                  icon="i-lucide-arrow-left"
                  @click="
                    activateCallback(jsonResumeExportSteps[stepIndex - 1]!)
                  "
                />
                <UButton
                  :label="$t('toSubmit')"
                  icon="i-lucide-check"
                  icon-pos="right"
                  @click="download(jsonResume, 'nice-resume-to-json-resume')"
                />
              </div>
              <div v-else class="pt-6 flex justify-between">
                <UButton
                  :label="$t('previous')"
                  severity="secondary"
                  icon="i-lucide-arrow-left"
                  @click="
                    activateCallback(jsonResumeExportSteps[stepIndex - 1]!)
                  "
                />
                <UButton
                  :label="$t('next')"
                  icon="i-lucide-arrow-right"
                  icon-pos="right"
                  @click="
                    activateCallback(jsonResumeExportSteps[stepIndex + 1]!)
                  "
                />
              </div>
            </StepPanel>
          </UStepItem>
        </UStepper>
      </div>
    </template>
  </UModal>
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
