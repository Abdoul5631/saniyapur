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
    <section className="py-12 sm:py-16 bg-[#f8faf9] relative overflow-hidden">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#071d22] via-[#0d2a30] to-[#16383e] px-6 py-8 sm:px-10 sm:py-9 text-white shadow-xl border border-[#a85c36]/25">
            {/* ── Orbes d'ambiance (réduits) ── */}
            <div className="pointer-events-none absolute -top-8 -right-8 size-52 rounded-full bg-[#a85c36]/20 blur-3xl animate-blob" />
            <div className="pointer-events-none absolute -bottom-8 -left-8 size-52 rounded-full bg-[#00897b]/15 blur-3xl animate-blob-alt" />

            <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              {/* ── Texte (gauche) ── */}
              <div className="max-w-2xl">
                {/* Eyebrow */}
                <div className="flex flex-wrap items-center gap-2.5 mb-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#e8d9cc] border border-white/12">
                    <span className="size-1.5 rounded-full bg-[#a85c36] animate-ping" />
                    {eyebrow}
                  </span>
                  <span className="text-[11px] text-white/55 font-medium">
                    Ouagadougou & Bobo-Dioulasso
                  </span>
                </div>

                {/* Titre */}
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-[1.2]">
                  {title}
                </h2>

                {/* Description courte */}
                <p className="mt-2.5 text-sm text-[#c6d7d0] leading-relaxed max-w-xl">
                  Proposition technique et financière sur-mesure sous 24h, sans engagement.
                </p>
              </div>

              {/* ── Actions (droite) ── */}
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center gap-3 shrink-0">
                <ButtonLink
                  href={href}
                  className="px-6 py-3 text-sm font-bold shadow-lg shadow-[#a85c36]/25 hover:scale-[1.03] transition-transform active:scale-95 whitespace-nowrap"
                >
                  {buttonLabel} →
                </ButtonLink>
                <ButtonLink
                  href="/contact"
                  variant="onDark"
                  className="px-5 py-3 text-sm font-semibold backdrop-blur-md hover:bg-white/20 transition-all whitespace-nowrap"
                >
                  Prendre contact
                </ButtonLink>
              </div>
            </div>

            {/* ── Bande contacts rapides (bas) ── */}
            <div className="relative z-10 mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center gap-3 text-xs font-semibold">
              <a
                href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/8 px-3.5 py-1.5 text-[#54e38e] hover:bg-[#25D366] hover:text-white transition-all duration-300 border border-white/10 hover:scale-105"
              >
                <span>💬</span>
                <span>WhatsApp : {contact.whatsapp}</span>
              </a>
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/8 px-3.5 py-1.5 text-white hover:bg-white/18 transition-all duration-300 border border-white/10 hover:scale-105"
              >
                <span>📞</span>
                <span>{contact.phone}</span>
              </a>
              <span className="text-white/50 text-[11px]">
                ⚡ Réponse sous 24 heures
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
