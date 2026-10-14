import type { ReactNode } from "react";

/** Mise en page des formulaires admin : contenu à gauche, médias & publication à droite (empilé sur mobile). */
export function FormLayout({ children, aside }: { children: ReactNode; aside: ReactNode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="grid content-start gap-4">{children}</div>
      <aside className="grid content-start gap-4 rounded-xl border border-[#eef2ef] bg-[#fbfcfb] p-4">{aside}</aside>
    </div>
  );
}

export const publishRowClassName = "flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#dce5df] pt-4";
