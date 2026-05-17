// src/components/editor/EditorToolbar.tsx
"use client";

import { Editor } from "@tiptap/react";
import DocumentTitle from "./DocumentTitle";
import LastSaved from "./LastSaved";
import EditorMenuBar from "./EditorMenuBar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Save, User, Settings, LogIn, LogOut } from "lucide-react";

interface Props {
  editor: Editor | null;
  docTitle: string;
  onTitleChange: (title: string) => void;
  lastSaved: Date | null;
  isSaving: boolean;
  onSave: () => void;
}

export default function EditorToolbar({
  editor, docTitle, onTitleChange, lastSaved, isSaving, onSave,
}: Props) {
  return (
    <div className="flex flex-col bg-background border-b border-border shadow-sm z-10 flex-shrink-0">
      {/* Top row: doc icon + title + save status | save button + avatar */}
      <div className="flex items-center justify-between px-4 py-2 gap-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Document icon */}
          <div className="w-8 h-8 rounded bg-foreground flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-4 h-4">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" className="fill-background" />
              <path d="M14 2v6h6M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" className="stroke-background" />
            </svg>
          </div>

          <div className="flex flex-col min-w-0">
            <DocumentTitle value={docTitle} onChange={onTitleChange} />
            <LastSaved lastSaved={lastSaved} isSaving={isSaving} />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onSave}
            disabled={isSaving}
            className="h-7 gap-1.5 text-xs"
          >
            <Save className="w-3 h-3" />
            {isSaving ? "Saving…" : "Save"}
          </Button>

          {/* Profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="w-8 h-8 cursor-pointer ring-2 ring-transparent hover:ring-border transition-all">
                <AvatarFallback className="bg-muted text-foreground text-xs font-semibold select-none">
                  U
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
                user@example.com
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 text-sm cursor-pointer">
                <User className="w-3.5 h-3.5" /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 text-sm cursor-pointer">
                <Settings className="w-3.5 h-3.5" /> Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 text-sm cursor-pointer">
                <LogIn className="w-3.5 h-3.5" /> Login
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 text-sm cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="w-3.5 h-3.5" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Separator />
      <EditorMenuBar editor={editor} />
    </div>
  );
}