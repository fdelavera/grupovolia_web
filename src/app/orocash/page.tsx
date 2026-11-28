import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  Calculator,
  CheckCircle2,
  FileCheck2,
  Gem,
  Layers,
  Lock,
  MessageCircle,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "ORO CASH · Suite Prendaria & Joyería Multi-Sucursal Ecuador",
  description:
    "Presentación ejecutiva de GRUPOVOLIA S.A.S. para ORO CASH: avalúo por kilates conectado a XAU/USD, bóveda multi-sucursal, Liquidaciones de Compra 03, SRI ilimitado, Guías 06 y Radar UAFE nativo.",
  alternates: {
    canonical: "https://www.grupovolia.com/orocash",
  },
};

const WHATSAPP_URL =
  "https://wa.me/593983374133?text=" +
  encodeURIComponent(
    "Hola Grupo Volia, revisé la presentación ejecutiva para ORO CASH (https://www.grupovolia.com/orocash) y quiero coordinar una demo guiada de la Suite Corporativa Multisucursal."
  );

const DEMO_URL = "https://demo.grupovolia.com/demo/demo-comercio";

const SOLUTIONS = [
  {
    num: "01",
    icon: Calculator,
    title: "Calculadora de Avalúo por Kilates (10k–24k) y Peso Neto",
    badge: "Oráculo XAU/USD en Vivo",
    description:
      "Calcula el valor exacto por gramo según pureza (10k, 14k, 18k, 21k, 24k) y peso neto descontando piedras o mermas, conectado automáticamente al precio internacional del oro XAU/USD.",
    bullets: [
      "Márgenes de préstamo y compra configurables por gerencia",
      "Cotización estandarizada sin errores manuales en mostrador",
      "Trazabilidad del precio XAU/USD aplicado en cada boleta",
    ],
  },
  {
    num: "02",
    icon: Lock,
    title: "Contratos de Empeño / Retroventa, Refrendos y Bóveda Multi-Sucursal",
    badge: "Control Nacional por Agencia",
    description:
      "Administra contratos de empeño o compraventa con pacto de retroventa, renovaciones (refrendos), vencimientos y custodia en bóveda multi-sucursal bajo un código único por pieza.",
    bullets: [
      "Control centralizado por agencia nacional en tiempo real",
      "Permisos granulares por cajero, tasador y jefe de sucursal",
      "Alertas automáticas de vencimiento, mora y pase a vitrina",
    ],
  },
  {
    num: "03",
    icon: FileCheck2,
    title: "Liquidaciones de Compra 03 + Facturación SRI Ilimitada + Guías 06",
    badge: "100% Normativa SRI Ecuador",
    description:
      "Emisión electrónica directa al SRI sin intermediarios ni límites por documento: Liquidaciones de Compra (código 03) para compra de oro a personas naturales, Facturas de venta/intereses y Guías de Remisión (06).",
    bullets: [
      "Guías de Remisión 06 para traslados seguros entre sucursales y fundición",
      "Retenciones automáticas y anexos ATS listos para contabilidad",
      "Documentos electrónicos ilimitados incluidos en la suscripción",
    ],
  },
  {
    num: "04",
    icon: ShieldAlert,
    title: "Radar UAFE Obligatorio Integrado Nativo",
    badge: "Ventaja vs. Software Extranjero",
    description:
      "Monitoreo automático de umbrales >= $10,000 USD acumulados en 30 días por cliente o grupo vinculado, debida diligencia KYC/PEP y generación nativa de XML RESU para cumplimiento UAFE.",
    bullets: [
      "Alertas preventivas en caja antes de superar el umbral legal",
      "Ficha KYC/PEP y respaldo documental digital por operación",
      "A diferencia de PrendaFlex o Código01, incluye SRI Ecuador y UAFE nativos",
    ],
  },
];

const KPIS = [
  {
    label: "SECTOR & COBERTURA",
    value: "Multi-Sucursal",
    sub: "Control nacional centralizado · Ecuador",
  },
  {
    label: "ORÁCULO & AVALÚO",
    value: "10k – 24k",
    sub: "Conectado en vivo a XAU/USD + peso neto",
  },
  {
    label: "CUMPLIMIENTO LOCAL",
    value: "SRI + UAFE",
    sub: "Liq. 03, Guías 06, KYC/PEP y XML RESU",
  },
  {
    label: "SUITE CORPORATIVA",
    value: "$119/mes",
    sub: "+ IVA anual ($1,428/año) · $143/mes mensual",
  },
];

export default function OroCashPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-swiss-pine">
      {/* Fixed Swiss Emerald Glass Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 px-2.5 sm:px-6 pt-2.5 sm:pt-4 pointer-events-none">
        <div className="max-w-[1380px] mx-auto pointer-events-auto rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-swiss-lg py-2 sm:py-2.5 px-4 sm:px-5 lg:px-6">
          <div className="flex items-center justify-between gap-3 xl:gap-4">
            <div className="flex items-center gap-2.5 shrink-0">
              <Link href="/" className="flex items-center gap-2 group shrink-0">
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm p-0.5 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/branding/logo_grupovolia_isotipo_clean.png"
                    alt="Grupo Volia"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="leading-tight shrink-0">
                  <span className="font-extrabold tracking-tight text-swiss-pine text-xs sm:text-base block whitespace-nowrap">
                    GRUPO <span className="text-brand-emerald">VOLIA</span>
                  </span>
                  <span className="hidden sm:block text-[10px] font-mono text-brand-emerald font-bold uppercase tracking-wider whitespace-nowrap">
                    Presentación Ejecutiva · ORO CASH
                  </span>
                </div>
              </Link>

              <span className="hidden 2xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-emeraldSoft border border-brand-emerald/30 text-[11px] font-mono font-bold text-brand-pine whitespace-nowrap shrink-0">
                <Gem className="w-3.5 h-3.5 text-brand-emerald" />
                Prendario &amp; Joyería
              </span>
            </div>

            <nav className="hidden lg:flex items-center gap-4 shrink-0">
              <a
                href="#video-orocash"
                className="text-xs font-semibold text-slate-600 hover:text-brand-emerald transition-colors whitespace-nowrap"
              >
                Video Ejecutivo
              </a>
              <a
                href="#quienes-somos"
                className="text-xs font-semibold text-slate-600 hover:text-brand-emerald transition-colors whitespace-nowrap"
              >
                Quiénes Somos
              </a>
              <a
                href="#soluciones"
                className="text-xs font-semibold text-slate-600 hover:text-brand-emerald transition-colors whitespace-nowrap"
              >
                4 Soluciones Clave
              </a>
              <a
                href="#plan-corporativo"
                className="text-xs font-semibold text-slate-600 hover:text-brand-emerald transition-colors whitespace-nowrap"
              >
                Plan Corporativo
              </a>
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <Link
                href="/"
                className="hidden xl:inline-flex items-center gap-1 px-2.5 py-2 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-600 hover:text-swiss-pine transition-all whitespace-nowrap"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Web</span>
              </Link>

              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-swiss-canvas hover:bg-brand-emeraldSoft border border-slate-200 hover:border-brand-emerald/40 text-[11px] sm:text-xs font-semibold text-slate-700 hover:text-brand-pine transition-all whitespace-nowrap"
              >
                <span>Demo en Vivo</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-brand-emerald" />
              </a>

              <a
                href="#contacto"
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-brand-emerald hover:bg-brand-pine text-white font-bold text-[11px] sm:text-xs transition-all shadow-sm whitespace-nowrap"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Contactar</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with Video */}
        <section
          id="video-orocash"
          className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 bg-swiss-pine text-white overflow-hidden"
        >
          <div className="absolute -top-32 right-0 w-[520px] h-[520px] bg-brand-emerald/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 -left-32 w-[420px] h-[420px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-swiss-pineMid border border-brand-emerald/50 text-brand-emeraldBright text-xs font-mono font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ORO CASH · MULTI-SUCURSAL NACIONAL · ECUADOR</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight leading-[1.12] text-white">
                  Infraestructura Prendaria &amp; Joyera{" "}
                  <span className="text-brand-emeraldBright">Multi-Sucursal</span>{" "}
                  con SRI y Radar UAFE Nativo.
                </h1>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  Propuesta tecnológica dedicada para{" "}
                  <strong className="text-white">ORO CASH</strong> desarrollada por{" "}
                  <strong className="text-brand-emeraldBright">GRUPOVOLIA S.A.S.</strong>:
                  una suite modular en la nube sobre plantilla única actualizable que unifica{" "}
                  <strong className="text-white">
                    avalúo XAU/USD, bóveda nacional, facturación SRI y cumplimiento UAFE
                  </strong>{" "}
                  en una sola consola.
                </p>

                <div className="space-y-2 text-xs sm:text-sm text-slate-200">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-emeraldBright shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Avalúo exacto 10k–24k:</strong>{" "}
                      conectado al precio internacional XAU/USD y peso neto.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-emeraldBright shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">SRI + UAFE integrados:</strong>{" "}
                      Liquidaciones 03, Guías 06, alertas &gt;=$10,000 y XML RESU.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-brand-emeraldBright shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Ventaja competitiva local:</strong>{" "}
                      supera a PrendaFlex / Código01 que carecen de SRI y UAFE Ecuador.
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={DEMO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-emerald hover:bg-brand-emeraldBright hover:text-swiss-pine text-white font-bold text-sm transition-all shadow-lg"
                  >
                    <span>Probar Demo en Vivo</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-brand-emeraldBright" />
                    <span>WhatsApp Ejecutivo</span>
                  </a>

                  <a
                    href="#plan-corporativo"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-swiss-pineMid hover:bg-white/10 border border-brand-emerald/40 text-brand-emeraldLight font-semibold text-sm transition-all"
                  >
                    <span>Ver Inversión ($119/mes)</span>
                  </a>
                </div>
              </div>

              {/* Right: Dedicated Video Player */}
              <div className="lg:col-span-7">
                <div className="rounded-3xl bg-swiss-pineMid border border-brand-emerald/40 p-2.5 sm:p-3.5 shadow-2xl">
                  <div className="flex items-center justify-between gap-2 px-2 pb-2.5 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-2.5 w-2.5 rounded-full bg-brand-emeraldBright animate-pulse" />
                      <span className="font-mono font-bold text-brand-emeraldBright uppercase tracking-wider">
                        Presentación Exclusiva · ORO CASH Ecuador
                      </span>
                    </div>
                    <span className="font-mono text-slate-300 text-[11px]">
                      16:9 HD · Grupo Volia
                    </span>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden bg-black aspect-video border border-white/10">
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      src="/assets/video/Video_OroCash_GrupoVolia_16x9.mp4"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom KPI Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
              {KPIS.map((kpi, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-swiss-pineMid/90 border border-brand-emerald/35 p-5 shadow-lg"
                >
                  <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand-emeraldBright">
                    {kpi.label}
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tabular-nums">
                    {kpi.value}
                  </div>
                  <div className="text-xs text-slate-300 mt-1 leading-snug">{kpi.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quiénes Somos */}
        <section id="quienes-somos" className="py-16 sm:py-20 bg-swiss-canvas border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emeraldSoft border border-brand-emerald/30 text-brand-pine text-xs font-mono font-bold">
                  <Building2 className="w-3.5 h-3.5 text-brand-emerald" />
                  <span>QUIÉNES SOMOS · GRUPOVOLIA S.A.S.</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-swiss-pine">
                  Suite Modular en la Nube + Plantilla Única Actualizable para el Sector Prendario y Joyero
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  En <strong className="text-swiss-pine">GRUPOVOLIA S.A.S.</strong> (RUC{" "}
                  <span className="font-mono">0993410068001</span>) diseñamos infraestructura
                  empresarial de grado corporativo para operaciones multi-sucursal en Ecuador.
                  A diferencia de desarrollos a la medida que se vuelven obsoletos o software
                  extranjero desconectado de la normativa local, nuestra{" "}
                  <strong className="text-swiss-pine">plantilla única actualizable</strong>{" "}
                  evoluciona de forma continua con cada cambio tributario del SRI y regulatorio de la UAFE.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="swiss-card rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-emeraldSoft border border-brand-emerald/30 flex items-center justify-center">
                      <Layers className="w-5 h-5 text-brand-emerald" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold text-brand-emerald uppercase">
                        Ventaja Estructural
                      </div>
                      <div className="font-bold text-swiss-pine">
                        Nativo Ecuador vs. Software Extranjero
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-swiss-pine">PrendaFlex / Código01:</strong> no
                        emiten Liquidaciones de Compra 03, Guías 06 ni XML RESU UAFE.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-swiss-pine">Grupo Volia:</strong> 100% nube,
                        actualizaciones automáticas, soporte directo en Ecuador y demo verificable.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Soluciones Específicas */}
        <section id="soluciones" className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-12 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emeraldSoft border border-brand-emerald/30 text-brand-pine text-xs font-mono font-bold">
                <Scale className="w-3.5 h-3.5 text-brand-emerald" />
                <span>ARQUITECTURA FUNCIONAL PARA ORO CASH</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-swiss-pine">
                4 Soluciones Específicas Incluidas en su Suite
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Diseñadas para cubrir desde la tasación en mostrador hasta el traslado a fundición y
                el reporte oficial ante SRI y UAFE.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SOLUTIONS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.num}
                    className="swiss-card swiss-card-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-5"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl bg-brand-emeraldSoft border border-brand-emerald/30 flex items-center justify-center text-brand-emerald shrink-0">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="font-mono text-xs font-bold text-slate-400">
                            MÓDULO {item.num}
                          </span>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-swiss-canvas border border-slate-200 text-[11px] font-mono font-bold text-brand-pine">
                          {item.badge}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-extrabold text-swiss-pine leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                    </div>

                    <ul className="space-y-2 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-700">
                      {item.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Plan Recomendado */}
        <section id="plan-corporativo" className="py-16 sm:py-20 bg-swiss-canvas border-y border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emeraldSoft border border-brand-emerald/30 text-brand-pine text-xs font-mono font-bold">
                <TrendingUp className="w-3.5 h-3.5 text-brand-emerald" />
                <span>PLAN RECOMENDADO</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-swiss-pine">
                Suite Corporativa Multisucursal
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Licenciamiento unificado para operar todas las agencias de ORO CASH con SRI ilimitado y Radar UAFE nativo.
              </p>
            </div>

            <div className="rounded-3xl bg-swiss-pine text-white border border-brand-emerald/40 shadow-2xl p-7 sm:p-10 relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-emerald/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-emerald/20 border border-brand-emeraldBright/40 text-brand-emeraldBright text-xs font-mono font-bold">
                    AHORRO ANUAL · TODO INCLUIDO
                  </span>

                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-4xl sm:text-5xl font-extrabold tabular-nums text-white">
                      $119
                    </span>
                    <span className="text-base font-semibold text-brand-emeraldBright">
                      /mes + IVA en pago anual
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-mono text-slate-300">
                    Equivalente a <strong className="text-white">$1,428/año + IVA</strong> · o{" "}
                    <strong className="text-white">$143/mes + IVA</strong> en modalidad mensual.
                  </p>

                  <div className="inline-block rounded-xl bg-swiss-pineMid border border-white/15 px-4 py-2.5 text-xs sm:text-sm text-slate-200">
                    Setup único de implementación, carga inicial y capacitación:{" "}
                    <strong className="text-brand-emeraldBright font-mono">$250 + IVA</strong>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-3 bg-swiss-pineMid/90 rounded-2xl p-5 border border-white/10">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-brand-emeraldBright">
                    Incluye en la Suite
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-emeraldBright shrink-0 mt-0.5" />
                      <span>Oráculo XAU/USD + Calculadora 10k–24k</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-emeraldBright shrink-0 mt-0.5" />
                      <span>Bóveda Multi-Sucursal y Contratos/Refrendos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-emeraldBright shrink-0 mt-0.5" />
                      <span>Liq. Compra 03 + Facturación SRI Ilimitada + Guías 06</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-emeraldBright shrink-0 mt-0.5" />
                      <span>Radar UAFE (&gt;=$10,000 / 30 días, KYC/PEP, XML RESU)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contacto CTA */}
        <section id="contacto" className="py-16 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-swiss-pine">
              ¿Listo para centralizar ORO CASH en una sola consola?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Pruebe el entorno ERP en vivo ahora mismo o escríbanos por WhatsApp para revisar el
              flujo de avalúo XAU/USD, bóveda por agencia y reporte UAFE con su equipo.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-emerald hover:bg-brand-pine text-white font-bold text-sm transition-all shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Agendar Demo por WhatsApp</span>
              </a>
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-swiss-canvas hover:bg-brand-emeraldSoft border border-slate-200 hover:border-brand-emerald/40 text-swiss-pine font-bold text-sm transition-all"
              >
                <span>Abrir Demo en Vivo</span>
                <ArrowUpRight className="w-4 h-4 text-brand-emerald" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-swiss-pine text-slate-300 py-8 border-t border-white/10 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <strong className="text-white">GRUPOVOLIA S.A.S.</strong> · RUC 0993410068001 ·
            Presentación Ejecutiva ORO CASH · Ecuador
          </div>
          <div className="font-mono text-slate-400">
            Francisco de la Vera · info@grupovolia.com · +593 98 337 4133
          </div>
        </div>
      </footer>
    </div>
  );
}
