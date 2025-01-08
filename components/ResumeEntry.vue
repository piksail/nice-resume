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

const { categoryIndex, categoryLayout, entry, entryIndex } = defineProps<{
  categoryIndex: number;
  categoryLayout: Category["layout"];
  entry: Category["entries"][0];
  entryIndex: number;
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
      props: {
        entryTitle: entry.title,
        entryIndex,
        categoryIndex,
        categoryLayout,
      },
    },
    {
      order: settings.value.entryPeriod.order,
      component: ResumeEntryPeriod,
      props: {
        // @ts-expect-error This item is only reached when category nature is experience
        entryPeriod: entry.period,
        entryIndex,
        categoryIndex,
        categoryLayout,
      },
    },
    {
      order: settings.value.entryOrganization.order,
      component: ResumeEntryOrganization,
      props: {
        // @ts-expect-error This item is only reached when category nature is experience
        entryOrganization: entry.organization,
        entryIndex,
        categoryIndex,
        categoryLayout,
      },
    },
    {
      order: settings.value.entryLocation.order,
      component: ResumeEntryLocation,
      props: {
        // @ts-expect-error This item is only reached when category nature is experience
        entryLocation: entry.location,
        entryIndex,
        categoryIndex,
        categoryLayout,
      },
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
  <template v-if="settings.entry.layout === 1">
    <div class="flex items-center">
      <component
        v-if="firstItem"
        :is="firstItem?.component"
        v-bind="firstItem?.props"
        class="flex-1"
      />
      <div>
        <component
          v-if="secondItem && entry.nature === 'experience'"
          :is="secondItem?.component"
          v-bind="secondItem?.props"
        />
        <component
          v-if="thirdItem && entry.nature === 'experience'"
          :is="thirdItem?.component"
          v-bind="thirdItem?.props"
        />
        <component
          v-if="fourthItem && entry.nature === 'experience'"
          :is="fourthItem?.component"
          v-bind="fourthItem?.props"
        />
      </div>
    </div>
    <ResumeEntrySummary
      v-if="entry.nature === 'experience'"
      :entry-summary="entry.summary"
      :entry-index="entryIndex"
      :category-index="categoryIndex"
      :category-layout="categoryLayout"
    />
    <ResumeEntryHighlights
      :entry-highlights="entry.highlights"
      :entry-index="entryIndex"
      :category-index="categoryIndex"
      :category-layout="categoryLayout"
    />
    <ResumeEntryTags
      :entry-tags="entry.tags"
      :entry-index="entryIndex"
      :category-index="categoryIndex"
      :category-layout="categoryLayout"
    />
  </template>
  <template v-else-if="settings.entry.layout === 2">
    <div class="flex justify-between items-center">
      <div class="flex flex-col">
        <component
          v-if="firstItem"
          :is="firstItem?.component"
          v-bind="firstItem?.props"
          class="flex-1"
        />
        <component
          v-if="secondItem && entry.nature === 'experience'"
          :is="secondItem?.component"
          v-bind="secondItem?.props"
        />
      </div>
      <div class="flex flex-col text-right">
        <component
          v-if="thirdItem && entry.nature === 'experience'"
          :is="thirdItem?.component"
          v-bind="thirdItem?.props"
        />
        <component
          v-if="fourthItem && entry.nature === 'experience'"
          :is="fourthItem?.component"
          v-bind="fourthItem?.props"
        />
      </div>
    </div>
    <ResumeEntrySummary
      v-if="entry.nature === 'experience'"
      :entry-summary="entry.summary"
      :entry-index="entryIndex"
      :category-index="categoryIndex"
      :category-layout="categoryLayout"
    />
    <ResumeEntryHighlights
      :entry-highlights="entry.highlights"
      :entry-index="entryIndex"
      :category-index="categoryIndex"
      :category-layout="categoryLayout"
    />
    <ResumeEntryTags
      :entry-tags="entry.tags"
      :entry-index="entryIndex"
      :category-index="categoryIndex"
      :category-layout="categoryLayout"
    />
  </template>
  <template v-else-if="settings.entry.layout === 3">
    <div class="flex">
      <div class="flex flex-col w-[40%]">
        <div class="flex">
          <component
            v-if="firstItem"
            :is="firstItem?.component"
            v-bind="firstItem?.props"
          />
          <component
            v-if="secondItem && entry.nature === 'experience'"
            :is="secondItem?.component"
            v-bind="secondItem?.props"
            class="flex-1"
          />
        </div>
        <div class="flex">
          <component
            v-if="thirdItem && entry.nature === 'experience'"
            :is="thirdItem?.component"
            v-bind="thirdItem?.props"
          />
          <component
            v-if="fourthItem && entry.nature === 'experience'"
            :is="fourthItem?.component"
            v-bind="fourthItem?.props"
          />
        </div>
      </div>
      <div class="w-[60%]">
        <ResumeEntrySummary
          v-if="entry.nature === 'experience'"
          :entry-summary="entry.summary"
          :entry-index="entryIndex"
          :category-index="categoryIndex"
          :category-layout="categoryLayout"
        />
        <ResumeEntryHighlights
          :entry-highlights="entry.highlights"
          :entry-index="entryIndex"
          :category-index="categoryIndex"
          :category-layout="categoryLayout"
        />
        <ResumeEntryTags
          :entry-tags="entry.tags"
          :entry-index="entryIndex"
          :category-index="categoryIndex"
          :category-layout="categoryLayout"
        />
      </div>
    </div>
  </template>
  <template v-else-if="settings.entry.layout === 4">
    <div class="flex flex-col">
      <div class="flex">
        <component
          v-if="firstItem"
          :is="firstItem?.component"
          v-bind="firstItem?.props"
        />
        <component
          v-if="secondItem && entry.nature === 'experience'"
          :is="secondItem?.component"
          v-bind="secondItem?.props"
          class="flex-1"
        />
      </div>
      <div class="flex">
        <component
          v-if="thirdItem && entry.nature === 'experience'"
          :is="thirdItem?.component"
          v-bind="thirdItem?.props"
        />
        <component
          v-if="fourthItem && entry.nature === 'experience'"
          :is="fourthItem?.component"
          v-bind="fourthItem?.props"
        />
      </div>
      <ResumeEntrySummary
        v-if="entry.nature === 'experience'"
        :entry-summary="entry.summary"
        :entry-index="entryIndex"
        :category-index="categoryIndex"
        :category-layout="categoryLayout"
      />
      <ResumeEntryHighlights
        :entry-highlights="entry.highlights"
        :entry-index="entryIndex"
        :category-index="categoryIndex"
        :category-layout="categoryLayout"
      />
      <ResumeEntryTags
        :entry-tags="entry.tags"
        :entry-index="entryIndex"
        :category-index="categoryIndex"
        :category-layout="categoryLayout"
      />
    </div>
  </template>
  <template v-else-if="settings.entry.layout === 5">
    <div class="flex flex-col">
      <component
        v-if="firstItem"
        :is="firstItem?.component"
        v-bind="firstItem?.props"
        class="self-end"
      />
      <component
        v-if="secondItem && entry.nature === 'experience'"
        :is="secondItem?.component"
        v-bind="secondItem?.props"
        class="flex-1"
      />
      <component
        v-if="thirdItem && entry.nature === 'experience'"
        :is="thirdItem?.component"
        v-bind="thirdItem?.props"
      />
      <component
        v-if="fourthItem && entry.nature === 'experience'"
        :is="fourthItem?.component"
        v-bind="fourthItem?.props"
      />
      <ResumeEntrySummary
        v-if="entry.nature === 'experience'"
        :entry-summary="entry.summary"
        :entry-index="entryIndex"
        :category-index="categoryIndex"
        :category-layout="categoryLayout"
      />
      <ResumeEntryHighlights
        :entry-highlights="entry.highlights"
        :entry-index="entryIndex"
        :category-index="categoryIndex"
        :category-layout="categoryLayout"
      />
      <ResumeEntryTags
        :entry-tags="entry.tags"
        :entry-index="entryIndex"
        :category-index="categoryIndex"
        :category-layout="categoryLayout"
      />
    </div>
  </template>
  <template v-else-if="settings.entry.layout === 6">
    <div class="flex flex-col">
      <div class="flex items-baseline">
        <component
          v-if="firstItem"
          :is="firstItem?.component"
          v-bind="firstItem?.props"
        />
        <div class="flex flex-col flex-1">
          <component
            v-if="secondItem && entry.nature === 'experience'"
            :is="secondItem?.component"
            v-bind="secondItem?.props"
          />
          <div>
            <component
              v-if="thirdItem && entry.nature === 'experience'"
              :is="thirdItem?.component"
              v-bind="thirdItem?.props"
            />
            <component
              v-if="fourthItem && entry.nature === 'experience'"
              :is="fourthItem?.component"
              v-bind="fourthItem?.props"
            />
          </div>
        </div>
      </div>
      <ResumeEntrySummary
        v-if="entry.nature === 'experience'"
        :entry-summary="entry.summary"
        :entry-index="entryIndex"
        :category-index="categoryIndex"
        :category-layout="categoryLayout"
      />
      <ResumeEntryHighlights
        :entry-highlights="entry.highlights"
        :entry-index="entryIndex"
        :category-index="categoryIndex"
        :category-layout="categoryLayout"
      />
      <ResumeEntryTags
        :entry-tags="entry.tags"
        :entry-index="entryIndex"
        :category-index="categoryIndex"
        :category-layout="categoryLayout"
      />
    </div>
  </template>
  <template v-else-if="settings.entry.layout === 7">
    <div class="flex flex-col">
      <component
        v-if="firstItem"
        :is="firstItem?.component"
        v-bind="firstItem?.props"
      />
      <div class="flex justify-between">
        <div>
          <component
            v-if="secondItem && entry.nature === 'experience'"
            :is="secondItem?.component"
            v-bind="secondItem?.props"
          />
          <component
            v-if="thirdItem && entry.nature === 'experience'"
            :is="thirdItem?.component"
            v-bind="thirdItem?.props"
          />
        </div>
        <component
          v-if="fourthItem && entry.nature === 'experience'"
          :is="fourthItem?.component"
          v-bind="fourthItem?.props"
        />
      </div>
      <ResumeEntrySummary
        v-if="entry.nature === 'experience'"
        :entry-summary="entry.summary"
        :entry-index="entryIndex"
        :category-index="categoryIndex"
        :category-layout="categoryLayout"
      />
      <ResumeEntryHighlights
        :entry-highlights="entry.highlights"
        :entry-index="entryIndex"
        :category-index="categoryIndex"
        :category-layout="categoryLayout"
      />
      <ResumeEntryTags
        :entry-tags="entry.tags"
        :entry-index="entryIndex"
        :category-index="categoryIndex"
        :category-layout="categoryLayout"
      />
    </div>
  </template>
  <template v-else-if="settings.entry.layout === 8">
    <div class="flex flex-col">
      <div>
        <component
          v-if="firstItem"
          :is="firstItem?.component"
          v-bind="firstItem?.props"
        />
        <component
          v-if="secondItem && entry.nature === 'experience'"
          :is="secondItem?.component"
          v-bind="secondItem?.props"
        />
      </div>
      <div>
        <component
          v-if="thirdItem && entry.nature === 'experience'"
          :is="thirdItem?.component"
          v-bind="thirdItem?.props"
        />
        <component
          v-if="fourthItem && entry.nature === 'experience'"
          :is="fourthItem?.component"
          v-bind="fourthItem?.props"
        />
      </div>
      <ResumeEntrySummary
        v-if="entry.nature === 'experience'"
        :entry-summary="entry.summary"
        :entry-index="entryIndex"
        :category-index="categoryIndex"
        :category-layout="categoryLayout"
      />
      <ResumeEntryHighlights
        :entry-highlights="entry.highlights"
        :entry-index="entryIndex"
        :category-index="categoryIndex"
        :category-layout="categoryLayout"
      />
      <ResumeEntryTags
        :entry-tags="entry.tags"
        :entry-index="entryIndex"
        :category-index="categoryIndex"
        :category-layout="categoryLayout"
      />
    </div>
  </template>
  <template v-else-if="settings.entry.layout === 9">
    <div class="flex justify-between">
      <div>
        <component
          v-if="firstItem"
          :is="firstItem?.component"
          v-bind="firstItem?.props"
        />
        <component
          v-if="secondItem && entry.nature === 'experience'"
          :is="secondItem?.component"
          v-bind="secondItem?.props"
        />
        <component
          v-if="thirdItem && entry.nature === 'experience'"
          :is="thirdItem?.component"
          v-bind="thirdItem?.props"
        />
      </div>
      <component
        v-if="fourthItem && entry.nature === 'experience'"
        :is="fourthItem?.component"
        v-bind="fourthItem?.props"
      />
    </div>
    <ResumeEntrySummary
      v-if="entry.nature === 'experience'"
      :entry-summary="entry.summary"
      :entry-index="entryIndex"
      :category-index="categoryIndex"
      :category-layout="categoryLayout"
    />
    <ResumeEntryHighlights
      :entry-highlights="entry.highlights"
      :entry-index="entryIndex"
      :category-index="categoryIndex"
      :category-layout="categoryLayout"
    />
    <ResumeEntryTags
      :entry-tags="entry.tags"
      :entry-index="entryIndex"
      :category-index="categoryIndex"
      :category-layout="categoryLayout"
    />
  </template>
  <template v-else-if="settings.entry.layout === 10">
    <component
      v-if="firstItem"
      :is="firstItem?.component"
      v-bind="firstItem?.props"
    />
    <div>
      <component
        v-if="secondItem && entry.nature === 'experience'"
        :is="secondItem?.component"
        v-bind="secondItem?.props"
      />
      <component
        v-if="thirdItem && entry.nature === 'experience'"
        :is="thirdItem?.component"
        v-bind="thirdItem?.props"
      />
      <component
        v-if="fourthItem && entry.nature === 'experience'"
        :is="fourthItem?.component"
        v-bind="fourthItem?.props"
      />
    </div>
    <ResumeEntrySummary
      v-if="entry.nature === 'experience'"
      :entry-summary="entry.summary"
      :entry-index="entryIndex"
      :category-index="categoryIndex"
      :category-layout="categoryLayout"
    />
    <ResumeEntryHighlights
      :entry-highlights="entry.highlights"
      :entry-index="entryIndex"
      :category-index="categoryIndex"
      :category-layout="categoryLayout"
    />
    <ResumeEntryTags
      :entry-tags="entry.tags"
      :entry-index="entryIndex"
      :category-index="categoryIndex"
      :category-layout="categoryLayout"
    />
  </template>
  <template v-else-if="settings.entry.layout === 11">
    <div class="flex justify-between">
      <component
        v-if="firstItem"
        :is="firstItem?.component"
        v-bind="firstItem?.props"
      />
      <component
        v-if="secondItem && entry.nature === 'experience'"
        :is="secondItem?.component"
        v-bind="secondItem?.props"
      />
    </div>
    <div class="flex justify-between">
      <component
        v-if="thirdItem && entry.nature === 'experience'"
        :is="thirdItem?.component"
        v-bind="thirdItem?.props"
      />
      <component
        v-if="fourthItem && entry.nature === 'experience'"
        :is="fourthItem?.component"
        v-bind="fourthItem?.props"
      />
    </div>
    <ResumeEntrySummary
      v-if="entry.nature === 'experience'"
      :entry-summary="entry.summary"
      :entry-index="entryIndex"
      :category-index="categoryIndex"
      :category-layout="categoryLayout"
    />
    <ResumeEntryHighlights
      :entry-highlights="entry.highlights"
      :entry-index="entryIndex"
      :category-index="categoryIndex"
      :category-layout="categoryLayout"
    />
    <ResumeEntryTags
      :entry-tags="entry.tags"
      :entry-index="entryIndex"
      :category-index="categoryIndex"
      :category-layout="categoryLayout"
    />
  </template>
  <template v-else-if="settings.entry.layout === 12">
    <div class="flex justify-between">
      <component
        v-if="firstItem"
        :is="firstItem?.component"
        v-bind="firstItem?.props"
      />
      <component
        v-if="secondItem && entry.nature === 'experience'"
        :is="secondItem?.component"
        v-bind="secondItem?.props"
      />
    </div>
    <component
      v-if="thirdItem && entry.nature === 'experience'"
      :is="thirdItem?.component"
      v-bind="thirdItem?.props"
    />
    <component
      v-if="fourthItem && entry.nature === 'experience'"
      :is="fourthItem?.component"
      v-bind="fourthItem?.props"
    />
    <ResumeEntrySummary
      v-if="entry.nature === 'experience'"
      :entry-summary="entry.summary"
      :entry-index="entryIndex"
      :category-index="categoryIndex"
      :category-layout="categoryLayout"
    />
    <ResumeEntryHighlights
      :entry-highlights="entry.highlights"
      :entry-index="entryIndex"
      :category-index="categoryIndex"
      :category-layout="categoryLayout"
    />
    <ResumeEntryTags
      :entry-tags="entry.tags"
      :entry-index="entryIndex"
      :category-index="categoryIndex"
      :category-layout="categoryLayout"
    />
  </template>
  <template v-else-if="settings.entry.layout === 13">
    <div class="flex">
      <div class="flex flex-col w-[25%]">
        <component
          v-if="firstItem"
          :is="firstItem?.component"
          v-bind="firstItem?.props"
        />
        <component
          v-if="secondItem && entry.nature === 'experience'"
          :is="secondItem?.component"
          v-bind="secondItem?.props"
        />
        <component
          v-if="thirdItem && entry.nature === 'experience'"
          :is="thirdItem?.component"
          v-bind="thirdItem?.props"
        />
        <component
          v-if="fourthItem && entry.nature === 'experience'"
          :is="fourthItem?.component"
          v-bind="fourthItem?.props"
        />
      </div>
      <div class="w-[75%]">
        <ResumeEntrySummary
          v-if="entry.nature === 'experience'"
          :entry-summary="entry.summary"
          :entry-index="entryIndex"
          :category-index="categoryIndex"
          :category-layout="categoryLayout"
        />
        <ResumeEntryHighlights
          :entry-highlights="entry.highlights"
          :entry-index="entryIndex"
          :category-index="categoryIndex"
          :category-layout="categoryLayout"
        />
        <ResumeEntryTags
          :entry-tags="entry.tags"
          :entry-index="entryIndex"
          :category-index="categoryIndex"
          :category-layout="categoryLayout"
        />
      </div>
    </div>
  </template>
  <template v-else>
    <div class="flex items-center">
      <component
        v-if="firstItem"
        :is="firstItem?.component"
        v-bind="firstItem?.props"
      />
      <component
        v-if="secondItem && entry.nature === 'experience'"
        :is="secondItem?.component"
        v-bind="secondItem?.props"
      />
      <component
        v-if="thirdItem && entry.nature === 'experience'"
        :is="thirdItem?.component"
        v-bind="thirdItem?.props"
      />
      <component
        v-if="fourthItem && entry.nature === 'experience'"
        :is="fourthItem?.component"
        v-bind="fourthItem?.props"
      />
    </div>
    <ResumeEntrySummary
      v-if="entry.nature === 'experience'"
      :entry-summary="entry.summary"
      :entry-index="entryIndex"
      :category-index="categoryIndex"
      :category-layout="categoryLayout"
    />
    <ResumeEntryHighlights
      :entry-highlights="entry.highlights"
      :entry-index="entryIndex"
      :category-index="categoryIndex"
      :category-layout="categoryLayout"
    />
    <ResumeEntryTags
      :entry-tags="entry.tags"
      :entry-index="entryIndex"
      :category-index="categoryIndex"
      :category-layout="categoryLayout"
    />
  </template>
</template>
