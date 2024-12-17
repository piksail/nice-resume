<script setup lang="ts">
import { nextTick, ref } from "vue";
import { storeToRefs } from "pinia";
import Button from "primevue/button";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputText from "primevue/inputtext";
import { useConfirm } from "primevue/useconfirm";
import { useResumeStore } from "@/stores/resume";
import { moveDown, moveUp, remove } from "@/utils/array";
import {
  focusNextInput,
  getCategoryIconClass,
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
} from "@/globals";
import EditorCategory from "@/components/EditorCategory.vue";
import Field from "@/components/Field.vue";
import ListActions from "@/components/ListActions.vue";

// eslint-disable-next-line no-undef
const { t } = useI18n({
  useScope: "local",
});

const { categories } = storeToRefs(useResumeStore());

const confirm = useConfirm();

const types = ref<Category["type"][]>(categoryTypes);
const layouts = ref<Category["layout"][]>(categoryLayouts);
const indexToRemove = ref();

async function addCategory() {
  const defaultCategoryName = "Name";
  const category: Category = {
    nature: "experience",
    type: "work",
    name: defaultCategoryName,
    entries: [],
    layout: "full",
    isLocked: false,
    isVisible: true,
  };

  categories.value.push(category);

  // Add an entry to anticipate user need
  addEntry(category);

  // Scroll to panel
  await nextTick(); // Wait for the category to be rendered to the new position before scrolling to it
  document.getElementById(defaultCategoryName)?.scrollIntoView();
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

function askBeforeRemoveCategory(categoryIndex: number) {
  indexToRemove.value = categoryIndex;
  confirm.require({
    message: `Confirm category ${categories.value[indexToRemove.value]?.name} deletion?`,
    header: "Confirmation",
    rejectProps: {
      label: "No",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Yes, delete",
      severity: "danger",
    },
    accept: () => {
      remove(categories.value, indexToRemove.value);
    },
    reject: () => {},
  });
}

function askBeforeRemoveCategoryEntry(category: Category, entryIndex: number) {
  indexToRemove.value = entryIndex;
  confirm.require({
    message: `Confirm entry ${category.entries[indexToRemove.value]?.title} deletion?`,
    header: "Confirmation",
    rejectProps: {
      label: "No",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Yes, delete",
      severity: "danger",
    },
    accept: () => {
      remove(category.entries, indexToRemove.value);
    },
    reject: () => {},
  });
}

function changeCategoryType(category: Category, value: Category["type"]) {
  category.type = value;
  category.nature = (assetTypes as string[]).includes(value)
    ? "asset"
    : "experience";
  category.entries = []; // Prevent inconsistency between previous and new entry types
}

async function moveCategory(
  moveFunction: typeof moveUp | typeof moveDown,
  categories: Category[],
  categoryIndex: number,
  categoryName: Category["name"],
) {
  moveFunction(categories, categoryIndex);
  await nextTick(); // Wait for the category to be rendered to the new position before scrolling to it
  document.getElementById(categoryName)?.scrollIntoView();
}

function toggleCategoryLock(category: Category) {
  category.isLocked = !category.isLocked;
}

function toggleCategoryVisibility(category: Category) {
  category.isVisible = !category.isVisible;
}
</script>

<template>
  <EditorCategory
    v-for="(category, categoryIndex) in categories"
    :key="categoryIndex"
    :id="category.name"
    :hidden="!category.isVisible"
    :locked="category.isLocked"
  >
    <template v-slot:header>
      <template v-if="category.isLocked">
        <span>
          <i class="pi" :class="getCategoryIconClass(category.type)" />
          {{ category.name }}
        </span>
      </template>
      <template v-else-if="category.isVisible">
        <div class="flex items-baseline gap-8">
          <Field
            id="categoryName"
            :label="$t('categoryName')"
            v-model="category.name"
          />
          <Field
            type="select"
            :label="$t('type')"
            :id="`${categoryIndex}type`"
            :model-value="category.type"
            optionLabel="label"
            optionValue="value"
            :options="
              types.map((type) => ({
                label: capitalize($t(type)),
                value: type,
              }))
            "
            @update:model-value="changeCategoryType(category, $event)"
          />
          <Field
            type="select"
            :label="$t('layout')"
            :id="`${categoryIndex}layout`"
            :options="layouts"
            v-model="category.layout"
          />
        </div>
        <ListActions
          :index="categoryIndex"
          :is-header="true"
          :list-length="categories.length"
          @moveUp="
            moveCategory(moveUp, categories, categoryIndex, category.name)
          "
          @moveDown="
            moveCategory(moveDown, categories, categoryIndex, category.name)
          "
          @remove="askBeforeRemoveCategory(categoryIndex)"
        />
      </template>
      <template v-else>
        <span>{{ category.name }}</span>
      </template>
    </template>
    <template v-slot:icons>
      <Button
        :icon="category.isLocked ? 'pi pi-lock-open' : 'pi pi-lock'"
        :aria-label="
          category.isLocked ? t('unlockCategory') : t('lockCategory')
        "
        rounded
        variant="text"
        :class="category.isVisible ? '' : '!text-white'"
        @click="toggleCategoryLock(category)"
      />
      <Button
        v-if="!category.isLocked"
        :icon="category.isVisible ? 'pi pi-eye-slash' : 'pi pi-eye'"
        :aria-label="category.isVisible ? t('hideCategory') : t('showCategory')"
        rounded
        variant="text"
        :class="category.isVisible ? '' : '!text-white'"
        @click="toggleCategoryVisibility(category)"
      />
    </template>
    <ul v-if="category.entries.length" class="flex flex-col gap-10 mb-4">
      <li v-for="(entry, entryIndex) in category.entries" :key="entryIndex">
        <Fieldset :legend="getEntryHeading(entry, entryIndex)" toggleable>
          <header class="flex items-center justify-between">
            <div
              :id="getEntryHeading(entry, entryIndex)"
              class="uppercase tracking-widest font-semibold text-lg mb-5 scroll-mt-10"
            >
              {{ getEntryHeading(entry, entryIndex) }}
            </div>
            <ListActions
              class="mb-2"
              :index="entryIndex"
              :list-length="category.entries.length"
              @moveUp="moveUp(category.entries, entryIndex)"
              @moveDown="moveDown(category.entries, entryIndex)"
              @remove="askBeforeRemoveCategoryEntry(category, entryIndex)"
            />
          </header>
          <div class="formBlock">
            <Field
              id="entryTitle"
              :label="$t(getEntryTitleLabel(entry.type))"
              transparent
              v-model="entry.title"
            />
            <template v-if="entry.nature === 'experience'">
              <Field
                id="entryOrganization"
                :label="$t(getExperienceOrganizationLabel(entry.type))"
                transparent
                v-model="entry.organization"
              />
              <Field
                id="entryLocation"
                :label="$t('location')"
                transparent
                v-model="entry.location"
              />
              <Field
                id="entryPeriod"
                :label="$t('period')"
                transparent
                v-model="entry.period"
              />
              <Field
                id="entrySummary"
                :label="$t('summary')"
                transparent
                type="textarea"
                v-model="entry.summary"
              />
            </template>
            <label class="flex flex-col gap-1" for="highlights">
              <span class="label">{{ capitalize($t("highlights")) }}</span>
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
                  <InputGroup>
                    <InputText
                      class="!text-sm"
                      size="small"
                      v-model="entry.highlights[highlightIndex]"
                      @keydown.enter.prevent="addHighlight(entry, entryIndex)"
                    />
                    <InputGroupAddon
                      v-if="
                        entry.highlights.length > 1 &&
                        highlightIndex < entry.highlights.length - 1
                      "
                    >
                      <Button
                        icon="pi pi-arrow-down"
                        severity="secondary"
                        size="small"
                        pt:icon:class="text-xs"
                        @click="moveDown(entry.highlights, highlightIndex)"
                      />
                    </InputGroupAddon>
                    <InputGroupAddon
                      v-if="entry.highlights.length > 1 && highlightIndex > 0"
                    >
                      <Button
                        icon="pi pi-arrow-up"
                        severity="secondary"
                        size="small"
                        pt:icon:class="text-xs"
                        @click="moveUp(entry.highlights, highlightIndex)"
                      />
                    </InputGroupAddon>
                    <InputGroupAddon>
                      <Button
                        icon="pi pi-times"
                        severity="danger"
                        size="small"
                        pt:icon:class="text-xs"
                        @click="remove(entry.highlights, highlightIndex)"
                      />
                    </InputGroupAddon>
                  </InputGroup>
                </li>
              </ul>
              <Button
                icon="pi pi-plus"
                :label="capitalize(`${$t('toAdd')} ${$t('highlight')}`)"
                variant="outlined"
                size="small"
                @click="addHighlight(entry, entryIndex)"
              />
            </label>
            <label class="flex flex-col gap-1" for="tags">
              <span class="label">{{ capitalize($t("tags")) }}</span>
              <ul v-if="entry.tags.length" :id="`tagList${entryIndex}`">
                <li
                  v-for="(_tag, tagIndex) in entry.tags"
                  :key="tagIndex"
                  class="inputListItem"
                >
                  <Field
                    id="entryLocation"
                    class="w-[70%]"
                    v-model="entry.tags[tagIndex]"
                    @keydown.enter.prevent="addTag(entry, entryIndex)"
                  />
                  <ListActions
                    :index="tagIndex"
                    :list-length="entry.tags.length"
                    @moveUp="moveUp(entry.tags, tagIndex)"
                    @moveDown="moveDown(entry.tags, tagIndex)"
                    @remove="remove(entry.tags, tagIndex)"
                  />
                </li>
              </ul>
              <Button
                class="w-[70%] mt-2"
                icon="pi pi-plus"
                :label="capitalize(`${$t('toAdd')} ${$t('tag')}`)"
                variant="outlined"
                size="small"
                @click="addTag(entry, entryIndex)"
              />
            </label>
          </div>
        </Fieldset>
      </li>
    </ul>
    <template v-slot:footer>
      <footer class="flex justify-center">
        <Button
          icon="pi pi-plus"
          :label="capitalize(`${$t('toAdd')} ${$t('entry')}`)"
          @click="addEntry(category)"
        />
      </footer>
    </template>
  </EditorCategory>

  <footer class="flex justify-center">
    <button class="button slotButton w-full shadow-none" @click="addCategory">
      <span class="font-black tracking-widest uppercase">
        {{ capitalize(`${$t("toAdd")} ${$t("category")}`) }}
      </span>
    </button>
  </footer>
</template>

<i18n lang="json">
{
  "br": {
    "lockCategory": "Prennañ rummad",
    "unlockCategory": "Dibrennañ  rummad",
    "showCategory": "Diskouez rummad",
    "hideCategory": "Kuzhat rummad"
  },
  "de": {
    "lockCategory": "Kategorie sperren",
    "unlockCategory": "Kategorie entsperren",
    "showCategory": "Kategorie zeigen",
    "hideCategory": "Kategorie verstecken"
  },
  "en": {
    "lockCategory": "Lock category",
    "unlockCategory": "Unlock category",
    "showCategory": "Show category",
    "hideCategory": "Hide category"
  },
  "es": {
    "lockCategory": "Bloquear la categoría",
    "unlockCategory": "Desbloquear la categoría",
    "showCategory": "Mostrar la categoría",
    "hideCategory": "Ocultar la categoría"
  },
  "fr": {
    "lockCategory": "Verrouiller la catégorie",
    "unlockCategory": "Déverrouiller la catégorie",
    "showCategory": "Afficher la catégorie",
    "hideCategory": "Cacher la catégorie"
  }
}
</i18n>
