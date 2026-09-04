import { FormField, inputClassName } from "@/components/admin/form-field";
import { ImageUploader } from "@/components/admin/image-uploader";
import { NameSlugFields } from "@/components/admin/name-slug-fields";
import { PublishedToggle } from "@/components/admin/published-toggle";
import type { AdminSector } from "@/types/admin";

export function SectorFields({ sector }: { sector?: AdminSector }) {
  return (
    <>
      <NameSlugFields nameLabel="Nom du secteur" nameDefault={sector?.name} slugDefault={sector?.slug} />

      <FormField label="Description" htmlFor="description" required>
        <textarea id="description" name="description" required rows={4} defaultValue={sector?.description} className={inputClassName} />
      </FormField>

      <FormField
        label="Besoins spécifiques & Exigences"
        htmlFor="besoins_specifiques"
        hint="Exigences techniques ou sanitaires propres à ce type d’environnement (supporte les listes avec tirets -)."
      >
        <textarea
          id="besoins_specifiques"
          name="besoins_specifiques"
          rows={4}
          defaultValue={sector?.besoins_specifiques}
          className={inputClassName}
        />
      </FormField>

      <FormField label="Image" htmlFor="image">
        <ImageUploader id="image" name="image" currentUrl={sector?.image} label="secteur" />
      </FormField>

      <FormField label="Ordre d'affichage" htmlFor="order" hint="Les secteurs sont triés par ordre croissant.">
        <input id="order" name="order" type="number" min={0} defaultValue={sector?.order ?? 0} className={inputClassName} />
      </FormField>

      {/* ── Mise en avant & Publication ── */}
      <div className="flex flex-wrap gap-6 items-center border-t border-[#dce5df] pt-4">
        <label className="flex items-center gap-2 text-sm font-medium text-[#16232a] cursor-pointer select-none">
          <input
            type="checkbox"
            name="featured"
            value="true"
            defaultChecked={sector?.featured}
            className="h-4 w-4 rounded border-[#dce5df] accent-[#a85c36]"
          />
          Mis en avant
        </label>
        <PublishedToggle defaultChecked={sector?.published} />
      </div>
    </>
  );
}
