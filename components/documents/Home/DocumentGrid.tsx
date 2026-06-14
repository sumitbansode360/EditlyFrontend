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
import { formatDate } from "@/utils/formatDate";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DocumentListItem as DocType } from "@/types/document";

type Props = {
  document: DocType;
};

export function DocumentGrid({ document }: Props) {
  return (
    <Card className="group w-full overflow-hidden rounded-lg border bg-background p-0 transition-all duration-200 hover:border-primary/50 hover:shadow-md">
      <CardContent className="p-0">
        {/* DOCUMENT PREVIEW */}
        <div className="relative">
          <div className="relative h-44 overflow-hidden border-b bg-muted/20 p-4 md:h-48">
            {/* DOCUMENT PAPER */}
            <div className="mx-auto h-full w-[85%] rounded-sm border bg-background shadow-sm transition-transform duration-300 group-hover:scale-[1.01]">
              {/* DOCUMENT HEADER */}
              <div className="border-b px-4 py-3">
                <div className="h-3 w-24 rounded bg-muted-foreground/20" />
              </div>

              {/* DOCUMENT CONTENT */}
              <div className="space-y-2 p-4">
                <div className="h-2 w-full rounded bg-muted-foreground/10" />

                <div className="h-2 w-[92%] rounded bg-muted-foreground/10" />

                <div className="h-2 w-[80%] rounded bg-muted-foreground/10" />

                <div className="pt-4">
                  <div className="h-2 w-[70%] rounded bg-muted-foreground/10" />
                </div>

                <div className="h-2 w-full rounded bg-muted-foreground/10" />

                <div className="h-2 w-[85%] rounded bg-muted-foreground/10" />

                <div className="h-2 w-[60%] rounded bg-muted-foreground/10" />
              </div>
            </div>

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
          {/* TITLE */}
          <div className="min-w-0">
            <h3 className="line-clamp-1 text-[13px] font-medium leading-none">
              {document.title}
            </h3>

            <p className="mt-1.5 text-[11px] text-muted-foreground">
              Updated {formatDate(document.updated_at)}
            </p>
          </div>

          {/* METADATA */}
          <div className="space-y-1 border-t pt-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <User className="h-3.5 w-3.5" />

              <span className="line-clamp-1 text-[11px]">
                {document.owner_name}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />

              <span className="text-[11px]">
                Created {formatDate(document.created_at)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}