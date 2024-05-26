<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { templateSettings } from "@/globals";
import type { ListMarker } from "@/types";

const { isThemeCustomized, template } = storeToRefs(useProfileStore());

const { categories, settings: storeSettings } = storeToRefs(useResumeStore());

const settings = computed(() => {
  return isThemeCustomized.value
    ? storeSettings.value
    : templateSettings[template.value].resume;
});

function getListMarker(value: ListMarker) {
  switch (value) {
    case "hyphen":
      return "'- '";
    case null:
      return "none";
    default:
      return value;
  }
}
</script>

<template>
  <div class="flex gap-4">
    <aside
      v-if="categories.some((category) => category.layout === 'aside')"
      class="w-[20%] flex flex-col gap-6"
    >
      <div
        v-for="(category, categoryIndex) in categories.filter(
          (category) => category.layout === 'aside',
        )"
        :key="categoryIndex"
      >
        <h3
          class="uppercase font-bold text-sm bg-[color:var(--resume-color0)] text-[color:var(--resume-color2)] p-1 pl-8 w-[64%] relative z-20"
        >
          {{ category.name }}
        </h3>
        <div
          class="z-10 relative bottom-1 w-[65%] h-2 bg-[color:var(--resume-color1)]"
        />
        <ul class="flex flex-col gap-4 p-2 pl-8">
          <li
            v-for="(entry, entryIndex) in category.entries"
            :key="entryIndex"
            class="flex flex-col"
          >
            <div>
              <span v-if="entry.nature === 'experience' && entry.period">
                {{ entry.period }}

                -{{ " " }}
              </span>
              <span class="font-semibold" v-if="entry.title">
                {{ entry.title }}
              </span>
              <span v-if="entry.nature === 'experience' && entry.organization">
                {{ " " }}-{{ " " }}
                <span class="italic">{{ entry.organization }}</span>
                <template v-if="entry.location">,{{ entry.location }}</template>
              </span>
            </div>
            <p
              v-if="entry.nature === 'experience' && entry.summary"
              class="before:content-[''] before:inline-block before:mr-1 before:size-2 before:bg-[color:var(--resume-color0)]"
            >
              {{ entry.summary }}
            </p>
            <ul v-if="entry.highlights.length">
              <li
                v-for="(highlight, highlightIndex) in entry.highlights"
                :key="highlightIndex"
              >
                {{ highlight }}
              </li>
            </ul>
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
        <!-- <h3 TODO
          class="uppercase font-bold text-sm bg-[color:var(--resume-color0)] text-[color:var(--resume-color2)] p-1 pl-8 w-[64%] relative z-20"
        >
          {{ category.name }}
        </h3> -->
        <h3
          :style="{
            fontFamily: settings.categoryName.font,
            fontSize: `${settings.categoryName.fontSize}px`,
            lineHeight: settings.categoryName.lineHeight,
            fontWeight: settings.categoryName.fontWeight,
            fontStyle: settings.categoryName.isItalic ? 'italic' : 'initial',
            textTransform: settings.categoryName.isUppercase
              ? 'uppercase'
              : 'initial',
            color: settings.categoryName.color,
          }"
        >
          {{ category.name }}
        </h3>
        <div
          class="z-10 relative bottom-1 w-[65%] h-2 bg-[color:var(--resume-color1)]"
        />
        <ul class="flex flex-col gap-4 p-2 px-8">
          <li
            v-for="(entry, entryIndex) in category.entries"
            :key="entryIndex"
            class="flex flex-col"
          >
            <div class="flex gap-4 items-center">
              <!-- <span v-if="entry.nature === 'experience' && entry.period">
                {{ entry.period }}

                -{{ " " }}
              </span> -->
              <span
                v-if="entry.nature === 'experience' && entry.period"
                :style="{
                  fontFamily: settings.entryPeriod.font,
                  fontSize: `${settings.entryPeriod.fontSize}px`,
                  lineHeight: settings.entryPeriod.lineHeight,
                  fontWeight: settings.entryPeriod.fontWeight,
                  fontStyle: settings.entryPeriod.isItalic
                    ? 'italic'
                    : 'initial',
                  textTransform: settings.entryPeriod.isUppercase
                    ? 'uppercase'
                    : 'initial',
                  color: settings.entryPeriod.color,
                }"
              >
                {{ entry.period }}
              </span>
              <!-- TODO <span class="font-semibold" v-if="entry.title">
                {{ entry.title }}
              </span> -->
              <span
                :style="{
                  fontFamily: settings.entryTitle.font,
                  fontSize: `${settings.entryTitle.fontSize}px`,
                  lineHeight: settings.entryTitle.lineHeight,
                  fontWeight: settings.entryTitle.fontWeight,
                  fontStyle: settings.entryTitle.isItalic
                    ? 'italic'
                    : 'initial',
                  textTransform: settings.entryTitle.isUppercase
                    ? 'uppercase'
                    : 'initial',
                  color: settings.entryTitle.color,
                }"
              >
                {{ entry.title }}
              </span>
              <span
                v-if="entry.nature === 'experience' && entry.location"
                :style="{
                  fontFamily: settings.entryLocation.font,
                  fontSize: `${settings.entryLocation.fontSize}px`,
                  lineHeight: settings.entryLocation.lineHeight,
                  fontWeight: settings.entryLocation.fontWeight,
                  fontStyle: settings.entryLocation.isItalic
                    ? 'italic'
                    : 'initial',
                  textTransform: settings.entryLocation.isUppercase
                    ? 'uppercase'
                    : 'initial',
                  color: settings.entryLocation.color,
                }"
              >
                {{ entry.location }}
              </span>
              <!-- TODO <span v-if="entry.nature === 'experience' && entry.organization">
                {{ " " }}-{{ " " }}
                <span class="italic">{{ entry.organization }}</span>
                <template v-if="entry.location">,{{ entry.location }}</template>
              </span> -->
              <span
                v-if="entry.nature === 'experience' && entry.organization"
                :style="{
                  fontFamily: settings.entryOrganization.font,
                  fontSize: `${settings.entryOrganization.fontSize}px`,
                  lineHeight: settings.entryOrganization.lineHeight,
                  fontWeight: settings.entryOrganization.fontWeight,
                  fontStyle: settings.entryOrganization.isItalic
                    ? 'italic'
                    : 'initial',
                  textTransform: settings.entryOrganization.isUppercase
                    ? 'uppercase'
                    : 'initial',
                  color: settings.entryOrganization.color,
                }"
              >
                {{ entry.organization }}
              </span>
              <div
                v-if="entry.nature === 'experience'"
                class="flex-1 bg-[color:var(--resume-color0)] h-1"
              />
            </div>
            <div class="pl-4">
              <!-- TODO <p
                v-if="entry.nature === 'experience' && entry.summary"
                class="before:content-[''] before:inline-block before:mr-1 before:size-2 before:bg-[color:var(--resume-color0)]"
              >
                {{ entry.summary }}
              </p> -->
              <p
                v-if="entry.nature === 'experience' && entry.summary"
                :style="{
                  fontFamily: settings.entrySummary.font,
                  fontSize: `${settings.entrySummary.fontSize}px`,
                  lineHeight: settings.entrySummary.lineHeight,
                  fontWeight: settings.entrySummary.fontWeight,
                  fontStyle: settings.entrySummary.isItalic
                    ? 'italic'
                    : 'initial',
                  textTransform: settings.entrySummary.isUppercase
                    ? 'uppercase'
                    : 'initial',
                  color: settings.entrySummary.color,
                }"
              >
                {{ entry.summary }}
              </p>
              <ul
                v-if="entry.highlights.length"
                :style="{
                  listStyleType: getListMarker(
                    settings.entryHighlight.listMarker,
                  ),
                  color: settings.entryHighlight.listMarkerColor,
                }"
              >
                <li
                  v-for="(highlight, highlightIndex) in entry.highlights"
                  :key="highlightIndex"
                  :style="{
                    fontFamily: settings.entryHighlight.font,
                    fontSize: `${settings.entryHighlight.fontSize}px`,
                    lineHeight: settings.entryHighlight.lineHeight,
                    fontWeight: settings.entryHighlight.fontWeight,
                    fontStyle: settings.entryHighlight.isItalic
                      ? 'italic'
                      : 'initial',
                    textTransform: settings.entryHighlight.isUppercase
                      ? 'uppercase'
                      : 'initial',
                  }"
                >
                  <span :style="{ color: settings.entryHighlight.color }">
                    {{ highlight }}
                  </span>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
