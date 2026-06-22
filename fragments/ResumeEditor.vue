<script setup lang="ts">
import { nextTick, ref } from "vue";
import { storeToRefs } from "pinia";
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
import { capitalize } from "@/utils/string";

const { t } = useI18n({
  useScope: "local",
});

const { categories } = storeToRefs(useResumeStore());

const confirm = useConfirmDialog();

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
      isVisible: true,
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
      isVisible: true,
    };

    category.entries.push(experience);
  }
}

function addHighlight(
  entry: Entry,
  entryIndex: number,
  categoryIndex: number,
  categoryLayout: Category["layout"],
) {
  entry.highlights.push("");

  focusNextInput(
    `#categoryList${categoryIndex}EntryList${entryIndex}HighlightList_${categoryLayout} input`,
  );
}

function addTag(
  entry: Entry,
  entryIndex: number,
  categoryIndex: number,
  categoryLayout: Category["layout"],
) {
  entry.tags.push("");

  focusNextInput(
    `#categoryList${categoryIndex}EntryList${entryIndex}TagList_${categoryLayout} input`,
  );
}

async function askBeforeRemoveCategory(categoryIndex: number) {
  indexToRemove.value = categoryIndex;
  const confirmed = await confirm({
    title: capitalize(t("removalConfirmation")),
    description: t("confirmCategoryDeletion", {
      categoryName: categories.value[indexToRemove.value]?.name,
    }),
    cancelLabel: t("toCancel"),
    confirmLabel: t("toRemove"),
  });
  if (confirmed) {
    remove(categories.value, indexToRemove.value);
  }
}

async function askBeforeRemoveCategoryEntry(
  category: Category,
  entryIndex: number,
) {
  indexToRemove.value = entryIndex;
  const confirmed = await confirm({
    title: capitalize(t("removalConfirmation")),
    description: t("confirmCategoryEntryDeletion", {
      entryTitle: getEntryHeading(
        category.entries[indexToRemove.value]!,
        indexToRemove.value,
      ),
    }),
    cancelLabel: t("toCancel"),
    confirmLabel: t("toRemove"),
  });
  if (confirmed) {
    remove(category.entries, indexToRemove.value);
  }
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

function toggleEntryVisibility(entry: Entry) {
  entry.isVisible = !entry.isVisible;
}
</script>

<template>
  <EditorCategory
    v-for="(category, categoryIndex) in categories"
    :id="category.name"
    :key="categoryIndex"
    :title="capitalize(category.name)"
    :icon="getCategoryIconClass(category.type)"
    :hidden="!category.isVisible"
    :locked="category.isLocked"
  >
    <template #actions>
      <ListActions
        :index="categoryIndex"
        :is-header="true"
        :list-length="categories.length"
        @move-up="
          moveCategory(moveUp, categories, categoryIndex, category.name)
        "
        @move-down="
          moveCategory(moveDown, categories, categoryIndex, category.name)
        "
        @remove="askBeforeRemoveCategory(categoryIndex)"
      />
    </template>
    <template #header>
      <template v-if="category.isLocked">
        <span>
          <i :class="getCategoryIconClass(category.type)" />
          {{ category.name }}
        </span>
      </template>
      <template v-else-if="category.isVisible">
        <div class="flex items-baseline gap-8">
          <Field
            :id="`categoryList${categoryIndex}Name_${category.layout}`"
            v-model="category.name"
            target
            :label="$t('categoryName')"
          />
          <Field
            :id="`categoryList${categoryIndex}Type`"
            type="select"
            :label="$t('type')"
            :model-value="category.type"
            label-key="label"
            value-key="value"
            :items="
              types.map((type) => ({
                label: capitalize($t(type)),
                value: type,
              }))
            "
            @update:model-value="changeCategoryType(category, $event)"
          />
          <Field
            :id="`categoryList${categoryIndex}Layout`"
            v-model="category.layout"
            type="select"
            :label="$t('layout')"
            label-key="label"
            value-key="value"
            :items="
              layouts.map((layout) => ({
                label: capitalize($t(layout)),
                value: layout,
              }))
            "
          />
        </div>
      </template>
      <template v-else>
        <span>{{ category.name }}</span>
      </template>
    </template>
    <template #icons>
      <UButton
        :icon="category.isLocked ? 'i-lucide-lock-open' : 'i-lucide-lock'"
        :aria-label="
          category.isLocked ? t('unlockCategory') : t('lockCategory')
        "
        rounded
        variant="ghost"
        :class="category.isVisible ? '' : '!text-white'"
        @click="toggleCategoryLock(category)"
      />
      <UButton
        v-if="!category.isLocked"
        :icon="category.isVisible ? 'i-lucide-eye-closed' : 'i-lucide-eye'"
        :aria-label="category.isVisible ? t('hideCategory') : t('showCategory')"
        rounded
        variant="ghost"
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
              class="flex items-center gap-5 uppercase tracking-widest font-semibold text-lg mb-5 scroll-mt-10"
            >
              <span :class="!entry.isVisible ? 'text-dimmed line-through' : ''">
                {{ getEntryHeading(entry, entryIndex) }}
              </span>
              <UButton
                :icon="entry.isVisible ? 'i-lucide-eye-closed' : 'i-lucide-eye'"
                :aria-label="entry.isVisible ? t('hideEntry') : t('showEntry')"
                variant="ghost"
                rounded
                size="sm"
                @click="toggleEntryVisibility(entry)"
              />
            </div>
            <ListActions
              class="mb-2"
              :index="entryIndex"
              :list-length="category.entries.length"
              @move-up="moveUp(category.entries, entryIndex)"
              @move-down="moveDown(category.entries, entryIndex)"
              @remove="askBeforeRemoveCategoryEntry(category, entryIndex)"
            />
          </header>
          <div v-if="entry.isVisible" class="formBlock">
            <Field
              :id="`categoryList${categoryIndex}EntryList${entryIndex}Title_${category.layout}`"
              v-model="entry.title"
              target
              transparent
              :label="$t(getEntryTitleLabel(entry.type))"
            />
            <template v-if="entry.nature === 'experience'">
              <Field
                :id="`categoryList${categoryIndex}EntryList${entryIndex}Organization_${category.layout}`"
                v-model="entry.organization"
                target
                transparent
                :label="$t(getExperienceOrganizationLabel(entry.type))"
              />
              <Field
                :id="`categoryList${categoryIndex}EntryList${entryIndex}Location_${category.layout}`"
                v-model="entry.location"
                target
                transparent
                :label="$t('location')"
              />
              <Field
                :id="`categoryList${categoryIndex}EntryList${entryIndex}Period_${category.layout}`"
                v-model="entry.period"
                target
                transparent
                :label="$t('period')"
              />
              <Field
                :id="`categoryList${categoryIndex}EntryList${entryIndex}Summary_${category.layout}`"
                v-model="entry.summary"
                target
                transparent
                :label="$t('summary')"
                type="textarea"
              />
            </template>
            <label class="flex flex-col gap-1" for="highlights">
              <span class="label labelTransparent">
                {{ capitalize($t("highlights")) }}
              </span>
              <ul
                v-if="entry.highlights.length"
                :id="`categoryList${categoryIndex}EntryList${entryIndex}HighlightList_${category.layout}`"
                class="inputList"
              >
                <li
                  v-for="(_highlight, highlightIndex) in entry.highlights"
                  :key="highlightIndex"
                  class="inputListItem"
                >
                  <Field
                    :id="`categoryList${categoryIndex}EntryList${entryIndex}HighlightList${highlightIndex}_${category.layout}`"
                    v-model="entry.highlights[highlightIndex]"
                    target
                    transparent
                    class="w-[70%]"
                    @keydown.enter.prevent="
                      addHighlight(
                        entry,
                        entryIndex,
                        categoryIndex,
                        category.layout,
                      )
                    "
                  />
                  <ListActions
                    :index="highlightIndex"
                    :list-length="entry.highlights.length"
                    @move-up="moveUp(entry.highlights, highlightIndex)"
                    @move-down="moveDown(entry.highlights, highlightIndex)"
                    @remove="remove(entry.highlights, highlightIndex)"
                  />
                </li>
              </ul>
              <UButton
                icon="i-lucide-list-plus"
                variant="outline"
                size="sm"
                class="w-[70%]"
                @click="
                  addHighlight(
                    entry,
                    entryIndex,
                    categoryIndex,
                    category.layout,
                  )
                "
              >
                {{ capitalize(`${$t("toAdd")} ${$t("highlight")}`) }}
              </UButton>
            </label>
            <label class="flex flex-col gap-1" for="tags">
              <span class="label labelTransparent">
                {{ capitalize($t("tags")) }}
              </span>
              <ul
                v-if="entry.tags.length"
                :id="`categoryList${categoryIndex}EntryList${entryIndex}TagList_${category.layout}`"
              >
                <li
                  v-for="(_tag, tagIndex) in entry.tags"
                  :key="tagIndex"
                  class="inputListItem"
                >
                  <Field
                    :id="`categoryList${categoryIndex}EntryList${entryIndex}TagList${tagIndex}_${category.layout}`"
                    v-model="entry.tags[tagIndex]"
                    target
                    transparent
                    class="w-[70%]"
                    @keydown.enter.prevent="
                      addTag(entry, entryIndex, categoryIndex, category.layout)
                    "
                  />
                  <ListActions
                    :index="tagIndex"
                    :list-length="entry.tags.length"
                    @move-up="moveUp(entry.tags, tagIndex)"
                    @move-down="moveDown(entry.tags, tagIndex)"
                    @remove="remove(entry.tags, tagIndex)"
                  />
                </li>
              </ul>
              <UButton
                icon="i-lucide-tag"
                variant="outline"
                size="sm"
                class="w-[70%]"
                @click="
                  addTag(entry, entryIndex, categoryIndex, category.layout)
                "
              >
                {{ capitalize(`${$t("toAdd")} ${$t("tag")}`) }}
              </UButton>
            </label>
          </div>
        </Fieldset>
      </li>
    </ul>
    <template #footer>
      <footer>
        <UButton
          icon="i-lucide-plus"
          variant="soft"
          class="w-full"
          :trailing-icon="getCategoryIconClass(category.type)"
          @click="addEntry(category)"
        >
          {{ capitalize(`${$t("toAdd")} ${$t("entry")}`) }}
        </UButton>
      </footer>
    </template>
  </EditorCategory>

  <footer class="">
    <UButton icon="i-lucide-plus" variant="outline" block @click="addCategory">
      {{ capitalize(`${$t("toAdd")} ${$t("category")}`) }}
    </UButton>
  </footer>
</template>

<i18n lang="json">
{
  "br": {
    "lockCategory": "Prennañ rummad",
    "unlockCategory": "Dibrennañ  rummad",
    "showCategory": "Diskouez rummad",
    "hideCategory": "Kuzhat rummad",
    "confirmCategoryDeletion": "TODO {categoryName}",
    "confirmCategoryEntryDeletion": "TODO {entryTitle}"
  },
  "de": {
    "lockCategory": "Kategorie sperren",
    "unlockCategory": "Kategorie entsperren",
    "showCategory": "Kategorie zeigen",
    "hideCategory": "Kategorie verstecken",
    "confirmCategoryDeletion": "TODO {categoryName}",
    "confirmCategoryEntryDeletion": "TODO {entryTitle}"
  },
  "en": {
    "lockCategory": "Lock category",
    "unlockCategory": "Unlock category",
    "showCategory": "Show category",
    "hideCategory": "Hide category",
    "confirmCategoryDeletion": "Remove {categoryName} category?",
    "confirmCategoryEntryDeletion": "Remove {entryTitle} entry?"
  },
  "es": {
    "lockCategory": "Bloquear la categoría",
    "unlockCategory": "Desbloquear la categoría",
    "showCategory": "Mostrar la categoría",
    "hideCategory": "Ocultar la categoría",
    "confirmCategoryDeletion": "TODO {categoryName}",
    "confirmCategoryEntryDeletion": "TODO {entryTitle}"
  },
  "fr": {
    "lockCategory": "Verrouiller la catégorie",
    "unlockCategory": "Déverrouiller la catégorie",
    "showCategory": "Afficher la catégorie",
    "hideCategory": "Cacher la catégorie",
    "confirmCategoryDeletion": "Supprimer la catégorie {categoryName} ?",
    "confirmCategoryEntryDeletion": "Supprimer l'entrée {entryTitle} ?"
  }
}
</i18n>
