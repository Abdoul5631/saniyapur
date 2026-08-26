import Link from "next/link";
import type { AnchorHTMLAttributes, PropsWithChildren } from "react";

type Variant = "primary" | "secondary" | "onDark" | "onColor";
type Props = PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>> & { href: string; variant?: Variant };

const base = "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 motion-reduce:transition-colors motion-reduce:hover:translate-y-0";

const styles: Record<Variant, string> = {
  primary: "bg-[#a85c36] text-white shadow-sm shadow-[#a85c36]/20 hover:bg-[#8b4a2b] hover:shadow-lg hover:shadow-[#a85c36]/30",
  secondary: "border border-[#a85c36] text-[#a85c36] hover:bg-[#a85c36] hover:text-white hover:shadow-lg hover:shadow-[#a85c36]/20",
  onDark: "border border-white/45 text-white hover:border-white hover:bg-white hover:text-[#16232a]",
  onColor: "bg-white text-[#a85c36] shadow-sm shadow-black/10 hover:bg-[#f1e4dc] hover:shadow-lg hover:shadow-black/10",
};

function isInternal(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

export function ButtonLink({ children, className = "", variant = "primary", href, ...props }: Props) {
  const classNameFull = `${base} ${styles[variant]} ${className}`;
  if (isInternal(href)) return <Link href={href} className={classNameFull} {...props}>{children}</Link>;
  return <a href={href} className={classNameFull} {...props}>{children}</a>;
}
