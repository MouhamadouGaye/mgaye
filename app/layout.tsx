import { Bricolage_Grotesque, Newsreader } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const sans = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Newsreader({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://mouhamadougaye.com"),
  title: "Mouhamadou Gaye | Ingénieur financier & logiciel",
  description: "Auto-entrepreneur, MBA en finance et développeur JavaScript, Python et Java. Conception d’outils financiers et métier pour les entreprises.",
  openGraph: { title: "Mouhamadou Gaye | Ingénieur financier & logiciel", description: "Portfolio de Mouhamadou Gaye", type: "website", images: ["/assets/mouhamadougaye.png"] },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
