import { company } from "@/data/company";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

type Props = {
  eyebrow?: string;
  title?: string;
  buttonLabel?: string;
  href?: string;
};

export function ContactCtaSection({
  eyebrow = "Étude & Accompagnement",
  title = "Vous avez un projet en nettoyage, bionettoyage ou maintenance ?",
  buttonLabel = "Demander une étude & devis",
  href = "/devis",
}: Props) {
  const { contact } = company;

  return (
    <section className="py-20 sm:py-28 bg-[#f8faf9] relative overflow-hidden">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#071d22] via-[#0d2a30] to-[#16383e] p-8 sm:p-12 lg:p-16 text-white shadow-2xl border border-[#a85c36]/30">
            {/* ── Orbes lumineux d'ambiance animés ── */}
            <div className="pointer-events-none absolute -top-12 -right-12 size-96 rounded-full bg-[#a85c36]/25 blur-3xl animate-blob" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 size-96 rounded-full bg-[#00897b]/20 blur-3xl animate-blob-alt" />

            <div className="relative z-10">
              {/* En-tête du bandeau */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#e8d9cc] backdrop-blur-md border border-white/15">
                  <span className="size-2 rounded-full bg-[#a85c36] animate-ping" />
                  {eyebrow}
                </span>
                <span className="text-xs font-medium text-white/70">
                  Interventions rapides à {contact.locations}
                </span>
              </div>

              {/* Titre & Description */}
              <div className="mt-6 max-w-3xl">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
                  {title}
                </h2>
                <p className="mt-4 text-base sm:text-lg text-[#c6d7d0] font-light leading-relaxed">
                  Nos spécialistes analysent vos contraintes sur site et vous soumettent une proposition technique et financière sur-mesure sous 24h, sans engagement.
                </p>
              </div>

              {/* Boutons d'action principaux */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <ButtonLink
                  href={href}
                  className="px-8 py-4 text-base font-bold shadow-xl shadow-[#a85c36]/30 animate-shimmer transition-transform hover:scale-[1.03] active:scale-95"
                >
                  {buttonLabel} →
                </ButtonLink>
                <ButtonLink
                  href="/contact"
                  variant="onDark"
                  className="px-7 py-4 text-base font-semibold backdrop-blur-md transition-all hover:bg-white/20 hover:scale-[1.02] active:scale-95"
                >
                  Prendre contact
                </ButtonLink>
              </div>

              {/* Puces de contact rapide interactives */}
              <div className="mt-10 pt-8 border-t border-white/15 flex flex-wrap items-center gap-4 text-xs font-semibold">
                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[#54e38e] hover:bg-[#25D366] hover:text-white transition-all duration-300 backdrop-blur-md border border-white/10 hover:scale-105"
                >
                  <span>💬</span>
                  <span>WhatsApp direct : {contact.whatsapp}</span>
                </a>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/20 transition-all duration-300 backdrop-blur-md border border-white/10 hover:scale-105"
                >
                  <span>📞</span>
                  <span>Tél : {contact.phone}</span>
                </a>
                <span className="text-white/60">
                  ⚡ Réponse sous 24 heures
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
