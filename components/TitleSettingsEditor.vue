<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { TitleSettings } from "@/types";
import { useProfileStore } from "@/stores/profile";

const { propertyName, settings } = defineProps<{
  propertyName: string;
  settings: TitleSettings;
}>();

const { isThemeCustomized } = storeToRefs(useProfileStore());
</script>

<template>
  <div class="flex flex-col gap-5 flex-wrap">
    <div class="flex gap-5 flex-wrap">
      <label class="flex flex-col" :for="`${propertyName}Align`">
        <span class="opacity-60">Alignment</span>
        <select
          :id="`${propertyName}Align`"
          class="select block"
          :disabled="!isThemeCustomized"
          v-model="settings.textAlign"
        >
          <option class="option" value="left">left</option>
          <option class="option" value="center">center</option>
          <option class="option" value="right">right</option>
        </select>
      </label>
    </div>
  </div>
</template>
