<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import {
  EyeIcon,
  EyeSlashIcon,
  PlusCircleIcon,
} from "@heroicons/vue/24/outline";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { moveDown, moveUp, remove } from "@/utils/array";
import {
  focusNextInput,
  getEntryTitleLabel,
  getExperienceOrganizationLabel,
} from "@/utils/editor";
import type { Asset, Category, Entry, Experience } from "@/types";
import {
  assetTypes,
  categoryTypes,
  categoryLayouts,
  experienceTypes,
  fixedLayoutTemplates,
  fonts,
  listMarkers,
} from "@/globals";
import Button from "@/components/Button.vue";
import EditorCategory from "@/components/EditorCategory.vue";
import ListActions from "@/components/ListActions.vue";

const { isThemeCustomized, template } = storeToRefs(useProfileStore());

const { categories, settings } = storeToRefs(useResumeStore());

const types = ref<Category["type"][]>(categoryTypes);
const layouts = ref<Category["layout"][]>(categoryLayouts);

function addCategory() {
  const category: Category = {
    nature: "experience",
    type: "work",
    name: "Name",
    entries: [],
    layout: "full",
    isVisible: true,
  };

  categories.value.push(category);

  // Add an entry to anticipate user need
  addEntry(category);
}

function addEntry(category: Category) {
  if (category.nature === "asset") {
    const asset: Asset = {
      nature: "asset",
      type: assetTypes.find((type) => category.type === type) || "skill",
      title: "",
      highlights: [],
      tags: [],
    };

    category.entries.push(asset);
  } else {
    const experience: Experience = {
      nature: "experience",
      type: experienceTypes.find((type) => category.type === type) || "work",
      title: "",
      organization: "",
      period: "",
      location: "",
      summary: "",
      highlights: [],
      tags: [],
    };

    category.entries.push(experience);
  }
}

function addHighlight(entry: Entry, entryIndex: number) {
  entry.highlights.push("");

  focusNextInput(`#highlightList${entryIndex} input`);
}

function addTag(entry: Entry, entryIndex: number) {
  entry.tags.push("");

  focusNextInput(`#tagList${entryIndex} input`);
}

function changeCategoryType(category: Category, value: Category["type"]) {
  category.type = value;
  category.nature = (assetTypes as string[]).includes(value)
    ? "asset"
    : "experience";
  category.entries = []; // Prevent inconsistency between previous and new entry types
}

function changeCategoryLayout(category: Category, value: Category["layout"]) {
  category.layout = value;
}

function toggleCategoryVisibility(category: Category) {
  category.isVisible = !category.isVisible;
}
</script>

<template>
  <EditorCategory
    class="w-full"
    v-for="(category, categoryIndex) in categories"
    :key="categoryIndex"
    :id="category.name"
    :is-customizing="isThemeCustomized"
    :is-hidden="!category.isVisible"
  >
    <template v-slot:header>
      <template v-if="category.isVisible">
        <div class="flex items-baseline gap-8">
          <label for="name">
            Category name
            <input
              id="name"
              class="input text-blue-500 block bg-blue-700 bg-opacity-5"
              v-model="category.name"
            />
          </label>
          <label for="type">
            Type
            <select
              id="type"
              :value="category.type"
              @change="
                changeCategoryType(
                  category,
                  ($event.target as HTMLInputElement).value as Category['type'],
                )
              "
              class="select block capitalize px-2 py-1 pl-0"
            >
              <option v-for="item in types" :key="item" class="option">
                {{ item }}
              </option>
            </select>
          </label>
          <label for="layout">
            Layout
            <select
              id="layout"
              :disabled="fixedLayoutTemplates.includes(template)"
              :value="category.layout"
              @change="
                changeCategoryLayout(
                  category,
                  ($event.target as HTMLInputElement)
                    .value as Category['layout'],
                )
              "
              class="select block capitalize px-2 py-1 pl-0 disabled:cursor-not-allowed"
            >
              <option v-for="item in layouts" :key="item" class="option">
                {{ item }}
              </option>
            </select>
          </label>
        </div>
        <ListActions
          :index="categoryIndex"
          :list-length="categories.length"
          @moveUp="moveUp(categories, categoryIndex)"
          @moveDown="moveDown(categories, categoryIndex)"
          @remove="remove(categories, categoryIndex)"
        />
      </template>
      <template v-else>
        <span class="text-white">{{ category.name }}</span>
      </template>
      <button
        id="toggleVisibility"
        title="Toggle category visibility"
        :class="`${category.isVisible ? 'text-pink-500' : 'text-white'} size-7 rounded-full p-1 hover:bg-blue-700 hover:bg-opacity-5`"
        @click="toggleCategoryVisibility(category)"
      >
        <EyeSlashIcon v-if="category.isVisible" class="size-full" />
        <EyeIcon v-else class="size-full" />
      </button>
    </template>
    <template v-slot:style>
      <ul class="flex flex-col gap-10 mb-4">
        <li class="border-b-2 border-white border-opacity-5 pb-12">
          <header>
            <div class="uppercase font-bold text-lg mb-5">Category name</div>
          </header>
          <div class="flex gap-5 flex-wrap">
            <Field
              id="categoryNameColor"
              type="color"
              label="Color"
              :disabled="!isThemeCustomized"
              v-model="settings.categoryName.color"
            />
            <label class="flex flex-col" for="categoryNameFont">
              <span class="opacity-60">Font</span>
              <select
                id="categoryNameFont"
                class="select block"
                :disabled="!isThemeCustomized"
                v-model="settings.categoryName.font"
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
              id="categoryNameFontSize"
              label="Font size"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.categoryName.fontSize"
            />
            <Field
              id="categoryNameLineHeight"
              label="Line height"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.categoryName.lineHeight"
              step="0.1"
            />
          </div>
          <div class="flex gap-5 flex-wrap">
            <label class="flex flex-col" for="categoryNameFontWeight">
              <span class="opacity-60">Font weight</span>
              <select
                id="categoryNameFontWeight"
                v-model="settings.categoryName.fontWeight"
                class="select block"
              >
                <option v-for="i in 9" :key="i" class="option">
                  {{ `${i}00` }}
                </option>
              </select>
            </label>
            <label for="categoryNameIsItalic">
              <input
                id="categoryNameIsItalic"
                class="input"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="settings.categoryName.isItalic"
              />
              <span class="opacity-60">Italic</span>
            </label>
            <label for="categoryNameIsUppercase">
              <input
                id="categoryNameIsUppercase"
                class="input"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="settings.categoryName.isUppercase"
              />
              <span class="opacity-60">Uppercase</span>
            </label>
          </div>
        </li>
        <li class="border-b-2 border-white border-opacity-5 pb-12">
          <header>
            <div class="uppercase font-bold text-lg mb-5">Entry title</div>
          </header>
          <div class="flex gap-5 flex-wrap">
            <Field
              id="entryTitleColor"
              type="color"
              label="Color"
              :disabled="!isThemeCustomized"
              v-model="settings.entryTitle.color"
            />
            <label class="flex flex-col" for="entryTitleFont">
              <span class="opacity-60">Font</span>
              <select
                id="entryTitleFont"
                class="select block"
                :disabled="!isThemeCustomized"
                v-model="settings.entryTitle.font"
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
              id="entryTitleFontSize"
              label="Font size"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.entryTitle.fontSize"
            />
            <Field
              id="entryTitleLineHeight"
              label="Line height"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.entryTitle.lineHeight"
              step="0.1"
            />
          </div>
          <div class="flex gap-5 flex-wrap">
            <label class="flex flex-col" for="entryTitleFontWeight">
              <span class="opacity-60">Font weight</span>
              <select
                id="entryTitleFontWeight"
                v-model="settings.entryTitle.fontWeight"
                class="select block"
              >
                <option v-for="i in 9" :key="i" class="option">
                  {{ `${i}00` }}
                </option>
              </select>
            </label>
            <label for="entryTitleIsItalic">
              <input
                id="entryTitleIsItalic"
                class="input"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="settings.entryTitle.isItalic"
              />
              <span class="opacity-60">Italic</span>
            </label>
            <label for="entryTitleIsUppercase">
              <input
                id="entryTitleIsUppercase"
                class="input"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="settings.entryTitle.isUppercase"
              />
              <span class="opacity-60">Uppercase</span>
            </label>
          </div>
        </li>
        <li class="border-b-2 border-white border-opacity-5 pb-12">
          <header>
            <div class="uppercase font-bold text-lg mb-5">Entry period</div>
          </header>
          <div class="flex gap-5 flex-wrap">
            <Field
              id="entryPeriodColor"
              type="color"
              label="Color"
              :disabled="!isThemeCustomized"
              v-model="settings.entryPeriod.color"
            />
            <label class="flex flex-col" for="entryPeriodFont">
              <span class="opacity-60">Font</span>
              <select
                id="entryPeriodFont"
                class="select block"
                :disabled="!isThemeCustomized"
                v-model="settings.entryPeriod.font"
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
              id="entryPeriodFontSize"
              label="Font size"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.entryPeriod.fontSize"
            />
            <Field
              id="entryPeriodLineHeight"
              label="Line height"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.entryPeriod.lineHeight"
              step="0.1"
            />
          </div>
          <div class="flex gap-5 flex-wrap">
            <label class="flex flex-col" for="entryPeriodFontWeight">
              <span class="opacity-60">Font weight</span>
              <select
                id="entryPeriodFontWeight"
                v-model="settings.entryPeriod.fontWeight"
                class="select block"
              >
                <option v-for="i in 9" :key="i" class="option">
                  {{ `${i}00` }}
                </option>
              </select>
            </label>
            <label for="entryPeriodIsItalic">
              <input
                id="entryPeriodIsItalic"
                class="input"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="settings.entryPeriod.isItalic"
              />
              <span class="opacity-60">Italic</span>
            </label>
            <label for="entryPeriodIsUppercase">
              <input
                id="entryPeriodIsUppercase"
                class="input"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="settings.entryPeriod.isUppercase"
              />
              <span class="opacity-60">Uppercase</span>
            </label>
          </div>
        </li>
        <li class="border-b-2 border-white border-opacity-5 pb-12">
          <header>
            <div class="uppercase font-bold text-lg mb-5">
              Entry organization
            </div>
          </header>
          <div class="flex gap-5 flex-wrap">
            <Field
              id="entryOrganizationColor"
              type="color"
              label="Color"
              :disabled="!isThemeCustomized"
              v-model="settings.entryOrganization.color"
            />
            <label class="flex flex-col" for="entryOrganizationFont">
              <span class="opacity-60">Font</span>
              <select
                id="entryOrganizationFont"
                class="select block"
                :disabled="!isThemeCustomized"
                v-model="settings.entryOrganization.font"
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
              id="entryOrganizationFontSize"
              label="Font size"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.entryOrganization.fontSize"
            />
            <Field
              id="entryOrganizationLineHeight"
              label="Line height"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.entryOrganization.lineHeight"
              step="0.1"
            />
          </div>
          <div class="flex gap-5 flex-wrap">
            <label class="flex flex-col" for="entryOrganizationFontWeight">
              <span class="opacity-60">Font weight</span>
              <select
                id="entryOrganizationFontWeight"
                v-model="settings.entryOrganization.fontWeight"
                class="select block"
              >
                <option v-for="i in 9" :key="i" class="option">
                  {{ `${i}00` }}
                </option>
              </select>
            </label>
            <label for="entryOrganizationIsItalic">
              <input
                id="entryOrganizationIsItalic"
                class="input"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="settings.entryOrganization.isItalic"
              />
              <span class="opacity-60">Italic</span>
            </label>
            <label for="entryOrganizationIsUppercase">
              <input
                id="entryOrganizationIsUppercase"
                class="input"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="settings.entryOrganization.isUppercase"
              />
              <span class="opacity-60">Uppercase</span>
            </label>
          </div>
        </li>
        <li class="border-b-2 border-white border-opacity-5 pb-12">
          <header>
            <div class="uppercase font-bold text-lg mb-5">Entry location</div>
          </header>
          <div class="flex gap-5 flex-wrap">
            <Field
              id="entryLocationColor"
              type="color"
              label="Color"
              :disabled="!isThemeCustomized"
              v-model="settings.entryLocation.color"
            />
            <label class="flex flex-col" for="entryLocationFont">
              <span class="opacity-60">Font</span>
              <select
                id="entryLocationFont"
                class="select block"
                :disabled="!isThemeCustomized"
                v-model="settings.entryLocation.font"
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
              id="entryLocationFontSize"
              label="Font size"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.entryLocation.fontSize"
            />
            <Field
              id="entryLocationLineHeight"
              label="Line height"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.entryLocation.lineHeight"
              step="0.1"
            />
          </div>
          <div class="flex gap-5 flex-wrap">
            <label class="flex flex-col" for="entryLocationFontWeight">
              <span class="opacity-60">Font weight</span>
              <select
                id="entryLocationFontWeight"
                v-model="settings.entryLocation.fontWeight"
                class="select block"
              >
                <option v-for="i in 9" :key="i" class="option">
                  {{ `${i}00` }}
                </option>
              </select>
            </label>
            <label for="entryLocationIsItalic">
              <input
                id="entryLocationIsItalic"
                class="input"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="settings.entryLocation.isItalic"
              />
              <span class="opacity-60">Italic</span>
            </label>
            <label for="entryLocationIsUppercase">
              <input
                id="entryLocationIsUppercase"
                class="input"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="settings.entryLocation.isUppercase"
              />
              <span class="opacity-60">Uppercase</span>
            </label>
          </div>
        </li>
        <li class="border-b-2 border-white border-opacity-5 pb-12">
          <header>
            <div class="uppercase font-bold text-lg mb-5">Entry summary</div>
          </header>
          <div class="flex gap-5 flex-wrap">
            <Field
              id="entrySummaryColor"
              type="color"
              label="Color"
              :disabled="!isThemeCustomized"
              v-model="settings.entrySummary.color"
            />
            <label class="flex flex-col" for="entrySummaryFont">
              <span class="opacity-60">Font</span>
              <select
                id="entrySummaryFont"
                class="select block"
                :disabled="!isThemeCustomized"
                v-model="settings.entrySummary.font"
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
              id="entrySummaryFontSize"
              label="Font size"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.entrySummary.fontSize"
            />
            <Field
              id="entrySummaryLineHeight"
              label="Line height"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.entrySummary.lineHeight"
              step="0.1"
            />
          </div>
          <div class="flex gap-5 flex-wrap">
            <label class="flex flex-col" for="entrySummaryFontWeight">
              <span class="opacity-60">Font weight</span>
              <select
                id="entrySummaryFontWeight"
                v-model="settings.entrySummary.fontWeight"
                class="select block"
              >
                <option v-for="i in 9" :key="i" class="option">
                  {{ `${i}00` }}
                </option>
              </select>
            </label>
            <label for="entrySummaryIsItalic">
              <input
                id="entrySummaryIsItalic"
                class="input"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="settings.entrySummary.isItalic"
              />
              <span class="opacity-60">Italic</span>
            </label>
            <label for="entrySummaryIsUppercase">
              <input
                id="entrySummaryIsUppercase"
                class="input"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="settings.entrySummary.isUppercase"
              />
              <span class="opacity-60">Uppercase</span>
            </label>
          </div>
        </li>
        <li>
          <header>
            <div class="uppercase font-bold text-lg mb-5">Highlight</div>
          </header>
          <div class="flex gap-5 flex-wrap">
            <label for="entryHighlightListMarker">
              <span class="opacity-60">List marker</span>
              <select
                id="entryHighlightListMarker"
                class="select block"
                :disabled="!isThemeCustomized"
                v-model="settings.entryHighlight.listMarker"
              >
                <option class="option" value="">none</option>
                <option
                  class="option"
                  v-for="(item, index) in listMarkers"
                  :key="index"
                  :value="item"
                >
                  {{ item }}
                </option>
              </select>
            </label>
            <!-- TODO toggle button -->
            <Field
              id="entryHighlightListMarkerColor"
              type="color"
              label="List marker color"
              :disabled="!isThemeCustomized"
              v-model="settings.entryHighlight.listMarkerColor"
            />
          </div>
          <div class="flex gap-5 flex-wrap">
            <Field
              id="entryHighlightColor"
              type="color"
              label="Color"
              :disabled="!isThemeCustomized"
              v-model="settings.entryHighlight.color"
            />
            <label class="flex flex-col" for="entryHighlightFont">
              <span class="opacity-60">Font</span>
              <select
                id="entryHighlightFont"
                class="select block"
                :disabled="!isThemeCustomized"
                v-model="settings.entryHighlight.font"
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
              id="entryHighlightFontSize"
              label="Font size"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.entryHighlight.fontSize"
            />
            <Field
              id="entryHighlightLineHeight"
              label="Line height"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.entryHighlight.lineHeight"
              step="0.1"
            />
          </div>
          <div class="flex gap-5 flex-wrap">
            <label class="flex flex-col" for="entryHighlightFontWeight">
              <span class="opacity-60">Font weight</span>
              <select
                id="entryHighlightFontWeight"
                v-model="settings.entryHighlight.fontWeight"
                class="select block"
              >
                <option v-for="i in 9" :key="i" class="option">
                  {{ `${i}00` }}
                </option>
              </select>
            </label>
            <label for="entryHighlightIsItalic">
              <input
                id="entryHighlightIsItalic"
                class="input"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="settings.entryHighlight.isItalic"
              />
              <span class="opacity-60">Italic</span>
            </label>
            <label for="entryHighlightIsUppercase">
              <input
                id="entryHighlightIsUppercase"
                class="input"
                type="checkbox"
                :disabled="!isThemeCustomized"
                v-model="settings.entryHighlight.isUppercase"
              />
              <span class="opacity-60">Uppercase</span>
            </label>
          </div>
        </li>
      </ul>
    </template>
    <ul v-if="category.entries.length" class="flex flex-col gap-10 mb-4">
      <li
        v-for="(entry, entryIndex) in category.entries"
        :key="entryIndex"
        class="border-b-2 border-white border-opacity-5 pb-12"
      >
        <header class="flex items-center justify-between">
          <div class="uppercase font-bold text-lg mb-5">
            Entry #{{ entryIndex + 1 }}
          </div>
          <ListActions
            class="mb-2"
            :index="entryIndex"
            :list-length="category.entries.length"
            @moveUp="moveUp(category.entries, entryIndex)"
            @moveDown="moveDown(category.entries, entryIndex)"
            @remove="remove(category.entries, entryIndex)"
          />
        </header>
        <div class="flex flex-col gap-5">
          <label class="flex flex-col flex-1" for="title">
            <span class="opacity-60">
              {{ getEntryTitleLabel(entry.type) }}
            </span>
            <input id="title" class="input" v-model="entry.title" />
          </label>
          <template v-if="entry.nature === 'experience'">
            <label class="flex flex-col" for="organization">
              <span class="opacity-60">
                {{ getExperienceOrganizationLabel(entry.type) }}
              </span>
              <input
                id="organization"
                class="input"
                v-model="entry.organization"
              />
            </label>
            <label class="flex flex-col" for="location">
              <span class="opacity-60">Location</span>
              <input id="location" class="input" v-model="entry.location" />
            </label>
            <label class="flex flex-col" for="period">
              <span class="opacity-60">Period</span>
              <input id="period" class="input" v-model="entry.period" />
            </label>
            <label class="flex flex-col" for="summary">
              <span class="opacity-60">Description</span>
              <textarea id="summary" class="input" v-model="entry.summary" />
            </label>
          </template>
          <label class="flex flex-col" for="highlights">
            <div class="flex gap-2">
              <span class="opacity-60">Highlights</span>
              <button
                id="highlights"
                title="Add highlight"
                class="text-white bg-blue-500 rounded-full size-7"
                @click="addHighlight(entry, entryIndex)"
              >
                <PlusCircleIcon class="size-full" />
              </button>
            </div>
            <ul
              v-if="entry.highlights.length"
              :id="`highlightList${entryIndex}`"
              class="inputList"
            >
              <li
                v-for="(_highlight, highlightIndex) in entry.highlights"
                :key="highlightIndex"
                class="inputListItem"
              >
                <input
                  class="input w-[70%]"
                  v-model="entry.highlights[highlightIndex]"
                  @keydown.enter.prevent="addHighlight(entry, entryIndex)"
                />
                <ListActions
                  class="mb-2"
                  :index="highlightIndex"
                  :list-length="entry.highlights.length"
                  @moveUp="moveUp(entry.highlights, highlightIndex)"
                  @moveDown="moveDown(entry.highlights, highlightIndex)"
                  @remove="remove(entry.highlights, highlightIndex)"
                />
              </li>
            </ul>
          </label>
          <label class="flex flex-col" for="tags">
            <div class="flex gap-2">
              <span class="opacity-60">Tags</span>
              <button
                id="tags"
                title="Add tag"
                class="text-white bg-blue-500 rounded-full size-7"
                @click="addTag(entry, entryIndex)"
              >
                <PlusCircleIcon class="size-full" />
              </button>
            </div>
            <ul
              v-if="entry.tags.length"
              :id="`tagList${entryIndex}`"
              class="inputList"
            >
              <li
                v-for="(_tag, tagIndex) in entry.tags"
                :key="tagIndex"
                class="inputListItem"
              >
                <input
                  class="input w-[70%]"
                  v-model="entry.tags[tagIndex]"
                  @keydown.enter.prevent="addTag(entry, entryIndex)"
                />
                <ListActions
                  class="mb-2"
                  :index="tagIndex"
                  :list-length="entry.tags.length"
                  @moveUp="moveUp(entry.tags, tagIndex)"
                  @moveDown="moveDown(entry.tags, tagIndex)"
                  @remove="remove(entry.tags, tagIndex)"
                />
              </li>
            </ul>
          </label>
        </div>
      </li>
    </ul>
    <footer class="flex justify-center">
      <Button @click="addEntry(category)">Add entry</Button>
    </footer>
  </EditorCategory>

  <footer class="flex justify-center">
    <Button class="shadow-lg w-full" @click="addCategory">Add category</Button>
  </footer>
</template>
