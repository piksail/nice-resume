<script setup lang="ts">
import { type Component } from "vue";
import { storeToRefs } from "pinia";
import {
  AcademicCapIcon,
  BookOpenIcon,
  BriefcaseIcon,
  CheckBadgeIcon,
  CubeIcon,
  DocumentCheckIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  EnvelopeOpenIcon,
  HeartIcon,
  LanguageIcon,
  LifebuoyIcon,
  TrophyIcon,
  UserIcon,
  WrenchIcon,
} from "@heroicons/vue/16/solid";
import type { Category } from "@/types";
import { useEditorStore } from "@/stores/editor";
import { useResumeStore } from "@/stores/resume";
import { getEntryHeading } from "@/utils/editor";
import EmailEditor from "@/fragments/EmailEditor.vue";
import LetterEditor from "@/fragments/LetterEditor.vue";
import ProfileEditor from "@/fragments/ProfileEditor.vue";
import ResumeEditor from "@/fragments/ResumeEditor.vue";
import StyleEditor from "@/fragments/StyleEditor.vue";
import TheHeader from "@/components/TheHeader.vue";
import Preview from "./Preview.vue";
import EditorCategory from "./EditorCategory.vue";
import PreviewZoom from "./PreviewZoom.vue";

const { documentType } = storeToRefs(useEditorStore());

const { categories } = storeToRefs(useResumeStore());

function getCategoryIcon(categoryType: Category["type"]) {
  const iconMapper: { [key in Category["type"]]: Component } = {
    award: TrophyIcon,
    certificate: CheckBadgeIcon,
    education: AcademicCapIcon,
    interest: HeartIcon,
    language: LanguageIcon,
    project: CubeIcon,
    publication: BookOpenIcon,
    skill: WrenchIcon,
    voluntary: LifebuoyIcon,
    work: BriefcaseIcon,
  };
  return iconMapper[categoryType];
}
</script>

<template>
  <div class="print:hidden flex flex-col xl:w-[calc(100%-210mm)] h-screen">
    <TheHeader />
    <div class="flex">
      <aside>
        <nav
          class="flex flex-col gap-x-5 gap-y-2 text-white p-4 pr-0 lg:p-8 text-sm md:text-base"
        >
          <a
            href="#Preview"
            class="flex xl:hidden underline-offset-4 hover:underline gap-1 items-center w-fit"
          >
            <DocumentCheckIcon class="w-4" />
            Preview
          </a>
          <a
            href="#Profile"
            class="underline-offset-4 hover:underline flex gap-1 items-center w-fit"
          >
            <UserIcon class="w-4" />
            Profile
          </a>
          <a
            v-if="documentType === 'email'"
            href="#Signature"
            class="underline-offset-4 hover:underline flex gap-1 items-center w-fit"
          >
            <EnvelopeIcon class="w-4" />
            Signature
          </a>
          <template v-else-if="documentType === 'letter'">
            <a
              href="#Header"
              class="underline-offset-4 hover:underline flex gap-1 items-center w-fit"
            >
              <EnvelopeOpenIcon class="w-4" />
              Header
            </a>
            <a
              href="#Body"
              class="underline-offset-4 hover:underline flex gap-1 items-center w-fit"
            >
              <DocumentTextIcon class="w-4" />
              Body
            </a>
          </template>
          <template v-else>
            <div
              v-for="(category, categoryIndex) in categories"
              :key="categoryIndex"
            >
              <div class="flex gap-1 items-center w-fit">
                <component :is="getCategoryIcon(category.type)" class="w-4" />
                <a
                  :href="`#${category.name}`"
                  class="underline-offset-4 hover:underline"
                >
                  {{ category.name }}
                </a>
              </div>
              <ol
                v-for="(entry, entryIndex) in category.entries"
                :key="entryIndex"
                class="ml-5"
              >
                <li>
                  <!-- We cannot have underline effect and overflow-ellipsis effect, so the border-bottom is used to simulate underline -->
                  <a
                    :href="`#${getEntryHeading(entry, entryIndex)}`"
                    class="border-transparent border-b-[1px] hover:border-white block truncate line-clamp-1 max-w-40 w-fit text-sm"
                  >
                    {{ getEntryHeading(entry, entryIndex) }}
                  </a>
                </li>
              </ol>
            </div>
          </template>
        </nav>
      </aside>
      <main
        class="relative h-[calc(100vh-100px)] overflow-y-auto flex text-white flex-1"
      >
        <section class="w-full overflow-y-auto scroll-smooth">
          <div
            class="flex flex-col gap-4 lg:gap-8 p-4 lg:p-8 max-w-[860px] mx-auto"
          >
            <EditorCategory id="Preview" class="block xl:hidden">
              <template v-slot:header>
                <div class="flex items-center gap-8">
                  <div>Preview</div>
                  <PreviewZoom />
                </div>
              </template>
              <Preview />
            </EditorCategory>
            <ProfileEditor />
            <EmailEditor v-if="documentType === 'email'" />
            <LetterEditor v-else-if="documentType === 'letter'" />
            <ResumeEditor v-else />
          </div>
        </section>
        <footer
          class="fixed z-10 bottom-4 left-4 lg:bottom-8 lg:left-8 overflow-x-auto"
        >
          <StyleEditor />
        </footer>
      </main>
    </div>
  </div>
</template>
