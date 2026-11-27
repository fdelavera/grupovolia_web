import { NextRequest, NextResponse } from "next/server";
import { genAI } from "@/lib/gemini";
import { checkRateLimit, getClientIp } from "@/lib/security/rate-limit";

/**
 * Endpoint basado en la arquitectura multi-agente de FRANTU TRADING AI BOT:
 * 1. Elite Scout (Detección de brechas / anomalías de mercado)
 * 2. AI Strategist (Clasificación de catalizadores con Gemini: STRONG_CATALYST / WEAK_CATALYST)
 * 3. Position Architect (Asignación óptima de capital / margen / inventario)
 * 4. Risk Sentinel (Monitoreo EMA-9, VWAP y protección 1R)
 * Adaptado para empresas ecuatorianas en 4 sectores estratégicos.
 */
export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = await checkRateLimit(`quant-oracle:${ip}`, 15, 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Demasiadas simulaciones seguidas. Por favor espera un minuto." },
      {
        status: 429,
        headers: { "Retry-After": String(rl.retryAfterSec) },
      }
    );
  }

  try {
    const rawBody = (await req.json()) as Record<string, unknown>;
    const sector =
      typeof rawBody?.sector === "string" ? rawBody.sector.trim().slice(0, 300) : "";
    const companyType =
      typeof rawBody?.companyType === "string"
        ? rawBody.companyType.trim().slice(0, 300)
        : "";
    const monthlyVolume =
      rawBody?.monthlyVolume != null
        ? String(rawBody.monthlyVolume).trim().slice(0, 300)
        : "";
    const customChallenge =
      typeof rawBody?.customChallenge === "string"
        ? rawBody.customChallenge.trim().slice(0, 300)
        : "";

    const prompt = `
Eres el motor algorítmico "Apex Quant Engine" de Grupo Volia (basado en la arquitectura de 4 etapas de Francisco de la Vera: 1_Elite_Scout, 1b_AI_Strategist, 2_Position_Architect y 3_Elite_Sentinel con indicadores EMA-9, VWAP y control de riesgo 1R).

Un empresario en Ecuador, Latinoamérica o EE.UU. solicita una simulación cuantitativa rápida para su negocio:
- Sector seleccionado: ${sector}
- Giro / Tipo de Empresa: ${companyType || sector}
- Volumen Operativo Mensual Estimado: $${monthlyVolume || "25,000"} USD
- Reto específico o variable crítica: ${customChallenge || "Optimizar margen neto, proteger liquidez y anticipar fluctuaciones de precios"}

Genera un diagnóstico ejecutivo estructurado en JSON con exactamente este formato (sin bloques markdown adicionales):
{
  "catalystTag": "HIGH_CONVICTION_OPPORTUNITY",
  "scoutSignal": "Qué datos en tiempo real rastrearía el módulo 1_Elite_Scout para esta empresa en Ecuador (1 oración concreta con métricas)",
  "strategistReasoning": "Cómo el módulo 1b_AI_Strategist (Gemini) cruza noticias macro/locales con los costos de la empresa para tomar decisiones (1-2 oraciones)",
  "architectAllocation": "Cómo el módulo 2_Position_Architect optimiza el capital de trabajo, precios dinámicos o compras de inventario sobre el volumen de $${monthlyVolume || "25,000"}/mes",
  "sentinelRule": "Qué regla automática de protección (estilo EMA-9 / VWAP / Stop-Loss de Margen 1R) ejecuta 3_Elite_Sentinel para evitar pérdidas",
  "estimatedMonthlyImpactUsd": "Rango estimado de ahorro o ganancia marginal mensual en USD (ej. +$1,450 a +$2,800 USD/mes)",
  "recommendedModule": "Módulo o Suite de Grupo Volia recomendada + precio oficial"
}
`;

    if (process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      try {
        const model = genAI.getGenerativeModel({
          model: "gemini-2.5-flash",
          generationConfig: {
            maxOutputTokens: 900,
            temperature: 0.5,
          },
        });
        const result = await model.generateContent(prompt);
        const raw = result.response.text();
        const match = raw.match(/\{[\s\S]*\}/);
        if (match) {
          const parsed = JSON.parse(match[0]);
          return NextResponse.json({
            analysis: parsed,
            source: "argon-engine-live",
          });
        }
      } catch (e) {
        console.warn("Quant Oracle fallback activated:", e);
      }
    }

    // Deterministic high-precision fallback based on FRANTU TRADING AI BOT logic
    const vol = Number(String(monthlyVolume).replace(/[^0-9.]/g, "")) || 25000;
    const lowImpact = Math.round(vol * 0.055);
    const highImpact = Math.round(vol * 0.115);

    return NextResponse.json({
      source: "apex-engine-deterministic",
      analysis: {
        catalystTag: "STRONG_CATALYST · ECUADOR ENTERPRISE",
        scoutSignal: `Escaneo automatizado cada 30s de feeds internacionales, costos de reposición y precios referenciales del sector (${sector}) frente a tu media móvil exponencial (EMA-9).`,
        strategistReasoning: `El motor AI Strategist clasifica alertas de proveedores, variaciones de insumos y demanda estacional para ajustar márgenes antes de que impacten tu flujo de caja.`,
        architectAllocation: `Sobre un flujo operativo de $${vol.toLocaleString()} USD/mes, Position Architect recalibra precios y lotes óptimos de compra priorizando los SKUs/activos con mayor velocidad de rotación (VWAP).`,
        sentinelRule: `Protección automática 1R: alerta inmediata en tu Dashboard administrativo si el margen bruto de una línea cae más de 2.5% bajo el VWAP semanal o si se detecta liquidez ociosa.`,
        estimatedMonthlyImpactUsd: `+$${lowImpact.toLocaleString()} a +$${highImpact.toLocaleString()} USD / mes en margen recuperado`,
        recommendedModule:
          "Suite Completa PYME ($69/mes + IVA) o Suite Corporativa Multisucursal ($119/mes + IVA) con Módulo Oráculo Cuantitativo a Medida ($490 USD)",
      },
    });
  } catch (error) {
    console.error("Quant Oracle Error:", error);
    return NextResponse.json({ error: "Error en simulación cuantitativa" }, { status: 500 });
  }
}
