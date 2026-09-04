"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { isActivePath, mainNav, quoteHref } from "@/lib/navigation";
import { company } from "@/data/company";

function NavLink({
  href,
  onClick,
  children,
  active,
}: {
  href: string;
  onClick: () => void;
  children: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`group relative py-4 text-[12.5px] font-bold uppercase tracking-[0.14em] transition-colors duration-200 ${
        active ? "text-[#a85c36]" : "text-[#1e2f28] hover:text-[#a85c36]"
      }`}
    >
      {children}
      <span
        className={`absolute bottom-0 left-0 h-[2.5px] bg-[#a85c36] transition-all duration-300 ${
          active
            ? "w-full opacity-100"
            : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
        }`}
      />
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
    function handleScroll() {
      setScrolled(window.scrollY > 60);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full bg-white relative z-50">
      {/* ── 0. Barre d'information supérieure défilante (Marquee ticker luxueux) ── */}
      <div className="bg-[#0e272d] text-white text-xs py-2 border-b border-white/10 overflow-hidden relative select-none">
        <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
          {/* Bloc 1 */}
          <div className="flex items-center gap-10 text-white/85 shrink-0">
            <a
              href={`https://wa.me/${company.contact.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-[#54e38e] hover:text-white transition-colors bg-white/5 px-3 py-0.5 rounded-full border border-[#54e38e]/30 hover:border-[#54e38e]"
            >
              <span className="text-base leading-none">💬</span>
              <span>WhatsApp : {company.contact.whatsapp}</span>
            </a>
            <a
              href={`tel:${company.contact.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 font-medium hover:text-[#e8d9cc] transition-colors"
            >
              <span className="text-[#a85c36]">📞</span>
              <span>Tél : {company.contact.phone}</span>
            </a>
            <span className="inline-flex items-center gap-2">
              <span className="text-[#a85c36]">📍</span> {company.contact.locations}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="text-[#a85c36]">🕒</span> Lun - Sam : 07h30 - 18h00
            </span>
            <span className="inline-flex items-center gap-2 text-[#e8d9cc] font-serif italic">
              « PROPRETÉ SUR ORDONNANCE »
            </span>
            <span className="inline-flex items-center gap-2 text-white/90">
              <span className="size-2 rounded-full bg-[#25D366] animate-pulse" />
              <span>Interventions disponibles 24/7</span>
            </span>
          </div>

          {/* Séparateur élégant */}
          <span className="text-[#a85c36] font-bold text-sm shrink-0">✦</span>

          {/* Bloc 2 (duplication pour boucle infinie sans saut) */}
          <div className="flex items-center gap-10 text-white/85 shrink-0" aria-hidden="true">
            <a
              href={`https://wa.me/${company.contact.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-[#54e38e] hover:text-white transition-colors bg-white/5 px-3 py-0.5 rounded-full border border-[#54e38e]/30 hover:border-[#54e38e]"
            >
              <span className="text-base leading-none">💬</span>
              <span>WhatsApp : {company.contact.whatsapp}</span>
            </a>
            <a
              href={`tel:${company.contact.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 font-medium hover:text-[#e8d9cc] transition-colors"
            >
              <span className="text-[#a85c36]">📞</span>
              <span>Tél : {company.contact.phone}</span>
            </a>
            <span className="inline-flex items-center gap-2">
              <span className="text-[#a85c36]">📍</span> {company.contact.locations}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="text-[#a85c36]">🕒</span> Lun - Sam : 07h30 - 18h00
            </span>
            <span className="inline-flex items-center gap-2 text-[#e8d9cc] font-serif italic">
              « PROPRETÉ SUR ORDONNANCE »
            </span>
            <span className="inline-flex items-center gap-2 text-white/90">
              <span className="size-2 rounded-full bg-[#25D366] animate-pulse" />
              <span>Interventions disponibles 24/7</span>
            </span>
          </div>

          <span className="text-[#a85c36] font-bold text-sm shrink-0">✦</span>
        </div>
      </div>

      {/* ── 1. Haut de page : Logo centré & Slogan sans arrière-plan lourd ── */}
      <div className="py-7 sm:py-10 md:py-12 border-b border-[#f0f4f1] transition-all duration-300">
        <Container>
          <div className="flex flex-col items-center justify-center text-center">
            <Link
              href="/"
              className="inline-block transition-transform duration-300 hover:scale-[1.02]"
              onClick={() => setOpen(false)}
            >
              <Image
                src="/images/logo.png"
                alt="J&B SANIYAPUR SARL"
                width={560}
                height={320}
                priority
                className="h-24 w-auto sm:h-32 md:h-40 lg:h-44 max-w-[92vw] mx-auto object-contain drop-shadow-xs"
              />
            </Link>
            <p className="mt-3.5 font-serif italic text-base sm:text-lg md:text-xl text-[#a85c36] tracking-wide select-none font-medium">
              « Propreté sur ordonnance »
            </p>
          </div>
        </Container>
      </div>

      {/* ── 2. Menu de navigation en bas (centré et sticky) ── */}
      <div
        className={`sticky top-0 z-50 border-b border-[#e2eae4] bg-white/98 backdrop-blur-md transition-all duration-300 ${
          scrolled ? "shadow-md py-0.5" : "shadow-xs"
        }`}
      >
        <Container>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 2xl:gap-10">
            {mainNav.map(([label, href]) => (
              <NavLink
                key={href}
                href={href}
                active={isActivePath(pathname, href)}
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            ))}
            <Link
              href={quoteHref}
              onClick={() => setOpen(false)}
              className={`my-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] transition-all duration-300 shadow-sm ${
                isActivePath(pathname, quoteHref)
                  ? "bg-[#a85c36] text-white shadow-md shadow-[#a85c36]/20"
                  : "bg-gradient-to-r from-[#a85c36] to-[#bd693e] text-white hover:shadow-lg hover:shadow-[#a85c36]/25 hover:scale-[1.03]"
              }`}
            >
              Demander un devis
            </Link>
          </div>

          {/* Mobile Bar */}
          <div className="flex h-14 items-center justify-between lg:hidden">
            <span className="text-xs font-bold uppercase tracking-widest text-[#a85c36]">
              Menu de navigation
            </span>
            <button
              type="button"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 rounded-xl border border-[#dce5df] px-3.5 py-2 text-xs font-bold uppercase text-[#16232a] transition hover:bg-[#f1f6f6]"
            >
              <span>{open ? "Fermer" : "Menu"}</span>
              <span className="text-base leading-none">{open ? "✕" : "☰"}</span>
            </button>
          </div>

          {/* Mobile Drawer */}
          {open && (
            <nav
              aria-label="Navigation mobile"
              className="animate-fade-in-up border-t border-[#dce5df] py-4 lg:hidden bg-white"
            >
              <div className="grid gap-1">
                {mainNav.map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={isActivePath(pathname, href) ? "page" : undefined}
                    className={`rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-wider transition ${
                      isActivePath(pathname, href)
                        ? "bg-[#f1e4dc] text-[#a85c36]"
                        : "text-[#16232a] hover:bg-[#f1f6f6]"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
                <Link
                  href={quoteHref}
                  onClick={() => setOpen(false)}
                  className="mt-3 rounded-xl bg-[#a85c36] py-3 text-center text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#8b4a2b]"
                >
                  Demander un devis
                </Link>
              </div>
            </nav>
          )}
        </Container>
      </div>
    </header>
  );
}


