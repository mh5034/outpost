"use client";

import type { BlockNoteEditor } from "@blocknote/core";
import { DefaultChatTransport } from "ai";
import { useState } from "react";
import type { Editor } from "tldraw";
import { useChat } from "@ai-sdk/react";
import { TypeOf } from "zod/v3";

type Editors = {
  canvasEditor: Editor | null;
  docEditor: BlockNoteEditor | null;
};
export function useWorkspaceAgentChat(workspaceId: string, editors: Editors) {
  const [transport] = useState(
    () =>
      new DefaultChatTransport({
        api: "/api/agent",
        body: () => {
          return { workspaceId };
        },
      }),
  );

  const chat = useChat({
    transport,
  });

  return chat;
}

export type WorkspaceAgentChat = ReturnType<typeof useWorkspaceAgentChat>;
