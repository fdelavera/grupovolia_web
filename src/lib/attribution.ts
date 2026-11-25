export interface AttributionData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  ref?: string;
  fbclid?: string;
  gclid?: string;
  ttclid?: string;
  landing_path?: string;
  ts?: string;
}

const STORAGE_KEY = "gv_attrib_v1";
const COOKIE_NAME = "gv_attrib";
const ATTRIB_KEYS: Array<keyof AttributionData> = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "ref",
  "fbclid",
  "gclid",
  "ttclid",
];

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    ttq?: {
      track?: (event: string, data?: Record<string, unknown>) => void;
    };
  }
}

export function getStoredAttribution(): AttributionData {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as AttributionData;
    }
    const cookieMatch = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${COOKIE_NAME}=`));
    if (cookieMatch) {
      return JSON.parse(decodeURIComponent(cookieMatch.split("=")[1] || "{}")) as AttributionData;
    }
  } catch {
    // Storage bloqueado
  }
  return {};
}

export function captureAttributionFromUrl(pathname?: string): AttributionData {
  if (typeof window === "undefined") return {};
  try {
    const sp = new URLSearchParams(window.location.search);
    const existing = getStoredAttribution();
    let changed = false;
    const next: AttributionData = { ...existing };

    for (const key of ATTRIB_KEYS) {
      const val = sp.get(key)?.trim();
      if (val) {
        next[key] = val.slice(0, 180);
        changed = true;
      }
    }

    if (!next.landing_path && pathname) {
      next.landing_path = pathname;
      changed = true;
    }
    if (changed || !next.ts) {
      next.ts = new Date().toISOString();
      const serialized = JSON.stringify(next);
      window.localStorage.setItem(STORAGE_KEY, serialized);
      document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
        serialized
      )}; Path=/; Max-Age=2592000; SameSite=Lax`;
    }
    return next;
  } catch {
    return {};
  }
}

export function trackWebEvent(
  eventName: "Lead" | "Contact" | "ViewContent" | "InitiateCheckout" | string,
  params: {
    contentName?: string;
    value?: number;
    currency?: string;
    email?: string;
    phone?: string;
  } = {}
) {
  if (typeof window === "undefined") return;
  const eventId = `gv_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const customData: Record<string, unknown> = {
    ...(params.contentName ? { content_name: params.contentName } : {}),
    ...(typeof params.value === "number" ? { value: params.value } : {}),
    currency: params.currency || "USD",
  };

  try {
    if (typeof window.fbq === "function") {
      window.fbq("track", eventName, customData, { eventID: eventId });
    }
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, customData);
    }
    if (window.ttq && typeof window.ttq.track === "function") {
      window.ttq.track(eventName, customData);
    }
  } catch {
    // Nunca romper UX
  }

  // Reenviar también por servidor a Meta Conversions API (CAPI) para deduplicación
  try {
    void fetch("/api/tracking/capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        eventName,
        eventId,
        eventSourceUrl: window.location.href,
        userData: {
          email: params.email || undefined,
          phone: params.phone || undefined,
        },
        customData,
      }),
    });
  } catch {
    // Ignorar error de red en tracking
  }
}
