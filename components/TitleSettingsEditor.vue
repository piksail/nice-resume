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
      <Field
        :id="`${propertyName}Align`"
        type="select"
        :label="$t('alignment')"
        v-model="settings.textAlign"
        :options="['left', 'center', 'right']"
        :disabled="!isThemeCustomized"
      />
    </div>
  </div>
</template>
