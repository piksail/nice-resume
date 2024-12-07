<!-- eslint-disable @typescript-eslint/ban-ts-comment TODO resolve TS error -->
<script setup lang="ts">
// @ts-nocheck
import { computed, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import Drawer from "primevue/drawer";
import Fieldset from "primevue/fieldset";
import Select from "primevue/select";
import { useConfirm } from "primevue/useconfirm";
import { useEditorStore } from "@/stores/editor";
import { useEmailStore } from "@/stores/email";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import type {
  CommonStyleEditorTab,
  EmailSettings,
  EmailStyleEditorTab,
  LetterSettings,
  LetterStyleEditorTab,
  ResumeSettings,
  ResumeStyleEditorTab,
} from "@/types";
import { getSideIndexLabel } from "@/utils/editor";
import {
  entryLayouts,
  fonts,
  headerLayouts,
  templateSettings,
} from "@/globals";
import BlockSettingsEditor from "@/components/BlockSettingsEditor.vue";
import EntryHeaderItemSettingsEditor from "@/components/EntryHeaderItemSettingsEditor.vue";
import Field from "@/components/Field.vue";
import ListSettingsEditor from "@/components/ListSettingsEditor.vue";
import TextSettingsEditor from "@/components/TextSettingsEditor.vue";
import TitleSettingsEditor from "@/components/TitleSettingsEditor.vue";

const { documentType } = storeToRefs(useEditorStore());
const { isThemeCustomized, template } = storeToRefs(useProfileStore());

const { settings: resumeSettings } = storeToRefs(useResumeStore());
const { isHeaderSimple, settings: letterSettings } =
  storeToRefs(useLetterStore());
const { settings: emailSettings } = storeToRefs(useEmailStore());

const confirm = useConfirm();

type Tab =
  | CommonStyleEditorTab
  | ResumeStyleEditorTab
  | LetterStyleEditorTab
  | EmailStyleEditorTab
  | "";
const tab = ref<Tab>("");
const isStyleEditorOpen = ref(false);

const documentTypeSettings = computed(() => {
  if (documentType.value === "email") return emailSettings.value;
  return documentType.value === "letter"
    ? letterSettings.value
    : resumeSettings.value;
});

// TODO ne plus raisonner en tabs, raisonner en document === email ou letter et direct dans le template v-if
const tabs = computed(() => {
  const tabs: CommonStyleEditorTab[] = [
    "Document",
    "Profile",
    "About",
    "Contact",
  ];
  const emailTabs: EmailStyleEditorTab[] = [...tabs, "Signature"];
  const letterTabs: LetterStyleEditorTab[] = [
    ...tabs,
    "Header",
    "Address details",
    "Subject",
    "Body",
  ];
  const resumeTabs: ResumeStyleEditorTab[] = [
    ...tabs,
    "Sections",
    "Category",
    "Entry",
  ];
  if (documentType.value === "email") return emailTabs;
  return documentType.value === "letter" ? letterTabs : resumeTabs;
});

function askBeforeResetStyle() {
  confirm.require({
    message: `Confirm style reset`,
    header: "Confirmation",
    rejectProps: {
      label: "No",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Yes, reset",
      severity: "danger",
    },
    accept: () => {
      if (documentType.value === "email") {
        emailSettings.value = templateSettings[template.value].email;
      } else if (documentType.value === "letter") {
        letterSettings.value = templateSettings[template.value].letter;
      } else {
        resumeSettings.value = templateSettings[template.value].resume;
      }
    },
    reject: () => {},
  });
}

function setTab(value: Tab) {
  if (tab.value === value) {
    tab.value = "";
  } else {
    tab.value = value;
  }
}

watch(documentType, () => {
  isStyleEditorOpen.value = false;
  setTab("");
});
</script>

<template>
  <Drawer
    v-model:visible="isStyleEditorOpen"
    header="Customize theme TODO locale"
    class="!w-[calc(100vw-210mm)]"
  >
    <section class="flex flex-col gap-12">
      <template v-if="tabs.includes('Document')">
        <Fieldset :legend="capitalize($t('document'))" toggleable>
          <div class="flex flex-col gap-5">
            <div>
              <div class="text-sm font-semibold">
                {{ capitalize($t("margin")) }}
              </div>
              <div class="grid grid-cols-4 gap-5">
                <Field
                  v-for="i in 4"
                  :key="i"
                  :id="`documentMargin${i}`"
                  type="number"
                  :label="$t(getSideIndexLabel(i))"
                  :disabled="!isThemeCustomized"
                  v-model="documentTypeSettings.document.padding[i - 1]"
                />
              </div>
            </div>

            <Field
              id="documentBodyFont"
              type="select"
              :label="$t('font')"
              v-model="documentTypeSettings.document.bodyFont"
              :options="fonts"
              :disabled="!isThemeCustomized"
            />
          </div>
        </Fieldset>
      </template>

      <template v-if="tabs.includes('Signature')">
        <Fieldset :legend="capitalize($t('signature'))" toggleable>
          <div class="flex flex-col gap-5">
            <label class="flex flex-col" for="headerLayout">
              <span class="label">Layout</span>
              <Select
                id="headerLayout todo wrong id"
                :disabled="!isThemeCustomized"
                v-model="
                  (documentTypeSettings as EmailSettings).document.layout
                "
                :options="headerLayouts"
              />
            </label>
            <!-- <BlockSettingsEditor
            property-name="signature"
            :settings="emailSettings.document"
          /> -->
            <!-- TODO other settings -->
          </div>
        </Fieldset>
      </template>

      <template v-if="tabs.includes('Header')">
        <Fieldset :legend="capitalize($t('header'))" toggleable>
          <div class="flex flex-col gap-5">
            <label class="flex flex-col" for="headerLayout">
              <span class="label">Layout</span>
              <Select
                id="headerLayout"
                :disabled="!isThemeCustomized"
                v-model="(documentTypeSettings as LetterSettings).header.layout"
                :options="headerLayouts"
              />
            </label>
            <BlockSettingsEditor
              property-name="header"
              :settings="(documentTypeSettings as LetterSettings).header"
            />
          </div>
        </Fieldset>
      </template>

      <template v-if="tabs.includes('Address details')">
        <Fieldset
          v-if="isHeaderSimple"
          :legend="capitalize($t('senderDetails'))"
          toggleable
        >
          <div class="flex flex-col gap-5">
            <BlockSettingsEditor
              property-name="senderDetails"
              :settings="letterSettings.senderDetails"
            />
            <TextSettingsEditor
              property-name="senderDetails"
              :settings="letterSettings.senderDetails"
            />
            <Field
              id="senderDetailsGap"
              label="Gap"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="letterSettings.senderDetails.gap"
            />
          </div>
        </Fieldset>

        <Fieldset :legend="capitalize($t('recipientDetails'))" toggleable>
          <div class="flex flex-col gap-5">
            <BlockSettingsEditor
              property-name="recipientDetails"
              :settings="letterSettings.recipientDetails"
            />
            <TextSettingsEditor
              property-name="recipientDetails"
              :settings="letterSettings.recipientDetails"
            />
            <Field
              id="recipientDetailsGap"
              label="Gap"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="letterSettings.recipientDetails.gap"
            />
          </div>
        </Fieldset>
      </template>

      <template v-if="tabs.includes('Subject')">
        <Fieldset :legend="capitalize($t('subject'))" toggleable>
          <div class="flex flex-col gap-5">
            <BlockSettingsEditor
              property-name="subject"
              :settings="letterSettings.subject"
            />
            <TextSettingsEditor
              property-name="subject"
              :settings="letterSettings.subject"
            />
            <TitleSettingsEditor
              property-name="subject"
              :settings="letterSettings.subject"
            />
          </div>
        </Fieldset>

        <Fieldset :legend="capitalize($t('reference'))" toggleable>
          <div class="flex flex-col gap-5">
            <BlockSettingsEditor
              property-name="reference"
              :settings="letterSettings.reference"
            />
            <TextSettingsEditor
              property-name="reference"
              :settings="letterSettings.reference"
            />
            <TitleSettingsEditor
              property-name="reference"
              :settings="letterSettings.reference"
            />
          </div>
        </Fieldset>
      </template>

      <template v-if="tabs.includes('Body')">
        <Fieldset :legend="capitalize($t('paragraphs'))" toggleable>
          <div class="flex flex-col gap-5">
            <div class="flex gap-5 flex-wrap">
              <Field
                id="bodyColor"
                type="color"
                :label="$t('color')"
                :disabled="!isThemeCustomized"
                v-model="letterSettings.body.color"
              />
              <Field
                id="bodyFontSize"
                :label="$t('size')"
                type="number"
                :disabled="!isThemeCustomized"
                v-model="letterSettings.body.fontSize"
              />
              <Field
                id="bodyLineHeight"
                label="Line height"
                type="number"
                :disabled="!isThemeCustomized"
                v-model="letterSettings.body.lineHeight"
                step="0.1"
              />
              <Field
                id="bodyIndentation"
                :label="$t('indentation')"
                type="number"
                :disabled="!isThemeCustomized"
                v-model="letterSettings.body.indentation"
              />
              <Field
                id="bodyIsJustified"
                :label="$t('justified')"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="letterSettings.body.isJustified"
              />
              <Field
                id="bodyIsSignatureRightAligned"
                label="Signature on the right"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="letterSettings.body.isSignatureRightAligned"
              />
            </div>
            <div>
              <div class="text-sm font-semibold">
                {{ capitalize($t("marge")) }}
              </div>
              <div class="flex gap-5 flex-wrap">
                <Field
                  v-for="i in 4"
                  :key="i"
                  :id="`bodyMargin${i}`"
                  :label="$t(getSideIndexLabel(i))"
                  type="number"
                  :disabled="!isThemeCustomized"
                  v-model="letterSettings.body.margin[i - 1]"
                />
              </div>
            </div>
          </div>
          <Field
            id="bodyGap"
            label="Gap"
            type="number"
            :disabled="!isThemeCustomized"
            v-model="letterSettings.body.gap"
          />
        </Fieldset>
      </template>

      <template v-if="tabs.includes('Profile')">
        <Fieldset :legend="capitalize($t('name'))" toggleable>
          <div class="flex flex-col gap-5">
            <BlockSettingsEditor
              property-name="name"
              :settings="documentTypeSettings.name"
            />
            <TextSettingsEditor
              property-name="name"
              :settings="documentTypeSettings.name"
            />
            <TitleSettingsEditor
              property-name="name"
              :settings="documentTypeSettings.name"
            />
          </div>
        </Fieldset>

        <Fieldset :legend="capitalize($t('title'))" toggleable>
          <div class="flex flex-col gap-5">
            <BlockSettingsEditor
              property-name="title"
              :settings="documentTypeSettings.title"
            />
            <TextSettingsEditor
              property-name="title"
              :settings="documentTypeSettings.title"
            />
            <TitleSettingsEditor
              property-name="title"
              :settings="documentTypeSettings.title"
            />
          </div>
        </Fieldset>
      </template>

      <template v-if="tabs.includes('About')">
        <Fieldset :legend="capitalize($t('about'))" toggleable>
          <div class="flex flex-col gap-5">
            <BlockSettingsEditor
              property-name="about"
              :settings="documentTypeSettings.about"
            />
            <TextSettingsEditor
              property-name="about"
              :settings="documentTypeSettings.about"
            />
            <TitleSettingsEditor
              property-name="about"
              :settings="documentTypeSettings.about"
            />
          </div>
        </Fieldset>

        <Fieldset legend="About quote" toggleable>
          <div class="flex flex-col gap-5">
            <Field
              id="aboutQuoteIsShown"
              label="Show quote"
              type="checkbox"
              :disabled="!isThemeCustomized"
              v-model="documentTypeSettings.aboutQuote.isShown"
            />
            <div class="flex gap-5 flex-wrap">
              <label class="flex flex-col" for="aboutQuoteFont">
                <span class="label">Font</span>
                <Select
                  id="aboutQuoteFont"
                  :disabled="!isThemeCustomized"
                  v-model="documentTypeSettings.aboutQuote.font"
                  :options="['inherit', ...fonts]"
                />
              </label>
              <Field
                id="aboutQuoteFontSize"
                :label="$t('size')"
                type="number"
                :disabled="!isThemeCustomized"
                v-model="documentTypeSettings.aboutQuote.fontSize"
              />
              <label class="flex flex-col" for="aboutQuoteFontWeight">
                <span class="label">Font weight</span>
                <select
                  id="aboutQuoteFontWeight"
                  v-model="documentTypeSettings.aboutQuote.fontWeight"
                  class="select block"
                  :disabled="!isThemeCustomized"
                >
                  <option v-for="i in 9" :key="i" class="option">
                    {{ `${i}00` }}
                  </option>
                </select>
              </label>
              <Field
                id="aboutQuoteIsItalic"
                :label="$t('italic')"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="documentTypeSettings.aboutQuote.isItalic"
              />
              <Field
                id="aboutQuoteColor"
                :label="$t('color')"
                type="color"
                :disabled="!isThemeCustomized"
                v-model="documentTypeSettings.aboutQuote.color"
              />
            </div>
          </div>
        </Fieldset>
      </template>

      <template v-if="tabs.includes('Contact')">
        <Fieldset :legend="capitalize($t('contactDetails'))" toggleable>
          <div class="flex flex-col gap-5">
            <BlockSettingsEditor
              property-name="contactDetails"
              :settings="documentTypeSettings.contactDetails"
            />
            <TextSettingsEditor
              property-name="contactDetails"
              :settings="documentTypeSettings.contactDetails"
            />
            <div class="flex gap-5 flew-wrap">
              <!-- TODO careful, on a des alignment en start/end et d'autres en left/right -->
              <Field
                id="contactDetailsAlignment"
                type="select"
                :label="$t('alignment')"
                v-model="documentTypeSettings.contactDetails.alignment"
                :options="['start', 'center', 'end']"
                :disabled="!isThemeCustomized"
              />
              <Field
                id="contactDetailsGap"
                label="Gap"
                type="number"
                :disabled="!isThemeCustomized"
                v-model="documentTypeSettings.contactDetails.gap"
              />
              <Field
                id="contactDetailsIsIconFirst"
                label="Icon first"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="documentTypeSettings.contactDetails.isIconFirst"
              />
              <Field
                id="contactDetailsIconGap"
                label="Icon gap"
                type="number"
                :disabled="!isThemeCustomized"
                v-model="documentTypeSettings.contactDetails.iconGap"
              />
              <Field
                id="contactDetailsIconSize"
                label="Icon size"
                type="number"
                :disabled="!isThemeCustomized"
                v-model="documentTypeSettings.contactDetails.iconSize"
              />
              <Field
                id="contactDetailsIconColor"
                label="Icon color"
                type="color"
                :disabled="!isThemeCustomized"
                v-model="documentTypeSettings.contactDetails.iconColor"
              />
            </div>
          </div>
        </Fieldset>
      </template>

      <template v-if="tabs.includes('Sections')">
        <Fieldset :legend="capitalize($t('header'))" toggleable>
          <div class="flex flex-col gap-5">
            <label class="flex flex-col" for="headerLayout">
              <span class="label">Layout</span>
              <select
                id="headerLayout"
                class="select block"
                :disabled="!isThemeCustomized"
                v-model="
                  (documentTypeSettings as ResumeSettings | LetterSettings)
                    .header.layout
                "
              >
                <option
                  v-for="layout in headerLayouts"
                  :key="layout"
                  class="option"
                  :value="layout"
                >
                  {{ layout }}
                </option>
              </select>
            </label>
            <BlockSettingsEditor
              property-name="header"
              :settings="resumeSettings.header"
            />
          </div>
        </Fieldset>

        <Fieldset :legend="capitalize($t('aside'))" toggleable>
          <div class="flex flex-col gap-5">
            <BlockSettingsEditor
              property-name="aside"
              :settings="resumeSettings.aside"
            />
            <div class="flex gap-5 flex-wrap">
              <label for="asideWith">
                <span class="label">Width</span>
                <div class="flex gap-2 items-center">
                  <input
                    id="asideWith"
                    type="range"
                    min="0"
                    max="100"
                    v-model="resumeSettings.aside.width"
                  />
                  <output class="w-[3rem]">
                    {{ resumeSettings.aside.width }}%
                  </output>
                </div>
              </label>
              <Field
                id="asideIsRightPositioned"
                label="Right side"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="resumeSettings.aside.isRightPositioned"
              />
            </div>
          </div>
        </Fieldset>

        <Fieldset :legend="capitalize($t('body'))" toggleable>
          <div class="flex flex-col gap-5">
            <BlockSettingsEditor
              property-name="body"
              :settings="resumeSettings.body"
            />
          </div>
        </Fieldset>
      </template>

      <template v-if="tabs.includes('Category')">
        <Fieldset :legend="capitalize($t('category'))" toggleable>
          <div class="flex flex-col gap-5">
            <Field
              id="categoryGap"
              label="Gap"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="resumeSettings.category.gap"
            />
            <BlockSettingsEditor
              property-name="category"
              :settings="resumeSettings.category"
            />
          </div>
        </Fieldset>

        <Fieldset :legend="capitalize($t('categoryName'))" toggleable>
          <div class="flex flex-col gap-5">
            <BlockSettingsEditor
              property-name="categoryName"
              :settings="resumeSettings.categoryName"
            />
            <TextSettingsEditor
              property-name="categoryName"
              :settings="resumeSettings.categoryName"
            />
            <TitleSettingsEditor
              property-name="categoryName"
              :settings="resumeSettings.categoryName"
            />
          </div>
        </Fieldset>
      </template>

      <template v-if="tabs.includes('Entry')">
        <Fieldset :legend="capitalize($t('entry'))" toggleable>
          <div class="flex flex-col gap-5">
            <label class="flex flex-col" for="entryLayout">
              <span class="label">Layout</span>
              <select
                id="entryLayout"
                class="select block"
                :disabled="!isThemeCustomized"
                v-model="resumeSettings.entry.layout"
              >
                <option
                  v-for="layout in entryLayouts"
                  :key="layout"
                  class="option"
                  :value="layout"
                >
                  {{ layout }}
                </option>
              </select>
            </label>
            <Field
              id="entryGap"
              label="Gap"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="resumeSettings.entry.gap"
            />
          </div>
        </Fieldset>

        <Fieldset :legend="capitalize($t('entryTitle'))" toggleable>
          <div class="flex flex-col gap-5">
            <TextSettingsEditor
              property-name="entryTitle"
              :settings="resumeSettings.entryTitle"
            />
            <EntryHeaderItemSettingsEditor
              property-name="entryTitle"
              :settings="resumeSettings.entryTitle"
            />
          </div>
        </Fieldset>

        <Fieldset :legend="capitalize($t('entryPeriod'))" toggleable>
          <div class="flex flex-col gap-5">
            <TextSettingsEditor
              property-name="entryPeriod"
              :settings="resumeSettings.entryPeriod"
            />
            <EntryHeaderItemSettingsEditor
              property-name="entryPeriod"
              :settings="resumeSettings.entryPeriod"
            />
          </div>
        </Fieldset>

        <Fieldset :legend="capitalize($t('entryOrganization'))" toggleable>
          <div class="flex flex-col gap-5">
            <TextSettingsEditor
              property-name="entryOrganization"
              :settings="resumeSettings.entryOrganization"
            />
            <EntryHeaderItemSettingsEditor
              property-name="entryOrganization"
              :settings="resumeSettings.entryOrganization"
            />
          </div>
        </Fieldset>

        <Fieldset :legend="capitalize($t('entryLocation'))" toggleable>
          <div class="flex flex-col gap-5">
            <TextSettingsEditor
              property-name="entryLocation"
              :settings="resumeSettings.entryLocation"
            />
            <EntryHeaderItemSettingsEditor
              property-name="entryLocation"
              :settings="resumeSettings.entryLocation"
            />
          </div>
        </Fieldset>

        <Fieldset :legend="capitalize($t('entrySummary'))" toggleable>
          <div class="flex flex-col gap-5">
            <BlockSettingsEditor
              property-name="entrySummary"
              :settings="resumeSettings.entrySummary"
            />
            <TextSettingsEditor
              property-name="entrySummary"
              :settings="resumeSettings.entrySummary"
            />
          </div>
        </Fieldset>

        <Fieldset :legend="capitalize($t('entryHighlight'))" toggleable>
          <div class="flex flex-col gap-5">
            <BlockSettingsEditor
              property-name="entryHighlight"
              :settings="resumeSettings.entryHighlight"
            />
            <TextSettingsEditor
              property-name="entryHighlight"
              :settings="resumeSettings.entryHighlight"
            />
            <ListSettingsEditor
              property-name="entryHighlight"
              :settings="resumeSettings.entryHighlight"
            />
          </div>
        </Fieldset>

        <Fieldset :legend="capitalize($t('entryTag'))" toggleable>
          <div class="flex flex-col gap-5">
            <BlockSettingsEditor
              property-name="entryTag"
              :settings="resumeSettings.entryTag"
            />
            <TextSettingsEditor
              property-name="entryTag"
              :settings="resumeSettings.entryTag"
            />
            <Field
              id="entryTagGap"
              label="Gap"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="resumeSettings.entryTag.gap"
            />
          </div>
        </Fieldset>
      </template>
    </section>
    <template #footer>
      <Button
        :label="capitalize($t('reset'))"
        icon="pi pi-eraser"
        class="flex-auto"
        outlined
        severity="danger"
        @click="askBeforeResetStyle"
      ></Button>
    </template>
  </Drawer>

  <Button
    icon="pi pi-sliders-v"
    size="small"
    :disabled="!isThemeCustomized"
    @click="isStyleEditorOpen = true"
  />
  <Field type="togglebutton" v-model="isThemeCustomized" />
</template>
