"use client";

import {
  Calendar,
  FileText,
  MoreVertical,
  Pencil,
  Trash2,
  User,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DocumentItem } from "@/types/document";

type Props = {
  document: DocumentItem;
};

export function DocumentListItem({ document }: Props) {
  return (
    <Card className="group overflow-hidden rounded-xl border bg-background transition-all duration-200 hover:border-primary/40 hover:shadow-sm">
      <CardContent className="p-0">
        <div className="flex items-center gap-4 p-4">
          {/* FILE ICON */}
          <div className="flex h-20 w-16 shrink-0 items-center justify-center rounded-md border bg-muted/30">
            <FileText className="h-7 w-7 text-muted-foreground" />
          </div>

          {/* DOCUMENT INFO */}
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-1 text-sm font-medium">
              {document.title}
            </h3>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                <span>{document.owner}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>Updated {document.updatedAt}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5" />
                <span>Created {document.createdAt}</span>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-lg opacity-0 transition-opacity group-hover:opacity-100"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-52 rounded-xl"
            >
              <DropdownMenuLabel>
                Document Actions
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="cursor-pointer">
                <Pencil className="mr-2 h-4 w-4" />
                Rename
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer">
                <FileText className="mr-2 h-4 w-4" />
                Open Document
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}