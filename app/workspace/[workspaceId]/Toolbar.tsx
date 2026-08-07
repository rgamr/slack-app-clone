"use client";

import { Info, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useGetWorkspace } from "@/features/workspaces/api/useGetWorkspace";
import { useWorkspaceId } from "@/hooks/useWorkSpaceId";

export const Toolbar = () => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();

  const { data: workspace } = useGetWorkspace({ id: workspaceId });

  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#481349] flex items-center justify-between h-10 p-1.5">
      <div className="flex-1"></div>
      <div className="min-w-[280px] max-[642px] grow-[2] shrink">
        <Button
          size="sm"
          className="bg-accent/25 hover:bg-accent-25 w-full justify-start h-7 px-2 text-white"
          onClick={() => setOpen(true)}
        >
          <Search className="size-4 text-white mr-2" />
          <span className="text-white text-xs">Search {workspace?.name}</span>
        </Button>
      </div>
      <div className="ml-auto flex-1 flex items-center justify-end">
        {/* TODO: Implement info button */}
        <Button variant="transparent" size="iconSm" disabled>
          <Info className="size-5 text-white" />
        </Button>
      </div>
    </div>
  );
};