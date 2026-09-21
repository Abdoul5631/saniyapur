import Image from "next/image";
import { Container } from "@/components/ui/container";
import { resolveMediaUrl } from "@/lib/media";
import type { ClientLogo } from "@/types/admin";

export function ClientLogosSection({ logos }: { logos: ClientLogo[] }) {
  const visible = logos.filter((logo) => Boolean(logo.image));
  if (!visible.length) return null;

  return (
    <section className="border-y border-[#e2eae4]/60 bg-white py-12 sm:py-16">
      <Container>
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#a85c36]">
          Ils nous font confiance
        </p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {visible.map((logo) => (
            <li
              key={logo.id}
              className="relative flex h-16 w-36 items-center justify-center sm:h-20 sm:w-44"
            >
              <Image
                src={resolveMediaUrl(logo.image)}
                alt={logo.name || "Logo client"}
                fill
                unoptimized
                className="object-contain"
                sizes="176px"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
