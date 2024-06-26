<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { TextSettings } from "@/types";
import { useProfileStore } from "@/stores/profile";
import { fonts } from "@/globals";
import Field from "@/components/Field.vue";

const { propertyName, settings } = defineProps<{
  propertyName: string;
  settings: TextSettings;
}>();

const { isThemeCustomized } = storeToRefs(useProfileStore());
</script>

<template>
  <div class="flex flex-col gap-5 flex-wrap">
    <div class="flex gap-5 flex-wrap">
      <label class="flex flex-col" :for="`${propertyName}Font`">
        <span class="label">Font</span>
        <select
          :id="`${propertyName}Font`"
          class="select block"
          :disabled="!isThemeCustomized"
          v-model="settings.font"
        >
          <option class="option" value="inherit">
            default (inherit from document font)
          </option>
          <option v-for="font in fonts" :key="font" class="option">
            {{ font }}
          </option>
        </select>
      </label>
      <Field
        :id="`${propertyName}FontSize`"
        label="Font size"
        type="number"
        :disabled="!isThemeCustomized"
        v-model="settings.fontSize"
      />
      <Field
        :id="`${propertyName}LineHeight`"
        label="Line height"
        type="number"
        :disabled="!isThemeCustomized"
        v-model="settings.lineHeight"
        step="0.1"
      />
      <Field
        :id="`${propertyName}LetterSpacing`"
        label="Letter spacing"
        type="number"
        :disabled="!isThemeCustomized"
        v-model="settings.letterSpacing"
      />
    </div>
    <div class="flex gap-5 flex-wrap">
      <label class="flex flex-col" :for="`${propertyName}FontWeight`">
        <span class="label">Font weight</span>
        <select
          :id="`${propertyName}FontWeight`"
          v-model="settings.fontWeight"
          class="select block"
          :disabled="!isThemeCustomized"
        >
          <option v-for="i in 9" :key="i" class="option">
            {{ `${i}00` }}
          </option>
        </select>
      </label>
      <Field
        :id="`${propertyName}IsItalic`"
        label="Italic"
        type="checkbox"
        :disabled="!isThemeCustomized"
        v-model="settings.isItalic"
      />
      <Field
        :id="`${propertyName}IsUppercase`"
        label="Uppercase"
        type="checkbox"
        :disabled="!isThemeCustomized"
        v-model="settings.isUppercase"
      />
      <Field
        :id="`${propertyName}Color`"
        label="Color"
        type="color"
        :disabled="!isThemeCustomized"
        v-model="settings.color"
      />
    </div>
  </div>
</template>
