import EditableWorkspaceName from "@/components/EditableWorkspaceName";
import { WorkspaceEditorsProvider } from "@/components/WorkspaceEditorsContext";
import { prisma } from "@/lib/prisma";
import { canAcessWorkspace } from "@/lib/workspace-access";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

type ViewMode = "doc" | "canvas" | "both";

function parseViewMode(value: string | string[] | undefined): ViewMode {
  return value === "doc" || value === "canvas" ? value : "both";
}
const WorkspacePage = async ({
  params,
  searchParams,
}: PageProps<"/workspace/[id]">) => {
  const { id } = await params;
  const { view: viewParam } = await searchParams;
  const view = parseViewMode(viewParam);

  if (!canAcessWorkspace(id)) notFound();

  const workspace = await prisma.workspace.findUnique({
    where: { id },
    select: { name: true },
  });

  if (!workspace) notFound();

  const showDoc = view === "doc" || view === "both";
  const showCanvas = view === "canvas" || view === "both";
  return (
    <WorkspaceEditorsProvider>
      <div className="flex h-dvh flex-col overflow-hidden">
        {/* Logo (back to dashboard) and name left, view switcher centered, actions right. */}
        <header className="flex h-14 shrink-0 items-center border-b border-white/6 bg-background px-4">
          <div className="flex flex-1 items-center gap-3">
            <Link
              href="/dashboard"
              className="flex size-8 items-center justify-center rounded-md transition-opacity hover:opacity-80"
            >
              <Image
                src="/brand/mascot-dark.png"
                alt="Back to dashboard"
                width={24}
                height={24}
                className="size-6"
              />
            </Link>
            <EditableWorkspaceName
              workspaceId={id}
              initialName={workspace.name}
            />
          </div>
        </header>
      </div>
    </WorkspaceEditorsProvider>
  );
};

export default WorkspacePage;
