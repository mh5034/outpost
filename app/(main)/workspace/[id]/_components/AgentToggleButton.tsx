"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import AgentChatPanel from "./AgentChatPanel";
import { useWorkspaceEditors } from "@/components/WorkspaceEditorsContext";
import { useWorkspaceAgentChat } from "@/hooks/use-workspace-agent-chat";
import { usePathname, useRouter } from "next/navigation";

export function AgentToggleButton({
  workspaceId,
  initialPrompt,
}: {
  workspaceId: string;
  initialPrompt?: string;
}) {
  const [isOpen, setIsOpen] = useState(!!initialPrompt);
  const { canvasEditor, docEditor } = useWorkspaceEditors();
  const chat = useWorkspaceAgentChat(workspaceId, { canvasEditor, docEditor });

  const router = useRouter();
  const pathname = usePathname();

  const promptSent = useRef(false);
  // A prompt from the dashboard is sent once both editors are ready, so the agent sees both
  // surfaces. It's then dropped from the URL so a refresh doesn't send it again.
  useEffect(() => {
    if (!initialPrompt || promptSent.current || !canvasEditor || !docEditor)
      return;
    promptSent.current = true;
    chat.sendMessage({ text: initialPrompt });
    router.replace(pathname, { scroll: false });
  }, [initialPrompt, canvasEditor, docEditor, chat, router, pathname]);

  return (
    <>
      <Button
        onClick={() => setIsOpen((v) => !v)}
        size="sm"
        className="gap-1.5"
      >
        {isOpen ? (
          <>
            <X className="size-4" /> Close
          </>
        ) : (
          <>
            <Image
              src="/brand/mascot.png"
              alt=""
              width={16}
              height={16}
              className="size-4"
            />
            Ask Agent
          </>
        )}
      </Button>

      {isOpen && (
        <AgentChatPanel chat={chat} isReady={!!canvasEditor || !!docEditor} />
      )}
    </>
  );
}
