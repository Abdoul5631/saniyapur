import { benefits } from "@/data/home-content";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const pillars = [
  {
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Expertise certifiée",
    desc: "Protocoles validés selon les normes sanitaires internationales.",
    color: "bg-[#f1e4dc] text-[#a85c36]",
  },
  {
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    title: "Qualité maîtrisée",
    desc: "Chaque intervention fait l'objet d'un suivi rigoureux et d'un rapport.",
    color: "bg-[#e8f5f0] text-[#00897b]",
  },
  {
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "Équipes formées",
    desc: "Agents spécialisés, discrets et encadrés par des chefs d'équipe expérimentés.",
    color: "bg-[#eef2ff] text-[#4f46e5]",
  },
  {
    icon: (
      <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Réactivité 24/7",
    desc: "Mobilisation rapide pour toute situation d'urgence ou planification régulière.",
    color: "bg-[#fef3c7] text-[#d97706]",
  },
];

export function WhySection() {
  return (
    <section id="pourquoi-saniyapur" className="bg-white py-20 sm:py-28 relative overflow-hidden">
      {/* Motif décoratif subtil en fond */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(168,92,54,0.05) 0%, transparent 50%), radial-gradient(circle at 10% 80%, rgba(0,137,123,0.05) 0%, transparent 50%)",
        }}
      />
      {/* Trait vertical décoratif */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#a85c36] via-[#a85c36]/30 to-transparent" />

      <Container className="relative z-10">
        {/* ── En-tête ── */}
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <span className="inline-block rounded-full bg-[#f1e4dc] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#a85c36]">
              Pourquoi SANIYAPUR
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#16232a] leading-[1.12]">
              Une maîtrise complète,{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-[#a85c36]">au service de vos espaces.</span>
                <span className="absolute bottom-1 left-0 h-[3px] w-full rounded-full bg-[#f1e4dc]" />
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-[#526259]">
              Une organisation rigoureuse au service de la conformité réglementaire, de la durabilité
              de votre patrimoine et du bien-être de vos équipes.
            </p>
          </Reveal>
        </div>

        {/* ── Grille des piliers ── */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delayMs={i * 80}>
              <div className="group flex flex-col gap-4 rounded-2xl border border-[#dce5df] bg-white p-6 shadow-xs transition-all duration-300 hover:border-[#a85c36]/40 hover:shadow-xl hover:-translate-y-1.5">
                <span className={`inline-flex size-11 items-center justify-center rounded-xl ${pillar.color} shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                  {pillar.icon}
                </span>
                <div>
                  <h3 className="text-base font-bold text-[#16232a] group-hover:text-[#a85c36] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#526259]">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Avantages en liste ── */}
        <Reveal delayMs={200}>
          <div className="mt-14 rounded-3xl border border-[#dce5df] bg-[#f8faf9] p-8 sm:p-10">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-[#a85c36]">
              Ce que vous gagnez avec SANIYAPUR
            </p>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, index) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#a85c36] text-[10px] text-white font-bold">
                    ✓
                  </span>
                  <span className="text-sm font-medium text-[#16232a]">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
