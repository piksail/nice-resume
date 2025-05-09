<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import Drawer from "primevue/drawer";
import Fieldset from "primevue/fieldset";
import { useConfirm } from "primevue/useconfirm";
import { useEditorStore } from "@/stores/editor";
import { useEmailStore } from "@/stores/email";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { getSideIndexLabel } from "@/utils/editor";
import {
  entryLayouts,
  fonts,
  fontWeights,
  headerLayouts,
  themeSettings,
} from "@/globals";
import BlockSettingsEditor from "@/components/BlockSettingsEditor.vue";
import EntryHeaderItemSettingsEditor from "@/components/EntryHeaderItemSettingsEditor.vue";
import Field from "@/components/Field.vue";
import ListSettingsEditor from "@/components/ListSettingsEditor.vue";
import SizeableSettingsEditor from "@/components/SizeableSettingsEditor.vue";
import TextSettingsEditor from "@/components/TextSettingsEditor.vue";
import TitleSettingsEditor from "@/components/TitleSettingsEditor.vue";
import FormBlockRow from "~/components/FormBlockRow.vue";
import type { LetterSettings } from "~/types";
import { capitalize } from "@/utils/string";

// eslint-disable-next-line no-undef
const { t } = useI18n({
  useScope: "local",
});

const { documentType } = storeToRefs(useEditorStore());
const { isThemeCustomized, theme } = storeToRefs(useProfileStore());

const { settings: resumeSettings } = storeToRefs(useResumeStore());
const { isHeaderSimple, settings: letterSettings } =
  storeToRefs(useLetterStore());
const { settings: emailSettings } = storeToRefs(useEmailStore());

const confirm = useConfirm();

const isStyleEditorOpen = ref(false);

const documentTypeSettings = computed(() => {
  if (documentType.value === "email") return emailSettings.value;
  return documentType.value === "letter"
    ? letterSettings.value
    : resumeSettings.value;
});

watch(theme, () => {
  // Hide customization to see the new theme
  isThemeCustomized.value = false;
});

function askBeforeResetStyle() {
  confirm.require({
    header: capitalize(t("removalConfirmation")),
    message: t("confirmStyleReset"),
    rejectProps: {
      label: capitalize(t("toCancel")),
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: capitalize(t("toReset")),
      severity: "danger",
    },
    accept: () => {
      if (documentType.value === "email") {
        emailSettings.value = themeSettings[theme.value].email;
      } else if (documentType.value === "letter") {
        letterSettings.value = themeSettings[theme.value].letter;
      } else {
        resumeSettings.value = themeSettings[theme.value].resume;
      }
    },
    reject: () => {},
  });
}
</script>

<template>
  <Drawer
    v-model:visible="isStyleEditorOpen"
    :header="capitalize($t('toCustomizeTheme'))"
    class="!w-full"
    pt:mask:class="!bg-transparent !w-[calc(100vw-210mm)]"
  >
    <section class="flex flex-col gap-6">
      <Fieldset :legend="capitalize($t('document'))" toggleable>
        <div class="formBlock">
          <FormBlockRow :header="$t('border')">
            <Field
              v-for="i in 4"
              :key="i"
              id="documentBorder"
              :label="$t(getSideIndexLabel(i))"
              type="number"
              v-model="documentTypeSettings.document.border[i - 1]"
            />
            <Field
              id="documentBorderColor"
              :label="$t('color')"
              type="color"
              v-model="documentTypeSettings.document.borderColor"
            />
          </FormBlockRow>
          <FormBlockRow :header="$t('padding')">
            <div class="grid grid-cols-4 gap-5">
              <Field
                v-for="i in 4"
                :key="i"
                :id="`documentPadding${i}`"
                type="number"
                :label="$t(getSideIndexLabel(i))"
                v-model="documentTypeSettings.document.padding[i - 1]"
              />
            </div>
            <Field
              id="documentBackgroundColor"
              :label="$t('color')"
              type="color"
              v-model="documentTypeSettings.document.backgroundColor"
            />
          </FormBlockRow>
          <Field
            id="documentBodyFont"
            type="select"
            :label="$t('font')"
            v-model="documentTypeSettings.document.bodyFont"
            :options="fonts"
          />
        </div>
      </Fieldset>

      <template v-if="documentType === 'email'">
        <Fieldset :legend="capitalize($t('signature'))" toggleable>
          <div class="formBlock">
            <Field
              id="headerLayout"
              type="select"
              :label="$t('layout')"
              v-model="emailSettings.document.layout"
              :options="headerLayouts"
            />
            <FormBlockRow :header="$t('border')">
              <Field
                v-for="i in 4"
                :key="i"
                id="signatureBorder"
                :label="$t(getSideIndexLabel(i))"
                type="number"
                v-model="emailSettings.document.border[i - 1]"
              />
              <Field
                id="signatureBorderColor"
                :label="$t('color')"
                type="color"
                v-model="emailSettings.document.borderColor"
              />
            </FormBlockRow>
            <FormBlockRow :header="$t('padding')">
              <Field
                v-for="i in 4"
                :key="i"
                id="signaturePadding"
                :label="$t(getSideIndexLabel(i))"
                type="number"
                v-model="emailSettings.document.padding[i - 1]"
              />
              <Field
                id="signatureBackgroundColor"
                :label="$t('color')"
                type="color"
                v-model="emailSettings.document.backgroundColor"
              />
            </FormBlockRow>
          </div>
        </Fieldset>
      </template>
      <template v-else>
        <Fieldset :legend="capitalize($t('header'))" toggleable>
          <div class="formBlock">
            <Field
              id="headerLayout"
              type="select"
              :label="$t('layout')"
              v-model="(documentTypeSettings as LetterSettings).header.layout"
              :options="headerLayouts"
            />
            <BlockSettingsEditor
              property-name="header"
              :settings="(documentTypeSettings as LetterSettings).header"
            />
          </div>
        </Fieldset>
      </template>

      <template v-if="documentType === 'resume'">
        <Fieldset :legend="capitalize($t('aside'))" toggleable>
          <div class="formBlock">
            <BlockSettingsEditor
              property-name="aside"
              :settings="resumeSettings.aside"
            />
            <FormBlockRow>
              <Field
                id="asideWidth"
                :label="$t('width')"
                type="range"
                :min="0"
                :max="100"
                v-model="resumeSettings.aside.width"
              />
              <Field
                id="asideIsRightPositioned"
                label="Right side TODO localize"
                type="checkbox"
                v-model="resumeSettings.aside.isRightPositioned"
              />
            </FormBlockRow>
          </div>
        </Fieldset>

        <Fieldset :legend="capitalize($t('body'))" toggleable>
          <div class="formBlock">
            <BlockSettingsEditor
              property-name="body"
              :settings="resumeSettings.body"
            />
          </div>
        </Fieldset>
      </template>

      <template v-if="documentType === 'letter'">
        <Fieldset
          v-if="isHeaderSimple"
          :legend="capitalize($t('senderDetails'))"
          toggleable
        >
          <div class="formBlock">
            <BlockSettingsEditor
              property-name="senderDetails"
              :settings="letterSettings.senderDetails"
            />
            <TextSettingsEditor
              property-name="senderDetails"
              :settings="letterSettings.senderDetails"
            />
            <Field
              id="senderDetailsGap"
              :label="$t('gap')"
              type="number"
              v-model="letterSettings.senderDetails.gap"
            />
          </div>
        </Fieldset>

        <Fieldset :legend="capitalize($t('recipientDetails'))" toggleable>
          <div class="formBlock">
            <BlockSettingsEditor
              property-name="recipientDetails"
              :settings="letterSettings.recipientDetails"
            />
            <TextSettingsEditor
              property-name="recipientDetails"
              :settings="letterSettings.recipientDetails"
            />
            <Field
              id="recipientDetailsGap"
              :label="$t('gap')"
              type="number"
              v-model="letterSettings.recipientDetails.gap"
            />
          </div>
        </Fieldset>

        <Fieldset :legend="capitalize($t('subject'))" toggleable>
          <div class="formBlock">
            <BlockSettingsEditor
              property-name="subject"
              :settings="letterSettings.subject"
            />
            <TextSettingsEditor
              property-name="subject"
              :settings="letterSettings.subject"
            />
            <TitleSettingsEditor
              property-name="subject"
              :settings="letterSettings.subject"
            />
          </div>
        </Fieldset>

        <Fieldset :legend="capitalize($t('reference'))" toggleable>
          <div class="formBlock">
            <BlockSettingsEditor
              property-name="reference"
              :settings="letterSettings.reference"
            />
            <TextSettingsEditor
              property-name="reference"
              :settings="letterSettings.reference"
            />
            <TitleSettingsEditor
              property-name="reference"
              :settings="letterSettings.reference"
            />
          </div>
        </Fieldset>
      </template>

      <Fieldset :legend="capitalize($t('name'))" toggleable>
        <div class="formBlock">
          <BlockSettingsEditor
            property-name="name"
            :settings="documentTypeSettings.name"
          />
          <TextSettingsEditor
            property-name="name"
            :settings="documentTypeSettings.name"
          />
          <TitleSettingsEditor
            property-name="name"
            :settings="documentTypeSettings.name"
          />
        </div>
      </Fieldset>

      <Fieldset :legend="capitalize($t('title'))" toggleable>
        <div class="formBlock">
          <BlockSettingsEditor
            property-name="title"
            :settings="documentTypeSettings.title"
          />
          <TextSettingsEditor
            property-name="title"
            :settings="documentTypeSettings.title"
          />
          <TitleSettingsEditor
            property-name="title"
            :settings="documentTypeSettings.title"
          />
        </div>
      </Fieldset>

      <Fieldset :legend="capitalize($t('about'))" toggleable>
        <div class="formBlock">
          <BlockSettingsEditor
            property-name="about"
            :settings="documentTypeSettings.about"
          />
          <TextSettingsEditor
            property-name="about"
            :settings="documentTypeSettings.about"
          />
          <TitleSettingsEditor
            property-name="about"
            :settings="documentTypeSettings.about"
          />
          <Field
            id="aboutQuoteIsShown"
            :label="`${$t('toShow')} ${$t('quoteMark')}`"
            type="checkbox"
            v-model="documentTypeSettings.aboutQuote.isShown"
          />
          <FormBlockRow :header="$t('quoteMark')">
            <Field
              id="aboutQuoteFont"
              type="select"
              :label="$t('font')"
              v-model="documentTypeSettings.aboutQuote.font"
              optionLabel="label"
              optionValue="value"
              :options="
                ['inherit', ...fonts].map((font) => ({
                  label: font === 'inherit' ? capitalize($t('default')) : font,
                  value: font,
                }))
              "
            />
            <Field
              id="aboutQuoteFontSize"
              :label="$t('size')"
              type="number"
              v-model="documentTypeSettings.aboutQuote.fontSize"
            />
            <Field
              id="aboutQuoteFontWeight"
              type="select"
              :label="$t('fontWeight')"
              v-model="documentTypeSettings.aboutQuote.fontWeight"
              :options="fontWeights"
            />
            <Field
              id="aboutQuoteIsItalic"
              :label="$t('italic')"
              type="checkbox"
              v-model="documentTypeSettings.aboutQuote.isItalic"
            />
            <Field
              id="aboutQuoteColor"
              :label="$t('color')"
              type="color"
              v-model="documentTypeSettings.aboutQuote.color"
            />
          </FormBlockRow>
        </div>
      </Fieldset>

      <Fieldset :legend="capitalize($t('contactDetails'))" toggleable>
        <div class="formBlock">
          <BlockSettingsEditor
            property-name="contactDetails"
            :settings="documentTypeSettings.contactDetails"
          />
          <TextSettingsEditor
            property-name="contactDetails"
            :settings="documentTypeSettings.contactDetails"
          />
          <FormBlockRow>
            <Field
              id="contactDetailsListOrientation"
              type="selectbutton"
              :label="$t('orientation')"
              v-model="documentTypeSettings.contactDetails.listOrientation"
              optionLabel="label"
              optionValue="value"
              :options="
                ['column', 'row'].map((orientation) => ({
                  label: capitalize(
                    $t(orientation === 'row' ? 'horizontal' : 'vertical'),
                  ),
                  value: orientation,
                }))
              "
            />
            <Field
              id="contactDetailsAlignment"
              type="select"
              :label="$t('alignment')"
              v-model="documentTypeSettings.contactDetails.alignment"
              optionLabel="label"
              optionValue="value"
              :options="
                ['start', 'center', 'end'].map((alignment) => ({
                  label: capitalize($t(alignment)),
                  value: alignment,
                }))
              "
            />
            <Field
              id="contactDetailsGap"
              :label="$t('gap')"
              type="number"
              v-model="documentTypeSettings.contactDetails.gap"
            />
          </FormBlockRow>
          <FormBlockRow :header="$t('icon')">
            <Field
              id="contactDetailsIsIconFirst"
              :label="t('iconFirst')"
              type="checkbox"
              v-model="documentTypeSettings.contactDetails.isIconFirst"
            />
            <Field
              id="contactDetailsIconGap"
              :label="$t('gap')"
              type="number"
              v-model="documentTypeSettings.contactDetails.iconGap"
            />
            <Field
              id="contactDetailsIconSize"
              :label="$t('size')"
              type="number"
              v-model="documentTypeSettings.contactDetails.iconSize"
            />
            <Field
              id="contactDetailsIconColor"
              :label="$t('color')"
              type="color"
              v-model="documentTypeSettings.contactDetails.iconColor"
            />
          </FormBlockRow>
        </div>
      </Fieldset>

      <template v-if="documentType === 'letter'">
        <Fieldset :legend="capitalize($t('paragraphs'))" toggleable>
          <div class="formBlock">
            <FormBlockRow>
              <Field
                id="bodyColor"
                type="color"
                :label="$t('color')"
                v-model="letterSettings.body.color"
              />
              <Field
                id="bodyFontSize"
                :label="$t('size')"
                type="number"
                v-model="letterSettings.body.fontSize"
              />
              <Field
                id="bodyLineHeight"
                :label="$t('lineHeight')"
                type="number"
                v-model="letterSettings.body.lineHeight"
                :step="0.1"
              />
              <Field
                id="bodyIndentation"
                :label="$t('indentation')"
                type="number"
                v-model="letterSettings.body.indentation"
              />
              <Field
                id="bodyIsJustified"
                :label="$t('justified')"
                type="checkbox"
                v-model="letterSettings.body.isJustified"
              />
              <Field
                id="bodyIsSignatureRightAligned"
                label="Signature on the right TODO localize"
                type="checkbox"
                v-model="letterSettings.body.isSignatureRightAligned"
              />
            </FormBlockRow>
            <FormBlockRow :header="$t('margin')">
              <Field
                v-for="i in 4"
                :key="i"
                :id="`bodyMargin${i}`"
                :label="$t(getSideIndexLabel(i))"
                type="number"
                v-model="letterSettings.body.margin[i - 1]"
              />
            </FormBlockRow>
          </div>
          <Field
            id="bodyGap"
            :label="$t('gap')"
            type="number"
            v-model="letterSettings.body.gap"
          />
        </Fieldset>
      </template>

      <template v-if="documentType === 'resume'">
        <Fieldset :legend="capitalize($t('category'))" toggleable>
          <div class="formBlock">
            <Field
              id="categoryisMasonry"
              :label="$t('masonry')"
              type="checkbox"
              v-model="resumeSettings.category.isMasonry"
            />
            <Message v-if="resumeSettings.category.isMasonry" size="small">
              {{ t("howToGapMasonry") }}
            </Message>
            <Field
              id="categoryGap"
              :label="$t('gap')"
              type="number"
              v-model="resumeSettings.category.gap"
            />
            <BlockSettingsEditor
              property-name="category"
              :settings="resumeSettings.category"
            />
          </div>
        </Fieldset>

        <Fieldset :legend="capitalize($t('categoryName'))" toggleable>
          <div class="formBlock">
            <BlockSettingsEditor
              property-name="categoryName"
              :settings="resumeSettings.categoryName"
            />
            <TextSettingsEditor
              property-name="categoryName"
              :settings="resumeSettings.categoryName"
            />
            <TitleSettingsEditor
              property-name="categoryName"
              :settings="resumeSettings.categoryName"
            />
          </div>
        </Fieldset>
        <Fieldset :legend="capitalize($t('categoryNameSeparator'))" toggleable>
          <div class="formBlock">
            <BlockSettingsEditor
              property-name="categoryNameSeparator"
              :settings="resumeSettings.categoryNameSeparator"
            />
            <SizeableSettingsEditor
              property-name="categoryNameSeparator"
              :settings="resumeSettings.categoryNameSeparator"
            />
          </div>
        </Fieldset>

        <Fieldset :legend="capitalize($t('entry'))" toggleable>
          <div class="formBlock">
            <Field
              id="entryLayout"
              type="select"
              :label="$t('layout')"
              v-model="resumeSettings.entry.layout"
              :options="entryLayouts"
            />
            <Field
              id="entryGap"
              :label="$t('gap')"
              type="number"
              v-model="resumeSettings.entry.gap"
            />
          </div>
        </Fieldset>

        <Fieldset :legend="capitalize($t('entryTitle'))" toggleable>
          <EntryHeaderItemSettingsEditor
            property-name="entryTitle"
            :settings="resumeSettings.entryTitle"
          />
        </Fieldset>

        <Fieldset :legend="capitalize($t('entryPeriod'))" toggleable>
          <EntryHeaderItemSettingsEditor
            property-name="entryPeriod"
            :settings="resumeSettings.entryPeriod"
          />
        </Fieldset>

        <Fieldset :legend="capitalize($t('entryOrganization'))" toggleable>
          <EntryHeaderItemSettingsEditor
            property-name="entryOrganization"
            :settings="resumeSettings.entryOrganization"
          />
        </Fieldset>

        <Fieldset :legend="capitalize($t('entryLocation'))" toggleable>
          <EntryHeaderItemSettingsEditor
            property-name="entryLocation"
            :settings="resumeSettings.entryLocation"
          />
        </Fieldset>

        <Fieldset :legend="capitalize($t('entrySummary'))" toggleable>
          <div class="formBlock">
            <BlockSettingsEditor
              property-name="entrySummary"
              :settings="resumeSettings.entrySummary"
            />
            <TextSettingsEditor
              property-name="entrySummary"
              :settings="resumeSettings.entrySummary"
            />
          </div>
        </Fieldset>

        <Fieldset :legend="capitalize($t('entryHighlight'))" toggleable>
          <div class="formBlock">
            <BlockSettingsEditor
              property-name="entryHighlight"
              :settings="resumeSettings.entryHighlight"
            />
            <TextSettingsEditor
              property-name="entryHighlight"
              :settings="resumeSettings.entryHighlight"
            />
            <ListSettingsEditor
              property-name="entryHighlight"
              :settings="resumeSettings.entryHighlight"
            />
          </div>
        </Fieldset>

        <Fieldset :legend="capitalize($t('entryTag'))" toggleable>
          <div class="formBlock">
            <BlockSettingsEditor
              property-name="entryTag"
              :settings="resumeSettings.entryTag"
            />
            <TextSettingsEditor
              property-name="entryTag"
              :settings="resumeSettings.entryTag"
            />
            <Field
              id="entryTagGap"
              :label="$t('gap')"
              type="number"
              v-model="resumeSettings.entryTag.gap"
            />
          </div>
        </Fieldset>
      </template>
    </section>
    <template #footer>
      <Button
        :label="capitalize($t('toReset'))"
        icon="pi pi-eraser"
        class="flex-auto"
        outlined
        severity="danger"
        @click="askBeforeResetStyle"
      ></Button>
    </template>
  </Drawer>

  <Button
    icon="pi pi-sliders-v"
    size="small"
    :disabled="!isThemeCustomized"
    @click="isStyleEditorOpen = true"
  />
  <Field
    type="togglebutton"
    v-model="isThemeCustomized"
    onIcon="pi pi-check"
    offIcon="pi pi-eye-slash"
    :onLabel="`${capitalize($t('theme'))} ${t('onLabel')}`"
    :offLabel="`${capitalize($t('theme'))} ${t('offLabel')}`"
  />
</template>

<i18n lang="json">
{
  "br": {
    "onLabel": "TODO",
    "offLabel": "TODO",
    "iconFirst": "TODO",
    "howToGapMasonry": "TODO",
    "confirmStyleReset": "TODO"
  },
  "de": {
    "onLabel": "angepasst",
    "offLabel": "nicht angepasst",
    "iconFirst": "TODO",
    "howToGapMasonry": "TODO",
    "confirmStyleReset": "TODO"
  },
  "en": {
    "onLabel": "customized",
    "offLabel": "not customized",
    "iconFirst": "Icon first",
    "howToGapMasonry": "Vertical gap is handled with category top and bottom margins.",
    "confirmStyleReset": "Reset style to defaults?"
  },
  "es": {
    "onLabel": "TODO",
    "offLabel": "TODO",
    "iconFirst": "TODO",
    "howToGapMasonry": "TODO",
    "confirmStyleReset": "TODO"
  },
  "fr": {
    "onLabel": "modifié",
    "offLabel": "non modifié",
    "iconFirst": "Icône d'abord",
    "howToGapMasonry": "L'espacement vertical est géré avec les marges haute et basse de la catégorie.",
    "confirmStyleReset": "Réinitialiser le style ?"
  }
}
</i18n>
