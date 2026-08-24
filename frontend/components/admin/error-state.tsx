export function ErrorState({ title = "Une erreur est survenue", description, onRetry }: { title?: string; description?: string; onRetry?: () => void }) {
  return (
    <div className="grid place-items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-6 py-16 text-center">
      <p className="text-sm font-semibold text-red-700">{title}</p>
      {description && <p className="max-w-md text-sm text-red-600">{description}</p>}
      {onRetry && <button type="button" onClick={onRetry} className="mt-2 rounded-full border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100">Réessayer</button>}
    </div>
  );
}
