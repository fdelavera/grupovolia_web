import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Inter({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.grupovolia.com"),
  title: {
    default:
      "Grupo Volia | Ingeniería Agéntica, ERP/SRI, Inventarios, Oráculos Cuantitativos & Producción IA",
    template: "%s | Grupo Volia",
  },
  description:
    "Grupo Volia — Infraestructura Empresarial para Ecuador, Latinoamérica y EE.UU.: Facturación Electrónica SRI con Retenciones a Proveedores, Manejo de Inventario conectado por API POS, Finanzas NIIF, CRM Automatizado, Copiloto IA Interno personalizable, Oráculos Cuantitativos VWAP y Producción Audiovisual IA.",
  keywords: [
    "Grupo Volia",
    "Facturación Electrónica SRI IA",
    "Retención IVA Proveedores SRI",
    "Manejo de Inventario API Ecuador",
    "ERP PYMEs Ecuador",
    "Software Contable NIIF Ecuador",
    "CRM con Inteligencia Artificial",
    "Algoritmos Cuantitativos Ecuador",
    "Virtual Staging IA",
    "Francisco de la Vera",
  ],
  authors: [{ name: "Grupo Volia · Francisco de la Vera", url: "https://www.grupovolia.com" }],
  creator: "Grupo Volia",
  publisher: "Grupo Volia",
  icons: {
    icon: [{ url: "/assets/branding/logo_grupovolia_isotipo_clean.png", type: "image/png" }],
    shortcut: "/assets/branding/logo_grupovolia_isotipo_clean.png",
    apple: "/assets/branding/logo_grupovolia_isotipo_clean.png",
  },
  openGraph: {
    title: "Grupo Volia | Infraestructura Empresarial, ERP/SRI, Inventarios & Oráculos Cuantitativos",
    description:
      "Tecnología empresarial, inventarios conectados y producción audiovisual con estándares internacionales para Ecuador, Latinoamérica y EE.UU.",
    url: "https://www.grupovolia.com",
    siteName: "Grupo Volia",
    locale: "es_EC",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body
        className="font-sans bg-white text-swiss-pine min-h-screen antialiased selection:bg-brand-emerald selection:text-white"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
