import Link from "next/link";
import type { ReactNode } from "react";

type Props = { label: string; value: number | string; href?: string; icon?: ReactNode; tone?: "default" | "warning" };

export function StatCard({ label, value, href, icon, tone = "default" }: Props) {
  const content = (
    <>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[#526259]">{label}</p>
        {icon && <span className={`grid size-9 place-items-center rounded-lg ${tone === "warning" ? "bg-[#f2e8d6] text-[#8a6d1c]" : "bg-[#f1e4dc] text-[#a85c36]"}`}>{icon}</span>}
      </div>
      <p className="mt-3 text-3xl font-semibold text-[#16232a]">{value}</p>
    </>
  );
  const className = "rounded-2xl border border-[#dce5df] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#a85c36] hover:shadow-lg";
  if (href) return <Link href={href} className={className}>{content}</Link>;
  return <div className={className}>{content}</div>;
}
