<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { themeSettings } from "@/globals";
import { getNodeStyle } from "@/utils/style";
import ResumeCategoryName from "./ResumeCategoryName.vue";
import ResumeEntry from "./ResumeEntry.vue";
import ResumeEntryLocation from "./ResumeEntryLocation.vue";
import ResumeEntryOrganization from "./ResumeEntryOrganization.vue";
import ResumeEntryPeriod from "./ResumeEntryPeriod.vue";
import ResumeEntrySummary from "./ResumeEntrySummary.vue";
import ResumeEntryTitle from "./ResumeEntryTitle.vue";
import ResumeEntryHighlights from "./ResumeEntryHighlights.vue";
import ResumeEntryTags from "./ResumeEntryTags.vue";

const { about, contactDetails, isThemeCustomized, theme } =
  storeToRefs(useProfileStore());

const {
  categories,
  isHeaderSimple,
  settings: storeSettings,
  simpleHeaderCategoryName,
} = storeToRefs(useResumeStore());

const settings = computed(() => {
  return isThemeCustomized.value
    ? storeSettings.value
    : themeSettings[theme.value].resume;
});

const asideCategories = computed(() =>
  categories.value.filter(
    (category) => category.isVisible && category.layout === "aside",
  ),
);

const bodyCategories = computed(() =>
  categories.value.filter(
    (category) => category.isVisible && category.layout !== "aside",
  ),
);
</script>

<template>
  <div
    class="flex"
    :class="settings.aside.isRightPositioned ? 'flex-row-reverse' : 'flex-row'"
  >
    <aside
      v-if="
        categories.some(
          (category) => category.isVisible && category.layout === 'aside',
        )
      "
      class="flex flex-col"
      :style="{
        ...getNodeStyle(settings.aside, 'block'),
        width: `${settings.aside.width}%`,
      }"
    >
      <div
        v-if="isHeaderSimple"
        :style="{
          backgroundColor: `${settings.category.backgroundColor}`,
          marginTop: `${settings.category.margin[0]}px`,
          marginRight: `${settings.category.margin[1]}px`,
          marginBottom: `${settings.category.margin[2]}px`,
          marginLeft: `${settings.category.margin[3]}px`,
          borderTop: `${settings.category.borderStyle} ${settings.category.borderColor} ${settings.category.border[0]}px`,
          borderRight: `${settings.category.borderStyle} ${settings.category.borderColor} ${settings.category.border[1]}px`,
          borderBottom: `${settings.category.borderStyle} ${settings.category.borderColor} ${settings.category.border[2]}px`,
          borderLeft: `${settings.category.borderStyle} ${settings.category.borderColor} ${settings.category.border[3]}px`,
          borderRadius: `${settings.category.borderRadius}px`,
          paddingTop: `${settings.category.padding[0]}px`,
          paddingRight: `${settings.category.padding[1]}px`,
          paddingBottom: `${settings.category.padding[2]}px`,
          paddingLeft: `${settings.category.padding[3]}px`,
        }"
      >
        <ResumeCategoryName
          :category-name="simpleHeaderCategoryName"
          :index="-1"
          layout="aside"
        />
        <div
          class="flex flex-col"
          :style="{
            backgroundColor: `${settings.entry.backgroundColor}`,
            marginTop: `${settings.entry.margin[0]}px`,
            marginRight: `${settings.entry.margin[1]}px`,
            marginBottom: `${settings.entry.margin[2]}px`,
            marginLeft: `${settings.entry.margin[3]}px`,
            borderTop: `${settings.entry.borderStyle} ${settings.entry.borderColor} ${settings.entry.border[0]}px`,
            borderRight: `${settings.entry.borderStyle} ${settings.entry.borderColor} ${settings.entry.border[1]}px`,
            borderBottom: `${settings.entry.borderStyle} ${settings.entry.borderColor} ${settings.entry.border[2]}px`,
            borderLeft: `${settings.entry.borderStyle} ${settings.entry.borderColor} ${settings.entry.border[3]}px`,
            borderRadius: `${settings.entry.borderRadius}px`,
            paddingTop: `${settings.entry.padding[0]}px`,
            paddingRight: `${settings.entry.padding[1]}px`,
            paddingBottom: `${settings.entry.padding[2]}px`,
            paddingLeft: `${settings.entry.padding[3]}px`,
            gap: `${settings.entry.gap}px`,
          }"
        >
          <ResumeEntrySummary
            :entry-summary="about"
            :entry-index="-1"
            :category-index="-1"
            category-layout="aside"
          />
          <ResumeEntryHighlights
            :entry-highlights="contactDetails.map((detail) => detail.value)"
            :entry-index="-1"
            :category-index="-1"
            category-layout="aside"
          />
        </div>
      </div>
      <div
        v-for="(category, categoryIndex) in asideCategories"
        :key="categoryIndex"
        :style="{
          backgroundColor: `${settings.category.backgroundColor}`,
          marginTop: `${settings.category.margin[0]}px`,
          marginRight: `${settings.category.margin[1]}px`,
          marginBottom: `${settings.category.margin[2]}px`,
          marginLeft: `${settings.category.margin[3]}px`,
          borderTop: `${settings.category.borderStyle} ${settings.category.borderColor} ${settings.category.border[0]}px`,
          borderRight: `${settings.category.borderStyle} ${settings.category.borderColor} ${settings.category.border[1]}px`,
          borderBottom: `${settings.category.borderStyle} ${settings.category.borderColor} ${settings.category.border[2]}px`,
          borderLeft: `${settings.category.borderStyle} ${settings.category.borderColor} ${settings.category.border[3]}px`,
          borderRadius: `${settings.category.borderRadius}px`,
          paddingTop: `${settings.category.padding[0]}px`,
          paddingRight: `${settings.category.padding[1]}px`,
          paddingBottom: `${settings.category.padding[2]}px`,
          paddingLeft: `${settings.category.padding[3]}px`,
        }"
      >
        <ResumeCategoryName
          :category-name="category.name"
          :index="categoryIndex"
          :layout="category.layout"
        />
        <ul
          class="flex flex-col"
          :style="{
            backgroundColor: `${settings.entry.backgroundColor}`,
            marginTop: `${settings.entry.margin[0]}px`,
            marginRight: `${settings.entry.margin[1]}px`,
            marginBottom: `${settings.entry.margin[2]}px`,
            marginLeft: `${settings.entry.margin[3]}px`,
            borderTop: `${settings.entry.borderStyle} ${settings.entry.borderColor} ${settings.entry.border[0]}px`,
            borderRight: `${settings.entry.borderStyle} ${settings.entry.borderColor} ${settings.entry.border[1]}px`,
            borderBottom: `${settings.entry.borderStyle} ${settings.entry.borderColor} ${settings.entry.border[2]}px`,
            borderLeft: `${settings.entry.borderStyle} ${settings.entry.borderColor} ${settings.entry.border[3]}px`,
            borderRadius: `${settings.entry.borderRadius}px`,
            paddingTop: `${settings.entry.padding[0]}px`,
            paddingRight: `${settings.entry.padding[1]}px`,
            paddingBottom: `${settings.entry.padding[2]}px`,
            paddingLeft: `${settings.entry.padding[3]}px`,
            gap: `${settings.entry.gap}px`,
          }"
        >
          <li
            v-for="(entry, entryIndex) in category.entries"
            :key="entryIndex"
            class="flex flex-col"
          >
            <ResumeEntryPeriod
              v-if="entry.nature === 'experience'"
              :entry-period="entry.period"
              :entry-index="entryIndex"
              :category-index="categoryIndex"
              :category-layout="category.layout"
            />
            <ResumeEntryTitle
              :entry-title="entry.title"
              :entry-index="entryIndex"
              :category-index="categoryIndex"
              :category-layout="category.layout"
            />
            <ResumeEntryOrganization
              v-if="entry.nature === 'experience'"
              :entry-organization="entry.organization"
              :entry-index="entryIndex"
              :category-index="categoryIndex"
              :category-layout="category.layout"
            />
            <ResumeEntryLocation
              v-if="entry.nature === 'experience'"
              :entry-location="entry.location"
              :entry-index="entryIndex"
              :category-index="categoryIndex"
              :category-layout="category.layout"
            />
            <ResumeEntrySummary
              v-if="entry.nature === 'experience'"
              :entry-summary="entry.summary"
              :entry-index="entryIndex"
              :category-index="categoryIndex"
              :category-layout="category.layout"
            />
            <ResumeEntryHighlights
              :entry-highlights="entry.highlights"
              :entry-index="entryIndex"
              :category-index="categoryIndex"
              :category-layout="category.layout"
            />
            <ResumeEntryTags
              :entry-tags="entry.tags"
              :entry-index="entryIndex"
              :category-index="categoryIndex"
              :category-layout="category.layout"
            />
          </li>
        </ul>
      </div>
    </aside>
    <div
      class="flex-1"
      :class="settings.category.isMasonry ? 'columns-2' : 'grid grid-cols-2'"
      :style="{
        ...getNodeStyle(settings.body, 'block'),
        gap: `${settings.category.gap}px`,
      }"
    >
      <section
        v-if="isHeaderSimple && !asideCategories.length"
        class="break-inside-avoid"
        :class="
          getCategoryLayoutClass(bodyCategories[0], settings.category.isMasonry)
        "
        :style="{
          display: settings.categoryName.isAside ? 'flex' : 'block',
          ...getNodeStyle(settings.category, 'block'),
        }"
      >
        <ResumeCategoryName
          :category-name="simpleHeaderCategoryName"
          :index="-1"
          :layout="bodyCategories[0]?.layout"
        />
        <div
          class="flex flex-col flex-1"
          :style="{
            ...getNodeStyle(settings.entry, 'block'),
            gap: `${settings.entry.gap}px`,
          }"
        >
          <ResumeEntrySummary
            :entry-summary="about"
            :entry-index="-1"
            :category-index="-1"
            :category-layout="bodyCategories[0]?.layout"
          />
          <ResumeEntryHighlights
            :entry-highlights="contactDetails.map((detail) => detail.value)"
            :entry-index="-1"
            :category-index="-1"
            :category-layout="bodyCategories[0]?.layout"
          />
        </div>
      </section>
      <section
        v-for="(category, categoryIndex) in bodyCategories"
        :key="categoryIndex"
        class="break-inside-avoid"
        :class="getCategoryLayoutClass(category, settings.category.isMasonry)"
        :style="{
          display: settings.categoryName.isAside ? 'flex' : 'block',
          ...getNodeStyle(settings.category, 'block'),
        }"
      >
        <ResumeCategoryName
          :category-name="category.name"
          :index="categoryIndex"
          :layout="category.layout"
        />
        <ul
          class="flex flex-col flex-1"
          :style="{
            ...getNodeStyle(settings.entry, 'block'),
            gap: `${settings.entry.gap}px`,
          }"
        >
          <li
            v-for="(entry, entryIndex) in category.entries"
            :key="entryIndex"
            class="flex flex-col"
          >
            <ResumeEntry
              :entry="entry"
              :entry-index="entryIndex"
              :category-index="categoryIndex"
              :category-layout="category.layout"
            />
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
