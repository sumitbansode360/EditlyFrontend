// src/components/editor/EditorToolbar.tsx
"use client";

import { Editor } from "@tiptap/react";
import DocumentTitle from "./DocumentTitle";
import LastSaved from "./LastSaved";
import EditorMenuBar from "./EditorMenuBar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface EditorToolbarProps {
  editor: Editor | null;
  docTitle: string;
  onTitleChange: (title: string) => void;
  lastSaved: Date | null;
  isSaving: boolean;
}

export default function EditorToolbar({
  editor,
  docTitle,
  onTitleChange,
  lastSaved,
  isSaving,
}: EditorToolbarProps) {
  return (
    <div className="flex flex-col bg-white border-b border-gray-200 shadow-sm z-10 flex-shrink-0">
      {/* Top row: title + save status + avatar */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3 min-w-0">
          {/* Google Docs-style icon */}
          <div className="w-8 h-8 rounded bg-blue-500 flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
              <path d="M14 2v6h6M8 13h8M8 17h5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex flex-col min-w-0">
            <DocumentTitle value={docTitle} onChange={onTitleChange} />
            <LastSaved lastSaved={lastSaved} isSaving={isSaving} />
          </div>
        </div>
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src="/avatar.png" />
          <AvatarFallback className="bg-blue-600 text-white text-sm font-medium">U</AvatarFallback>
        </Avatar>
      </div>

      <Separator />

      {/* Second row: formatting menu bar */}
      <EditorMenuBar editor={editor} />
    </div>
  );
}