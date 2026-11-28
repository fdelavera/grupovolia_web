"use client";

import React, { useState } from "react";
import { Calculator, CheckCircle2, Info, Receipt, ShieldCheck } from "lucide-react";

type TaxRegimeId = "regimen_general" | "rimpe_emprendedor" | "sociedad";
type PaymentChannel = "transfer" | "stripe";
type SellerRoleMode = "seller" | "leader";
type ClientBillingMode = "annual" | "monthly";
type PlanTier = "individual" | "suite" | "corp";

const PLAN_TIERS: Record<
  PlanTier,
  { label: string; annualMonthly: number; annualTotal: number; monthlyPrice: number; defaultSetup: number }
> = {
  individual: {
    label: "1 Módulo",
    annualMonthly: 35,
    annualTotal: 420,
    monthlyPrice: 42,
    defaultSetup: 120,
  },
  suite: {
    label: "Suite",
    annualMonthly: 69,
    annualTotal: 828,
    monthlyPrice: 83,
    defaultSetup: 120,
  },
  corp: {
    label: "Corp.",
    annualMonthly: 119,
    annualTotal: 1428,
    monthlyPrice: 143,
    defaultSetup: 250,
  },
};

const TAX_REGIMES: Record<
  TaxRegimeId,
  { label: string; irPct: number; ivaRetPct: number; note: string }
> = {
  regimen_general: {
    label: "Persona Natural · Régimen General",
    irPct: 10,
    ivaRetPct: 0,
    note: "Factura electrónica +15% IVA. Retención Renta 10% (crédito tributario a tu favor en el SRI) · Retención IVA 0%.",
  },
  rimpe_emprendedor: {
    label: "Persona Natural · RIMPE Emprendedor",
    irPct: 1,
    ivaRetPct: 0,
    note: "Factura electrónica +15% IVA (CIIU servicios comerciales). Retención Renta 1% · Retención IVA 0%.",
  },
  sociedad: {
    label: "Sociedad / Compañía",
    irPct: 5,
    ivaRetPct: 0,
    note: "Factura electrónica +15% IVA. Retención Renta 5% · Retención IVA 0%.",
  },
};

const fmt = (n: number) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function SellerCommissionSimulator() {
  const [roleMode, setRoleMode] = useState<SellerRoleMode>("seller");
  const [billingMode, setBillingMode] = useState<ClientBillingMode>("annual");
  const [planTier, setPlanTier] = useState<PlanTier>("suite");
  const [clients, setClients] = useState<number>(6);
  const [setupUsd, setSetupUsd] = useState<number>(120);
  const [paymentChannel, setPaymentChannel] = useState<PaymentChannel>("transfer");
  const [taxRegime, setTaxRegime] = useState<TaxRegimeId>("regimen_general");

  const tier = PLAN_TIERS[planTier];
  const isAnnual = billingMode === "annual";
  const planMonthlyEquivalent = isAnnual ? tier.annualMonthly : tier.monthlyPrice;
  const clientChargeBase = isAnnual ? tier.annualTotal : tier.monthlyPrice;

  const stripeFeeOnCharge =
    paymentChannel === "stripe" ? Number(((clientChargeBase * 1.15) * 0.038 + 0.3).toFixed(2)) : 0;
  const stripeFeeSetup =
    paymentChannel === "stripe" && setupUsd > 0
      ? Number(((setupUsd * 1.15) * 0.038 + 0.3).toFixed(2))
      : 0;

  // Para Mensual: neto sobre M1; para Anual: neto proporcional equivalente a 1 mes
  const netBasePerMonth = isAnnual
    ? Math.max(0, Number(((tier.annualTotal - stripeFeeOnCharge) / 12).toFixed(4)))
    : Math.max(0, Number((tier.monthlyPrice - stripeFeeOnCharge).toFixed(2)));
  const netBaseSetupPerClient = Math.max(0, Number((setupUsd - stripeFeeSetup).toFixed(2)));

  const recurringPct = roleMode === "seller" ? 0.15 : 0.2;
  // Anual adelantado: 1 solo pago inmediato = 100% M1 + 15% x 11 meses = 265% (o 320% líder + 10% setup)
  const annualMultiplier = roleMode === "seller" ? 2.65 : 3.2;

  const subtotalM1 = isAnnual
    ? Number(
        (
          (netBasePerMonth * annualMultiplier + (roleMode === "leader" ? netBaseSetupPerClient * 0.1 : 0)) *
          clients
        ).toFixed(2)
      )
    : roleMode === "seller"
      ? Number((netBasePerMonth * clients).toFixed(2))
      : Number(((netBasePerMonth + netBaseSetupPerClient * 0.1) * clients).toFixed(2));

  const monthlyRecurringSubtotal = isAnnual
    ? 0
    : Number((netBasePerMonth * recurringPct * clients).toFixed(2));
  const year1Subtotal = isAnnual
    ? subtotalM1
    : Number((subtotalM1 + monthlyRecurringSubtotal * 11).toFixed(2));

  const regime = TAX_REGIMES[taxRegime];
  const iva15 = Number((subtotalM1 * 0.15).toFixed(2));
  const totalInvoice = Number((subtotalM1 + iva15).toFixed(2));
  const irRetention = Number((subtotalM1 * (regime.irPct / 100)).toFixed(2));
  const netBankTransfer = Number((totalInvoice - irRetention).toFixed(2));

  return (
    <div className="swiss-card rounded-3xl p-6 sm:p-8 bg-white border border-brand-emerald/30 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-brand-emerald uppercase">
            <Calculator className="w-3.5 h-3.5" />
            <span>SIMULADOR OFICIAL DE COMISIONES &amp; FACTURACIÓN SRI ECUADOR</span>
          </div>
          <h3 className="text-lg font-extrabold text-swiss-pine mt-0.5">
            Calcula Tu Ingreso Real, Factura (+15% IVA) y Retención de Renta
          </h3>
        </div>
        <div className="inline-flex rounded-xl border border-slate-200 bg-swiss-canvas p-1 gap-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => setRoleMode("seller")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              roleMode === "seller"
                ? "bg-swiss-pine text-white shadow-sm"
                : "text-slate-600 hover:text-swiss-pine"
            }`}
          >
            Vendedor (100% M1 + 15% M2–12)
          </button>
          <button
            type="button"
            onClick={() => setRoleMode("leader")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              roleMode === "leader"
                ? "bg-swiss-pine text-white shadow-sm"
                : "text-slate-600 hover:text-swiss-pine"
            }`}
          >
            Líder (+10% Setup + 5% Override)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5 space-y-4 text-xs">
          <div>
            <div className="font-bold text-slate-700 mb-1.5">1. Modalidad de Pago del Cliente</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-bold">
              <button
                type="button"
                onClick={() => setBillingMode("annual")}
                className={`px-3 py-2 rounded-xl border text-left transition-colors ${
                  isAnnual
                    ? "bg-brand-emerald text-white border-brand-emerald"
                    : "bg-swiss-canvas text-slate-600 border-slate-200 hover:border-brand-emerald"
                }`}
              >
                <div className="text-[11px]">Pago Anual Adelantado</div>
                <div className={`text-[10px] font-mono ${isAnnual ? "text-emerald-100" : "text-slate-500"}`}>
                  $35 / $69 / $119 al mes · 1 solo pago (265%)
                </div>
              </button>
              <button
                type="button"
                onClick={() => setBillingMode("monthly")}
                className={`px-3 py-2 rounded-xl border text-left transition-colors ${
                  !isAnnual
                    ? "bg-brand-emerald text-white border-brand-emerald"
                    : "bg-swiss-canvas text-slate-600 border-slate-200 hover:border-brand-emerald"
                }`}
              >
                <div className="text-[11px]">Pago Mensual (+20%)</div>
                <div className={`text-[10px] font-mono ${!isAnnual ? "text-emerald-100" : "text-slate-500"}`}>
                  $42 / $83 / $143 · M1 + 15% × 11m
                </div>
              </button>
            </div>
          </div>

          <div>
            <div className="font-bold text-slate-700 mb-1.5">2. Plan vendido al cliente (sin IVA)</div>
            <div className="grid grid-cols-3 gap-1.5 font-bold">
              {(["individual", "suite", "corp"] as PlanTier[]).map((t) => {
                const info = PLAN_TIERS[t];
                const shownPrice = isAnnual ? info.annualMonthly : info.monthlyPrice;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      setPlanTier(t);
                      setSetupUsd(info.defaultSetup);
                    }}
                    className={`px-2.5 py-2 rounded-xl border transition-colors ${
                      planTier === t
                        ? "bg-swiss-pine text-white border-swiss-pine"
                        : "bg-swiss-canvas text-slate-600 border-slate-200 hover:border-brand-emerald"
                    }`}
                  >
                    <div>
                      {info.label} ${shownPrice}
                    </div>
                    <div className={`text-[9px] font-mono ${planTier === t ? "text-emerald-300" : "text-slate-400"}`}>
                      {isAnnual ? `$${info.annualTotal}/año` : "/mes (+20%)"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-slate-700">3. Empresas cerradas este mes:</span>
              <strong className="font-mono text-sm text-brand-emerald">
                {clients} empresa{clients === 1 ? "" : "s"}
              </strong>
            </div>
            <input
              type="range"
              min={1}
              max={25}
              value={clients}
              onChange={(e) => setClients(Number(e.target.value))}
              className="w-full accent-brand-emerald cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block font-bold text-slate-700 mb-1">4. Pago del cliente</label>
              <select
                value={paymentChannel}
                onChange={(e) => setPaymentChannel(e.target.value as PaymentChannel)}
                className="w-full px-2.5 py-2 rounded-xl border border-slate-300 bg-white text-xs"
              >
                <option value="transfer">Transferencia ($0 fee)</option>
                <option value="stripe">Stripe tarjeta (~3.8%+$0.30)</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Pago Único Setup ($)</label>
              <input
                type="number"
                min={0}
                max={2000}
                step={10}
                value={setupUsd}
                onChange={(e) => setSetupUsd(Math.max(0, Number(e.target.value) || 0))}
                className="w-full px-2.5 py-2 rounded-xl border border-slate-300 bg-white font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              5. Tu Régimen SRI (Retención Grupo Volia)
            </label>
            <select
              value={taxRegime}
              onChange={(e) => setTaxRegime(e.target.value as TaxRegimeId)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold"
            >
              {(Object.keys(TAX_REGIMES) as TaxRegimeId[]).map((k) => (
                <option key={k} value={k}>
                  {TAX_REGIMES[k].label} (Ret. Renta {TAX_REGIMES[k].irPct}% · Ret. IVA 0%)
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">{regime.note}</p>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="p-3.5 rounded-2xl bg-swiss-canvas border border-slate-200">
              <div className="text-[10px] font-mono uppercase text-slate-500">
                {isAnnual ? "Cobro Único Inmediato" : "Comisión Mes 1"}
              </div>
              <div className="text-lg font-extrabold font-mono text-swiss-pine mt-0.5 tabular-nums">
                {fmt(subtotalM1)}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                {isAnnual
                  ? roleMode === "seller"
                    ? `265% de $${planMonthlyEquivalent}/m (1 solo pago)`
                    : `320% de $${planMonthlyEquivalent}/m + 10% Setup`
                  : roleMode === "seller"
                    ? `100% 1er mes ($${planMonthlyEquivalent})`
                    : `100% M1 ($${planMonthlyEquivalent}) + 10% Setup`}
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="text-[10px] font-mono uppercase text-brand-pine">Recurrente M2–12</div>
              <div className="text-lg font-extrabold font-mono text-brand-emerald mt-0.5 tabular-nums">
                {isAnnual ? "$0.00/m" : `+${fmt(monthlyRecurringSubtotal)}/m`}
              </div>
              <div className="text-[10px] text-brand-pine/80 mt-0.5">
                {isAnnual
                  ? "Ya incluido en tu cobro único (265%)"
                  : roleMode === "seller"
                    ? "15% × 11 meses"
                    : "15% propio + 5% override"}
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-swiss-pine text-white">
              <div className="text-[10px] font-mono uppercase text-emerald-300">Acumulado 12 Meses</div>
              <div className="text-lg font-extrabold font-mono mt-0.5 tabular-nums">
                {fmt(year1Subtotal)}
              </div>
              <div className="text-[10px] text-emerald-200/90 mt-0.5">
                {isAnnual ? "100% cobrado de inmediato" : "Base antes de IVA"}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="font-extrabold text-swiss-pine inline-flex items-center gap-1.5">
                <Receipt className="w-4 h-4 text-brand-emerald" />
                Desglose de Tu Factura Electrónica ({isAnnual ? "Cobro Único Anual" : "Mes 1"})
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-100 text-brand-pine font-bold">
                Ret. Renta {regime.irPct}% · Ret. IVA 0%
              </span>
            </div>
            <div className="space-y-1 font-mono text-[12px]">
              <div className="flex justify-between">
                <span className="text-slate-600 font-sans">Subtotal a facturar a Grupo Volia S.A.S.:</span>
                <span className="font-bold text-slate-900">{fmt(subtotalM1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 font-sans">+ IVA 15% (cobrado en factura):</span>
                <span className="font-bold text-slate-900">+{fmt(iva15)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-1">
                <span className="text-slate-700 font-sans font-bold">Total Factura Emitida:</span>
                <span className="font-extrabold text-swiss-pine">{fmt(totalInvoice)}</span>
              </div>
              <div className="flex justify-between text-amber-700">
                <span className="font-sans">− Retención Renta ({regime.irPct}% · crédito tributario SRI):</span>
                <span className="font-bold">−{fmt(irRetention)}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span className="font-sans">− Retención IVA (0%):</span>
                <span className="font-bold">$0.00</span>
              </div>
              <div className="flex justify-between border-t-2 border-brand-emerald/40 pt-2 mt-1 text-sm">
                <span className="font-sans font-extrabold text-swiss-pine">= Líquido Transferido a Tu Banco:</span>
                <span className="font-extrabold text-brand-emerald">{fmt(netBankTransfer)}</span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-[11px] text-slate-700 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
            <div>
              <strong>Requisitos y Retenciones SRI:</strong> RUC activo con <strong>Facturación Electrónica</strong>, cuenta bancaria propia en Ecuador y firma de Contrato Mercantil + NDA. Retención de Renta aplicable: <strong>10%</strong> Persona Natural Régimen General, <strong>1%</strong> RIMPE Emprendedor, <strong>5%</strong> Sociedad (<strong>0%</strong> retención de IVA). La LORTI Art. 97.4 excluye comisiones del RIMPE Negocio Popular.
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-2 border-t border-slate-100 text-[11px]">
        <div className="p-3 rounded-xl bg-swiss-canvas border border-slate-200 space-y-1">
          <div className="font-extrabold text-swiss-pine flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald" />
            1. Registro por Enlace + Academia 48h
          </div>
          <p className="text-slate-600">
            Recibes tu enlace personalizado de Vendedor o Líder de Célula, creas tu cuenta y completas los 12 videos de entrenamiento en <code className="font-mono">/ventas</code>.
          </p>
        </div>
        <div className="p-3 rounded-xl bg-swiss-canvas border border-slate-200 space-y-1">
          <div className="font-extrabold text-swiss-pine flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald" />
            2. Cierre y Factura Electrónica
          </div>
          <p className="text-slate-600">
            Al acreditarse el pago del cliente, emites tu factura electrónica +15% IVA a <strong>GRUPO VOLIA S.A.S.</strong> sobre la base neta y recibes tu retención electrónica SRI.
          </p>
        </div>
        <div className="p-3 rounded-xl bg-swiss-canvas border border-slate-200 space-y-1">
          <div className="font-extrabold text-swiss-pine flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-brand-emerald" />
            3. Cobro Directo a Tu Banco
          </div>
          <p className="text-slate-600">
            Transferencia directa a tu cuenta bancaria o cooperativa SEPS en Ecuador. Sin relación de dependencia ni techo de ingresos.
          </p>
        </div>
      </div>
    </div>
  );
}
