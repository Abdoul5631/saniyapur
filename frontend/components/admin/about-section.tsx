"use client";
import { useEffect, useState, type ReactNode } from "react";

const TOGGLE_EVENT = "about-sections-toggle";

/** Bascule toutes les sections d'un coup (boutons « Tout ouvrir / Tout fermer »). */
export function AboutToolbar() {
  const send = (open: boolean) => window.dispatchEvent(new CustomEvent(TOGGLE_EVENT, { detail: open }));
  const btn =
    "rounded-full border border-[#dce5df] bg-white px-4 py-1.5 text-xs font-semibold text-[#526259] transition hover:border-[#a85c36] hover:text-[#a85c36]";
  return (
    <div className="flex gap-2">
      <button type="button" onClick={() => send(true)} className={btn}>
        Tout ouvrir
      </button>
      <button type="button" onClick={() => send(false)} className={btn}>
        Tout fermer
      </button>
    </div>
  );
}

type Props = {
  number: number;
  title: string;
  /** Résumé affiché quand la section est fermée. */
  summary?: string;
  defaultOpen?: boolean;
  extra?: ReactNode;
  children: ReactNode;
};

/** Section repliable : les champs restent dans le formulaire même fermée. */
export function AboutSection({ number, title, summary, defaultOpen = false, extra, children }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  useEffect(() => {
    const handler = (event: Event) => setOpen(Boolean((event as CustomEvent<boolean>).detail));
    window.addEventListener(TOGGLE_EVENT, handler);
    return () => window.removeEventListener(TOGGLE_EVENT, handler);
  }, []);

  return (
    <section
      onInvalidCapture={() => setOpen(true)}
      className={`rounded-xl border transition-colors ${open ? "border-[#e2c9b9] bg-white" : "border-[#dce5df] bg-[#fbfcfb] hover:border-[#e2c9b9]"}`}
    >
      <div className="flex items-center gap-3 pr-4">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3.5 text-left"
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#f1e4dc] text-xs font-bold text-[#a85c36]">
            {number}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold text-[#16232a]">{title}</span>
            {!open && summary && <span className="block truncate text-xs text-[#8a9a92]">{summary}</span>}
          </span>
          <span
            aria-hidden
            className={`ml-auto shrink-0 text-[#a85c36] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          >
            ▾
          </span>
        </button>
        {extra}
      </div>
      <div className={open ? "border-t border-[#eef2ef] px-4 pb-5 pt-4" : "hidden"}>{children}</div>
    </section>
  );
}
