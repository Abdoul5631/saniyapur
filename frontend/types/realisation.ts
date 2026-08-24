export type RealisationImageType = "main" | "before" | "after" | "gallery";

export type RealisationImage = {
  id: number;
  realisation: number;
  image: string;
  caption: string;
  type: RealisationImageType;
  order: number;
};

export type Realisation = {
  id: number;
  title: string;
  slug: string;
  description: string;
  client: string;
  location: string;
  sector: string;
  /** Nom du service réalisé (référence Service.name côté back-end) — optionnel. */
  service: string | null;
  date: string;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
  images: RealisationImage[];
};

export type PaginatedResponse<T> = { count?: number; next?: string | null; previous?: string | null; results: T[] };
