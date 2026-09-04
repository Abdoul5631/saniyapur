import { benefits } from "@/data/home-content";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const benefitIcons = ["🛡️", "🌟", "🧼", "⚙️", "🏢", "📈"];

export function WhySection() {
  return (
    <section id="pourquoi-saniyapur" className="bg-[#f3f7f5] py-20 sm:py-28 relative overflow-hidden">
      {/* Halo lumineux d'arrière-plan */}
      <div className="pointer-events-none absolute -top-40 right-0 size-80 rounded-full bg-[#a85c36]/10 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -bottom-40 left-0 size-80 rounded-full bg-[#00897b]/10 blur-3xl animate-blob-alt" />

      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <Reveal>
            <span className="inline-block rounded-full bg-[#f1e4dc] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#a85c36]">
              Pourquoi SANIYAPUR
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#16232a] leading-tight">
              Plus de maîtrise et de sérénité pour vos espaces professionnels.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#526259]">
              Une organisation rigoureuse au service de la conformité réglementaire, de la durabilité de votre patrimoine et du bien-être de vos équipes.
            </p>
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <li key={benefit}>
                <Reveal delayMs={index * 70}>
                  <div className="card-interactive flex items-center gap-4 rounded-2xl border border-[#dce5df] bg-white p-5 text-[#16232a] shadow-xs hover:border-[#a85c36] hover:shadow-md transition-all duration-300">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#f1e4dc] text-lg shadow-xs transition-transform duration-300 group-hover:scale-110">
                      {benefitIcons[index % benefitIcons.length]}
                    </span>
                    <span className="font-bold text-sm text-[#16232a] leading-snug">
                      {benefit}
                    </span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
