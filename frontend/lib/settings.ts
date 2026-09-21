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
  hero_image_2: null,
  hero_image_3: null,
  hero_title: "",
  hero_text: "",
  hero_primary_button_label: "",
  hero_primary_button_url: "",
  hero_secondary_button_label: "",
  hero_secondary_button_url: "",
  stats_since_year: 2009,
  stat_1_value: 15,
  stat_1_suffix: "+",
  stat_1_label: "Années d'expérience",
  stat_1_description: "Expertise terrain éprouvée",
  stat_2_value: 500,
  stat_2_suffix: "+",
  stat_2_label: "Clients servis",
  stat_2_description: "Santé, industrie, hôtellerie",
  stat_3_value: 7,
  stat_3_suffix: "",
  stat_3_label: "Domaines d'intervention",
  stat_3_description: "Bionettoyage, décapage & plus",
  stat_4_value: 100,
  stat_4_suffix: "%",
  stat_4_label: "Produits biodégradables",
  stat_4_description: "FDS certifiées, conformité totale",
  stat_5_value: 24,
  stat_5_suffix: "/7",
  stat_5_label: "Disponibilité opérationnelle",
  stat_5_description: "Interventions d'urgence possibles",
  updated_at: "",
};

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!useApi) return fallbackSettings;
  try {
    const data = await apiFetch<SiteSettings>("/settings/", { next: { revalidate: 60 } });
    const merged = { ...fallbackSettings, ...data };
    const contactKeys = ["phone", "whatsapp", "email", "address"] as const;
    for (const key of contactKeys) {
      if (!String(merged[key] ?? "").trim()) merged[key] = fallbackSettings[key];
    }
    return merged;
  } catch {
    return fallbackSettings;
  }
}
