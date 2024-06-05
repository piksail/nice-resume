<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { templateSettings } from "@/globals";
import type { Category } from "@/types";

const { entry } = defineProps<{
  entry: Category["entries"][0];
}>();

const { isThemeCustomized, template } = storeToRefs(useProfileStore());

const { settings: storeSettings } = storeToRefs(useResumeStore());

const settings = computed(() => {
  return isThemeCustomized.value
    ? storeSettings.value
    : templateSettings[template.value].resume;
});
</script>

<template>
  <template v-if="settings.entry.layout === 1">
    <div class="flex gap-4 items-center">
      <ResumeEntryTitle :entry-title="entry.title" class="flex-1" />
      <div>
        <ResumeEntryOrganization
          v-if="entry.nature === 'experience'"
          :entry-organization="entry.organization"
        />
        &nbsp;·&nbsp;
        <ResumeEntryPeriod
          v-if="entry.nature === 'experience'"
          :entry-period="entry.period"
        />
        &nbsp;·&nbsp;
        <ResumeEntryLocation
          v-if="entry.nature === 'experience'"
          :entry-location="entry.location"
        />
      </div>
    </div>
    <ResumeEntrySummary
      v-if="entry.nature === 'experience'"
      :entry-summary="entry.summary"
    />
    <ResumeEntryHighlights :entry-highlights="entry.highlights" />
  </template>
  <template v-else-if="settings.entry.layout === 2">
    <div class="flex justify-between gap-4 items-center">
      <div class="flex flex-col">
        <ResumeEntryTitle :entry-title="entry.title" class="flex-1" />
        <ResumeEntryOrganization
          v-if="entry.nature === 'experience'"
          :entry-organization="entry.organization"
        />
      </div>
      <div class="flex flex-col text-right">
        <ResumeEntryPeriod
          v-if="entry.nature === 'experience'"
          :entry-period="entry.period"
        />
        <ResumeEntryLocation
          v-if="entry.nature === 'experience'"
          :entry-location="entry.location"
        />
      </div>
    </div>
    <ResumeEntrySummary
      v-if="entry.nature === 'experience'"
      :entry-summary="entry.summary"
    />
    <ResumeEntryHighlights :entry-highlights="entry.highlights" />
  </template>
  <template v-else-if="settings.entry.layout === 3">
    <div class="flex">
      <div class="flex flex-col w-[40%]">
        <div class="flex">
          <ResumeEntryPeriod
            v-if="entry.nature === 'experience'"
            :entry-period="entry.period"
          />
          <ResumeEntryTitle :entry-title="entry.title" class="flex-1" />
        </div>
        <div class="flex">
          <ResumeEntryOrganization
            v-if="entry.nature === 'experience'"
            :entry-organization="entry.organization"
          />
          <ResumeEntryLocation
            v-if="entry.nature === 'experience'"
            :entry-location="entry.location"
          />
        </div>
      </div>
      <div class="w-[60%]">
        <ResumeEntrySummary
          v-if="entry.nature === 'experience'"
          :entry-summary="entry.summary"
        />
        <ResumeEntryHighlights :entry-highlights="entry.highlights" />
      </div>
    </div>
  </template>
  <template v-else-if="settings.entry.layout === 4">
    <div class="flex flex-col">
      <div class="flex">
        <ResumeEntryPeriod
          v-if="entry.nature === 'experience'"
          :entry-period="entry.period"
        />
        <ResumeEntryTitle :entry-title="entry.title" class="flex-1" />
      </div>
      <div class="flex">
        <ResumeEntryOrganization
          v-if="entry.nature === 'experience'"
          :entry-organization="entry.organization"
        />
        <ResumeEntryLocation
          v-if="entry.nature === 'experience'"
          :entry-location="entry.location"
        />
      </div>
      <ResumeEntrySummary
        v-if="entry.nature === 'experience'"
        :entry-summary="entry.summary"
      />
      <ResumeEntryHighlights :entry-highlights="entry.highlights" />
    </div>
  </template>
  <template v-else>
    <!-- TODO customize gap-4 here -->
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
    <ResumeEntrySummary
      v-if="entry.nature === 'experience'"
      :entry-summary="entry.summary"
    />
    <ResumeEntryHighlights :entry-highlights="entry.highlights" />
  </template>
</template>
