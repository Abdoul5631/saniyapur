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

const description =
  "J&B SANIYAPUR SARL : maintenance immobilière, nettoyage industriel, bionettoyage et hygiène professionnelle. « Propreté sur ordonnance ». La propreté et l’hygiène qui protègent, la qualité qui rassure.";

export const metadata: Metadata = {
  title: {
    default: "J&B SANIYAPUR SARL | Hygiène, nettoyage et maintenance professionnels",
    template: "%s | J&B SANIYAPUR SARL",
  },
  description,
  applicationName: "J&B SANIYAPUR SARL",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "J&B SANIYAPUR SARL",
    title: "J&B SANIYAPUR SARL | Hygiène, nettoyage et maintenance professionnels",
    description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${plusJakartaSans.variable} ${inter.variable} ${playfair.variable} h-full antialiased selection:bg-[#a85c36] selection:text-white`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#f7f8f6] text-[#16232a] overflow-x-hidden">{children}</body>
    </html>
  );
}

