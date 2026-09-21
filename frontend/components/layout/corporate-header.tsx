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
        className={`absolute bottom-0 left-0 h-[2.5px] rounded-full bg-[#a85c36] transition-all duration-300 ${
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const whatsappUrl = `https://wa.me/${company.contact.whatsapp.replace(/\D/g, "")}`;

  return (
    <header className="w-full bg-white relative z-50">
      {/* ── 0. Barre d'information supérieure défilante ── */}
      <div className="bg-[#0e272d] text-white text-xs py-2 border-b border-white/10 overflow-hidden relative select-none">
        <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
          {/* Bloc 1 */}
          <div className="flex items-center gap-10 text-white/85 shrink-0">
            <a
              href={whatsappUrl}
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

          {/* Bloc 2 (duplication pour boucle infinie) */}
          <div className="flex items-center gap-10 text-white/85 shrink-0" aria-hidden="true">
            <a
              href={whatsappUrl}
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

      {/* ── 1. Haut de page : Logo centré & Slogan ── */}
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

      {/* ── 2. Menu de navigation (centré et sticky) ── */}
      <div
        className={`sticky top-0 z-50 border-b border-[#e2eae4] transition-all duration-300 ${
          scrolled
            ? "bg-white/96 backdrop-blur-xl shadow-lg py-0.5"
            : "bg-white/98 backdrop-blur-md shadow-xs"
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
                  : "bg-gradient-to-r from-[#a85c36] to-[#bd693e] text-white hover:shadow-lg hover:shadow-[#a85c36]/30 hover:scale-[1.04] active:scale-95"
              }`}
            >
              Demander un devis
            </Link>
          </div>

          {/* Mobile Bar */}
          <div className="flex h-14 items-center justify-between lg:hidden">
            {/* Mini logo quand scrollé */}
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
              {scrolled ? (
                <Image
                  src="/images/logo.png"
                  alt="SANIYAPUR"
                  width={100}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              ) : (
                <span className="text-xs font-bold uppercase tracking-widest text-[#a85c36]">
                  Menu
                </span>
              )}
            </Link>

            <div className="flex items-center gap-3">
              {/* Bouton WhatsApp mobile rapide */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex size-9 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md hover:scale-110 transition-transform"
              >
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.974.554 1.764.819 2.796.819 3.18 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.765-5.768-5.765zm3.676 8.244c-.144-.072-.853-.42-1.011-.478-.158-.058-.273-.087-.389.087-.115.174-.446.564-.547.68-.101.116-.202.13-.346.058-.144-.072-.609-.225-1.161-.717-.43-.383-.72-.857-.805-1.002-.085-.145-.009-.224.063-.296.065-.064.144-.167.216-.251.072-.084.096-.145.144-.241.048-.096.024-.181-.012-.253-.036-.072-.389-.938-.533-1.285-.14-.337-.282-.292-.389-.297-.101-.005-.216-.006-.331-.006-.115 0-.303.043-.462.216-.159.174-.606.592-.606 1.444s.62 1.674.707 1.79c.087.116 1.22 1.863 2.956 2.612.413.178.736.284.988.364.415.132.793.113 1.092.069.333-.05 1.023-.418 1.168-.821.144-.404.144-.75.101-.822-.043-.072-.158-.116-.302-.188z" />
                </svg>
              </a>

              {/* Bouton hamburger */}
              <button
                type="button"
                aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={open}
                onClick={() => setOpen(!open)}
                className="flex size-9 items-center justify-center rounded-xl border border-[#dce5df] text-[#16232a] transition-all hover:bg-[#f1f6f6] hover:border-[#a85c36] active:scale-95"
              >
                <span className="sr-only">{open ? "Fermer" : "Menu"}</span>
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {open ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* ── Overlay sombre pour mobile ── */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden animate-fade-in"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Drawer mobile full-height ── */}
      {open && (
        <nav
          aria-label="Navigation mobile"
          className="fixed right-0 top-0 z-50 h-full w-[80vw] max-w-xs bg-white shadow-2xl lg:hidden animate-slide-in-right flex flex-col"
        >
          {/* Header du drawer */}
          <div className="flex items-center justify-between border-b border-[#f0f4f1] px-5 py-4">
            <Link href="/" onClick={() => setOpen(false)}>
              <Image
                src="/images/logo.png"
                alt="SANIYAPUR"
                width={120}
                height={50}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <button
              type="button"
              aria-label="Fermer le menu"
              onClick={() => setOpen(false)}
              className="flex size-9 items-center justify-center rounded-xl border border-[#dce5df] text-[#526259] hover:bg-[#f1f6f6] transition-colors"
            >
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Liens de navigation */}
          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="grid gap-1">
              {mainNav.map(([label, href], idx) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={isActivePath(pathname, href) ? "page" : undefined}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition-all ${
                    isActivePath(pathname, href)
                      ? "bg-[#f1e4dc] text-[#a85c36]"
                      : "text-[#16232a] hover:bg-[#f7f9f7] hover:text-[#a85c36]"
                  }`}
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <span>{label}</span>
                  {isActivePath(pathname, href) && (
                    <span className="size-2 rounded-full bg-[#a85c36]" />
                  )}
                </Link>
              ))}
            </div>

            <Link
              href="/attestations"
              onClick={() => setOpen(false)}
              className={`mt-2 flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition-all ${
                isActivePath(pathname, "/attestations")
                  ? "bg-[#f1e4dc] text-[#a85c36]"
                  : "text-[#16232a] hover:bg-[#f7f9f7] hover:text-[#a85c36]"
              }`}
            >
              <span>Références & attestations</span>
              {isActivePath(pathname, "/attestations") && (
                <span className="size-2 rounded-full bg-[#a85c36]" />
              )}
            </Link>

            {/* CTA devis dans le drawer */}
            <div className="mt-4 pt-4 border-t border-[#f0f4f1]">
              <Link
                href={quoteHref}
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#a85c36] to-[#bd693e] py-3.5 text-center text-sm font-bold text-white shadow-md shadow-[#a85c36]/20 hover:shadow-lg transition-all active:scale-95"
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Demander un devis gratuit
              </Link>
            </div>
          </div>

          {/* Pied du drawer : contacts rapides */}
          <div className="border-t border-[#f0f4f1] bg-[#f8faf9] px-4 py-5">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-[#8a9a92]">Contact rapide</p>
            <div className="grid gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 px-3.5 py-2.5 text-sm font-semibold text-[#16a34a] hover:bg-[#25D366]/20 transition-colors"
              >
                <span className="text-xl">💬</span>
                <div>
                  <p className="text-xs font-bold text-[#16a34a]">WhatsApp 24/7</p>
                  <p className="text-xs text-[#526259]">{company.contact.whatsapp}</p>
                </div>
              </a>
              <a
                href={`tel:${company.contact.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 rounded-xl bg-white border border-[#dce5df] px-3.5 py-2.5 text-sm hover:border-[#a85c36]/40 transition-colors"
              >
                <span className="text-xl">📞</span>
                <div>
                  <p className="text-xs font-bold text-[#16232a]">Appel direct</p>
                  <p className="text-xs text-[#526259]">{company.contact.phone}</p>
                </div>
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
