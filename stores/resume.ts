import { defineStore } from "pinia";
import type { Category } from "@/types";
import { resumeSettings } from "@/globals";

// Use option API to take advantage of automatic persistence
export const useResumeStore = defineStore("resume", {
  state: () => ({
    // Content
    categories: [] as Category[],
    isHeaderSimple: false,
    simpleHeaderCategoryName: "",

    // Design
    settings: structuredClone(resumeSettings),
  }),
  persist: true,
});
