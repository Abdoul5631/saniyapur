"use client";

import { useCallback, useRef, type PointerEvent, type ReactNode } from "react";

export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const reset = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "";
  }, []);

  const onMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 5}deg) translateY(-4px)`;
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`will-change-transform transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </div>
  );
}
