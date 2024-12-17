<script setup lang="ts">
import { storeToRefs } from "pinia";
import ScrollPanel from "primevue/scrollpanel";
import { useEditorStore } from "@/stores/editor";
import { useResumeStore } from "@/stores/resume";
import { getCategoryIconClass, getEntryHeading } from "@/utils/editor";
import EmailEditor from "@/fragments/EmailEditor.vue";
import LetterEditor from "@/fragments/LetterEditor.vue";
import ProfileEditor from "@/fragments/ProfileEditor.vue";
import ResumeEditor from "@/fragments/ResumeEditor.vue";
import TheHeader from "@/components/TheHeader.vue";
import Preview from "./Preview.vue";
import EditorCategory from "./EditorCategory.vue";
import PreviewZoom from "./PreviewZoom.vue";

const { documentType } = storeToRefs(useEditorStore());

const { categories } = storeToRefs(useResumeStore());
</script>

<template>
  <div class="print:hidden flex flex-col xl:w-[calc(100%-210mm)] h-screen">
    <TheHeader />
    <div class="flex">
      <aside>
        <ScrollPanel class="h-[calc(100vh-80px)]">
          <nav
            class="flex flex-col gap-3 text-white p-4 pr-0 lg:p-8 text-sm md:text-base"
          >
            <div class="xl:hidden flex gap-2 items-center w-fit">
              <i class="pi pi-file-check" />
              <a href="#Preview" class="underline-offset-4 hover:underline">
                {{ capitalize($t("preview")) }}
              </a>
            </div>
            <div class="flex gap-2 items-center w-fit">
              <i class="pi pi-user" />
              <a href="#Profile" class="underline-offset-4 hover:underline">
                {{ capitalize($t("profile")) }}
              </a>
            </div>
            <div
              v-if="documentType === 'email'"
              class="flex gap-2 items-center w-fit"
            >
              <i class="pi pi-inbox" />
              <a href="#Signature" class="underline-offset-4 hover:underline">
                {{ capitalize($t("signature")) }}
              </a>
            </div>
            <template v-else-if="documentType === 'letter'">
              <div class="flex gap-2 items-center w-fit">
                <i class="pi pi-envelope" />
                <a href="#Header" class="underline-offset-4 hover:underline">
                  {{ capitalize($t("header")) }}
                </a>
              </div>
              <div class="flex gap-2 items-center w-fit">
                <i class="pi pi-align-left" />
                <a href="#Body" class="underline-offset-4 hover:underline">
                  {{ capitalize($t("body")) }}
                </a>
              </div>
            </template>
            <template v-else>
              <div
                v-for="(category, categoryIndex) in categories"
                :key="categoryIndex"
              >
                <div class="flex gap-2 items-center w-fit">
                  <i class="pi" :class="getCategoryIconClass(category.type)" />
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
                  class="ml-6"
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
        </ScrollPanel>
      </aside>
      <main class="relative h-[calc(100vh-80px)] overflow-y-auto flex flex-1">
        <section class="w-full overflow-y-auto scroll-smooth">
          <div
            class="flex flex-col gap-4 lg:gap-8 p-4 lg:p-8 max-w-[860px] mx-auto"
          >
            <EditorCategory id="Preview" class="block xl:hidden">
              <template v-slot:header>
                <div class="flex items-center gap-8">
                  <div>{{ capitalize($t("preview")) }}</div>
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
      </main>
    </div>
  </div>
</template>
