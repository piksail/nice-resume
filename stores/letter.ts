import { defineStore } from "pinia";
import { letterSettings } from "@/globals";

// Use option API to take advantage of automatic persistence
export const useLetterStore = defineStore("letter", {
  state: () => ({
    // Content
    isHeaderSimple: false,
    paragraphs: [] as string[],
    recipientDetails: [] as string[],
    reference: "",
    senderDetails: [] as string[],
    subject: "",

    // Design
    settings: structuredClone(letterSettings),
  }),
  persist: true,
});
