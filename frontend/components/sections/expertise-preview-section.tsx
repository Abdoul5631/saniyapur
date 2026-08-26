import { expertiseHighlights } from "@/data/home-content";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function ExpertisePreviewSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-[#a85c36]">Notre expertise</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#16232a] sm:text-4xl">Qualité, hygiène et professionnalisme.</h2>
        </Reveal>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {expertiseHighlights.map((item, index) => (
            <li key={item.title}>
              <Reveal delayMs={index * 70} className="h-full rounded-2xl bg-white p-5 shadow-sm">
                <p className="font-semibold text-[#16232a]">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-[#526259]">{item.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="mt-10"><ButtonLink href="/a-propos" variant="secondary">Découvrir notre expertise</ButtonLink></div>
      </Container>
    </section>
  );
}
