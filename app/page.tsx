"use client";
import { UserButton } from "@/features/auth/components/user-button";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useGetWorkspaces } from "@/features/workspaces/api/use-get-wokspaces";
import { useRouter } from "next/navigation";
import { useMemo, useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const { isLoading, data: workspaces } = useGetWorkspaces();

  const [open, setOpen] = useCreateWorkspaceModal();

  const workspaceId = useMemo(() => workspaces?.[0]?._id, [workspaces]);

  useEffect(() => {
    if (isLoading) 
      return;

    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [workspaceId, isLoading, open, setOpen, router]);

  return (
    <div>
      <UserButton />
    </div>
  );
}
