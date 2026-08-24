"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
const links = [["Accueil", "#accueil"], ["À propos", "#a-propos"], ["Services", "#services"], ["Secteurs", "#secteurs"], ["Réalisations", "#realisations"], ["Produits", "/produits"], ["Contact", "#contact"]];
function NavLink({ href, onClick, children }: { href: string; onClick: () => void; children: string }) {
  const className = "group relative text-sm font-medium text-[#3f5149] transition hover:text-[#a85c36]";
  const content = <>{children}<span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#a85c36] transition-transform duration-300 ease-out group-hover:scale-x-100" /></>;
  if (href.startsWith("/")) return <Link href={href} onClick={onClick} className={className}>{content}</Link>;
  return <a href={href} onClick={onClick} className={className}>{content}</a>;
}
export function CorporateHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() { setScrolled(window.scrollY > 12); }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 border-b bg-[#f7f8f6]/95 backdrop-blur transition-shadow duration-300 ${scrolled ? "border-slate-900/10 shadow-sm" : "border-slate-900/0"}`}>
      <Container>
        <div className={`flex items-center justify-between gap-5 transition-[height] duration-300 ${scrolled ? "h-16" : "h-20"}`}>
          <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
            <Image src="/images/logo.png" alt="J&amp;B SANIYAPUR SARL" width={220} height={128} priority className={`w-auto transition-[height] duration-300 ${scrolled ? "h-9 sm:h-10" : "h-11 sm:h-12"}`} />
          </Link>
          <nav aria-label="Navigation principale" className="hidden items-center gap-6 xl:flex">
            {links.map(([label, href]) => <NavLink key={href} href={href} onClick={() => setOpen(false)}>{label}</NavLink>)}
          </nav>
          <div className="hidden xl:block"><ButtonLink href="#contact" className="px-4 py-2.5">Demander un devis</ButtonLink></div>
          <button type="button" aria-label="Ouvrir le menu" aria-expanded={open} onClick={() => setOpen(!open)} className="grid size-10 place-items-center rounded-lg border border-[#dce5df] text-xl xl:hidden">{open ? "×" : "☰"}</button>
        </div>
        {open && (
          <nav aria-label="Navigation mobile" className="animate-fade-in-up border-t border-[#dce5df] py-5 xl:hidden">
            <div className="grid gap-1">
              {links.map(([label, href]) => {
                if (href.startsWith("/")) return <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-[#16232a] transition hover:bg-[#eaf2f2]">{label}</Link>;
                return <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-[#16232a] transition hover:bg-[#eaf2f2]">{label}</a>;
              })}
              <ButtonLink href="#contact" onClick={() => setOpen(false)} className="mt-3">Demander un devis</ButtonLink>
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}
