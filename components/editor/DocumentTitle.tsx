// src/components/editor/DocumentTitle.tsx
"use client";

import { useRef, useState } from "react";

interface DocumentTitleProps {
  value: string;
  onChange: (v: string) => void;
}

export default function DocumentTitle({ value, onChange }: DocumentTitleProps) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return editing ? (
    <input
      ref={inputRef}
      autoFocus
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={() => setEditing(false)}
      onKeyDown={(e) => e.key === "Enter" && setEditing(false)}
      className="text-sm font-medium text-gray-800 bg-transparent border-b border-blue-500 outline-none w-48 px-0"
    />
  ) : (
    <span
      onClick={() => setEditing(true)}
      className="text-sm font-medium text-gray-800 hover:bg-gray-100 rounded px-1 cursor-text truncate max-w-[200px]"
    >
      {value}
    </span>
  );
}