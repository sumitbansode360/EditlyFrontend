"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { getAccessToken } from "@/lib/axios";
import { getUserColor } from "@/lib/collaboration/userColor";
import { User } from "@/types/auth";
import { CollaborationUser, OnlineUser } from "@/types/collaboration";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:1234";

// How long a remote cursor can sit without moving before we fade it out.
const IDLE_THRESHOLD_MS = 5000;
const IDLE_CHECK_INTERVAL_MS = 1000;

function buildCollaborationUser(user: User): CollaborationUser {
  const name = `${user.first_name} ${user.last_name}`.trim() || user.email;
  return {
    id: user.id,
    name,
    color: getUserColor(user.id),
  };
}

export function useDocumentCollaboration(
  documentId: string | undefined,
  user: User | null,
) {
  const [provider, setProvider] = useState<WebsocketProvider | null>(null);
  const [synced, setSynced] = useState(false);
  const [connected, setConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [idleUserIds, setIdleUserIds] = useState<Set<string>>(new Set());

  const ydoc = useMemo(() => new Y.Doc(), [documentId]);

  const collaborationUser = useMemo(
    () => (user ? buildCollaborationUser(user) : null),
    [user],
  );

  // clientId -> last-seen serialized cursor, to detect movement
  const previousCursorsRef = useRef<Map<number, string>>(new Map());
  // stable user key -> timestamp of last detected cursor movement
  const lastActivityRef = useRef<Map<string, number>>(new Map());

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
      const now = Date.now();

      // Dedupe by stable user id (see the multi-tab fix) while we're here.
      const byUserId = new Map<string, OnlineUser>();

      states.forEach((state, clientId) => {
        const userState = state.user as CollaborationUser | undefined;
        if (!userState?.name) return;

        const key = userState.id ?? userState.name;
        const isThisConnectionMe = clientId === wsProvider.awareness.clientID;

        // Track cursor movement per-connection, record activity against
        // the person (not the connection) so any of their tabs counts.
        const serializedCursor = state.cursor
          ? JSON.stringify(state.cursor)
          : null;
        const prevSerialized = previousCursorsRef.current.get(clientId);
        if (serializedCursor !== null && serializedCursor !== prevSerialized) {
          lastActivityRef.current.set(key, now);
        }
        if (serializedCursor !== null) {
          previousCursorsRef.current.set(clientId, serializedCursor);
        }

        const existing = byUserId.get(key);
        if (existing) {
          existing.sessionCount += 1;
          existing.isCurrentUser = existing.isCurrentUser || isThisConnectionMe;
          if (isThisConnectionMe) {
            existing.clientId = clientId;
          }
          return;
        }

        byUserId.set(key, {
          id: key,
          clientId,
          name: userState.name,
          color: userState.color,
          isCurrentUser: isThisConnectionMe,
          sessionCount: 1,
        });
      });

      const users = Array.from(byUserId.values());

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
      ydoc.destroy();
      setProvider(null);
      setSynced(false);
      setConnected(false);
      setOnlineUsers([]);
      setIdleUserIds(new Set());
      previousCursorsRef.current.clear();
      lastActivityRef.current.clear();
    };
  }, [documentId, user, ydoc, collaborationUser]);

  // Separate timer loop: recompute who's idle every second. This has to be
  // time-driven rather than purely reactive to awareness changes, since
  // "5 seconds have passed with no new data" is exactly the condition we
  // can't detect just by listening for new data.
  useEffect(() => {
    if (!provider) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const idle = new Set<string>();
      lastActivityRef.current.forEach((lastActive, key) => {
        if (now - lastActive > IDLE_THRESHOLD_MS) {
          idle.add(key);
        }
      });
      setIdleUserIds(idle);
    }, IDLE_CHECK_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [provider]);

  return {
    ydoc,
    provider,
    synced,
    connected,
    onlineUsers,
    collaborationUser,
    idleUserIds,
  };
}
