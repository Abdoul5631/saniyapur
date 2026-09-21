import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { TeamGallerySection } from "@/components/sections/team-gallery-section";
import { TeamSection } from "@/components/sections/team-section";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { getAboutSettings } from "@/lib/about";
import { resolveMediaUrl } from "@/lib/media";
import { getTeamGalleryPhotos, getTeamGallerySettings, getTeamMembers } from "@/lib/team";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Présentation officielle de J&B SANIYAPUR SARL : histoire, filiales allemandes, équipe de direction, bionettoyage hospitalier, vision, objectifs et références.",
};

function highlightBrand(text?: string | null, isDark = false): React.ReactNode {
  if (!text || typeof text !== "string") return text;

  const regex =
    /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)|(?<![@/.\-_a-zA-Z0-9])(J\s*&\s*B\s+SANIYAPUR(?:\s+SARL)?|JB\s+SANIYAPUR(?:\s+SARL)?|SANIYAPUR(?:\s+SARL)?)(?![.\-_a-zA-Z0-9]*\.(?:com|org|net|de|tg|bf|fr))/gi;

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }

    const urlOrEmail = match[1];
    const brand = match[2];

    if (urlOrEmail) {
      elements.push(urlOrEmail);
    } else if (brand) {
      elements.push(
        <strong
          key={match.index}
          className={isDark ? "font-extrabold text-white" : "font-extrabold text-[#16232a]"}
        >
          {brand}
        </strong>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements.length > 0 ? elements : text;
}

function softenHeading(text?: string | null) {
  if (!text) return "";
  const trimmed = text.trim();
  const letters = trimmed.replace(/[^A-Za-zÀ-ÿ]/g, "");
  if (letters.length > 4 && letters === letters.toUpperCase()) {
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  }
  return trimmed;
}

function parseParagraphs(text?: string) {
  return (text || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function parseListItems(text?: string) {
  if (!text) return { intro: "", items: [] as string[] };
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const items: string[] = [];
  const introLines: string[] = [];

  for (const line of lines) {
    if (/^[-•*✓]\s*/.test(line) || /^\d+[\.)]\s+/.test(line)) {
      items.push(line.replace(/^[-•*✓]\s*/, "").replace(/^\d+[\.)]\s+/, "").trim());
    } else {
      introLines.push(line);
    }
  }

  return {
    intro: introLines.join(" "),
    items,
  };
}

function SectionEyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={
        dark
          ? "inline-block rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[.18em] text-[#e8d9cc] backdrop-blur-md"
          : "inline-block rounded-full bg-[#f1e4dc] px-4 py-1.5 text-xs font-bold uppercase tracking-[.18em] text-[#a85c36]"
      }
    >
      {children}
    </span>
  );
}

export default async function AboutPage() {
  const [about, teamMembers, gallerySettings, galleryPhotos] = await Promise.all([
    getAboutSettings(),
    getTeamMembers(),
    getTeamGallerySettings(),
    getTeamGalleryPhotos(),
  ]);

  const presentationParagraphs = parseParagraphs(about.presentation_content);
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

  const hasTeamBand =
    teamMembers.length > 0 || Boolean(about.operational_team_content) || galleryPhotos.length > 0;
  const legalLines = (about.presentation_legal_info || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="J&B SANIYAPUR SARL"
        description="Maintenance immobilière, nettoyage industriel et bionettoyage des établissements de santé. « Propreté sur ordonnance »."
        crumbs={[{ label: "Accueil", href: "/" }, { label: "À propos" }]}
      />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionEyebrow>Présentation</SectionEyebrow>
            <h2 className="mt-4 max-w-4xl text-3xl font-extrabold tracking-tight text-[#16232a] sm:text-4xl">
              {highlightBrand(softenHeading(about.presentation_title || "Présentation de la société"))}
            </h2>
          </Reveal>

          {about.presentation_image && (
            <figure className="mt-8 -mx-5 overflow-hidden bg-[#091f24] shadow-xl sm:-mx-8 lg:mx-0 lg:rounded-3xl">
              <Image
                src={resolveMediaUrl(about.presentation_image)}
                alt={about.presentation_title || "J&B SANIYAPUR"}
                width={1591}
                height={1013}
                unoptimized
                priority
                className="h-auto w-full"
                sizes="100vw"
              />
            </figure>
          )}

          <Reveal className={about.presentation_image ? "mt-10" : "mt-6"}>
            {about.presentation_devise && (
              <div className="rounded-2xl border border-[#a85c36]/25 bg-[#f1e4dc]/35 p-5 text-sm italic leading-relaxed text-[#8b4a2b] sm:p-6 sm:text-base">
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#a85c36] not-italic">
                  Notre devise
                </p>
                {highlightBrand(about.presentation_devise)}
              </div>
            )}

            <div className="mt-6 max-w-4xl space-y-4 text-base leading-relaxed text-[#526259] sm:text-lg">
              {presentationParagraphs.map((para, i) => (
                <p key={i}>{highlightBrand(para)}</p>
              ))}
            </div>

            {legalLines.length > 0 && (
              <div className="mt-8 overflow-hidden rounded-2xl border border-[#dce5df] bg-[#f8faf9] p-6 sm:p-7">
                <h3 className="mb-4 border-b border-[#e2eae4] pb-3 text-sm font-bold uppercase tracking-wider text-[#16232a]">
                  Identification & renseignements légaux
                </h3>
                <dl className="grid gap-3 text-sm text-[#3f5149]">
                  {legalLines.map((line, idx) => {
                    const parts = line.split(":");
                    if (parts.length > 1) {
                      return (
                        <div
                          key={idx}
                          className="flex flex-col gap-1 border-b border-[#eaf0ec] pb-2 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-3"
                        >
                          <dt className="shrink-0 font-bold text-[#16232a] sm:w-48">{parts[0].trim()}</dt>
                          <dd>{highlightBrand(parts.slice(1).join(":").trim())}</dd>
                        </div>
                      );
                    }
                    return <p key={idx}>{highlightBrand(line)}</p>;
                  })}
                </dl>
              </div>
            )}
          </Reveal>
        </Container>
      </section>

      {hasTeamBand && (
        <section className="border-y border-[#e2eae4]/60 bg-[#f8faf9] py-16 sm:py-20">
          <Container>
            <Reveal className="max-w-3xl">
              <SectionEyebrow>Équipe</SectionEyebrow>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#16232a] sm:text-4xl">
                {highlightBrand(softenHeading(about.team_presentation_title || "Présentation de l'équipe"))}
              </h2>
              {about.team_presentation_content && (
                <p className="mt-4 text-base leading-relaxed text-[#526259] sm:text-lg">
                  {highlightBrand(about.team_presentation_content)}
                </p>
              )}
            </Reveal>

            {teamMembers.length > 0 && (
              <div className="mt-10">
                <TeamSection members={teamMembers} />
              </div>
            )}

            {about.operational_team_content && (
              <Reveal className="mt-12 rounded-3xl border border-[#dce5df] bg-white p-7 shadow-xs sm:p-8">
                <h3 className="text-xl font-extrabold text-[#16232a]">
                  {highlightBrand(softenHeading(about.operational_team_title || "Le personnel opérationnel"))}
                </h3>
                {operationalData.intro && (
                  <p className="mt-3 text-base leading-relaxed text-[#526259]">
                    {highlightBrand(operationalData.intro)}
                  </p>
                )}
                {operationalData.items.length > 0 && (
                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {operationalData.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 rounded-xl border border-[#dce5df] bg-[#f8faf9] p-4 text-sm font-medium text-[#16232a]"
                      >
                        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#f1e4dc] text-xs font-bold text-[#a85c36]">
                          ✓
                        </span>
                        <span>{highlightBrand(item)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Reveal>
            )}

            <TeamGallerySection settings={gallerySettings} photos={galleryPhotos} embedded />
          </Container>
        </section>
      )}

      <section className="bg-white py-16 sm:py-20">
          <Container>
            {about.bionettoyage_content && (
              <Reveal className="max-w-4xl">
                <SectionEyebrow>Rigueur hospitalière</SectionEyebrow>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#16232a] sm:text-4xl">
                  {highlightBrand(
                    softenHeading(about.bionettoyage_title || "L'importance et les enjeux du bionettoyage")
                  )}
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-[#526259]">
                  {bionettoyageData.map((para, i) => (
                    <p key={i} className="rounded-2xl border border-[#dce5df] bg-[#f8faf9] p-5">
                      {highlightBrand(para)}
                    </p>
                  ))}
                </div>
              </Reveal>
            )}

            <Reveal className={about.bionettoyage_content ? "mt-16" : undefined}>
              <SectionEyebrow>Principes</SectionEyebrow>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#16232a] sm:text-4xl">
                Définitions et principes du bionettoyage
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#526259]">
                Les notions qui structurent les protocoles de{" "}
                <strong className="font-extrabold text-[#16232a]">J&B SANIYAPUR</strong> en hygiène
                hospitalière et en propreté industrielle.
              </p>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <div className="rounded-3xl border-2 border-[#a85c36]/20 bg-linear-to-br from-white to-[#fcf9f7] p-6 sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#a85c36]">Référence</p>
                  <h3 className="mt-2 text-xl font-extrabold text-[#16232a]">Le bionettoyage</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#526259] sm:text-base">
                    Combinaison d’un <strong>nettoyage approfondi</strong> et d’une{" "}
                    <strong>désinfection microbiologique</strong>, pour un niveau d’hygiène maîtrisé dans
                    les blocs, chambres et zones sensibles.
                  </p>
                </div>
                <div className="rounded-3xl border border-[#dce5df] bg-white p-6 sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#0f2e36]">Action mécanique</p>
                  <h3 className="mt-2 text-xl font-extrabold text-[#16232a]">Le nettoyage</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#526259] sm:text-base">
                    Élimination des poussières, salissures visibles, graisses et matières organiques avec
                    détergents professionnels et matériels adaptés, avant désinfection.
                  </p>
                </div>
                <div className="rounded-3xl border border-[#dce5df] bg-white p-6 sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#00897b]">Résultat momentané</p>
                  <h3 className="mt-2 text-xl font-extrabold text-[#16232a]">La désinfection</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#526259] sm:text-base">
                    Réduction des micro-organismes pathogènes à l’aide de biocides normés ou de procédés
                    thermiques adaptés aux surfaces.
                  </p>
                </div>
                <div className="rounded-3xl border border-[#dce5df] bg-[#f8faf9] p-6 sm:p-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#a85c36]">Enjeu sanitaire</p>
                  <h3 className="mt-2 text-xl font-extrabold text-[#16232a]">Infections nosocomiales</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#526259] sm:text-base">
                    Infections contractées durant un séjour en établissement de santé. L’approche « Propreté
                    sur ordonnance » vise à briser les chaînes de contamination croisée.
                  </p>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>

      {about.mission_content && (
        <section className="relative overflow-hidden bg-[#071d22] py-16 text-white sm:py-20">
          <div className="pointer-events-none absolute -top-20 right-0 size-80 rounded-full bg-[#a85c36]/15 blur-3xl" />
          <Container className="relative">
            <Reveal>
              <SectionEyebrow dark>Mission</SectionEyebrow>
              <h2 className="mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl">
                {highlightBrand(softenHeading(about.mission_title || "Notre mission"), true)}
              </h2>
              <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-[#c6d7d0] sm:text-lg">
                {missionData.map((para, i) => (
                  <p key={i}>{highlightBrand(para, true)}</p>
                ))}
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      {(about.objectives_content || about.specific_objectives_content || about.vision_content) && (
        <section className="bg-[#f8faf9] py-16 sm:py-20">
          <Container>
            {(about.objectives_content || about.specific_objectives_content) && (
              <Reveal>
                <SectionEyebrow>Orientations</SectionEyebrow>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#16232a] sm:text-4xl">
                  {highlightBrand(
                    softenHeading(about.objectives_title || "Notre objectif et objectifs spécifiques")
                  )}
                </h2>
                {about.objectives_content && (
                  <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#526259] sm:text-lg">
                    {highlightBrand(about.objectives_content)}
                  </p>
                )}

                {specificObjectivesData.items.length > 0 && (
                  <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {specificObjectivesData.items.map((item, idx) => (
                      <div key={idx} className="rounded-2xl border border-[#dce5df] bg-white p-6 shadow-xs">
                        <span className="flex size-7 items-center justify-center rounded-lg bg-[#0f2e36] text-xs font-bold text-white">
                          {idx + 1}
                        </span>
                        <p className="mt-3 text-sm font-semibold leading-relaxed text-[#16232a]">
                          {highlightBrand(item)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {advantagesData.items.length > 0 && (
                  <div className="mt-10 rounded-3xl border border-[#dce5df] bg-white p-6 sm:p-8">
                    <h3 className="mb-4 text-lg font-extrabold text-[#16232a]">
                      Avantages concrets pour les établissements
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {advantagesData.items.map((adv, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm font-semibold text-[#16232a]">
                          <span className="text-[#a85c36]">✓</span>
                          <span>{highlightBrand(adv)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Reveal>
            )}

            {about.vision_content && (
              <Reveal className="mt-16">
                <SectionEyebrow>Vision</SectionEyebrow>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#16232a] sm:text-4xl">
                  {highlightBrand(softenHeading(about.vision_title || "Notre vision"))}
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#526259] sm:text-lg">
                  {highlightBrand(about.vision_content)}
                </p>

                {about.vision_paradox_content && (
                  <div className="mt-6 rounded-2xl border border-[#dce5df] border-l-4 border-l-[#a85c36] bg-white p-6 text-base text-[#16232a]">
                    {highlightBrand(about.vision_paradox_content)}
                  </div>
                )}

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {visionExecutionData.items.length > 0 && (
                    <div className="rounded-2xl border border-[#dce5df] bg-white p-6">
                      <h3 className="mb-4 border-b border-[#f0f4f1] pb-3 text-base font-bold text-[#16232a]">
                        Comment nous réalisons cette vision
                      </h3>
                      <ul className="space-y-3 text-sm text-[#526259]">
                        {visionExecutionData.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#a85c36]">•</span>
                            <span>{highlightBrand(item)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {visionImpactData.items.length > 0 && (
                    <div className="rounded-2xl border border-[#dce5df] bg-white p-6">
                      <h3 className="mb-4 border-b border-[#f0f4f1] pb-3 text-base font-bold text-[#16232a]">
                        Impact sur la satisfaction
                      </h3>
                      <ul className="space-y-3 text-sm text-[#526259]">
                        {visionImpactData.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#a85c36]">✓</span>
                            <span>{highlightBrand(item)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Reveal>
            )}
          </Container>
        </section>
      )}

      {(about.international_expertise_content || about.references_content) && (
        <section className="bg-white py-16 sm:py-20">
          <Container>
            {about.international_expertise_content && (
              <Reveal>
                <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                  <div className={about.international_expertise_image ? "lg:col-span-7" : "lg:col-span-12"}>
                    <SectionEyebrow>Partenariat allemand</SectionEyebrow>
                    <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#16232a] sm:text-4xl">
                      {highlightBrand(
                        softenHeading(about.international_expertise_title || "Expertise internationale")
                      )}
                    </h2>
                    {internationalData.intro && (
                      <p className="mt-4 text-base text-[#526259] sm:text-lg">
                        {highlightBrand(internationalData.intro)}
                      </p>
                    )}
                    {internationalData.items.length > 0 && (
                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {internationalData.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="rounded-xl border border-[#dce5df] bg-[#f8faf9] p-4 text-sm text-[#16232a]"
                          >
                            {highlightBrand(item)}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {about.international_expertise_image && (
                    <div className="lg:col-span-5">
                      <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-[#dce5df] bg-[#f7f8f6] shadow-md">
                        <Image
                          src={resolveMediaUrl(about.international_expertise_image)}
                          alt="Expertise internationale SANIYAPUR"
                          fill
                          unoptimized
                          className="object-contain p-2"
                          sizes="(max-width: 1024px) 100vw, 40vw"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            )}

            {about.references_content && (
              <Reveal className={about.international_expertise_content ? "mt-16" : undefined}>
                <SectionEyebrow>Références</SectionEyebrow>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#16232a] sm:text-4xl">
                  {highlightBrand(softenHeading(about.references_title || "Nos références"))}
                </h2>
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {referencesData.map((refPara, i) => {
                    const lines = refPara.split("\n").map((l) => l.trim()).filter(Boolean);
                    const isMultiLine = lines.length > 1;
                    const cleanTitle = isMultiLine ? lines[0].replace(/^[0-9]+\.\s*/, "") : null;
                    const bodyText = isMultiLine ? lines.slice(1).join("\n") : lines[0];

                    return (
                      <div
                        key={i}
                        className="rounded-2xl border border-[#dce5df] bg-[#f8faf9] p-6 transition-colors hover:border-[#a85c36]/40"
                      >
                        {cleanTitle ? (
                          <div className="mb-3 flex items-start gap-3">
                            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#0f2e36] text-xs font-bold text-white">
                              {i + 1}
                            </span>
                            <h3 className="text-base font-bold leading-snug text-[#16232a]">
                              {highlightBrand(cleanTitle)}
                            </h3>
                          </div>
                        ) : null}
                        <div
                          className={`text-sm leading-relaxed text-[#526259] whitespace-pre-line ${
                            cleanTitle ? "border-t border-[#e2eae4] pt-3" : ""
                          }`}
                        >
                          {highlightBrand(bodyText)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8">
                  <Link
                    href="/attestations"
                    className="inline-flex items-center gap-2 rounded-full border border-[#a85c36] px-6 py-3 text-sm font-bold text-[#a85c36] transition hover:bg-[#a85c36] hover:text-white"
                  >
                    Voir les attestations officielles →
                  </Link>
                </div>
              </Reveal>
            )}
          </Container>
        </section>
      )}

      {((about.dg_message || about.dg_name) || about.engagements_content) && (
        <section className="border-t border-[#e2eae4]/60 bg-[#f8faf9] py-16 sm:py-20">
          <Container>
            {(about.dg_message || about.dg_name) && (
              <Reveal>
                <div className="overflow-hidden rounded-3xl border border-[#dce5df] bg-white p-7 shadow-xs sm:p-10">
                  <div className="flex flex-col gap-8 md:flex-row md:items-start">
                    {about.dg_photo && (
                      <div className="relative size-36 shrink-0 overflow-hidden rounded-2xl border border-[#a85c36]/25 bg-[#f7f8f6] sm:size-44">
                        <Image
                          src={resolveMediaUrl(about.dg_photo)}
                          alt={about.dg_name || "Directeur Général"}
                          fill
                          unoptimized
                          className="object-contain p-1"
                          sizes="176px"
                        />
                      </div>
                    )}

                    <div className="flex-1">
                      <SectionEyebrow>Direction</SectionEyebrow>
                      {about.dg_name && (
                        <h3 className="mt-3 text-2xl font-extrabold text-[#16232a] sm:text-3xl">
                          {highlightBrand(about.dg_name)}
                        </h3>
                      )}
                      {about.dg_role && (
                        <p className="mt-1 text-sm font-semibold text-[#526259]">
                          {highlightBrand(about.dg_role)}
                        </p>
                      )}
                      {dgMessageParagraphs.length > 0 && (
                        <div className="relative mt-6 border-l-2 border-[#a85c36] pl-5 text-base italic leading-relaxed text-[#3f5149] sm:text-lg">
                          {dgMessageParagraphs.map((para, i) => (
                            <p key={i} className="mb-4 last:mb-0">
                              « {highlightBrand(para)} »
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            )}

            {about.engagements_content && (
              <Reveal className={(about.dg_message || about.dg_name) ? "mt-12" : undefined}>
                <SectionEyebrow>Charte qualité</SectionEyebrow>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#16232a] sm:text-4xl">
                  {highlightBrand(softenHeading(about.engagements_title || "Nos engagements"))}
                </h2>
                {engagementsData.intro && (
                  <p className="mt-4 max-w-3xl text-base text-[#526259]">
                    {highlightBrand(engagementsData.intro)}
                  </p>
                )}
                {engagementsData.items.length > 0 && (
                  <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {engagementsData.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 rounded-2xl border border-[#dce5df] bg-white p-5"
                      >
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#a85c36] text-xs font-bold text-white">
                          {idx + 1}
                        </span>
                        <p className="text-sm font-semibold text-[#16232a]">{highlightBrand(item)}</p>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-10 flex flex-wrap gap-3">
                  <ButtonLink href="/devis">Demander une étude</ButtonLink>
                  <ButtonLink href="/engagement-social" variant="secondary">
                    Engagement social
                  </ButtonLink>
                </div>
              </Reveal>
            )}
          </Container>
        </section>
      )}

      <ContactCtaSection title="Échangeons autour de votre projet de bionettoyage et maintenance." />
    </>
  );
}
