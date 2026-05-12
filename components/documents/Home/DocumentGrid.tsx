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

export function DocumentGrid({ document }: Props) {
  return (
    <Card className="group w-full overflow-hidden rounded-lg border bg-background p-0 transition-all duration-200 hover:border-primary/50 hover:shadow-md">
      <CardContent className="p-0">
        {/* DOCUMENT PREVIEW */}
        <div className="relative">
          <div className="relative h-44 overflow-hidden border-b bg-muted/30 md:h-48">
            {document.thumbnail ? (
              <img
                src={document.thumbnail}
                alt={document.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border bg-background shadow-sm">
                  <FileText className="h-7 w-7 text-muted-foreground" />
                </div>
              </div>
            )}

            {/* ACTION MENU */}
            <div className="absolute right-3 top-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 rounded-lg shadow-sm"
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
          </div>
        </div>

        {/* FILE INFO */}
        <div className="space-y-2 p-3">
          {/* TITLE + MENU */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="line-clamp-1 text-[13px] font-medium leading-none">
                {document.title}
              </h3>

              <p className="mt-1.5 text-[11px] text-muted-foreground">
                Edited {document.updatedAt}
              </p>
            </div>
          </div>

          {/* METADATA */}
          <div className="space-y-1 border-t pt-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <User className="h-3 w-3" />
              <span className="line-clamp-1 text-[11px]">
                Owner: {document.owner}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                Created {document.createdAt}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}