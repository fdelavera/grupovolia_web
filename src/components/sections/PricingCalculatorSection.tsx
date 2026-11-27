"use client";

import { useState } from "react";
import {
  Calculator,
  CheckCircle2,
  Handshake,
  ArrowRight,
  Star,
  Clock,
} from "lucide-react";

interface PricingCalculatorSectionProps {
  onSelectPlan?: (planName: string, modality: string) => void;
}

export default function PricingCalculatorSection({ onSelectPlan }: PricingCalculatorSectionProps) {
  const [calcPackage, setCalcPackage] = useState<
    "individual" | "pyme" | "corp" | "contador_indep" | "estudio_contable"
  >("pyme");
  const [calcMonths, setCalcMonths] = useState<12 | 24>(12);
  const [employeeCount, setEmployeeCount] = useState<number>(15);
  const [competitorMonthly, setCompetitorMonthly] = useState<number>(280);
  const [accountantRucCount, setAccountantRucCount] = useState<number>(15);
  const [accountantCompPerRuc, setAccountantCompPerRuc] = useState<number>(25);
  const [referredClients, setReferredClients] = useState<number>(5);

  const packages = {
    individual: {
      name: "1. Módulo Individual PYME",
      subtitle:
        "Elige 1 de los 10 Módulos con Usuarios, Clientes y Proveedores Ilimitados (y Colaboradores Ilimitados si eliges RRHH)",
      badge: "Entrada Rápida · 1 Módulo",
      highlight: false,
      pricing: { setup: 120, monthly: 35 },
      features: [
        "1 Módulo independiente a elección (opera 100% autónomo sin errores y listo para escalar a los 10 módulos)",
        "Usuarios, Clientes y Proveedores 100% Ilimitados (y Colaboradores Ilimitados si contratas Módulo 10 RRHH)",
        "Facturación SRI ilimitada con Auto-Retry y RIDE White-Label, o Inventario Kardex, o RRHH + App Empleados White-Label",
        "Migración Inteligente IA con vista previa editable manualmente desde Excel, Contífico, Perseo, IESS o Buk",
        "Personalización en 1 mes (hasta 3 revisiones) + Copiloto IA (1,500 consultas/mes) + actualizaciones normativas SRI/IESS incluidas",
      ],
    },
    pyme: {
      name: "2. SUITE COMPLETA PYME (10 MÓDULOS)",
      subtitle:
        "1 Empresa / Matriz · Usuarios, Clientes, Proveedores y Colaboradores RRHH 100% Ilimitados · Los 10 Módulos + IA",
      badge: "MÁS ELEGIDO · ESTRELLA",
      highlight: true,
      pricing: { setup: 120, monthly: 69 },
      features: [
        "Usuarios, Clientes, Proveedores, Colaboradores RRHH y Facturas SRI ($0/doc) 100% Ilimitados en 1 matriz",
        "Los 10 Módulos Interconectados: Contabilidad SRI, Inventario Escáner, Finanzas/Oráculo Multi-Bolsa, CRM 10 Giros LOPDP, Project Manager & Agenda, Marketing Ops, UAFE, Portal B2B, IA y Módulo 10 RRHH",
        "Módulo 10 RRHH Ilimitado: Reclutamiento ATS con CVs, Onboarding 1-clic, Nómina IESS/RIMPE, Sobretiempo 25/50/100%, Radar Feriados IA, Offboarding inmutable y App Empleados 100% White-Label",
        "Migración Inteligente IA editable desde todos tus sistemas anteriores + 1,500 consultas/mes en tu Copiloto IA",
        "Personalización a tu marca en 1 mes (hasta 3 revisiones) + actualizaciones normativas SRI, NIIF y Código del Trabajo incluidas",
      ],
    },
    corp: {
      name: "3. Suite Corporativa Multisucursal",
      subtitle:
        "Operación Multisucursal & Multi-Cantón Sin Límite de Sucursales · Base Dedicada + Biométricos Multi-Sede + IA Pro",
      badge: "Multisucursal & Multi-Cantón",
      highlight: false,
      pricing: { setup: 250, monthly: 119 },
      features: [
        "Operación Multisucursal y Multi-Cantón sin límite de sucursales, múltiples bodegas y múltiples puntos de emisión SRI",
        "Módulo 10 RRHH Corporativo: feriados cantonales simultáneos por cada ciudad, Webhook Biométrico ZKTeco/Hikvision multi-sede y App Empleados White-Label",
        "Base de datos dedicada con aislamiento total, Usuarios y Colaboradores Ilimitados y conexión API POS Ecuador",
        "Copiloto IA Pro Interno + Radar Preventivo UAFE RESU + Oráculo Multi-Bolsa (BVQ/BVG Ecuador + Global)",
        "Personalización en 1 mes (hasta 3 revisiones) + soporte prioritario + actualizaciones normativas incluidas",
      ],
    },
  };

  const isAccountantCalc =
    calcPackage === "contador_indep" || calcPackage === "estudio_contable";
  const selectedPkg =
    calcPackage === "individual" || calcPackage === "pyme" || calcPackage === "corp"
      ? packages[calcPackage]
      : packages.pyme;

  const accountantIncludedRucs = calcPackage === "estudio_contable" ? 40 : 15;
  const accountantBaseMonthly = calcPackage === "estudio_contable" ? 119 : 69;
  const accountantExtraRucs = Math.max(0, accountantRucCount - accountantIncludedRucs);
  const accountantMonthlyTotal = accountantBaseMonthly + accountantExtraRucs * 5;
  const accountantCostPerRuc = accountantMonthlyTotal / Math.max(1, accountantRucCount);

  // Costo tradicional real en Ecuador: ERP/CRM/Facturero + Software de RRHH por empleado (Buk/Nómina360 ~$4.50/emp) + Setup tradicional ($2,500)
  const hrSoftwareCompetitorMonthly = Math.round(employeeCount * 4.5);
  const combinedCompetitorMonthly = isAccountantCalc
    ? Math.round(accountantRucCount * accountantCompPerRuc)
    : competitorMonthly + hrSoftwareCompetitorMonthly;
  const traditionalSetupFee = isAccountantCalc
    ? accountantRucCount * 35
    : employeeCount >= 10
      ? 2500
      : 1200;

  const activeSetupFee = isAccountantCalc ? 0 : selectedPkg.pricing.setup;
  const activeMonthlyFee = isAccountantCalc
    ? accountantMonthlyTotal
    : selectedPkg.pricing.monthly;

  const totalSaaS = activeSetupFee + activeMonthlyFee * calcMonths;
  const totalCompetitor = traditionalSetupFee + combinedCompetitorMonthly * calcMonths;

  const savingsSaaS = Math.max(0, totalCompetitor - totalSaaS);

  // Ganancia operativa mensual estimada (empresas: horas en nómina/SRI/Kardex; contadores: ~2.5h ahorradas/RUC en ATS/103/104/101-102 + conciliación bancaria)
  const estimatedMonthlyOperationalGain = isAccountantCalc
    ? Math.round(accountantRucCount * 28)
    : Math.round(180 + employeeCount * 18);

  const partnerUpfrontTotal = referredClients * 60;
  const partnerMonthlyRecurring = referredClients * 12.4;
  const partnerFirstYearTotal = partnerUpfrontTotal + partnerMonthlyRecurring * 12;

  return (
    <section
      id="tarifario-calculadora"
      className="py-24 bg-swiss-canvas border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-emerald/30 text-brand-pine text-xs font-mono font-bold mb-4 shadow-sm">
            <Calculator className="w-3.5 h-3.5 text-brand-emerald" />
            <span>TARIFARIO OFICIAL · ECUADOR, LATINOAMÉRICA & EE.UU.</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-swiss-pine tracking-tight">
            Planes 100% Membresía SaaS con{" "}
            <span className="text-brand-emerald">Usuarios y Colaboradores Ilimitados</span>
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base">
            En <strong className="text-swiss-pine">Grupo Volia</strong> no cobramos por cada usuario adicional ni por trabajador registrado: contrata 1 módulo independiente o activa la Suite sincronizada de 10 módulos bajo{" "}
            <strong className="text-swiss-pine">Membresía Mensual (+ IVA vigente)</strong> y paga con tarjeta vía Stripe (<strong className="text-brand-emerald">0% recargo</strong>) o transferencia bancaria empresarial.
          </p>

          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-brand-emerald/30 shadow-sm text-xs text-swiss-pine">
            <span className="px-2 py-0.5 rounded-full bg-brand-emeraldSoft text-brand-pine font-mono font-bold text-[10px]">
              PAGOS OFICIALES
            </span>
            <span>
              Tarjeta Débito / Crédito vía <strong>Stripe (sin recargo)</strong> o{" "}
              <strong>Transferencia Bancaria GRUPOVOLIA S.A.S.</strong> (no aceptamos efectivo, cheques, PayPhone ni Deuna!).
            </span>
          </div>
        </div>

        {/* 3 PRICING CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {(Object.keys(packages) as Array<keyof typeof packages>).map((key) => {
            const pkg = packages[key];
            return (
              <div
                key={key}
                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative transition-all ${
                  pkg.highlight
                    ? "bg-white border-2 border-brand-emerald shadow-swiss-lg lg:-translate-y-2"
                    : "swiss-card"
                }`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-emerald text-white text-[11px] font-mono font-extrabold tracking-wider uppercase flex items-center gap-1 shadow-md">
                    <Star className="w-3.5 h-3.5 fill-white" />
                    <span>{pkg.badge}</span>
                  </div>
                )}

                <div>
                  {!pkg.highlight && (
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                      {pkg.badge}
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-swiss-pine mt-1">{pkg.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{pkg.subtitle}</p>

                  <div className="mt-6 p-4 rounded-2xl bg-swiss-canvas border border-slate-200">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl sm:text-4xl font-extrabold text-swiss-pine font-mono tabular-nums">
                        ${pkg.pricing.monthly}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">USD / mes + IVA</span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                      <span className="text-slate-600">Diseño e Implementación Inicial:</span>
                      <strong className="text-brand-emerald font-mono">${pkg.pricing.setup} USD + IVA (Único)</strong>
                    </div>
                    <div className="mt-1 text-[11px] font-semibold text-brand-pine">
                      ✓ Usuarios, RRHH ilimitados, SRI, Nube y API IA incluidos
                    </div>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#contacto"
                  onClick={() =>
                    onSelectPlan?.(
                      pkg.name,
                      "Membresía SaaS Mensual — Pago con Tarjeta Stripe (0% Recargo)"
                    )
                  }
                  className={`mt-8 w-full px-5 py-3.5 rounded-xl font-bold text-xs flex items-center justify-between gap-3 text-left transition-all ${
                    pkg.highlight
                      ? "bg-brand-emerald hover:bg-brand-pine text-white shadow-sm"
                      : "bg-swiss-canvas hover:bg-brand-emeraldSoft text-swiss-pine border border-slate-300 hover:border-brand-emerald"
                  }`}
                >
                  <span className="leading-snug">
                    Elegir {pkg.name.replace(/^[0-9]\.\s*/, "")} (${pkg.pricing.monthly}/mes + IVA)
                  </span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </a>
              </div>
            );
          })}
        </div>

        {/* CONDICIONES DE PERSONALIZACIÓN, PLAZO Y REVISIONES (1 MES / 3 REVISIONES) */}
        <div className="mb-14 p-6 rounded-2xl bg-white border-2 border-brand-emerald/30 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-5">
          <div className="p-3 rounded-2xl bg-brand-emeraldSoft text-brand-emerald border border-brand-emerald/30 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-swiss-pine">
              Condiciones Claras de Personalización, Plazos y Actualizaciones Normativas
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              • <strong className="text-swiss-pine">Tiempo de implementación y personalización:</strong> La adaptación de módulos, inventario y marca toma{" "}
              <strong className="text-brand-emerald">1 mes (4 semanas)</strong> e incluye{" "}
              <strong className="text-brand-emerald">hasta 3 revisiones</strong> previas a la entrega final.<br />
              • <strong className="text-swiss-pine">Cambios posteriores a la entrega:</strong> Cualquier modificación o requerimiento nuevo solicitado luego de la entrega final se factura de manera independiente.<br />
              • <strong className="text-swiss-pine">Actualizaciones de normativas (SRI / NIIF / Código del Trabajo):</strong> ¡Están <strong>100% incluidas sin costo adicional</strong> dentro de tu paquete de membresía mensual!<br />
              • <strong className="text-swiss-pine">Impuestos (IVA Ecuador):</strong> Todos los valores promocionados son precios base <strong>+ IVA legalmente vigente</strong> (el IVA no viene incluido en la tarifa publicada).
            </p>
          </div>
        </div>

        {/* CONSOLA INDEPENDIENTE PARA CONTADORES Y ESTUDIOS CONTABLES */}
        <div className="swiss-card rounded-3xl p-6 sm:p-8 mb-14 border-2 border-brand-emerald/35 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-mono text-brand-emerald font-bold uppercase">
                SERVICIO INDEPENDIENTE · contadores.grupovolia.com
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-swiss-pine mt-0.5">
                Planes Consola Multi-Empresa para Contadores &amp; Estudios Contables
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                No es uno de los 10 módulos estándar: es una consola exclusiva para manejar <strong>Empresas/Sociedades y Personas Naturales</strong> (General, RIMPE Emprendedor y Popular) con Calendario SRI 9no dígito (IVA 104, Ret. 103, ATS y <strong>Renta 101/102</strong>).
              </p>
            </div>
            <a
              href="https://contadores.grupovolia.com/?demo=1"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-swiss-pine hover:bg-brand-pine text-white text-xs font-extrabold transition-all"
            >
              <span>Probar Demo Contadores</span>
              <ArrowRight className="w-4 h-4 text-emerald-300" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl bg-swiss-canvas border border-brand-emerald/30 flex flex-col justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-brand-emerald uppercase font-bold">
                    CONTADOR INDEPENDIENTE
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-brand-pine text-[10px] font-bold">
                    Hasta 15 RUCs · $4.60/cliente
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-swiss-pine font-mono">
                  $69 <span className="text-xs font-normal text-slate-500">+ IVA / mes ($79.35)</span>
                </div>
                <ul className="text-xs text-slate-600 space-y-1.5 pt-1">
                  <li>✓ Hasta 15 empresas o personas naturales aisladas desde 1 consola</li>
                  <li>✓ Plan de Cuentas NIIF SCVS automático, Simplificado PN o Propio</li>
                  <li>✓ Calendario SRI por 9no dígito: IVA 104, Ret. 103, ATS y Renta 101/102</li>
                  <li>✓ Conciliación 61 bancos/coops EC + Facturación SRI ilimitada ($0/doc)</li>
                  <li>✓ +$5 + IVA/mes por cada RUC adicional sobre el cupo</li>
                </ul>
              </div>
              <a
                href="#contacto"
                className="w-full text-center px-4 py-2.5 rounded-xl bg-brand-emerald hover:bg-brand-pine text-white font-extrabold text-xs transition-colors"
              >
                Activar Plan Contador Independiente →
              </a>
            </div>

            <div className="p-5 rounded-2xl bg-swiss-pine text-white border border-emerald-700 flex flex-col justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-emerald-300 uppercase font-bold">
                    ESTUDIO CONTABLE / FIRMA
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-800 text-emerald-200 text-[10px] font-bold">
                    Hasta 40 RUCs · Equipo Multi-Contador
                  </span>
                </div>
                <div className="text-3xl font-extrabold text-white font-mono">
                  $119 <span className="text-xs font-normal text-emerald-200">+ IVA / mes ($136.85)</span>
                </div>
                <ul className="text-xs text-emerald-100/90 space-y-1.5 pt-1">
                  <li>✓ Hasta 40 empresas o personas naturales + equipo multi-contador</li>
                  <li>✓ Adaptación de módulos y plan de cuentas por cliente en 1 clic</li>
                  <li>✓ Calendario SRI consolidado (104, 103, ATS y Renta Anual 101/102)</li>
                  <li>✓ RRHH/Nómina IESS, Inventario Kardex y Portal B2B opcional por cliente</li>
                  <li>✓ +$5 + IVA/mes por cada RUC adicional sobre los 40 incluidos</li>
                </ul>
              </div>
              <a
                href="#contacto"
                className="w-full text-center px-4 py-2.5 rounded-xl bg-brand-emerald hover:bg-emerald-500 text-white font-extrabold text-xs transition-colors"
              >
                Activar Plan Estudio Contable →
              </a>
            </div>
          </div>
        </div>

        {/* SERVICIOS COMPLEMENTARIOS POR PROYECTO — OCULTOS TEMPORALMENTE */}
        {false && (
        <div className="swiss-card rounded-3xl p-6 sm:p-8 mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 mb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-mono text-brand-emerald font-bold uppercase">
                SERVICIOS COMPLEMENTARIOS · PRODUCCIÓN AUDIOVISUAL IA &amp; CONSULTORÍA
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-swiss-pine mt-0.5">
                Soluciones por Proyecto, Estudios de Mercado y Desarrollo a Medida
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-500">Tarifas Oficiales (+ IVA según país)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-swiss-canvas border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-brand-emerald uppercase font-bold">
                  CONSULTORÍA & FINANZAS IA
                </span>
                <h4 className="text-sm font-bold text-swiss-pine mt-1">
                  Estudio de Mercado + Modelo Excel + Dossier PDF
                </h4>
                <p className="text-xs text-slate-600 mt-1.5">
                  Investigación con Subagentes IA, modelo financiero Excel (3 escenarios) y propuesta ejecutiva lista para socios o bancos.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-base font-extrabold text-brand-emerald font-mono">
                $199 – $350 USD
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-swiss-canvas border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-brand-pine uppercase font-bold">
                  ESTÁNDARES INTERNACIONALES
                </span>
                <h4 className="text-sm font-bold text-swiss-pine mt-1">
                  Pack Audiovisual Inmobiliario / Comercial + Virtual Staging IA
                </h4>
                <p className="text-xs text-slate-600 mt-1.5">
                  Animación cinematográfica IA, amoblado virtual hiperrealista de propiedades y edición comercial 4K.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-base font-extrabold text-brand-pine font-mono">
                $250 – $450 USD / proy.
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-swiss-canvas border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-brand-emerald uppercase font-bold">
                  CONTENIDO CONTINUO
                </span>
                <h4 className="text-sm font-bold text-swiss-pine mt-1">
                  Iguala Mensual de Contenido para Redes con IA
                </h4>
                <p className="text-xs text-slate-600 mt-1.5">
                  Producción mensual de Reels, videos generativos IA, subtítulos dinámicos y boletines de correo corporativo.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-base font-extrabold text-brand-emerald font-mono">
                $290 USD / mes
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-swiss-canvas border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-brand-pine uppercase font-bold">
                  INGENIERÍA PERSONALIZADA
                </span>
                <h4 className="text-sm font-bold text-swiss-pine mt-1">
                  Creación de Módulo Nuevo u Oráculo a Medida
                </h4>
                <p className="text-xs text-slate-600 mt-1.5">
                  Desarrollo de un módulo exclusivo para un área única de tu empresa (logística, inventario POS, avalúo XAU/USD, radar inmobiliario).
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-base font-extrabold text-brand-pine font-mono">
                $490 – $1,200 USD
              </div>
            </div>
          </div>
        </div>
        )}

        {/* CALCULADORA DE AHORRO + ALIANZA CONTADORES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 swiss-card rounded-3xl p-6 sm:p-8 border-2 border-brand-emerald/25">
            <div className="flex items-center gap-2.5 mb-2">
              <Calculator className="w-5 h-5 text-brand-emerald" />
              <h3 className="text-xl font-bold text-swiss-pine">
                Calculadora Interactiva de Ahorro (Empresas &amp; Contadores)
              </h3>
            </div>
            <p className="text-xs text-slate-600 mb-6">
              Compara el costo total real entre Grupo Volia (Suite B2B o Consola Multi-Empresa Contadores) vs. proveedores tradicionales por separado.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-mono font-semibold text-slate-600 mb-1.5">
                  1. Selecciona tu Plan Grupo Volia:
                </label>
                <select
                  value={calcPackage}
                  onChange={(e) => {
                    const next = e.target.value as
                      | "individual"
                      | "pyme"
                      | "corp"
                      | "contador_indep"
                      | "estudio_contable";
                    setCalcPackage(next);
                    if (next === "contador_indep") setAccountantRucCount(15);
                    if (next === "estudio_contable") setAccountantRucCount(35);
                  }}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-swiss-pine font-semibold focus:outline-none focus:border-brand-emerald"
                >
                  <option value="individual">1. Módulo Individual PYME ($35/mes + IVA)</option>
                  <option value="pyme">2. Suite Completa PYME Estrella ($69/mes + IVA)</option>
                  <option value="corp">3. Suite Corporativa Multisucursal ($119/mes + IVA)</option>
                  <option value="contador_indep">
                    4. Consola Contadores Independiente ($69/mes + IVA · hasta 15 RUCs)
                  </option>
                  <option value="estudio_contable">
                    5. Consola Estudio Contable ($119/mes + IVA · hasta 40 RUCs)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-600 mb-1.5">
                  2. Horizonte de Comparación:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCalcMonths(12)}
                    className={`py-2.5 rounded-xl text-xs font-bold border ${
                      calcMonths === 12
                        ? "bg-brand-emerald text-white border-brand-emerald"
                        : "bg-white text-slate-700 border-slate-300"
                    }`}
                  >
                    1 Año (12 Meses)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcMonths(24)}
                    className={`py-2.5 rounded-xl text-xs font-bold border ${
                      calcMonths === 24
                        ? "bg-brand-emerald text-white border-brand-emerald"
                        : "bg-white text-slate-700 border-slate-300"
                    }`}
                  >
                    2 Años (24 Meses)
                  </button>
                </div>
              </div>
            </div>

            {isAccountantCalc ? (
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-600">
                      3. Clientes RUC en tu cartera (Empresas/Sociedades + Personas Naturales):
                    </span>
                    <strong className="text-brand-emerald font-mono">
                      {accountantRucCount} RUCs (${accountantCostPerRuc.toFixed(2)}/cliente al mes)
                    </strong>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={60}
                    step={1}
                    value={accountantRucCount}
                    onChange={(e) => setAccountantRucCount(Number(e.target.value))}
                    className="w-full accent-brand-emerald cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-600">
                      4. Costo mensual tradicional por cada cliente (software contable + facturero separado):
                    </span>
                    <strong className="text-brand-crimson font-mono">
                      ${accountantCompPerRuc} USD / RUC / mes (${combinedCompetitorMonthly}/m total)
                    </strong>
                  </div>
                  <input
                    type="range"
                    min={15}
                    max={45}
                    step={1}
                    value={accountantCompPerRuc}
                    onChange={(e) => setAccountantCompPerRuc(Number(e.target.value))}
                    className="w-full accent-brand-emerald cursor-pointer"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-600">
                      3. Colaboradores en tu empresa (RRHH + Nómina IESS/Servicios + App White-Label):
                    </span>
                    <strong className="text-brand-emerald font-mono">
                      {employeeCount} personas (ahorra ~${hrSoftwareCompetitorMonthly}/m en Buk/Nómina360)
                    </strong>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={80}
                    step={1}
                    value={employeeCount}
                    onChange={(e) => setEmployeeCount(Number(e.target.value))}
                    className="w-full accent-brand-emerald cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-600">
                      4. Gasto mensual en sistemas tradicionales separados (ERP + Inventario + CRM + Proyectos):
                    </span>
                    <strong className="text-brand-crimson font-mono">${competitorMonthly} USD / mes</strong>
                  </div>
                  <input
                    type="range"
                    min={120}
                    max={650}
                    step={10}
                    value={competitorMonthly}
                    onChange={(e) => setCompetitorMonthly(Number(e.target.value))}
                    className="w-full accent-brand-emerald cursor-pointer"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-brand-emeraldSoft/70 border border-brand-emerald/40">
                <div className="text-[10px] font-mono text-brand-emerald font-bold uppercase">
                  {isAccountantCalc
                    ? "CONSOLA CONTADORES GRUPO VOLIA (+ IVA)"
                    : "MEMBRESÍA SAAS GRUPO VOLIA (+ IVA)"}
                </div>
                <div className="text-2xl font-extrabold text-swiss-pine font-mono mt-1 tabular-nums">
                  ${totalSaaS.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  {isAccountantCalc
                    ? `En ${calcMonths} meses ($0 setup + $${activeMonthlyFee}/m · ${accountantRucCount} RUCs)`
                    : `En ${calcMonths} meses ($${activeSetupFee} setup + $${activeMonthlyFee}/m · RRHH ilimitado)`}
                </div>
                <div className="mt-2 pt-2 border-t border-brand-emerald/20 text-xs font-bold text-brand-emerald">
                  Ahorras ${savingsSaaS.toLocaleString()} USD vs. sistemas separados
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200">
                <div className="text-[10px] font-mono text-slate-500 font-bold uppercase">
                  {isAccountantCalc
                    ? "SOFTWARE CONTABLE POR EMPRESA (TRADICIONAL)"
                    : "ERP + RRHH TRADICIONAL"}
                </div>
                <div className="text-2xl font-extrabold text-slate-400 line-through font-mono mt-1 tabular-nums">
                  ${totalCompetitor.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  En {calcMonths} meses (${traditionalSetupFee.toLocaleString()} setup + ${combinedCompetitorMonthly}/m)
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                  {isAccountantCalc
                    ? "Sin consola multi-RUC unificada ni Calendario SRI 9no dígito"
                    : "Sin App Empleados WL ni Copiloto IA"}
                </div>
              </div>
            </div>

            <div className="mt-4 p-3.5 rounded-2xl bg-swiss-pine text-white flex flex-wrap items-center justify-between gap-2 text-xs">
              <div>
                <div className="text-[10px] font-mono text-brand-emeraldBright font-bold uppercase">
                  {isAccountantCalc
                    ? "GANANCIA OPERATIVA ESTIMADA DEL CONTADOR / ESTUDIO"
                    : "GANANCIA OPERATIVA ESTIMADA POR INTERCONEXIÓN (10 MÓDULOS + IA)"}
                </div>
                <p className="text-slate-200 mt-0.5">
                  {isAccountantCalc
                    ? `Horas liberadas cada mes en ${accountantRucCount} RUCs (ATS, IVA 104, Ret. 103, Renta 101/102 y conciliación de 61 bancos) — se paga solo con 1 cliente.`
                    : "Horas liberadas en nómina IESS, cálculo automático 25%/50%/100%, SRI Auto-Retry, Kardex y conciliación."}
                </p>
              </div>
              <div className="text-right font-mono">
                <div className="text-lg font-extrabold text-brand-emeraldBright tabular-nums">
                  +${estimatedMonthlyOperationalGain.toLocaleString()} / mes
                </div>
                <div className="text-[10px] text-slate-300">
                  (~${(estimatedMonthlyOperationalGain * calcMonths).toLocaleString()} en {calcMonths} meses)
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 swiss-card rounded-3xl p-6 sm:p-8 border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emeraldSoft border border-brand-emerald/30 text-brand-pine text-[11px] font-mono font-bold mb-3">
                <Handshake className="w-3.5 h-3.5 text-brand-emerald" />
                <span>PROGRAMA DE ALIADOS CONTABLES Y COMERCIALES</span>
              </div>
              <h3 className="text-xl font-bold text-swiss-pine">
                ¿Eres Contador, Consultor o Agencia? Gana{" "}
                <span className="text-brand-emerald">25% Inicial + 18% Recurrente</span>
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Nuestro sistema ahorra el 80% del trabajo operativo en el SRI al contador y genera un ingreso pasivo mensual por cada cliente referido activo.
              </p>

              <div className="mt-5 p-4 rounded-2xl bg-swiss-canvas border border-slate-200">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-600">Clientes PYME referidos (Suite Estrella):</span>
                  <strong className="text-brand-emerald font-mono">{referredClients} empresas</strong>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  value={referredClients}
                  onChange={(e) => setReferredClients(Number(e.target.value))}
                  className="w-full accent-brand-emerald cursor-pointer"
                />

                <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-200">
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase">
                      Comisión de Cierre (25%)
                    </div>
                    <div className="text-lg font-extrabold text-swiss-pine font-mono tabular-nums">
                      ${partnerUpfrontTotal.toLocaleString()} USD
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase">
                      Renta Mensual (18%)
                    </div>
                    <div className="text-lg font-extrabold text-brand-emerald font-mono tabular-nums">
                      +${partnerMonthlyRecurring.toFixed(2)} / mes
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200 text-xs text-brand-pine font-bold">
                  Ingreso Total Año 1 para el Aliado: ${partnerFirstYearTotal.toLocaleString()} USD
                </div>
              </div>
            </div>

            <a
              href="#contacto"
              onClick={() =>
                onSelectPlan?.(
                  "Alianza Comercial / Contable (25% + 18%)",
                  "Partner Referidor"
                )
              }
              className="mt-6 w-full py-3 rounded-xl bg-swiss-pine hover:bg-brand-pine text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <span>Unirme como Contador / Aliado Referidor</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
