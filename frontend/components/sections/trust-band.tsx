"use client";

const trustItems = [
  { icon: "🏥", label: "Bionettoyage Hospitalier", sub: "Protocoles normés" },
  { icon: "🔬", label: "Normes HACCP", sub: "Hygiène alimentaire & médicale" },
  { icon: "🇩🇪", label: "Produits Allemands", sub: "Dr. Schnell & Kärcher" },
  { icon: "⚡", label: "Intervention 24h/7j", sub: "Réactivité opérationnelle" },
  { icon: "🏆", label: "+15 Ans d'Expérience", sub: "Terrain & méthode éprouvée" },
  { icon: "🌍", label: "Standards Internationaux", sub: "Formation Europe & Afrique" },
  { icon: "♻️", label: "Éco-Responsable", sub: "Produits biodégradables FDS" },
  { icon: "📋", label: "Fiches Techniques", sub: "Traçabilité & conformité" },
];

export function TrustBand() {
  // Dupliquer pour l'effet marquee infini
  const doubled = [...trustItems, ...trustItems];

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-[#0d2530] py-4 select-none">
      {/* Masques de fondu gauche/droite */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0d2530] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0d2530] to-transparent z-10" />

      <div className="relative">
        <div className="animate-marquee-slow flex items-center gap-4">
          {doubled.map((item, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 hover:bg-white/10 hover:border-[#a85c36]/40 transition-all duration-200 cursor-default"
            >
              <span className="text-lg leading-none">{item.icon}</span>
              <div>
                <p className="text-[12px] font-bold text-white whitespace-nowrap">{item.label}</p>
                <p className="text-[10px] text-white/50 whitespace-nowrap">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
