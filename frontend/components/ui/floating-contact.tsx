"use client";
import { useEffect, useState } from "react";
import { company } from "@/data/company";

export function FloatingContact() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 200);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappUrl = `https://wa.me/${company.contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Bonjour J&B SANIYAPUR, je souhaite obtenir des informations concernant vos services."
  )}`;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
        show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-90 pointer-events-none"
      }`}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Contacter sur WhatsApp"
        className="group relative flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-[#25D366]/50 active:scale-95"
      >
        {/* Anneaux radar animés */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-radar opacity-70 pointer-events-none" />

        {/* Icône WhatsApp */}
        <svg
          className="size-7 transition-transform duration-300 group-hover:scale-110"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.974.554 1.764.819 2.796.819 3.18 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.765-5.768-5.765zm0-2.172c4.418 0 8 3.582 8 8 0 1.455-.41 2.822-1.127 4.004l1.096 4-4.103-1.077c-1.144.673-2.476 1.073-3.866 1.073-4.418 0-8-3.582-8-8 0-4.418 3.582-8 8-8zm3.676 11.238c-.144-.072-.853-.42-1.011-.478-.158-.058-.273-.087-.389.087-.115.174-.446.564-.547.68-.101.116-.202.13-.346.058-.144-.072-.609-.225-1.161-.717-.43-.383-.72-.857-.805-1.002-.085-.145-.009-.224.063-.296.065-.064.144-.167.216-.251.072-.084.096-.145.144-.241.048-.096.024-.181-.012-.253-.036-.072-.389-.938-.533-1.285-.14-.337-.282-.292-.389-.297-.101-.005-.216-.006-.331-.006-.115 0-.303.043-.462.216-.159.174-.606.592-.606 1.444s.62 1.674.707 1.79c.087.116 1.22 1.863 2.956 2.612.413.178.736.284.988.364.415.132.793.113 1.092.069.333-.05 1.023-.418 1.168-.821.144-.404.144-.75.101-.822-.043-.072-.158-.116-.302-.188z" />
        </svg>

        {/* Tooltip élégant */}
        <span className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl bg-[#0e272d] px-3.5 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-1 border border-white/10">
          Échanger sur WhatsApp ↗
        </span>
      </a>
    </div>
  );
}
