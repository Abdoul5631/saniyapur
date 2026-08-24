import Link from "next/link";
import { FormField, inputClassName } from "@/components/admin/form-field";
import { NameSlugFields } from "@/components/admin/name-slug-fields";
import { PublishedToggle } from "@/components/admin/published-toggle";
import type { Realisation } from "@/types/realisation";
import type { AdminSector, AdminService } from "@/types/admin";

export function RealisationFields({ realisation, sectors, services }: { realisation?: Realisation; sectors: AdminSector[]; services: AdminService[] }) {
  return (
    <>
      <NameSlugFields nameField="title" nameLabel="Titre" nameDefault={realisation?.title} slugDefault={realisation?.slug} />
      <FormField label="Description" htmlFor="description" required>
        <textarea id="description" name="description" required rows={5} defaultValue={realisation?.description} className={inputClassName} />
      </FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Client" htmlFor="client" hint="Uniquement des clients réels, jamais inventés.">
          <input id="client" name="client" defaultValue={realisation?.client} className={inputClassName} />
        </FormField>
        <FormField label="Localisation" htmlFor="location">
          <input id="location" name="location" defaultValue={realisation?.location} className={inputClassName} />
        </FormField>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Secteur" htmlFor="sector" required>
          <select id="sector" name="sector" required defaultValue={realisation?.sector ?? ""} className={inputClassName}>
            <option value="" disabled>Choisir un secteur</option>
            {sectors.map((sector) => <option key={sector.id} value={sector.name}>{sector.name}</option>)}
          </select>
          {!sectors.length && <p className="mt-1 text-xs text-red-600">Aucun secteur disponible — <Link href="/admin/secteurs/nouveau" className="underline">créez-en un</Link> avant d’enregistrer.</p>}
        </FormField>
        <FormField label="Service réalisé" htmlFor="service" hint="Facultatif — parmi les services publiés.">
          <select id="service" name="service" defaultValue={realisation?.service ?? ""} className={inputClassName}>
            <option value="">Non précisé</option>
            {services.map((service) => <option key={service.id} value={service.name}>{service.name}</option>)}
          </select>
        </FormField>
      </div>
      <FormField label="Date" htmlFor="date" required>
        <input id="date" name="date" type="date" required defaultValue={realisation?.date} className={`${inputClassName} sm:w-48`} />
      </FormField>
      <label className="flex items-center gap-3 text-sm font-medium text-[#16232a]">
        <input type="checkbox" name="featured" value="true" defaultChecked={realisation?.featured} className="size-4 rounded border-[#dce5df] text-[#a85c36] focus:ring-[#a85c36]" />
        Mettre en avant (réalisation phare)
      </label>
      <PublishedToggle defaultChecked={realisation?.published} />
    </>
  );
}
