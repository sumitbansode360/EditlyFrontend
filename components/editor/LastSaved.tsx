// src/components/editor/LastSaved.tsx
interface LastSavedProps {
  lastSaved: Date | null;
  isSaving: boolean;
}

export default function LastSaved({ lastSaved, isSaving }: LastSavedProps) {
  if (isSaving) {
    return <span className="text-xs text-gray-400">Saving…</span>;
  }
  if (!lastSaved) {
    return <span className="text-xs text-gray-400">Not saved yet</span>;
  }
  return (
    <span className="text-xs text-gray-400">
      Saved at {lastSaved.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
    </span>
  );
}