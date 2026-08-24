export function LoadingState({ label = "Chargement…" }: { label?: string }) {
  return (
    <div className="grid place-items-center gap-3 px-6 py-16 text-center">
      <span className="size-6 animate-spin rounded-full border-2 border-[#dce5df] border-t-[#a85c36]" aria-hidden="true" />
      <p className="text-sm text-[#526259]">{label}</p>
    </div>
  );
}
