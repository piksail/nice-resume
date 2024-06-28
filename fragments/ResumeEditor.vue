<script setup lang="ts">
import { nextTick, ref } from "vue";
import { storeToRefs } from "pinia";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/outline";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { moveDown, moveUp, remove } from "@/utils/array";
import {
  focusNextInput,
  getEntryHeading,
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
import EditorCategory from "@/components/EditorCategory.vue";
import Field from "@/components/Field.vue";
import ListActions from "@/components/ListActions.vue";

const { isThemeCustomized, template } = storeToRefs(useProfileStore());

const { categories } = storeToRefs(useResumeStore());

const types = ref<Category["type"][]>(categoryTypes);
const layouts = ref<Category["layout"][]>(categoryLayouts);
const dialog = ref(null);
const indexToRemove = ref();

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

function askBeforeRemove(categoryIndex: number) {
  openModal();
  indexToRemove.value = categoryIndex;
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

function closeModal() {
  // @ts-expect-error TODO type
  dialog.value.close();
}

async function moveThenScroll(
  moveFunction: typeof moveUp | typeof moveDown,
  categories: Category[],
  categoryIndex: number,
  categoryName: Category["name"],
) {
  moveFunction(categories, categoryIndex);
  await nextTick(); // Wait for the category to be rendered to the new position before scrolling to it
  document.getElementById(categoryName)?.scrollIntoView();
}

function openModal() {
  // @ts-expect-error TODO type
  dialog.value.showModal();
}

function removeCategory() {
  remove(categories.value, indexToRemove.value);
  closeModal();
}

function toggleCategoryVisibility(category: Category) {
  category.isVisible = !category.isVisible;
}
</script>

<template>
  <!-- TODO close top-right -->
  <dialog
    ref="dialog"
    class="max-w-screen-sm m-auto p-16 rounded-lg backdrop:bg-black/50 backdrop:backdrop-blur-sm"
  >
    <p class="mb-8 text-center text-2xl font-bold text-pink-500">
      Confirm category deletion?
    </p>
    <div class="flex flex-col gap-4">
      <button class="button bg-white textGradient" @click="closeModal">
        No
      </button>
      <button class="button bg-red-500 text-white" @click="removeCategory">
        Yes, delete
      </button>
    </div>
  </dialog>
  <EditorCategory
    v-for="(category, categoryIndex) in categories"
    :key="categoryIndex"
    :id="category.name"
    :is-customizing="isThemeCustomized"
    :is-hidden="!category.isVisible"
  >
    <template v-slot:header>
      <template v-if="category.isVisible">
        <div class="flex items-baseline gap-8">
          <Field
            id="categoryName"
            label="Category name"
            v-model="category.name"
          />
          <label for="type">
            <span class="label">Type</span>
            <select
              id="type"
              :value="category.type"
              @change="
                changeCategoryType(
                  category,
                  ($event.target as HTMLInputElement).value as Category['type'],
                )
              "
              class="select block text-blue-500 capitalize px-2 py-1 pl-0"
            >
              <option v-for="item in types" :key="item" class="option">
                {{ item }}
              </option>
            </select>
          </label>
          <label for="layout">
            <span class="label">Layout</span>
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
              class="select block text-blue-500 capitalize px-2 py-1 pl-0 disabled:cursor-not-allowed"
            >
              <option v-for="item in layouts" :key="item" class="option">
                {{ item }}
              </option>
            </select>
          </label>
        </div>
        <ListActions
          :index="categoryIndex"
          :is-header="true"
          :list-length="categories.length"
          @moveUp="
            moveThenScroll(moveUp, categories, categoryIndex, category.name)
          "
          @moveDown="
            moveThenScroll(moveDown, categories, categoryIndex, category.name)
          "
          @remove="askBeforeRemove"
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
    <ul v-if="category.entries.length" class="flex flex-col gap-10 mb-4">
      <li
        v-for="(entry, entryIndex) in category.entries"
        :key="entryIndex"
        class="sectionSeparator border-white/10"
      >
        <header class="flex items-center justify-between">
          <div
            :id="getEntryHeading(entry, entryIndex)"
            class="sectionHeading scroll-mt-10"
          >
            {{ getEntryHeading(entry, entryIndex) }}
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
          <Field
            id="entryTitle"
            :label="getEntryTitleLabel(entry.type)"
            transparent
            v-model="entry.title"
          />
          <template v-if="entry.nature === 'experience'">
            <Field
              id="entryOrganization"
              :label="getExperienceOrganizationLabel(entry.type)"
              transparent
              v-model="entry.organization"
            />
            <Field
              id="entryLocation"
              label="Location"
              transparent
              v-model="entry.location"
            />
            <Field
              id="entryPeriod"
              label="Period"
              transparent
              v-model="entry.period"
            />
            <Field
              id="entrySummary"
              label="Description"
              transparent
              type="textarea"
              v-model="entry.summary"
            />
          </template>
          <label class="flex flex-col" for="highlights">
            <span class="label opacity-60">Highlights</span>
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
            <button
              class="button slotButton w-[70%] shadow-none px-2 py-1 text-sm"
              @click="addHighlight(entry, entryIndex)"
            >
              Add highlight
            </button>
          </label>
          <label class="flex flex-col" for="tags">
            <span class="label opacity-60">Tags</span>
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
            <button
              class="button slotButton w-[70%] shadow-none px-2 py-1 text-sm"
              @click="addTag(entry, entryIndex)"
            >
              Add tag
            </button>
          </label>
        </div>
      </li>
    </ul>
    <footer class="flex justify-center">
      <button class="button bg-white" @click="addEntry(category)">
        <span class="textGradient">Add entry</span>
      </button>
    </footer>
  </EditorCategory>

  <footer class="flex justify-center">
    <button class="button slotButton w-full shadow-none" @click="addCategory">
      <span class="font-black tracking-widest uppercase">Add category</span>
    </button>
  </footer>
</template>
