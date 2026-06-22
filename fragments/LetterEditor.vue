<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useLetterStore } from "@/stores/letter";
import { moveDown, moveUp, remove } from "@/utils/array";
import { focusNextInput } from "@/utils/editor";
import EditorCategory from "@/components/EditorCategory.vue";
import Field from "@/components/Field.vue";
import ListActions from "@/components/ListActions.vue";
import { capitalize } from "@/utils/string";

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
  <EditorCategory
    id="Header"
    :title="capitalize(t('header'))"
    icon="i-lucide-mail-question-mark"
  >
    <div class="formBlock">
      <FormBlockRow>
        <Field
          v-model="isHeaderSimple"
          type="checkbox"
          transparent
          :label="t('useSenderFormat')"
        />
      </FormBlockRow>
      <label class="flex flex-col" for="senderDetails">
        <template v-if="isHeaderSimple">
          <span class="label labelTransparent">
            {{ capitalize($t("senderDetails")) }}
          </span>
          <ul
            v-if="senderDetails.length"
            id="senderDetailList"
            class="inputList"
          >
            <li
              v-for="(_detail, index) in senderDetails"
              :key="index"
              class="inputListItem"
            >
              <Field
                :id="`senderDetailList${index}`"
                v-model="senderDetails[index]"
                target
                transparent
                class="w-[70%]"
                @keydown.enter.prevent="addSenderDetail"
              />
              <ListActions
                :index="index"
                :list-length="senderDetails.length"
                @move-up="moveUp(senderDetails, index)"
                @move-down="moveDown(senderDetails, index)"
                @remove="remove(senderDetails, index)"
              />
            </li>
            <UButton
              icon="i-lucide-contact"
              variant="outline"
              size="sm"
              class="w-[70%]"
              @click="addSenderDetail"
            >
              {{ capitalize(`${$t("toAdd")} ${$t("detail")}`) }}
            </UButton>
          </ul>
        </template>
      </label>
      <label class="flex flex-col" for="recipientDetails">
        <span class="label labelTransparent">
          {{ capitalize($t("recipientDetails")) }}
        </span>
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
            <Field
              :id="`recipientDetailList${index}`"
              v-model="recipientDetails[index]"
              target
              transparent
              class="w-[70%]"
              @keydown.enter.prevent="addRecipientDetail"
            />
            <ListActions
              :index="index"
              :list-length="recipientDetails.length"
              @move-up="moveUp(recipientDetails, index)"
              @move-down="moveDown(recipientDetails, index)"
              @remove="remove(recipientDetails, index)"
            />
          </li>
          <UButton
            icon="i-lucide-list-plus"
            variant="outline"
            size="sm"
            class="w-[70%]"
            @click="addRecipientDetail"
          >
            {{ capitalize(`${$t("toAdd")} ${$t("detail")}`) }}
          </UButton>
        </ul>
      </label>
      <Field
        id="letterSubject"
        v-model="subject"
        target
        transparent
        :label="$t('subject')"
        type="textarea"
      />
      <Field
        id="letterReference"
        v-model="reference"
        target
        transparent
        :label="$t('reference')"
      />
    </div>
  </EditorCategory>
  <EditorCategory
    id="Body"
    :title="capitalize(t('body'))"
    icon="i-lucide-file-type-corner"
  >
    <template #header>{{ capitalize($t("body")) }}</template>
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
              v-model="paragraphs[index]"
              target
              transparent
              type="textarea"
              class="w-[70%]"
              @keydown.enter.prevent="addParagraph"
            />
            <ListActions
              class="mb-2"
              :index="index"
              :list-length="paragraphs.length"
              @move-up="moveUp(paragraphs, index)"
              @move-down="moveDown(paragraphs, index)"
              @remove="remove(paragraphs, index)"
            />
          </li>
          <UButton
            icon="i-lucide-list-plus"
            variant="outline"
            size="sm"
            class="w-[70%]"
            @click="addParagraph"
          >
            {{ capitalize(`${$t("toAdd")} ${$t("paragraph")}`) }}
          </UButton>
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
