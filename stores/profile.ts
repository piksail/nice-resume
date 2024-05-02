import { defineStore } from "pinia";
import type { ContactDetail } from "@/types";
import { templateBaseSettings, templates } from "@/globals";

// Use option API to take advantage of automatic persistence
export const useProfileStore = defineStore("profile", {
  state: () => ({
    // Content
    name: "",
    title: "",
    about: "",
    contactDetails: [] as ContactDetail[],

    // Design
    isThemeCustomized: false,
    template: templates[0],
    customColors: structuredClone(templateBaseSettings[templates[0]].colors),
  }),
  persist: true,
});
