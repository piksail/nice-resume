import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useEditorStore } from "@/stores/editor";
import { useEmailStore } from "@/stores/email";
import { useLetterStore } from "@/stores/letter";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { themeSettings } from "@/globals";

export default function useDocumentSettings() {
  const { documentType } = storeToRefs(useEditorStore());

  const { isThemeCustomized, theme } = storeToRefs(useProfileStore());

  const { settings: resumeStoreSettings } = storeToRefs(useResumeStore());
  const { settings: letterStoreSettings } = storeToRefs(useLetterStore());
  const { settings: emailStoreSettings } = storeToRefs(useEmailStore());

  const settings = computed(() => {
    const defaultSettings = themeSettings[theme.value][documentType.value];
    if (documentType.value === "email") {
      return isThemeCustomized.value
        ? emailStoreSettings.value
        : defaultSettings;
    }
    if (documentType.value === "letter") {
      return isThemeCustomized.value
        ? letterStoreSettings.value
        : defaultSettings;
    }
    return isThemeCustomized.value
      ? resumeStoreSettings.value
      : defaultSettings;
  });

  return settings;
}
