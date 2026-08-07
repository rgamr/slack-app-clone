"use client";

import { useEffect, useState } from "react";

import { Loader } from "lucide-react";
import { Toolbar } from "./Toolbar";
import { Sidebar } from "./Sidebar";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { WorkspaceSidebar } from "./WorkspaceSidebar";

interface WorkspaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // const { parentMessageId, profileMemberId, close } = usePanel();

  // const showPanel = !!parentMessageId || !!profileMemberId;

  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        {!isMounted ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <ResizablePanelGroup
            orientation="horizontal"
            autoSave="wck-workspace-layout"
          >
            <ResizablePanel
              defaultSize={20}
              minSize={11}
              className="bg-[#5E2C5F]"
            >
              <WorkspaceSidebar />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={80} minSize={20}>
              {children}
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>
    </div>
  );
};

export default WorkspaceIdLayout;
