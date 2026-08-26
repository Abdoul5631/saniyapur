import { Container } from "@/components/ui/container";

export default function LoadingProduct() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="grid animate-pulse gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div className="aspect-square rounded-2xl bg-[#f1f6f6] sm:col-span-1" />
          <div>
            <div className="h-3 w-28 rounded bg-[#f1f6f6]" />
            <div className="mt-4 h-9 w-3/4 rounded bg-[#f1f6f6]" />
            <div className="mt-6 h-4 w-full rounded bg-[#f1f6f6]" />
            <div className="mt-2 h-4 w-5/6 rounded bg-[#f1f6f6]" />
            <div className="mt-2 h-4 w-2/3 rounded bg-[#f1f6f6]" />
          </div>
        </div>
      </Container>
    </section>
  );
}
