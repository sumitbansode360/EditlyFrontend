import { FileText, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function EmptyDocuments() {
  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl border border-dashed bg-muted/20 px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl border bg-background shadow-sm">
        <FileText className="h-10 w-10 text-muted-foreground" />
      </div>

      <h2 className="mt-6 text-2xl font-bold">
        No documents found
      </h2>

      <p className="mt-3 max-w-md text-muted-foreground">
        Create your first collaborative document and start
        writing with your team in realtime.
      </p>

      <Button className="mt-6 rounded-xl">
        <Plus className="mr-2 h-4 w-4" />
        Create Document
      </Button>
    </div>
  );
}