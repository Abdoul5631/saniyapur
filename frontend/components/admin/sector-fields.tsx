import { FormField, inputClassName } from "@/components/admin/form-field";
import { ImageUploader } from "@/components/admin/image-uploader";
import { NameSlugFields } from "@/components/admin/name-slug-fields";
import { PublishedToggle } from "@/components/admin/published-toggle";
import type { AdminSector } from "@/types/admin";

export function SectorFields({ sector }: { sector?: AdminSector }) {
  return (
    <>
      <NameSlugFields nameLabel="Nom du secteur" nameDefault={sector?.name} slugDefault={sector?.slug} />
      <FormField label="Description" htmlFor="description">
        <textarea id="description" name="description" rows={4} defaultValue={sector?.description} className={inputClassName} />
      </FormField>
      <FormField label="Image" htmlFor="image">
        <ImageUploader id="image" name="image" currentUrl={sector?.image} label="secteur" />
      </FormField>
      <PublishedToggle defaultChecked={sector?.published} />
    </>
  );
}
