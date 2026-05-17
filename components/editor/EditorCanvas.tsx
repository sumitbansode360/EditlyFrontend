// src/components/editor/EditorCanvas.tsx
"use client";

import { Editor, EditorContent } from "@tiptap/react";

interface Props { editor: Editor | null; }

export default function EditorCanvas({ editor }: Props) {
  return (
    <div className="flex-1 overflow-y-auto bg-[#f0f4f8] px-4 py-8">
      {/* A4-like white page */}
      <div className="mx-auto max-w-[816px] min-h-[1056px] bg-white shadow-md rounded-sm px-[96px] py-[96px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}