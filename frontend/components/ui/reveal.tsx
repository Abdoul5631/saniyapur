"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
};

export function Reveal({
  children,
  className = "",
  delayMs = 0,
  direction = "up",
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
        return "translate-x-6 opacity-0";
      case "right":
        return "-translate-x-6 opacity-0";
      case "none":
        return "opacity-0 scale-[0.98]";
    }
  };

  const getVisibleTransform = () => {
    return "translate-y-0 translate-x-0 opacity-100 scale-100";
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: visible ? `${Math.min(delayMs, 400)}ms` : "0ms",
        transitionDuration: "550ms",
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`transition-all motion-reduce:transition-none motion-reduce:transform-none ${
        visible ? getVisibleTransform() : getHiddenTransform()
      } ${className}`}
    >
      {children}
    </div>
  );
}
