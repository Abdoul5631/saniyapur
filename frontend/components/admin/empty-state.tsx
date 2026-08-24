import type { ReactNode } from "react";

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="grid place-items-center gap-2 px-6 py-16 text-center">
      <p className="text-sm font-semibold text-[#16232a]">{title}</p>
      {description && <p className="max-w-sm text-sm text-[#526259]">{description}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
