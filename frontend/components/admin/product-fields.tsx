import { FormField, inputClassName } from "@/components/admin/form-field";
import { ImageUploader } from "@/components/admin/image-uploader";
import { FileUploader } from "@/components/admin/file-uploader";
import { NameSlugFields } from "@/components/admin/name-slug-fields";
import { PublishedToggle } from "@/components/admin/published-toggle";
import type { AdminProduct } from "@/types/admin";

export function ProductFields({ product }: { product?: AdminProduct }) {
  return (
    <>
      {/* ── Informations du produit ── */}
      <NameSlugFields
        nameLabel="Nom du produit"
        nameDefault={product?.name}
        slugDefault={product?.slug}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Référence" htmlFor="reference" hint="Référence fabricant ou interne (facultatif).">
          <input id="reference" name="reference" defaultValue={product?.reference} className={inputClassName} />
        </FormField>
        <FormField label="Catégorie" htmlFor="category" required>
          <input id="category" name="category" required defaultValue={product?.category} className={inputClassName} />
        </FormField>
      </div>

      <FormField label="Description" htmlFor="description" required hint="Description complète du produit.">
        <textarea id="description" name="description" required rows={5} defaultValue={product?.description} className={inputClassName} />
      </FormField>

      <FormField label="Utilisation" htmlFor="usage" hint="Domaines et modes d'utilisation recommandés.">
        <textarea id="usage" name="usage" rows={4} defaultValue={product?.usage} className={inputClassName} />
      </FormField>

      <FormField label="Caractéristiques techniques" htmlFor="characteristics" hint="Une caractéristique par ligne (ex. pH : 7.5).">
        <textarea id="characteristics" name="characteristics" rows={4} defaultValue={product?.characteristics} className={inputClassName} />
      </FormField>

      {/* ── Médias ── */}
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

      {/* ── Mise en avant & Publication ── */}
      <div className="flex flex-wrap gap-6 items-center border-t border-[#dce5df] pt-4">
        <label className="flex items-center gap-2 text-sm font-medium text-[#16232a] cursor-pointer select-none">
          <input
            type="checkbox"
            name="featured"
            value="true"
            defaultChecked={product?.featured}
            className="h-4 w-4 rounded border-[#dce5df] accent-[#a85c36]"
          />
          Mis en avant
        </label>
        <PublishedToggle defaultChecked={product?.published} />
      </div>
    </>
  );
}
