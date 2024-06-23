<script setup lang="ts">
import { storeToRefs } from "pinia";
import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import { useLetterStore } from "@/stores/letter";
import { moveDown, moveUp, remove } from "@/utils/array";
import { focusNextInput } from "@/utils/editor";
import EditorCategory from "@/components/EditorCategory.vue";
import ListActions from "@/components/ListActions.vue";

const {
  isHeaderSimple,
  paragraphs,
  recipientDetails,
  reference,
  senderDetails,
  subject,
} = storeToRefs(useLetterStore());

function addParagraph() {
  paragraphs.value.push("");

  focusNextInput("#paragraphList textarea");
}

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
  <EditorCategory id="Body">
    <template v-slot:header>Body</template>
    <div class="flex flex-col gap-5">
      <label class="flex flex-col" for="paragraphList">
        <div class="flex gap-2">
          <span class="label">Paragraphs</span>
          <button
            title="Add paragraph"
            class="bg-blue-500 size-7 text-white rounded-full"
            @click="addParagraph"
          >
            <PlusCircleIcon class="size-full" />
          </button>
        </div>
        <ul v-if="paragraphs.length" id="paragraphList" class="inputList">
          <li
            v-for="(_paragraph, index) in paragraphs"
            :key="index"
            class="inputListItem"
          >
            <textarea
              class="input w-[70%]"
              v-model="paragraphs[index]"
              @keydown.enter.prevent="addParagraph"
            />
            <ListActions
              class="mb-2"
              :index="index"
              :list-length="paragraphs.length"
              @moveUp="moveUp(paragraphs, index)"
              @moveDown="moveDown(paragraphs, index)"
              @remove="remove(paragraphs, index)"
            />
          </li>
        </ul>
      </label>
    </div>
  </EditorCategory>
</template>
