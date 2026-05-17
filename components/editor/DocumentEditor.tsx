// src/components/editor/DocumentEditor.tsx
"use client";

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
import { useState, useCallback, useEffect } from "react";

import EditorToolbar from "./EditorToolbar";
import EditorCanvas from "./EditorCanvas";

export default function DocumentEditor() {
  const [docTitle, setDocTitle] = useState("Untitled Document");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Start typing your document…" }),
      Typography,
      TaskList,
      TaskItem.configure({ nested: true }),
    ],
    content: "<p></p>",
    editorProps: {
      attributes: {
        class: "outline-none min-h-full",
      },
    },
  });

  // Auto-save simulation (debounced)
  const triggerSave = useCallback(() => {
    setIsSaving(true);
    setTimeout(() => {
      setLastSaved(new Date());
      setIsSaving(false);
    }, 800);
  }, []);

  useEffect(() => {
    if (!editor) return;
    const handler = setTimeout(triggerSave, 2000);
    const unsub = editor.on("update", () => {
      clearTimeout(handler);
      setTimeout(triggerSave, 2000);
    });
    return () => unsub.destroy();
  }, [editor, triggerSave]);

  return (
    <div className="flex flex-col h-screen bg-[#f0f4f8] overflow-hidden">
      <EditorToolbar
        editor={editor}
        docTitle={docTitle}
        onTitleChange={setDocTitle}
        lastSaved={lastSaved}
        isSaving={isSaving}
      />
      <EditorCanvas editor={editor} />
    </div>
  );
}