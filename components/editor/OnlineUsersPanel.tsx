"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { OnlineUser } from "@/types/collaboration";
import { Users, Wifi, WifiOff } from "lucide-react";

interface Props {
  users: OnlineUser[];
  connected: boolean;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function OnlineUsersPanel({ users, connected }: Props) {
  return (
    <aside className="w-64 flex-shrink-0 border-l border-border bg-background flex flex-col">
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Users className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <h2 className="text-sm font-semibold truncate">Online now</h2>
          </div>
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-medium ${
              connected ? "text-emerald-600" : "text-muted-foreground"
            }`}
          >
            {connected ? (
              <Wifi className="w-3 h-3" />
            ) : (
              <WifiOff className="w-3 h-3" />
            )}
            {connected ? "Live" : "Offline"}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {users.length} {users.length === 1 ? "person" : "people"} editing
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {users.length === 0 ? (
          <p className="text-xs text-muted-foreground px-1 py-2">
            Waiting for collaborators…
          </p>
        ) : (
          users.map((onlineUser) => (
            <div
              key={onlineUser.clientId}
              className="flex items-center gap-3 rounded-md border border-border/60 px-3 py-2 bg-card"
            >
              <div className="relative flex-shrink-0">
                <Avatar className="w-8 h-8">
                  <AvatarFallback
                    className="text-[11px] font-semibold text-white"
                    style={{ backgroundColor: onlineUser.color }}
                  >
                    {getInitials(onlineUser.name)}
                  </AvatarFallback>
                </Avatar>
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-background bg-emerald-500"
                  aria-hidden
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{onlineUser.name}</p>
                <p className="text-[11px] text-muted-foreground">
                  {onlineUser.isCurrentUser ? "You" : "Editing"}
                </p>
              </div>

              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: onlineUser.color }}
                title={`Cursor color: ${onlineUser.color}`}
              />
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
