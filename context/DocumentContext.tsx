"use client";

import React, { createContext, useState, useCallback, useMemo } from "react";
import { getDocuments } from "@/lib/api/document";
import { DocumentListItem, DocumentContextType } from "@/types/document";

const DocContext = createContext<DocumentContextType | undefined>(undefined);

export const DocProvider = ({ children }: { children: React.ReactNode }) => {
  const [documents, setDocuments] = useState<DocumentListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useCallback ensures fetchDocs reference stays the same unless deps change
  const fetchDocs = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getDocuments();
      setDocuments(data);
    } catch (err: any) {
      setError(err.message || "Failed to load documents");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // useMemo ensures the context object itself is stable
  const value: DocumentContextType = useMemo(
    () => ({
      documents,
      fetchDocs,
      isLoading,
      error,
      refreshDocuments: fetchDocs,
    }),
    // It only recreates if these specific values change
    [documents, fetchDocs, isLoading, error]
  );

  return <DocContext.Provider value={value}>{children}</DocContext.Provider>;
};

export const useDocuments = () => {
  const context = React.useContext(DocContext);

  if (context === undefined) {
    throw new Error("useDocuments must be used within a DocProvider");
  }

  return context;
};
