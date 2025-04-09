<script setup lang="ts">
import { storeToRefs } from "pinia";
import Checkbox from "primevue/checkbox";
import ColorPicker from "primevue/colorpicker";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import SelectButton from "primevue/selectbutton";
import Slider from "primevue/slider";
import Textarea from "primevue/textarea";
import ToggleButton from "primevue/togglebutton";
import ToggleSwitch from "primevue/toggleswitch";
import { capitalize } from "@/utils/string";
import { useEditorStore } from "@/stores/editor";

const {
  ariaLabel,
  disabled,
  label,
  helpText,
  id,
  step,
  min = 0,
  max = 100,
  options,
  optionLabel,
  optionValue,
  onIcon,
  offIcon,
  onLabel = "On",
  offLabel = "Off",
  target = false,
  transparent = false,
  type,
} = defineProps<{
  ariaLabel?: string;
  defaultValue?: string | null | undefined;
  disabled?: boolean;
  id?: string;
  target?: boolean;
  label?: string;
  helpText?: string;
  options?: (string | number | null | undefined | unknown)[];
  optionLabel?: string;
  optionValue?: string;
  onIcon?: string;
  offIcon?: string;
  onLabel?: string;
  offLabel?: string;
  step?: number;
  min?: number;
  max?: number;
  transparent?: boolean;
  type?:
    | "checkbox"
    | "checkbutton"
    | "color"
    | "number"
    | "range"
    | "select"
    | "selectbutton"
    | "textarea"
    | "toggle"
    | "togglebutton";
}>();

const model = defineModel();

const { focusedInput } = storeToRefs(useEditorStore());

function updateColor(hexCode: string | undefined) {
  if (!hexCode) return;
  if (hexCode.startsWith("#")) {
    model.value = hexCode;
    return;
  }
  // Primevue does not embed hash to the hex color value but it is needed for CSS
  model.value = `#${hexCode}`;
}
</script>

<template>
  <label v-if="type === 'range'" :for="id">
    <span class="label" :class="transparent ? 'labelTransparent' : ''">
      {{ capitalize(label) }}
    </span>
    <div class="flex gap-3 items-center">
      <Slider
        :input-id="id"
        :disabled="disabled"
        class="w-36"
        :min="min"
        :max="max"
        :step="step"
        v-model="model as number"
      />
      <output :class="`${disabled ? 'opacity-40' : 'opacity-100'}`">
        {{ model }}%
      </output>
    </div>
  </label>
  <div v-else-if="type === 'toggle'" class="flex items-center">
    <ToggleSwitch v-model="model as boolean" size="small" />
    <span class="cursor-pointer ml-2">
      {{ capitalize(label) }}
    </span>
  </div>
  <label
    v-else-if="type === 'togglebutton'"
    :for="id"
    class="flex flex-col gap-1"
  >
    <span class="label" :class="transparent ? 'labelTransparent' : ''">
      {{ capitalize(label) }}
    </span>
    <ToggleButton
      v-model="model as boolean"
      :input-id="id"
      :disabled="disabled"
      :onIcon="onIcon"
      :offIcon="offIcon"
      :onLabel="onLabel"
      :offLabel="offLabel"
      class="!bg-transparent"
      :class="
        transparent
          ? '!text-white/50 !border-white/20 [&[aria-pressed=true]]:!text-white [&[aria-pressed=true]]:!border-white hover:!text-white hover:!border-white hover:!shadow-lg'
          : '!px-2 hover:!bg-primary/10'
      "
      size="small"
    />
  </label>
  <label v-else-if="type === 'checkbutton'" class="" :for="id">
    <ToggleButton
      v-model="model as boolean"
      class="w-full !justify-start !text-left"
    >
      <Checkbox
        v-model="model"
        :input-id="id"
        :disabled="disabled"
        binary
        size="small"
      />
      <div>
        <span>
          {{ capitalize(label) }}
        </span>
        <Message
          v-if="helpText"
          size="small"
          severity="secondary"
          variant="simple"
        >
          {{ helpText }}
        </Message>
      </div>
    </ToggleButton>
  </label>
  <label
    v-else-if="type === 'checkbox'"
    :for="id"
    class="flex gap-2 items-center w-fit"
  >
    <Checkbox
      v-model="model"
      :input-id="id"
      binary
      :disabled="disabled"
      size="small"
      :pt:box:class="transparent ? '!bg-surface-950 !border-transparent' : ''"
      :pt:icon:class="transparent ? '!text-white' : ''"
    />
    <span
      class="label text-sm text-primary"
      :class="[
        !disabled ? 'cursor-pointer' : 'cursor-auto',
        transparent ? '!text-white' : '',
      ]"
    >
      {{ capitalize(label) }}
    </span>
  </label>
  <label
    v-else-if="type === 'selectbutton'"
    :for="id"
    class="flex flex-col gap-1"
  >
    <span class="label" :class="transparent ? 'labelTransparent' : ''">
      {{ capitalize(label) }}
    </span>
    <SelectButton
      :ariaLabel="label ?? ariaLabel"
      v-model="model"
      :options="options"
      :optionLabel="optionLabel"
      :optionValue="optionValue"
      :class="
        transparent
          ? '[&>*]:!bg-surface-950 [&>*]:!text-white [&>*[aria-pressed=true]]:!bg-surface-950'
          : ''
      "
      size="small"
    />
  </label>
  <div v-else-if="type === 'select'" class="flex flex-col gap-1">
    <span class="label" :class="transparent ? 'labelTransparent' : ''">
      {{ capitalize(label) }}
    </span>
    <Select
      :ariaLabel="label ?? ariaLabel"
      v-model="model"
      :options="options"
      :optionLabel="optionLabel"
      :optionValue="optionValue"
      :input-id="id"
      class="!border-none"
      :class="
        transparent ? '!bg-surface-950 !text-white [&>*]:!text-white' : ''
      "
      :pt:label:class="transparent ? '' : ''"
      :pt:dropdown:class="transparent ? '' : ''"
      :pt:optionlabel:class="['text-sm', transparent ? '' : '']"
      size="small"
    >
      <template #dropdownicon>
        <slot name="dropdownicon" />
      </template>
      <template #header>
        <slot name="header" />
      </template>
    </Select>
  </div>
  <label v-else :for="id" class="flex flex-col gap-1">
    <span class="label" :class="transparent ? 'labelTransparent' : ''">
      {{ capitalize(label) }}
    </span>
    <div v-if="type === 'color'">
      <ColorPicker
        :input-id="id"
        :model-value="`${(model as string).replace('#', '')}`"
        size="small"
        @update:model-value="updateColor"
      />
      <InputText
        class="!p-2 ml-2"
        :class="
          transparent
            ? '!bg-surface-950 !text-white !border-none'
            : '!border-primary-200 !border-t-0 !border-r-0 !border-l-0 !rounded-none'
        "
        :disabled="disabled"
        :model-value="model as string"
        size="small"
        @focus.stop="focusedInput = target ? id : ''"
        @blur.stop="focusedInput = ''"
        @update:model-value="updateColor"
      />
    </div>
    <Textarea
      v-else-if="type === 'textarea'"
      :id="id"
      class="!border-t-0 !border-l-0 !border-r-0 !p-2"
      :class="transparent ? '!bg-surface-950 !text-white !border-none' : ''"
      :disabled="disabled"
      v-model="model as string"
      size="small"
      @focus.stop="focusedInput = target ? id : ''"
      @blur.stop="focusedInput = ''"
    />
    <InputNumber
      v-else-if="type === 'number'"
      v-model="model as number"
      :input-id="id"
      :disabled="disabled"
      showButtons
      buttonLayout="horizontal"
      :step="step"
      size="small"
      inputClass="!w-12"
    >
      <template #incrementicon>
        <span class="pi pi-plus" />
      </template>
      <template #decrementicon>
        <span class="pi pi-minus" />
      </template>
    </InputNumber>
    <InputText
      v-else
      :id="id"
      class="!p-2"
      :class="
        transparent
          ? '!bg-surface-950 !text-white !border-none'
          : '!border-primary-200 !border-t-0 !border-r-0 !border-l-0 !rounded-none'
      "
      :type="type || 'text'"
      :disabled="disabled"
      v-model="model as string"
      size="small"
      @focus.stop="focusedInput = target ? id : ''"
      @blur.stop="focusedInput = ''"
    />
    <Message v-if="helpText" size="small" severity="secondary" variant="simple">
      {{ helpText }}
    </Message>
  </label>
</template>
