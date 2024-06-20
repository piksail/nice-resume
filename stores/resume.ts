import { defineStore } from "pinia";
import type { Category, ContactDetail } from "@/types";
import { resumeSettings } from "@/globals";

// Use option API to take advantage of automatic persistence
export const useResumeStore = defineStore("resume", {
  state: () => ({
    // Content
    about: "",
    categories: [] as Category[],
    contactDetails: [] as ContactDetail[],

    // Design
    settings: structuredClone(resumeSettings),
  }),
  persist: true,
});
