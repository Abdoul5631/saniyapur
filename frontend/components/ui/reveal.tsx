"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
};

export function Reveal({
  children,
  className = "",
  delayMs = 0,
  direction = "up",
  duration = 550,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const getHiddenTransform = () => {
    switch (direction) {
      case "up":
        return "translate-y-6 opacity-0 scale-[0.98]";
      case "down":
        return "-translate-y-6 opacity-0 scale-[0.98]";
      case "left":
        return "translate-x-8 opacity-0";
      case "right":
        return "-translate-x-8 opacity-0";
      case "none":
        return "opacity-0 scale-[0.97]";
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: visible ? `${Math.min(delayMs, 600)}ms` : "0ms",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`transition-all motion-reduce:transition-none motion-reduce:transform-none ${
        visible ? "translate-y-0 translate-x-0 opacity-100 scale-100" : getHiddenTransform()
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ── Animated counter hook ── */
export function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ── RevealStat: animated counter card ── */
type RevealStatProps = {
  prefix?: string;
  value: number;
  suffix?: string;
  label: string;
  description?: string;
  className?: string;
  delayMs?: number;
};

export function RevealStat({
  prefix = "",
  value,
  suffix = "",
  label,
  description,
  className = "",
  delayMs = 0,
}: RevealStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCountUp(value, 1800, started);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setStarted(true), delayMs);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [delayMs]);

  return (
    <div ref={ref} className={className}>
      <div className="tabular-nums">
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="mt-1 text-sm font-semibold">{label}</div>
      {description && (
        <div className="mt-0.5 text-xs opacity-70">{description}</div>
      )}
    </div>
  );
}
