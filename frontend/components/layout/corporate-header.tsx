"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { isActivePath, mainNav, quoteHref } from "@/lib/navigation";

function NavLink({ href, onClick, children, active }: { href: string; onClick: () => void; children: string; active: boolean }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`group relative text-[13px] font-medium transition ${active ? "text-[#a85c36]" : "text-[#3f5149] hover:text-[#a85c36]"}`}
    >
      {children}
      <span className={`absolute -bottom-1 left-0 h-px bg-[#a85c36] transition-transform duration-300 ease-out ${active ? "w-full scale-x-100" : "w-full origin-left scale-x-0 group-hover:scale-x-100"}`} />
    </Link>
  );
}

export function CorporateHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    function handleScroll() { setScrolled(window.scrollY > 12); }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 border-b bg-[#f7f8f6]/95 backdrop-blur transition-shadow duration-300 ${scrolled ? "border-slate-900/10 shadow-sm" : "border-slate-900/0"}`}>
      <Container>
        <div className={`flex items-center justify-between gap-4 transition-[height] duration-300 ${scrolled ? "h-16" : "h-20"}`}>
          <Link href="/" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
            <Image src="/images/logo.png" alt="J&B SANIYAPUR SARL" width={220} height={128} priority className={`w-auto transition-[height] duration-300 ${scrolled ? "h-9 sm:h-10" : "h-11 sm:h-12"}`} />
          </Link>
          <nav aria-label="Navigation principale" className="hidden items-center gap-4 2xl:gap-5 xl:flex">
            {mainNav.map(([label, href]) => (
              <NavLink key={href} href={href} active={isActivePath(pathname, href)} onClick={() => setOpen(false)}>{label}</NavLink>
            ))}
          </nav>
          <div className="hidden xl:block"><ButtonLink href={quoteHref} className="px-4 py-2.5">Demander un devis</ButtonLink></div>
          <button type="button" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open} onClick={() => setOpen(!open)} className="grid size-10 place-items-center rounded-lg border border-[#dce5df] text-xl xl:hidden">{open ? "×" : "☰"}</button>
        </div>
        {open && (
          <nav aria-label="Navigation mobile" className="animate-fade-in-up border-t border-[#dce5df] py-5 xl:hidden">
            <div className="grid gap-1">
              {mainNav.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={isActivePath(pathname, href) ? "page" : undefined}
                  className={`rounded-lg px-3 py-3 text-sm font-medium transition hover:bg-[#eaf2f2] ${isActivePath(pathname, href) ? "bg-[#eaf2f2] text-[#a85c36]" : "text-[#16232a]"}`}
                >
                  {label}
                </Link>
              ))}
              <ButtonLink href={quoteHref} onClick={() => setOpen(false)} className="mt-3">Demander un devis</ButtonLink>
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}
