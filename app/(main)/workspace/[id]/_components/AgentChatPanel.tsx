"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { WorkspaceAgentChat } from "@/hooks/use-workspace-agent-chat";
import Image from "next/image";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

export function AgentChatPanel({
  chat,
  isReady,
}: {
  chat: WorkspaceAgentChat;
  isReady: boolean;
}) {
  const [input, setInput] = useState("");
  const { messages, sendMessage, stop, status, error } = chat;

  const isBusy = status === "submitted" || status === "streaming";

  return (
    <div className="pointer-events-none fixed inset-x-0 top-14 bottom-0 z-30">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel />
        <ResizableHandle className="pointer-events-auto" />
        <ResizablePanel
          defaultSize={360}
          minSize={280}
          maxSize={640}
          className="pointer-events-auto flex flex-col border-l border-white/10 bg-card shadow-2xl"
        >
          <div className="flex h-14 shrink-0 items-center gap-2 border-b border-white/6 px-4 text-sm font-medium">
            <Image
              src="/brand/mascot-dark.png"
              alt=""
              width={18}
              height={18}
              className="size-4.5"
            />
            Outpost Agent
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default AgentChatPanel;
