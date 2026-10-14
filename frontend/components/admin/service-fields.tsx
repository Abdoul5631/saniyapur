import Link from "next/link";
import { FormField, inputClassName } from "@/components/admin/form-field";
import { ImageUploader } from "@/components/admin/image-uploader";
import { NameSlugFields } from "@/components/admin/name-slug-fields";
import { PublishedToggle } from "@/components/admin/published-toggle";
import { ServiceIconPicker } from "@/components/ui/service-icon";
import type { AdminSector, AdminService } from "@/types/admin";

export function ServiceFields({
  service,
  sectors = [],
}: {
  service?: AdminService;
  sectors?: AdminSector[];
}) {
  const selectedSectorIds = new Set(
    service?.sectors ?? service?.sector_details?.map((s) => s.id) ?? []
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
      <div className="grid content-start gap-4">
      <NameSlugFields nameLabel="Nom du service" nameDefault={service?.name} slugDefault={service?.slug} />

      <FormField label="Description" htmlFor="description" required hint="Description complète du service (la description courte sera générée automatiquement).">
        <textarea id="description" name="description" required rows={4} defaultValue={service?.description} className={inputClassName} />
      </FormField>

      <div className="grid gap-4 md:grid-cols-2">
      <FormField label="Prestations incluses" htmlFor="prestations" hint="Saisissez une prestation par ligne. Ces points seront affichés sur la page du service.">
        <textarea
          id="prestations"
          name="prestations"
          rows={6}
          placeholder={"- Nettoyage approfondi des sols et surfaces\n- Désinfection des points de contact\n- Traitement bactéricide et virucide"}
          defaultValue={service?.prestations}
          className={inputClassName}
        />
      </FormField>

      <FormField label="Avantages du service" htmlFor="avantages" hint="Points forts et bénéfices client. Un avantage par ligne.">
        <textarea
          id="avantages"
          name="avantages"
          rows={6}
          placeholder={"- Protocoles conformes aux normes d'hygiène\n- Produits certifiés et biodégradables\n- Équipe qualifiée et dédiée"}
          defaultValue={service?.avantages}
          className={inputClassName}
        />
      </FormField>
      </div>

      </div>

      <aside className="grid content-start gap-4 rounded-xl border border-[#eef2ef] bg-[#fbfcfb] p-4">
      <div className="grid gap-4">
        <FormField label="Image" htmlFor="image">
          <ImageUploader id="image" name="image" currentUrl={service?.image} label="service" />
        </FormField>
        <div className="grid gap-4">
          <FormField label="Icône" htmlFor="icon">
            <ServiceIconPicker defaultValue={service?.icon} />
          </FormField>
          <FormField label="Ordre d'affichage" htmlFor="order" hint="Les services sont triés du plus petit au plus grand.">
            <input id="order" name="order" type="number" min={0} defaultValue={service?.order ?? 0} className={inputClassName} />
          </FormField>
        </div>
      </div>

      <FormField label="Secteurs concernés" htmlFor="sectors" hint="Cochez les secteurs d'activité concernés par ce service.">
        {sectors.length ? (
          <div className="grid gap-2 rounded-xl border border-[#dce5df] bg-[#f7f8f6] p-4">
            {sectors.map((sector) => (
              <label key={sector.id} className="flex items-center gap-3 text-sm text-[#16232a] cursor-pointer hover:text-[#a85c36]">
                <input
                  type="checkbox"
                  name="sectors"
                  value={sector.id}
                  defaultChecked={selectedSectorIds.has(sector.id)}
                  className="size-4 rounded border-[#dce5df] text-[#a85c36] focus:ring-[#a85c36]"
                />
                <span className="font-medium">{sector.name}</span>
              </label>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#526259]">
            Aucun secteur créé pour le moment —{" "}
            <Link href="/admin/secteurs/nouveau" className="underline text-[#a85c36]">
              créez un secteur
            </Link>{" "}
            pour le lier.
          </p>
        )}
      </FormField>

      {/* ── Mise en avant & Publication ── */}
      <div className="flex flex-wrap gap-x-6 gap-y-3 items-center border-t border-[#dce5df] pt-4">
        <label className="flex items-center gap-2 text-sm font-medium text-[#16232a] cursor-pointer select-none">
          <input
            type="checkbox"
            name="featured"
            value="true"
            defaultChecked={service?.featured}
            className="h-4 w-4 rounded border-[#dce5df] accent-[#a85c36]"
          />
          Mis en avant
        </label>
        <PublishedToggle defaultChecked={service?.published} />
      </div>
      </aside>
    </div>
  );
}
