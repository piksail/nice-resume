import { defineStore } from "pinia";
import { emailSettings } from "@/globals";

// Use option API to take advantage of automatic persistence
export const useEmailStore = defineStore("email", {
  state: () => ({
    // Content
    isDetailClickable: true,

    // Design
    settings: structuredClone(emailSettings),
  }),
  persist: true,
});
