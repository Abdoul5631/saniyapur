import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { TeamSection } from "@/components/sections/team-section";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { getAboutSettings } from "@/lib/about";
import { resolveMediaUrl } from "@/lib/media";
import { getTeamMembers } from "@/lib/team";

export const metadata: Metadata = {
  title: "À propos | J&B SANIYAPUR SARL",
  description:
    "Présentation officielle de J&B SANIYAPUR SARL : histoire, filiales allemandes, équipe de direction, bionettoyage hospitalier, vision, objectifs et références.",
};

/**
 * Met en valeur en gras bien visible chaque mention de J&B SANIYAPUR
 * uniquement dans les paragraphes et textes normaux, sans toucher aux adresses e-mails ni aux noms de domaine / URLs.
 */
function highlightBrand(text?: string | null, isDark = false): React.ReactNode {
  if (!text || typeof text !== "string") return text;

  // Regex qui détecte les URLs / emails en premier pour les préserver tels quels,
  // ou détecte le nom de l'entreprise J&B SANIYAPUR hors des domaines.
  const regex =
    /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)|(?<![@/.\-_a-zA-Z0-9])(J\s*&\s*B\s+SANIYAPUR(?:\s+SARL)?|JB\s+SANIYAPUR(?:\s+SARL)?|SANIYAPUR(?:\s+SARL)?)(?![.\-_a-zA-Z0-9]*\.(?:com|org|net|de|tg|bf|fr))/gi;

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Texte avant le match
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }

    const urlOrEmail = match[1];
    const brand = match[2];

    if (urlOrEmail) {
      // Préserver intact l'email ou l'URL sans aucune modification ni gras
      elements.push(urlOrEmail);
    } else if (brand) {
      // Mettre en gras visible dans le paragraphe
      elements.push(
        <strong
          key={match.index}
          className={
            isDark
              ? "font-extrabold text-white"
              : "font-extrabold text-[#16232a]"
          }
        >
          {brand}
        </strong>
      );
    }

    lastIndex = regex.lastIndex;
  }

  // Reste du texte après le dernier match
  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements.length > 0 ? elements : text;
}

export default async function AboutPage() {
  const [about, teamMembers] = await Promise.all([
    getAboutSettings(),
    getTeamMembers(),
  ]);

  // Helper pour découper un texte multi-lignes en paragraphes
  const parseParagraphs = (text?: string) =>
    (text || "")
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);

  // Helper pour extraire les puces d'un texte d'engagements ou de liste
  const parseListItems = (text?: string) => {
    if (!text) return { intro: "", items: [] };
    const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
    const items: string[] = [];
    const introLines: string[] = [];

    for (const line of lines) {
      if (
        line.startsWith("-") ||
        line.startsWith("•") ||
        line.startsWith("*") ||
        line.startsWith("✓")
      ) {
        items.push(line.replace(/^[-•*✓]\s*/, "").trim());
      } else {
        introLines.push(line);
      }
    }

    return {
      intro: introLines.join(" "),
      items,
    };
  };

  const presentationParagraphs = parseParagraphs(about.presentation_content);
  const legalInfoData = parseListItems(about.presentation_legal_info);
  const operationalData = parseListItems(about.operational_team_content);
  const bionettoyageData = parseParagraphs(about.bionettoyage_content);
  const missionData = parseParagraphs(about.mission_content);
  const specificObjectivesData = parseListItems(about.specific_objectives_content);
  const advantagesData = parseListItems(about.bionettoyage_advantages_content);
  const visionExecutionData = parseListItems(about.vision_execution_content);
  const visionImpactData = parseListItems(about.vision_impact_content);
  const internationalData = parseListItems(about.international_expertise_content);
  const referencesData = parseParagraphs(about.references_content);
  const engagementsData = parseListItems(about.engagements_content);
  const dgMessageParagraphs = parseParagraphs(about.dg_message);

  return (
    <>
      <PageHero
        eyebrow="Présentation Officielle"
        title="J&B SANIYAPUR SARL"
        description="Société spécialisée dans la maintenance immobilière, le nettoyage industriel et le bionettoyage des établissements de santé. « Propreté sur ordonnance »."
        crumbs={[{ label: "Accueil", href: "/" }, { label: "À propos" }]}
      />

      <section className="py-16 sm:py-24 bg-white">
        <Container>
          {/* 1. PRÉSENTATION DE LA SOCIÉTÉ */}
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <Reveal className={about.presentation_image ? "lg:col-span-7" : "lg:col-span-12"}>
              <span className="inline-block rounded-full bg-[#f1e4dc] px-4 py-1.5 text-xs font-bold uppercase tracking-[.18em] text-[#a85c36]">
                Présentation
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#16232a] sm:text-4xl">
                {highlightBrand(about.presentation_title || "PRÉSENTATION DE LA SOCIÉTÉ")}
              </h2>

              {about.presentation_devise && (
                <div className="mt-6 rounded-2xl border border-[#a85c36]/30 bg-[#f1e4dc]/40 p-5 text-sm sm:text-base italic text-[#8b4a2b] shadow-xs">
                  <p className="font-bold uppercase tracking-wider text-[#a85c36] not-italic text-xs mb-1">
                    Notre Devise Officielle
                  </p>
                  {highlightBrand(about.presentation_devise)}
                </div>
              )}

              <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-[#526259]">
                {presentationParagraphs.map((para, i) => (
                  <p key={i}>{highlightBrand(para)}</p>
                ))}
              </div>

              {/* Fiche d'identification légale de la société */}
              {about.presentation_legal_info && (
                <div className="mt-8 overflow-hidden rounded-2xl border border-[#dce5df] bg-[#f7f8f6] p-6 shadow-xs">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#16232a] border-b border-[#e2eae4] pb-3 mb-4">
                    Fiche d'identification & Renseignements légaux
                  </h3>
                  <div className="grid gap-3 text-xs sm:text-sm text-[#3f5149]">
                    {about.presentation_legal_info.split("\n").map((line, idx) => {
                      if (!line.trim()) return null;
                      const parts = line.split(":");
                      if (parts.length > 1) {
                        return (
                          <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 border-b border-[#eaf0ec] pb-2 last:border-0 last:pb-0">
                            <span className="font-bold text-[#16232a] shrink-0 sm:w-48">{parts[0].trim()} :</span>
                            <span className="text-[#526259]">{highlightBrand(parts.slice(1).join(":").trim())}</span>
                          </div>
                        );
                      }
                      return <p key={idx}>{highlightBrand(line)}</p>;
                    })}
                  </div>
                </div>
              )}
            </Reveal>

            {about.presentation_image && (
              <Reveal delayMs={100} className="lg:col-span-5">
                <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-[#dce5df] bg-[#f7f8f6] shadow-md">
                  <Image
                    src={resolveMediaUrl(about.presentation_image)}
                    alt={about.presentation_title}
                    fill
                    unoptimized
                    className="object-contain p-1.5 transition-transform duration-300 hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </Reveal>
            )}
          </div>

          {/* 2 & 3. PRÉSENTATION DE L'ÉQUIPE & PERSONNEL OPÉRATIONNEL */}
          <div className="mt-20 border-t border-[#dce5df] pt-16">
            <Reveal className="max-w-3xl">
              <span className="inline-block rounded-full bg-[#f1e4dc] px-4 py-1.5 text-xs font-bold uppercase tracking-[.18em] text-[#a85c36]">
                Ressources Humaines & Supervision
              </span>
              <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-[#16232a] sm:text-4xl">
                {highlightBrand(about.team_presentation_title || "PRÉSENTATION DE L'ÉQUIPE")}
              </h2>
              {about.team_presentation_content && (
                <p className="mt-3 text-base text-[#526259]">
                  {highlightBrand(about.team_presentation_content)}
                </p>
              )}
            </Reveal>

            {/* Cartes des membres officiels de l'équipe */}
            <div className="mt-8">
              <TeamSection members={teamMembers} />
            </div>

            {/* Détails du personnel opérationnel */}
            {about.operational_team_content && (
              <Reveal className="mt-12 rounded-2xl border border-[#dce5df] bg-[#f8faf9] p-8 shadow-xs">
                <h3 className="text-xl font-bold text-[#16232a]">
                  {highlightBrand(about.operational_team_title || "LE PERSONNEL OPÉRATIONNEL")}
                </h3>
                {operationalData.intro && (
                  <p className="mt-3 text-base text-[#526259] leading-relaxed">
                    {highlightBrand(operationalData.intro)}
                  </p>
                )}
                {operationalData.items.length > 0 && (
                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {operationalData.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 rounded-xl border border-[#dce5df] bg-white p-4 text-xs sm:text-sm font-medium text-[#16232a] shadow-xs">
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#f1e4dc] text-[#a85c36] font-bold text-xs">
                          ✓
                        </span>
                        <span>{highlightBrand(item)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Reveal>
            )}
          </div>

          {/* 5. L'IMPORTANCE ET LES ENJEUX DU BIONETTOYAGE */}
          {about.bionettoyage_content && (
            <Reveal className="mt-16 border-t border-[#dce5df] pt-12">
              <div className="max-w-4xl">
                <span className="inline-block rounded-full bg-[#0f2e36] px-3.5 py-1 text-xs font-bold uppercase tracking-[.18em] text-[#e8d9cc]">
                  Rigueur Hospitalière
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-[#16232a]">
                  {highlightBrand(about.bionettoyage_title || "L'IMPORTANCE ET LES ENJEUX DU BIONETTOYAGE")}
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-[#526259]">
                  {bionettoyageData.map((para, i) => (
                    <p key={i} className="rounded-xl border border-[#dce5df] bg-[#f8faf9] p-5">
                      {highlightBrand(para)}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {/* 6. DÉFINITIONS ET PRINCIPES FONDAMENTAUX DU BIONETTOYAGE */}
          <Reveal className="mt-16 border-t border-[#dce5df] pt-12">
            <div>
              <span className="inline-block rounded-full bg-[#f1e4dc] px-3.5 py-1 text-xs font-bold uppercase tracking-[.18em] text-[#a85c36]">
                Glossaire & Terminologie
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-[#16232a]">
                DÉFINITIONS ET PRINCIPES DU BIONETTOYAGE
              </h2>
              <p className="mt-3 text-base text-[#526259] max-w-3xl">
                Comprendre les concepts fondamentaux qui guident l’ensemble des protocoles de <strong className="font-extrabold text-[#16232a] bg-[#f1e4dc] px-1.5 py-0.5 rounded border border-[#a85c36]/25">J&B SANIYAPUR</strong> pour l’hygiène hospitalière et la propreté industrielle.
              </p>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {/* 1. Bionettoyage */}
                <div className="rounded-2xl border-2 border-[#a85c36]/25 bg-gradient-to-br from-white to-[#fcf9f7] p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#a85c36] text-white font-bold text-lg">
                      ✦
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-[#16232a]">Le Bionettoyage</h3>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#a85c36]">Méthode d’hygiène hospitalière de référence</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#526259]">
                    Combinaison méthodique et rigoureuse d’un <strong>nettoyage approfondi</strong> (élimination des salissures visibles) et d’une <strong>désinfection microbiologique</strong> (destruction des micro-organismes invisibles). Il garantit un niveau d’hygiène stérile et maîtrisé dans les blocs opératoires, chambres et zones sensibles.
                  </p>
                </div>

                {/* 2. Nettoyage */}
                <div className="rounded-2xl border border-[#dce5df] bg-white p-6 sm:p-8 shadow-xs">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#0f2e36] text-white font-bold text-lg">
                      🧹
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-[#16232a]">Le Nettoyage</h3>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#0f2e36]">Action mécanique & détergente</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#526259]">
                    Processus physique et chimique visant à éliminer les poussières, salissures visibles, graisses et matières organiques à l’aide de détergents professionnels homologués et d’équipements adaptés, préparant ainsi la surface à la désinfection.
                  </p>
                </div>

                {/* 3. Désinfection */}
                <div className="rounded-2xl border border-[#dce5df] bg-white p-6 sm:p-8 shadow-xs">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#00897b] text-white font-bold text-lg">
                      🛡️
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-[#16232a]">La Désinfection</h3>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#00897b]">Éradication des micro-organismes</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#526259]">
                    Opération au résultat momentané permettant d’éliminer ou de tuer les micro-organismes pathogènes (bactéries, virus, levures, champignons et spores) à l’aide de biocides normés (IHO, HACCP) ou de vapeur thermique sèche haute température.
                  </p>
                </div>

                {/* 4. Prévention des Infections Nosocomiales */}
                <div className="rounded-2xl border border-[#dce5df] bg-[#f8faf9] p-6 sm:p-8 shadow-xs">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#a85c36]/15 text-[#a85c36] font-bold text-lg">
                      🏥
                    </span>
                    <div>
                      <h3 className="text-xl font-bold text-[#16232a]">Infections Nosocomiales</h3>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#a85c36]">Risque sanitaire combattu</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#526259]">
                    Infections contractées au cours d’un séjour dans un établissement de santé. L'approche « Propreté sur ordonnance » de <strong className="font-extrabold text-[#16232a] bg-[#f1e4dc] px-1.5 py-0.5 rounded border border-[#a85c36]/25">J&B SANIYAPUR</strong> brise les chaînes de contamination croisée pour garantir : <em>« Entrer à l’hôpital avec une maladie et repartir SANS une autre maladie. »</em>
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 7. NOTRE MISSION */}
          {about.mission_content && (
            <Reveal className="mt-16 border-t border-[#dce5df] pt-12">
              <div className="rounded-2xl border border-[#dce5df] bg-linear-to-r from-[#0f2e36] to-[#0a2328] p-8 sm:p-12 text-white shadow-lg">
                <span className="inline-block rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[.18em] text-[#e8d9cc] backdrop-blur-md">
                  Mission
                </span>
                <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                  {highlightBrand(about.mission_title || "NOTRE MISSION", true)}
                </h2>
                <div className="mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-[#c6d7d0]">
                  {missionData.map((para, i) => (
                    <p key={i}>{highlightBrand(para, true)}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {/* 8. NOTRE OBJECTIF ET OBJECTIFS SPÉCIFIQUES */}
          {(about.objectives_content || about.specific_objectives_content) && (
            <Reveal className="mt-16 border-t border-[#dce5df] pt-12">
              <div>
                <span className="inline-block rounded-full bg-[#f1e4dc] px-3.5 py-1 text-xs font-bold uppercase tracking-[.18em] text-[#a85c36]">
                  Orientations
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-[#16232a]">
                  {highlightBrand(about.objectives_title || "NOTRE OBJECTIF ET OBJECTIFS SPÉCIFIQUES")}
                </h2>
                {about.objectives_content && (
                  <p className="mt-4 text-base sm:text-lg text-[#526259] leading-relaxed font-medium">
                    {highlightBrand(about.objectives_content)}
                  </p>
                )}

                {specificObjectivesData.items.length > 0 && (
                  <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {specificObjectivesData.items.map((item, idx) => (
                      <div key={idx} className="rounded-2xl border border-[#dce5df] bg-white p-6 shadow-xs">
                        <span className="flex size-7 items-center justify-center rounded-lg bg-[#0f2e36] text-white font-bold text-xs">
                          {idx + 1}
                        </span>
                        <p className="mt-3 text-sm leading-relaxed text-[#16232a] font-semibold">
                          {highlightBrand(item)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {advantagesData.items.length > 0 && (
                  <div className="mt-10 rounded-2xl border border-[#dce5df] bg-[#f8faf9] p-6 sm:p-8">
                    <h3 className="text-lg font-bold text-[#16232a] mb-4">
                      Les avantages concrets du bionettoyage pour les établissements :
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {advantagesData.items.map((adv, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm font-semibold text-[#16232a]">
                          <span className="text-[#a85c36] font-bold">✓</span>
                          <span>{highlightBrand(adv)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          )}

          {/* 9. NOTRE VISION : LA SATISFACTION DES CLIENTS */}
          {about.vision_content && (
            <Reveal className="mt-16 border-t border-[#dce5df] pt-12">
              <div className="space-y-8">
                <div>
                  <span className="inline-block rounded-full bg-[#f1e4dc] px-3.5 py-1 text-xs font-bold uppercase tracking-[.18em] text-[#a85c36]">
                    Vision
                  </span>
                  <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-[#16232a]">
                    {highlightBrand(about.vision_title || "NOTRE VISION : LA SATISFACTION DES CLIENTS")}
                  </h2>
                  <p className="mt-4 text-base sm:text-lg text-[#526259] leading-relaxed font-medium">
                    {highlightBrand(about.vision_content)}
                  </p>
                </div>

                {about.vision_paradox_content && (
                  <div className="rounded-2xl border-l-4 border-[#a85c36] border-y border-r border-[#dce5df] bg-[#fcf9f7] p-6 text-base text-[#16232a]">
                    {highlightBrand(about.vision_paradox_content)}
                  </div>
                )}

                <div className="grid gap-8 md:grid-cols-2">
                  {visionExecutionData.items.length > 0 && (
                    <div className="rounded-2xl border border-[#dce5df] bg-white p-6 shadow-xs">
                      <h3 className="text-base font-bold text-[#16232a] mb-4 border-b border-[#f0f4f1] pb-3">
                        Comment nous réalisons cette vision :
                      </h3>
                      <ul className="space-y-3 text-xs sm:text-sm text-[#526259]">
                        {visionExecutionData.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#a85c36] font-bold">•</span>
                            <span>{highlightBrand(item)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {visionImpactData.items.length > 0 && (
                    <div className="rounded-2xl border border-[#dce5df] bg-white p-6 shadow-xs">
                      <h3 className="text-base font-bold text-[#16232a] mb-4 border-b border-[#f0f4f1] pb-3">
                        Impact direct sur la satisfaction :
                      </h3>
                      <ul className="space-y-3 text-xs sm:text-sm text-[#526259]">
                        {visionImpactData.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#a85c36] font-bold">✓</span>
                            <span>{highlightBrand(item)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          )}

          {/* 10. EXPERTISE INTERNATIONALE */}
          {about.international_expertise_content && (
            <Reveal className="mt-16 border-t border-[#dce5df] pt-12">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className={about.international_expertise_image ? "lg:col-span-7" : "lg:col-span-12"}>
                  <span className="inline-block rounded-full bg-[#0f2e36] px-3.5 py-1 text-xs font-bold uppercase tracking-[.18em] text-[#e8d9cc]">
                    Partenariat Allemand
                  </span>
                  <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-[#16232a]">
                    {highlightBrand(about.international_expertise_title || "EXPERTISE INTERNATIONALE")}
                  </h2>
                  {internationalData.intro && (
                    <p className="mt-4 text-base text-[#526259] font-medium">
                      {highlightBrand(internationalData.intro)}
                    </p>
                  )}
                  {internationalData.items.length > 0 && (
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {internationalData.items.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 rounded-xl border border-[#dce5df] bg-[#f8faf9] p-4 text-xs sm:text-sm text-[#16232a]">
                          <span className="text-[#a85c36] font-bold">🇩🇪</span>
                          <span>{highlightBrand(item)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {about.international_expertise_image && (
                  <div className="lg:col-span-5">
                    <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-[#dce5df] bg-[#f7f8f6] shadow-md">
                      <Image
                        src={resolveMediaUrl(about.international_expertise_image)}
                        alt="Expertise Internationale SANIYAPUR"
                        fill
                        unoptimized
                        className="object-contain p-1.5 transition-transform duration-300 hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                      />
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          )}

          {/* 11. NOS RÉFÉRENCES CLIENTS */}
          {about.references_content && (
            <Reveal className="mt-16 border-t border-[#dce5df] pt-12">
              <div>
                <span className="inline-block rounded-full bg-[#f1e4dc] px-3.5 py-1 text-xs font-bold uppercase tracking-[.18em] text-[#a85c36]">
                  Confiance & Références
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-[#16232a]">
                  {highlightBrand(about.references_title || "NOS RÉFÉRENCES CLIENTS")}
                </h2>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {referencesData.map((refPara, i) => {
                    const lines = refPara.split("\n").map((l) => l.trim()).filter(Boolean);
                    const isMultiLine = lines.length > 1;
                    const cleanTitle = isMultiLine
                      ? lines[0].replace(/^[0-9]+\.\s*/, "")
                      : `PARTENARIATS & EXPANSION`;
                    const bodyText = isMultiLine
                      ? lines.slice(1).join("\n")
                      : lines[0];

                    return (
                      <div
                        key={i}
                        className="rounded-2xl border border-[#dce5df] bg-white p-6 shadow-xs hover:border-[#a85c36] transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <span className="grid size-8 place-items-center rounded-lg bg-[#0f2e36] text-white font-bold text-xs shrink-0">
                            {i + 1}
                          </span>
                          <h3 className="font-bold text-[#16232a] text-base leading-snug">
                            {highlightBrand(cleanTitle)}
                          </h3>
                        </div>
                        <div className="text-xs sm:text-sm text-[#526259] space-y-2 whitespace-pre-line border-t border-[#f0f4f1] pt-3">
                          {highlightBrand(bodyText)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 flex justify-center sm:justify-start">
                  <Link
                    href="/attestations"
                    className="inline-flex items-center gap-2.5 rounded-xl border border-[#a85c36]/40 bg-[#fcf9f7] px-6 py-3.5 text-sm font-bold text-[#a85c36] shadow-xs transition hover:bg-[#a85c36] hover:text-white hover:shadow-md"
                  >
                    <span>📜</span>
                    <span>Consulter les attestations & certificats officiels numérisés →</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          )}

          {/* 12. MESSAGE DU DIRECTEUR GÉNÉRAL */}
          {(about.dg_message || about.dg_name) && (
            <Reveal className="mt-16 border-t border-[#dce5df] pt-12">
              <div className="overflow-hidden rounded-2xl border border-[#dce5df] bg-linear-to-br from-[#f7f8f6] to-[#edf4f1] p-8 sm:p-12 shadow-xs">
                <div className="flex flex-col md:flex-row md:items-start gap-8">
                  {about.dg_photo ? (
                    <div className="relative size-36 sm:size-44 shrink-0 overflow-hidden rounded-2xl border-2 border-[#a85c36]/30 bg-white shadow-md">
                      <Image
                        src={resolveMediaUrl(about.dg_photo)}
                        alt={about.dg_name || "Directeur Général"}
                        fill
                        unoptimized
                        className="object-contain p-1 transition-transform duration-300 hover:scale-[1.02]"
                        sizes="176px"
                      />
                    </div>
                  ) : (
                    <div className="flex size-32 shrink-0 items-center justify-center rounded-2xl border-2 border-[#a85c36]/30 bg-[#f1e4dc] text-2xl font-bold text-[#a85c36] shadow-xs">
                      DG
                    </div>
                  )}

                  <div className="flex-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#a85c36]">
                      Message du Directeur Général
                    </span>
                    <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#16232a]">
                      {highlightBrand(about.dg_name || "Monsieur Jules TEKPO")}
                    </h3>
                    {about.dg_role && (
                      <p className="text-sm font-semibold text-[#526259]">
                        {highlightBrand(about.dg_role)}
                      </p>
                    )}

                    <div className="relative mt-6 border-l-2 border-[#a85c36] pl-5 text-base sm:text-lg italic leading-relaxed text-[#3f5149]">
                      {dgMessageParagraphs.map((para, i) => (
                        <p key={i} className="mb-4 last:mb-0">
                          « {highlightBrand(para)} »
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          )}

          {/* 13. NOS ENGAGEMENTS */}
          {about.engagements_content && (
            <Reveal className="mt-16 border-t border-[#dce5df] pt-12">
              <div className="rounded-2xl border border-[#dce5df] bg-white p-8 sm:p-10 shadow-xs">
                <span className="inline-block rounded-full bg-[#f1e4dc] px-3.5 py-1 text-xs font-bold uppercase tracking-[.18em] text-[#a85c36]">
                  Charte Qualité
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-[#16232a]">
                  {highlightBrand(about.engagements_title || "NOS ENGAGEMENTS")}
                </h2>
                {engagementsData.intro && (
                  <p className="mt-3 text-base text-[#526259]">
                    {highlightBrand(engagementsData.intro)}
                  </p>
                )}
                {engagementsData.items.length > 0 && (
                  <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {engagementsData.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 rounded-xl border border-[#dce5df] bg-[#f8faf9] p-5">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#a85c36] text-white font-bold text-xs">
                          {idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm font-semibold text-[#16232a]">
                          {highlightBrand(item)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          )}
        </Container>
      </section>

      <ContactCtaSection title="Échangeons autour de votre projet de bionettoyage et maintenance." />
    </>
  );
}

