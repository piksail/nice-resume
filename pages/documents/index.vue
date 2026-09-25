<script setup lang="ts">
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useAppwriteStore } from "@/stores/appwrite";
import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { useLetterStore } from "@/stores/letter";
import { useEditorStore } from "@/stores/editor";
import {
  fromDbDocumentType,
  type DbDocumentType,
  type SavedDocument,
} from "@/composables/use-appwrite";
import type { Export } from "@/types";

definePageMeta({
  layout: "landing",
  middleware: ["auth"],
});

const { t } = useI18n();
const router = useRouter();
const store = useAppwriteStore();
const profileStore = useProfileStore();
const resumeStore = useResumeStore();
const letterStore = useLetterStore();
const editorStore = useEditorStore();

const { user, documents, isLoading } = storeToRefs(store);

const documentTypes: DbDocumentType[] = ["CV", "CL", "ES"];

const groupedDocuments = computed(() => {
  return documentTypes
    .map((type) => ({
      type,
      label: getTypeLabel(type),
      items: documents.value.filter((doc) => doc.type === type),
    }))
    .filter((group) => group.items.length > 0);
});

onMounted(() => {
  store.loadDocuments();
});

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString();
}

function getTypeLabel(type: DbDocumentType) {
  return t(fromDbDocumentType(type));
}

function loadDocument(doc: SavedDocument) {
  const data = JSON.parse(doc.data) as Export;

  profileStore.$patch({
    name: data.profile.name,
    title: data.profile.title,
    contactDetails: data.profile.contactDetails,
  });

  resumeStore.$patch({
    categories: data.resume.categories,
  });

  letterStore.$patch({
    paragraphs: data.letter.paragraphs,
    recipientDetails: data.letter.recipientDetails,
    reference: data.letter.reference,
    subject: data.letter.subject,
  });

  editorStore.documentType = fromDbDocumentType(doc.type);
  router.push("/editor");
}

async function handleDelete(id: string) {
  await store.removeDocument(id);
}

async function logout() {
  await store.logout();
  router.push("/auth/login");
}
</script>

<template>
  <div class="min-h-screen p-8">
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-2xl font-bold">{{ t("myDocuments") }}</h1>
          <p class="text-muted-foreground">{{ user?.email }}</p>
        </div>
        <div class="flex gap-3">
          <UButton to="/editor" variant="outline">
            {{ t("toStart") }}
          </UButton>
          <UButton variant="ghost" color="error" @click="logout">
            {{ t("authSignOut") }}
          </UButton>
        </div>
      </div>

      <div v-if="isLoading" class="text-center py-12">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"
        />
      </div>

      <div v-else-if="documents.length === 0" class="text-center py-12">
        <p class="text-muted-foreground mb-4">{{ t("noDocuments") }}</p>
        <UButton to="/editor">{{ t("createFirst") }}</UButton>
      </div>

      <div v-else class="space-y-8">
        <section v-for="group in groupedDocuments" :key="group.type">
          <h2 class="text-lg font-semibold mb-3">{{ group.label }}</h2>
          <div class="grid gap-3">
            <div
              v-for="doc in group.items"
              :key="doc.$id"
              class="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div class="flex-1">
                <div class="flex items-center gap-3">
                  <span class="font-medium">{{ doc.name }}</span>
                  <span class="text-xs text-muted-foreground uppercase">
                    {{ doc.locale }}
                  </span>
                </div>
                <p class="text-sm text-muted-foreground mt-1">
                  {{ t("updated") }}: {{ formatDate(doc.$updatedAt!) }}
                </p>
              </div>
              <div class="flex gap-2">
                <UButton size="sm" @click="loadDocument(doc)">
                  {{ t("toStart") }}
                </UButton>
                <UButton
                  size="sm"
                  variant="ghost"
                  color="error"
                  @click="handleDelete(doc.$id)"
                >
                  {{ t("toRemove") }}
                </UButton>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "myDocuments": "My Documents",
    "noDocuments": "You haven't saved any documents yet.",
    "createFirst": "Create your first document",
    "updated": "Updated",
    "authSignOut": "Sign out"
  },
  "fr": {
    "myDocuments": "Mes Documents",
    "noDocuments": "Vous n'avez pas encore sauvegardé de document.",
    "createFirst": "Créer votre premier document",
    "updated": "Mis à jour",
    "authSignOut": "Se déconnecter"
  }
}
</i18n>
