import { AdminForm } from "@/components/admin/admin-form";
import { AdminHeader } from "@/components/admin/admin-header";
import { ClientLogosManager } from "@/components/admin/client-logos-manager";
import { FormField, inputClassName } from "@/components/admin/form-field";
import { ImageUploader } from "@/components/admin/image-uploader";
import { adminFetch, normaliseAdminList } from "@/lib/admin/api";
import type { ClientLogo, SiteSettings } from "@/types/admin";
import { deleteClientLogo } from "./actions";

export default async function SiteSettingsPage() {
  const [settings, clientLogosData] = await Promise.all([
    adminFetch<SiteSettings>("/settings/"),
    adminFetch<ClientLogo[] | { results: ClientLogo[] }>("/client-logos/").catch(() => []),
  ]);
  const clientLogos = normaliseAdminList(clientLogosData);

  return (
    <div className="max-w-3xl">
      <AdminHeader title="Paramètres du site" description="Informations affichées sur le site public. La devise et le slogan officiels ne doivent être modifiés que sur demande explicite." />

      <div className="rounded-2xl border border-[#dce5df] bg-white p-6">
        <AdminForm djangoPath="/settings/" method="PATCH" submitLabel="Enregistrer les paramètres">
          <section>
            <h2 className="text-sm font-bold uppercase tracking-[.12em] text-[#a85c36]">Informations entreprise</h2>
            <div className="mt-4 grid gap-4">
              <FormField label="Nom de l’entreprise" htmlFor="company_name" required>
                <input id="company_name" name="company_name" required defaultValue={settings.company_name} className={inputClassName} />
              </FormField>
              <FormField label="Logo" htmlFor="logo">
                <ImageUploader id="logo" name="logo" currentUrl={settings.logo} label="logo" />
              </FormField>
              <FormField label="Devise officielle" htmlFor="tagline" hint="« PROPRETÉ SUR ORDONNANCE » — ne pas modifier sans demande explicite.">
                <input id="tagline" name="tagline" defaultValue={settings.tagline} className={inputClassName} />
              </FormField>
              <FormField label="Slogan général" htmlFor="slogan" hint="Ne pas modifier sans demande explicite.">
                <input id="slogan" name="slogan" defaultValue={settings.slogan} className={inputClassName} />
              </FormField>
              <FormField label="Description" htmlFor="description">
                <textarea id="description" name="description" rows={4} defaultValue={settings.description} className={inputClassName} />
              </FormField>
              <FormField label="Adresse" htmlFor="address">
                <input id="address" name="address" defaultValue={settings.address} className={inputClassName} />
              </FormField>
            </div>
          </section>

          <section className="border-t border-[#eef2ef] pt-6">
            <h2 className="text-sm font-bold uppercase tracking-[.12em] text-[#a85c36]">Contact</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <FormField label="Téléphone" htmlFor="phone"><input id="phone" name="phone" defaultValue={settings.phone} className={inputClassName} /></FormField>
              <FormField label="WhatsApp" htmlFor="whatsapp"><input id="whatsapp" name="whatsapp" defaultValue={settings.whatsapp} className={inputClassName} /></FormField>
              <FormField label="E-mail" htmlFor="email"><input id="email" name="email" type="email" defaultValue={settings.email} className={inputClassName} /></FormField>
              <FormField label="Horaires" htmlFor="opening_hours"><input id="opening_hours" name="opening_hours" defaultValue={settings.opening_hours} className={inputClassName} /></FormField>
            </div>
          </section>

          <section className="border-t border-[#eef2ef] pt-6">
            <h2 className="text-sm font-bold uppercase tracking-[.12em] text-[#a85c36]">Réseaux sociaux</h2>
            <p className="mt-1 text-xs text-[#8a9a92]">Laissez vide les réseaux non utilisés par l’entreprise.</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <FormField label="Facebook" htmlFor="facebook_url"><input id="facebook_url" name="facebook_url" type="url" defaultValue={settings.facebook_url} className={inputClassName} /></FormField>
              <FormField label="LinkedIn" htmlFor="linkedin_url"><input id="linkedin_url" name="linkedin_url" type="url" defaultValue={settings.linkedin_url} className={inputClassName} /></FormField>
              <FormField label="Instagram" htmlFor="instagram_url"><input id="instagram_url" name="instagram_url" type="url" defaultValue={settings.instagram_url} className={inputClassName} /></FormField>
              <FormField label="Lien WhatsApp" htmlFor="whatsapp_url" hint="Ex. https://wa.me/226…"><input id="whatsapp_url" name="whatsapp_url" type="url" defaultValue={settings.whatsapp_url} className={inputClassName} /></FormField>
            </div>
          </section>

          <section className="border-t border-[#eef2ef] pt-6">
            <h2 className="text-sm font-bold uppercase tracking-[.12em] text-[#a85c36]">Accueil — section Hero</h2>
            <div className="mt-4 grid gap-4">
              <p className="text-xs text-[#8a9a92]">
                Trois visuels plein écran, cadrés depuis le haut (visages visibles), rotation toutes les 5 secondes. Formats recommandés : paysage, 1920×1080.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                <FormField label="Image hero 1" htmlFor="hero_image">
                  <ImageUploader id="hero_image" name="hero_image" currentUrl={settings.hero_image} label="hero 1" />
                </FormField>
                <FormField label="Image hero 2" htmlFor="hero_image_2">
                  <ImageUploader id="hero_image_2" name="hero_image_2" currentUrl={settings.hero_image_2} label="hero 2" />
                </FormField>
                <FormField label="Image hero 3" htmlFor="hero_image_3">
                  <ImageUploader id="hero_image_3" name="hero_image_3" currentUrl={settings.hero_image_3} label="hero 3" />
                </FormField>
              </div>
              <FormField label="Titre Hero" htmlFor="hero_title"><input id="hero_title" name="hero_title" defaultValue={settings.hero_title} className={inputClassName} /></FormField>
              <FormField label="Texte Hero" htmlFor="hero_text"><textarea id="hero_text" name="hero_text" rows={3} defaultValue={settings.hero_text} className={inputClassName} /></FormField>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Bouton principal — libellé" htmlFor="hero_primary_button_label"><input id="hero_primary_button_label" name="hero_primary_button_label" defaultValue={settings.hero_primary_button_label} className={inputClassName} /></FormField>
                <FormField label="Bouton principal — lien" htmlFor="hero_primary_button_url"><input id="hero_primary_button_url" name="hero_primary_button_url" defaultValue={settings.hero_primary_button_url} className={inputClassName} /></FormField>
                <FormField label="Bouton secondaire — libellé" htmlFor="hero_secondary_button_label"><input id="hero_secondary_button_label" name="hero_secondary_button_label" defaultValue={settings.hero_secondary_button_label} className={inputClassName} /></FormField>
                <FormField label="Bouton secondaire — lien" htmlFor="hero_secondary_button_url"><input id="hero_secondary_button_url" name="hero_secondary_button_url" defaultValue={settings.hero_secondary_button_url} className={inputClassName} /></FormField>
              </div>
            </div>
          </section>

          <section className="border-t border-[#eef2ef] pt-6">
            <h2 className="text-sm font-bold uppercase tracking-[.12em] text-[#a85c36]">Accueil — SANIYAPUR en chiffres</h2>
            <p className="mt-1 text-xs text-[#8a9a92]">
              Ces indicateurs s’affichent sur la page d’accueil. Le suffixe permet d’écrire « + », « % » ou « /7 ».
            </p>
            <div className="mt-4 grid gap-4">
              <FormField label="Année de référence (citation du bas)" htmlFor="stats_since_year">
                <input id="stats_since_year" name="stats_since_year" type="number" min={1900} defaultValue={settings.stats_since_year} className={inputClassName} />
              </FormField>
              {[1, 2, 3, 4, 5].map((n) => {
                const valueKey = `stat_${n}_value` as const;
                const suffixKey = `stat_${n}_suffix` as const;
                const labelKey = `stat_${n}_label` as const;
                const descKey = `stat_${n}_description` as const;
                return (
                  <div key={n} className="grid gap-3 rounded-xl border border-[#eef2ef] p-4 sm:grid-cols-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#8a9a92] sm:col-span-4">Indicateur {n}</p>
                    <FormField label="Valeur" htmlFor={valueKey}>
                      <input id={valueKey} name={valueKey} type="number" min={0} defaultValue={String(settings[valueKey as keyof SiteSettings] ?? "")} className={inputClassName} />
                    </FormField>
                    <FormField label="Suffixe" htmlFor={suffixKey}>
                      <input id={suffixKey} name={suffixKey} defaultValue={String(settings[suffixKey as keyof SiteSettings] ?? "")} className={inputClassName} placeholder="+  %  /7" />
                    </FormField>
                    <FormField label="Libellé" htmlFor={labelKey}>
                      <input id={labelKey} name={labelKey} defaultValue={String(settings[labelKey as keyof SiteSettings] ?? "")} className={inputClassName} />
                    </FormField>
                    <FormField label="Sous-texte" htmlFor={descKey}>
                      <input id={descKey} name={descKey} defaultValue={String(settings[descKey as keyof SiteSettings] ?? "")} className={inputClassName} />
                    </FormField>
                  </div>
                );
              })}
            </div>
          </section>
        </AdminForm>
      </div>

      <div className="mt-8 rounded-2xl border border-[#dce5df] bg-white p-6">
        <h2 className="text-sm font-bold uppercase tracking-[.12em] text-[#a85c36]">
          Accueil — Ils nous font confiance
        </h2>
        <p className="mt-2 text-sm text-[#526259]">
          Logos clients réels uniquement. L’upload n’est pas obligatoire : sans fichier, la section reste invisible.
        </p>
        <div className="mt-5">
          <ClientLogosManager logos={clientLogos} deleteAction={deleteClientLogo} />
        </div>
      </div>
    </div>
  );
}
