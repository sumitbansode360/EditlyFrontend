// src/components/editor/EditorCanvas.tsx
"use client";

import { Editor, EditorContent } from "@tiptap/react";

interface Props { editor: Editor | null; }

export default function EditorCanvas({ editor }: Props) {
  return (
    <div className="flex-1 overflow-y-auto bg-[#f0f4f8] px-2 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8">
      {/* A4-like white page. Padding scales down through the breakpoints —
          the original fixed 96px on every side left almost no usable width
          on a phone viewport. */}
      <div className="mx-auto w-full max-w-[816px] min-h-[600px] sm:min-h-[800px] md:min-h-[1056px] bg-white shadow-md rounded-sm px-5 py-6 sm:px-10 sm:py-12 md:px-16 md:py-16 lg:px-24 lg:py-24">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
