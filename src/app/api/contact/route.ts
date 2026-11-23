import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const ALLOWED_PUBLIC_ALIASES = new Set([
  "ventas@grupovolia.com",
  "info@grupovolia.com",
  "soporte@grupovolia.com",
]);

export async function POST(req: NextRequest) {
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

    if (!resendApiKey) {
      console.warn("[Grupo Volia Contact Lead]", {
        name,
        company,
        email,
        phone,
        packageInterest,
        modality,
        appointmentSummary,
        message,
      });
      return NextResponse.json({ success: true, mode: "development" });
    }

    const resend = new Resend(resendApiKey);

    const { data, error } = await resend.emails.send({
      from: "Grupo Volia Web <onboarding@resend.dev>",
      to: recipient,
      replyTo: email,
      subject: `${bookingDate ? `[Cita ${bookingDate} ${bookingTime}] ` : ""}[Lead B2B Grupo Volia · ${cleanAlias}] ${company || name} — ${packageInterest || "Consulta General"}`,
      text: `Nuevo Lead Comercial en www.grupovolia.com:\n\nNombre: ${name}\nEmpresa: ${company || "No especificado"}\nEmail: ${email}\nTeléfono / WhatsApp: ${phone || "No especificado"}\nCanal Destino: ${cleanAlias}\nCita Solicitada: ${appointmentSummary}\nSolución de Interés: ${packageInterest || "Por definir"}\nForma de Pago / Modalidad: ${modality || "Por definir"}\n\nMensaje:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; padding: 28px; background-color: #FFFFFF; color: #062016; border-radius: 16px; border: 1px solid #E2E8F0;">
          <div style="border-bottom: 1px solid #E2E8F0; padding-bottom: 16px; margin-bottom: 20px;">
            <span style="background: #ECFDF5; color: #059669; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 700; text-transform: uppercase;">Nuevo Lead B2B · ${cleanAlias}</span>
            <h2 style="color: #062016; margin: 10px 0 4px 0; font-size: 22px;">${company || name}</h2>
            <p style="color: #475569; margin: 0; font-size: 13px;">Recibido desde www.grupovolia.com</p>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <tr>
              <td style="padding: 8px 0; color: #475569; width: 40%;">Contacto:</td>
              <td style="padding: 8px 0; color: #062016; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #475569;">Empresa:</td>
              <td style="padding: 8px 0; color: #062016;">${company || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #475569;">Correo Electrónico:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #059669;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #475569;">WhatsApp / Teléfono:</td>
              <td style="padding: 8px 0; color: #059669; font-weight: 600;">${phone || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #475569;">Cita / Canal:</td>
              <td style="padding: 8px 0; color: #062016; font-weight: 700;">${appointmentSummary}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #475569;">Solución de Interés:</td>
              <td style="padding: 8px 0; color: #064E3B; font-weight: 700;">${packageInterest || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #475569;">Forma de Pago / Plan:</td>
              <td style="padding: 8px 0; color: #0F172A;">${modality || "—"}</td>
            </tr>
          </table>
          <div style="background-color: #F8FAF9; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px;">
            <strong style="color: #475569; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 8px;">Detalles del Proyecto / Requerimiento:</strong>
            <p style="color: #0F172A; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
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
