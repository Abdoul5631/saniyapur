import { Container } from "@/components/ui/container";

export default function LoadingRealisation() {
  return (
    <>
      <section className="bg-[#0f2e36] py-16 sm:py-20">
        <Container>
          <div className="h-4 w-40 animate-pulse rounded bg-white/20" />
          <div className="mt-4 h-10 w-2/3 animate-pulse rounded bg-white/20" />
        </Container>
      </section>
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid animate-pulse gap-12 lg:grid-cols-[1fr_.45fr]">
            <div>
              <div className="aspect-video rounded-2xl bg-[#f1f6f6]" />
              <div className="mt-8 h-4 w-full rounded bg-[#f1f6f6]" />
              <div className="mt-2 h-4 w-5/6 rounded bg-[#f1f6f6]" />
            </div>
            <div className="h-64 rounded-2xl bg-[#f1f6f6]" />
          </div>
        </Container>
      </section>
    </>
  );
}
