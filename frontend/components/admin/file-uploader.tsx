"use client";
import { useState } from "react";

export function FileUploader({ id, name, currentUrl, currentLabel = "Fichier actuel", accept }: { id: string; name: string; currentUrl?: string | null; currentLabel?: string; accept?: string }) {
  const [fileName, setFileName] = useState<string | null>(null);
  return (
    <div>
      {currentUrl && !fileName && (
        <a href={currentUrl} target="_blank" rel="noreferrer" className="mb-2 inline-flex items-center gap-1.5 text-sm font-medium text-[#a85c36] hover:underline">
          📄 {currentLabel} — voir le fichier actuel
        </a>
      )}
      <input
        id={id}
        name={name}
        type="file"
        accept={accept}
        onChange={(event) => setFileName(event.target.files?.[0]?.name ?? null)}
        className="block w-full text-sm text-[#526259] file:mr-3 file:rounded-lg file:border file:border-[#dce5df] file:bg-white file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[#a85c36] hover:file:border-[#a85c36]"
      />
      {fileName && <p className="mt-1 text-xs text-[#526259]">Nouveau fichier sélectionné : {fileName}</p>}
      {currentUrl && <p className="mt-1 text-xs text-[#8a9a92]">Laissez vide pour conserver le fichier actuel.</p>}
    </div>
  );
}
