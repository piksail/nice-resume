import { defineStore } from "pinia";
import { emailSettings } from "@/globals";

// Use option API to take advantage of automatic persistence
// @ts-expect-error - TS does not handle option API syntax
export const useEmailStore = defineStore("email", {
  state: () => ({
    // Content
    isDetailClickable: true,
    // TODO réfléchir à un "Head of machin | OEFR" qu'on pourrait chopper dans categories.find->work.entries[0]

    // Design
    settings: structuredClone(emailSettings),
  }),
  persist: true,
});
