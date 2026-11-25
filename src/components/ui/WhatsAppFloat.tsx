"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { getStoredAttribution, trackWebEvent } from "@/lib/attribution";

export default function WhatsAppFloat() {
  const pathname = usePathname();

  // No interferir con la vista privada /inversion que maneja su propio layout
  if (pathname?.startsWith("/inversion")) {
    return null;
  }

  const handleWhatsAppClick = () => {
    const attrib = getStoredAttribution();
    const tags = [
      attrib.ref ? `Ref:${attrib.ref}` : "",
      attrib.utm_campaign ? `Camp:${attrib.utm_campaign}` : "",
    ]
      .filter(Boolean)
      .join(" ");

    const msg = `Hola Grupo Volia, vengo de www.grupovolia.com${
      tags ? ` (${tags})` : ""
    }. Me interesa conocer los planes ERP/IA y probar la Demo 24h.`;

    trackWebEvent("Contact", { contentName: "whatsapp_float_cta" });
    window.open(
      `https://wa.me/593983374133?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <button
      type="button"
      onClick={handleWhatsAppClick}
      aria-label="Chatear por WhatsApp con Grupo Volia"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2.5 px-4 py-3 rounded-full bg-brand-emerald hover:bg-brand-pine text-white font-bold text-xs shadow-xl border border-emerald-400/40 transition-all hover:scale-[1.03] active:scale-[0.98]"
    >
      <MessageCircle className="w-4 h-4 shrink-0" />
      <span className="hidden sm:inline">WhatsApp · Asesor IA</span>
    </button>
  );
}
