"use server";

import { FREE_WORKSPACE_LIMIT, LimitError } from "@/lib/plan-limits";
import { checkUser } from "./check-user";
import { auth } from "@clerk/nextjs/server";
import { scopeWhere } from "@/lib/workspace-scope";
import { getEntitlements, workspaceOwnerSelect } from "@/lib/billing";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import canAccessWorkspace from "@/lib/workspace-access";
import { WorkspaceStatus } from "@/lib/generated/prisma/enums";

function revalidateWorkspacesLists() {
  revalidatePath("/dashboard");
  revalidatePath("/workpspaces");
}

export async function createWorkspace(
  name: string,
  description?: string,
): Promise<{ workspace: { id: string } } | { limit: LimitError }> {
  const user = await checkUser();
  if (!user) throw new Error("Not signed in");

  const trimmedName = name.trim();
  if (!trimmedName) throw new Error("Workspace name is required");

  const { orgId } = await auth();
  const scope = scopeWhere(orgId, user.id);

  const { unlimitedWorkspaces } = await getEntitlements(orgId ?? user.clerkId);

  if (
    !unlimitedWorkspaces &&
    (await prisma.workspace.count({ where: scope })) >= FREE_WORKSPACE_LIMIT
  )
    return { limit: "workspaces" };

  //New workspaces land on top of the Planning column
  const top = await prisma.workspace.findFirst({
    where: { status: "PLANNING", ...scope },
    orderBy: { position: "asc" },
    select: { position: true },
  });

  const workspace = await prisma.workspace.create({
    data: {
      name: trimmedName,
      description: description?.trim() || null,
      creatorId: user.id,
      clerkOrgId: orgId ?? null,
      position: top ? top.position - 1 : 0,
      doc: { create: {} },
      canvas: { create: {} },
    },
  });

  revalidateWorkspacesLists();

  return { workspace: { id: workspace.id } };
}

export async function deleteWorkspace(workspaceId: string) {
  const { userId, orgId, orgRole } = await auth();
  if (!userId || !(await canAccessWorkspace(workspaceId)))
    throw new Error("Workspace not found");

  const workspace = await prisma.workspace.findFirstOrThrow({
    where: { id: workspaceId },
    select: workspaceOwnerSelect,
  });

  const isCreator = workspace.creator.clerkId === userId;

  const isOrgAdmin = orgRole === "role:admin" && workspace.clerkOrgId === orgId;

  if (!isCreator && !isOrgAdmin) {
    throw new Error(
      "Only the creator or an org admin can delete this workspace",
    );
  }

  await prisma.workspace.delete({ where: { id: workspaceId } });
  revalidateWorkspacesLists();
}

export async function moveWorkspace(
  workspaceId: string,
  status: WorkspaceStatus,
  position: number,
) {
  if (
    !Object.values(WorkspaceStatus).includes(status) ||
    !Number.isFinite(position)
  ) {
    throw new Error("Invalid move");
  }

  if (!(await canAccessWorkspace(workspaceId)))
    throw new Error("Workspace not found");

  await prisma.workspace.update({
    where: { id: workspaceId },
    data: { status, position },
  });
}

// Leaving description undefined keeps it as-is (the header's inline rename only sends a name).
export async function updateWorkspace(
  workspaceId: string,
  name: string,
  description?: string,
) {
  if (!(await canAccessWorkspace(workspaceId)))
    throw new Error("Workspace not found");

  const trimmedName = name.trim();
  if (!trimmedName) throw new Error("Workspace name is required");

  const workspace = await prisma.workspace.update({
    where: { id: workspaceId },
    data: {
      name: trimmedName,
      ...(description !== undefined && {
        description: description.trim() || null,
      }),
    },
  });

  revalidateWorkspacesLists();
  revalidatePath(`/workspace/${workspaceId}`);
  return workspace;
}
