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

  const deviseMatch = (about.presentation_devise ?? "").match(/[«"“]\s*([^»"”\n]+?)\s*[»"”]/);
  const devise = deviseMatch?.[1]?.trim() ?? "";

  return (
    <section className="relative py-20 sm:py-28 bg-white border-b border-[#e2eae4]/60">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-16">
          {/* Texte de présentation */}
          <Reveal>
            <div className="flex items-center gap-2">
              <span className="inline-block rounded-full bg-[#f1e4dc] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#a85c36]">
                À Propos de l’Entreprise
              </span>
            </div>

            <h2 className="mt-5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#16232a] leading-[1.2] text-balance">
              {about.presentation_title || "Une exigence certifiée pour des environnements sains et préservés."}
            </h2>

            {presentationParas.length > 0 ? (
              <div className="mt-6 space-y-4 text-base leading-relaxed text-[#526259]">
                <p className="border-l-4 border-[#a85c36] pl-4 text-lg font-medium leading-relaxed text-[#16232a]">
                  {presentationParas[0]}
                </p>
                {presentationParas[1] ? (
                  <p className="line-clamp-4">{presentationParas[1]}</p>
                ) : null}
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

          {/* Les 3 piliers : ligne verticale numérotée */}
          <div className="relative grid gap-4 lg:pt-10">
            <span aria-hidden className="absolute bottom-10 left-[1.65rem] top-14 hidden w-px bg-linear-to-b from-[#a85c36]/50 via-[#dce5df] to-transparent sm:block lg:top-24" />
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.id} delayMs={index * 120} direction="left">
                <div className="card-luxury group relative rounded-2xl border border-[#dce5df] bg-[#f7f8f6]/80 p-5 sm:p-6 transition duration-300 hover:border-[#a85c36] hover:bg-white">
                  <div className="flex items-start gap-4 sm:gap-5">
                    <span className="relative grid size-12 shrink-0 place-items-center rounded-xl border border-[#e2eae4] bg-white shadow-xs transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      {pillar.icon}
                      <span className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full bg-[#a85c36] text-[10px] font-bold text-white">
                        {index + 1}
                      </span>
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="inline-block rounded-full border border-[#e2eae4] bg-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#a85c36]">
                        {pillar.badge}
                      </span>
                      <h3 className="mt-2 text-lg font-bold tracking-tight text-[#16232a]">{pillar.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#526259]">{pillar.description}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
            {devise ? (
              <Reveal delayMs={400}>
                <div className="rounded-2xl bg-[#16232a] px-6 py-5 text-center">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e8b79a]">Notre devise</p>
                  <p className="mt-1.5 text-xl font-extrabold tracking-wide text-white">{devise}</p>
                </div>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
