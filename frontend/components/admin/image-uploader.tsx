"use client";
import { useState, type ChangeEvent } from "react";

export function ImageUploader({ id, name, currentUrl, label = "Image" }: { id: string; name: string; currentUrl?: string | null; label?: string }) {
  const [preview, setPreview] = useState<string | null>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setPreview(file ? URL.createObjectURL(file) : null);
  }

  const displayUrl = preview ?? currentUrl ?? null;

  return (
    <div>
      <div className="mb-3 aspect-video w-full max-w-xs overflow-hidden rounded-xl border border-dashed border-[#dce5df] bg-[#f7f8f6]">
        {displayUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- aperçu local (blob:) et médias Django cross-origin, non compatibles next/image ici.
          <img src={displayUrl} alt={`Aperçu — ${label}`} className="size-full object-cover" />
        ) : (
          <div className="grid size-full place-items-center text-xs text-[#8a9a92]">Aucune image</div>
        )}
      </div>
      <input id={id} name={name} type="file" accept="image/*" onChange={handleChange} className="block w-full text-sm text-[#526259] file:mr-3 file:rounded-lg file:border file:border-[#dce5df] file:bg-white file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[#a85c36] hover:file:border-[#a85c36]" />
      {currentUrl && <p className="mt-1 text-xs text-[#8a9a92]">Laissez vide pour conserver l’image actuelle.</p>}
    </div>
  );
}
