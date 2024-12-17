<script setup lang="ts">
import { storeToRefs } from "pinia";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import { useLetterStore } from "@/stores/letter";
import { moveDown, moveUp, remove } from "@/utils/array";
import { focusNextInput } from "@/utils/editor";
import EditorCategory from "@/components/EditorCategory.vue";
import Field from "@/components/Field.vue";
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
    <template v-slot:header>{{ capitalize($t("header")) }}</template>
    <div class="formBlock">
      <FormBlockRow>
        <Field
          type="checkbox"
          label="Use sender layout TODO localize"
          v-model="isHeaderSimple"
        />
      </FormBlockRow>
      <label class="flex flex-col" for="senderDetails">
        <template v-if="isHeaderSimple">
          <span class="label">
            {{ capitalize($t("senderDetails")) }}
          </span>
          <ul v-if="senderDetails.length" id="senderDetailList">
            <li
              v-for="(_detail, index) in senderDetails"
              :key="index"
              class="inputListItem"
            >
              <Field
                class="w-[70%]"
                v-model="senderDetails[index]"
                @keydown.enter.prevent="addSenderDetail"
              />
              <ListActions
                :index="index"
                :list-length="senderDetails.length"
                @moveUp="moveUp(senderDetails, index)"
                @moveDown="moveDown(senderDetails, index)"
                @remove="remove(senderDetails, index)"
              />
            </li>
            <Button
              class="w-[70%] mt-2"
              icon="pi pi-plus"
              :label="capitalize(`${$t('toAdd')} ${$t('detail')}`)"
              variant="outlined"
              size="small"
              @click="addSenderDetail"
            />
          </ul>
        </template>
      </label>
      <label class="flex flex-col" for="recipientDetails">
        <span class="label">
          {{ capitalize($t("recipientDetails")) }}
        </span>
        <ul v-if="recipientDetails.length" id="recipientDetailList">
          <li
            v-for="(_detail, index) in recipientDetails"
            :key="index"
            class="inputListItem"
          >
            <Field
              class="w-[70%]"
              v-model="recipientDetails[index]"
              @keydown.enter.prevent="addRecipientDetail"
            />
            <ListActions
              :index="index"
              :list-length="recipientDetails.length"
              @moveUp="moveUp(recipientDetails, index)"
              @moveDown="moveDown(recipientDetails, index)"
              @remove="remove(recipientDetails, index)"
            />
          </li>
          <Button
            class="w-[70%] mt-2"
            icon="pi pi-plus"
            :label="capitalize(`${$t('toAdd')} ${$t('detail')}`)"
            variant="outlined"
            size="small"
            @click="addRecipientDetail"
          />
        </ul>
      </label>
      <Field
        id="letterSubject"
        :label="$t('subject')"
        type="textarea"
        v-model="subject"
      />
      <Field
        id="letterReference"
        :label="$t('reference')"
        v-model="reference"
      />
    </div>
  </EditorCategory>
  <EditorCategory id="Body">
    <template v-slot:header>{{ capitalize($t("body")) }}</template>
    <div class="formBlock">
      <label class="flex flex-col" for="paragraphList">
        <span class="label">{{ capitalize($t("paragraphs")) }}</span>
        <ul v-if="paragraphs.length" id="paragraphList" class="inputList">
          <li
            v-for="(_paragraph, index) in paragraphs"
            :key="index"
            class="inputListItem"
          >
            <Textarea
              class="!text-sm w-[70%]"
              size="small"
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
          <Button
            class="w-[70%]"
            icon="pi pi-plus"
            :label="capitalize(`${$t('toAdd')} ${$t('paragraph')}`)"
            variant="outlined"
            size="small"
            @click="addParagraph"
          />
        </ul>
      </label>
    </div>
  </EditorCategory>
</template>
