import { NextRequest, NextResponse } from "next/server";
import { genAI, GRUPOVOLIA_SYSTEM_PROMPT } from "@/lib/gemini";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";

const MAX_MESSAGES = 20;
const MAX_MESSAGE_CHARS = 2500;

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = await checkRateLimit(`chat:${ip}`, 20, 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      {
        error: "Demasiadas consultas seguidas. Por favor espera unos segundos.",
        reply:
          "Estamos procesando varias consultas en este momento. Por favor espera unos segundos e intenta de nuevo.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(rl.retryAfterSec) },
      }
    );
  }

  let contents: { role: string; parts: { text: string }[] }[] = [];

  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return NextResponse.json({
        reply:
          "Soy Anna, tu asesora de Grupo Volia. En este momento el asistente conversacional no está disponible temporalmente, pero puedes revisar nuestro tarifario interactivo en la página o escribirnos directamente en la sección de Contacto.",
      });
    }

    const boundedMessages = messages
      .filter((m: unknown): m is { role?: unknown; content?: unknown } =>
        Boolean(m && typeof m === "object")
      )
      .slice(-MAX_MESSAGES);

    contents = boundedMessages
      .map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: String(m.content ?? "").slice(0, MAX_MESSAGE_CHARS) }],
      }))
      .filter((c) => c.parts[0].text.trim().length > 0);

    if (contents.length === 0) {
      return NextResponse.json({ error: "Empty message content" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: GRUPOVOLIA_SYSTEM_PROMPT,
      generationConfig: {
        maxOutputTokens: 1500,
        temperature: 0.65,
      },
    });

    const result = await model.generateContent({
      contents,
    });

    return NextResponse.json({ reply: result.response.text() });
  } catch (error) {
    console.error("Error in Grupo Volia Gemini API route:", error);

    try {
      const fallbackModel = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: GRUPOVOLIA_SYSTEM_PROMPT,
        generationConfig: {
          maxOutputTokens: 1500,
          temperature: 0.65,
        },
      });
      const result = await fallbackModel.generateContent(
        contents.length > 0
          ? { contents }
          : "Presenta brevemente los módulos, inventario conectado y paquetes de Grupo Volia."
      );
      return NextResponse.json({ reply: result.response.text() });
    } catch {
      return NextResponse.json({
        reply:
          "¡Hola! Soy Anna de Grupo Volia. Nuestro paquete estrella es la **Suite Completa PYME** (10 módulos interconectados + Contabilidad SRI ilimitada + Inventario + Finanzas NIIF + CRM + Project Manager + Portal B2B + RRHH y Colaboradores Ilimitados + Copiloto IA Interno personalizable) por **$69/mes + IVA** (+ $120 + IVA implementación inicial). Puedes pagar con tarjeta vía Stripe (sin recargo) o transferencia bancaria. ¿Te gustaría recibir una proforma personalizada desde la sección de Contacto?",
      });
    }
  }
}
