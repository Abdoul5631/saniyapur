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
    <section className="bg-[#0f2e36] py-16 text-white sm:py-20">
      <Container>
        {crumbs && crumbs.length > 0 && <div className="mb-8"><Breadcrumb items={crumbs} /></div>}
        <p className="animate-fade-in-up text-sm font-bold uppercase tracking-[.18em] text-[#e8d9cc]">{eyebrow}</p>
        <h1 className="animate-fade-in-up mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl [animation-delay:100ms]">{title}</h1>
        {description && <p className="animate-fade-in-up mt-5 max-w-2xl text-lg leading-8 text-white/75 [animation-delay:180ms]">{description}</p>}
      </Container>
    </section>
  );
}
