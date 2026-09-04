import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { getAboutSettings } from "@/lib/about";
import { resolveMediaUrl } from "@/lib/media";

export const metadata: Metadata = {
  title: "Notre Engagement Social | J&B SANIYAPUR SARL",
  description:
    "Découvrez la politique sociale et RSE de J&B SANIYAPUR SARL : protection sociale CNSS, garderie pour enfants du personnel, formation continue, sécurité et bien-être de nos collaborateurs.",
};

export default async function EngagementSocialPage() {
  const about = await getAboutSettings();

  const socialPillars = [
    {
      id: 1,
      icon: "👶",
      title: "Création d’une garderie pour les enfants du personnel",
      highlight: "Soutien parental direct",
      description:
        "Nous prévoyons la mise en place d'une garderie d'entreprise dédiée pour accueillir en toute sécurité les enfants de nos techniciens et collaborateurs, facilitant ainsi l'équilibre entre vie de famille et travail.",
    },
    {
      id: 2,
      icon: "🏥",
      title: "Déclaration CNSS & Assurance Maladie",
      highlight: "100% déclaré & protégé",
      description:
        "Chaque membre de notre personnel opérationnel est formellement déclaré à la Caisse Nationale de Sécurité Sociale (CNSS) et bénéficie d'une assurance maladie et d'une couverture des risques professionnels.",
    },
    {
      id: 3,
      icon: "🛡️",
      title: "Dotation en EPI & Sécurité Sanitaire",
      highlight: "Normes hospitalières strictes",
      description:
        "Nos équipes sont intégralement dotées d'Équipements de Protection Individuelle (EPI) normés et bénéficient de contrôles médicaux réguliers pour préserver leur santé lors de chaque intervention.",
    },
    {
      id: 4,
      icon: "🎓",
      title: "Formation Continue aux Standards Internationaux",
      highlight: "Montée en compétences",
      description:
        "Nos agents reçoivent une formation continue et certifiante aux protocoles d'hygiène et de bionettoyage hospitalier, dispensée en collaboration avec nos partenaires allemands de référence.",
    },
    {
      id: 5,
      icon: "⚖️",
      title: "Rémunération Équitable & Avantages Sociaux",
      highlight: "Dignité & Reconnaissance",
      description:
        "Nous appliquons une grille salariale équitable et valorisante, assortie d'avantages sociaux concrets, garantissant à chacun de nos collaborateurs une juste récompense de son engagement.",
    },
    {
      id: 6,
      icon: "💬",
      title: "Soutien Psychologique & Accompagnement",
      highlight: "Écoute & Bienveillance",
      description:
        "Intervenir en milieu hospitalier et en zones à risques requiert une attention humaine constante. Nous offrons un soutien psychologique et un accompagnement individualisé à nos équipes.",
    },
  ];

  const operationalCommitments = [
    "Personnel 100% déclaré à la Caisse de Sécurité Sociale.",
    "Assurance maladie et couverture des risques professionnels garanties.",
    "Formation continue et spécialisée au bionettoyage hospitalier.",
    "Dotation systématique en Équipements de Protection Individuelle (EPI) conformes.",
    "Suivi médical et contrôles de santé périodiques.",
    "Évaluations régulières des performances et opportunités de promotion interne.",
  ];

  return (
    <>
      <PageHero
        eyebrow="Responsabilité Sociétale & Humaine"
        title="Notre Engagement Social"
        description="Parce que nos collaborateurs sont avant tout nos concitoyens, nous plaçons la dignité, la sécurité et le bien-être de notre personnel au cœur de notre modèle d’entreprise."
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Engagement social" }]}
      />

      {/* ── 1. MANIFESTE & VISION SOCIALE ── */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#e2eae4]/60">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-7">
              <span className="inline-block rounded-full bg-[#f1e4dc] px-4 py-1.5 text-xs font-bold uppercase tracking-[.18em] text-[#a85c36]">
                Politique RSE & Humaine
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#16232a] leading-tight">
                Valoriser l’humain pour garantir une qualité irréprochable.
              </h2>
              <p className="mt-6 text-lg sm:text-xl leading-relaxed text-[#526259] font-normal">
                Chez <strong className="text-[#16232a] font-semibold">J&B SANIYAPUR SARL</strong>, nous sommes convaincus qu’un service d’excellence repose avant tout sur des femmes et des hommes respectés, protégés et formés dans les meilleures conditions.
              </p>

              <div className="mt-6 rounded-2xl border-l-4 border-[#a85c36] border-y border-r border-[#dce5df] bg-gradient-to-br from-[#fcf9f7] to-[#f7f1ec] p-6 text-base italic text-[#8b4a2b]">
                « Nous nous engageons à offrir les meilleures conditions de travail à nos employés, qui sont avant tout nos concitoyens. Notre personnel est notre premier atout pour garantir un service de qualité irréprochable. »
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <ButtonLink href="/contact">Rejoindre nos équipes</ButtonLink>
                <ButtonLink href="/a-propos" variant="secondary">Découvrir notre équipe</ButtonLink>
              </div>
            </Reveal>

            <Reveal delayMs={100} className="lg:col-span-5">
              <div className="rounded-3xl border-2 border-[#a85c36]/25 bg-[#0f2e36] p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
                <div className="absolute -top-12 -right-12 size-40 rounded-full bg-[#a85c36]/20 blur-2xl" />
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#e8d9cc] backdrop-blur-md">
                  Chiffre clé & Impact
                </span>
                <p className="mt-6 text-5xl font-black text-white tracking-tight">
                  Près de 100
                </p>
                <p className="mt-2 text-xl font-bold text-[#e8d9cc]">
                  Techniciens de surface qualifiés et protégés
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#c6d7d0]">
                  Déployés au sein des hôpitaux, cliniques, industries et sièges d’entreprises à Ouagadougou et Bobo-Dioulasso, formés au bionettoyage et déclarés à la Sécurité Sociale.
                </p>
                <div className="mt-6 border-t border-white/15 pt-4 flex items-center gap-3 text-xs font-semibold text-white/80">
                  <span className="flex size-6 items-center justify-center rounded-full bg-[#00897b] text-white">✓</span>
                  <span>100% conformité CNSS & protocoles d’hygiène</span>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── 2. LES 6 PILIERS DE NOTRE ENGAGEMENT SOCIAL ── */}
      <section className="py-16 sm:py-24 bg-[#f8faf9]">
        <Container>
          <Reveal className="max-w-3xl">
            <span className="inline-block rounded-full bg-[#f1e4dc] px-4 py-1.5 text-xs font-bold uppercase tracking-[.18em] text-[#a85c36]">
              Nos Engagements Concrets
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#16232a]">
              Les 6 piliers de notre politique sociale
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#526259] leading-relaxed">
              Des actions tangibles mises en place pour assurer la dignité, la santé et l’épanouissement de chaque collaborateur.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {socialPillars.map((pillar, index) => (
              <Reveal key={pillar.id} delayMs={index * 70}>
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#dce5df] bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#a85c36]/40 hover:shadow-xl">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex size-12 items-center justify-center rounded-2xl bg-[#f1e4dc] text-2xl shadow-xs">
                        {pillar.icon}
                      </span>
                      <span className="rounded-full bg-[#f8faf9] border border-[#dce5df] px-3 py-1 text-[11px] font-bold text-[#a85c36]">
                        {pillar.highlight}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-[#16232a] group-hover:text-[#a85c36] transition-colors leading-snug">
                      {pillar.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-[#526259]">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-[#f0f4f1] pt-4 text-xs font-bold text-[#a85c36] flex items-center gap-1">
                    <span>Engagement actif</span>
                    <span>✓</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 3. FOCUS SPÉCIAL : LE PERSONNEL OPÉRATIONNEL ── */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#e2eae4]/60">
        <Container>
          <div className="rounded-3xl border border-[#dce5df] bg-linear-to-br from-[#0f2e36] to-[#0a2328] p-8 sm:p-12 text-white shadow-xl">
            <div className="max-w-3xl">
              <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[.18em] text-[#e8d9cc] backdrop-blur-md">
                Ressources Humaines de Terrain
              </span>
              <h2 className="mt-4 text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                LE PERSONNEL OPÉRATIONNEL AU QUOTIDIEN
              </h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#c6d7d0]">
                Chaque agent de propreté et technicien de surface bénéficie d’un encadrement rigoureux et de garanties sociales complètes :
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {operationalCommitments.map((commitment, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-xl bg-white/10 p-4 backdrop-blur-md border border-white/10">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#e8d9cc] text-[#0f2e36] font-bold text-xs">
                      ✓
                    </span>
                    <span className="text-sm font-medium text-white/90 leading-relaxed">
                      {commitment}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <ContactCtaSection />
    </>
  );
}
