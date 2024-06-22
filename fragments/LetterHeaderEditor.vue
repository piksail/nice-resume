<script setup lang="ts">
import { storeToRefs } from "pinia";
import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { moveDown, moveUp, remove } from "@/utils/array";
import { focusNextInput } from "@/utils/editor";
import EditorCategory from "@/components/EditorCategory.vue";
import BlockSettingsEditor from "@/components/BlockSettingsEditor.vue";
import ListActions from "@/components/ListActions.vue";
import TextSettingsEditor from "@/components/TextSettingsEditor.vue";
import TitleSettingsEditor from "@/components/TitleSettingsEditor.vue";

const { isThemeCustomized } = storeToRefs(useProfileStore());

const {
  isHeaderSimple,
  recipientDetails,
  reference,
  senderDetails,
  settings,
  subject,
} = storeToRefs(useLetterStore());

function addRecipientDetail() {
  recipientDetails.value.push("");

  focusNextInput("#recipientDetailList input");
}

function addSenderDetail() {
  senderDetails.value.push("");

  focusNextInput("#senderDetailList input");
}
</script>

<template>
  <EditorCategory id="Header">
    <template v-slot:header>Header</template>
    <template v-slot:style>
      <ul class="flex flex-col gap-10 mb-4">
        <li class="sectionSeparator">
          <header>
            <!-- TODO sender is not always set (condition with "use simple layout") -->
            <div class="sectionHeading">Sender</div>
          </header>
          <div class="flex flex-col gap-5">
            <BlockSettingsEditor
              property-name="senderDetails"
              :settings="settings.senderDetails"
            />
            <TextSettingsEditor
              property-name="senderDetails"
              :settings="settings.senderDetails"
            />
            <Field
              id="senderDetailsGap"
              label="Gap"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.senderDetails.gap"
            />
          </div>
        </li>
        <li class="sectionSeparator">
          <header>
            <div class="sectionHeading">Recipient</div>
          </header>
          <div class="flex flex-col gap-5">
            <BlockSettingsEditor
              property-name="recipientDetails"
              :settings="settings.recipientDetails"
            />
            <TextSettingsEditor
              property-name="recipientDetails"
              :settings="settings.recipientDetails"
            />
            <Field
              id="recipientDetailsGap"
              label="Gap"
              type="number"
              :disabled="!isThemeCustomized"
              v-model="settings.recipientDetails.gap"
            />
          </div>
        </li>
        <li class="sectionSeparator">
          <header>
            <div class="sectionHeading">Subject</div>
          </header>
          <div class="flex flex-col gap-5">
            <BlockSettingsEditor
              property-name="subject"
              :settings="settings.subject"
            />
            <TextSettingsEditor
              property-name="subject"
              :settings="settings.subject"
            />
            <TitleSettingsEditor
              property-name="subject"
              :settings="settings.subject"
            />
          </div>
        </li>
        <li>
          <header>
            <div class="sectionHeading">Reference</div>
          </header>
          <div class="flex flex-col gap-5">
            <BlockSettingsEditor
              property-name="reference"
              :settings="settings.reference"
            />
            <TextSettingsEditor
              property-name="reference"
              :settings="settings.reference"
            />
            <TitleSettingsEditor
              property-name="reference"
              :settings="settings.reference"
            />
          </div>
        </li>
      </ul>
    </template>
    <div class="flex flex-col gap-5">
      <label class="flex flex-col" for="senderDetails">
        <Field
          type="toggle"
          label="Use sender layout"
          v-model="isHeaderSimple"
        />
        <template v-if="isHeaderSimple">
          <div class="flex gap-2">
            <span class="label">Sender details</span>
            <button
              title="Add detail"
              class="bg-blue-500 size-7 text-white rounded-full"
              @click="addSenderDetail"
            >
              <PlusCircleIcon class="size-full" />
            </button>
          </div>
          <ul
            v-if="senderDetails.length"
            id="recipientDetailList"
            class="inputList"
          >
            <li
              v-for="(_detail, index) in senderDetails"
              :key="index"
              class="inputListItem"
            >
              <input
                class="input w-[70%]"
                v-model="senderDetails[index]"
                @keydown.enter.prevent="addRecipientDetail"
              />
              <ListActions
                class="mb-2"
                :index="index"
                :list-length="senderDetails.length"
                @moveUp="moveUp(senderDetails, index)"
                @moveDown="moveDown(senderDetails, index)"
                @remove="remove(senderDetails, index)"
              />
            </li>
          </ul>
        </template>
      </label>
      <label class="flex flex-col" for="recipientDetails">
        <div class="flex gap-2">
          <span class="label">Recipient details</span>
          <button
            title="Add detail"
            class="bg-blue-500 size-7 text-white rounded-full"
            @click="addRecipientDetail"
          >
            <PlusCircleIcon class="size-full" />
          </button>
        </div>
        <ul
          v-if="recipientDetails.length"
          id="recipientDetailList"
          class="inputList"
        >
          <li
            v-for="(_detail, index) in recipientDetails"
            :key="index"
            class="inputListItem"
          >
            <input
              class="input w-[70%]"
              v-model="recipientDetails[index]"
              @keydown.enter.prevent="addRecipientDetail"
            />
            <ListActions
              class="mb-2"
              :index="index"
              :list-length="recipientDetails.length"
              @moveUp="moveUp(recipientDetails, index)"
              @moveDown="moveDown(recipientDetails, index)"
              @remove="remove(recipientDetails, index)"
            />
          </li>
        </ul>
      </label>
      <label class="flex flex-col" for="letterSubject">
        <span class="label">Subject</span>
        <textarea id="letterSubject" class="input" v-model="subject" />
      </label>
      <label class="flex flex-col" for="letterReference">
        <span class="label">Reference</span>
        <input id="letterReference" class="input" v-model="reference" />
      </label>
    </div>
  </EditorCategory>
</template>
