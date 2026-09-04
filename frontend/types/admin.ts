import type { RealisationImage } from "./realisation";

/**
 * Types correspondant aux modèles Django exposés par l'API pour le panneau d'administration.
 * Nommés avec le préfixe "Admin" quand le nom nu (ex. "Service") est déjà pris par un type
 * du site public (voir types/company.ts) — évite toute confusion entre les deux couches.
 */

export type AdminService = {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  prestations?: string;
  avantages?: string;
  sectors?: number[];
  sector_details?: AdminSector[];
  image: string | null;
  /** Clé d'icône parmi un jeu prédéfini (voir components/admin/service-icon.tsx). */
  icon: string;
  order: number;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type AdminSector = {
  id: number;
  name: string;
  slug: string;
  description: string;
  besoins_specifiques?: string;
  image: string | null;
  order: number;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type AdminProduct = {
  id: number;
  name: string;
  slug: string;
  reference: string;
  category: string;
  short_description: string;
  description: string;
  usage: string;
  characteristics: string;
  image: string | null;
  technical_sheet: string | null;
  safety_sheet: string | null;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type AdminRealisation = {
  id: number;
  title: string;
  slug: string;
  description: string;
  client: string;
  location: string;
  sector: string;
  service: string | null;
  date: string;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
  images?: RealisationImage[];
};

export type AdminNews = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  image: string | null;
  featured: boolean;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

/** Message reçu via le formulaire de contact public (modèle Django ContactRequest). */
export const CONTACT_STATUSES = ["unread", "read", "done"] as const;
export type ContactStatus = (typeof CONTACT_STATUSES)[number];

export type ContactMessage = {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  whatsapp: string;
  subject: string;
  message: string;
  status: ContactStatus;
  /** Rétrocompatibilité avec l'ancien champ processed. */
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
  whatsapp: string;
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

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  phone?: string;
  photo: string | null;
  bio: string;
  order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
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

export type AboutSettings = {
  id: number;
  presentation_title: string;
  presentation_devise?: string;
  presentation_content: string;
  presentation_legal_info?: string;
  presentation_image: string | null;
  team_presentation_title?: string;
  team_presentation_content?: string;
  operational_team_title?: string;
  operational_team_content?: string;
  social_commitment_title?: string;
  social_commitment_content?: string;
  bionettoyage_title?: string;
  bionettoyage_content?: string;
  competencies_title?: string;
  competencies_content?: string;
  mission_title: string;
  mission_content: string;
  objectives_title?: string;
  objectives_content?: string;
  specific_objectives_content?: string;
  bionettoyage_advantages_content?: string;
  vision_title: string;
  vision_content: string;
  vision_paradox_content?: string;
  vision_execution_content?: string;
  vision_impact_content?: string;
  international_expertise_title?: string;
  international_expertise_content?: string;
  international_expertise_image?: string | null;
  references_title?: string;
  references_content?: string;
  engagements_title: string;
  engagements_content: string;
  dg_name: string;
  dg_role: string;
  dg_photo: string | null;
  dg_message: string;
  updated_at: string;
};

export const ADMIN_ROLES = ["admin", "editor", "commercial"] as const;
export type AdminRole = (typeof ADMIN_ROLES)[number];

export const ATTESTATION_TYPES = ["attestation", "certificate", "reference", "other"] as const;
export type AttestationType = (typeof ATTESTATION_TYPES)[number];

export type Attestation = {
  id: number;
  title: string;
  slug: string;
  client_organisation: string;
  type: AttestationType;
  type_display?: string;
  date: string;
  description: string;
  image: string | null;
  pdf_file: string | null;
  order: number;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
};

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
