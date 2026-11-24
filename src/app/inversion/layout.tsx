import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inversion-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-inversion-mono" });

export const metadata: Metadata = {
  title: "Propuesta Puente de Lanzamiento ($5,000) | Grupo Volia S.A.S.",
  description:
    "Presentación interactiva para círculo cercano: Software ERP & IA 100% en producción ($55k–$85k valor), retorno fijo +12% con pre-pago VIP desde Mayo y respaldo Micro1 Inc. (BoA).",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Grupo Volia · Propuesta Puente de Promoción Inicial ($5,000 USD)",
    description:
      "Video tour del sistema real, condiciones oficiales (+12% fijo y pre-pago VIP desde Mayo), modelo de pagaré EC/USA y respaldo Micro1 Inc. en EE.UU.",
    url: "https://www.grupovolia.com/inversion",
    siteName: "Grupo Volia",
    locale: "es_EC",
    type: "website",
  },
};

export default function InversionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${inter.variable} ${mono.variable}`}
      style={{ fontFamily: "var(--font-inversion-sans), 'Segoe UI', system-ui, sans-serif" }}
    >
      {children}
    </div>
  );
}
