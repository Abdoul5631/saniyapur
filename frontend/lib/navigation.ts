export const mainNav = [
  ["Accueil", "/"],
  ["À propos", "/a-propos"],
  ["Services", "/services"],
  ["Secteurs", "/secteurs"],
  ["Réalisations", "/realisations"],
  ["Produits", "/produits"],
  ["Actualités", "/actualites"],
  ["Contact", "/contact"],
] as const;

export const quoteHref = "/devis";

export function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
