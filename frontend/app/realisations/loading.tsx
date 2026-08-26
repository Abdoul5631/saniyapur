import { CorporateHeader } from "@/components/layout/corporate-header";
import { Container } from "@/components/ui/container";
import { CardGridSkeleton } from "@/components/ui/card-grid-skeleton";

export default function LoadingRealisations() {
  return (
    <>
      <CorporateHeader />
      <main>
        <section className="bg-[#0f2e36] py-20 sm:py-28"><Container><div className="h-4 w-40 animate-pulse rounded bg-white/20" /><div className="mt-4 h-10 w-2/3 animate-pulse rounded bg-white/20" /></Container></section>
        <section className="py-16 sm:py-24"><Container><CardGridSkeleton /></Container></section>
      </main>
    </>
  );
}
