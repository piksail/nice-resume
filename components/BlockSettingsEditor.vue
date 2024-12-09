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
  <div class="formBlock">
    <div>
      <div class="text-sm font-semibold">{{ capitalize($t("margin")) }}</div>
      <div class="flex gap-5 flex-wrap">
        <Field
          v-for="i in 4"
          :key="i"
          :id="`${propertyName}Margin`"
          :label="$t(getSideIndexLabel(i))"
          type="number"
          :disabled="!isThemeCustomized"
          v-model="settings.margin[i - 1]"
        />
      </div>
    </div>
    <div>
      <div class="text-sm font-semibold">{{ capitalize($t("border")) }}</div>
      <div class="flex gap-5 flex-wrap">
        <Field
          v-for="i in 4"
          :key="i"
          :id="`${propertyName}Border`"
          :label="$t(getSideIndexLabel(i))"
          type="number"
          :disabled="!isThemeCustomized"
          v-model="settings.border[i - 1]"
        />
        <Field
          :id="`${propertyName}BorderColor`"
          :label="$t('color')"
          type="color"
          :disabled="!isThemeCustomized"
          v-model="settings.borderColor"
        />
        <Field
          :id="`${propertyName}BorderRadius`"
          :label="$t('radius')"
          type="number"
          :disabled="!isThemeCustomized"
          v-model="settings.borderRadius"
        />
      </div>
    </div>
    <div>
      <div class="text-sm font-semibold">{{ capitalize($t("padding")) }}</div>
      <div class="flex gap-5 flex-wrap">
        <Field
          v-for="i in 4"
          :key="i"
          :id="`${propertyName}Padding`"
          :label="$t(getSideIndexLabel(i))"
          type="number"
          :disabled="!isThemeCustomized"
          v-model="settings.padding[i - 1]"
        />
        <Field
          :id="`${propertyName}BackgroundColor`"
          :label="$t('color')"
          type="color"
          :disabled="!isThemeCustomized"
          v-model="settings.backgroundColor"
        />
      </div>
    </div>
  </div>
</template>
