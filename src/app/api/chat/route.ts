import { NextRequest, NextResponse } from "next/server";
import { genAI, GRUPOVOLIA_SYSTEM_PROMPT } from "@/lib/gemini";

export async function POST(req: NextRequest) {
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
          "Soy Anna, tu asesora de Grupo Volia. En este entorno local falta configurar GOOGLE_GENERATIVE_AI_API_KEY, pero puedes revisar nuestro tarifario interactivo en la página o escribirnos directamente en la sección de Contacto.",
      });
    }

    contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

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
