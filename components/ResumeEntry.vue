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
      <div class="flex gap-2">
        <ResumeEntryPeriod
          v-if="entry.nature === 'experience'"
          :entry-period="entry.period"
        />
        <ResumeEntryTitle :entry-title="entry.title" class="flex-1" />
      </div>
      <div class="flex gap-2">
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
  <template v-else-if="settings.entry.layout === 5">
    <div class="flex flex-col">
      <ResumeEntryPeriod
        v-if="entry.nature === 'experience'"
        :entry-period="entry.period"
        class="self-end"
      />
      <ResumeEntryTitle :entry-title="entry.title" class="flex-1" />
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
    </div>
  </template>
  <template v-else-if="settings.entry.layout === 6">
    <div class="flex flex-col">
      <div class="flex gap-2 items-baseline">
        <ResumeEntryPeriod
          v-if="entry.nature === 'experience'"
          :entry-period="entry.period"
        />
        <div class="flex flex-col flex-1">
          <ResumeEntryTitle :entry-title="entry.title" />
          <div>
            <ResumeEntryOrganization
              v-if="entry.nature === 'experience'"
              :entry-organization="entry.organization"
            />
            <span
              v-if="
                entry.nature === 'experience' &&
                entry.organization &&
                entry.location
              "
              :style="{ fontSize: `${settings.entryLocation.fontSize}px` }"
            >
              &nbsp;-&nbsp;
            </span>
            <ResumeEntryLocation
              v-if="entry.nature === 'experience'"
              :entry-location="entry.location"
            />
          </div>
        </div>
      </div>
      <ResumeEntrySummary
        v-if="entry.nature === 'experience'"
        :entry-summary="entry.summary"
      />
      <ResumeEntryHighlights :entry-highlights="entry.highlights" />
    </div>
  </template>
  <template v-else-if="settings.entry.layout === 7">
    <div class="flex flex-col">
      <ResumeEntryTitle :entry-title="entry.title" />
      <div class="flex justify-between">
        <div>
          <ResumeEntryOrganization
            v-if="entry.nature === 'experience'"
            :entry-organization="entry.organization"
          />
          <!-- prettier-ignore -->
          <span
            v-if="
              entry.nature === 'experience' &&
              entry.organization &&
              entry.location
            "
            :style="{ fontSize: `${settings.entryOrganization.fontSize}px`, color: settings.entryOrganization.color }"
          >,&nbsp;</span>
          <ResumeEntryLocation
            v-if="entry.nature === 'experience'"
            :entry-location="entry.location"
          />
        </div>
        <ResumeEntryPeriod
          v-if="entry.nature === 'experience'"
          :entry-period="entry.period"
        />
      </div>
      <ResumeEntrySummary
        v-if="entry.nature === 'experience'"
        :entry-summary="entry.summary"
      />
      <ResumeEntryHighlights :entry-highlights="entry.highlights" />
    </div>
  </template>
  <template v-else-if="settings.entry.layout === 8">
    <div class="flex flex-col">
      <div>
        <ResumeEntryTitle :entry-title="entry.title" />
        <span
          v-if="
            entry.nature === 'experience' && entry.title && entry.organization
          "
          :style="{ fontSize: `${settings.entryOrganization.fontSize}px` }"
        >
          -
        </span>
        <ResumeEntryOrganization
          v-if="entry.nature === 'experience'"
          :entry-organization="entry.organization"
        />
      </div>
      <div>
        <ResumeEntryPeriod
          v-if="entry.nature === 'experience'"
          :entry-period="entry.period"
        />
        <!-- prettier-ignore -->
        <span
          v-if="
            entry.nature === 'experience' &&
            entry.period &&
            entry.location
          "
          :style="{ fontSize: `${settings.entryPeriod.fontSize}px`, color: settings.entryPeriod.color }"
        >,&nbsp;</span>
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
  <template v-else-if="settings.entry.layout === 9">
    <div class="flex justify-between">
      <div>
        <ResumeEntryTitle :entry-title="entry.title" />
        <span
          v-if="
            entry.nature === 'experience' && entry.title && entry.organization
          "
          :style="{ fontSize: `${settings.entryOrganization.fontSize}px` }"
        >
          &nbsp;|&nbsp;
        </span>
        <ResumeEntryOrganization
          v-if="entry.nature === 'experience'"
          :entry-organization="entry.organization"
        />
        <!-- prettier-ignore -->
        <span
          v-if="
            entry.nature === 'experience' &&
            entry.organization &&
            entry.location
          "
          :style="{ fontSize: `${settings.entryOrganization.fontSize}px`, color: settings.entryOrganization.color }"
        >,&nbsp;</span>
        <ResumeEntryLocation
          v-if="entry.nature === 'experience'"
          :entry-location="entry.location"
        />
      </div>
      <ResumeEntryPeriod
        v-if="entry.nature === 'experience'"
        :entry-period="entry.period"
      />
    </div>
    <ResumeEntrySummary
      v-if="entry.nature === 'experience'"
      :entry-summary="entry.summary"
    />
    <ResumeEntryHighlights :entry-highlights="entry.highlights" />
  </template>
  <template v-else-if="settings.entry.layout === 10">
    <ResumeEntryTitle :entry-title="entry.title" />
    <div>
      <ResumeEntryOrganization
        v-if="entry.nature === 'experience'"
        :entry-organization="entry.organization"
      />
      <span
        v-if="
          entry.nature === 'experience' && entry.organization && entry.location
        "
        :style="{
          fontSize: `${settings.entryLocation.fontSize}px`,
          color: settings.entryLocation.color,
        }"
      >
        &nbsp;|&nbsp;
      </span>
      <ResumeEntryLocation
        v-if="entry.nature === 'experience'"
        :entry-location="entry.location"
      />
      <span
        v-if="entry.nature === 'experience' && entry.location && entry.period"
        :style="{
          fontSize: `${settings.entryPeriod.fontSize}px`,
          color: settings.entryPeriod.color,
        }"
      >
        &nbsp;|&nbsp;
      </span>
      <ResumeEntryPeriod
        v-if="entry.nature === 'experience'"
        :entry-period="entry.period"
      />
    </div>
    <ResumeEntrySummary
      v-if="entry.nature === 'experience'"
      :entry-summary="entry.summary"
    />
    <ResumeEntryHighlights :entry-highlights="entry.highlights" />
  </template>
  <template v-else-if="settings.entry.layout === 11">
    <div class="flex justify-between">
      <ResumeEntryTitle :entry-title="entry.title" />
      <ResumeEntryPeriod
        v-if="entry.nature === 'experience'"
        :entry-period="entry.period"
      />
    </div>
    <div class="flex justify-between">
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
