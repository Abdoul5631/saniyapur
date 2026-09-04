import { Breadcrumb, type Crumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-linear-to-b from-[#071d22] to-[#0f2e36] py-16 sm:py-24 text-white">
      {/* Halo lumineux d'ambiance */}
      <div className="pointer-events-none absolute -top-24 right-1/4 -z-10 size-80 rounded-full bg-[#a85c36]/20 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -bottom-24 left-1/4 -z-10 size-80 rounded-full bg-[#00897b]/15 blur-3xl animate-blob-alt" />

      <Container>
        {crumbs && crumbs.length > 0 && (
          <div className="mb-6 animate-fade-in-up">
            <Breadcrumb items={crumbs} />
          </div>
        )}

        <span className="inline-block rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[.18em] text-[#e8d9cc] backdrop-blur-md border border-white/10 animate-fade-in-up">
          {eyebrow}
        </span>

        <h1 className="animate-fade-in-up mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-5xl leading-tight [animation-delay:120ms]">
          {title}
        </h1>

        {description && (
          <p className="animate-fade-in-up mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-[#c6d7d0] font-light [animation-delay:220ms]">
            {description}
          </p>
        )}
      </Container>
    </section>
  );
}
