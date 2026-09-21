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
  knownClients = [],
}: {
  realisation?: AdminRealisation;
  sectors: AdminSector[];
  services: AdminService[];
  knownClients?: string[];
}) {
  const mainImage =
    realisation?.images?.find((img) => img.type === "main") ??
    realisation?.images?.[0];
  const selectedServices = realisation?.services?.length
    ? realisation.services
    : realisation?.service
      ? [realisation.service]
      : [];

  return (
    <>
      {/* ── Informations principales ── */}
      <NameSlugFields nameField="title" nameLabel="Titre" nameDefault={realisation?.title} slugDefault={realisation?.slug} />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Nom du client / entreprise"
          htmlFor="client"
          hint="Utilisez exactement le même nom pour chaque chantier de cette entreprise. Facultatif si le client ne souhaite pas être cité."
        >
          <input
            id="client"
            name="client"
            list="known-clients"
            defaultValue={realisation?.client}
            className={inputClassName}
            autoComplete="organization"
          />
          {knownClients.length > 0 ? (
            <datalist id="known-clients">
              {knownClients.map((name) => (
                <option key={name} value={name} />
              ))}
            </datalist>
          ) : null}
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
        <FormField
          label="Services réalisés"
          htmlFor="services"
          hint={
            services.length ? (
              <>
                Cochez tous les services effectués sur ce chantier.{" "}
                <Link href="/admin/services/nouveau" className="underline">
                  Créer un nouveau service
                </Link>
              </>
            ) : undefined
          }
        >
          {services.length ? (
            <div id="services" className="grid gap-2 rounded-xl border border-[#dce5df] bg-white p-3 sm:grid-cols-2">
              {services.map((service) => {
                const selected = selectedServices.includes(service.name);
                return (
                  <label key={service.id} className="flex cursor-pointer items-start gap-2 text-sm text-[#16232a]">
                    <input
                      type="checkbox"
                      name="services"
                      value={service.name}
                      defaultChecked={selected}
                      className="mt-0.5 h-4 w-4 rounded border-[#dce5df] accent-[#a85c36]"
                    />
                    <span>{service.name}</span>
                  </label>
                );
              })}
            </div>
          ) : (
            <p className="text-xs text-red-600">
              Aucun service disponible —{" "}
              <Link href="/admin/services/nouveau" className="underline">
                créez-en un
              </Link>
              .
            </p>
          )}
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
