"use client";

import { useState, useMemo } from "react";
import {
  Calculator,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  ArrowDownRight,
  Landmark,
  Shield,
} from "lucide-react";

type HorizonKey = "mayo" | "junio" | "agosto" | "cuotas12";
type CircuitKey = "usa" | "ecuador";

interface InteractiveLoanSimulatorProps {
  onConfirmSelection?: (amount: number, circuit: CircuitKey, horizonLabel: string) => void;
}

export default function InteractiveLoanSimulator({
  onConfirmSelection,
}: InteractiveLoanSimulatorProps) {
  const [amount, setAmount] = useState<number>(5000);
  const [horizon, setHorizon] = useState<HorizonKey>("mayo");
  const [circuit, setCircuit] = useState<CircuitKey>("usa");
  const [salesPerMonth, setSalesPerMonth] = useState<number>(2);
  const [showSchedule, setShowSchedule] = useState<boolean>(false);

  const horizonOptions: Record<
    HorizonKey,
    { label: string; months: number; aprText: string; badge: string; desc: string }
  > = {
    mayo: {
      label: "Pre-Pago Mayo (~5m)",
      months: 5,
      aprText: "28.8%",
      badge: "Pre-Pago VIP Máximo",
      desc: "Recibes tu capital + los +12% intereses completos al liquidar en Mayo.",
    },
    junio: {
      label: "Pre-Pago Junio (~6m)",
      months: 6,
      aprText: "24.0%",
      badge: "Cierre Q2",
      desc: "Recibes tu capital + los +12% intereses completos al liquidar en Junio.",
    },
    agosto: {
      label: "Pre-Pago Agosto (~8m)",
      months: 8,
      aprText: "18.0%",
      badge: "Intermedio",
      desc: "Cuotas Marzo–Julio recibidas + liquidación total en Agosto con los +12% completos.",
    },
    cuotas12: {
      label: "12 Cuotas (Mar–Feb)",
      months: 12,
      aprText: "10.3%",
      badge: "Cronograma Estándar",
      desc: "12 pagos mensuales iguales desde Marzo hasta Febrero Año 2.",
    },
  };

  const selectedHorizon = horizonOptions[horizon];
  const fixedInterest = Math.round(amount * 0.12 * 100) / 100;
  const totalReturn = Math.round((amount + fixedInterest) * 100) / 100;
  const monthlyQuota = Math.round((totalReturn / 12) * 100) / 100;

  // Comparison vs traditional bank CD / Póliza (~6.5% annual)
  const bankCdGain =
    Math.round(amount * 0.065 * (selectedHorizon.months / 12) * 100) / 100;
  const advantageMultiple =
    bankCdGain > 0 ? (fixedInterest / bankCdGain).toFixed(1) : "4.4";

  // 12-month amortization schedule for selected amount
  const scheduleRows = useMemo(() => {
    const monthsLabels = [
      "Dic (Gracia)",
      "Ene (Gracia)",
      "Feb (Gracia)",
      "Mar · Cuota #01",
      "Abr · Cuota #02",
      "May · Cuota #03*",
      "Jun · Cuota #04*",
      "Jul · Cuota #05*",
      "Ago · Cuota #06*",
      "Sep · Cuota #07",
      "Oct · Cuota #08",
      "Nov · Cuota #09",
      "Dic · Cuota #10",
      "Ene Y2 · Cuota #11",
      "Feb Y2 · Cuota #12",
    ];
    let balance = totalReturn;
    return monthsLabels.map((period, idx) => {
      if (idx < 3) {
        return {
          period,
          note: idx === 0 ? "Desembolso / Prep." : "Lanzamiento campaña",
          payment: 0,
          balance,
          prepay: false,
        };
      }
      const cuotaNum = idx - 2;
      const isLast = cuotaNum === 12;
      const payment = isLast ? Math.round(balance * 100) / 100 : monthlyQuota;
      balance = isLast ? 0 : Math.max(0, Math.round((balance - payment) * 100) / 100);
      return {
        period,
        note: cuotaNum >= 3 ? "Pre-pago total habilitado*" : "Pago mensual regular",
        payment,
        balance,
        prepay: cuotaNum >= 3 && cuotaNum <= 6,
      };
    });
  }, [totalReturn, monthlyQuota]);

  // Dynamic 12-month SaaS projection simulator based on salesPerMonth (1..4)
  // Aligns exact unit economics: $108 net cash on Month 1 of each new PYME ($69 + $120 - $69 - $12),
  // $55.20 net recurring Months 2-12, subtracting natural churn (~1 client every 4 months in conservative base).
  const saasProjection = useMemo(() => {
    const quota = monthlyQuota;
    let activeBase = 0;
    const rows = [];
    for (let m = 1; m <= 12; m++) {
      const churn = m % 4 === 0 && activeBase > 2 ? 1 : 0;
      const existingBeforeNew = Math.max(0, activeBase - churn);
      const newClients = salesPerMonth;
      const netFromNew = newClients * 108;
      const netFromExisting = existingBeforeNew * 55.2;
      const netCash = Math.round((netFromNew + netFromExisting) * 100) / 100;
      activeBase = existingBeforeNew + newClients;
      const monthlyPayment = m <= 2 ? 0 : quota;
      const coverage =
        monthlyPayment > 0 ? Math.round((netCash / monthlyPayment) * 100) : 100;
      rows.push({
        month: `M${m}`,
        active: activeBase,
        netCash,
        monthlyPayment,
        coverage,
      });
    }
    const breakEvenMonth = rows.find((r) => r.monthlyPayment > 0 && r.netCash >= r.monthlyPayment);
    const m12 = rows[11];
    return { rows, breakEvenMonth, m12 };
  }, [salesPerMonth, monthlyQuota]);

  return (
    <section id="simulador" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Top Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-emeraldSoft border border-brand-emerald/30 text-brand-pine text-xs font-mono font-bold mb-3">
              <Calculator className="w-3.5 h-3.5 text-brand-emerald" />
              <span>SIMULADOR INTERACTIVO DE RETORNO & PRE-PAGO VIP</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-swiss-pine tracking-tight">
              Calcula Tu Ganancia Exacta{" "}
              <span className="text-brand-emerald">Según Monto y Plazo</span>
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Puedes financiar los <strong>$5,000 USD completos</strong> o entrar en un tramo
              desde <strong>$1,000 USD</strong> bajo las mismas condiciones: interés fijo
              garantizado del <strong>+12%</strong> y pre-pago anticipado habilitado desde{" "}
              <strong>Mayo</strong> sin perder un centavo de interés.
            </p>
          </div>

          <div className="rounded-2xl bg-brand-emeraldSoft border border-brand-emerald/30 p-4 max-w-md text-xs text-slate-700 leading-relaxed">
            <strong className="text-swiss-pine block mb-1">
              ¿Por qué tomar este puente al 12% en lugar de usar depósitos a plazo?
            </strong>
            Es más económico asumir <strong>+$600</strong> por este puente comercial para
            capturar el Q1 fiscal de Ecuador que romper depósitos a largo plazo antes de
            vencimiento, pagar penalidades bancarias y perder los intereses ya acumulados.
          </div>
        </div>

        {/* Main Interactive Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 swiss-card rounded-3xl p-6 sm:p-7 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono font-bold uppercase text-slate-500">
                  1. Monto de Tu Participación (USD)
                </label>
                <span className="text-xl font-extrabold text-swiss-pine tabular-nums">
                  ${amount.toLocaleString()} USD
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[1000, 2000, 2500, 5000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setAmount(preset)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all tabular-nums ${
                      amount === preset
                        ? "bg-swiss-pine text-white border-brand-emerald shadow-sm"
                        : "bg-swiss-canvas hover:bg-brand-emeraldSoft text-swiss-pine border-slate-200"
                    }`}
                  >
                    ${preset.toLocaleString()}
                  </button>
                ))}
              </div>
              <input
                type="range"
                min={500}
                max={5000}
                step={250}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full accent-brand-emerald cursor-pointer"
                aria-label="Monto de participación en dólares"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
                <span>$500</span>
                <span>$2,500</span>
                <span>$5,000 (Ronda Completa)</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-mono font-bold uppercase text-slate-500 block mb-2.5">
                2. Escenario de Liquidación / Pre-Pago VIP
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(horizonOptions) as HorizonKey[]).map((key) => {
                  const opt = horizonOptions[key];
                  const active = horizon === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setHorizon(key)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        active
                          ? "bg-brand-emeraldSoft border-brand-emerald text-swiss-pine shadow-sm"
                          : "bg-white hover:bg-slate-50 border-slate-200 text-slate-600"
                      }`}
                    >
                      <div className="text-[10px] font-mono font-bold uppercase text-brand-emerald">
                        {opt.aprText} APR Real
                      </div>
                      <div className="text-xs font-bold text-swiss-pine mt-0.5">
                        {opt.label}
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                {selectedHorizon.desc}
              </p>
            </div>

            <div>
              <label className="text-xs font-mono font-bold uppercase text-slate-500 block mb-2.5">
                3. Circuito Bancario Preferido
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setCircuit("usa")}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    circuit === "usa"
                      ? "bg-swiss-pine text-white border-brand-emerald"
                      : "bg-swiss-canvas border-slate-200 text-swiss-pine"
                  }`}
                >
                  <div className="text-xs font-bold">EE.UU. (BoA / Zelle)</div>
                  <div
                    className={`text-[11px] mt-0.5 ${
                      circuit === "usa" ? "text-brand-emeraldBright" : "text-slate-500"
                    }`}
                  >
                    Recomendado · 0% ISD
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setCircuit("ecuador")}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    circuit === "ecuador"
                      ? "bg-swiss-pine text-white border-brand-emerald"
                      : "bg-swiss-canvas border-slate-200 text-swiss-pine"
                  }`}
                >
                  <div className="text-xs font-bold">Ecuador (Banco Guayaquil)</div>
                  <div
                    className={`text-[11px] mt-0.5 ${
                      circuit === "ecuador" ? "text-brand-emeraldBright" : "text-slate-500"
                    }`}
                  >
                    Repago local sin giros
                  </div>
                </button>
              </div>
            </div>

            <a
              href="#confirmar"
              onClick={() =>
                onConfirmSelection?.(amount, circuit, selectedHorizon.label)
              }
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-brand-emerald hover:bg-brand-pine text-white font-bold text-sm transition-all shadow-md"
            >
              <span>Reservar / Consultar Tramo de ${amount.toLocaleString()}</span>
              <ArrowDownRight className="w-4 h-4" />
            </a>
          </div>

          {/* Live Results & Comparison Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="rounded-3xl bg-swiss-pine text-white p-6 sm:p-7 border border-brand-emerald/40 shadow-xl space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-4">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase text-brand-emeraldBright">
                    RESUMEN GARANTIZADO PARA TU PARTICIPACIÓN
                  </span>
                  <h3 className="text-2xl font-extrabold text-white mt-0.5">
                    Recibes ${totalReturn.toLocaleString("en-US", { minimumFractionDigits: 2 })} USD
                  </h3>
                </div>
                <span className="px-3 py-1.5 rounded-xl bg-brand-emerald/25 border border-brand-emeraldBright/40 text-brand-emeraldLight font-mono text-xs font-bold">
                  {selectedHorizon.badge} · {selectedHorizon.aprText} Anual
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-swiss-pineMid border border-white/10 p-4">
                  <div className="text-[11px] font-mono text-slate-300 uppercase">
                    Ganancia Neta (+12%)
                  </div>
                  <div className="text-2xl font-extrabold text-brand-emeraldBright mt-1 tabular-nums">
                    +${fixedInterest.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1">
                    Íntegra incluso con pre-pago
                  </div>
                </div>

                <div className="rounded-2xl bg-swiss-pineMid border border-white/10 p-4">
                  <div className="text-[11px] font-mono text-slate-300 uppercase">
                    Cuota Mensual (Mar+)
                  </div>
                  <div className="text-2xl font-extrabold text-white mt-1 tabular-nums">
                    ${monthlyQuota.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1">
                    Gracia Dic–Feb ($0 cuota)
                  </div>
                </div>

                <div className="rounded-2xl bg-swiss-pineMid border border-white/10 p-4">
                  <div className="text-[11px] font-mono text-slate-300 uppercase">
                    Tu Riesgo / Cobertura
                  </div>
                  <div className="text-2xl font-extrabold text-white mt-1 tabular-nums">
                    {((5000 / amount) * 19.4).toFixed(1)}x
                  </div>
                  <div className="text-[11px] text-slate-300 mt-1">
                    Cobertura Micro1 BoA vs cuota
                  </div>
                </div>
              </div>

              {/* Bank CD / Póliza comparison bar */}
              <div className="rounded-2xl bg-swiss-pineMid/80 border border-white/15 p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Landmark className="w-4 h-4 text-brand-emeraldBright" />
                    Comparativa en {selectedHorizon.months} meses: Puente Volia vs. Póliza Banco (~6.5%/año)
                  </span>
                  <span className="font-mono font-bold text-brand-emeraldBright">
                    {advantageMultiple}x más rendimiento
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-brand-emeraldLight font-bold">Grupo Volia (Fijo +12%)</span>
                      <span className="font-mono font-bold text-white">+${fixedInterest.toFixed(2)} USD</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full rounded-full bg-brand-emeraldBright w-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-300">Póliza / CDT Bancario (~6.5% anual en {selectedHorizon.months}m)</span>
                      <span className="font-mono text-slate-300">+${bankCdGain.toFixed(2)} USD</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-slate-400"
                        style={{
                          width: `${Math.max(8, Math.round((bankCdGain / fixedInterest) * 100))}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Toggle full 12-installment schedule */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowSchedule((prev) => !prev)}
                  className="text-xs font-mono font-bold text-brand-emeraldBright hover:underline"
                >
                  {showSchedule
                    ? "▲ Ocultar Cronograma Mensual Detallado"
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
                        {scheduleRows.map((row, idx) => (
                          <tr
                            key={idx}
                            className={
                              row.prepay
                                ? "bg-brand-emeraldSoft/70 border-t border-slate-200"
                                : "border-t border-slate-100"
                            }
                          >
                            <td className="py-2 px-3 font-semibold">{row.period}</td>
                            <td className="py-2 px-3 text-slate-600">{row.note}</td>
                            <td className="py-2 px-3 text-right font-mono font-bold">
                              ${row.payment.toFixed(2)}
                            </td>
                            <td className="py-2 px-3 text-right font-mono">
                              ${row.balance.toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Secondary Interactive Widget: SaaS Scale Slider (1 to 4 sales/mo) */}
            <div className="swiss-card rounded-3xl p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-mono font-bold text-brand-emerald uppercase flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Simulador de Repago Propio del SaaS (Sin Tocar Ingresos USA)</span>
                  </div>
                  <h4 className="text-base font-extrabold text-swiss-pine mt-0.5">
                    Ritmo de Cierres Comerciales: {salesPerMonth} {salesPerMonth === 1 ? "PYME" : "PYMEs"} / mes
                  </h4>
                </div>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setSalesPerMonth(rate)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        salesPerMonth === rate
                          ? "bg-brand-emerald text-white border-brand-emerald"
                          : "bg-swiss-canvas text-slate-600 border-slate-200 hover:border-brand-emerald/40"
                      }`}
                    >
                      {rate}/m
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="rounded-2xl bg-swiss-canvas border border-slate-200 p-3.5">
                  <div className="text-slate-500">Punto de Auto-Sostenibilidad</div>
                  <div className="text-lg font-extrabold text-brand-pine mt-0.5">
                    {saasProjection.breakEvenMonth
                      ? `${saasProjection.breakEvenMonth.month} (${saasProjection.breakEvenMonth.active} empresas)`
                      : "Apoyo Micro1 BoA"}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    El flujo SaaS cubre el 100% de tu cuota
                  </div>
                </div>

                <div className="rounded-2xl bg-swiss-canvas border border-slate-200 p-3.5">
                  <div className="text-slate-500">Flujo Neto SaaS (Mes 12)</div>
                  <div className="text-lg font-extrabold text-swiss-pine mt-0.5 tabular-nums">
                    ${saasProjection.m12.netCash.toLocaleString("en-US", { minimumFractionDigits: 0 })}/mes
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {saasProjection.m12.active} empresas activas netas (post-churn)
                  </div>
                </div>

                <div className="rounded-2xl bg-brand-emeraldSoft border border-brand-emerald/30 p-3.5">
                  <div className="text-brand-pine font-semibold">Cobertura SaaS en Mes 12</div>
                  <div className="text-lg font-extrabold text-brand-emerald mt-0.5 tabular-nums">
                    {(saasProjection.m12.netCash / monthlyQuota).toFixed(1)}x tu cuota
                  </div>
                  <div className="text-[11px] text-brand-pine">
                    Base conservadora (2/m) = 22 empresas = 3.3x
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 text-[11px] text-slate-500 pt-1">
                <Shield className="w-3.5 h-3.5 text-brand-emerald shrink-0 mt-0.5" />
                <span>
                  Base unitaria Suite PYME ($69/m + $120 Setup): Mes 1 deja +$108 netos tras comisión del asesor; Mes 2–12 deja $55.20/m (~80% margen); desde el Mes 13 sube a ~$66/m (~95%).
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
