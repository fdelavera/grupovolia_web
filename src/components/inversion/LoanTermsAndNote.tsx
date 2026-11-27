"use client";

import { useState } from "react";
import {
  FileText,
  FileDown,
  CheckCircle2,
  Landmark,
  Shield,
  TrendingUp,
  Eye,
  X,
  Scale,
} from "lucide-react";

const AMORTIZATION_ROWS = [
  { period: "Gracia (Dic – Feb)", note: "Desembolso único íntegro + lanzamiento", payment: "$0.00", balance: "$5,600.00", vip: false },
  { period: "Cuota #01 (Mar)", note: "Arranque repago mensual", payment: "$466.67", balance: "$5,133.33", vip: false },
  { period: "Cuota #02 (Abr)", note: "Flujo regular", payment: "$466.67", balance: "$4,666.66", vip: false },
  { period: "Cuota #03 (May)", note: "Pre-Pago VIP habilitado*", payment: "$466.67", balance: "$4,199.99", vip: true },
  { period: "Cuota #04 (Jun)", note: "Pre-Pago VIP habilitado*", payment: "$466.67", balance: "$3,733.32", vip: true },
  { period: "Cuotas #05–#06 (Jul–Ago)", note: "2 × $466.67 (Pre-Pago VIP*)", payment: "$933.34", balance: "$2,799.98", vip: true },
  { period: "Cuotas #07–#10 (Sep–Dic)", note: "4 × $466.67 (Pre-Pago VIP*)", payment: "$1,866.68", balance: "$933.30", vip: true },
  { period: "Cuota #11 (Ene Año 2)", note: "Penúltima cuota", payment: "$466.67", balance: "$466.63", vip: false },
  { period: "Cuota #12 (Feb Año 2)", note: "Liquidación final", payment: "$466.63", balance: "$0.00", vip: false },
];

const PREPAY_SCENARIOS = [
  { label: "Pre-Pago Mayo (~5 meses)", apr: "28.8% anual", total: "$5,600.00 (+$600)", width: "100%" },
  { label: "Pre-Pago Junio (~6 meses)", apr: "24.0% anual", total: "$5,600.00 (+$600)", width: "84%" },
  { label: "Pre-Pago Agosto (~8 meses)", apr: "18.0% anual", total: "$5,600.00 (+$600)", width: "64%" },
  { label: "12 Cuotas Estándar (Mar–Feb)", apr: "10.3% anual", total: "$5,600.00 (+$600)", width: "38%" },
  { label: "Referencia Póliza Bancaria (~6.5%/año)", apr: "6.5% anual", total: "$5,135–$5,325", width: "22%", muted: true },
];

export default function LoanTermsAndNote() {
  const [showSchedule, setShowSchedule] = useState(false);
  const [noteModalOpen, setNoteModalOpen] = useState(false);

  return (
    <section id="condiciones" className="scroll-mt-24 py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-emeraldSoft border border-brand-emerald/30 text-brand-pine text-xs font-mono font-bold mb-3">
              <FileText className="w-3.5 h-3.5 text-brand-emerald" />
              <span>CONDICIONES OFICIALES · INVERSIÓN EN PROMOCIÓN DE LANZAMIENTO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-swiss-pine tracking-tight">
              Estructura de Repago{" "}
              <span className="text-brand-emerald">($5,000 → $5,600 USD)</span> &amp; Pagaré Legal
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              La propuesta está diseñada sobre un desembolso{" "}
              <strong>íntegro en una sola entrega (lump-sum)</strong> para potenciar la promoción de lanzamiento
              que ya arranca en diciembre con capital propio del fundador y fijar desde el Día 1 el calendario exacto de repago (+12% fijo,
              con pre-pago VIP desde Mayo conservando el 100% de la ganancia).
            </p>
          </div>

          <div className="rounded-2xl bg-brand-emeraldSoft border border-brand-emerald/30 p-4 max-w-md text-xs text-slate-700 leading-relaxed">
            <strong className="text-swiss-pine block mb-1">
              ¿Por qué invitar esta inversión en promoción al 12% en lugar de usar depósitos a plazo?
            </strong>
            Es más económico asumir <strong>+$600</strong> por esta inversión en promoción de lanzamiento para capturar
            el Q1 fiscal de Ecuador que romper depósitos a largo plazo antes de vencimiento, pagar
            penalidades bancarias y perder los intereses ya acumulados.
          </div>
        </div>

        {/* Main Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Official Fixed Terms + Amortization Toggle */}
          <div className="lg:col-span-7 rounded-3xl bg-swiss-pine text-white p-6 sm:p-7 border border-brand-emerald/40 shadow-xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-4">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase text-brand-emeraldBright">
                  RESUMEN DE CONDICIONES PACTADAS
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-0.5">
                  Total Prometido: $5,600.00 USD
                </h3>
              </div>
              <span className="px-3 py-1.5 rounded-xl bg-brand-emerald/25 border border-brand-emeraldBright/40 text-brand-emeraldLight font-mono text-xs font-bold">
                Desembolso Único Íntegro
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-swiss-pineMid border border-white/10 p-4">
                <div className="text-[11px] font-mono text-slate-300 uppercase">
                  Capital Principal
                </div>
                <div className="text-2xl font-extrabold text-white mt-1 tabular-nums">
                  $5,000.00
                </div>
                <div className="text-[11px] text-slate-300 mt-1">
                  Entrega única de golpe
                </div>
              </div>

              <div className="rounded-2xl bg-swiss-pineMid border border-white/10 p-4">
                <div className="text-[11px] font-mono text-slate-300 uppercase">
                  Interés Fijo (+12%)
                </div>
                <div className="text-2xl font-extrabold text-brand-emeraldBright mt-1 tabular-nums">
                  +$600.00
                </div>
                <div className="text-[11px] text-slate-300 mt-1">
                  Íntegro aun con pre-pago
                </div>
              </div>

              <div className="rounded-2xl bg-swiss-pineMid border border-white/10 p-4">
                <div className="text-[11px] font-mono text-slate-300 uppercase">
                  12 Cuotas (Mar–Feb)
                </div>
                <div className="text-2xl font-extrabold text-white mt-1 tabular-nums">
                  $466.67
                </div>
                <div className="text-[11px] text-slate-300 mt-1">
                  Gracia Dic–Feb ($0 cuota)
                </div>
              </div>
            </div>

            {/* Pre-pago VIP scenarios vs bank CD */}
            <div className="rounded-2xl bg-swiss-pineMid/80 border border-white/15 p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Landmark className="w-4 h-4 text-brand-emeraldBright" />
                <span>Rendimiento Anualizado Real Según Fecha de Liquidación (Ganancia Fija +$600)</span>
              </div>
              <div className="space-y-2.5 text-xs">
                {PREPAY_SCENARIOS.map((sc) => (
                  <div key={sc.label}>
                    <div className="flex justify-between gap-2 mb-1">
                      <span className={sc.muted ? "text-slate-300" : "text-brand-emeraldLight font-semibold"}>
                        {sc.label}
                      </span>
                      <span className="font-mono font-bold text-white shrink-0">
                        {sc.apr}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${sc.muted ? "bg-slate-400" : "bg-brand-emeraldBright"}`}
                        style={{ width: sc.width }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expandable 12-installment schedule */}
            <div>
              <button
                type="button"
                onClick={() => setShowSchedule((prev) => !prev)}
                className="text-xs font-mono font-bold text-brand-emeraldBright hover:underline"
              >
                {showSchedule
                  ? "▲ Ocultar Cronograma Mensual de 12 Cuotas"
                  : "▼ Ver Cronograma Exacto Mes a Mes (Gracia Dic–Feb + 12 Cuotas)"}
              </button>

              {showSchedule && (
                <div className="mt-3 rounded-2xl overflow-hidden border border-white/15 bg-white text-swiss-pine max-h-72 overflow-y-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead className="bg-slate-100 sticky top-0">
                      <tr>
                        <th className="py-2 px-3 font-bold">Período</th>
                        <th className="py-2 px-3 font-bold">Referencia</th>
                        <th className="py-2 px-3 font-bold text-right">Cuota USD</th>
                        <th className="py-2 px-3 font-bold text-right">Saldo Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {AMORTIZATION_ROWS.map((row) => (
                        <tr
                          key={row.period}
                          className={
                            row.vip
                              ? "bg-brand-emeraldSoft/70 border-t border-slate-200"
                              : "border-t border-slate-100"
                          }
                        >
                          <td className="py-2 px-3 font-semibold">{row.period}</td>
                          <td className="py-2 px-3 text-slate-600">{row.note}</td>
                          <td className="py-2 px-3 text-right font-mono font-bold">
                            {row.payment}
                          </td>
                          <td className="py-2 px-3 text-right font-mono">{row.balance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Right: Bilingual EC/USA Promissory Note Card + SaaS Coverage Card */}
          <div className="lg:col-span-5 space-y-5">
            {/* Prominent Legal Promissory Note Card */}
            <div className="swiss-card rounded-3xl p-6 sm:p-7 border-2 border-brand-emerald/45 bg-gradient-to-br from-white to-brand-emeraldSoft/50 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="p-2.5 rounded-xl bg-swiss-pine text-brand-emeraldBright shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-brand-emeraldSoft border border-brand-emerald/30 text-[10px] font-mono font-bold uppercase text-brand-pine">
                  Aplicable Ecuador &amp; EE.UU.
                </span>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-swiss-pine leading-snug">
                  Modelo de Pagaré Comercial / Promissory Note
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                  Revisa por adelantado las condiciones legales exactas del instrumento de crédito
                  que firmaremos digitalmente una vez cerrado el acuerdo. Redactado para operar
                  tanto bajo circuito <strong>Ecuador</strong> (Código de Comercio / COGEP) como
                  bajo circuito <strong>EE.UU.</strong> (<em>Commercial Promissory Note</em> + ESIGN Act).
                </p>
              </div>

              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                  <span>
                    <strong>Obligación Solidaria:</strong> Firma corporativa{" "}
                    <strong>GRUPOVOLIA S.A.S.</strong> (RUC 0993410068001) + garante personal solidario{" "}
                    <strong>Francisco de la Vera</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                  <span>
                    <strong>Entrega Única Íntegra:</strong> El plazo inicia contra acreditación del
                    100% acordado en una sola transferencia (BoA/Zelle o Banco de Guayaquil).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                  <span>
                    <strong>Cláusula VIP Pre-Pago &amp; Firma Digital:</strong> Garantiza los +$600
                    completos al acreedor y plena validez por firma digital PDF.
                  </span>
                </li>
              </ul>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setNoteModalOpen(true)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-swiss-pine hover:bg-brand-pine text-white font-bold text-xs transition-all shadow-sm"
                >
                  <Eye className="w-4 h-4 text-brand-emeraldBright" />
                  <span>Leer Pagaré en Pantalla</span>
                </button>
                <a
                  href="/docs/Modelo_Pagare_Internacional_GrupoVolia_2027.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-brand-emerald hover:bg-brand-pine text-white font-bold text-xs transition-all shadow-sm"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Descargar PDF</span>
                </a>
              </div>
            </div>

            {/* SaaS Break-even Milestone Box */}
            <div className="swiss-card rounded-3xl p-6 space-y-3.5">
              <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-brand-emerald uppercase">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Hito de Auto-Sostenibilidad SaaS (Proyección Base 1–3 Ventas/Mes)</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-2xl bg-swiss-canvas border border-slate-200 p-3.5">
                  <div className="text-slate-500">Mes 4 · Equilibrio</div>
                  <div className="text-lg font-extrabold text-brand-pine mt-0.5">
                    7 PYMEs activas
                  </div>
                  <div className="text-[11px] text-slate-600">
                    Flujo neto +$485.25 (104% cuota)
                  </div>
                </div>
                <div className="rounded-2xl bg-brand-emeraldSoft border border-brand-emerald/30 p-3.5">
                  <div className="text-brand-pine font-semibold">Mes 12 · Año 1</div>
                  <div className="text-lg font-extrabold text-brand-emerald mt-0.5">
                    22 PYMEs netas*
                  </div>
                  <div className="text-[11px] text-brand-pine">
                    +$1,533.50/m neto (3.3x cuota)
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2 text-[11px] text-slate-500">
                <Shield className="w-3.5 h-3.5 text-brand-emerald shrink-0 mt-0.5" />
                <span>
                  *Proyección neta tras contemplar ~12% de rotación anual. El servicio de la deuda está cubierto desde el Mes 1 por Micro1 Inc. en Bank of America.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Modal: Full Bilingual EC/USA Promissory Note Viewer */}
      {noteModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-swiss-pine/75 backdrop-blur-sm"
          onClick={() => setNoteModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[88vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-swiss-pine text-white px-6 py-4 flex items-center justify-between gap-4 shrink-0">
              <div>
                <div className="text-[10px] font-mono font-bold text-brand-emeraldBright uppercase">
                  MODELO OFICIAL PREVIO · APLICABLE EN ECUADOR &amp; EE.UU.
                </div>
                <h3 className="text-base sm:text-lg font-extrabold">
                  Pagaré a la Orden / Commercial Promissory Note
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setNoteModalOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Cerrar vista previa"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-brand-emeraldSoft border border-brand-emerald/30">
                  <div className="text-[10px] font-mono font-bold text-brand-emerald uppercase">Principal</div>
                  <div className="font-extrabold text-swiss-pine">US$ 5,000.00 USD (Desembolso Único)</div>
                </div>
                <div className="p-3 rounded-xl bg-brand-emeraldSoft border border-brand-emerald/30">
                  <div className="text-[10px] font-mono font-bold text-brand-emerald uppercase">Interés Fijo (+12%)</div>
                  <div className="font-extrabold text-swiss-pine">+US$ 600.00 · Total: US$ 5,600.00</div>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-300">
                  <div className="text-[10px] font-mono font-bold text-amber-800 uppercase">Campos Editables</div>
                  <div className="font-bold text-amber-900">Se completan tras acordar con el acreedor</div>
                </div>
              </div>

              <div className="space-y-3 border-t border-slate-200 pt-4">
                <p>
                  <strong className="text-swiss-pine">1. Partes Obligadas:</strong>{" "}
                  <strong>GRUPOVOLIA S.A.S.</strong> (RUC Ecuador <code>0993410068001</code>) como
                  Deudor Principal y <strong>Francisco de la Vera</strong> como Codeudor y Garante
                  Solidario Personal, prometen pagar incondicionalmente a la orden de{" "}
                  <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold">
                    [NOMBRE COMPLETO DEL ACREEDOR · ID/RUC/SSN]
                  </span>
                  .
                </p>

                <p>
                  <strong className="text-swiss-pine">2. Promesa Incondicional y Entrega Única Íntegra:</strong>{" "}
                  Total prometido de <strong>US$ 5,600.00</strong> (US$ 5,000.00 capital + US$ 600.00 interés fijo).
                  Es condición esencial que el capital sea entregado por EL ACREEDOR{" "}
                  <strong>de golpe en una sola transferencia íntegra (100% del monto acordado)</strong>. El cómputo
                  de gracia y cuotas nace desde la acreditación efectiva del total desembolsado.
                </p>

                <p>
                  <strong className="text-swiss-pine">3. Circuito Bancario Seleccionado (Marcar uno al suscribir):</strong>{" "}
                  <strong>Opción A (EE.UU., 0% ISD):</strong> Bank of America Checking #898145828511 / Zelle +1 407-205-5921.{" "}
                  <strong>Opción B (Ecuador, Local):</strong> Banco de Guayaquil Cta. Cte. #19156303 (GRUPOVOLIA S.A.S.).
                </p>

                <p>
                  <strong className="text-swiss-pine">4. Gracia, Cuotas y Pre-Pago VIP:</strong>{" "}
                  Gracia de diciembre a febrero ($0.00). Desde marzo, 12 cuotas mensuales consecutivas ($466.67 × 11 + $466.63 cuota #12).
                  Desde <strong>mayo</strong>, LOS DEUDORES pueden liquidar anticipadamente todo el saldo insoluto pagando igualmente{" "}
                  <strong>los US$ 600.00 completos de interés</strong> (completando US$ 5,600.00).
                </p>

                <p>
                  <strong className="text-swiss-pine">5. Solidaridad, Mora y Ley Aplicable Dual (Ecuador / EE.UU.):</strong>{" "}
                  Obligación solidaria con renuncia a protesto y aviso de impago (<em>waiver of presentment, demand, protest, and notice of dishonor</em>).
                  Si el circuito elegido es <strong>EE.UU.</strong>, se interpreta como <em>Unsecured Commercial Promissory Note</em> bajo ley estatal de EE.UU.;
                  si es <strong>Ecuador</strong>, constituye <em>Pagaré a la Orden / Título Ejecutivo</em> conforme al Código de Comercio (Arts. 187–189) y COGEP (Art. 347), con domicilio en Guayaquil / Samborondón.
                  Se reconoce plena validez a la firma electrónica o digital PDF (Ley de Comercio Electrónico EC y ESIGN Act / UETA USA).
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-swiss-canvas border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <span className="text-[11px] text-slate-500">
                Modelo listo para revisar previamente; la versión final se personaliza con tus datos y se firma digitalmente.
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="/docs/Modelo_Pagare_Internacional_GrupoVolia_2027.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-emerald hover:bg-brand-pine text-white font-bold text-xs transition-all"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Descargar PDF Completo (2 Págs.)</span>
                </a>
                <button
                  type="button"
                  onClick={() => setNoteModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
