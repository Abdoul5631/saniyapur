import { FormField, inputClassName } from "@/components/admin/form-field";
import { ImageUploader } from "@/components/admin/image-uploader";
import { NameSlugFields } from "@/components/admin/name-slug-fields";
import { PublishedToggle } from "@/components/admin/published-toggle";
import { ServiceIconPicker } from "@/components/admin/service-icon";
import type { AdminService } from "@/types/admin";

export function ServiceFields({ service }: { service?: AdminService }) {
  return (
    <>
      <NameSlugFields nameLabel="Nom du service" nameDefault={service?.name} slugDefault={service?.slug} />
      <FormField label="Description courte" htmlFor="short_description" required>
        <input id="short_description" name="short_description" required maxLength={300} defaultValue={service?.short_description} className={inputClassName} />
      </FormField>
      <FormField label="Description" htmlFor="description" required>
        <textarea id="description" name="description" required rows={5} defaultValue={service?.description} className={inputClassName} />
      </FormField>
      <FormField label="Icône" htmlFor="icon">
        <ServiceIconPicker defaultValue={service?.icon} />
      </FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Image" htmlFor="image">
          <ImageUploader id="image" name="image" currentUrl={service?.image} label="service" />
        </FormField>
        <FormField label="Ordre d’affichage" htmlFor="order" hint="Les services sont triés du plus petit au plus grand.">
          <input id="order" name="order" type="number" defaultValue={service?.order ?? 0} className={inputClassName} />
        </FormField>
      </div>
      <PublishedToggle defaultChecked={service?.published} />
    </>
  );
}
