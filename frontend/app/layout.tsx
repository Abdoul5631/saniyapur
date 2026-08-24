import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description = "J&B SANIYAPUR SARL : maintenance immobilière, nettoyage industriel, bionettoyage et hygiène professionnelle. « Propreté sur ordonnance ». La propreté et l’hygiène qui protègent, la qualité qui rassure.";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
