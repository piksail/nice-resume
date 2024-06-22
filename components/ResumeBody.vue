<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { fixedLayoutTemplates, templateSettings } from "@/globals";
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

const { isThemeCustomized, template } = storeToRefs(useProfileStore());

const {
  about,
  categories,
  contactDetails,
  isHeaderSimple,
  settings: storeSettings,
} = storeToRefs(useResumeStore());

const settings = computed(() => {
  return isThemeCustomized.value
    ? storeSettings.value
    : templateSettings[template.value].resume;
});

const isLayoutFixed = computed(() =>
  fixedLayoutTemplates.includes(template.value),
);

const asideCategories = computed(() =>
  categories.value.filter(
    (category) => category.isVisible && category.layout === "aside",
  ),
);

const bodyCategories = computed(() =>
  categories.value.filter(
    (category) =>
      category.isVisible &&
      ((!isLayoutFixed.value && category.layout !== "aside") ||
        isLayoutFixed.value),
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
        !isLayoutFixed &&
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
          backgroundColor: settings.category.backgroundColor,
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
        <!-- TODO allow custom name -->
        <ResumeCategoryName :category-name="'About'" />
        <div
          class="flex flex-col"
          :style="{
            backgroundColor: settings.entry.backgroundColor,
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
          <ResumeEntrySummary :entry-summary="about" />
          <ResumeEntryHighlights
            :entry-highlights="contactDetails.map((detail) => detail.value)"
          />
        </div>
      </div>
      <div
        v-for="(category, categoryIndex) in asideCategories"
        :key="categoryIndex"
        :style="{
          backgroundColor: settings.category.backgroundColor,
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
        <ResumeCategoryName :category-name="category.name" />
        <ul
          class="flex flex-col"
          :style="{
            backgroundColor: settings.entry.backgroundColor,
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
            />
            <ResumeEntryTitle :entry-title="entry.title" />
            <ResumeEntryOrganization
              v-if="entry.nature === 'experience'"
              :entry-organization="entry.organization"
            />
            <ResumeEntryLocation
              v-if="entry.nature === 'experience'"
              :entry-location="entry.location"
            />
            <ResumeEntrySummary
              v-if="entry.nature === 'experience'"
              :entry-summary="entry.summary"
            />
            <ResumeEntryHighlights :entry-highlights="entry.highlights" />
            <ResumeEntryTags :entry-tags="entry.tags" />
          </li>
        </ul>
      </div>
    </aside>
    <div
      class="grid grid-cols-2 flex-1"
      :style="{
        ...getNodeStyle(settings.body, 'block'),
        gap: `${settings.category.gap}px`,
      }"
    >
      <section
        v-if="isHeaderSimple && (!asideCategories.length || isLayoutFixed)"
        :class="
          bodyCategories[0]?.layout === 'half' && !isLayoutFixed
            ? 'col-span-1'
            : 'col-span-2'
        "
        :style="{
          display: settings.categoryName.isAside ? 'flex' : 'initial',
          ...getNodeStyle(settings.category, 'block'),
        }"
      >
        <!-- TODO allow custom name -->
        <ResumeCategoryName :category-name="'About'" />
        <div
          class="flex flex-col flex-1"
          :style="{
            ...getNodeStyle(settings.entry, 'block'),
            gap: `${settings.entry.gap}px`,
          }"
        >
          <ResumeEntrySummary :entry-summary="about" />
          <ResumeEntryHighlights
            :entry-highlights="contactDetails.map((detail) => detail.value)"
          />
        </div>
      </section>
      <section
        v-for="(category, categoryIndex) in bodyCategories"
        :key="categoryIndex"
        :class="
          category.layout === 'half' && !isLayoutFixed
            ? 'col-span-1'
            : 'col-span-2'
        "
        :style="{
          display: settings.categoryName.isAside ? 'flex' : 'initial',
          ...getNodeStyle(settings.category, 'block'),
        }"
      >
        <ResumeCategoryName :category-name="category.name" />
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
            <ResumeEntry :entry="entry" />
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
