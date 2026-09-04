import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { getAboutSettings } from "@/lib/about";
import { getSiteSettings } from "@/lib/settings";

const pillars = [
  {
    id: 1,
    icon: (
      <svg className="size-6 text-[#a85c36]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    badge: "Traçabilité & Rigueur",
    title: "Protocoles & Bionettoyage",
    description:
      "Chaque intervention suit des fiches techniques strictes, garantissant une décontamination et une propreté conformes aux exigences hospitalières et industrielles.",
  },
  {
    id: 2,
    icon: (
      <svg className="size-6 text-[#0f2e36]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    badge: "Sécurité & Discrétion",
    title: "Personnel Qualifié & Encadré",
    description:
      "Agents formés en continu aux techniques de nettoyage professionnel, encadrés par des chefs d'équipe attentifs au respect de vos règles internes.",
  },
  {
    id: 3,
    icon: (
      <svg className="size-6 text-[#00897b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    badge: "Normes & Écologie",
    title: "Produits & Équipements Normés",
    description:
      "Utilisation exclusive de produits certifiés biodégradables avec fiches de données de sécurité (FDS) et de matériel industriel de haute précision.",
  },
];

export async function AboutSection() {
  const [about, settings] = await Promise.all([
    getAboutSettings(),
    getSiteSettings(),
  ]);

  const companyName = settings.company_name || "J&B SANIYAPUR SARL";
  const presentationParas = about.presentation_content
    ? about.presentation_content.split(/\n\s*\n/).filter(Boolean)
    : [];

  return (
    <section className="relative py-20 sm:py-28 bg-white border-b border-[#e2eae4]/60">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          {/* Texte de présentation */}
          <Reveal>
            <div className="flex items-center gap-2">
              <span className="inline-block rounded-full bg-[#f1e4dc] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#a85c36]">
                À Propos de l’Entreprise
              </span>
            </div>

            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#16232a] leading-[1.15]">
              {about.presentation_title || "Une exigence certifiée pour des environnements sains et préservés."}
            </h2>

            {presentationParas.length > 0 ? (
              <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-[#526259]">
                {presentationParas.slice(0, 2).map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            ) : (
              <p className="mt-6 text-lg leading-relaxed text-[#526259]">
                Fondée sur la rigueur et l’excellence opérationnelle, <strong className="font-semibold text-[#16232a]">{companyName}</strong> accompagne les établissements de santé, industries, hôtels et sièges d’entreprise.
              </p>
            )}

            {settings.slogan && (
              <p className="mt-4 text-base leading-relaxed text-[#526259]">
                {settings.slogan}
              </p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink href="/a-propos">En savoir plus sur notre histoire</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">Prendre contact</ButtonLink>
            </div>
          </Reveal>

          {/* Les 3 piliers structurés et alignés avec design haut de gamme */}
          <div className="grid gap-4">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.id} delayMs={index * 90}>
                <div className="card-luxury rounded-2xl border border-[#dce5df] bg-[#f7f8f6]/80 p-6 sm:p-7 transition duration-300 hover:border-[#a85c36] hover:bg-white">
                  <div className="flex items-start gap-4 sm:gap-5">
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white shadow-xs border border-[#e2eae4]">
                      {pillar.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-lg font-bold text-[#16232a] tracking-tight">
                          {pillar.title}
                        </h3>
                        <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#a85c36] border border-[#e2eae4]">
                          {pillar.badge}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[#526259]">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
