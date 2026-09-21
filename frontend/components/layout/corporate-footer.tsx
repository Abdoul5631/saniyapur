import type { ReactElement } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { mainNav, quoteHref } from "@/lib/navigation";
import { getServices } from "@/lib/services";
import { getSiteSettings } from "@/lib/settings";
import { company } from "@/data/company";

const socialIcons: Record<string, ReactElement> = {
  Facebook: (
    <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  ),
  LinkedIn: (
    <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  Instagram: (
    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  ),
  WhatsApp: (
    <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.974.554 1.764.819 2.796.819 3.18 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.765-5.768-5.765zm3.676 8.244c-.144-.072-.853-.42-1.011-.478-.158-.058-.273-.087-.389.087-.115.174-.446.564-.547.68-.101.116-.202.13-.346.058-.144-.072-.609-.225-1.161-.717-.43-.383-.72-.857-.805-1.002-.085-.145-.009-.224.063-.296.065-.064.144-.167.216-.251.072-.084.096-.145.144-.241.048-.096.024-.181-.012-.253-.036-.072-.389-.938-.533-1.285-.14-.337-.282-.292-.389-.297-.101-.005-.216-.006-.331-.006-.115 0-.303.043-.462.216-.159.174-.606.592-.606 1.444s.62 1.674.707 1.79c.087.116 1.22 1.863 2.956 2.612.413.178.736.284.988.364.415.132.793.113 1.092.069.333-.05 1.023-.418 1.168-.821.144-.404.144-.75.101-.822-.043-.072-.158-.116-.302-.188z" />
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.52 3.66 1.43 5.17L2 22l4.96-1.4C8.37 21.5 10.14 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.72 0-3.33-.49-4.69-1.34l-.34-.2-3.01.79.8-2.93-.21-.35A8 8 0 1112 20z" />
    </svg>
  ),
};

export async function CorporateFooter() {
  const [settings, services] = await Promise.all([getSiteSettings(), getServices()]);
  const socials = [
    ["Facebook", settings.facebook_url],
    ["LinkedIn", settings.linkedin_url],
    ["Instagram", settings.instagram_url],
    ["WhatsApp", settings.whatsapp_url],
  ].filter(([, url]) => Boolean(url));

  return (
    <footer className="bg-[#071d22] text-white/70">
      {/* ── Bande pré-footer CTA ── */}
      <div className="border-b border-white/8 bg-gradient-to-r from-[#0a2830] via-[#0d2f37] to-[#0a2830]">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-8 sm:py-10">
            <div className="flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#a85c36]/20 border border-[#a85c36]/30 text-2xl">
                📋
              </span>
              <div>
                <p className="text-base font-bold text-white">
                  Besoin d'un devis gratuit ?
                </p>
                <p className="text-xs text-white/60">
                  Réponse sous 24h — sans engagement
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/devis"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#a85c36] to-[#c97844] px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#a85c36]/20 hover:shadow-xl hover:shadow-[#a85c36]/30 hover:scale-[1.03] transition-all active:scale-95"
              >
                Demander une étude →
              </Link>
              <a
                href={`https://wa.me/${(settings.whatsapp || company.contact.whatsapp).replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 px-5 py-2.5 text-sm font-semibold text-[#54e38e] hover:bg-[#25D366]/25 transition-all"
              >
                <span>💬</span> WhatsApp direct
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* ── Corps principal du footer ── */}
      <div className="py-16 sm:py-20 border-b border-white/8">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Bloc Marque */}
            <div>
              <div className="mb-5">
                <Image
                  src="/images/logo-transparent.png"
                  alt={settings.company_name || "J&B SANIYAPUR SARL"}
                  width={220}
                  height={110}
                  className="h-12 sm:h-14 w-auto object-contain"
                />
                <div className="mt-4 flex items-center gap-2">
                  <span className="h-[2px] w-8 rounded-full bg-[#a85c36]" />
                  <span className="h-px flex-1 bg-white/10" />
                </div>
              </div>

              <p className="font-serif italic text-sm text-[#e8d9cc] tracking-wide leading-snug">
                « {settings.tagline || "PROPRETÉ SUR ORDONNANCE"} »
              </p>
              <p className="mt-3 text-xs leading-relaxed text-white/50">
                {settings.slogan || "La propreté et l'hygiène qui protègent, la qualité qui rassure."}
              </p>

              {/* Badge disponibilité */}
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-3 py-1.5 text-xs font-semibold text-[#25D366]">
                <span className="size-1.5 rounded-full bg-[#25D366] animate-pulse" />
                Interventions 24/7
              </div>

              {/* Réseaux sociaux */}
              {socials.length > 0 && (
                <div className="mt-5">
                  <p className="mb-2.5 text-[10px] font-bold uppercase tracking-wider text-white/40">
                    Réseaux sociaux
                  </p>
                  <div className="flex items-center gap-2">
                    {socials.map(([label, url]) => (
                      <a
                        key={label}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={label as string}
                        className="flex size-9 items-center justify-center rounded-xl bg-white/8 border border-white/10 text-white/60 hover:bg-[#a85c36] hover:text-white hover:border-[#a85c36] transition-all duration-300 hover:scale-110"
                      >
                        {socialIcons[label as string] ?? <span className="text-xs">{label}</span>}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Rapide */}
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-white mb-5">
                Navigation
              </p>
              <ul className="grid gap-2 text-xs font-medium">
                {mainNav.map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="group flex items-center gap-2 py-1 hover:text-[#e8d9cc] transition-colors"
                    >
                      <span className="h-px w-3 bg-[#a85c36] transition-all duration-300 group-hover:w-5" />
                      <span>{label}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/attestations"
                    className="group flex items-center gap-2 py-1 hover:text-[#e8d9cc] transition-colors"
                  >
                    <span className="h-px w-3 bg-[#a85c36] transition-all duration-300 group-hover:w-5" />
                    <span>Références & attestations</span>
                  </Link>
                </li>
                <li className="mt-1">
                  <Link
                    href={quoteHref}
                    className="inline-flex items-center gap-1.5 text-[#e8d9cc] font-bold hover:text-white transition-colors"
                  >
                    <span className="text-[#a85c36]">→</span>
                    <span>Demander un devis en ligne</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Nos Domaines */}
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-white mb-5">
                Domaines de compétence
              </p>
              <ul className="grid gap-2 text-xs font-medium">
                {services.slice(0, 7).map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="group flex items-center gap-2 py-1 hover:text-[#e8d9cc] transition-colors line-clamp-1"
                    >
                      <span className="h-px w-3 bg-[#00897b] transition-all duration-300 group-hover:w-5" />
                      <span>{service.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Siège */}
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-white mb-5">
                Contact & Siège
              </p>
              <address className="grid gap-3 text-xs not-italic">
                {/* Téléphone */}
                <a
                  href={`tel:${(settings.phone || company.contact.phone).replace(/\s/g, "")}`}
                  className="group flex items-center gap-3 rounded-xl bg-white/6 p-3 border border-white/8 hover:bg-white/12 hover:border-[#a85c36]/40 transition-all duration-200"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#a85c36] text-white shadow-sm">
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-white/40">Appel direct</p>
                    <p className="font-bold text-white/90 group-hover:text-white transition-colors">
                      {settings.phone || company.contact.phone}
                    </p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${(settings.whatsapp || company.contact.whatsapp).replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-xl bg-white/6 p-3 border border-white/8 hover:bg-white/12 hover:border-[#25D366]/40 transition-all duration-200"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#25D366] text-white shadow-sm">
                    <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.974.554 1.764.819 2.796.819 3.18 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.765-5.768-5.765z" />
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.52 3.66 1.43 5.17L2 22l4.96-1.4C8.37 21.5 10.14 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-white/40">WhatsApp 24/7</p>
                    <p className="font-bold text-white/90 group-hover:text-white transition-colors">
                      {settings.whatsapp || company.contact.whatsapp}
                    </p>
                  </div>
                </a>

                {/* E-mail */}
                <a
                  href={`mailto:${settings.email || company.contact.email}`}
                  className="group flex items-center gap-3 rounded-xl bg-white/6 p-3 border border-white/8 hover:bg-white/12 hover:border-[#00897b]/40 transition-all duration-200"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#00897b] text-white shadow-sm">
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-white/40">E-mail</p>
                    <p className="font-bold text-white/90 group-hover:text-white transition-colors truncate">
                      {settings.email || company.contact.email}
                    </p>
                  </div>
                </a>

                {/* Adresse */}
                <div className="flex items-start gap-3 rounded-xl bg-white/6 p-3 border border-white/8">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/10 text-[#e8d9cc]">
                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-white/40">Siège & Interventions</p>
                    <p className="text-white/80 leading-snug mt-0.5">{settings.address || company.contact.locations}</p>
                  </div>
                </div>
              </address>
            </div>
          </div>
        </Container>
      </div>



      {/* ── Copyright ── */}
      <div className="py-6">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
            <p>
              © {new Date().getFullYear()}{" "}
              <span className="text-white/60 font-semibold">
                {settings.company_name || "J&B SANIYAPUR SARL"}
              </span>
              . Tous droits réservés.
            </p>
            <div className="flex items-center gap-4">
              <span>Conception professionnelle & Solutions d'hygiène intégrées</span>
              <span className="text-[#a85c36]">✦</span>
              <span>Burkina Faso</span>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
