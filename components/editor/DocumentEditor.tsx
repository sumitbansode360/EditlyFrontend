"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCaret from "@tiptap/extension-collaboration-caret";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import FontSize from "./extensions/FontSize";
import EditorToolbar from "./EditorToolbar";
import EditorCanvas from "./EditorCanvas";
import OnlineUsersPanel from "./OnlineUsersPanel";
import ReadOnlyBanner from "./ReadOnlyBanner";
import { useUser } from "@/context/UserContext";
import { getDocument, putDocument } from "@/lib/api/document";
import { useDocumentCollaboration } from "@/hooks/useDocumentCollaboration";
import { CollaborationUser, OnlineUser } from "@/types/collaboration";
import { Document } from "@/types/document";
import { User } from "@/types/auth";

function isTipTapContentEmpty(content: unknown): boolean {
  if (!content || typeof content !== "object") return true;
  if (Object.keys(content as object).length === 0) return true;

  const doc = content as { type?: string; content?: unknown[] };
  return doc.type === "doc" && (!doc.content || doc.content.length === 0);
}

function buildEditorExtensions(
  ydoc: Y.Doc,
  provider: WebsocketProvider,
  collaborationUser: CollaborationUser
) {
  return [
    StarterKit.configure({
      undoRedo: false,
      underline: false,
      heading: { levels: [1, 2, 3, 4] },
      bulletList: { keepMarks: true, keepAttributes: false },
      orderedList: { keepMarks: true, keepAttributes: false },
    }),
    Collaboration.configure({ document: ydoc }),
    CollaborationCaret.configure({
      provider,
      user: collaborationUser,
    }),
    Underline,
    TextStyle,
    Color,
    FontSize,
    Highlight.configure({ multicolor: false }),
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    Placeholder.configure({ placeholder: "Start typing your document…" }),
    Typography,
    TaskList,
    TaskItem.configure({ nested: true }),
  ];
}

interface CollaborativeEditorProps {
  document: Document;
  ydoc: Y.Doc;
  provider: WebsocketProvider;
  collaborationUser: CollaborationUser;
  onlineUsers: OnlineUser[];
  connected: boolean;
  synced: boolean;
  user: User;
}

function CollaborativeEditor({
  document,
  ydoc,
  provider,
  collaborationUser,
  onlineUsers,
  connected,
  synced,
  user,
}: CollaborativeEditorProps) {
  const [docTitle, setDocTitle] = useState(document.title);
  const [lastSaved, setLastSaved] = useState<Date | null>(
    document.updated_at ? new Date(document.updated_at) : null
  );
  const [isSaving, setIsSaving] = useState(false);
  const hasSeededContent = useRef(false);

  // Fail closed: if `role` is ever missing/unrecognized, treat the document
  // as read-only rather than editable. The backend already gates who can
  // reach this page at all (get_object() 403s a non-collaborator before we
  // ever get here) — this is purely about what the UI lets you *do* once
  // you're in.
  const role = document.role ?? "viewer";
  const isReadOnly = role === "viewer";

  const editor = useEditor(
    {
      immediatelyRender: false,
      editable: !isReadOnly,
      extensions: buildEditorExtensions(ydoc, provider, collaborationUser),
      editorProps: {
        attributes: {
          class: "outline-none min-h-full",
        },
      },
    },
    [provider, collaborationUser, ydoc]
  );

  useEffect(() => {
    if (!editor || !synced || hasSeededContent.current) return;

    if (editor.isEmpty && !isTipTapContentEmpty(document.content)) {
      editor.commands.setContent(document.content);
    }

    hasSeededContent.current = true;
  }, [editor, synced, document.content]);

  const handleSave = useCallback(async () => {
    if (isSaving || !editor || isReadOnly) return;

    setIsSaving(true);
    try {
      const saved = await putDocument(document.id, {
        title: docTitle,
        content: editor.getJSON(),
      });
      setLastSaved(new Date(saved.updated_at));
      toast.success("Document saved");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save document"
      );
    } finally {
      setIsSaving(false);
    }
  }, [isSaving, editor, document.id, docTitle, isReadOnly]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleSave]);

  return (
    <div className="flex flex-col h-screen bg-[#f0f4f8] overflow-hidden">
      <EditorToolbar
        editor={editor}
        docTitle={docTitle}
        onTitleChange={setDocTitle}
        lastSaved={lastSaved}
        isSaving={isSaving}
        onSave={handleSave}
        user={user}
        documentId={document.id}
        role={role}
      />

      {isReadOnly && <ReadOnlyBanner />}

      <div className="flex flex-1 min-h-0 overflow-hidden">
        <EditorCanvas editor={editor} />
        <OnlineUsersPanel users={onlineUsers} connected={connected} />
      </div>
    </div>
  );
}

export default function DocumentEditor() {
  const params = useParams();
  const documentId = params?.id as string | undefined;
  const { user } = useUser();

  const [document, setDocument] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const {
    ydoc,
    provider,
    synced,
    connected,
    onlineUsers,
    collaborationUser,
  } = useDocumentCollaboration(documentId, user);

  useEffect(() => {
    if (!documentId) return;

    const id = documentId;
    let cancelled = false;

    async function loadDocument() {
      setIsLoading(true);
      setLoadError(null);

      try {
        const doc = await getDocument(id);
        if (!cancelled) {
          setDocument(doc);
        }
      } catch (error) {
        if (!cancelled) {
          // A 403 lands here too (non-collaborator, or pending invite that
          // hasn't been activated yet) — the backend's get_object() check
          // is what actually enforces this; this message is just what the
          // person sees.
          setLoadError(
            error instanceof Error ? error.message : "Failed to load document"
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadDocument();

    return () => {
      cancelled = true;
    };
  }, [documentId]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-3 bg-[#f0f4f8]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm font-medium text-muted-foreground">
          Loading document…
        </p>
      </div>
    );
  }

  if (loadError || !document || !documentId) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-2 bg-[#f0f4f8]">
        <p className="text-sm font-medium text-destructive">
          {loadError ?? "Document not found"}
        </p>
      </div>
    );
  }

  if (!user || !provider || !collaborationUser) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-3 bg-[#f0f4f8]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-sm font-medium text-muted-foreground">
          Connecting to live session…
        </p>
      </div>
    );
  }

  return (
    <CollaborativeEditor
      document={document}
      ydoc={ydoc}
      provider={provider}
      collaborationUser={collaborationUser}
      onlineUsers={onlineUsers}
      connected={connected}
      synced={synced}
      user={user}
    />
  );
}
