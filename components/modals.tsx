"use client";

import { useEffect, useState } from "react";

import { CreateChannelModal } from "@/features/channels/components/CreateChannelModal";
import { CreateWorkspaceModal } from "@/features/workspaces/components/createWorkspaceModal";

export const Modals = () => {
  const [mounted, setMounted] = useState(false);

  // To prevent potential hydration problem, useEffect is used to force this to be a client-side component
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/rules-of-hooks, @typescript-eslint/ban-ts-comment
    // @ts-ignore - This is a standard hydration pattern
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <CreateWorkspaceModal />
      <CreateChannelModal />
    </>
  );
};