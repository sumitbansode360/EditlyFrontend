"use client";

import { useEffect, useMemo, useState } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { getAccessToken } from "@/lib/axios";
import { getUserColor } from "@/lib/collaboration/userColor";
import { User } from "@/types/auth";
import { CollaborationUser, OnlineUser } from "@/types/collaboration";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:1234";

function buildCollaborationUser(user: User): CollaborationUser {
  const name = `${user.first_name} ${user.last_name}`.trim() || user.email;
  return {
    name,
    color: getUserColor(user.id),
  };
}

export function useDocumentCollaboration(
  documentId: string | undefined,
  user: User | null
) {
  const [provider, setProvider] = useState<WebsocketProvider | null>(null);
  const [synced, setSynced] = useState(false);
  const [connected, setConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);

  const ydoc = useMemo(() => new Y.Doc(), [documentId]);

  const collaborationUser = useMemo(
    () => (user ? buildCollaborationUser(user) : null),
    [user]
  );

  useEffect(() => {
    if (!documentId || !user || !collaborationUser) {
      return;
    }

    const token = getAccessToken();
    const wsProvider = new WebsocketProvider(WS_URL, documentId, ydoc, {
      params: token ? { token } : {},
    });

    wsProvider.awareness.setLocalStateField("user", collaborationUser);

    const handleStatus = ({ status }: { status: string }) => {
      setConnected(status === "connected");
    };

    const handleSync = (isSynced: boolean) => {
      setSynced(isSynced);
    };

    const updateOnlineUsers = () => {
      const states = wsProvider.awareness.getStates();
      const users: OnlineUser[] = [];

      states.forEach((state, clientId) => {
        const userState = state.user as CollaborationUser | undefined;
        if (!userState?.name) return;

        users.push({
          clientId,
          name: userState.name,
          color: userState.color,
          isCurrentUser: clientId === wsProvider.awareness.clientID,
        });
      });

      users.sort((a, b) => {
        if (a.isCurrentUser) return -1;
        if (b.isCurrentUser) return 1;
        return a.name.localeCompare(b.name);
      });

      setOnlineUsers(users);
    };

    wsProvider.on("status", handleStatus);
    wsProvider.on("sync", handleSync);
    wsProvider.awareness.on("change", updateOnlineUsers);
    updateOnlineUsers();
    setProvider(wsProvider);

    return () => {
      wsProvider.off("status", handleStatus);
      wsProvider.off("sync", handleSync);
      wsProvider.awareness.off("change", updateOnlineUsers);
      wsProvider.destroy();
      setProvider(null);
      setSynced(false);
      setConnected(false);
      setOnlineUsers([]);
    };
  }, [documentId, user, ydoc, collaborationUser]);

  return {
    ydoc,
    provider,
    synced,
    connected,
    onlineUsers,
    collaborationUser,
  };
}
