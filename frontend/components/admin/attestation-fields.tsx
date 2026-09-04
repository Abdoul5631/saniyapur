import { FormField, inputClassName } from "@/components/admin/form-field";
import { ImageUploader } from "@/components/admin/image-uploader";
import { PublishedToggle } from "@/components/admin/published-toggle";
import type { Attestation } from "@/types/admin";

const TYPE_OPTIONS = [
  { value: "attestation", label: "Attestation" },
  { value: "certificate", label: "Certificat" },
  { value: "reference", label: "Référence" },
  { value: "other", label: "Autre" },
];

export function AttestationFields({ attestation }: { attestation?: Attestation }) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Titre *" htmlFor="title" required>
          <input
            id="title"
            name="title"
            required
            defaultValue={attestation?.title}
            placeholder="Ex. Attestation de bonne exécution CHU de Pala"
            className={inputClassName}
          />
        </FormField>
        <FormField label="Client / Organisme *" htmlFor="client_organisation" required>
          <input
            id="client_organisation"
            name="client_organisation"
            required
            defaultValue={attestation?.client_organisation}
            placeholder="Ex. Centre Hospitalier Universitaire de Pala"
            className={inputClassName}
          />
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Type *" htmlFor="type" required>
          <select
            id="type"
            name="type"
            defaultValue={attestation?.type ?? "attestation"}
            className={inputClassName}
          >
            {TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Date / Période" htmlFor="date" hint="Ex. 2025, Depuis 2003, Mai 2024">
          <input
            id="date"
            name="date"
            defaultValue={attestation?.date}
            placeholder="Ex. 2025"
            className={inputClassName}
          />
        </FormField>
      </div>

      <FormField label="Description" htmlFor="description" hint="Contexte ou détails des prestations et réalisations attestées.">
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={attestation?.description}
          className={inputClassName}
        />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Image d'aperçu du document" htmlFor="image" hint="Image numérisée ou visualisatrice de l'attestation.">
          <ImageUploader
            id="image"
            name="image"
            currentUrl={attestation?.image}
            label="attestation"
          />
        </FormField>

        <FormField label="Document PDF original (facultatif)" htmlFor="pdf_file" hint="Fichier PDF téléchargeable.">
          <input
            id="pdf_file"
            name="pdf_file"
            type="file"
            accept=".pdf"
            className={inputClassName}
          />
          {attestation?.pdf_file && (
            <p className="mt-2 text-xs text-[#526259]">
              Fichier actuel :{" "}
              <a
                href={attestation.pdf_file}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#a85c36] underline"
              >
                Télécharger le PDF ↗
              </a>
            </p>
          )}
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Ordre d'affichage" htmlFor="order" hint="1 = premier dans la liste.">
          <input
            id="order"
            name="order"
            type="number"
            min={0}
            defaultValue={attestation?.order ?? 0}
            className={inputClassName}
          />
        </FormField>
        <FormField label="Mis en avant" htmlFor="featured" hint="Afficher dans les sections phares.">
          <div className="flex items-center gap-2 pt-2">
            <input
              id="featured"
              name="featured"
              type="checkbox"
              defaultChecked={attestation?.featured ?? false}
              className="size-4 rounded border-[#dce5df] text-[#a85c36] focus:ring-[#a85c36]"
            />
            <label htmlFor="featured" className="text-xs font-semibold text-[#16232a]">
              Mettre en avant cette attestation
            </label>
          </div>
        </FormField>
      </div>

      <div className="border-t border-[#dce5df] pt-4">
        <PublishedToggle defaultChecked={attestation?.published ?? true} />
      </div>
    </>
  );
}
