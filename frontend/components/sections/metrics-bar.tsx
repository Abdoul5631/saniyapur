import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const stats = [
  {
    value: "+10",
    unit: "Ans",
    label: "D'expérience & de méthode",
    description: "Expertise de terrain éprouvée",
    icon: "🏆",
  },
  {
    value: "100%",
    unit: "Conforme",
    label: "Protocoles & normes",
    description: "Bionettoyage & FDS certifiées",
    icon: "🔬",
  },
  {
    value: "24/7",
    unit: "Dispo",
    label: "Réactivité opérationnelle",
    description: "Équipes mobilisables en urgence",
    icon: "⚡",
  },
  {
    value: "2",
    unit: "Pôles",
    label: "Villes d'intervention",
    description: "Ouagadougou & Bobo-Dioulasso",
    icon: "📍",
  },
];

export function MetricsBar() {
  return (
    <section className="relative z-20 -mt-10 sm:-mt-12">
      <Container>
        <div className="rounded-3xl border border-[#dce5df] bg-white/95 p-6 sm:p-8 shadow-xl shadow-[#0e272d]/8 backdrop-blur-xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#eaf0ec]">
            {stats.map((stat, index) => (
              <Reveal
                key={stat.label}
                delayMs={index * 80}
                className={index > 0 ? "pt-6 sm:pt-0 sm:pl-6" : ""}
              >
                <div className="group flex items-start gap-4 transition-transform duration-300 hover:translate-x-1">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#f1e4dc] text-xl shadow-xs transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#a85c36] group-hover:text-white">
                    {stat.icon}
                  </span>
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-heading text-3xl font-extrabold tracking-tight text-[#16232a] transition-colors group-hover:text-[#a85c36]">
                        {stat.value}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#a85c36]">
                        {stat.unit}
                      </span>
                    </div>
                    <h3 className="mt-1 text-sm font-bold text-[#16232a]">
                      {stat.label}
                    </h3>
                    <p className="mt-0.5 text-xs text-[#526259]">
                      {stat.description}
                    </p>
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
