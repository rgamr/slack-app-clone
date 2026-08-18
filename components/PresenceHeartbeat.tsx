"use client";

import { useEffect } from "react";
import { Id } from "../convex/_generated/dataModel";
import { useHeartbeat } from "@/features/presence/api/useHeartbeat";

interface PresenceHeartbeatProps {
  workspaceId: Id<"workspaces">;
}

export const PresenceHeartbeat = ({ workspaceId }: PresenceHeartbeatProps) => {
  const { mutate } = useHeartbeat();

  useEffect(() => {
    // Initial heartbeat
    mutate({ workspaceId });

    // Subsequent heartbeats every 5 seconds
    const interval = setInterval(() => {
      mutate({ workspaceId });
    }, 5000);

    return () => clearInterval(interval);
  }, [workspaceId, mutate]);

  return null;
};
