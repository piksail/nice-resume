<script setup lang="ts">
import type { RegionCode } from "~/types";
import BrFlag from "@/assets/flags/br.svg";
import DeFlag from "@/assets/flags/de.svg";
import EsFlag from "@/assets/flags/es.svg";
import FrFlag from "@/assets/flags/fr.svg";
import ItFlag from "@/assets/flags/it.svg";
import UkFlag from "@/assets/flags/uk.svg";

const { code } = defineProps<{
  code: RegionCode;
}>();

const flag = {
  br: BrFlag,
  de: DeFlag,
  es: EsFlag,
  fr: FrFlag,
  it: ItFlag,
  uk: UkFlag,
};
</script>

<template>
  <component :is="flag[code]" :aria-label="$t('toSwitchLanguage')" />
</template>
