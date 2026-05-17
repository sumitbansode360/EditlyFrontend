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
import FontSize from "./extensions/FontSize";
import EditorToolbar from "./EditorToolbar";
import EditorCanvas from "./EditorCanvas";

export default function DocumentEditor() {
  const [docTitle, setDocTitle] = useState("Untitled Document");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const editor = useEditor({
    // ← Fix SSR hydration warning
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        // ← Fix: StarterKit includes these — disable to avoid duplicates
        underline: false,      // we add it manually below
        heading: { levels: [1, 2, 3, 4] },
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Underline,               // ← now added exactly once
      TextStyle,               // ← required by FontSize + Color
      Color,
      FontSize,                // ← custom font size extension
      Highlight.configure({ multicolor: false }),
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

  // ── Manual save: Ctrl+S ──────────────────────────────────────
  const handleSave = useCallback(async () => {
    if (isSaving) return;
    setIsSaving(true);
    try {
      // TODO: replace with your Django API call
      // await fetch("/api/documents/1/", {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     title: docTitle,
      //     content: editor?.getHTML(),
      //   }),
      // });
      await new Promise((r) => setTimeout(r, 600)); // simulate network
      setLastSaved(new Date());
    } finally {
      setIsSaving(false);
    }
  }, [isSaving]);

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
      />
      <EditorCanvas editor={editor} />
    </div>
  );
}