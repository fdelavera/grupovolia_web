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
  const [modalityView, setModalityView] = useState<"B" | "A">("B");
  const [calcPackage, setCalcPackage] = useState<"individual" | "pyme" | "corp">("pyme");
  const [calcMonths, setCalcMonths] = useState<12 | 24>(12);
  const [employeeCount, setEmployeeCount] = useState<number>(15);
  const [competitorMonthly, setCompetitorMonthly] = useState<number>(280);
  const [referredClients, setReferredClients] = useState<number>(5);

  const packages = {
    individual: {
      name: "1. Módulo Individual PYME",
      subtitle: "Elige 1 de los 10 Módulos: Contabilidad SRI, Inventario Kardex, CRM LOPDP, Project Manager o RRHH Ecuador",
      badge: "Entrada Rápida",
      highlight: false,
      modB: { setup: 120, monthly: 35 },
      modA: { license: 490, cloudMonthly: 19, annualSriYear2: 140 },
      features: [
        "1 Módulo independiente a elección (opera 100% autónomo sin errores y listo para escalar a los 10 módulos)",
        "Facturación SRI ilimitada con Auto-Retry y RIDE PDF White-Label, o Inventario Kardex, o RRHH + App Empleados White-Label",
        "Migración Inteligente IA con vista previa editable manualmente desde Excel, Contífico, Perseo, IESS o Buk",
        "Incluye Copiloto IA Interno integrado para tu equipo (nombre y logo personalizables · 1,500 consultas/mes)",
        "Personalización en 1 mes (hasta 3 revisiones) + actualizaciones normativas SRI/IESS incluidas",
      ],
    },
    pyme: {
      name: "2. SUITE COMPLETA PYME (10 MÓDULOS)",
      subtitle: "SRI Auto-Retry + Inventario + Finanzas/Oráculo + CRM 10 Giros + Project Manager + Marketing + Portal B2B + RRHH (hasta 25 colaboradores) + IA",
      badge: "MÁS ELEGIDO · ESTRELLA",
      highlight: true,
      modB: { setup: 240, monthly: 69 },
      modA: { license: 890, cloudMonthly: 25, annualSriYear2: 220 },
      features: [
        "Facturas Electrónicas SRI Ilimitadas ($0 por documento), Productos Kardex Ilimitados y Asientos Contables NIIF Ilimitados",
        "Los 10 Módulos Interconectados: Contabilidad SRI, Inventario Escáner, Finanzas/Oráculo Multi-Bolsa, CRM 10 Giros LOPDP, Project Manager & Agenda, Marketing Ops, UAFE, Portal B2B, IA y Módulo 10 RRHH Ecuador",
        "Incluye Módulo 10 RRHH (hasta 25 colaboradores): Nómina IESS/Independientes, Sobretiempo 25/50/100%, Radar Feriados IA, Offboarding inmutable y App Empleados 100% White-Label",
        "Migración Inteligente IA editable desde todos tus sistemas anteriores + 1,500 consultas/mes en tu Copiloto IA",
        "Personalización a tu marca en 1 mes (hasta 3 revisiones) + actualizaciones normativas SRI, NIIF y Código del Trabajo incluidas",
      ],
    },
    corp: {
      name: "3. Suite Corporativa / Multisucursal",
      subtitle: "Base Dedicada + 10 Módulos + RRHH Ilimitado Multi-Cantón & Biométricos + Usuarios Ilimitados + IA Pro",
      badge: "Mediana Empresa & Grupos",
      highlight: false,
      modB: { setup: 450, monthly: 119 },
      modA: { license: 1490, cloudMonthly: 39, annualSriYear2: 350 },
      features: [
        "Facturas SRI, Bodegas, Productos Kardex, Colaboradores RRHH y Usuarios 100% Ilimitados en servidor dedicado",
        "Módulo 10 RRHH Corporativo: múltiples sucursales/cantones (feriados locales simultáneos), Webhook Biométrico ZKTeco/Hikvision y App Empleados White-Label ilimitada",
        "Base de datos dedicada con aislamiento total, múltiples puntos de emisión SRI y conexión API POS Ecuador",
        "Copiloto IA Pro Interno + Radar UAFE RESU + Oráculo Multi-Bolsa (BVQ/BVG Ecuador + Global)",
        "Personalización en 1 mes (hasta 3 revisiones) + soporte prioritario + actualizaciones normativas incluidas",
      ],
    },
  };

  const selectedPkg = packages[calcPackage];

  // Costo tradicional real en Ecuador: ERP/CRM/Facturero + Software de RRHH por empleado (Buk/Nómina360 ~$4.50/emp) + Setup tradicional ($2,500)
  const hrSoftwareCompetitorMonthly = Math.round(employeeCount * 4.5);
  const combinedCompetitorMonthly = competitorMonthly + hrSoftwareCompetitorMonthly;
  const traditionalSetupFee = employeeCount >= 10 ? 2500 : 1200;

  const totalModB = selectedPkg.modB.setup + selectedPkg.modB.monthly * calcMonths;
  const totalModA =
    selectedPkg.modA.license +
    selectedPkg.modA.cloudMonthly * calcMonths +
    (calcMonths > 12 ? selectedPkg.modA.annualSriYear2 : 0);
  const totalCompetitor = traditionalSetupFee + combinedCompetitorMonthly * calcMonths;

  const savingsModB = Math.max(0, totalCompetitor - totalModB);
  const savingsModA = Math.max(0, totalCompetitor - totalModA);

  // Ganancia operativa mensual estimada por interconexión (horas ahorradas en nómina, recargos 25/50/100%, SRI Auto-Retry, Kardex y conciliación)
  const estimatedMonthlyOperationalGain = Math.round(180 + employeeCount * 18);

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
            Precios Transparentes:{" "}
            <span className="text-brand-emerald">Membresía Mensual</span> o{" "}
            <span className="text-brand-pine">Compra de Licencia</span>
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base">
            Elige el ritmo de tu empresa con <strong className="text-swiss-pine">Grupo Volia</strong>: contrata un módulo independiente sin dependencias forzadas o activa la Suite sincronizada de 10 módulos bajo{" "}
            <strong className="text-swiss-pine">Modalidad B (Membresía)</strong> o{" "}
            <strong className="text-swiss-pine">Modalidad A (Compra de Licencia)</strong>.
          </p>

          {/* Modality Switcher */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <button
              type="button"
              onClick={() => setModalityView("B")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                modalityView === "B"
                  ? "bg-brand-emerald text-white shadow-sm"
                  : "text-slate-600 hover:text-swiss-pine"
              }`}
            >
              Modalidad B: Membresía Mensual (Bajo Inicio)
            </button>
            <button
              type="button"
              onClick={() => setModalityView("A")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                modalityView === "A"
                  ? "bg-swiss-pine text-white shadow-sm"
                  : "text-slate-600 hover:text-swiss-pine"
              }`}
            >
              Modalidad A: Compra de Licencia (Diseño Incluido)
            </button>
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

                  {modalityView === "B" ? (
                    <div className="mt-6 p-4 rounded-2xl bg-swiss-canvas border border-slate-200">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl sm:text-4xl font-extrabold text-swiss-pine font-mono tabular-nums">
                          ${pkg.modB.monthly}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">USD / mes + IVA</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                        <span className="text-slate-600">Diseño e Implementación Inicial:</span>
                        <strong className="text-brand-emerald font-mono">${pkg.modB.setup} USD + IVA (Único)</strong>
                      </div>
                      <div className="mt-1 text-[11px] font-semibold text-brand-pine">
                        ✓ Actualizaciones normativas SRI, Nube y API IA incluidas
                      </div>
                    </div>
                  ) : (
                    <div className="mt-6 p-4 rounded-2xl bg-brand-emeraldSoft/60 border border-brand-emerald/30">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl sm:text-4xl font-extrabold text-brand-pine font-mono tabular-nums">
                          ${pkg.modA.license}
                        </span>
                        <span className="text-xs text-slate-600 font-mono">USD + IVA Licencia (Diseño Incluido)</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-brand-emerald/20 space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Nube + API IA (1,500 consultas):</span>
                          <strong className="text-swiss-pine font-mono">${pkg.modA.cloudMonthly} / mes + IVA</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Actualización normativa SRI (Año 2+):</span>
                          <strong className="text-slate-700 font-mono">${pkg.modA.annualSriYear2} / año + IVA</strong>
                        </div>
                      </div>
                    </div>
                  )}

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
                      modalityView === "B"
                        ? "Modalidad B (Membresía Mensual)"
                        : "Modalidad A (Compra de Licencia)"
                    )
                  }
                  className={`mt-8 w-full px-5 py-3.5 rounded-xl font-bold text-xs flex items-center justify-between gap-3 text-left transition-all ${
                    pkg.highlight
                      ? "bg-brand-emerald hover:bg-brand-pine text-white shadow-sm"
                      : "bg-swiss-canvas hover:bg-brand-emeraldSoft text-swiss-pine border border-slate-300 hover:border-brand-emerald"
                  }`}
                >
                  <span className="leading-snug">
                    Elegir {pkg.name.replace(/^[0-9]\.\s*/, "")} ({modalityView === "B" ? "Mensual" : "Licencia"})
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

        {/* MODALIDAD C: SERVICIOS INTEGRALES */}
        <div className="swiss-card rounded-3xl p-6 sm:p-8 mb-14">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 mb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-mono text-brand-emerald font-bold uppercase">
                MODALIDAD C · SERVICIOS INTEGRALES, PRODUCCIÓN AUDIOVISUAL IA & CONSULTORÍA
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-swiss-pine mt-0.5">
                Soluciones por Proyecto, Estudios de Mercado y Desarrollo a Medida
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-500">Tarifas Oficiales (USD)</span>
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

        {/* CALCULADORA DE AHORRO + ALIANZA CONTADORES */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 swiss-card rounded-3xl p-6 sm:p-8 border-2 border-brand-emerald/25">
            <div className="flex items-center gap-2.5 mb-2">
              <Calculator className="w-5 h-5 text-brand-emerald" />
              <h3 className="text-xl font-bold text-swiss-pine">
                Calculadora Interactiva de Ahorro para tu Empresa
              </h3>
            </div>
            <p className="text-xs text-slate-600 mb-6">
              Compara el costo total real entre Modalidad B, Modalidad A y proveedores tradicionales por separado.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-mono font-semibold text-slate-600 mb-1.5">
                  1. Selecciona tu Paquete Grupo Volia:
                </label>
                <select
                  value={calcPackage}
                  onChange={(e) => setCalcPackage(e.target.value as "individual" | "pyme" | "corp")}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-swiss-pine font-semibold focus:outline-none focus:border-brand-emerald"
                >
                  <option value="individual">1. Módulo Individual PYME ($35/mes o $490)</option>
                  <option value="pyme">2. Suite Completa PYME Estrella ($69/mes o $890)</option>
                  <option value="corp">3. Suite Corporativa Multisucursal ($119/mes o $1,490)</option>
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="p-4 rounded-2xl bg-brand-emeraldSoft/70 border border-brand-emerald/40">
                <div className="text-[10px] font-mono text-brand-emerald font-bold uppercase">
                  MODALIDAD B (MENSUAL)
                </div>
                <div className="text-2xl font-extrabold text-swiss-pine font-mono mt-1 tabular-nums">
                  ${totalModB.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  En {calcMonths} meses (${selectedPkg.modB.setup} + ${selectedPkg.modB.monthly}/m)
                </div>
                <div className="mt-2 pt-2 border-t border-brand-emerald/20 text-xs font-bold text-brand-emerald">
                  Ahorras ${savingsModB.toLocaleString()} USD
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-swiss-canvas border border-slate-300">
                <div className="text-[10px] font-mono text-brand-pine font-bold uppercase">
                  MODALIDAD A (LICENCIA)
                </div>
                <div className="text-2xl font-extrabold text-swiss-pine font-mono mt-1 tabular-nums">
                  ${totalModA.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  En {calcMonths} meses (${selectedPkg.modA.license} + ${selectedPkg.modA.cloudMonthly}/m)
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 text-xs font-bold text-brand-pine">
                  Ahorras ${savingsModA.toLocaleString()} USD
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200">
                <div className="text-[10px] font-mono text-slate-500 font-bold uppercase">
                  ERP + RRHH TRADICIONAL
                </div>
                <div className="text-2xl font-extrabold text-slate-400 line-through font-mono mt-1 tabular-nums">
                  ${totalCompetitor.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  En {calcMonths} meses (${traditionalSetupFee.toLocaleString()} setup + ${combinedCompetitorMonthly}/m)
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                  Sin App Empleados WL ni Copiloto IA
                </div>
              </div>
            </div>

            <div className="mt-4 p-3.5 rounded-2xl bg-swiss-pine text-white flex flex-wrap items-center justify-between gap-2 text-xs">
              <div>
                <div className="text-[10px] font-mono text-brand-emeraldBright font-bold uppercase">
                  GANANCIA OPERATIVA ESTIMADA POR INTERCONEXIÓN (10 MÓDULOS + IA)
                </div>
                <p className="text-slate-200 mt-0.5">
                  Horas liberadas en nómina IESS, cálculo automático 25%/50%/100%, SRI Auto-Retry, Kardex y conciliación.
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
