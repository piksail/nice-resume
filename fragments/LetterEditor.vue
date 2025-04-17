<script setup lang="ts">
import { storeToRefs } from "pinia";
import Button from "primevue/button";
import { useLetterStore } from "@/stores/letter";
import { moveDown, moveUp, remove } from "@/utils/array";
import { focusNextInput } from "@/utils/editor";
import EditorCategory from "@/components/EditorCategory.vue";
import Field from "@/components/Field.vue";
import ListActions from "@/components/ListActions.vue";
import { capitalize } from "@/utils/string";

// eslint-disable-next-line no-undef
const { t } = useI18n({
  useScope: "local",
});

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
          transparent
          :label="t('useSenderFormat')"
          v-model="isHeaderSimple"
        />
      </FormBlockRow>
      <label class="flex flex-col" for="senderDetails">
        <template v-if="isHeaderSimple">
          <span class="label labelTransparent">
            {{ capitalize($t("senderDetails")) }}
          </span>
          <ul v-if="senderDetails.length" id="senderDetailList">
            <li
              v-for="(_detail, index) in senderDetails"
              :key="index"
              class="inputListItem"
            >
              <Field
                :id="`senderDetailList${index}`"
                target
                transparent
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
            <Button asChild>
              <button
                class="button slotButton slotButtonSmall"
                @click="addSenderDetail"
              >
                {{ capitalize(`${$t("toAdd")} ${$t("detail")}`) }}
              </button>
            </Button>
          </ul>
        </template>
      </label>
      <label class="flex flex-col" for="recipientDetails">
        <span class="label labelTransparent">
          {{ capitalize($t("recipientDetails")) }}
        </span>
        <ul v-if="recipientDetails.length" id="recipientDetailList">
          <li
            v-for="(_detail, index) in recipientDetails"
            :key="index"
            class="inputListItem"
          >
            <Field
              :id="`recipientDetailList${index}`"
              target
              transparent
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
          <Button asChild>
            <button
              class="button slotButton slotButtonSmall"
              @click="addRecipientDetail"
            >
              {{ capitalize(`${$t("toAdd")} ${$t("detail")}`) }}
            </button>
          </Button>
        </ul>
      </label>
      <Field
        id="letterSubject"
        target
        transparent
        :label="$t('subject')"
        type="textarea"
        v-model="subject"
      />
      <Field
        id="letterReference"
        target
        transparent
        :label="$t('reference')"
        v-model="reference"
      />
    </div>
  </EditorCategory>
  <EditorCategory id="Body">
    <template v-slot:header>{{ capitalize($t("body")) }}</template>
    <div class="formBlock">
      <label class="flex flex-col" for="paragraphList">
        <span class="label labelTransparent">
          {{ capitalize($t("paragraphs")) }}
        </span>
        <ul v-if="paragraphs.length" id="paragraphList" class="inputList">
          <li
            v-for="(_paragraph, index) in paragraphs"
            :key="index"
            class="inputListItem"
          >
            <Field
              :id="`paragraphList${index}`"
              target
              transparent
              type="textarea"
              class="w-[70%]"
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
          <Button asChild>
            <button
              class="button slotButton slotButtonSmall"
              @click="addParagraph"
            >
              {{ capitalize(`${$t("toAdd")} ${$t("paragraph")}`) }}
            </button>
          </Button>
        </ul>
      </label>
    </div>
  </EditorCategory>
</template>

<i18n lang="json">
{
  "br": {
    "useSenderFormat": "TODO"
  },
  "de": {
    "useSenderFormat": "TODO"
  },
  "en": {
    "useSenderFormat": "Use sender format"
  },
  "es": {
    "useSenderFormat": "TODO"
  },
  "fr": {
    "useSenderFormat": "Appliquer le format expéditeur"
  }
}
</i18n>
