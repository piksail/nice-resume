import { defineStore } from "pinia";
import type { ContactDetail } from "@/types";
import { themeBaseSettings, themes } from "@/globals";

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
    theme: themes[0],
    customColors: structuredClone(themeBaseSettings[themes[0]].colors),
  }),
  persist: true,
});
