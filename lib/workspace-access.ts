import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "./prisma";
import { workspaceOwnerSelect } from "./billing";

// Org workspaces are open to every member of that org; personal (org-less) ones only to their creator.
export default async function canAcessWorkspace(workspaceId: string) {
  const { userId, orgId } = await auth();
  if (!userId) return false;

  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    select: workspaceOwnerSelect,
  });

  if (!workspace) return false;

  if (!workspace.clerkOrgId) return workspace.creator.clerkId === userId;
  if (workspace.clerkOrgId === orgId) return true;

  // The session only knows the active org, so check full membership for links into another org.
  const clerk = await clerkClient();
  const { data: membership } = await clerk.users.getOrganizationMembershipList({
    userId,
    limit: 100,
  });

  return membership.some((m) => m.organization.id === workspace.clerkOrgId);
}
