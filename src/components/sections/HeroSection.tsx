"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowUpRight,
  Bot,
  Calculator,
  FileCheck2,
  TrendingUp,
  Send,
  X,
  Activity,
  FileText,
  Sparkles,
  ShieldCheck,
  Briefcase,
  LogIn,
  RefreshCw,
} from "lucide-react";
import { TechGlossaryBar, TechTerm } from "@/components/ui/TechTermPopover";

interface HeroSectionProps {
  onOpenChat: () => void;
}

type TelemetryPresetKey = "retail" | "agro" | "realestate" | "gold";

interface CandlePoint {
  label: string;
  open: number;
  high: number;
  low: number;
  close: number;
  vwap: number;
  vol: number;
}

export default function HeroSection({ onOpenChat }: HeroSectionProps) {
  const [activePreset, setActivePreset] = useState<TelemetryPresetKey>("retail");
  const [hoveredCandle, setHoveredCandle] = useState<number | null>(null);
  const [showSriModal, setShowSriModal] = useState(false);
  const [quickPrompt, setQuickPrompt] = useState("");
  const [quickReply, setQuickReply] = useState(
    "Copiloto IA Interno: 142 facturas XML firmadas XAdES-BES, retenciones de IVA a proveedores cuadradas y stock enlazado vía API."
  );

  const presets: Record<
    TelemetryPresetKey,
    {
      badge: string;
      title: string;
      price: string;
      delta: string;
      targetRatio: string;
      riskRule: string;
      volumeLabel: string;
      candles: CandlePoint[];
    }
  > = {
    retail: {
      badge: "VWAP Retail & Inventario",
      title: "VWAP Quant Oracle · Margen SKU & Reposición",
      price: "$2,393.00",
      delta: "+10.22%",
      targetRatio: "Margen Objetivo EMA-9: 38.4%",
      riskRule: "Protección 1R Activa: -2.0% Umbral",
      volumeLabel: "Rotación: 120,800 uds",
      candles: [
        { label: "Ene", open: 45, high: 54, low: 40, close: 50, vwap: 44, vol: 34 },
        { label: "Feb", open: 50, high: 58, low: 46, close: 48, vwap: 46, vol: 42 },
        { label: "Mar", open: 48, high: 55, low: 42, close: 44, vwap: 45, vol: 30 },
        { label: "Abr", open: 44, high: 57, low: 43, close: 55, vwap: 48, vol: 52 },
        { label: "May", open: 55, high: 64, low: 51, close: 61, vwap: 52, vol: 60 },
        { label: "Jun", open: 61, high: 68, low: 56, close: 58, vwap: 55, vol: 46 },
        { label: "Jul", open: 58, high: 73, low: 57, close: 70, vwap: 60, vol: 72 },
        { label: "Ago", open: 70, high: 79, low: 64, close: 76, vwap: 64, vol: 68 },
        { label: "Sep", open: 76, high: 84, low: 69, close: 72, vwap: 67, vol: 54 },
        { label: "Oct", open: 72, high: 88, low: 71, close: 84, vwap: 72, vol: 84 },
        { label: "Nov", open: 84, high: 93, low: 79, close: 89, vwap: 76, vol: 90 },
        { label: "Dic", open: 89, high: 97, low: 85, close: 94, vwap: 81, vol: 96 },
      ],
    },
    agro: {
      badge: "Cacao / Camarón Export",
      title: "Commodity Oracle · Futuros NY & Cobertura",
      price: "$6,480.50",
      delta: "+14.85%",
      targetRatio: "Ventana Óptima de Cierre: STRONG_CATALYST",
      riskRule: "Cobertura Spot vs. Flete: +$340/TM",
      volumeLabel: "Volumen Monitoreado: 480 TM",
      candles: [
        { label: "S1", open: 50, high: 58, low: 47, close: 56, vwap: 50, vol: 40 },
        { label: "S2", open: 56, high: 63, low: 53, close: 60, vwap: 54, vol: 52 },
        { label: "S3", open: 60, high: 65, low: 54, close: 56, vwap: 56, vol: 44 },
        { label: "S4", open: 56, high: 70, low: 55, close: 68, vwap: 60, vol: 66 },
        { label: "S5", open: 68, high: 76, low: 64, close: 74, vwap: 64, vol: 75 },
        { label: "S6", open: 74, high: 80, low: 70, close: 77, vwap: 68, vol: 70 },
        { label: "S7", open: 77, high: 85, low: 72, close: 83, vwap: 72, vol: 82 },
        { label: "S8", open: 83, high: 89, low: 79, close: 81, vwap: 75, vol: 64 },
        { label: "S9", open: 81, high: 92, low: 80, close: 90, vwap: 79, vol: 88 },
        { label: "S10", open: 90, high: 95, low: 86, close: 93, vwap: 83, vol: 92 },
        { label: "S11", open: 93, high: 98, low: 89, close: 95, vwap: 86, vol: 86 },
        { label: "S12", open: 95, high: 100, low: 91, close: 98, vwap: 89, vol: 95 },
      ],
    },
    realestate: {
      badge: "Arbitraje Inmobiliario m²",
      title: "Radar Inmobiliario · $/m² vs. Cap Rate",
      price: "$1,420 /m²",
      delta: "+18.4% ROI",
      targetRatio: "Subvaluación Detectada: -16.2% bajo VWAP Zona",
      riskRule: "Cumplimiento UAFE Automático: 100%",
      volumeLabel: "Unidades Evaluadas: 1,240",
      candles: [
        { label: "Z1", open: 42, high: 50, low: 39, close: 48, vwap: 43, vol: 36 },
        { label: "Z2", open: 48, high: 55, low: 45, close: 52, vwap: 46, vol: 45 },
        { label: "Z3", open: 52, high: 61, low: 50, close: 59, vwap: 50, vol: 55 },
        { label: "Z4", open: 59, high: 64, low: 54, close: 56, vwap: 53, vol: 42 },
        { label: "Z5", open: 56, high: 69, low: 55, close: 67, vwap: 57, vol: 65 },
        { label: "Z6", open: 67, high: 75, low: 63, close: 72, vwap: 61, vol: 72 },
        { label: "Z7", open: 72, high: 78, low: 68, close: 74, vwap: 65, vol: 62 },
        { label: "Z8", open: 74, high: 83, low: 71, close: 81, vwap: 69, vol: 78 },
        { label: "Z9", open: 81, high: 87, low: 77, close: 85, vwap: 73, vol: 82 },
        { label: "Z10", open: 85, high: 91, low: 82, close: 88, vwap: 77, vol: 86 },
        { label: "Z11", open: 88, high: 94, low: 84, close: 91, vwap: 81, vol: 90 },
        { label: "Z12", open: 91, high: 96, low: 88, close: 95, vwap: 84, vol: 94 },
      ],
    },
    gold: {
      badge: "Oro Spot XAU/USD",
      title: "Oráculo Metales Preciosos · Spread por Quilate",
      price: "$2,684.10",
      delta: "+11.40%",
      targetRatio: "Ajuste Automático 18k / 24k cada 30s",
      riskRule: "Bloqueo Volatilidad 1R: Activo",
      volumeLabel: "Feed Spot en Vivo: XAU/USD",
      candles: [
        { label: "09h", open: 52, high: 59, low: 48, close: 57, vwap: 51, vol: 48 },
        { label: "10h", open: 57, high: 64, low: 54, close: 62, vwap: 55, vol: 56 },
        { label: "11h", open: 62, high: 68, low: 58, close: 60, vwap: 58, vol: 49 },
        { label: "12h", open: 60, high: 72, low: 59, close: 70, vwap: 61, vol: 74 },
        { label: "13h", open: 70, high: 78, low: 66, close: 75, vwap: 65, vol: 68 },
        { label: "14h", open: 75, high: 82, low: 72, close: 79, vwap: 69, vol: 77 },
        { label: "15h", open: 79, high: 86, low: 75, close: 84, vwap: 73, vol: 83 },
        { label: "16h", open: 84, high: 88, low: 79, close: 82, vwap: 76, vol: 66 },
        { label: "17h", open: 82, high: 91, low: 81, close: 89, vwap: 79, vol: 89 },
        { label: "18h", open: 89, high: 94, low: 86, close: 91, vwap: 82, vol: 85 },
        { label: "19h", open: 91, high: 96, low: 88, close: 93, vwap: 85, vol: 91 },
        { label: "20h", open: 93, high: 99, low: 90, close: 96, vwap: 88, vol: 97 },
      ],
    },
  };

  const currentData = presets[activePreset];
  const vwapPoints = currentData.candles
    .map((c, idx) => {
      const x = 18 + idx * 34;
      const y = 135 - c.vwap * 1.15;
      return `${x},${y}`;
    })
    .join(" ");

  const vwapAreaPoints = `18,135 ${vwapPoints} ${18 + (currentData.candles.length - 1) * 34},135`;

  const handleQuickPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPrompt.trim()) return;
    setQuickReply(
      `Anna responde a "${quickPrompt}": Puedes incluirlo en nuestra Suite Completa PYME ($69/mes o $890 Licencia). Abre el chat completo con Anna para cotizar a tu medida.`
    );
    setQuickPrompt("");
  };

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-24 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Institutional Badge + Centered Headline */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-emerald/30 text-brand-pine text-xs font-mono font-semibold shadow-sm mb-5">
            <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
            <span>GRUPO VOLIA · ECUADOR, LATINOAMÉRICA & EE.UU.</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight text-swiss-pine leading-[1.08]">
            Contabilidad SRI, RRHH, Inventario e{" "}
            <span className="text-brand-emerald">IA Empresarial</span>
            <span className="block text-2xl sm:text-3xl lg:text-[34px] font-bold text-slate-700 mt-2">
              — 10 Módulos Interconectados, Tan Fáciles como{" "}
              <span className="underline decoration-brand-emerald/50 decoration-4 underline-offset-4 text-swiss-pine">
                WhatsApp
              </span>
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Tecnología de vanguardia hecha humana con <strong className="text-swiss-pine">10 módulos independientes e interconectados</strong> y <strong className="text-swiss-pine">10 demos vivos por industria</strong> listos al instante:{" "}
            <strong className="text-brand-emerald">Facturación SRI Ilimitada con Reintento Automático</strong> (<TechTerm termKey="RIDE" label="RIDE PDF" /> y firma <TechTerm termKey="XAdES-BES" />),{" "}
            <strong className="text-swiss-pine">Módulo 10 RRHH Ecuador + App Empleados 100% White-Label</strong> (Nómina IESS/Servicios, Sobretiempo 25/50/100%, Radar Feriados IA y Biométricos),{" "}
            <strong className="text-swiss-pine">Migración Inteligente IA editable</strong>, cifrado{" "}
            <TechTerm termKey="LOPDP" /> (<TechTerm termKey="AES-256-GCM" label="AES-256" />) y Asistente IA en español sencillo.
          </p>

          {/* Differentiated Action Bar: Empresas/Clientes vs Vendedores */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-3 max-w-5xl mx-auto text-left">
            {/* Audience 1: Para Empresas / Clientes */}
            <div className="lg:col-span-8 p-3.5 rounded-2xl bg-swiss-canvas border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emerald">
                  Para Empresas / Clientes
                </div>
                <div className="text-xs font-semibold text-slate-600">
                  Explora precios, 10 demos vivos por industria o ingresa a tu ERP
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <a
                  href="#tarifario-calculadora"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-emerald hover:bg-brand-pine text-white font-bold text-xs shadow-swiss-md transition-all"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Ver Precios y Demos de 10 Industrias</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://app.grupovolia.com/app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-brand-emeraldSoft text-swiss-pine border border-slate-300 hover:border-brand-emerald font-bold text-xs shadow-sm transition-all"
                >
                  <LogIn className="w-3.5 h-3.5 text-brand-emerald" />
                  <span>Acceso Clientes</span>
                </a>
                <button
                  type="button"
                  onClick={onOpenChat}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-brand-emeraldSoft hover:bg-brand-emeraldLight text-brand-pine border border-brand-emerald/30 font-bold text-xs transition-all"
                >
                  <Bot className="w-3.5 h-3.5 text-brand-emerald" />
                  <span>Anna IA</span>
                </button>
              </div>
            </div>

            {/* Audience 2: ¿Quieres Vender Grupo Volia? */}
            <div className="lg:col-span-4 p-3.5 rounded-2xl bg-swiss-pine text-white border border-swiss-pine flex flex-col justify-between gap-2.5 shadow-swiss-md">
              <div>
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-emeraldBright">
                  ¿Quieres Vender Grupo Volia?
                </div>
                <div className="text-xs text-slate-200">
                  Únete como Asesor o Líder de Célula Comercial
                </div>
              </div>
              <Link
                href="/vendedores"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-emeraldBright hover:bg-brand-emerald text-swiss-pine hover:text-white font-extrabold text-xs transition-all"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Portal de Bienvenida para Vendedores</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="mt-5 max-w-3xl mx-auto">
            <TechGlossaryBar terms={["LOPDP", "AES-256-GCM", "NIIF", "ARCSA", "CIE-10", "UAFE"]} />
          </div>

          {/* 4-Pillar Trust Bar */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
            {[
              {
                title: "Facturación Inteligente SRI · Reintento Auto",
                desc: "Emisión ilimitada ($0 extra por documento). Si el SRI se cae, la suite reintenta sola en segundo plano hasta autorizar sin intervención del usuario.",
                highlight: true,
              },
              {
                title: "10 Demos Vivos por Industria",
                desc: "Demos especializados listos para mostrar al instante: salud, colegios, retail, constructoras, restaurantes, agro, talleres, farmacias y más.",
                highlight: false,
              },
              {
                title: "Migración Inteligente IA + 10 Módulos",
                desc: "Migra datos de todos los módulos desde Excel, Contífico, Perseo, IESS o Buk con IA y edición manual. Cada módulo funciona solo o interconectado sin fallos.",
                highlight: false,
              },
              {
                title: "Blindaje LOPDP AES-256-GCM",
                desc: "Datos clínicos, escolares, firmas .p12 y contables cifrados bajo estándares bancarios y aislamiento multi-tenant.",
                highlight: false,
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`p-3.5 rounded-2xl border flex items-start gap-2.5 ${
                  item.highlight
                    ? "bg-brand-emeraldSoft/70 border-brand-emerald/40"
                    : "bg-swiss-canvas border-slate-200/90"
                }`}
              >
                {item.highlight ? (
                  <RefreshCw className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-xs font-extrabold text-swiss-pine">{item.title}</div>
                  <div className="text-[11px] text-slate-600 leading-snug mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =================================================================== */}
        {/* WEB 12-A BENTO GRID (3 COLUMNS: SRI+INV | VWAP QUANT | DOBLE AGENTE) */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* COLUMN 1: Facturación SRI, Retenciones & Inventario (3 cols) */}
          <div className="lg:col-span-3 swiss-card rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-brand-emeraldSoft border border-brand-emerald/30 text-brand-emerald font-mono font-bold text-xs flex items-center justify-center">
                    1
                  </span>
                  <h2 className="text-sm font-bold text-swiss-pine">
                    SRI, Retenciones & Stock
                  </h2>
                </div>
                <FileCheck2 className="w-4 h-4 text-brand-emerald" />
              </div>
              <p className="text-[11px] text-slate-500 mb-4">
                Firma XAdES-BES, Retención IVA & Kardex API
              </p>

              {/* Emerald Status Pills */}
              <div className="space-y-2 mb-5">
                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-swiss-canvas border border-slate-200">
                  <span className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald" />
                    Firma XAdES-BES
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-brand-emerald text-white font-mono font-bold text-[10px]">
                    Autorizado
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-swiss-canvas border border-slate-200">
                  <span className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald" />
                    Retención IVA Prov.
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-brand-emerald text-white font-mono font-bold text-[10px]">
                    En Línea ✓
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-swiss-canvas border border-slate-200">
                  <span className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 text-brand-emerald" />
                    Reintento Auto SRI
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-brand-emerald text-white font-mono font-bold text-[10px]">
                    2do Plano ✓
                  </span>
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-swiss-canvas border border-slate-200">
                  <span className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald" />
                    Inventario POS API
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-brand-emeraldSoft text-brand-pine border border-brand-emerald/30 font-mono font-bold text-[10px]">
                    Sincronizado
                  </span>
                </div>
              </div>

              {/* Invoice & Inventory Ledger */}
              <div className="text-[11px] font-mono font-bold uppercase text-slate-500 mb-2">
                Libro Electrónico en Vivo
              </div>
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-swiss-canvas border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-swiss-pine">FAC 001-002-001482</div>
                    <div className="text-[10px] text-slate-500 font-mono">SRI + Descarga Stock ✓</div>
                  </div>
                  <span className="text-xs font-mono font-bold text-brand-emerald tabular-nums">
                    +$1,480.00
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-swiss-canvas border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-swiss-pine">RET-IVA 001-002-419</div>
                    <div className="text-[10px] text-slate-500 font-mono">Proveedor Nacional 30%/70%</div>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-700 tabular-nums">
                    -$124.50
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-swiss-canvas border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-swiss-pine">KARDEX · SKU-8842</div>
                    <div className="text-[10px] text-slate-500 font-mono">Sync POS Ecuador · 128 uds</div>
                  </div>
                  <span className="text-xs font-mono font-bold text-brand-emerald tabular-nums">
                    Activo
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowSriModal(true)}
              className="mt-4 w-full py-2.5 px-3 rounded-xl bg-white hover:bg-brand-emeraldSoft border border-slate-300 hover:border-brand-emerald text-xs font-bold text-swiss-pine flex items-center justify-center gap-1.5 transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-brand-emerald" />
              <span>Ver Demo SRI, Retención & Stock →</span>
            </button>
          </div>

          {/* COLUMN 2 (WIDE CENTER): VWAP Quant Oracle & Telemetry (6 cols) */}
          <div className="lg:col-span-6 swiss-card rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-brand-emeraldSoft border border-brand-emerald/30 text-brand-emerald font-mono font-bold text-xs flex items-center justify-center">
                    2
                  </span>
                  <h2 className="text-sm font-bold text-swiss-pine">
                    VWAP Quant Oracle & Telemetry
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono font-extrabold text-swiss-pine tabular-nums">
                    {currentData.price}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-brand-emeraldSoft text-brand-emerald border border-brand-emerald/30 font-mono font-bold text-[11px]">
                    {currentData.delta}
                  </span>
                </div>
              </div>

              {/* Interactive Sector Pills */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {(Object.keys(presets) as TelemetryPresetKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActivePreset(key)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all border ${
                      activePreset === key
                        ? "bg-brand-emerald text-white border-brand-emerald shadow-sm"
                        : "bg-swiss-canvas text-slate-600 border-slate-200 hover:border-brand-emerald/40"
                    }`}
                  >
                    {presets[key].badge}
                  </button>
                ))}
              </div>

              {/* Interactive SVG Candlestick + VWAP Band Chart */}
              <div className="rounded-xl bg-swiss-canvas border border-slate-200 p-3 relative">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-600 mb-2">
                  <span className="font-semibold text-swiss-pine">{currentData.title}</span>
                  <span className="text-brand-emerald font-bold">● Live Engine</span>
                </div>

                {hoveredCandle !== null && (
                  <div className="mb-2 px-2.5 py-1 rounded-lg bg-white border border-brand-emerald/40 text-[11px] font-mono text-swiss-pine flex items-center justify-between shadow-sm">
                    <span>
                      Periodo: <strong>{currentData.candles[hoveredCandle].label}</strong>
                    </span>
                    <span>
                      Cierre: <strong className="text-brand-emerald">{currentData.candles[hoveredCandle].close}</strong> · VWAP:{" "}
                      <strong>{currentData.candles[hoveredCandle].vwap}</strong>
                    </span>
                  </div>
                )}

                <div className="w-full overflow-hidden">
                  <svg
                    viewBox="0 0 420 185"
                    className="w-full h-48 sm:h-52 select-none"
                    role="img"
                    aria-label="Gráfico cuantitativo VWAP y velas en vivo"
                  >
                    <defs>
                      <linearGradient id="vwapEmeraldFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity="0.28" />
                        <stop offset="100%" stopColor="#10B981" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>

                    {[30, 65, 100, 135].map((y) => (
                      <line
                        key={y}
                        x1="8"
                        y1={y}
                        x2="412"
                        y2={y}
                        stroke="#E2E8F0"
                        strokeDasharray="3 3"
                        strokeWidth="1"
                      />
                    ))}

                    <polygon points={vwapAreaPoints} fill="url(#vwapEmeraldFill)" />

                    <polyline
                      fill="none"
                      stroke="#059669"
                      strokeWidth="2.2"
                      points={vwapPoints}
                    />

                    {currentData.candles.map((c, idx) => {
                      const x = 18 + idx * 34;
                      const yHigh = 135 - c.high * 1.15;
                      const yLow = 135 - c.low * 1.15;
                      const yOpen = 135 - c.open * 1.15;
                      const yClose = 135 - c.close * 1.15;
                      const isBull = c.close >= c.open;
                      const bodyTop = Math.min(yOpen, yClose);
                      const bodyH = Math.max(4, Math.abs(yClose - yOpen));
                      const volH = c.vol * 0.34;

                      return (
                        <g
                          key={c.label}
                          onMouseEnter={() => setHoveredCandle(idx)}
                          onMouseLeave={() => setHoveredCandle(null)}
                          className="cursor-pointer"
                        >
                          <line
                            x1={x}
                            y1={yHigh}
                            x2={x}
                            y2={yLow}
                            stroke={isBull ? "#059669" : "#062016"}
                            strokeWidth="1.5"
                          />
                          <rect
                            x={x - 5}
                            y={bodyTop}
                            width="10"
                            height={bodyH}
                            rx="2"
                            fill={isBull ? "#10B981" : "#064E3B"}
                            opacity={hoveredCandle === idx ? 1 : 0.88}
                          />
                          <rect
                            x={x - 6}
                            y={175 - volH}
                            width="12"
                            height={volH}
                            rx="2"
                            fill={isBull ? "#10B981" : "#64748B"}
                            opacity={hoveredCandle === idx ? 0.9 : 0.45}
                          />
                          <text
                            x={x}
                            y="184"
                            textAnchor="middle"
                            fontSize="8"
                            fill="#64748B"
                            fontFamily="monospace"
                          >
                            {c.label}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                  <span className="text-slate-600">{currentData.volumeLabel}</span>
                  <span className="text-brand-pine font-bold">{currentData.targetRatio}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
              <span className="text-xs font-mono text-slate-600 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-brand-emerald" />
                <span>{currentData.riskRule}</span>
              </span>
              <a
                href="#algoritmos-cuantitativos"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-emerald hover:bg-brand-pine text-white font-bold text-xs transition-all"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Simular en mi Empresa →</span>
              </a>
            </div>
          </div>

          {/* COLUMN 3: Copiloto IA Interno · Para Empleados y Gerencia (3 cols) */}
          <div className="lg:col-span-3 swiss-card rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-brand-emeraldSoft border border-brand-emerald/30 text-brand-emerald font-mono font-bold text-xs flex items-center justify-center">
                    3
                  </span>
                  <h2 className="text-sm font-bold text-swiss-pine">Copiloto IA Interno</h2>
                </div>
                <Bot className="w-4 h-4 text-brand-emerald" />
              </div>
              <p className="text-[11px] text-slate-500 mb-3">
                Exclusivo para tu equipo (1,500 consultas/m incluidas)
              </p>

              <div className="p-3 rounded-xl bg-swiss-canvas border border-slate-200 mb-3">
                <div className="text-[10px] font-mono font-bold text-brand-pine mb-1.5">
                  Asistente Integrado en tus Módulos
                </div>
                <div className="text-[11px] font-mono text-slate-600 space-y-1 leading-tight">
                  <div>✓ Pre-llena facturas y retenciones SRI</div>
                  <div>✓ Alerta quiebres de stock en Inventario</div>
                  <div>✓ Explica balances NIIF en español claro</div>
                  <div>✓ Nombre personalizable para tu empresa</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-swiss-canvas border border-slate-200 mb-3">
                <div className="text-[10px] font-mono font-bold text-slate-500 uppercase mb-1">
                  Respuesta en Vivo del Copiloto:
                </div>
                <p className="text-[11px] text-swiss-pine leading-relaxed mb-2">
                  {quickReply}
                </p>
                <form onSubmit={handleQuickPrompt} className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={quickPrompt}
                    onChange={(e) => setQuickPrompt(e.target.value)}
                    placeholder="Prueba preguntar algo..."
                    className="flex-1 min-w-0 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-[11px] text-swiss-pine focus:outline-none focus:border-brand-emerald"
                  />
                  <button
                    type="submit"
                    className="p-1.5 rounded-lg bg-brand-emerald text-white hover:bg-brand-pine transition-colors"
                    aria-label="Probar prompt"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-brand-emeraldSoft border border-brand-emerald/20 text-[11px] font-semibold text-brand-pine">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald shrink-0" />
                  <span>100% dentro de tus módulos</span>
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-brand-emeraldSoft border border-brand-emerald/20 text-[11px] font-semibold text-brand-pine">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald shrink-0" />
                  <span>Ponle el nombre que tú elijas</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenChat}
              className="mt-4 w-full py-2.5 px-3 rounded-xl bg-swiss-pine hover:bg-brand-pine text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-emeraldBright" />
              <span>Hablar con Anna IA →</span>
            </button>
          </div>
        </div>
      </div>

      {/* INTERACTIVE MODAL: DEMO FACTURACIÓN SRI, RETENCIONES IVA & INVENTARIO */}
      {showSriModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setShowSriModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-brand-emeraldSoft text-brand-emerald border border-brand-emerald/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-brand-emerald uppercase">
                  MÓDULOS CONECTADOS · SRI ECUADOR & KARDEX API
                </span>
                <h3 className="text-xl font-bold text-swiss-pine">
                  Flujo Automático: Factura + Retención Proveedor + Inventario
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
              <div className="p-4 rounded-2xl bg-swiss-canvas border border-slate-200 space-y-2">
                <div className="text-xs font-mono font-bold text-brand-pine uppercase">
                  1. Facturación & Retención de IVA Proveedores
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <div>• Firma digital con archivo `.p12` (XAdES-BES) directa al SRI</div>
                  <div>• <strong>Retención de IVA (30%/70%/100%) y Renta en la fuente</strong> para proveedores nacionales</div>
                  <div>• Comprobantes XML + RIDE PDF enviados al instante</div>
                  <div>• Acumulación automática en Anexo ATS y Libro Diario</div>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-brand-emeraldSoft/60 border border-brand-emerald/30 space-y-2">
                <div className="text-xs font-mono font-bold text-brand-emerald uppercase">
                  2. Inventario Fácil & Conexión POS Ecuador
                </div>
                <div className="text-xs text-slate-700 space-y-1">
                  <div>• Carga sencilla por formulario o plantilla Excel/CSV</div>
                  <div>• Descuento automático de stock al facturar o vender</div>
                  <div>• Conectable vía API con los sistemas de venta/POS más usados en Ecuador</div>
                  <div>• Alertas de reposición de stock generadas por tu Agente IA</div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
              <span className="text-xs text-slate-600">
                Disponible en <strong>Módulo Individual ($35/m)</strong> y{" "}
                <strong className="text-brand-emerald">Suite Completa ($69/m)</strong>.
              </span>
              <a
                href="#tarifario-calculadora"
                onClick={() => setShowSriModal(false)}
                className="px-4 py-2.5 rounded-xl bg-brand-emerald text-white font-bold text-xs hover:bg-brand-pine transition-all"
              >
                Calcular Costo para mi Empresa →
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
