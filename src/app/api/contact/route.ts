import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { checkRateLimit, escapeHtml, getClientIp } from "@/lib/security/rate-limit";

const ALLOWED_PUBLIC_ALIASES = new Set([
  "ventas@grupovolia.com",
  "info@grupovolia.com",
  "soporte@grupovolia.com",
]);

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = await checkRateLimit(`contact:${ip}`, 8, 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Has enviado demasiadas solicitudes seguidas. Por favor espera un minuto." },
      {
        status: 429,
        headers: { "Retry-After": String(rl.retryAfterSec) },
      }
    );
  }

  try {
    const {
      name,
      company,
      email,
      phone,
      packageInterest,
      modality,
      message,
      bookingDate,
      bookingTime,
      bookingChannel,
      attribution,
    } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const cleanAlias =
      typeof bookingChannel === "string" &&
      ALLOWED_PUBLIC_ALIASES.has(bookingChannel.trim().toLowerCase())
        ? bookingChannel.trim().toLowerCase()
        : "ventas@grupovolia.com";

    const recipient = process.env.CONTACT_EMAIL_RECIPIENT || cleanAlias;
    const resendApiKey = process.env.RESEND_API_KEY;

    const appointmentSummary =
      bookingDate && bookingTime
        ? `${bookingDate} a las ${bookingTime} (UTC-5 Ecuador) · Canal: ${cleanAlias}`
        : `Sin fecha fija seleccionada (Canal: ${cleanAlias})`;

    const attribObj =
      attribution && typeof attribution === "object"
        ? (attribution as Record<string, string>)
        : {};
    const attribTags = [
      attribObj.utm_source ? `utm_source=${attribObj.utm_source}` : "",
      attribObj.utm_medium ? `utm_medium=${attribObj.utm_medium}` : "",
      attribObj.utm_campaign ? `utm_campaign=${attribObj.utm_campaign}` : "",
      attribObj.ref ? `ref=${attribObj.ref}` : "",
    ]
      .filter(Boolean)
      .join(" | ");

    // Persistir siempre en CRM Supabase de GRUPOVOLIA S.A.S. antes del correo
    const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
    const sbKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
    if (sbUrl && sbKey) {
      try {
        const sb = createClient(sbUrl, sbKey, { auth: { persistSession: false } });
        const { data: gvTenant } = await sb
          .from("tenants")
          .select("id")
          .eq("slug", "grupo-volia")
          .single();
        if (gvTenant?.id) {
          const isCorporate = String(packageInterest || "").includes("119");
          const isIndividual = String(packageInterest || "").includes("35");
          const expectedUsd = isCorporate ? 119 : isIndividual ? 35 : 69;
          await sb.from("crm_leads").insert({
            tenant_id: gvTenant.id,
            company_name: company || null,
            contact_name: name,
            email,
            phone: phone || null,
            expected_value: expectedUsd,
            status: "new",
            lead_score: 65,
            notes: `${packageInterest || "Web"} · ${appointmentSummary}${
              attribTags ? ` · ${attribTags}` : ""
            }`.slice(0, 490),
          });
        }
      } catch (dbErr) {
        console.warn("[Contact CRM insert warning]:", dbErr);
      }
    }

    if (!resendApiKey) {
      console.warn("[Grupo Volia Contact Lead]", {
        name,
        company,
        email,
        phone,
        packageInterest,
        modality,
        appointmentSummary,
        attribTags,
        message,
      });
      return NextResponse.json({ success: true, mode: "development" });
    }

    const resend = new Resend(resendApiKey);

    const safeCleanAlias = escapeHtml(cleanAlias);
    const safeHeadline = escapeHtml(company || name);
    const safeName = escapeHtml(name);
    const safeCompany = escapeHtml(company || "—");
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "—");
    const safeAppointmentSummary = escapeHtml(appointmentSummary);
    const safePackageInterest = escapeHtml(packageInterest || "—");
    const safeModality = escapeHtml(modality || "—");
    const safeMessage = escapeHtml(message);
    const cleanReplyTo = String(email).replace(/[\r\n]+/g, "").trim();
    const cleanSubject = `${bookingDate ? `[Cita ${bookingDate} ${bookingTime}] ` : ""}[Lead B2B Grupo Volia · ${cleanAlias}] ${company || name} — ${packageInterest || "Consulta General"}`
      .replace(/[\r\n]+/g, " ")
      .slice(0, 250);

    const { data, error } = await resend.emails.send({
      from: "Grupo Volia Web <onboarding@resend.dev>",
      to: recipient,
      replyTo: cleanReplyTo,
      subject: cleanSubject,
      text: `Nuevo Lead Comercial en www.grupovolia.com:\n\nNombre: ${name}\nEmpresa: ${company || "No especificado"}\nEmail: ${email}\nTeléfono / WhatsApp: ${phone || "No especificado"}\nCanal Destino: ${cleanAlias}\nCita Solicitada: ${appointmentSummary}\nAtribución / Referido: ${attribTags || "Tráfico directo"}\nSolución de Interés: ${packageInterest || "Por definir"}\nForma de Pago / Modalidad: ${modality || "Por definir"}\n\nMensaje:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; padding: 28px; background-color: #FFFFFF; color: #062016; border-radius: 16px; border: 1px solid #E2E8F0;">
          <div style="border-bottom: 1px solid #E2E8F0; padding-bottom: 16px; margin-bottom: 20px;">
            <span style="background: #ECFDF5; color: #059669; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; text-transform: uppercase;">Nuevo Lead B2B · ${safeCleanAlias}</span>
            <h2 style="color: #062016; margin: 10px 0 4px 0; font-size: 22px;">${safeHeadline}</h2>
            <p style="color: #475569; margin: 0; font-size: 13px;">Recibido desde www.grupovolia.com</p>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #475569; width: 40%;">Contacto:</td>
              <td style="padding: 8px 0; color: #062016; font-weight: 600;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #475569;">Empresa:</td>
              <td style="padding: 8px 0; color: #062016;">${safeCompany}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #475569;">Correo Electrónico:</td>
              <td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #059669;">${safeEmail}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #475569;">WhatsApp / Teléfono:</td>
              <td style="padding: 8px 0; color: #059669; font-weight: 600;">${safePhone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #475569;">Cita / Canal:</td>
              <td style="padding: 8px 0; color: #062016; font-weight: 700;">${safeAppointmentSummary}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #475569;">Solución de Interés:</td>
              <td style="padding: 8px 0; color: #064E3B; font-weight: 700;">${safePackageInterest}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #475569;">Forma de Pago / Plan:</td>
              <td style="padding: 8px 0; color: #0F172A;">${safeModality}</td>
            </tr>
          </table>
          <div style="background-color: #F8FAF9; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px;">
            <strong style="color: #475569; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 8px;">Detalles del Proyecto / Requerimiento:</strong>
            <p style="color: #0F172A; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${safeMessage}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("[Resend Error]:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error sending Grupo Volia contact email:", error);
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 });
  }
}
