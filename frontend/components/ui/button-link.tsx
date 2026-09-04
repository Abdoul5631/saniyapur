import Link from "next/link";
import type { AnchorHTMLAttributes, PropsWithChildren } from "react";

type Variant = "primary" | "secondary" | "onDark" | "onColor";
type Props = PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>> & { href: string; variant?: Variant };

const base =
  "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-95 motion-reduce:transition-colors motion-reduce:hover:translate-y-0 select-none cursor-pointer";

const styles: Record<Variant, string> = {
  primary:
    "bg-linear-to-r from-[#a85c36] to-[#ba683e] text-white shadow-md shadow-[#a85c36]/25 hover:from-[#8b4a2b] hover:to-[#a85c36] hover:shadow-xl hover:shadow-[#a85c36]/35",
  secondary:
    "border border-[#a85c36] text-[#a85c36] bg-transparent hover:bg-[#a85c36] hover:text-white hover:shadow-lg hover:shadow-[#a85c36]/20",
  onDark:
    "border border-white/40 text-white bg-white/5 backdrop-blur-md hover:border-white hover:bg-white hover:text-[#16232a] hover:shadow-lg hover:shadow-black/20",
  onColor:
    "bg-white text-[#a85c36] shadow-sm shadow-black/10 hover:bg-[#f1e4dc] hover:shadow-lg hover:shadow-black/10",
};

function isInternal(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

export function ButtonLink({ children, className = "", variant = "primary", href, ...props }: Props) {
  const classNameFull = `${base} ${styles[variant]} ${className}`;
  if (isInternal(href)) return <Link href={href} className={classNameFull} {...props}>{children}</Link>;
  return <a href={href} className={classNameFull} {...props}>{children}</a>;
}
