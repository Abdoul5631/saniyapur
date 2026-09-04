export type ProductImage = { id: number; product?: number; image: string; caption?: string; order: number };

export type Product = {
  id: number;
  name: string;
  slug: string;
  reference: string;
  category: string;
  short_description: string;
  description: string;
  usage: string;
  /** Une caractéristique par ligne (texte libre côté back-end). */
  characteristics: string;
  image: string | null;
  technical_sheet: string | null;
  safety_sheet: string | null;
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
  gallery?: ProductImage[];
};
