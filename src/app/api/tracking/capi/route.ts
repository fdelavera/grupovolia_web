import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

function sha256Lower(val: string): string {
  return crypto.createHash("sha256").update(val.trim().toLowerCase(), "utf8").digest("hex");
}

function normalizePhoneDigits(phone: string): string {
  const digits = phone.replace(/[^\d]/g, "");
  if (digits.length === 10 && digits.startsWith("09")) return `593${digits.slice(1)}`;
  if (digits.length === 9 && digits.startsWith("9")) return `593${digits}`;
  return digits;
}

export async function POST(req: NextRequest) {
  try {
    const pixelId = (process.env.NEXT_PUBLIC_META_PIXEL_ID || "").trim();
    const accessToken = (process.env.META_CAPI_ACCESS_TOKEN || "").trim();
    if (!pixelId || !accessToken) {
      return NextResponse.json({ dispatched: false, reason: "unconfigured" });
    }

    const body = (await req.json()) as {
      eventName?: string;
      eventId?: string;
      eventSourceUrl?: string;
      userData?: { email?: string; phone?: string };
      customData?: Record<string, unknown>;
    };

    const userData: Record<string, unknown> = {};
    if (body.userData?.email?.includes("@")) {
      userData.em = [sha256Lower(body.userData.email)];
    }
    if (body.userData?.phone) {
      const clean = normalizePhoneDigits(body.userData.phone);
      if (clean.length >= 9) userData.ph = [sha256Lower(clean)];
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const ua = req.headers.get("user-agent");
    if (ip) userData.client_ip_address = ip;
    if (ua) userData.client_user_agent = ua;

    const payload = {
      data: [
        {
          event_name: body.eventName || "Lead",
          event_time: Math.floor(Date.now() / 1000),
          event_id: body.eventId || `gv_${crypto.randomUUID()}`,
          action_source: "website",
          event_source_url: body.eventSourceUrl || "https://www.grupovolia.com",
          user_data: userData,
          ...(body.customData ? { custom_data: body.customData } : {}),
        },
      ],
    };

    const res = await fetch(
      `https://graph.facebook.com/v21.0/${encodeURIComponent(
        pixelId
      )}/events?access_token=${encodeURIComponent(accessToken)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    return NextResponse.json({ dispatched: res.ok, status: res.status });
  } catch {
    return NextResponse.json({ dispatched: false }, { status: 200 });
  }
}
