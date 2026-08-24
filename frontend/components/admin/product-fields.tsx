import { FormField, inputClassName } from "@/components/admin/form-field";
import { ImageUploader } from "@/components/admin/image-uploader";
import { FileUploader } from "@/components/admin/file-uploader";
import { NameSlugFields } from "@/components/admin/name-slug-fields";
import { PublishedToggle } from "@/components/admin/published-toggle";
import type { Product } from "@/types/product";

export function ProductFields({ product }: { product?: Product }) {
  return (
    <>
      <NameSlugFields nameLabel="Nom du produit" nameDefault={product?.name} slugDefault={product?.slug} />
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Référence" htmlFor="reference" hint="Référence interne ou fournisseur (facultatif).">
          <input id="reference" name="reference" defaultValue={product?.reference} className={inputClassName} />
        </FormField>
        <FormField label="Catégorie" htmlFor="category" required>
          <input id="category" name="category" required defaultValue={product?.category} className={inputClassName} />
        </FormField>
      </div>
      <FormField label="Description courte" htmlFor="short_description" required>
        <input id="short_description" name="short_description" required maxLength={300} defaultValue={product?.short_description} className={inputClassName} />
      </FormField>
      <FormField label="Description" htmlFor="description" required>
        <textarea id="description" name="description" required rows={5} defaultValue={product?.description} className={inputClassName} />
      </FormField>
      <FormField label="Utilisation" htmlFor="usage" required>
        <textarea id="usage" name="usage" required rows={4} defaultValue={product?.usage} className={inputClassName} />
      </FormField>
      <FormField label="Caractéristiques" htmlFor="characteristics" hint="Une caractéristique par ligne.">
        <textarea id="characteristics" name="characteristics" rows={4} defaultValue={product?.characteristics} className={inputClassName} />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Image principale" htmlFor="image">
          <ImageUploader id="image" name="image" currentUrl={product?.image} label="produit" />
        </FormField>
        <div className="grid gap-4">
          <FormField label="Fiche technique (PDF)" htmlFor="technical_sheet">
            <FileUploader id="technical_sheet" name="technical_sheet" currentUrl={product?.technical_sheet} currentLabel="Fiche technique" accept="application/pdf" />
          </FormField>
          <FormField label="Fiche de sécurité (PDF)" htmlFor="safety_sheet">
            <FileUploader id="safety_sheet" name="safety_sheet" currentUrl={product?.safety_sheet} currentLabel="Fiche de sécurité" accept="application/pdf" />
          </FormField>
        </div>
      </div>

      <PublishedToggle defaultChecked={product?.published} />
    </>
  );
}
