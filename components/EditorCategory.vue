<script setup lang="ts">
const { id, hidden, locked } = defineProps<{
  id: string;
  title: string;
  icon: string;
  hidden?: boolean;
  locked?: boolean;
}>();
</script>

<template>
  <div class="flex gap-4">
    <UCollapsible
      :id="id"
      :collapsed="hidden || locked"
      :disabled="locked"
      class="w-full"
    >
      <UButton
        :label="title"
        :icon="icon"
        color="neutral"
        variant="subtle"
        trailing-icon="i-lucide-chevron-down"
        block
        :ui="{
          trailingIcon:
            'group-data-[state=open]:rotate-180 transition-transform duration-200',
        }"
        class="group"
      />
      <template #content>
        <UCard variant="soft">
          <template v-if="$slots.header" #header>
            <slot name="header" />
          </template>
          <slot v-if="!locked" />
          <template #icons>
            <slot name="icons" />
          </template>
          <template v-if="$slots.footer" #footer>
            <slot name="footer" />
          </template>
        </UCard>
      </template>
    </UCollapsible>
    <div><slot name="actions" /></div>
  </div>
</template>
