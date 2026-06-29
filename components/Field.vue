<script setup lang="ts">
import { storeToRefs } from "pinia";
import { capitalize } from "@/utils/string";
import { useEditorStore } from "@/stores/editor";
import type {
  AcceptableValue,
  CheckboxGroupItem,
  RadioGroupItem,
  SelectItem,
} from "@nuxt/ui";

type FieldType =
  | "checkbox"
  | "checkbutton"
  | "color"
  | "number"
  | "range"
  | "select"
  | "selectbutton"
  | "text"
  | "textarea"
  | "toggle";

const {
  ariaLabel,
  disabled,
  label,
  helpText,
  id,
  step,
  min = 0,
  max = 100,
  items,
  labelKey,
  valueKey,
  icon,
  target = false,
  transparent = false,
  type = "text",
} = defineProps<{
  ariaLabel?: string;
  defaultValue?: string | null | undefined;
  disabled?: boolean;
  id?: string;
  target?: boolean;
  label?: string;
  helpText?: string;
  items?: (CheckboxGroupItem | RadioGroupItem | SelectItem)[];
  labelKey?: string;
  valueKey?: string;
  icon?: string;
  step?: number;
  min?: number;
  max?: number;
  transparent?: boolean;
  type?: FieldType;
}>();

const model = defineModel();

const { focusedInput } = storeToRefs(useEditorStore());

const chip = computed(() => ({ backgroundColor: model.value as string }));
</script>

<template>
  <label v-if="type === 'range'" :for="id">
    <span v-if="label" class="label">
      {{ capitalize(label) }}
    </span>
    <div class="flex gap-3 items-center">
      <USlider
        v-model="model as number"
        :input-id="id"
        :disabled="disabled"
        class="w-36"
        :min="min"
        :max="max"
        :step="step"
      />
      <output :class="`${disabled ? 'opacity-40' : 'opacity-100'}`">
        {{ model }}%
      </output>
    </div>
  </label>
  <div v-else-if="type === 'toggle'" class="flex items-center">
    <USwitch v-model="model as boolean" size="xs" :label="capitalize(label)" />
    <!--<span class="cursor-pointer ml-2">
      {{ capitalize(label) }}
    </span>-->
  </div>
  <label v-else-if="type === 'checkbutton'" class="" :for="id">
    <USwitch
      v-model="model as boolean"
      class="w-full justify-start! text-left!"
    >
      <UCheckbox
        v-model="model"
        :input-id="id"
        :disabled="disabled"
        binary
        size="sm"
      />
      <div>
        <span>
          {{ capitalize(label) }}
        </span>
        <UAlert v-if="helpText" size="sm" severity="secondary" variant="soft">
          {{ helpText }}
        </UAlert>
      </div>
    </USwitch>
  </label>
  <label
    v-else-if="type === 'checkbox'"
    :for="id"
    class="flex gap-2 items-center w-fit"
  >
    <UCheckbox
      v-model="model"
      :input-id="id"
      binary
      :disabled="disabled"
      size="sm"
    />
    <span
      class="label text-sm text-primary"
      :class="[!disabled ? 'cursor-pointer' : 'cursor-auto']"
    >
      {{ capitalize(label) }}
    </span>
  </label>
  <label
    v-else-if="type === 'selectbutton'"
    :for="id"
    class="flex flex-col gap-1"
  >
    <span v-if="label" class="label">
      {{ capitalize(label) }}
    </span>
    <URadioGroup
      v-model="model as AcceptableValue"
      orientation="horizontal"
      :aria-label="label ?? ariaLabel"
      :items="items"
      :label-key="labelKey"
      :value-key="valueKey"
      size="sm"
      variant="table"
    >
      <template #label="{ item }">
        <div class="flex items-center gap-1">
          <span>{{ item.label }}</span>
          <UIcon :name="item.icon" class="size-5" />
        </div>
      </template>
    </URadioGroup>
    <!-- <URadioGroup
      v-model="model as AcceptableValue"
      :aria-label="label ?? ariaLabel"
      :items="items"
      :label-key="labelKey"
      :value-key="valueKey"
      size="sm"
    /> -->
  </label>
  <div v-else-if="type === 'select'" class="flex flex-col gap-1">
    <span v-if="label" class="label">
      {{ capitalize(label) }}
    </span>
    <USelect
      v-model="model as AcceptableValue"
      :aria-label="label ?? ariaLabel"
      :items="items"
      :label-key="labelKey"
      :value-key="valueKey"
      :input-id="id"
      :icon="icon"
      :variant="transparent ? 'none' : 'none'"
      size="sm"
    />
  </div>
  <label v-else :for="id" class="flex flex-col gap-1">
    <span v-if="label" class="label">
      {{ capitalize(label) }}
    </span>
    <div v-if="type === 'color'">
      <UFieldGroup>
        <UPopover>
          <UButton
            :disabled="disabled"
            color="neutral"
            :variant="transparent ? 'ghost' : 'outline'"
            :style="chip"
          />
          <template #content>
            <UColorPicker
              v-model="model as string"
              :disabled="disabled"
              :input-id="id"
              size="sm"
            />
          </template>
        </UPopover>
        <UInput
          v-model="model as string"
          :variant="transparent ? 'subtle' : 'outline'"
          :disabled="disabled"
          size="sm"
          @focus.stop="focusedInput = target ? id : ''"
          @blur.stop="focusedInput = ''"
        />
      </UFieldGroup>
    </div>
    <UTextarea
      v-else-if="type === 'textarea'"
      :id="id"
      v-model="model as string"
      :variant="transparent ? 'subtle' : 'outline'"
      :disabled="disabled"
      size="sm"
      @focus.stop="focusedInput = target ? id : ''"
      @blur.stop="focusedInput = ''"
    />
    <UInputNumber
      v-else-if="type === 'number'"
      v-model="model as number"
      :input-id="id"
      :disabled="disabled"
      show-buttons
      button-layout="horizontal"
      :step="step"
      increment-icon="i-lucide-arrow-right"
      decrement-icon="i-lucide-arrow-left"
      size="sm"
      input-class="!w-12"
    />
    <UInput
      v-else
      :id="id"
      v-model="model as string"
      :variant="transparent ? 'subtle' : 'outline'"
      :type="type || 'text'"
      :disabled="disabled"
      size="sm"
      @focus.stop="focusedInput = target ? id : ''"
      @blur.stop="focusedInput = ''"
    />
    <UAlert v-if="helpText" size="sm" severity="secondary" variant="soft">
      {{ helpText }}
    </UAlert>
  </label>
</template>
