<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";

import { useEditorStore } from "@/stores/editor";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { templateBaseSettings, templateSettings } from "@/globals";
import { getSideIndexLabel } from "@/utils/editor";
import Button from "@/components/Button.vue";
import EditorCategory from "@/components/EditorCategory.vue";
import Field from "@/components/Field.vue";

const { documentType } = storeToRefs(useEditorStore());

const { customColors, isThemeCustomized, template } =
  storeToRefs(useProfileStore());

const { settings: storeSettings } = storeToRefs(useResumeStore());

const settings = computed(() => {
  return isThemeCustomized.value
    ? storeSettings.value
    : templateSettings[template.value].resume;
});

const templateColors = computed(() => {
  return isThemeCustomized.value
    ? customColors.value
    : templateBaseSettings[template.value].colors;
});

function resetStyle() {
  storeSettings.value = templateSettings[template.value].resume;
}

function setCssVariable(name: string, value: string) {
  const root = document.querySelector(":root");
  // Rely on CSS variables to allow pseudo-element styling in templates
  (root as HTMLElement).style.setProperty(`--${name}`, value);
}

function setThemeColors() {
  templateColors.value.forEach((color, index) => {
    setCssVariable(`${documentType.value}-color${index}`, color);
  });
}

onMounted(() => {
  setThemeColors();
});

watch(
  [template, isThemeCustomized, templateColors],
  () => {
    setThemeColors();
  },
  { deep: true },
);
</script>

<template>
  <EditorCategory id="Customization">
    <template v-slot:header>Customization</template>
    <ul class="flex flex-col gap-10 mb-4">
      <li class="sectionSeparator">
        <div class="flex gap-5">
          <Field
            type="toggle"
            label="Use custom theme"
            v-model="isThemeCustomized"
          />
          <Button v-if="isThemeCustomized" @click="resetStyle">
            Reset style
          </Button>
        </div>
      </li>
      <li class="sectionSeparator">
        <header>
          <div class="sectionHeading">Palette</div>
        </header>
        <div class="flex gap-5">
          <Field
            v-for="(_color, index) in templateColors"
            :key="index"
            :id="`color${index}`"
            type="color"
            label="Color"
            :disabled="!isThemeCustomized"
            v-model="templateColors[index]"
          />
        </div>
      </li>
      <li>
        <header>
          <div class="sectionHeading">Document</div>
        </header>
        <div class="flex gap-5">
          <Field
            v-for="i in 4"
            :key="i"
            :id="`documentMargin${i}`"
            class="w-[20%]"
            type="number"
            :label="`Margin ${getSideIndexLabel(i)}`"
            :disabled="!isThemeCustomized"
            v-model="settings.document.padding[i - 1]"
          />
        </div>
      </li>
    </ul>
  </EditorCategory>
</template>
