<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { themeSettings } from "@/globals";
import type { Category } from "@/types";
import ResumeEntryLocation from "./ResumeEntryLocation.vue";
import ResumeEntryOrganization from "./ResumeEntryOrganization.vue";
import ResumeEntryPeriod from "./ResumeEntryPeriod.vue";
import ResumeEntrySummary from "./ResumeEntrySummary.vue";
import ResumeEntryTitle from "./ResumeEntryTitle.vue";
import ResumeEntryHighlights from "./ResumeEntryHighlights.vue";
import ResumeEntryTags from "./ResumeEntryTags.vue";

const { entry } = defineProps<{
  entry: Category["entries"][0];
}>();

const { isThemeCustomized, theme } = storeToRefs(useProfileStore());

const { settings: storeSettings } = storeToRefs(useResumeStore());

const settings = computed(() => {
  return isThemeCustomized.value
    ? storeSettings.value
    : themeSettings[theme.value].resume;
});

const experienceHeaderItems = computed(() => {
  return [
    {
      order: settings.value.entryTitle.order,
      component: ResumeEntryTitle,
      props: { entryTitle: entry.title },
    },
    {
      order: settings.value.entryPeriod.order,
      component: ResumeEntryPeriod,
      // @ts-expect-error This item is only reached when category nature is experience
      props: { entryPeriod: entry.period },
    },
    {
      order: settings.value.entryOrganization.order,
      component: ResumeEntryOrganization,
      // @ts-expect-error This item is only reached when category nature is experience
      props: { entryOrganization: entry.organization },
    },
    {
      order: settings.value.entryLocation.order,
      component: ResumeEntryLocation,
      // @ts-expect-error This item is only reached when category nature is experience
      props: { entryLocation: entry.location },
    },
  ];
});

const firstItem = computed(() => {
  return entry.nature === "asset"
    ? experienceHeaderItems.value[0]
    : experienceHeaderItems.value.find((item) => item.order === 1);
});
const secondItem = computed(() => {
  return experienceHeaderItems.value.find((item) => item.order === 2);
});
const thirdItem = computed(() => {
  return experienceHeaderItems.value.find((item) => item.order === 3);
});
const fourthItem = computed(() => {
  return experienceHeaderItems.value.find((item) => item.order === 4);
});
</script>

<template>
  <!-- TODO remove all flex gaps and think about away to style them -->
  <template v-if="settings.entry.layout === 1">
    <div class="flex gap-4 items-center">
      <component
        :is="firstItem?.component"
        v-bind="firstItem?.props"
        class="flex-1"
      />
      <div>
        <component
          v-if="entry.nature === 'experience'"
          :is="secondItem?.component"
          v-bind="secondItem?.props"
        />
        <component
          v-if="entry.nature === 'experience'"
          :is="thirdItem?.component"
          v-bind="thirdItem?.props"
        />
        <component
          v-if="entry.nature === 'experience'"
          :is="fourthItem?.component"
          v-bind="fourthItem?.props"
        />
      </div>
    </div>
    <ResumeEntrySummary
      v-if="entry.nature === 'experience'"
      :entry-summary="entry.summary"
    />
    <ResumeEntryHighlights :entry-highlights="entry.highlights" />
    <ResumeEntryTags :entry-tags="entry.tags" />
  </template>
  <template v-else-if="settings.entry.layout === 2">
    <div class="flex justify-between gap-4 items-center">
      <div class="flex flex-col">
        <component
          :is="firstItem?.component"
          v-bind="firstItem?.props"
          class="flex-1"
        />
        <component
          v-if="entry.nature === 'experience'"
          :is="secondItem?.component"
          v-bind="secondItem?.props"
        />
      </div>
      <div class="flex flex-col text-right">
        <component
          v-if="entry.nature === 'experience'"
          :is="thirdItem?.component"
          v-bind="thirdItem?.props"
        />
        <component
          v-if="entry.nature === 'experience'"
          :is="fourthItem?.component"
          v-bind="fourthItem?.props"
        />
      </div>
    </div>
    <ResumeEntrySummary
      v-if="entry.nature === 'experience'"
      :entry-summary="entry.summary"
    />
    <ResumeEntryHighlights :entry-highlights="entry.highlights" />
    <ResumeEntryTags :entry-tags="entry.tags" />
  </template>
  <template v-else-if="settings.entry.layout === 3">
    <div class="flex">
      <div class="flex flex-col w-[40%]">
        <div class="flex gap-2">
          <component :is="firstItem?.component" v-bind="firstItem?.props" />
          <component
            v-if="entry.nature === 'experience'"
            :is="secondItem?.component"
            v-bind="secondItem?.props"
            class="flex-1"
          />
        </div>
        <div class="flex gap-2">
          <component
            v-if="entry.nature === 'experience'"
            :is="thirdItem?.component"
            v-bind="thirdItem?.props"
          />
          <component
            v-if="entry.nature === 'experience'"
            :is="fourthItem?.component"
            v-bind="fourthItem?.props"
          />
        </div>
      </div>
      <div class="w-[60%]">
        <ResumeEntrySummary
          v-if="entry.nature === 'experience'"
          :entry-summary="entry.summary"
        />
        <ResumeEntryHighlights :entry-highlights="entry.highlights" />
        <ResumeEntryTags :entry-tags="entry.tags" />
      </div>
    </div>
  </template>
  <template v-else-if="settings.entry.layout === 4">
    <div class="flex flex-col">
      <div class="flex gap-2">
        <component :is="firstItem?.component" v-bind="firstItem?.props" />
        <component
          v-if="entry.nature === 'experience'"
          :is="secondItem?.component"
          v-bind="secondItem?.props"
          class="flex-1"
        />
      </div>
      <div class="flex gap-2">
        <component
          v-if="entry.nature === 'experience'"
          :is="thirdItem?.component"
          v-bind="thirdItem?.props"
        />
        <component
          v-if="entry.nature === 'experience'"
          :is="fourthItem?.component"
          v-bind="fourthItem?.props"
        />
      </div>
      <ResumeEntrySummary
        v-if="entry.nature === 'experience'"
        :entry-summary="entry.summary"
      />
      <ResumeEntryHighlights :entry-highlights="entry.highlights" />
      <ResumeEntryTags :entry-tags="entry.tags" />
    </div>
  </template>
  <template v-else-if="settings.entry.layout === 5">
    <div class="flex flex-col">
      <component
        :is="firstItem?.component"
        v-bind="firstItem?.props"
        class="self-end"
      />
      <component
        v-if="entry.nature === 'experience'"
        :is="secondItem?.component"
        v-bind="secondItem?.props"
        class="flex-1"
      />
      <component
        v-if="entry.nature === 'experience'"
        :is="thirdItem?.component"
        v-bind="thirdItem?.props"
      />
      <component
        v-if="entry.nature === 'experience'"
        :is="fourthItem?.component"
        v-bind="fourthItem?.props"
      />
      <ResumeEntrySummary
        v-if="entry.nature === 'experience'"
        :entry-summary="entry.summary"
      />
      <ResumeEntryHighlights :entry-highlights="entry.highlights" />
      <ResumeEntryTags :entry-tags="entry.tags" />
    </div>
  </template>
  <template v-else-if="settings.entry.layout === 6">
    <div class="flex flex-col">
      <div class="flex gap-2 items-baseline">
        <component :is="firstItem?.component" v-bind="firstItem?.props" />
        <div class="flex flex-col flex-1">
          <component
            v-if="entry.nature === 'experience'"
            :is="secondItem?.component"
            v-bind="secondItem?.props"
          />
          <div>
            <component
              v-if="entry.nature === 'experience'"
              :is="thirdItem?.component"
              v-bind="thirdItem?.props"
            />
            <component
              v-if="entry.nature === 'experience'"
              :is="fourthItem?.component"
              v-bind="fourthItem?.props"
            />
          </div>
        </div>
      </div>
      <ResumeEntrySummary
        v-if="entry.nature === 'experience'"
        :entry-summary="entry.summary"
      />
      <ResumeEntryHighlights :entry-highlights="entry.highlights" />
      <ResumeEntryTags :entry-tags="entry.tags" />
    </div>
  </template>
  <template v-else-if="settings.entry.layout === 7">
    <div class="flex flex-col">
      <component :is="firstItem?.component" v-bind="firstItem?.props" />
      <div class="flex justify-between">
        <div>
          <component
            v-if="entry.nature === 'experience'"
            :is="secondItem?.component"
            v-bind="secondItem?.props"
          />
          <component
            v-if="entry.nature === 'experience'"
            :is="thirdItem?.component"
            v-bind="thirdItem?.props"
          />
        </div>
        <component
          v-if="entry.nature === 'experience'"
          :is="fourthItem?.component"
          v-bind="fourthItem?.props"
        />
      </div>
      <ResumeEntrySummary
        v-if="entry.nature === 'experience'"
        :entry-summary="entry.summary"
      />
      <ResumeEntryHighlights :entry-highlights="entry.highlights" />
      <ResumeEntryTags :entry-tags="entry.tags" />
    </div>
  </template>
  <template v-else-if="settings.entry.layout === 8">
    <div class="flex flex-col">
      <div>
        <component :is="firstItem?.component" v-bind="firstItem?.props" />
        <component
          v-if="entry.nature === 'experience'"
          :is="secondItem?.component"
          v-bind="secondItem?.props"
        />
      </div>
      <div>
        <component
          v-if="entry.nature === 'experience'"
          :is="thirdItem?.component"
          v-bind="thirdItem?.props"
        />
        <component
          v-if="entry.nature === 'experience'"
          :is="fourthItem?.component"
          v-bind="fourthItem?.props"
        />
      </div>
      <ResumeEntrySummary
        v-if="entry.nature === 'experience'"
        :entry-summary="entry.summary"
      />
      <ResumeEntryHighlights :entry-highlights="entry.highlights" />
      <ResumeEntryTags :entry-tags="entry.tags" />
    </div>
  </template>
  <template v-else-if="settings.entry.layout === 9">
    <div class="flex justify-between">
      <div>
        <component :is="firstItem?.component" v-bind="firstItem?.props" />
        <component
          v-if="entry.nature === 'experience'"
          :is="secondItem?.component"
          v-bind="secondItem?.props"
        />
        <component
          v-if="entry.nature === 'experience'"
          :is="thirdItem?.component"
          v-bind="thirdItem?.props"
        />
      </div>
      <component
        v-if="entry.nature === 'experience'"
        :is="fourthItem?.component"
        v-bind="fourthItem?.props"
      />
    </div>
    <ResumeEntrySummary
      v-if="entry.nature === 'experience'"
      :entry-summary="entry.summary"
    />
    <ResumeEntryHighlights :entry-highlights="entry.highlights" />
    <ResumeEntryTags :entry-tags="entry.tags" />
  </template>
  <template v-else-if="settings.entry.layout === 10">
    <component :is="firstItem?.component" v-bind="firstItem?.props" />
    <div>
      <component
        v-if="entry.nature === 'experience'"
        :is="secondItem?.component"
        v-bind="secondItem?.props"
      />
      <component
        v-if="entry.nature === 'experience'"
        :is="thirdItem?.component"
        v-bind="thirdItem?.props"
      />
      <component
        v-if="entry.nature === 'experience'"
        :is="fourthItem?.component"
        v-bind="fourthItem?.props"
      />
    </div>
    <ResumeEntrySummary
      v-if="entry.nature === 'experience'"
      :entry-summary="entry.summary"
    />
    <ResumeEntryHighlights :entry-highlights="entry.highlights" />
    <ResumeEntryTags :entry-tags="entry.tags" />
  </template>
  <template v-else-if="settings.entry.layout === 11">
    <div class="flex justify-between">
      <component :is="firstItem?.component" v-bind="firstItem?.props" />
      <component
        v-if="entry.nature === 'experience'"
        :is="secondItem?.component"
        v-bind="secondItem?.props"
      />
    </div>
    <div class="flex justify-between">
      <component
        v-if="entry.nature === 'experience'"
        :is="thirdItem?.component"
        v-bind="thirdItem?.props"
      />
      <component
        v-if="entry.nature === 'experience'"
        :is="fourthItem?.component"
        v-bind="fourthItem?.props"
      />
    </div>
    <ResumeEntrySummary
      v-if="entry.nature === 'experience'"
      :entry-summary="entry.summary"
    />
    <ResumeEntryHighlights :entry-highlights="entry.highlights" />
    <ResumeEntryTags :entry-tags="entry.tags" />
  </template>
  <template v-else-if="settings.entry.layout === 12">
    <div class="flex justify-between">
      <component :is="firstItem?.component" v-bind="firstItem?.props" />
      <component
        v-if="entry.nature === 'experience'"
        :is="secondItem?.component"
        v-bind="secondItem?.props"
      />
    </div>
    <component
      v-if="entry.nature === 'experience'"
      :is="thirdItem?.component"
      v-bind="thirdItem?.props"
    />
    <component
      v-if="entry.nature === 'experience'"
      :is="fourthItem?.component"
      v-bind="fourthItem?.props"
    />
    <ResumeEntrySummary
      v-if="entry.nature === 'experience'"
      :entry-summary="entry.summary"
    />
    <ResumeEntryHighlights :entry-highlights="entry.highlights" />
    <ResumeEntryTags :entry-tags="entry.tags" />
  </template>
  <template v-else-if="settings.entry.layout === 13">
    <div class="flex">
      <div class="flex flex-col w-[25%]">
        <component :is="firstItem?.component" v-bind="firstItem?.props" />
        <component
          v-if="entry.nature === 'experience'"
          :is="secondItem?.component"
          v-bind="secondItem?.props"
        />
        <component
          v-if="entry.nature === 'experience'"
          :is="thirdItem?.component"
          v-bind="thirdItem?.props"
        />
        <component
          v-if="entry.nature === 'experience'"
          :is="fourthItem?.component"
          v-bind="fourthItem?.props"
        />
      </div>
      <div class="w-[75%]">
        <ResumeEntrySummary
          v-if="entry.nature === 'experience'"
          :entry-summary="entry.summary"
        />
        <ResumeEntryHighlights :entry-highlights="entry.highlights" />
        <ResumeEntryTags :entry-tags="entry.tags" />
      </div>
    </div>
  </template>
  <template v-else>
    <div class="flex items-center">
      <component :is="firstItem?.component" v-bind="firstItem?.props" />
      <component
        v-if="entry.nature === 'experience'"
        :is="secondItem?.component"
        v-bind="secondItem?.props"
      />
      <component
        v-if="entry.nature === 'experience'"
        :is="thirdItem?.component"
        v-bind="thirdItem?.props"
      />
      <component
        v-if="entry.nature === 'experience'"
        :is="fourthItem?.component"
        v-bind="fourthItem?.props"
      />
    </div>
    <ResumeEntrySummary
      v-if="entry.nature === 'experience'"
      :entry-summary="entry.summary"
    />
    <ResumeEntryHighlights :entry-highlights="entry.highlights" />
    <ResumeEntryTags :entry-tags="entry.tags" />
  </template>
</template>
