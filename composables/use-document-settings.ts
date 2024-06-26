import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useEmailStore } from "@/stores/email";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { templateSettings } from "@/globals";

export default function useDocumentSettings() {
  const { documentType } = storeToRefs(useEditorStore());

  const { isThemeCustomized, template } = storeToRefs(useProfileStore());

  const { settings: resumeStoreSettings } = storeToRefs(useResumeStore());
  const { settings: letterStoreSettings } = storeToRefs(useLetterStore());
  const { settings: emailStoreSettings } = storeToRefs(useEmailStore());

  const settings = computed(() => {
    if (documentType.value === "email") {
      return isThemeCustomized.value
        ? emailStoreSettings
        : templateSettings[template.value][documentType.value];
    }
    if (documentType.value === "letter") {
      return isThemeCustomized.value
        ? letterStoreSettings
        : templateSettings[template.value][documentType.value];
    }
    return isThemeCustomized.value
      ? resumeStoreSettings
      : templateSettings[template.value][documentType.value];
  });

  return settings.value;
}
