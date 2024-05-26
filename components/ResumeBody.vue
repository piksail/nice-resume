<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { templateSettings } from "@/globals";
import ResumeCategoryName from "./ResumeCategoryName.vue";
import ResumeEntryLocation from "./ResumeEntryLocation.vue";
import ResumeEntryOrganization from "./ResumeEntryOrganization.vue";
import ResumeEntryPeriod from "./ResumeEntryPeriod.vue";
import ResumeEntrySummary from "./ResumeEntrySummary.vue";
import ResumeEntryTitle from "./ResumeEntryTitle.vue";
import ResumeEntryHighlights from "./ResumeEntryHighlights.vue";

const { isThemeCustomized, template } = storeToRefs(useProfileStore());

const { categories, settings: storeSettings } = storeToRefs(useResumeStore());

const settings = computed(() => {
  return isThemeCustomized.value
    ? storeSettings.value
    : templateSettings[template.value].resume;
});
</script>

<template>
  <div class="flex gap-4">
    <aside
      v-if="categories.some((category) => category.layout === 'aside')"
      class="flex flex-col gap-6"
      :style="{
        width: `${settings.asideWidth}%`,
      }"
    >
      <div
        v-for="(category, categoryIndex) in categories.filter(
          (category) => category.layout === 'aside',
        )"
        :key="categoryIndex"
      >
        <ResumeCategoryName :category-name="category.name" />
        <ul class="flex flex-col gap-4 p-2 pl-8">
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
          </li>
        </ul>
      </div>
    </aside>
    <div class="grid grid-cols-2 gap-6 flex-1">
      <section
        v-for="(category, categoryIndex) in categories.filter(
          (category) => category.layout !== 'aside',
        )"
        :key="categoryIndex"
        :class="category.layout === 'half' ? 'col-span-1' : 'col-span-2'"
      >
        <ResumeCategoryName :category-name="category.name" />
        <ul class="flex flex-col gap-4 p-2 px-8">
          <li
            v-for="(entry, entryIndex) in category.entries"
            :key="entryIndex"
            class="flex flex-col"
          >
            <div class="flex gap-4 items-center">
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
            </div>
            <div class="pl-4">
              <ResumeEntrySummary
                v-if="entry.nature === 'experience'"
                :entry-summary="entry.summary"
              />
              <ResumeEntryHighlights :entry-highlights="entry.highlights" />
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
