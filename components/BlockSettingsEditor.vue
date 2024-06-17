<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { BlockSettings } from "@/types";
import { useProfileStore } from "@/stores/profile";
import { getSideIndexLabel } from "@/utils/editor";
import Field from "@/components/Field.vue";

const { propertyName, settings } = defineProps<{
  propertyName: string;
  settings: BlockSettings;
}>();

const { isThemeCustomized } = storeToRefs(useProfileStore());
</script>

<template>
  <div class="flex flex-col gap-5">
    <div class="flex gap-5 flex-wrap">
      <Field
        v-for="i in 4"
        :key="i"
        :id="`${propertyName}Margin`"
        :label="`Margin ${getSideIndexLabel(i)}`"
        type="number"
        :disabled="!isThemeCustomized"
        v-model="settings.margin[i - 1]"
      />
    </div>
    <div class="flex gap-5 flex-wrap">
      <Field
        v-for="i in 4"
        :key="i"
        :id="`${propertyName}Border`"
        :label="`Border ${getSideIndexLabel(i)}`"
        type="number"
        :disabled="!isThemeCustomized"
        v-model="settings.border[i - 1]"
      />
      <Field
        :id="`${propertyName}BorderColor`"
        label="Border color"
        type="color"
        :disabled="!isThemeCustomized"
        v-model="settings.borderColor"
      />
      <Field
        :id="`${propertyName}BorderRadius`"
        label="Border radius"
        type="number"
        :disabled="!isThemeCustomized"
        v-model="settings.borderRadius"
      />
    </div>
    <div class="flex gap-5 flex-wrap">
      <Field
        v-for="i in 4"
        :key="i"
        :id="`${propertyName}Padding`"
        :label="`Padding ${getSideIndexLabel(i)}`"
        type="number"
        :disabled="!isThemeCustomized"
        v-model="settings.padding[i - 1]"
      />
      <Field
        :id="`${propertyName}BackgroundColor`"
        label="Background color"
        type="color"
        :disabled="!isThemeCustomized"
        v-model="settings.backgroundColor"
      />
    </div>
  </div>
</template>
