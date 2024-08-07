<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { storeToRefs } from "pinia";
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
import useDialog from "~/composables/use-dialog";

const { documentType } = storeToRefs(useEditorStore());
const { isThemeCustomized, template } = storeToRefs(useProfileStore());

const { settings: resumeSettings } = storeToRefs(useResumeStore());
const { isHeaderSimple, settings: letterSettings } =
  storeToRefs(useLetterStore());
const { settings: emailSettings } = storeToRefs(useEmailStore());

const { dialog, openDialog, closeDialog } = useDialog();

type Tab =
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

function resetStyle() {
  if (documentType.value === "email") {
    emailSettings.value = templateSettings[template.value].email;
  } else if (documentType.value === "letter") {
    letterSettings.value = templateSettings[template.value].letter;
  } else {
    resumeSettings.value = templateSettings[template.value].resume;
  }
  closeDialog();
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
  <!-- TODO close top-right -->
  <dialog ref="dialog" class="dialog max-w-screen-sm">
    <p class="mb-8 text-center text-2xl font-bold text-pink-500">
      Confirm style reset?
    </p>
    <div class="flex flex-col gap-4">
      <button class="button bg-white textGradient" @click="closeDialog">
        No
      </button>
      <button class="button bg-red-500 text-white" @click="resetStyle">
        Yes, reset
      </button>
    </div>
  </dialog>
  <div
    v-if="isStyleEditorOpen && tab"
    class="h-[260px] overflow-auto flex flex-col gap-5 bg-white p-6 rounded shadow-lg text-pink-500 mb-4"
  >
    <template v-if="tab === 'Document'">
      <div>
        <header>
          <div class="sectionHeading">Document</div>
        </header>
        <div class="flex flex-col gap-5">
          <div class="flex gap-5 flex-wrap">
            <Field
              v-for="i in 4"
              :key="i"
              :id="`documentMargin${i}`"
              type="number"
              :label="`Margin ${getSideIndexLabel(i)}`"
              :disabled="!isThemeCustomized"
              v-model="documentTypeSettings.document.padding[i - 1]"
            />
          </div>
          <label class="flex flex-col" for="documentBodyFont">
            <span class="label">Font</span>
            <select
              id="documentBodyFont"
              class="select block"
              :disabled="!isThemeCustomized"
              v-model="documentTypeSettings.document.bodyFont"
            >
              <option v-for="font in fonts" :key="font" class="option">
                {{ font }}
              </option>
            </select>
          </label>
        </div>
      </div>
    </template>
    <template v-else-if="tab === 'Signature'">
      <div>
        <header>
          <div class="sectionHeading">Signature</div>
        </header>
        <div class="flex flex-col gap-5">
          <label class="flex flex-col" for="headerLayout">
            <span class="label">Layout</span>
            <select
              id="headerLayout"
              class="select block"
              :disabled="!isThemeCustomized"
              v-model="(documentTypeSettings as EmailSettings).document.layout"
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
          <!-- <BlockSettingsEditor
            property-name="signature"
            :settings="emailSettings.document"
          /> -->
          <!-- TODO other settings -->
        </div>
      </div>
    </template>
    <template v-else-if="tab === 'Header'">
      <div>
        <header>
          <div class="sectionHeading">Header</div>
        </header>
        <div class="flex flex-col gap-5">
          <label class="flex flex-col" for="headerLayout">
            <span class="label">Layout</span>
            <select
              id="headerLayout"
              class="select block"
              :disabled="!isThemeCustomized"
              v-model="(documentTypeSettings as LetterSettings).header.layout"
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
            :settings="(documentTypeSettings as LetterSettings).header"
          />
        </div>
      </div>
    </template>
    <template v-else-if="tab === 'Address details'">
      <div v-if="isHeaderSimple" class="sectionSeparator">
        <header>
          <div class="sectionHeading">Sender details</div>
        </header>
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
      </div>
      <div>
        <header>
          <div class="sectionHeading">Recipient details</div>
        </header>
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
      </div>
    </template>
    <template v-else-if="tab === 'Subject'">
      <div class="sectionSeparator">
        <header>
          <div class="sectionHeading">Subject</div>
        </header>
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
      </div>
      <div>
        <header>
          <div class="sectionHeading">Reference</div>
        </header>
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
      </div>
    </template>
    <template v-else-if="tab === 'Body'">
      <div>
        <header>
          <div class="sectionHeading">Paragraphs</div>
        </header>
        <div class="flex flex-col gap-5">
          <div class="flex gap-5 flex-wrap">
            <Field
              id="bodyColor"
              type="color"
              label="Color"
              :disabled="!isThemeCustomized"
              v-model="letterSettings.body.color"
            />
            <Field
              id="bodyFontSize"
              label="Font size"
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
              label="Indentation"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="letterSettings.body.indentation"
            />
            <Field
              id="bodyIsJustified"
              label="Justified"
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
          <div class="flex gap-5 flex-wrap">
            <Field
              v-for="i in 4"
              :key="i"
              :id="`bodyMargin${i}`"
              :label="`Margin ${getSideIndexLabel(i)}`"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="letterSettings.body.margin[i - 1]"
            />
          </div>
        </div>
        <Field
          id="bodyGap"
          label="Gap"
          type="number"
          :disabled="!isThemeCustomized"
          v-model="letterSettings.body.gap"
        />
      </div>
    </template>
    <template v-else-if="tab === 'Profile'">
      <div class="sectionSeparator">
        <header>
          <div class="sectionHeading">Name</div>
        </header>
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
      </div>
      <div>
        <header>
          <div class="sectionHeading">Title</div>
        </header>
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
      </div>
    </template>
    <template v-else-if="tab === 'About'">
      <div class="sectionSeparator">
        <header>
          <div class="sectionHeading">About</div>
        </header>
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
      </div>
      <div>
        <header>
          <div class="sectionHeading">About quote</div>
        </header>
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
              <select
                id="aboutQuoteFont"
                class="select block"
                :disabled="!isThemeCustomized"
                v-model="documentTypeSettings.aboutQuote.font"
              >
                <option class="option" value="inherit">
                  default (inherit from document font)
                </option>
                <option v-for="font in fonts" :key="font" class="option">
                  {{ font }}
                </option>
              </select>
            </label>
            <Field
              id="aboutQuoteFontSize"
              label="Font size"
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
              label="Italic"
              type="checkbox"
              :disabled="!isThemeCustomized"
              v-model="documentTypeSettings.aboutQuote.isItalic"
            />
            <Field
              id="aboutQuoteColor"
              label="Color"
              type="color"
              :disabled="!isThemeCustomized"
              v-model="documentTypeSettings.aboutQuote.color"
            />
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="tab === 'Contact'">
      <div>
        <header>
          <div class="sectionHeading">Contact details</div>
        </header>
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
            <label class="flex flex-col" for="contactDetailsAlignment">
              <span class="label">Alignment</span>
              <select
                id="contactDetailsAlignment"
                class="select block"
                :disabled="!isThemeCustomized"
                v-model="documentTypeSettings.contactDetails.alignment"
              >
                <option class="option" value="start">start</option>
                <option class="option" value="center">center</option>
                <option class="option" value="end">end</option>
              </select>
            </label>
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
      </div>
    </template>
    <template v-else-if="tab === 'Sections'">
      <div class="sectionSeparator">
        <header>
          <div class="sectionHeading">Header</div>
        </header>
        <div class="flex flex-col gap-5">
          <label class="flex flex-col" for="headerLayout">
            <span class="label">Layout</span>
            <select
              id="headerLayout"
              class="select block"
              :disabled="!isThemeCustomized"
              v-model="
                (documentTypeSettings as ResumeSettings | LetterSettings).header
                  .layout
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
      </div>
      <div class="sectionSeparator">
        <header>
          <div class="sectionHeading">Aside</div>
        </header>
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
      </div>
      <div>
        <header>
          <div class="sectionHeading">Body</div>
        </header>
        <div class="flex flex-col gap-5">
          <BlockSettingsEditor
            property-name="body"
            :settings="resumeSettings.body"
          />
        </div>
      </div>
    </template>
    <template v-else-if="tab === 'Category'">
      <div class="sectionSeparator">
        <header>
          <div class="sectionHeading">Category</div>
        </header>
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
      </div>
      <div>
        <header>
          <div class="sectionHeading">Category name</div>
        </header>
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
      </div>
    </template>
    <template v-else-if="tab === 'Entry'">
      <div class="sectionSeparator">
        <header>
          <div class="sectionHeading">Entry</div>
        </header>
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
      </div>
      <div class="sectionSeparator">
        <header>
          <div class="sectionHeading">Entry title</div>
        </header>
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
      </div>
      <div class="sectionSeparator">
        <header>
          <div class="sectionHeading">Entry period</div>
        </header>
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
      </div>
      <div class="sectionSeparator">
        <header>
          <div class="sectionHeading">Entry organization</div>
        </header>
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
      </div>
      <div class="sectionSeparator">
        <header>
          <div class="sectionHeading">Entry location</div>
        </header>
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
      </div>
      <div class="sectionSeparator">
        <header>
          <div class="sectionHeading">Entry summary</div>
        </header>
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
      </div>
      <div class="sectionSeparator">
        <header>
          <div class="sectionHeading">Highlight</div>
        </header>
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
      </div>
      <div>
        <header>
          <div class="uppercase font-bold text-lg">Tag</div>
        </header>
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
      </div>
    </template>
  </div>
  <div class="flex flex-col gap-5 justify-between bg-transparent">
    <template v-if="isStyleEditorOpen">
      <nav class="flex items-center gap-2">
        <button
          class="button bg-white"
          v-for="(tab, index) in tabs"
          :key="index"
          @click="setTab(tab)"
        >
          <span class="textGradient">{{ tab }}</span>
        </button>
      </nav>
      <button class="button bg-white flex-1" @click="openDialog">
        <span class="textGradient">Reset style</span>
      </button>
    </template>
    <Field type="toggle" label="Customize" v-model="isStyleEditorOpen" />
    <Field
      type="toggle"
      label="Apply custom style"
      v-model="isThemeCustomized"
    />
  </div>
</template>
