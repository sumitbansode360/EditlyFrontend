// types/document.ts

export interface DocumentListItem {
  id: string; // UUID
  title: string;
  owner: string; // UUID of the user
  created_at: string;
  updated_at: string;
}

export interface Document extends DocumentListItem {
  content: any; // Matches JSONField
}

export interface CreateDocumentRequest {
  title?: string;
  content?: any;
}

export interface UpdateDocumentRequest {
  title?: string;
  content?: any;
}
