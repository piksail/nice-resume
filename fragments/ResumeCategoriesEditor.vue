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
} from "@/globals";
import BlockSettingsEditor from "@/components/BlockSettingsEditor.vue";
import Button from "@/components/Button.vue";
import EditorCategory from "@/components/EditorCategory.vue";
import ListActions from "@/components/ListActions.vue";
import ListSettingsEditor from "@/components/ListSettingsEditor.vue";
import TextSettingsEditor from "@/components/TextSettingsEditor.vue";

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
            <div class="uppercase font-bold text-lg mb-5">Category</div>
          </header>
          <div class="flex flex-col gap-5">
            <BlockSettingsEditor
              property-name="category"
              :settings="settings.category"
            />
          </div>
        </li>
        <li class="border-b-2 border-white border-opacity-5 pb-12">
          <header>
            <div class="uppercase font-bold text-lg mb-5">Category name</div>
          </header>
          <div class="flex flex-col gap-5">
            <TextSettingsEditor
              property-name="categoryName"
              :settings="settings.categoryName"
            />
          </div>
        </li>
        <li class="border-b-2 border-white border-opacity-5 pb-12">
          <header>
            <div class="uppercase font-bold text-lg mb-5">Entry title</div>
          </header>
          <div class="flex flex-col gap-5">
            <TextSettingsEditor
              property-name="entryTitle"
              :settings="settings.entryTitle"
            />
          </div>
        </li>
        <li class="border-b-2 border-white border-opacity-5 pb-12">
          <header>
            <div class="uppercase font-bold text-lg mb-5">Entry period</div>
          </header>
          <div class="flex flex-col gap-5">
            <TextSettingsEditor
              property-name="entryPeriod"
              :settings="settings.entryPeriod"
            />
          </div>
        </li>
        <li class="border-b-2 border-white border-opacity-5 pb-12">
          <header>
            <div class="uppercase font-bold text-lg mb-5">
              Entry organization
              <!-- TODO custom label here-->
            </div>
          </header>
          <div class="flex flex-col gap-5">
            <TextSettingsEditor
              property-name="entryOrganization"
              :settings="settings.entryOrganization"
            />
          </div>
        </li>
        <li class="border-b-2 border-white border-opacity-5 pb-12">
          <header>
            <div class="uppercase font-bold text-lg mb-5">Entry location</div>
          </header>
          <div class="flex flex-col gap-5">
            <TextSettingsEditor
              property-name="entryLocation"
              :settings="settings.entryLocation"
            />
          </div>
        </li>
        <li class="border-b-2 border-white border-opacity-5 pb-12">
          <header>
            <div class="uppercase font-bold text-lg mb-5">Entry summary</div>
          </header>
          <div class="flex flex-col gap-5">
            <BlockSettingsEditor
              property-name="entrySummary"
              :settings="settings.entrySummary"
            />
            <TextSettingsEditor
              property-name="entrySummary"
              :settings="settings.entrySummary"
            />
          </div>
        </li>
        <li>
          <header>
            <div class="uppercase font-bold text-lg mb-5">Highlight</div>
          </header>
          <div class="flex flex-col gap-5">
            <BlockSettingsEditor
              property-name="entryHighlight"
              :settings="settings.entryHighlight"
            />
            <TextSettingsEditor
              property-name="entryHighlight"
              :settings="settings.entryHighlight"
            />
            <ListSettingsEditor
              property-name="entryHighlight"
              :settings="settings.entryHighlight"
            />
          </div>
        </li>
        <li>
          <header>
            <div class="uppercase font-bold text-lg">Tag</div>
          </header>
          <div class="flex flex-col gap-5">
            <BlockSettingsEditor
              property-name="entryTag"
              :settings="settings.entryTag"
            />
            <TextSettingsEditor
              property-name="entryTag"
              :settings="settings.entryTag"
            />
            <Field
              id="entryTagGap"
              label="Gap"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.entryTag.gap"
            />
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
