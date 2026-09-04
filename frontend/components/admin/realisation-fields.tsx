import Link from "next/link";
import { FormField, inputClassName } from "@/components/admin/form-field";
import { ImageUploader } from "@/components/admin/image-uploader";
import { NameSlugFields } from "@/components/admin/name-slug-fields";
import { PublishedToggle } from "@/components/admin/published-toggle";
import type { AdminRealisation, AdminSector, AdminService } from "@/types/admin";

export function RealisationFields({
  realisation,
  sectors,
  services,
}: {
  realisation?: AdminRealisation;
  sectors: AdminSector[];
  services: AdminService[];
}) {
  const mainImage =
    realisation?.images?.find((img) => img.type === "main") ??
    realisation?.images?.[0];

  return (
    <>
      {/* ── Informations principales ── */}
      <NameSlugFields nameField="title" nameLabel="Titre" nameDefault={realisation?.title} slugDefault={realisation?.slug} />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Nom du client" htmlFor="client" hint="Facultatif — uniquement si le client l'autorise.">
          <input id="client" name="client" defaultValue={realisation?.client} className={inputClassName} />
        </FormField>
        <FormField label="Localisation" htmlFor="location" hint="Ville ou région de l'intervention.">
          <input id="location" name="location" defaultValue={realisation?.location} className={inputClassName} />
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Secteur" htmlFor="sector" required>
          <select id="sector" name="sector" required defaultValue={realisation?.sector ?? ""} className={inputClassName}>
            <option value="" disabled>Choisir un secteur</option>
            {sectors.map((sector) => (
              <option key={sector.id} value={sector.name}>{sector.name}</option>
            ))}
          </select>
          {!sectors.length && (
            <p className="mt-1 text-xs text-red-600">
              Aucun secteur disponible —{" "}
              <Link href="/admin/secteurs/nouveau" className="underline">créez-en un</Link>.
            </p>
          )}
        </FormField>
        <FormField label="Service réalisé" htmlFor="service" hint="Service J&B SANIYAPUR effectué lors de cette réalisation.">
          <select id="service" name="service" defaultValue={realisation?.service ?? ""} className={inputClassName}>
            <option value="">Non précisé</option>
            {services.map((service) => (
              <option key={service.id} value={service.name}>{service.name}</option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField label="Description" htmlFor="description" required hint="Décrivez le contexte, les travaux réalisés et les résultats obtenus.">
        <textarea id="description" name="description" required rows={6} defaultValue={realisation?.description} className={inputClassName} />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Date d'intervention" htmlFor="date" required>
          <input id="date" name="date" type="date" required defaultValue={realisation?.date} className={inputClassName} />
        </FormField>
        <FormField label="Image principale (couverture)" htmlFor="image" hint="Image principale affichée sur la carte et la fiche du projet.">
          <ImageUploader id="image" name="image" currentUrl={mainImage?.image} label="réalisation" />
        </FormField>
      </div>

      {/* ── Mise en avant & Publication ── */}
      <div className="flex flex-wrap gap-6 items-center border-t border-[#dce5df] pt-4">
        <label className="flex items-center gap-2 text-sm font-medium text-[#16232a] cursor-pointer select-none">
          <input
            type="checkbox"
            name="featured"
            value="true"
            defaultChecked={realisation?.featured}
            className="h-4 w-4 rounded border-[#dce5df] accent-[#a85c36]"
          />
          Mise en avant (réalisation phare)
        </label>
        <PublishedToggle defaultChecked={realisation?.published} />
      </div>
    </>
  );
}
