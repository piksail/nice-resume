<script setup lang="ts">
import { storeToRefs } from "pinia";
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
import { capitalize } from "@/utils/string";

const { documentType } = storeToRefs(useEditorStore());

const { categories } = storeToRefs(useResumeStore());

const { t } = useI18n();

const items = computed(() => {
  const items = [
    {
      label: capitalize(t("profile")),
      icon: "i-lucide-user",
      onSelect: () => {
        document.getElementById("Profile")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      },
    },
  ];

  if (documentType.value === "email") {
    return [
      ...items,
      {
        label: capitalize(t("signature")),
        icon: "i-lucide-signature",
        onSelect: () => {
          document.getElementById("Signature")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        },
      },
    ];
  }

  if (documentType.value === "letter") {
    return [
      ...items,
      {
        label: capitalize(t("header")),
        icon: "i-lucide-mail-question-mark",
        onSelect: () => {
          document.getElementById("Header")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        },
      },
      {
        label: capitalize(t("body")),
        icon: "i-lucide-file-type-corner",
        onSelect: () => {
          document.getElementById("Body")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        },
      },
    ];
  }

  if (documentType.value === "resume") {
    return [
      ...items,
      ...categories.value.map((category) => ({
        label: category.name,
        icon: getCategoryIconClass(category.type),
        onSelect: () => {
          document.getElementById(category.name)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        },
        badge: category.entries.length,
        children: category.entries.map((entry, entryIndex) => ({
          label: getEntryHeading(entry, entryIndex),
          onSelect: () => {
            document
              .getElementById(getEntryHeading(entry, entryIndex))
              ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
          },
        })),
      })),
    ];
  }
  return items;
});
</script>

<template>
  <div class="print:hidden flex flex-col xl:w-[calc(100%-210mm)] h-screen">
    <TheHeader />
    <div class="flex">
      <aside>
        <UScrollArea class="h-[calc(100vh-80px)]">
          <UNavigationMenu
            orientation="vertical"
            :items="items"
            class="data-[orientation=vertical]:w-60"
          />
        </UScrollArea>
      </aside>
      <main class="relative h-[calc(100vh-80px)] overflow-y-auto flex flex-1">
        <section class="w-full overflow-y-scroll scroll-smooth">
          <div class="flex flex-col gap-4 p-4 max-w-[860px] mx-auto">
            <EditorCategory
              id="Preview"
              :title="capitalize(t('preview'))"
              icon="i-lucide-view"
              class="block xl:hidden"
            >
              <template #header>
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
