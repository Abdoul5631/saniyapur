import { company } from "@/data/company";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function AboutSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-[#a85c36]">J&B SANIYAPUR</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#16232a] sm:text-4xl">Une expertise professionnelle au service d’environnements plus sûrs.</h2>
          <p className="mt-6 text-lg leading-8 text-[#526259]">
            J&B SANIYAPUR SARL accompagne les organisations en maintenance immobilière, nettoyage industriel, bionettoyage et hygiène professionnelle, à {company.contact.locations}.
          </p>
          <ButtonLink href="/a-propos" variant="secondary" className="mt-8">En savoir plus</ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
