import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { checkRateLimit, escapeHtml, getClientIp } from "@/lib/security/rate-limit";

const VALID_DEMO_SLUGS = new Set([
  "demo-comercio",
  "demo-salud",
  "demo-colegio",
  "demo-servicios",
  "demo-inmobiliaria",
  "demo-restaurante",
  "demo-agro",
  "demo-taller",
  "demo-farmacia",
  "demo-gimnasio",
]);

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = await checkRateLimit(`demo-access:${ip}`, 10, 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Demasiados intentos seguidos. Por favor espera un minuto e intenta de nuevo." },
      {
        status: 429,
        headers: { "Retry-After": String(rl.retryAfterSec) },
      }
    );
  }

  try {
    const body = (await req.json()) as {
      name?: string;
      phone?: string;
      email?: string;
      company?: string;
      slug?: string;
      attribution?: Record<string, string>;
      eventId?: string;
    };

    const name = String(body.name || "").trim();
    const phone = String(body.phone || "").trim();
    const email = String(body.email || "").trim();
    const company = String(body.company || "").trim();
    const slug = VALID_DEMO_SLUGS.has(String(body.slug || "").trim())
      ? String(body.slug).trim()
      : "demo-comercio";
    const attribution = body.attribution ?? {};

    if (!name || phone.length < 7) {
      return NextResponse.json(
        { error: "Ingresa tu nombre completo y tu WhatsApp para activar la Demo 24h." },
        { status: 400 }
      );
    }

    const suiteBaseUrl =
      process.env.NEXT_PUBLIC_APP_URL?.trim() || "https://app.grupovolia.com";

    // 1. Intentar emitir pase HMAC firmado desde app.grupovolia.com/api/public/demo-pass
    try {
      const mintRes = await fetch(`${suiteBaseUrl}/api/public/demo-pass`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          company,
          slug,
          attribution,
          eventId: body.eventId,
        }),
      });
      if (mintRes.ok) {
        const minted = (await mintRes.json()) as { demoUrl?: string; leadId?: string };
        if (minted.demoUrl) {
          return NextResponse.json({
            success: true,
            demoUrl: minted.demoUrl,
            leadId: minted.leadId ?? null,
          });
        }
      }
    } catch {
      // Continuar con respaldo local Supabase + Resend si la llamada entre apps falla
    }

    // 2. Respaldo directo en Supabase CRM si la llamada remota no devolvió URL
    const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
    const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
    if (sbUrl && sbKey) {
      const admin = createClient(sbUrl, sbKey, { auth: { persistSession: false } });
      const { data: tenant } = await admin
        .from("tenants")
        .select("id")
        .eq("slug", "grupo-volia")
        .single();
      if (tenant?.id) {
        await admin.from("crm_leads").insert({
          tenant_id: tenant.id,
          company_name: company || null,
          contact_name: name,
          email: email || null,
          phone,
          expected_value: 69,
          status: "qualified",
          lead_score: 70,
          notes: `Demo 24h (${slug}) · UTM: ${JSON.stringify(attribution)}`,
        });
      }
    }

    const resendKey = process.env.RESEND_API_KEY?.trim();
    if (resendKey) {
      const resend = new Resend(resendKey);
      const safeName = escapeHtml(name);
      const safePhone = escapeHtml(phone);
      const safeEmail = escapeHtml(email || "—");
      const safeCompany = escapeHtml(company || "—");
      const safeSlug = escapeHtml(slug);
      const safeAttribution = escapeHtml(JSON.stringify(attribution));
      const cleanSubject = `[Solicitud Demo 24h] ${company || name} · ${slug}`
        .replace(/[\r\n]+/g, " ")
        .slice(0, 250);

      await resend.emails
        .send({
          from: "Grupo Volia Demo <onboarding@resend.dev>",
          to: process.env.CONTACT_EMAIL_RECIPIENT || "ventas@grupovolia.com",
          subject: cleanSubject,
          text: `Nombre: ${name}\nWhatsApp: ${phone}\nEmail: ${email || "—"}\nEmpresa: ${company || "—"}\nDemo: ${slug}\nAtribución: ${JSON.stringify(attribution)}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 580px; margin: 0 auto; padding: 24px; background: #FFFFFF; color: #062016; border-radius: 12px; border: 1px solid #E2E8F0;">
              <h2 style="margin: 0 0 12px 0; font-size: 18px; color: #062016;">Solicitud Demo 24h · ${safeSlug}</h2>
              <p style="margin: 6px 0; font-size: 14px;"><strong>Nombre:</strong> ${safeName}</p>
              <p style="margin: 6px 0; font-size: 14px;"><strong>WhatsApp:</strong> ${safePhone}</p>
              <p style="margin: 6px 0; font-size: 14px;"><strong>Email:</strong> ${safeEmail}</p>
              <p style="margin: 6px 0; font-size: 14px;"><strong>Empresa:</strong> ${safeCompany}</p>
              <p style="margin: 6px 0; font-size: 14px;"><strong>Demo:</strong> ${safeSlug}</p>
              <p style="margin: 6px 0; font-size: 13px; color: #475569;"><strong>Atribución:</strong> ${safeAttribution}</p>
            </div>
          `,
        })
        .catch(() => null);
    }

    return NextResponse.json(
      {
        error:
          "Recibimos tus datos correctamente. Un asesor enviará tu enlace de Demo 24h de inmediato por WhatsApp.",
      },
      { status: 503 }
    );
  } catch {
    return NextResponse.json(
      { error: "No pudimos procesar la solicitud en este momento." },
      { status: 500 }
    );
  }
}
