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
  const [competitorMonthly, setCompetitorMonthly] = useState<number>(280);
  const [referredClients, setReferredClients] = useState<number>(5);

  const packages = {
    individual: {
      name: "1. Módulo Individual PYME",
      subtitle: "Elige 1 Módulo: Contabilidad SRI (con Retenciones IVA), Inventario API, o CRM + IA",
      badge: "Entrada Rápida",
      highlight: false,
      modB: { setup: 120, monthly: 35 },
      modA: { license: 490, cloudMonthly: 19, annualSriYear2: 140 },
      features: [
        "1 Módulo a elección (Contabilidad SRI + Retención IVA Proveedores, Inventario API, o CRM)",
        "Incluye los 2 Agentes de IA (Agente Externo Ventas + Agente Interno Gerencia)",
        "Cuota incluida de 1,500 interacciones de IA / mes",
        "Personalización en 1 mes con hasta 3 revisiones previas a la entrega",
        "Actualizaciones de normativas incluidas dentro de la membresía mensual",
      ],
    },
    pyme: {
      name: "2. SUITE COMPLETA PYME",
      subtitle: "Contabilidad SRI + Retenciones + Inventario Conectado + Finanzas NIIF + CRM + Marketing + 2 IA",
      badge: "MÁS ELEGIDO · ESTRELLA",
      highlight: true,
      modB: { setup: 240, monthly: 69 },
      modA: { license: 890, cloudMonthly: 25, annualSriYear2: 220 },
      features: [
        "Los 5 Módulos Integrados: Contabilidad SRI (con Retención IVA Proveedores) + Inventario API POS + Finanzas NIIF + CRM + Marketing Ops",
        "Doble Agente IA activo 24/7 en Web (+ enlazable a WhatsApp Business Web*)",
        "1,500 interacciones mensuales de IA incluidas",
        "Personalización a tu marca en 1 mes (incluye hasta 3 revisiones previas a entrega final)",
        "Actualizaciones normativas SRI/NIIF 100% incluidas en membresía",
      ],
    },
    corp: {
      name: "3. Suite Corporativa / Multisucursal",
      subtitle: "Base de Datos Dedicada + Inventario Multibodega + Usuarios Ilimitados + 2 Agentes IA Pro",
      badge: "Mediana Empresa & Grupos",
      highlight: false,
      modB: { setup: 450, monthly: 119 },
      modA: { license: 1490, cloudMonthly: 39, annualSriYear2: 350 },
      features: [
        "Base de datos dedicada con aislamiento total, múltiples sucursales y bodegas de inventario",
        "Conexión API con sistemas de ventas/POS en Ecuador y múltiples puntos de emisión SRI",
        "Agentes IA Pro entrenados con catálogos extensos, stock en vivo y alertas UAFE",
        "Personalización en 1 mes (hasta 3 revisiones) + soporte prioritario ejecutivo",
        "Actualizaciones normativas SRI/NIIF incluidas sin costo adicional en membresía",
      ],
    },
  };

  const selectedPkg = packages[calcPackage];

  const totalModB = selectedPkg.modB.setup + selectedPkg.modB.monthly * calcMonths;
  const totalModA =
    selectedPkg.modA.license +
    selectedPkg.modA.cloudMonthly * calcMonths +
    (calcMonths > 12 ? selectedPkg.modA.annualSriYear2 : 0);
  const totalCompetitor = 600 + competitorMonthly * calcMonths;

  const savingsModB = Math.max(0, totalCompetitor - totalModB);
  const savingsModA = Math.max(0, totalCompetitor - totalModA);

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
            Tú eliges cómo contratar con <strong className="text-swiss-pine">Grupo Volia</strong>: empieza con una inversión inicial mínima en{" "}
            <strong className="text-swiss-pine">Modalidad B (Membresía Mensual)</strong> o adquiere la licencia con diseño incluido en{" "}
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
                        <span className="text-xs text-slate-500 font-mono">USD / mes</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                        <span className="text-slate-600">Diseño e Implementación Inicial:</span>
                        <strong className="text-brand-emerald font-mono">${pkg.modB.setup} USD (Único)</strong>
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
                        <span className="text-xs text-slate-600 font-mono">USD Licencia (Diseño Incluido)</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-brand-emerald/20 space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Nube + API IA (1,500 consultas):</span>
                          <strong className="text-swiss-pine font-mono">${pkg.modA.cloudMonthly} / mes</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Actualización normativa SRI (Año 2+):</span>
                          <strong className="text-slate-700 font-mono">${pkg.modA.annualSriYear2} / año</strong>
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
                  className={`mt-8 w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    pkg.highlight
                      ? "bg-brand-emerald hover:bg-brand-pine text-white shadow-sm"
                      : "bg-swiss-canvas hover:bg-brand-emeraldSoft text-swiss-pine border border-slate-300 hover:border-brand-emerald"
                  }`}
                >
                  <span>
                    Elegir {pkg.name.replace(/^[0-9]\.\s*/, "")} ({modalityView === "B" ? "Mensual" : "Licencia"})
                  </span>
                  <ArrowRight className="w-4 h-4" />
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
              • <strong className="text-swiss-pine">Actualizaciones de normativas (SRI / NIIF):</strong> ¡Están <strong>100% incluidas sin costo adicional</strong> dentro de tu paquete de membresía mensual!
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

            <div className="mb-6">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-600">
                  3. Gasto mensual en proveedores tradicionales (ERP + Inventario + CRM + Chatbot):
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
                  COMPETENCIA TRADICIONAL
                </div>
                <div className="text-2xl font-extrabold text-slate-400 line-through font-mono mt-1 tabular-nums">
                  ${totalCompetitor.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  En {calcMonths} meses ($600 setup + ${competitorMonthly}/m)
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                  Sin Doble Agente IA incluido
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
