"use client";
import { ErrorState } from "@/components/admin/error-state";

export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <ErrorState
      title="Impossible de charger cette page"
      description={error.message || "L’API Django est peut-être indisponible. Vérifiez que le serveur backend tourne, puis réessayez."}
      onRetry={reset}
    />
  );
}
