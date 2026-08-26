export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid animate-pulse gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-2xl border border-[#dce5df] bg-white">
          <div className="aspect-[4/3] bg-[#eaf2f2]" />
          <div className="p-6">
            <div className="h-3 w-24 rounded bg-[#eaf2f2]" />
            <div className="mt-4 h-5 w-3/4 rounded bg-[#eaf2f2]" />
            <div className="mt-3 h-4 w-full rounded bg-[#eaf2f2]" />
            <div className="mt-2 h-4 w-2/3 rounded bg-[#eaf2f2]" />
          </div>
        </div>
      ))}
    </div>
  );
}
