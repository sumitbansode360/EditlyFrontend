"use client";

import { useState } from "react";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { DocumentGrid } from "./DocumentGrid";
import { DocumentListItem } from "./DocumentListItem";
import { DocumentViewToggle } from "./DocumentViewToggle";

import { DocumentItem } from "@/types/document";

type Props = {
  documents: DocumentItem[];
};

export function DocumentList({
  documents,
}: Props) {
  const [view, setView] = useState<"grid" | "list">(
    "grid"
  );

  return (
    <section className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            Recent Documents
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage and collaborate on your files
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DocumentViewToggle
            view={view}
            onChange={setView}
          />

          <Button
            size="sm"
            className="h-10 rounded-lg px-4"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Document
          </Button>
        </div>
      </div>

      {/* GRID VIEW */}
      {view === "grid" ? (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6">
          {documents.map((document) => (
            <DocumentGrid
              key={document.id}
              document={document}
            />
          ))}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="space-y-3">
          {documents.map((document) => (
            <DocumentListItem
              key={document.id}
              document={document}
            />
          ))}
        </div>
      )}
    </section>
  );
}