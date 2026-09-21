import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const siteUrl = "https://www.jb-saniyapur.com";
const description =
  "J&B SANIYAPUR SARL : maintenance immobilière, nettoyage industriel, bionettoyage hospitalier et hygiène professionnelle à Ouagadougou et Bobo-Dioulasso. « Propreté sur ordonnance ». La propreté et l'hygiène qui protègent, la qualité qui rassure.";

export const metadata: Metadata = {
  title: {
    default: "J&B SANIYAPUR SARL | Hygiène, nettoyage et maintenance professionnels au Burkina Faso",
    template: "%s | J&B SANIYAPUR SARL",
  },
  description,
  applicationName: "J&B SANIYAPUR SARL",
  authors: [{ name: "J&B SANIYAPUR SARL" }],
  keywords: [
    "nettoyage professionnel Ouagadougou",
    "bionettoyage hospitalier Burkina Faso",
    "maintenance immobilière Bobo-Dioulasso",
    "hygiène industrielle Burkina Faso",
    "SANIYAPUR",
    "désinfection entreprise",
    "décapage industriel",
    "gestion déchets industriels",
  ],
  robots: { index: true, follow: true },
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    url: siteUrl,
    locale: "fr_FR",
    siteName: "J&B SANIYAPUR SARL",
    title: "J&B SANIYAPUR SARL | Hygiène, nettoyage et maintenance professionnels",
    description,
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "J&B SANIYAPUR SARL — Propreté sur ordonnance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "J&B SANIYAPUR SARL | Propreté sur ordonnance",
    description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// JSON-LD — LocalBusiness schema.org pour référencement local Google
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": siteUrl,
  name: "J&B SANIYAPUR SARL",
  alternateName: "SANIYAPUR",
  description,
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`,
  image: `${siteUrl}/images/hero-industrial-cleaning.jpg`,
  telephone: "+22645331867",
  email: "info@jb-saniyapur.com",
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Ouagadougou",
      addressCountry: "BF",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Bobo-Dioulasso",
      addressCountry: "BF",
    },
  ],
  geo: {
    "@type": "GeoCoordinates",
    latitude: "12.3647",
    longitude: "-1.5338",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "07:30",
      closes: "18:00",
    },
  ],
  priceRange: "$$",
  areaServed: ["Ouagadougou", "Bobo-Dioulasso", "Burkina Faso"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services d'hygiène et maintenance",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bionettoyage & Désinfection" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Maintenance immobilière" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Décapage de plateaux techniques" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Gestion des déchets industriels" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Traitement des sanitaires" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Hygiène publique et environnementale" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Formation et placement de personnel" } },
    ],
  },
  sameAs: [],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${plusJakartaSans.variable} ${inter.variable} ${playfair.variable} h-full antialiased selection:bg-[#a85c36] selection:text-white`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#f7f8f6] text-[#16232a] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

