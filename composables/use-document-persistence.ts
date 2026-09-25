import { useProfileStore } from "@/stores/profile";
import { useResumeStore } from "@/stores/resume";
import { useLetterStore } from "@/stores/letter";
import { useAppwriteStore } from "@/stores/appwrite";
import { toDbDocumentType } from "@/composables/use-appwrite";
import type {
  DocumentType,
  Export,
  Profile,
  Resume,
  Letter,
  Email,
} from "@/types";

export function useDocumentPersistence() {
  const profileStore = useProfileStore();
  const resumeStore = useResumeStore();
  const letterStore = useLetterStore();
  const appwriteStore = useAppwriteStore();

  function collectDocumentData(_type: DocumentType): Export {
    const profile: Profile = {
      theme: profileStore.theme ?? "default",
      name: profileStore.name,
      title: profileStore.title,
      contactDetails: profileStore.contactDetails,
    };

    const resume: Resume = {
      about: profileStore.about || "",
      categories: resumeStore.categories,
    };

    const letter: Letter = {
      recipientDetails: letterStore.recipientDetails,
      subject: letterStore.subject,
      reference: letterStore.reference,
      paragraphs: letterStore.paragraphs,
    };

    const email: Email = {
      theme: profileStore.theme ?? "default",
      name: profileStore.name,
      title: profileStore.title,
      contactDetails: profileStore.contactDetails,
    };

    return { isNiceResumeExport: true, profile, resume, letter, email };
  }

  async function saveDocument(
    name: string,
    type: DocumentType,
    locale: string,
  ) {
    const data = collectDocumentData(type);
    await appwriteStore.saveDocument({
      userId: appwriteStore.user!.$id,
      type: toDbDocumentType(type),
      name,
      locale,
      data: JSON.stringify(data),
    });
  }

  return {
    collectDocumentData,
    saveDocument,
  };
}
