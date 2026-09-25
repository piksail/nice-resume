import { ref } from "vue";
import { defineStore } from "pinia";
import type { Models } from "appwrite";
import { useAppwrite, type SavedDocument } from "@/composables/use-appwrite";

export const useAppwriteStore = defineStore("appwrite", () => {
  const user = ref<Models.User<Models.Preferences> | null>(null);
  const documents = ref<SavedDocument[]>([]);
  const isLoading = ref(false);
  const isAuthLoading = ref(true);

  async function initAuth() {
    isAuthLoading.value = true;
    const appwrite = useAppwrite();
    user.value = await appwrite.getCurrentUser();
    isAuthLoading.value = false;
  }

  async function loadDocuments() {
    if (!user.value) return;
    isLoading.value = true;
    const appwrite = useAppwrite();
    documents.value = await appwrite.listDocuments(user.value.$id);
    isLoading.value = false;
  }

  async function saveDocument(
    doc: Omit<SavedDocument, "$id" | "$permissions">,
    thumbnailDataUrl?: string,
  ) {
    const appwrite = useAppwrite();
    if (thumbnailDataUrl) {
      doc.thumbnail = thumbnailDataUrl;
    }
    const saved = await appwrite.createDocument(doc);
    documents.value.unshift(saved);
    return saved;
  }

  async function updateDocument(id: string, data: Partial<SavedDocument>) {
    const appwrite = useAppwrite();
    const updated = await appwrite.updateDocument(id, data);
    const idx = documents.value.findIndex((d) => d.$id === id);
    if (idx !== -1) documents.value[idx] = updated;
    return updated;
  }

  async function removeDocument(id: string) {
    const appwrite = useAppwrite();
    await appwrite.deleteDocument(id);
    documents.value = documents.value.filter((d) => d.$id !== id);
  }

  async function logout() {
    const appwrite = useAppwrite();
    await appwrite.deleteSession();
    user.value = null;
    documents.value = [];
  }

  return {
    user,
    documents,
    isLoading,
    isAuthLoading,
    initAuth,
    loadDocuments,
    saveDocument,
    updateDocument,
    removeDocument,
    logout,
  };
});
