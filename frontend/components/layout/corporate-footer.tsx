import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { mainNav, quoteHref } from "@/lib/navigation";
import { getServices } from "@/lib/services";
import { getSiteSettings } from "@/lib/settings";
import { resolveMediaUrl } from "@/lib/media";
import { company } from "@/data/company";

export async function CorporateFooter() {
  const [settings, services] = await Promise.all([getSiteSettings(), getServices()]);
  const socials = [
    ["Facebook", settings.facebook_url],
    ["LinkedIn", settings.linkedin_url],
    ["Instagram", settings.instagram_url],
    ["WhatsApp", settings.whatsapp_url],
  ].filter(([, url]) => Boolean(url));

  return (
    <footer className="bg-[#0a1e22] py-16 sm:py-20 text-white/70 border-t border-white/10">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Bloc Marque */}
          <div>
            <div className="inline-flex rounded-2xl bg-white p-3.5 shadow-md">
              <Image
                src="/images/logo.png"
                alt={settings.company_name || "J&B SANIYAPUR SARL"}
                width={320}
                height={160}
                className="h-14 sm:h-16 w-auto object-contain"
              />
            </div>
            <p className="mt-4 font-serif italic text-sm text-[#e8d9cc] tracking-wide">
              « {settings.tagline || "PROPRETÉ SUR ORDONNANCE"} »
            </p>
            <p className="mt-3 text-xs leading-relaxed text-white/60">
              {settings.slogan || "La propreté et l’hygiène qui protègent, la qualité qui rassure."}
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-white/80">
              <span className="size-2 rounded-full bg-[#25D366] animate-pulse" />
              <span>Interventions disponibles 24/7</span>
            </div>
          </div>

          {/* Navigation Rapide */}
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-white">Navigation</p>
            <ul className="mt-5 grid gap-2.5 text-xs font-medium">
              {mainNav.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-[#e8d9cc] transition-colors flex items-center gap-1.5">
                    <span className="text-[#a85c36]">›</span>
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href={quoteHref} className="text-[#e8d9cc] font-bold hover:underline flex items-center gap-1.5 mt-1">
                  <span className="text-[#a85c36]">›</span>
                  <span>Demander un devis en ligne</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Nos Domaines */}
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-white">Domaines de compétence</p>
            <ul className="mt-5 grid gap-2.5 text-xs font-medium">
              {services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="hover:text-[#e8d9cc] transition-colors line-clamp-1">
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Siège */}
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-white">Contact & Siège</p>
            <address className="mt-5 grid gap-4 text-xs not-italic">
              {/* Téléphone */}
              <a
                href={`tel:${company.contact.phone.replace(/\s/g, "")}`}
                className="group flex items-center gap-3 rounded-xl bg-white/8 p-3 border border-white/10 hover:bg-white/15 hover:border-[#a85c36]/50 transition-all duration-200"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#a85c36] text-white">
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/50">Appel direct</p>
                  <p className="font-bold text-white/90 group-hover:text-white">{company.contact.phone}</p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${company.contact.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-xl bg-white/8 p-3 border border-white/10 hover:bg-white/15 hover:border-[#25D366]/50 transition-all duration-200"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#25D366] text-white">
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.062-2.18-.553-1.898-.785-3.119-2.736-3.214-2.862-.095-.126-.774-1.029-.774-1.963 0-.933.489-1.393.663-1.583.174-.19.38-.238.507-.238.127 0 .253.001.364.007.119.006.277-.045.433.329.162.388.553 1.349.602 1.447.049.098.082.213.017.34-.065.127-.098.206-.194.318-.096.113-.203.252-.289.339-.098.098-.2.205-.086.4.113.195.503.83 1.08 1.343.743.661 1.369.866 1.564.963.195.097.31.082.425-.049.115-.131.492-.572.624-.768.132-.196.264-.164.444-.098.18.066 1.144.539 1.341.637.197.098.329.147.377.229.049.082.049.475-.095.88z" />
                  </svg>
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/50">WhatsApp 24/7</p>
                  <p className="font-bold text-white/90 group-hover:text-white">{company.contact.whatsapp}</p>
                </div>
              </a>

              {/* E-mail */}
              <a
                href={`mailto:${company.contact.email}`}
                className="group flex items-center gap-3 rounded-xl bg-white/8 p-3 border border-white/10 hover:bg-white/15 hover:border-[#00897b]/50 transition-all duration-200"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#00897b] text-white">
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-white/50">E-mail</p>
                  <p className="font-bold text-white/90 group-hover:text-white truncate">{company.contact.email}</p>
                </div>
              </a>

              {/* Adresse */}
              <div className="flex items-start gap-3 rounded-xl bg-white/8 p-3 border border-white/10">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/10 text-[#e8d9cc]">
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/50">Siège & Interventions</p>
                  <p className="text-white/80 leading-snug">{company.contact.locations}</p>
                </div>
              </div>

              {socials.length > 0 && (
                <div className="pt-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-2">Réseaux sociaux</p>
                  <div className="flex flex-wrap gap-2">
                    {socials.map(([label, url]) => (
                      <a
                        key={label}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-semibold hover:bg-[#a85c36] hover:text-white transition-all"
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </address>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} {settings.company_name}. Tous droits réservés.</p>
          <p className="text-white/40">Conception professionnelle & Solutions d’hygiène intégrées</p>
        </div>
      </Container>
    </footer>
  );
}

