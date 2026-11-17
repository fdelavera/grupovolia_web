"use client";

import { useState } from "react";
import {
  Cpu,
  Activity,
  Sparkles,
  Loader2,
  Building,
  Coins,
  Ship,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

interface QuantAnalysis {
  catalystTag: string;
  scoutSignal: string;
  strategistReasoning: string;
  architectAllocation: string;
  sentinelRule: string;
  estimatedMonthlyImpactUsd: string;
  recommendedModule: string;
}

export default function QuantAlgorithmsSection() {
  const [selectedSector, setSelectedSector] = useState("Importadoras, Retail & Distribución Mayorista");
  const [monthlyVolume, setMonthlyVolume] = useState("45000");
  const [customChallenge, setCustomChallenge] = useState("");
  const [loading, setLoading] = useState(false);

  const sectorPresets = [
    {
      id: "Importadoras, Retail & Distribución Mayorista",
      label: "Retail, Importadoras & Mayoristas",
      icon: ShoppingBag,
      defaultVol: "45000",
      desc: "Dynamic Pricing algorítmico según velocidad de rotación (VWAP de inventario), alertas de reposición de stock y protección de margen bruto ante variaciones de fletes o aranceles.",
    },
    {
      id: "Agroexportación, Camarón, Cacao & Banano",
      label: "Agroexportación & Commodities",
      icon: Ship,
      defaultVol: "120000",
      desc: "Monitoreo en tiempo real de futuros internacionales (Cacao NY, Camarón, Café, Banano), cruce de noticias climáticas/logísticas con Gemini y ventanas óptimas de fijación de precios.",
    },
    {
      id: "Inmobiliarias, Constructoras & Promotoras",
      label: "Real Estate & Constructoras",
      icon: Building,
      defaultVol: "85000",
      desc: "Radar cuantitativo de precios por m² en Guayaquil, Samborondón, Quito y Cuenca; detección automática de inmuebles subvaluados (arbitraje inmobiliario) y cálculo de Cap Rate.",
    },
    {
      id: "Joyerías, Metales Preciosos & Casas de Valores",
      label: "Metales Preciosos (XAU/USD) & Finanzas",
      icon: Coins,
      defaultVol: "60000",
      desc: "Oráculo XAU/USD (Oro y Plata Spot) conectado al segundo, ajuste automático de tarifas de compra/venta por quilataje (10k, 14k, 18k, 24k) y bloqueo de pérdida por volatilidad.",
    },
  ];

  const [analysis, setAnalysis] = useState<QuantAnalysis>({
    catalystTag: "STRONG_CATALYST · ECUADOR ENTERPRISE",
    scoutSignal:
      "Escaneo continuo de precios de reposición de proveedores, aranceles y rotación diaria por categoría frente a su media móvil exponencial (EMA-9).",
    strategistReasoning:
      "El módulo AI Strategist (Gemini) cruza el ritmo de ventas con costos de importación para detectar qué productos deben subir margen un +4% y cuáles requieren liquidación rápida para liberar caja.",
    architectAllocation:
      "Sobre un volumen de $45,000 USD/mes, Position Architect reasigna el presupuesto de compras hacia el 20% de SKUs que generan el 78% del flujo de efectivo libre.",
    sentinelRule:
      "Regla Sentinel 1R: Alerta inmediata al celular de gerencia si el margen ponderado (VWAP) de cualquier línea cae más de 2.0% o si el inventario supera 45 días de inmovilización.",
    estimatedMonthlyImpactUsd: "+$2,450 a +$4,900 USD / mes en flujo de caja y margen recuperado",
    recommendedModule:
      "Suite Completa PYME ($69/mes o $890 Licencia) + Oráculo Algorítmico a Medida ($490 USD)",
  });

  const handleRunSimulation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/quant-oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sector: selectedSector,
          companyType: selectedSector,
          monthlyVolume,
          customChallenge,
        }),
      });
      const data = await res.json();
      if (data.analysis) {
        setAnalysis(data.analysis);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const currentPreset =
    sectorPresets.find((s) => s.id === selectedSector) || sectorPresets[0];

  return (
    <section
      id="algoritmos-cuantitativos"
      className="py-24 bg-white border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-emeraldSoft border border-brand-emerald/30 text-brand-pine text-xs font-mono font-bold mb-4">
            <Cpu className="w-3.5 h-3.5 text-brand-emerald" />
            <span>INGENIERÍA CUANTITATIVA PARA ECUADOR, LATINOAMÉRICA & EE.UU.</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-swiss-pine tracking-tight">
            Motores Algorítmicos y{" "}
            <span className="text-brand-emerald">Oráculos de Decisión en Tiempo Real</span>
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Adaptamos nuestra arquitectura propietaria de trading algorítmico para la bolsa de EE.UU. (
            <strong className="text-swiss-pine">Scout → AI Strategist → Position Architect → Risk Sentinel</strong>
            ) para que empresas comerciales, agroexportadoras, inmobiliarias e industriales en Ecuador, Latinoamérica y EE.UU. protejan sus márgenes y anticipen el mercado.
          </p>
        </div>

        {/* 4-Stage Pipeline Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="p-4 rounded-2xl bg-swiss-canvas border border-slate-200">
            <div className="text-xs font-mono text-brand-emerald font-bold">ETAPA 1 · 1_ELITE_SCOUT</div>
            <div className="text-sm font-bold text-swiss-pine mt-1">Escáner de Mercado & Costos</div>
            <p className="text-xs text-slate-600 mt-1">
              Captura precios internacionales, divisas, materias primas, competencia local y velocidad de ventas en tiempo real.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-swiss-canvas border border-slate-200">
            <div className="text-xs font-mono text-brand-pine font-bold">ETAPA 2 · 1B_AI_STRATEGIST</div>
            <div className="text-sm font-bold text-swiss-pine mt-1">Análisis de Catalizadores (Gemini)</div>
            <p className="text-xs text-slate-600 mt-1">
              Cruza noticias económicas, clima, aranceles y estacionalidad para clasificar oportunidades de alta convicción.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-swiss-canvas border border-slate-200">
            <div className="text-xs font-mono text-brand-emerald font-bold">ETAPA 3 · 2_POSITION_ARCHITECT</div>
            <div className="text-sm font-bold text-swiss-pine mt-1">Asignación Óptima de Capital</div>
            <p className="text-xs text-slate-600 mt-1">
              Calcula cuánto inventario comprar, a qué precio vender (Dynamic Pricing) y cómo distribuir tu liquidez sin sobreexponerte.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-swiss-canvas border border-slate-200">
            <div className="text-xs font-mono text-brand-pine font-bold">ETAPA 4 · 3_ELITE_SENTINEL</div>
            <div className="text-sm font-bold text-swiss-pine mt-1">Vigilancia VWAP / EMA-9 & Riesgo</div>
            <p className="text-xs text-slate-600 mt-1">
              Monitorea desviaciones de margen 24/7 y dispara alertas automáticas cuando un costo o descuento amenaza tu rentabilidad.
            </p>
          </div>
        </div>

        {/* Interactive Sector Selector & Live Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Sector Presets + Input Form */}
          <div className="lg:col-span-5 swiss-card rounded-3xl p-6">
            <h3 className="text-base font-bold text-swiss-pine mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-brand-emerald" />
              <span>1. Elige el Sector de tu Empresa en Ecuador</span>
            </h3>

            <div className="grid grid-cols-1 gap-2.5 mb-5">
              {sectorPresets.map((item) => {
                const Icon = item.icon;
                const active = selectedSector === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedSector(item.id);
                      setMonthlyVolume(item.defaultVol);
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                      active
                        ? "bg-brand-emeraldSoft border-brand-emerald text-swiss-pine shadow-sm"
                        : "bg-swiss-canvas border-slate-200 text-slate-700 hover:border-brand-emerald/40"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 shrink-0 ${
                        active ? "text-brand-emerald" : "text-slate-400"
                      }`}
                    />
                    <div className="text-xs font-bold">{item.label}</div>
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4 p-3 rounded-xl bg-swiss-canvas border border-slate-200">
              {currentPreset.desc}
            </p>

            <form onSubmit={handleRunSimulation} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-semibold text-slate-600 mb-1">
                  Facturación / Volumen Operativo Mensual (USD):
                </label>
                <input
                  type="number"
                  value={monthlyVolume}
                  onChange={(e) => setMonthlyVolume(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-swiss-pine font-mono focus:outline-none focus:border-brand-emerald"
                  placeholder="Ej: 45000"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-600 mb-1">
                  Variable crítica de tu negocio (Opcional):
                </label>
                <input
                  type="text"
                  value={customChallenge}
                  onChange={(e) => setCustomChallenge(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-swiss-pine focus:outline-none focus:border-brand-emerald"
                  placeholder="Ej: Variación del precio del cacao, rotación ferretería, oro 18k..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-brand-emerald hover:bg-brand-pine text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Ejecutando Apex Quant Engine con Gemini...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Simular Algoritmo para mi Empresa</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Live Quant Output Panel */}
          <div className="lg:col-span-7 swiss-card rounded-3xl p-6 sm:p-8 border-2 border-brand-emerald/25">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-emerald animate-ping" />
                <span className="text-xs font-mono font-bold text-swiss-pine">
                  DIAGNÓSTICO CUANTITATIVO EN VIVO · APEX ENGINE
                </span>
              </div>
              <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-brand-emeraldSoft text-brand-pine border border-brand-emerald/30">
                {analysis.catalystTag}
              </span>
            </div>

            <div className="space-y-3.5">
              <div className="p-4 rounded-2xl bg-swiss-canvas border border-slate-200">
                <div className="text-[11px] font-mono text-brand-emerald font-bold uppercase mb-1">
                  1. Señal en Vivo (1_Elite_Scout):
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {analysis.scoutSignal}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-swiss-canvas border border-slate-200">
                <div className="text-[11px] font-mono text-brand-pine font-bold uppercase mb-1">
                  2. Inteligencia Estratégica (1b_AI_Strategist · Gemini):
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {analysis.strategistReasoning}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-swiss-canvas border border-slate-200">
                <div className="text-[11px] font-mono text-brand-emerald font-bold uppercase mb-1">
                  3. Optimización de Capital y Precios (2_Position_Architect):
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {analysis.architectAllocation}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-swiss-canvas border border-slate-200">
                <div className="text-[11px] font-mono text-brand-pine font-bold uppercase mb-1">
                  4. Regla de Protección Automática (3_Elite_Sentinel · VWAP / EMA-9):
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {analysis.sentinelRule}
                </p>
              </div>
            </div>

            {/* Bottom ROI Box */}
            <div className="mt-6 p-4 rounded-2xl bg-brand-emeraldSoft border border-brand-emerald/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-[11px] font-mono font-bold text-brand-pine uppercase">
                  Impacto Financiero Estimado en tu Operación:
                </div>
                <div className="text-lg sm:text-xl font-extrabold text-brand-emerald font-mono mt-0.5 tabular-nums">
                  {analysis.estimatedMonthlyImpactUsd}
                </div>
                <div className="text-xs text-slate-700 mt-1">
                  Implementación sugerida: <strong className="text-swiss-pine">{analysis.recommendedModule}</strong>
                </div>
              </div>
              <a
                href="#contacto"
                className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-emerald hover:bg-brand-pine text-white font-bold text-xs transition-all"
              >
                <span>Implementar en mi Empresa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
