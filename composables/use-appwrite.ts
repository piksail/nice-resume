import { Client, Account, Databases, Storage, Query, ID } from "appwrite";
import type { Models } from "appwrite";

export type DbDocumentType = "CV" | "CL" | "ES";

export interface SavedDocument {
  $id: string;
  userId: string;
  type: DbDocumentType;
  name: string;
  locale: string;
  data: string;
  thumbnail?: string;
  $createdAt?: string;
  $updatedAt?: string;
}

interface AppwriteDocument extends Models.Document {
  userId: string;
  type: DbDocumentType;
  name: string;
  locale: string;
  data: string;
  thumbnail?: string;
}

export function toDbDocumentType(type: string): DbDocumentType {
  return type === "letter" ? "CL" : type === "email" ? "ES" : "CV";
}

export function fromDbDocumentType(
  type: DbDocumentType,
): "resume" | "letter" | "email" {
  return type === "CL" ? "letter" : type === "ES" ? "email" : "resume";
}

function mapDocument(doc: AppwriteDocument): SavedDocument {
  return {
    $id: doc.$id,
    userId: doc.userId,
    type: doc.type,
    name: doc.name,
    locale: doc.locale,
    data: doc.data,
    thumbnail: doc.thumbnail,
    $createdAt: doc.$createdAt,
    $updatedAt: doc.$updatedAt,
  };
}

export function useAppwrite() {
  const config = useRuntimeConfig();
  const DATABASE_ID = config.public.appwriteDatabaseId;
  const COLLECTION_ID = config.public.appwriteCollectionId;
  const BUCKET_ID = config.public.appwriteBucketId;

  const client = new Client();
  client
    .setEndpoint(config.public.appwriteEndpoint)
    .setProject(config.public.appwriteProjectId);

  const account = new Account(client);
  const databases = new Databases(client);
  const storage = new Storage(client);

  async function createAccount(email: string, password: string, name?: string) {
    await account.create(ID.unique(), email, password, name);
  }

  async function createEmailPasswordSession(email: string, password: string) {
    await account.createEmailPasswordSession(email, password);
  }

  async function getCurrentUser() {
    try {
      return await account.get();
    } catch {
      return null;
    }
  }

  async function deleteSession() {
    await account.deleteSession("current");
  }

  async function listDocuments(userId: string): Promise<SavedDocument[]> {
    const res = await databases.listDocuments<AppwriteDocument>(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal("userId", userId), Query.orderDesc("$updatedAt")],
    );
    return res.documents.map(mapDocument);
  }

  async function getDocument(id: string): Promise<SavedDocument> {
    const doc = await databases.getDocument<AppwriteDocument>(
      DATABASE_ID,
      COLLECTION_ID,
      id,
    );
    return mapDocument(doc);
  }

  async function createDocument(
    doc: Omit<
      SavedDocument,
      "$id" | "$createdAt" | "$updatedAt" | "$permissions"
    >,
  ): Promise<SavedDocument> {
    const created = await databases.createDocument<AppwriteDocument>(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      doc,
    );
    return mapDocument(created);
  }

  async function updateDocument(
    id: string,
    doc: Partial<
      Omit<SavedDocument, "$id" | "$createdAt" | "$updatedAt" | "$permissions">
    >,
  ): Promise<SavedDocument> {
    const updated = await databases.updateDocument<AppwriteDocument>(
      DATABASE_ID,
      COLLECTION_ID,
      id,
      doc,
    );
    return mapDocument(updated);
  }

  async function deleteDocument(id: string): Promise<void> {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
  }

  async function uploadThumbnail(
    file: File,
    documentId: string,
  ): Promise<string> {
    const uploaded = await storage.createFile(BUCKET_ID, documentId, file);
    return uploaded.$id;
  }

  function getThumbnailUrl(fileId: string): string {
    return storage.getFileDownload(BUCKET_ID, fileId);
  }

  async function ping() {
    return client.ping();
  }

  return {
    client,
    account,
    databases,
    storage,
    ping,
    createAccount,
    createEmailPasswordSession,
    getCurrentUser,
    deleteSession,
    listDocuments,
    getDocument,
    createDocument,
    updateDocument,
    deleteDocument,
    uploadThumbnail,
    getThumbnailUrl,
  };
}

export type AppwriteClient = ReturnType<typeof useAppwrite>;
