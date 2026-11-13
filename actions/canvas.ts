"use server";

import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import canAcessWorkspace from "@/lib/workspace-access";

export async function saveCanvasContent(
  workspaceId: string,
  content: Prisma.InputJsonValue,
) {
  if (!(await canAcessWorkspace(workspaceId)))
    throw new Error("Workspace not found");

  await prisma.canvas.update({ where: { workspaceId }, data: { content } });
}
