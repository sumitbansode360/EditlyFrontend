// types/document.ts
import { DocumentAccessRole, DocumentCollaborator } from "@/types/collaboration";

export interface DocumentListItem {
  id: string; // UUID
  title: string;
  owner: string; // UUID of the user
  owner_name: string;
  // "owner" | "editor" | "viewer" | null (null shouldn't really happen —
  // the backend only returns documents you have some access to — but the
  // API types it as nullable, so we keep that honest here too).
  role: DocumentAccessRole | null;
  created_at: string;
  updated_at: string;
}

export interface Document extends DocumentListItem {
  content: any; // Matches JSONField
  collaborators: DocumentCollaborator[];
}

export interface CreateDocumentRequest {
  title?: string;
  content?: any;
}

export interface UpdateDocumentRequest {
  title?: string;
  content?: any;
}

export interface DocumentContextType {
  documents: DocumentListItem[];
  fetchDocs: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  refreshDocuments: () => Promise<void>;
}
