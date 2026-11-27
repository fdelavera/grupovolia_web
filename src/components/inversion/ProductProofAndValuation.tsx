"use client";

import { useState } from "react";
import {
  Layers,
  Code2,
  ArrowUpRight,
  CheckCircle2,
  MonitorPlay,
  ExternalLink,
} from "lucide-react";
import {
  ASSET_BREAKDOWN,
  SCREENSHOT_GALLERY,
  LIVE_DEMOS,
} from "@/data/inversionData";

export default function ProductProofAndValuation() {
  const [selectedShotId, setSelectedShotId] = useState(SCREENSHOT_GALLERY[0].id);
  const currentShot =
    SCREENSHOT_GALLERY.find((s) => s.id === selectedShotId) || SCREENSHOT_GALLERY[0];

  const valuationBars = [
    { label: "Costo en efectivo asumido", value: 3000, max: 85000, text: "~$3,000", color: "bg-slate-500" },
    { label: "Inversión en promoción solicitada", value: 5000, max: 85000, text: "$5,000", color: "bg-amber-500" },
    { label: "Valor reemplazo conservador", value: 55000, max: 85000, text: "$55,000", color: "bg-brand-emerald" },
    { label: "Valor agencia completa", value: 85000, max: 85000, text: "$85,000", color: "bg-swiss-pine" },
  ];

  const codeMetrics = [
    { val: "73,582", label: "Líneas TypeScript / React" },
    { val: "214", label: "Archivos de Producción" },
    { val: "73", label: "API Endpoints Activos" },
    { val: "10 + 10", label: "Módulos ERP & Demos Vivos" },
    { val: "169", label: "Activos Legales, Guías & Clips" },
    { val: "~650 h", label: "Ingeniería Senior Sin Deuda" },
  ];

  return (
    <section
      id="activo-tecnologico"
      className="py-20 bg-swiss-canvas border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Part 1: Asset Valuation ($55k-$85k vs $5k Loan) */}
        <div>
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-emerald/30 text-brand-pine text-xs font-mono font-bold mb-3 shadow-sm">
              <Code2 className="w-3.5 h-3.5 text-brand-emerald" />
              <span>VALORACIÓN REAL DEL ACTIVO CONSTRUIDO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-swiss-pine tracking-tight">
              La inversión en promoción ($5,000) equivale a{" "}
              <span className="text-brand-emerald">menos del 10%</span> del software ya creado
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Construir desde cero una plataforma multi-tenant con facturación SRI Auto-Retry,
              conciliación para 61 bancos ecuatorianos, inventarios mixtos NIIF, nómina IESS y
              portales White-Label cuesta entre <strong>$55,000 y $85,000 USD</strong> en el
              mercado. Todo ese desarrollo ya se ejecutó sin deuda laboral ni cesión de equity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Visual Bars + Repository Inventory */}
            <div className="lg:col-span-5 space-y-5">
              <div className="swiss-card rounded-3xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-swiss-pine uppercase tracking-wide font-mono">
                  Comparativa: Inversión en Promoción vs. Valor de Reemplazo
                </h3>
                <div className="space-y-4">
                  {valuationBars.map((bar) => {
                    const pct = Math.max(4, Math.round((bar.value / bar.max) * 100));
                    return (
                      <div key={bar.label} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-semibold">
                          <span className="text-slate-700">{bar.label}</span>
                          <span className="font-mono font-bold text-swiss-pine">{bar.text}</span>
                        </div>
                        <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${bar.color}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-3xl bg-swiss-pine text-white p-6 border border-brand-emerald/40 shadow-lg">
                <div className="text-xs font-mono font-bold text-brand-emeraldBright uppercase mb-4">
                  Inventario Real Auditado en Repositorios
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3.5">
                  {codeMetrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl bg-swiss-pineMid border border-white/10 p-3"
                    >
                      <div className="text-lg font-extrabold text-white tabular-nums">
                        {m.val}
                      </div>
                      <div className="text-[11px] text-slate-300 leading-tight mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Table: Cost vs Market Replacement Value */}
            <div className="lg:col-span-7 space-y-5">
              <div className="swiss-card rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-swiss-pine text-white">
                        <th className="py-3.5 px-4 font-bold">Componente ya Construido</th>
                        <th className="py-3.5 px-4 font-bold">Costo Real Pagado*</th>
                        <th className="py-3.5 px-4 font-bold">Valor Comercial / Agencia</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ASSET_BREAKDOWN.map((row, idx) => (
                        <tr
                          key={idx}
                          className={
                            row.highlight
                              ? "bg-brand-emeraldSoft border-t-2 border-brand-emerald font-bold text-swiss-pine"
                              : idx % 2 === 0
                              ? "bg-white border-t border-slate-100"
                              : "bg-slate-50/70 border-t border-slate-100"
                          }
                        >
                          <td className="py-3.5 px-4 font-semibold text-swiss-pine">
                            {row.component}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">{row.costAssumed}</td>
                          <td className="py-3.5 px-4 font-mono font-bold text-brand-pine">
                            {row.marketValue}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-2xl bg-brand-emeraldSoft border border-brand-emerald/30 p-5 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-emerald shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong className="text-swiss-pine">
                    *¿Qué significa esto para quien financia los $5,000?
                  </strong>{" "}
                  Además de ~$2,200–$3,000 USD en gastos efectivos ya pagados (constitución SAS,
                  dominios, cloud Pro, APIs y contabilidad), el fundador invirtió ~650 horas de
                  arquitectura full-stack sin generar deuda ni ceder participación accionaria.
                  Cada cliente nuevo genera <strong>~80% de margen recurrente SaaS</strong>{" "}
                  sobre una infraestructura ya pagada y probada.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: Interactive Gallery of Real Product + 1-Click Live Sandboxes */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-emerald/30 text-brand-pine text-xs font-mono font-bold mb-3 shadow-sm">
                <MonitorPlay className="w-3.5 h-3.5 text-brand-emerald" />
                <span>PRUEBA INTERACTIVA DEL SISTEMA EN PRODUCCIÓN</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-swiss-pine tracking-tight">
                No nos creas a ciegas: <span className="text-brand-emerald">toca el software vivo</span>
              </h2>
            </div>

            <a
              href="https://demo.grupovolia.com/demo/demo-comercio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-swiss-pine hover:bg-brand-pine text-white font-bold text-xs transition-all shrink-0"
            >
              <span>Abrir Sandbox Completo en demo.grupovolia.com</span>
              <ArrowUpRight className="w-4 h-4 text-brand-emeraldBright" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Selector List */}
            <div className="lg:col-span-4 space-y-2">
              {SCREENSHOT_GALLERY.map((item) => {
                const active = item.id === currentShot.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedShotId(item.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all ${
                      active
                        ? "bg-swiss-pine text-white border-brand-emerald shadow-md"
                        : "bg-white hover:bg-brand-emeraldSoft/40 text-swiss-pine border-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
                          active
                            ? "bg-brand-emerald/25 text-brand-emeraldBright"
                            : "bg-brand-emeraldSoft text-brand-pine"
                        }`}
                      >
                        {item.badge}
                      </span>
                      <Layers
                        className={`w-4 h-4 ${
                          active ? "text-brand-emeraldBright" : "text-slate-400"
                        }`}
                      />
                    </div>
                    <div className="font-bold text-sm mt-2">{item.title}</div>
                  </button>
                );
              })}
            </div>

            {/* Right Active Screenshot & Direct Link */}
            <div className="lg:col-span-8 swiss-card rounded-3xl p-4 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] font-mono font-bold text-brand-emerald uppercase">
                    {currentShot.badge} · CAPTURA REAL DE PRODUCCIÓN
                  </span>
                  <h3 className="text-lg font-extrabold text-swiss-pine">
                    {currentShot.title}
                  </h3>
                </div>
                <a
                  href={currentShot.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-emerald hover:bg-brand-pine text-white text-xs font-bold transition-all"
                >
                  <span>Abrir esta pantalla en vivo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentShot.src}
                  alt={currentShot.title}
                  className="w-full h-auto object-contain"
                />
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentShot.desc}
              </p>

              {/* Quick Industry Demo Chips */}
              <div className="pt-3 border-t border-slate-200">
                <div className="text-[11px] font-mono font-bold text-slate-500 uppercase mb-2">
                  Acceso Directo por Industria (Sin Registro):
                </div>
                <div className="flex flex-wrap gap-2">
                  {LIVE_DEMOS.map((demo) => (
                    <a
                      key={demo.label}
                      href={demo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-swiss-canvas hover:bg-brand-emeraldSoft border border-slate-200 hover:border-brand-emerald text-xs font-semibold text-swiss-pine transition-all"
                    >
                      <span>{demo.label}</span>
                      <ArrowUpRight className="w-3 h-3 text-brand-emerald" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
