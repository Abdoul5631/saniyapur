import { company } from "@/data/company";
import { apiFetch } from "@/lib/api";
import type { SiteSettings } from "@/types/admin";

const useApi = Boolean(process.env.NEXT_PUBLIC_API_URL);

export const fallbackSettings: SiteSettings = {
  id: 1,
  company_name: company.name,
  logo: "/images/logo.png",
  tagline: "PROPRETÉ SUR ORDONNANCE",
  slogan: company.slogan,
  description: "",
  address: company.contact.locations,
  phone: company.contact.phone,
  whatsapp: company.contact.whatsapp,
  email: company.contact.email,
  opening_hours: "",
  facebook_url: "",
  linkedin_url: "",
  instagram_url: "",
  whatsapp_url: `https://wa.me/${company.contact.whatsapp.replace(/\D/g, "")}`,
  hero_image: null,
  hero_title: "",
  hero_text: "",
  hero_primary_button_label: "",
  hero_primary_button_url: "",
  hero_secondary_button_label: "",
  hero_secondary_button_url: "",
  updated_at: "",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!useApi) return fallbackSettings;
  try {
    return await apiFetch<SiteSettings>("/settings/", { next: { revalidate: 60 } });
  } catch {
    return fallbackSettings;
  }
}
