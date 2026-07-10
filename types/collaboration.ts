// --- Live presence (Yjs / WebSocket awareness) ---
// Who's currently viewing/editing this document right now, in this session.
export interface CollaborationUser {
  name: string;
  color: string;
}

export interface OnlineUser extends CollaborationUser {
  clientId: number;
  isCurrentUser: boolean;
}

// --- Document sharing (REST API) ---
// Who has been *granted access* to this document, independent of whether
// they're online right now. Comes from /api/collaborations/.
export type CollaboratorRole = "editor" | "viewer";
export type CollaboratorStatus = "pending" | "active";

// The caller's own access level on a document — "owner" is not a role you
// can invite someone as, it's derived server-side from Document.owner.
export type DocumentAccessRole = "owner" | CollaboratorRole;

export interface DocumentCollaborator {
  id: string;
  document: string;
  // For a still-pending invite (no linked account yet) this is the invited
  // email; once linked it's the user's real email. Either way, `email` is
  // always safe to render.
  email: string;
  name: string | null;
  role: CollaboratorRole;
  status: CollaboratorStatus;
  invited_at: string;
  accepted_at: string | null;
}

export interface InviteCollaboratorPayload {
  document_id: string;
  email: string;
  role: CollaboratorRole;
}
