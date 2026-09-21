import { expertiseHighlights } from "@/data/home-content";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const pillarsData = [
  {
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    accent: "bg-[#a85c36] text-white",
    light: "bg-[#f1e4dc] text-[#a85c36]",
    dot: "bg-[#a85c36]",
    num: "text-[#a85c36]",
  },
  {
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    accent: "bg-[#00897b] text-white",
    light: "bg-[#e8f5f0] text-[#00897b]",
    dot: "bg-[#00897b]",
    num: "text-[#00897b]",
  },
  {
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    accent: "bg-[#1a6b7a] text-white",
    light: "bg-[#e0f4f6] text-[#1a6b7a]",
    dot: "bg-[#1a6b7a]",
    num: "text-[#1a6b7a]",
  },
  {
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    accent: "bg-[#5c4b3a] text-white",
    light: "bg-[#f5ede6] text-[#5c4b3a]",
    dot: "bg-[#5c4b3a]",
    num: "text-[#5c4b3a]",
  },
  {
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    accent: "bg-[#16232a] text-white",
    light: "bg-[#eaf0f3] text-[#16232a]",
    dot: "bg-[#16232a]",
    num: "text-[#16232a]",
  },
];

export function ExpertisePreviewSection() {
  return (
    <section className="relative py-14 sm:py-20 bg-[#f8faf9] overflow-hidden">
      {/* Trait décoratif haut */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#a85c36]/40 to-transparent" />

      <Container className="relative z-10">
        {/* ── En-tête ── */}
        <div className="flex flex-col gap-5 pb-10 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#a85c36]/30 bg-[#f1e4dc] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#a85c36]">
              <span className="size-1.5 rounded-full bg-[#a85c36]" />
              Notre Savoir-Faire
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#16232a] leading-[1.15]">
              Qualité, hygiène et{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#a85c36]">professionnalisme.</span>
                <span className="absolute bottom-0.5 left-0 h-[3px] w-full rounded-full bg-[#f1e4dc]" />
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#526259] leading-relaxed">
              Cinq piliers qui définissent l'identité opérationnelle de J&B SANIYAPUR SARL.
            </p>
          </Reveal>

          <Reveal delayMs={100} className="hidden md:block shrink-0">
            <ButtonLink href="/a-propos" variant="secondary" className="px-5 py-2.5 text-sm shadow-xs">
              Découvrir notre expertise →
            </ButtonLink>
          </Reveal>
        </div>

        {/* ── Grille de piliers — cartes compactes horizontales ── */}
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {expertiseHighlights.map((item, index) => {
            const p = pillarsData[index % pillarsData.length];
            return (
              <li key={item.title}>
                <Reveal delayMs={index * 60} className="h-full">
                  <div className="group relative h-full flex flex-col rounded-xl border border-[#e2eae4] bg-white px-4 py-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-[#a85c36]/30 overflow-hidden">
                    {/* Numéro filigrane */}
                    <span className={`absolute right-3 bottom-2 font-mono text-5xl font-black ${p.num} opacity-[0.06] select-none leading-none`}>
                      {index + 1}
                    </span>

                    {/* Ligne icône + numéro visible */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-flex size-9 items-center justify-center rounded-lg ${p.light} transition-transform duration-300 group-hover:scale-110`}>
                        {p.icon}
                      </span>
                      <span className={`font-mono text-xs font-bold ${p.num} opacity-50`}>
                        0{index + 1}
                      </span>
                    </div>

                    {/* Titre */}
                    <p className="text-sm font-bold text-[#16232a] leading-tight group-hover:text-[#a85c36] transition-colors">
                      {item.title}
                    </p>

                    {/* Texte — limité à 2 lignes */}
                    <p className="mt-1.5 text-xs leading-relaxed text-[#526259] line-clamp-2 flex-1">
                      {item.text}
                    </p>

                    {/* Barre colorée bas au hover */}
                    <div className={`mt-3 h-[2px] w-0 rounded-full ${p.dot} transition-all duration-500 group-hover:w-full`} />
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>

        {/* ── CTA mobile ── */}
        <div className="mt-8 md:hidden">
          <ButtonLink href="/a-propos" variant="secondary" className="w-full justify-center py-3">
            Découvrir notre expertise →
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
