<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { getSideIndexLabel } from "@/utils/editor";
import { fonts, templateSettings } from "@/globals";
import BlockSettingsEditor from "@/components/BlockSettingsEditor.vue";
import Field from "@/components/Field.vue";
import ListSettingsEditor from "@/components/ListSettingsEditor.vue";
import TextSettingsEditor from "@/components/TextSettingsEditor.vue";
import TitleSettingsEditor from "@/components/TitleSettingsEditor.vue";

const { documentType } = storeToRefs(useEditorStore());
const { isThemeCustomized, template } = storeToRefs(useProfileStore());

const { settings: resumeSettings } = storeToRefs(useResumeStore());
const { isHeaderSimple, settings: letterSettings } =
  storeToRefs(useLetterStore());

const currentTab = ref("");
const isStyleEditorOpen = ref(false);

const tabs = computed(() => {
  const tabs = ["Document", "Details", "About"];
  const letterTabs = [...tabs, "Address details", "Subject", "Body"];
  const resumeTabs = [...tabs, "Sections", "Category", "Entry"];
  return documentType.value === "letter" ? letterTabs : resumeTabs;
});

function resetStyle() {
  if (documentType.value === "letter") {
    letterSettings.value = templateSettings[template.value].letter;
  } else {
    resumeSettings.value = templateSettings[template.value].resume;
  }
}

function setCurrentTab(value: string) {
  if (currentTab.value === value) {
    currentTab.value = "";
  } else {
    currentTab.value = value;
  }
}
</script>

<template>
  <div
    v-if="isStyleEditorOpen && currentTab"
    class="h-[260px] overflow-auto flex flex-col gap-5 bg-white p-6 rounded shadow-lg text-blue-500 mb-4"
  >
    <template v-if="currentTab === 'Document'">
      <header>
        <div class="sectionHeading">Document</div>
      </header>
      <div class="flex gap-5 flex-wrap">
        <Field
          v-for="i in 4"
          :key="i"
          :id="`documentMargin${i}`"
          type="number"
          :label="`Margin ${getSideIndexLabel(i)}`"
          :disabled="!isThemeCustomized"
          v-model="resumeSettings.document.padding[i - 1]"
        />
      </div>
      <label class="flex flex-col" for="documentBodyFont">
        <span class="label">Font</span>
        <select
          id="documentBodyFont"
          class="select block"
          :disabled="!isThemeCustomized"
          v-model="resumeSettings.document.bodyFont"
        >
          <option v-for="font in fonts" :key="font" class="option">
            {{ font }}
          </option>
        </select>
      </label>
    </template>
    <template v-else-if="currentTab === 'Address details'">
      <div v-if="isHeaderSimple" class="sectionSeparator">
        <header>
          <div class="sectionHeading">Sender details</div>
        </header>
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
      <div class="sectionSeparator">
        <header>
          <div class="sectionHeading">Recipient details</div>
        </header>
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
    </template>
    <template v-else-if="currentTab === 'Subject'">
      <div class="sectionSeparator">
        <header>
          <div class="sectionHeading">Subject</div>
        </header>
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
      <div class="sectionSeparator">
        <header>
          <div class="sectionHeading">Reference</div>
        </header>
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
    </template>
    <template v-else-if="currentTab === 'Body'">
      <div class="sectionSeparator">
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
            <label for="bodyIsJustified">
              <input
                id="bodyIsJustified"
                class="input"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="letterSettings.body.isJustified"
              />
              <span class="label">Justified</span>
            </label>
            <label for="bodyIsSignatureRightAligned">
              <input
                id="bodyIsSignatureRightAligned"
                class="input"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="letterSettings.body.isSignatureRightAligned"
              />
              <span class="label">Signature on the right</span>
            </label>
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
    <template v-else-if="currentTab === 'Details'">
      <div class="sectionSeparator">
        <header>
          <div class="sectionHeading">Name</div>
        </header>
        <BlockSettingsEditor
          property-name="name"
          :settings="resumeSettings.name"
        />
        <TextSettingsEditor
          property-name="name"
          :settings="resumeSettings.name"
        />
        <TitleSettingsEditor
          property-name="name"
          :settings="resumeSettings.name"
        />
      </div>
      <div class="sectionSeparator">
        <header>
          <div class="sectionHeading">Title</div>
        </header>
        <BlockSettingsEditor
          property-name="title"
          :settings="resumeSettings.title"
        />
        <TextSettingsEditor
          property-name="title"
          :settings="resumeSettings.title"
        />
        <TitleSettingsEditor
          property-name="title"
          :settings="resumeSettings.title"
        />
      </div>
    </template>
    <template v-else-if="currentTab === 'About'">
      <div class="sectionSeparator">
        <header>
          <div class="sectionHeading">About</div>
        </header>
        <BlockSettingsEditor
          property-name="about"
          :settings="resumeSettings.about"
        />
        <TextSettingsEditor
          property-name="about"
          :settings="resumeSettings.about"
        />
        <TitleSettingsEditor
          property-name="about"
          :settings="resumeSettings.about"
        />
      </div>
      <div class="sectionSeparator">
        <header>
          <div class="sectionHeading">About quote</div>
        </header>
        <label for="aboutQuoteIsShown">
          <input
            id="aboutQuoteIsShown"
            class="input"
            type="checkbox"
            :disabled="!isThemeCustomized"
            v-model="resumeSettings.aboutQuote.isShown"
          />
          <span class="label">Is shown</span>
        </label>
        <div class="flex gap-5 flex-wrap">
          <label class="flex flex-col" for="aboutQuoteFont">
            <span class="label">Font</span>
            <select
              id="aboutQuoteFont"
              class="select block"
              :disabled="!isThemeCustomized"
              v-model="resumeSettings.aboutQuote.font"
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
            v-model="resumeSettings.aboutQuote.fontSize"
          />
          <label class="flex flex-col" for="aboutQuoteFontWeight">
            <span class="label">Font weight</span>
            <select
              id="aboutQuoteFontWeight"
              v-model="resumeSettings.aboutQuote.fontWeight"
              class="select block"
              :disabled="!isThemeCustomized"
            >
              <option v-for="i in 9" :key="i" class="option">
                {{ `${i}00` }}
              </option>
            </select>
          </label>
          <label for="aboutQuoteIsItalic">
            <input
              id="aboutQuoteIsItalic"
              class="input"
              type="checkbox"
              :disabled="!isThemeCustomized"
              v-model="resumeSettings.aboutQuote.isItalic"
            />
            <span class="label">Italic</span>
          </label>
          <Field
            id="aboutQuoteColor"
            label="Color"
            type="color"
            :disabled="!isThemeCustomized"
            v-model="resumeSettings.aboutQuote.color"
          />
        </div>
      </div>
      <div class="sectionSeparator">
        <header>
          <div class="sectionHeading">Contact details</div>
        </header>
        <BlockSettingsEditor
          property-name="contactDetails"
          :settings="resumeSettings.contactDetails"
        />
        <TextSettingsEditor
          property-name="contactDetails"
          :settings="resumeSettings.contactDetails"
        />
        <div class="flex gap-5 flew-wrap">
          <label class="flex flex-col" for="contactDetailsAlignment">
            <span class="label">Alignment</span>
            <select
              id="contactDetailsAlignment"
              class="select block"
              :disabled="!isThemeCustomized"
              v-model="resumeSettings.contactDetails.alignment"
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
            v-model="resumeSettings.contactDetails.gap"
          />
          <label for="contactDetailsIsIconFirst">
            <input
              id="contactDetailsIsIconFirst"
              class="input"
              type="checkbox"
              :disabled="!isThemeCustomized"
              v-model="resumeSettings.aboutQuote.isShown"
            />
            <span class="label">Is icon first</span>
          </label>
          <Field
            id="contactDetailsIconGap"
            label="Icon gap"
            type="number"
            :disabled="!isThemeCustomized"
            v-model="resumeSettings.contactDetails.iconGap"
          />
          <Field
            id="contactDetailsIconColor"
            label="Icon color"
            type="color"
            :disabled="!isThemeCustomized"
            v-model="resumeSettings.contactDetails.iconColor"
          />
        </div>
      </div>
    </template>
    <template v-else-if="currentTab === 'Sections'">
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
            <label for="asideIsRightPositioned">
              <input
                id="asideIsRightPositioned"
                class="input"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="resumeSettings.aside.isRightPositioned"
              />
              <span class="label">Right side</span>
            </label>
          </div>
        </div>
      </div>
      <div class="sectionSeparator">
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
    <template v-else-if="currentTab === 'Category'">
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
      <div class="sectionSeparator">
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
    <template v-else-if="currentTab === 'Entry'">
      <div class="sectionSeparator">
        <header>
          <div class="sectionHeading">Entry</div>
        </header>
        <div class="flex flex-col gap-5">
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
          @click="setCurrentTab(tab)"
        >
          <span class="textGradient">{{ tab }}</span>
        </button>
      </nav>
      <div class="flex gap-5">
        <Field
          type="toggle"
          label="Apply custom style"
          v-model="isThemeCustomized"
        />
        <button class="button bg-white flex-1" @click="resetStyle">
          <span class="textGradient">Reset style</span>
        </button>
      </div>
    </template>
    <Field type="toggle" label="Customize" v-model="isStyleEditorOpen" />
  </div>
</template>
