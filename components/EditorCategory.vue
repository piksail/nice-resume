<script setup lang="ts">
import Panel from "primevue/panel";

const { id, hidden, locked } = defineProps<{
  id: string;
  hidden?: boolean;
  locked?: boolean;
}>();
</script>

<template>
  <Panel
    :id="id"
    :collapsed="hidden || locked"
    :toggleable="!locked"
    class="!border-none"
    :class="
      hidden
        ? '!bg-transparent [&_.p-panel-header]:!bg-transparent [&_.p-panel-header]:!line-through [&_.p-panel-header]:!text-white'
        : ''
    "
    pt:header:class="!border-none !rounded"
    pt:content:class="!bg-white/10 !border-none !p-10"
    pt:footer:class="!bg-white/10 !border-none !pt-0 !pb-10"
  >
    <template #header>
      <slot name="header" />
    </template>
    <slot v-if="!locked" />
    <template #icons>
      <slot name="icons" />
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </Panel>
</template>
