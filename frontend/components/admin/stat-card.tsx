import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  label: string;
  value: number | string;
  href?: string;
  icon?: ReactNode;
  tone?: "default" | "warning";
  hint?: string;
};

export function StatCard({ label, value, href, icon, tone = "default", hint }: Props) {
  const warning = tone === "warning";
  const content = (
    <>
      {warning && <span aria-hidden className="absolute inset-y-0 left-0 w-1 bg-[#d49a2a]" />}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[#526259]">{label}</p>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-[#16232a] tabular-nums">{value}</p>
          {hint && <p className={`mt-1.5 text-xs font-medium ${warning ? "text-[#8a6d1c]" : "text-[#8a9a92]"}`}>{hint}</p>}
        </div>
        {icon && (
          <span
            className={`grid size-11 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${
              warning ? "bg-[#f2e8d6] text-[#8a6d1c]" : "bg-[#f1e4dc] text-[#a85c36]"
            }`}
          >
            {icon}
          </span>
        )}
      </div>
    </>
  );
  const className =
    "group relative block overflow-hidden rounded-2xl border border-[#dce5df] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#a85c36] hover:shadow-lg hover:shadow-[#a85c36]/10";
  if (href) return <Link href={href} className={className}>{content}</Link>;
  return <div className={className}>{content}</div>;
}
