export type PublicBookingChannel =
  | "ventas@grupovolia.com"
  | "info@grupovolia.com"
  | "soporte@grupovolia.com";

export const PUBLIC_BOOKING_CHANNELS: Array<{
  email: PublicBookingChannel;
  label: string;
  description: string;
}> = [
  {
    email: "ventas@grupovolia.com",
    label: "Demo Comercial & Proformas (ventas@)",
    description: "Agenda de demos en vivo, planes Suite PYME / Corporativo y alianzas.",
  },
  {
    email: "info@grupovolia.com",
    label: "Información Corporativa (info@)",
    description: "Consultas gerenciales, convenios institucionales y LOPDP.",
  },
  {
    email: "soporte@grupovolia.com",
    label: "Soporte & Onboarding Técnico (soporte@)",
    description: "Carga de certificado .p12, migración CSV/Excel y capacitación.",
  },
];

/**
 * Construye un enlace directo de Google Calendar para agendar una reunión de 45 min
 * invitando al alias corporativo correspondiente de Grupo Volia (hora Ecuador UTC-5),
 * manteniendo completamente privado el correo personal del fundador.
 */
export function buildGoogleCalendarBookingUrl(params: {
  title: string;
  dateStr: string; // YYYY-MM-DD
  timeStr: string; // HH:mm (Ecuador UTC-5)
  channelEmail: PublicBookingChannel;
  details: string;
  durationMinutes?: number;
}): string {
  const [y, m, d] = (params.dateStr || "").split("-").map(Number);
  const [hh, mm] = (params.timeStr || "10:00").split(":").map(Number);
  const duration = params.durationMinutes ?? 45;

  // Ecuador UTC-5 -> sumar 5 horas para UTC Z
  const startUtc = new Date(
    Date.UTC(y || 2026, (m || 12) - 1, d || 1, (hh || 10) + 5, mm || 0, 0)
  );
  const endUtc = new Date(startUtc.getTime() + duration * 60_000);

  const fmt = (dt: Date) =>
    dt.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");

  return (
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${encodeURIComponent(params.title)}` +
    `&dates=${fmt(startUtc)}/${fmt(endUtc)}` +
    `&details=${encodeURIComponent(params.details)}` +
    `&location=${encodeURIComponent("Videollamada Google Meet · www.grupovolia.com")}` +
    `&add=${encodeURIComponent(params.channelEmail)}`
  );
}
