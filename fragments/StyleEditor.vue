<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { storeToRefs } from "pinia";
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

const { t } = useI18n({
  useScope: "local",
});

const { documentType } = storeToRefs(useEditorStore());
const { isThemeCustomized, theme } = storeToRefs(useProfileStore());

const { settings: resumeSettings } = storeToRefs(useResumeStore());
const { isHeaderSimple, settings: letterSettings } =
  storeToRefs(useLetterStore());
const { settings: emailSettings } = storeToRefs(useEmailStore());

const confirm = useConfirmDialog();

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

async function askBeforeResetStyle() {
  const confirmed = await confirm({
    title: capitalize(t("removalConfirmation")),
    description: t("confirmStyleReset"),
    cancelLabel: t("toCancel"),
    confirmLabel: t("toReset"),
  });
  if (confirmed) {
    if (documentType.value === "email") {
      emailSettings.value = themeSettings[theme.value!].email;
    } else if (documentType.value === "letter") {
      letterSettings.value = themeSettings[theme.value!].letter;
    } else {
      resumeSettings.value = themeSettings[theme.value!].resume;
    }
  }
}
</script>

<template>
  <USlideover
    v-model:open="isStyleEditorOpen"
    :modal="false"
    side="left"
    :title="capitalize($t('toCustomizeTheme'))"
    class="w-full"
    :ui="{ content: 'w-[calc(100vw-210mm)] max-w-full' }"
  >
    <template #body>
      <section class="flex flex-col gap-4">
        <UCollapsible>
          <UButton
            :label="capitalize(t('document'))"
            icon="i-lucide-file"
            color="neutral"
            variant="subtle"
            trailing-icon="i-lucide-chevron-down"
            block
          />
          <template #content>
            <UCard>
              <div class="formBlock">
                <FormBlockRow :header="$t('border')">
                  <Field
                    v-for="i in 4"
                    id="documentBorder"
                    :key="i"
                    v-model="documentTypeSettings.document.border[i - 1]"
                    :label="$t(getSideIndexLabel(i))"
                    type="number"
                  />
                  <Field
                    id="documentBorderColor"
                    v-model="documentTypeSettings.document.borderColor"
                    :label="$t('color')"
                    type="color"
                  />
                </FormBlockRow>
                <FormBlockRow :header="$t('padding')">
                  <div class="grid grid-cols-4 gap-5">
                    <Field
                      v-for="i in 4"
                      :id="`documentPadding${i}`"
                      :key="i"
                      v-model="documentTypeSettings.document.padding[i - 1]"
                      type="number"
                      :label="$t(getSideIndexLabel(i))"
                    />
                  </div>
                  <Field
                    id="documentBackgroundColor"
                    v-model="documentTypeSettings.document.backgroundColor"
                    :label="$t('color')"
                    type="color"
                  />
                </FormBlockRow>
                <Field
                  id="documentBodyFont"
                  v-model="documentTypeSettings.document.bodyFont"
                  type="select"
                  :label="$t('font')"
                  :items="fonts"
                />
              </div>
            </UCard>
          </template>
        </UCollapsible>

        <template v-if="documentType === 'email'">
          <UCollapsible>
            <UButton
              :label="capitalize($t('signature'))"
              icon="i-lucide-signature"
              color="neutral"
              variant="subtle"
              trailing-icon="i-lucide-chevron-down"
              block
            />
            <template #content>
              <div class="formBlock">
                <Field
                  id="headerLayout"
                  v-model="emailSettings.document.layout"
                  type="select"
                  :label="$t('layout')"
                  :items="headerLayouts"
                />
                <FormBlockRow :header="$t('border')">
                  <Field
                    v-for="i in 4"
                    id="signatureBorder"
                    :key="i"
                    v-model="emailSettings.document.border[i - 1]"
                    :label="$t(getSideIndexLabel(i))"
                    type="number"
                  />
                  <Field
                    id="signatureBorderColor"
                    v-model="emailSettings.document.borderColor"
                    :label="$t('color')"
                    type="color"
                  />
                </FormBlockRow>
                <FormBlockRow :header="$t('padding')">
                  <Field
                    v-for="i in 4"
                    id="signaturePadding"
                    :key="i"
                    v-model="emailSettings.document.padding[i - 1]"
                    :label="$t(getSideIndexLabel(i))"
                    type="number"
                  />
                  <Field
                    id="signatureBackgroundColor"
                    v-model="emailSettings.document.backgroundColor"
                    :label="$t('color')"
                    type="color"
                  />
                </FormBlockRow>
              </div>
            </template>
          </UCollapsible>
        </template>
        <template v-else>
          <UCollapsible>
            <UButton
              :label="capitalize($t('header'))"
              icon="i-lucide-mail-question-mark"
              color="neutral"
              variant="subtle"
              trailing-icon="i-lucide-chevron-down"
              block
            />
            <template #content>
              <div class="formBlock">
                <Field
                  id="headerLayout"
                  v-model="
                    (documentTypeSettings as LetterSettings).header.layout
                  "
                  type="select"
                  :label="$t('layout')"
                  :items="headerLayouts"
                />
                <BlockSettingsEditor
                  property-name="header"
                  :settings="(documentTypeSettings as LetterSettings).header"
                />
              </div>
            </template>
          </UCollapsible>
        </template>

        <template v-if="documentType === 'resume'">
          <UCollapsible>
            <UButton
              :label="capitalize($t('aside'))"
              icon="i-lucide-panel-left-close"
              color="neutral"
              variant="subtle"
              trailing-icon="i-lucide-chevron-down"
              block
            />
            <template #content>
              <div class="formBlock">
                <BlockSettingsEditor
                  property-name="aside"
                  :settings="resumeSettings.aside"
                />
                <FormBlockRow>
                  <Field
                    id="asideWidth"
                    v-model="resumeSettings.aside.width"
                    :label="$t('width')"
                    type="range"
                    :min="0"
                    :max="100"
                  />
                  <Field
                    id="asideIsRightPositioned"
                    v-model="resumeSettings.aside.isRightPositioned"
                    :label="t('toTheRight')"
                    type="checkbox"
                  />
                </FormBlockRow>
              </div>
            </template>
          </UCollapsible>

          <UCollapsible>
            <UButton
              :label="capitalize($t('body'))"
              icon="i-lucide-file-type-corner"
              color="neutral"
              variant="subtle"
              trailing-icon="i-lucide-chevron-down"
              block
            />
            <template #content>
              <div class="formBlock">
                <BlockSettingsEditor
                  property-name="body"
                  :settings="resumeSettings.body"
                />
              </div>
            </template>
          </UCollapsible>
        </template>

        <template v-if="documentType === 'letter'">
          <UCollapsible v-if="isHeaderSimple">
            <UButton
              :label="capitalize($t('senderDetails'))"
              icon="i-lucide-mail-question-mark"
              color="neutral"
              variant="subtle"
              trailing-icon="i-lucide-chevron-down"
              block
            />
            <template #content>
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
                  v-model="letterSettings.senderDetails.gap"
                  :label="$t('gap')"
                  type="number"
                />
              </div>
            </template>
          </UCollapsible>

          <UCollapsible>
            <UButton
              :label="capitalize($t('recipientDetails'))"
              icon="i-lucide-mail-question-mark"
              color="neutral"
              variant="subtle"
              trailing-icon="i-lucide-chevron-down"
              block
            />
            <template #content>
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
                  v-model="letterSettings.recipientDetails.gap"
                  :label="$t('gap')"
                  type="number"
                />
              </div>
            </template>
          </UCollapsible>

          <UCollapsible>
            <UButton
              :label="capitalize($t('subject'))"
              icon="i-lucide-info"
              color="neutral"
              variant="subtle"
              trailing-icon="i-lucide-chevron-down"
              block
            />
            <template #content>
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
            </template>
          </UCollapsible>

          <UCollapsible>
            <UButton
              :label="capitalize($t('reference'))"
              icon="i-lucide-hash"
              color="neutral"
              variant="subtle"
              trailing-icon="i-lucide-chevron-down"
              block
            />
            <template #content>
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
            </template>
          </UCollapsible>
        </template>

        <UCollapsible>
          <UButton
            :label="capitalize($t('name'))"
            icon="i-lucide-user"
            color="neutral"
            variant="subtle"
            trailing-icon="i-lucide-chevron-down"
            block
          />
          <template #content>
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
          </template>
        </UCollapsible>

        <UCollapsible>
          <UButton
            :label="capitalize($t('title'))"
            icon="i-lucide-award"
            color="neutral"
            variant="subtle"
            trailing-icon="i-lucide-chevron-down"
            block
          />
          <template #content>
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
          </template>
        </UCollapsible>

        <UCollapsible>
          <UButton
            :label="capitalize($t('about'))"
            icon="i-lucide-user-pen"
            color="neutral"
            variant="subtle"
            trailing-icon="i-lucide-chevron-down"
            block
          />
          <template #content>
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
                v-model="documentTypeSettings.aboutQuote.isShown"
                :label="`${$t('toShow')} ${$t('quoteMark')}`"
                type="checkbox"
              />
              <FormBlockRow :header="$t('quoteMark')">
                <Field
                  id="aboutQuoteFont"
                  v-model="documentTypeSettings.aboutQuote.font"
                  type="select"
                  :label="$t('font')"
                  label-key="label"
                  value-key="value"
                  :items="
                    ['inherit', ...fonts].map((font) => ({
                      label:
                        font === 'inherit' ? capitalize($t('default')) : font,
                      value: font,
                    }))
                  "
                />
                <Field
                  id="aboutQuoteFontSize"
                  v-model="documentTypeSettings.aboutQuote.fontSize"
                  :label="$t('size')"
                  type="number"
                />
                <Field
                  id="aboutQuoteFontWeight"
                  v-model="documentTypeSettings.aboutQuote.fontWeight"
                  type="select"
                  :label="$t('fontWeight')"
                  :items="fontWeights"
                />
                <Field
                  id="aboutQuoteIsItalic"
                  v-model="documentTypeSettings.aboutQuote.isItalic"
                  :label="$t('italic')"
                  type="checkbox"
                />
                <Field
                  id="aboutQuoteColor"
                  v-model="documentTypeSettings.aboutQuote.color"
                  :label="$t('color')"
                  type="color"
                />
              </FormBlockRow>
            </div>
          </template>
        </UCollapsible>

        <UCollapsible>
          <UButton
            :label="capitalize($t('contactDetails'))"
            icon="i-lucide-contact"
            color="neutral"
            variant="subtle"
            trailing-icon="i-lucide-chevron-down"
            block
          />
          <template #content>
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
                  v-model="documentTypeSettings.contactDetails.listOrientation"
                  type="selectbutton"
                  :label="$t('orientation')"
                  label-key="label"
                  value-key="value"
                  :items="
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
                  v-model="documentTypeSettings.contactDetails.alignment"
                  type="select"
                  :label="$t('alignment')"
                  label-key="label"
                  value-key="value"
                  :items="
                    ['start', 'center', 'end'].map((alignment) => ({
                      label: capitalize($t(alignment)),
                      value: alignment,
                    }))
                  "
                />
                <Field
                  id="contactDetailsGap"
                  v-model="documentTypeSettings.contactDetails.gap"
                  :label="$t('gap')"
                  type="number"
                />
              </FormBlockRow>
              <FormBlockRow :header="$t('icon')">
                <Field
                  id="contactDetailsIsIconFirst"
                  v-model="documentTypeSettings.contactDetails.isIconFirst"
                  :label="t('iconFirst')"
                  type="checkbox"
                />
                <Field
                  id="contactDetailsIconGap"
                  v-model="documentTypeSettings.contactDetails.iconGap"
                  :label="$t('gap')"
                  type="number"
                />
                <Field
                  id="contactDetailsIconSize"
                  v-model="documentTypeSettings.contactDetails.iconSize"
                  :label="$t('size')"
                  type="number"
                />
                <Field
                  id="contactDetailsIconColor"
                  v-model="documentTypeSettings.contactDetails.iconColor"
                  :label="$t('color')"
                  type="color"
                />
              </FormBlockRow>
            </div>
          </template>
        </UCollapsible>

        <template v-if="documentType === 'letter'">
          <UCollapsible>
            <UButton
              :label="capitalize($t('paragraphs'))"
              icon="i-lucide-text-align-start"
              color="neutral"
              variant="subtle"
              trailing-icon="i-lucide-chevron-down"
              block
            />
            <template #content>
              <div class="formBlock">
                <FormBlockRow>
                  <Field
                    id="bodyColor"
                    v-model="letterSettings.body.color"
                    type="color"
                    :label="$t('color')"
                  />
                  <Field
                    id="bodyFontSize"
                    v-model="letterSettings.body.fontSize"
                    :label="$t('size')"
                    type="number"
                  />
                  <Field
                    id="bodyLineHeight"
                    v-model="letterSettings.body.lineHeight"
                    :label="$t('lineHeight')"
                    type="number"
                    :step="0.1"
                  />
                  <Field
                    id="bodyIndentation"
                    v-model="letterSettings.body.indentation"
                    :label="$t('indentation')"
                    type="number"
                  />
                  <Field
                    id="bodyIsJustified"
                    v-model="letterSettings.body.isJustified"
                    :label="$t('justified')"
                    type="checkbox"
                  />
                  <Field
                    id="bodyIsSignatureRightAligned"
                    v-model="letterSettings.body.isSignatureRightAligned"
                    label="Signature on the right TODO localize"
                    type="checkbox"
                  />
                </FormBlockRow>
                <FormBlockRow :header="$t('margin')">
                  <Field
                    v-for="i in 4"
                    :id="`bodyMargin${i}`"
                    :key="i"
                    v-model="letterSettings.body.margin[i - 1]"
                    :label="$t(getSideIndexLabel(i))"
                    type="number"
                  />
                </FormBlockRow>
              </div>
              <Field
                id="bodyGap"
                v-model="letterSettings.body.gap"
                :label="$t('gap')"
                type="number"
              />
            </template>
          </UCollapsible>
        </template>

        <template v-if="documentType === 'resume'">
          <UCollapsible>
            <UButton
              :label="capitalize($t('category'))"
              icon="i-lucide-folder"
              color="neutral"
              variant="subtle"
              trailing-icon="i-lucide-chevron-down"
              block
            />
            <template #content>
              <div class="formBlock">
                <Field
                  id="categoryisMasonry"
                  v-model="resumeSettings.category.isMasonry"
                  :label="$t('masonry')"
                  type="checkbox"
                />
                <UAlert v-if="resumeSettings.category.isMasonry" size="sm">
                  {{ t("howToGapMasonry") }}
                </UAlert>
                <Field
                  id="categoryGap"
                  v-model="resumeSettings.category.gap"
                  :label="$t('gap')"
                  type="number"
                />
                <BlockSettingsEditor
                  property-name="category"
                  :settings="resumeSettings.category"
                />
              </div>
            </template>
          </UCollapsible>

          <UCollapsible>
            <UButton
              :label="capitalize($t('categoryName'))"
              icon="i-lucide-folder-bookmark"
              color="neutral"
              variant="subtle"
              trailing-icon="i-lucide-chevron-down"
              block
            />
            <template #content>
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
            </template>
          </UCollapsible>
          <UCollapsible>
            <UButton
              :label="capitalize($t('categoryNameSeparator'))"
              icon="i-lucide-between-horizontal-start"
              color="neutral"
              variant="subtle"
              trailing-icon="i-lucide-chevron-down"
              block
            />
            <template #content>
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
            </template>
          </UCollapsible>

          <UCollapsible>
            <UButton
              :label="capitalize($t('entry'))"
              icon="i-lucide-list"
              color="neutral"
              variant="subtle"
              trailing-icon="i-lucide-chevron-down"
              block
            />
            <template #content>
              <div class="formBlock">
                <Field
                  id="entryLayout"
                  v-model="resumeSettings.entry.layout"
                  type="select"
                  :label="$t('layout')"
                  :items="entryLayouts"
                />
                <Field
                  id="entryGap"
                  v-model="resumeSettings.entry.gap"
                  :label="$t('gap')"
                  type="number"
                />
              </div>
            </template>
          </UCollapsible>

          <UCollapsible>
            <UButton
              :label="capitalize($t('entryTitle'))"
              icon="i-lucide-award"
              color="neutral"
              variant="subtle"
              trailing-icon="i-lucide-chevron-down"
              block
            />
            <template #content>
              <EntryHeaderItemSettingsEditor
                property-name="entryTitle"
                :settings="resumeSettings.entryTitle"
              />
            </template>
          </UCollapsible>

          <UCollapsible>
            <UButton
              :label="capitalize($t('entryPeriod'))"
              icon="i-lucide-calendars"
              color="neutral"
              variant="subtle"
              trailing-icon="i-lucide-chevron-down"
              block
            />
            <template #content>
              <EntryHeaderItemSettingsEditor
                property-name="entryPeriod"
                :settings="resumeSettings.entryPeriod"
              />
            </template>
          </UCollapsible>

          <UCollapsible>
            <UButton
              :label="capitalize($t('entryOrganization'))"
              icon="i-lucide-briefcase-business"
              color="neutral"
              variant="subtle"
              trailing-icon="i-lucide-chevron-down"
              block
            />
            <template #content>
              <EntryHeaderItemSettingsEditor
                property-name="entryOrganization"
                :settings="resumeSettings.entryOrganization"
              />
            </template>
          </UCollapsible>

          <UCollapsible>
            <UButton
              :label="capitalize($t('entryLocation'))"
              icon="i-lucide-map-pin-house"
              color="neutral"
              variant="subtle"
              trailing-icon="i-lucide-chevron-down"
              block
            />
            <template #content>
              <EntryHeaderItemSettingsEditor
                property-name="entryLocation"
                :settings="resumeSettings.entryLocation"
              />
            </template>
          </UCollapsible>

          <UCollapsible>
            <UButton
              :label="capitalize($t('entrySummary'))"
              icon="i-lucide-summary"
              color="neutral"
              variant="subtle"
              trailing-icon="i-lucide-chevron-down"
              block
            />
            <template #content>
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
            </template>
          </UCollapsible>

          <UCollapsible>
            <UButton
              :label="capitalize($t('entryHighlight'))"
              icon="i-lucide-list-checks"
              color="neutral"
              variant="subtle"
              trailing-icon="i-lucide-chevron-down"
              block
            />
            <template #content>
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
            </template>
          </UCollapsible>

          <UCollapsible>
            <UButton
              :label="capitalize(t('entryTag'))"
              icon="i-lucide-tag"
              color="neutral"
              variant="subtle"
              trailing-icon="i-lucide-chevron-down"
              block
            />
            <template #content>
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
                  v-model="resumeSettings.entryTag.gap"
                  :label="$t('gap')"
                  type="number"
                />
              </div>
            </template>
          </UCollapsible>
        </template>
      </section>
    </template>
    <template #footer>
      <UButton
        :label="capitalize($t('toReset'))"
        icon="i-lucide-eraser"
        outlined
        severity="danger"
        @click="askBeforeResetStyle"
      />
    </template>
  </USlideover>

  <Field
    v-model="isThemeCustomized"
    type="toggle"
    :label="t('onLabel')"
    :icon="isThemeCustomized ? 'i-lucide-wrench-off' : 'i-lucide-eye'"
    class="ml-4"
  />
  <UButton
    icon="i-lucide-wrench"
    size="sm"
    variant="outline"
    color="secondary"
    :label="`${capitalize($t('toCustomize'))}`"
    :disabled="!isThemeCustomized"
    @click="isStyleEditorOpen = true"
  />
</template>

<i18n lang="json">
{
  "br": {
    "onLabel": "TODO",
    "iconFirst": "TODO",
    "toTheRight": "TODO",
    "howToGapMasonry": "TODO",
    "confirmStyleReset": "TODO"
  },
  "de": {
    "onLabel": "angepasst",
    "iconFirst": "TODO",
    "toTheRight": "TODO",
    "howToGapMasonry": "TODO",
    "confirmStyleReset": "TODO"
  },
  "en": {
    "onLabel": "Apply own customization",
    "iconFirst": "Icon first",
    "toTheRight": "To the right",
    "howToGapMasonry": "Vertical gap is handled with category top and bottom margins.",
    "confirmStyleReset": "Reset style to defaults?"
  },
  "es": {
    "onLabel": "TODO",
    "iconFirst": "TODO",
    "toTheRight": "TODO",
    "howToGapMasonry": "TODO",
    "confirmStyleReset": "TODO"
  },
  "fr": {
    "onLabel": "Appliquer mes modifications",
    "iconFirst": "Icône d'abord",
    "toTheRight": "À droite",
    "howToGapMasonry": "L'espacement vertical est géré avec les marges haute et basse de la catégorie.",
    "confirmStyleReset": "Réinitialiser le style ?"
  }
}
</i18n>
