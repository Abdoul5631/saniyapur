"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";

type Stat = {
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
};

const styles = [
  { icon: "🏆", color: "text-[#e8d9cc]", bgColor: "bg-[#a85c36]/20 border-[#a85c36]/30" },
  { icon: "🤝", color: "text-[#54e38e]", bgColor: "bg-[#25D366]/10 border-[#25D366]/20" },
  { icon: "⚗️", color: "text-[#7dd3fc]", bgColor: "bg-[#0284c7]/10 border-[#0284c7]/20" },
  { icon: "🌿", color: "text-[#86efac]", bgColor: "bg-[#16a34a]/10 border-[#16a34a]/20" },
  { icon: "⚡", color: "text-[#fcd34d]", bgColor: "bg-[#d97706]/10 border-[#d97706]/20" },
];

function AnimatedNumber({
  value,
  suffix,
  prefix = "",
  delayMs = 0,
  started,
}: {
  value: number;
  suffix: string;
  prefix?: string;
  delayMs?: number;
  started: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => {
      const duration = 1800;
      let startTime: number | null = null;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(Math.floor(eased * value));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs, started]);

  return (
    <span className="tabular-nums">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export function AnimatedStatsSection({
  items,
  sinceYear,
}: {
  items: { value: number; suffix: string; label: string; description: string }[];
  sinceYear: number;
}) {
  const stats: Stat[] = items.map((item, index) => ({
    ...item,
    prefix: "",
    icon: styles[index % styles.length].icon,
    color: styles[index % styles.length].color,
    bgColor: styles[index % styles.length].bgColor,
  }));
  const ref = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-14 sm:py-16 bg-[#071d22]"
    >
      {/* ── Fond décoratif ── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Dots pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Orbes */}
        <div className="absolute -top-20 -right-20 size-[500px] rounded-full bg-[#a85c36]/15 blur-3xl animate-blob" />
        <div className="absolute -bottom-20 -left-20 size-[500px] rounded-full bg-[#00897b]/12 blur-3xl animate-blob-alt" />
        {/* Trait décoratif haut */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#a85c36] to-transparent" />
        {/* Trait décoratif bas */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <Container className="relative z-10">
        {/* ── En-tête ── */}
        <div
          className={`mb-8 text-center transition-all duration-700 ${
            started
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "0ms" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#a85c36]/40 bg-[#a85c36]/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#e8d9cc] backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-[#a85c36] animate-pulse" />
            SANIYAPUR EN CHIFFRES
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-[1.15]">
            Une expertise qui parle{" "}
            <span className="text-gradient-copper">d'elle-même.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-white/60 font-light">
            Des chiffres concrets qui témoignent de notre engagement au service de l'hygiène et de la qualité.
          </p>
        </div>

        {/* ── Grille de stats ── */}
        <div className="mx-auto flex max-w-[48rem] flex-wrap justify-center gap-3">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`group relative w-full overflow-hidden rounded-2xl border bg-white/5 px-4 py-3.5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:bg-white/8 sm:max-w-[14.25rem] ${stat.bgColor}`}
              style={{
                opacity: started ? 1 : 0,
                transform: started ? "translateY(0) scale(1)" : "translateY(24px) scale(0.96)",
                transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms`,
              }}
            >
              {/* Numéro décoratif en filigrane */}
              <span className="absolute -right-1 -top-2 font-mono text-5xl font-black text-white/[0.04] select-none">
                0{index + 1}
              </span>

              {/* Icône */}
              <span className={`mb-2 inline-flex size-8 items-center justify-center rounded-lg border text-base ${stat.bgColor} transition-transform duration-300 group-hover:scale-110`}>
                {stat.icon}
              </span>

              <div className={`text-2xl font-black tracking-tight ${stat.color} leading-none sm:text-3xl`}>
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  delayMs={index * 120}
                  started={started}
                />
              </div>

              {/* Labels */}
              <p className="mt-2 text-[13px] font-bold text-white leading-snug">
                {stat.label}
              </p>
              <p className="mt-0.5 text-[11px] text-white/50 leading-relaxed">
                {stat.description}
              </p>

              {/* Barre de progression animée en bas */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] overflow-hidden">
                <div
                  className={`h-full ${stat.color.replace("text-", "bg-").replace("[", "[").replace("]", "]")} bg-current transition-all duration-1000`}
                  style={{
                    width: started ? "100%" : "0%",
                    transitionDelay: `${index * 100 + 600}ms`,
                    opacity: 0.5,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ── Citation de confiance ── */}
        <div
          className={`mt-8 text-center transition-all duration-700 ${
            started ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "700ms" }}
        >
          <p className="font-serif italic text-sm sm:text-base text-white/50">
            « Propreté sur ordonnance — Excellence opérationnelle depuis{" "}
            <span className="text-[#e8d9cc] not-italic font-bold">{sinceYear}</span> »
          </p>
        </div>
      </Container>
    </section>
  );
}
