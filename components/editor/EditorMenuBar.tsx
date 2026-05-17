// src/components/editor/EditorMenuBar.tsx
"use client";

import { Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter,
  AlignRight, AlignJustify, List, ListOrdered, ListTodo,
  Heading1, Heading2, Heading3, Undo, Redo, Highlighter, Quote,
  Minus, Code,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Props { editor: Editor | null; }

const FONT_SIZES = ["10", "11", "12", "14", "16", "18", "20", "24", "28", "32", "36", "48", "72"];
const HEADING_OPTIONS = [
  { label: "Normal text", value: "paragraph" },
  { label: "Heading 1", value: "h1" },
  { label: "Heading 2", value: "h2" },
  { label: "Heading 3", value: "h3" },
  { label: "Heading 4", value: "h4" },
];

function ToolbarButton({
  onClick, active, disabled, tooltip, children,
}: {
  onClick: () => void; active?: boolean; disabled?: boolean; tooltip: string; children: React.ReactNode;
}) {
  return (
    <TooltipProvider delayDuration={400}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size="sm"
            pressed={active}
            onPressedChange={onClick}
            disabled={disabled}
            className="h-7 w-7 p-0 data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700 hover:bg-gray-100"
          >
            {children}
          </Toggle>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default function EditorMenuBar({ editor }: Props) {
  if (!editor) return null;

  const getHeadingValue = () => {
    if (editor.isActive("heading", { level: 1 })) return "h1";
    if (editor.isActive("heading", { level: 2 })) return "h2";
    if (editor.isActive("heading", { level: 3 })) return "h3";
    if (editor.isActive("heading", { level: 4 })) return "h4";
    return "paragraph";
  };

  const setHeading = (value: string) => {
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else {
      const level = parseInt(value.replace("h", "")) as 1 | 2 | 3 | 4;
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  return (
    <div className="flex items-center gap-0.5 px-3 py-1.5 overflow-x-auto scrollbar-hide flex-wrap">
      {/* Undo / Redo */}
      <ToolbarButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} tooltip="Undo (Ctrl+Z)">
        <Undo className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} tooltip="Redo (Ctrl+Y)">
        <Redo className="w-3.5 h-3.5" />
      </ToolbarButton>

      <Separator orientation="vertical" className="h-5 mx-1" />

      {/* Paragraph / Heading style */}
      <Select value={getHeadingValue()} onValueChange={setHeading}>
        <SelectTrigger className="h-7 w-36 text-xs border-none bg-transparent hover:bg-gray-100 focus:ring-0 gap-1">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {HEADING_OPTIONS.map((o) => (
            <SelectItem key={o.value} value={o.value} className="text-xs">{o.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="h-5 mx-1" />

      {/* Font size (visual only — requires custom extension for full support) */}
      <Select defaultValue="12">
        <SelectTrigger className="h-7 w-16 text-xs border-none bg-transparent hover:bg-gray-100 focus:ring-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {FONT_SIZES.map((s) => (
            <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="h-5 mx-1" />

      {/* Bold / Italic / Underline / Strikethrough / Code */}
      <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} tooltip="Bold (Ctrl+B)">
        <Bold className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} tooltip="Italic (Ctrl+I)">
        <Italic className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} tooltip="Underline (Ctrl+U)">
        <Underline className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} tooltip="Strikethrough">
        <Strikethrough className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} tooltip="Inline code">
        <Code className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive("highlight")} tooltip="Highlight">
        <Highlighter className="w-3.5 h-3.5" />
      </ToolbarButton>

      <Separator orientation="vertical" className="h-5 mx-1" />

      {/* Text alignment */}
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} tooltip="Align left">
        <AlignLeft className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} tooltip="Center">
        <AlignCenter className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} tooltip="Align right">
        <AlignRight className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("justify").run()} active={editor.isActive({ textAlign: "justify" })} tooltip="Justify">
        <AlignJustify className="w-3.5 h-3.5" />
      </ToolbarButton>

      <Separator orientation="vertical" className="h-5 mx-1" />

      {/* Lists */}
      <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} tooltip="Bullet list">
        <List className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} tooltip="Numbered list">
        <ListOrdered className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().toggleTaskList().run()} active={editor.isActive("taskList")} tooltip="Task list">
        <ListTodo className="w-3.5 h-3.5" />
      </ToolbarButton>

      <Separator orientation="vertical" className="h-5 mx-1" />

      {/* Block extras */}
      <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} tooltip="Blockquote">
        <Quote className="w-3.5 h-3.5" />
      </ToolbarButton>
      <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} tooltip="Horizontal rule">
        <Minus className="w-3.5 h-3.5" />
      </ToolbarButton>
    </div>
  );
}