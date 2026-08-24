import { competencies } from "@/data/home-content";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const iconPaths = [
  "M12 3c-3.5 4-6 7.4-6 10.5A6 6 0 0 0 12 20a6 6 0 0 0 6-6.5C18 10.4 15.5 7 12 3z",
  "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  "M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13",
  "M3 8l9-5 9 5-9 5-9-5zM3 8v9l9 5 9-5V8M12 13v9",
  "M4 10h9a4 4 0 0 1 4 4v1M17 8v3M9 8v10",
  "M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z",
  "M4 20c0-3.3 3.1-6 7-6s7 2.7 7 6M11 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 9.5A2.5 2.5 0 1 0 17 4.5M19 15.2c1.8.6 3 2 3 4.3",
];
function CompetencyMark({ number }: { number: string }) {
  const path = iconPaths[Number(number) - 1] ?? iconPaths[0];
  return <span aria-hidden="true" className="grid size-11 place-items-center rounded-xl bg-[#f1e4dc] text-sm font-bold text-[#a85c36] transition-transform duration-300 group-hover:scale-110"><svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={path} /></svg><span className="sr-only">Domaine {number}</span></span>;
}
export function CompetenciesSection() { return <section id="services" className="bg-[#f1f6f6] py-20 sm:py-28"><Container><Reveal className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[.18em] text-[#a85c36]">Nos domaines de compétences</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#16232a] sm:text-4xl">Une réponse exigeante aux enjeux d’hygiène et de maintenance.</h2></Reveal><div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{competencies.map(([number, title, description], index) => <Reveal key={title} delayMs={index * 80} className={index === 0 ? "xl:col-span-2" : ""}><article className="group h-full rounded-2xl border border-[#d6e3da] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#a85c36] hover:shadow-xl hover:shadow-[#a85c36]/8"><div className="flex items-center justify-between"><CompetencyMark number={number} /><p className="text-xs font-bold tracking-[.15em] text-[#a85c36]">{number}</p></div><h3 className="mt-7 text-xl font-semibold tracking-tight text-[#16232a]">{title}</h3><p className="mt-4 leading-7 text-[#526259]">{description}</p></article></Reveal>)}</div></Container></section>; }
