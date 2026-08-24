/**
 * Types correspondant aux modèles Django exposés par l’API pour le panneau d’administration.
 * Nommés avec le préfixe "Admin" quand le nom nu (ex. "Service") est déjà pris par un type
 * du site public (voir types/company.ts) — évite toute confusion entre les deux couches.
 */

export type AdminService = {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  image: string | null;
  /** Clé d’icône parmi un jeu prédéfini (voir components/admin/service-icon.tsx). */
  icon: string;
  order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type AdminSector = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type AdminNews = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  image: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

/** Message reçu via le formulaire de contact public (modèle Django ContactRequest). */
export type ContactMessage = {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  /** true = déjà traité/lu. */
  processed: boolean;
  created_at: string;
};

export const QUOTE_STATUSES = ["new", "in_progress", "done", "archived"] as const;
export type QuoteStatus = (typeof QUOTE_STATUSES)[number];

export type QuoteRequest = {
  id: number;
  name: string;
  organisation: string;
  email: string;
  phone: string;
  service: string;
  sector: string;
  location: string;
  message: string;
  attachment: string | null;
  status: QuoteStatus;
  /** Notes internes — jamais exposées côté public. */
  notes: string;
  created_at: string;
};

export type SiteSettings = {
  id: number;
  company_name: string;
  logo: string | null;
  tagline: string;
  slogan: string;
  description: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  opening_hours: string;
  facebook_url: string;
  linkedin_url: string;
  instagram_url: string;
  whatsapp_url: string;
  hero_image: string | null;
  hero_title: string;
  hero_text: string;
  hero_primary_button_label: string;
  hero_primary_button_url: string;
  hero_secondary_button_label: string;
  hero_secondary_button_url: string;
  updated_at: string;
};

export const ADMIN_ROLES = ["admin", "editor", "commercial"] as const;
export type AdminRole = (typeof ADMIN_ROLES)[number];

export type AdminUser = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: AdminRole;
  is_active: boolean;
  date_joined: string;
  last_login: string | null;
};

export type DashboardStats = {
  products: number;
  services: number;
  realisations: number;
  news: number;
  messagesUnread: number;
  quotesTotal: number;
  quotesNew: number;
};
