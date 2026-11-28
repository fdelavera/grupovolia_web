import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  Calculator,
  CheckCircle2,
  Home,
  Layers,
  MessageCircle,
  PackageCheck,
  Percent,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Vanessa Vergara · Co-Hosting Airbnb & Gestión de Propiedades",
  description:
    "Presentación ejecutiva de GRUPOVOLIA S.A.S. para Vanessa Vergara: modalidad dual Co-Hosting Split y propiedades propias, liquidación exacta propietario vs. administradora, inventario de insumos, OPEX/CAPEX y facturación SRI Ecuador.",
  alternates: {
    canonical: "https://www.grupovolia.com/vanessa",
  },
};

const WHATSAPP_URL =
  "https://wa.me/593983374133?text=" +
  encodeURIComponent(
    "Hola Grupo Volia, revisé la presentación ejecutiva para Vanessa Vergara (https://www.grupovolia.com/vanessa) sobre Co-Hosting Airbnb y quiero agendar una reunión."
  );

const SOLUTIONS = [
  {
    num: "01",
    icon: Percent,
    title: "Modalidad Dual por Propiedad: Co-Hosting Split & 100% Propias",
    badge: "Todo en la Misma Consola",
    description:
      "Configura cada inmueble según su contrato real: modalidad Co-Hosting Split (por ejemplo 60% Propietario / 40% Administradora o cualquier porcentaje configurable) junto con propiedades 100% propias en un mismo panel.",
    bullets: [
      "Porcentaje de comisión configurable por propiedad y temporada",
      "Separación automática de ingresos entre cartera propia y administrada",
      "Historial de reservas, check-ins y estados de cuenta por dueño",
    ],
  },
  {
    num: "02",
    icon: Calculator,
    title: "Liquidación Exacta Propietario vs. Administradora + SRI",
    badge: "Cero Errores de Cierre",
    description:
      "Calcula automáticamente estadías + limpieza menos fee de plataforma, insumos consumidos y gastos de mantenimiento o mejoras, generando el monto exacto a cobrar (factura SRI de honorarios) y pagar al propietario.",
    bullets: [
      "Fórmula transparente: Estadías + Limpieza − Fee − Insumos − OPEX/CAPEX",
      "Emisión directa de factura electrónica SRI por honorarios de administración",
      "Reporte de liquidación listo para enviar al propietario cada mes",
    ],
  },
  {
    num: "03",
    icon: PackageCheck,
    title: "Inventario Real de Insumos + Gastos OPEX y CAPEX por Propiedad",
    badge: "Control Operativo Total",
    description:
      "Lleva el kardex real de insumos de limpieza y amenidades (sábanas, toallas, café, detergente, kits por check-out) y registra gastos de mantenimiento, arreglos (OPEX) y mejoras (CAPEX) imputados a cada unidad.",
    bullets: [
      "Descuento automático de kits de amenidades por cada check-out",
      "Diferenciación contable entre arreglos corrientes (OPEX) y mejoras (CAPEX)",
      "Stock mínimo y alertas de reposición para el equipo de limpieza",
    ],
  },
  {
    num: "04",
    icon: ShieldCheck,
    title: "Regla Clara Anti-Abuso / Fair-Use en Suite PYME",
    badge: "Hasta 15 Propiedades",
    description:
      "Transparencia total desde el día uno: la Suite PYME cubre hasta 15 propiedades administradas por la misma titular, con escalamiento ordenado por unidad adicional y sin permitir subarrendar la cuenta a terceros ajenos.",
    bullets: [
      "Hasta 15 propiedades administradas por la misma titular incluidas",
      "$5/mes por propiedad adicional, o escalamiento hasta 40 en Corporativo",
      "Uso exclusivo para la cartera bajo administración directa de la titular",
    ],
  },
];

const KPIS = [
  {
    label: "MODALIDAD DUAL",
    value: "Split + Propia",
    sub: "Ej. 60/40 configurable + unidades 100% propias",
  },
  {
    label: "CONTROL DE INSUMOS",
    value: "Kardex Real",
    sub: "Amenidades por check-out + OPEX / CAPEX",
  },
  {
    label: "VENTAJA LOCAL",
    value: "SRI Ecuador",
    sub: "Honorarios e inventario vs. Guesty/Hostaway",
  },
  {
    label: "SUITE PYME",
    value: "$69/mes",
    sub: "+ IVA anual ($828/año) · Hasta 15 propiedades",
  },
];

export default function VanessaPage() {
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
                    Presentación · Vanessa Vergara
                  </span>
                </div>
              </Link>

              <span className="hidden 2xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-emeraldSoft border border-brand-emerald/30 text-[11px] font-mono font-bold text-brand-pine whitespace-nowrap shrink-0">
                <Home className="w-3.5 h-3.5 text-brand-emerald" />
                Co-Hosting Airbnb
              </span>
            </div>

            <nav className="hidden lg:flex items-center gap-4 shrink-0">
              <a
                href="#video-vanessa"
                className="text-xs font-semibold text-slate-600 hover:text-brand-emerald transition-colors whitespace-nowrap"
              >
                Video Ejecutivo
              </a>
              <a
                href="#quienes-somos"
                className="text-xs font-semibold text-slate-600 hover:text-brand-emerald transition-colors whitespace-nowrap"
              >
                Por qué Grupo Volia
              </a>
              <a
                href="#soluciones"
                className="text-xs font-semibold text-slate-600 hover:text-brand-emerald transition-colors whitespace-nowrap"
              >
                Soluciones &amp; Fair-Use
              </a>
              <a
                href="#plan-pyme"
                className="text-xs font-semibold text-slate-600 hover:text-brand-emerald transition-colors whitespace-nowrap"
              >
                Suite PYME
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
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-swiss-canvas hover:bg-brand-emeraldSoft border border-slate-200 hover:border-brand-emerald/40 text-[11px] sm:text-xs font-semibold text-slate-700 hover:text-brand-pine transition-all whitespace-nowrap"
              >
                <span>WhatsApp</span>
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
          id="video-vanessa"
          className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 bg-swiss-pine text-white overflow-hidden"
        >
          <div className="absolute -top-32 right-0 w-[520px] h-[520px] bg-brand-emerald/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 -left-32 w-[420px] h-[420px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-swiss-pineMid border border-brand-emerald/50 text-brand-emeraldBright text-xs font-mono font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>VANESSA VERGARA · CO-HOSTING AIRBNB &amp; PROPIEDADES</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight leading-[1.12] text-white">
                  Control Total de{" "}
                  <span className="text-brand-emeraldBright">Co-Hosting Split</span>,
                  Insumos y Liquidación SRI en una Sola Consola.
                </h1>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  Presentación ejecutiva preparada por{" "}
                  <strong className="text-brand-emeraldBright">GRUPOVOLIA S.A.S.</strong> para{" "}
                  <strong className="text-white">Vanessa Vergara</strong>. Administra propiedades
                  propias y en Co-Hosting sin pagar por unidad en plataformas extranjeras, con
                  inventario real de amenidades y facturación electrónica SRI Ecuador.
                </p>

                <div className="space-y-2 text-xs sm:text-sm text-slate-200">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-emeraldBright shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Modalidad dual:</strong> Co-Hosting Split (ej.
                      60/40 configurable) y propiedades 100% propias.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-emeraldBright shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Liquidación exacta:</strong> estadías + limpieza
                      − fee − insumos − OPEX/CAPEX.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-brand-emeraldBright shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Suite PYME ($69/mes anual):</strong> hasta 15
                      propiedades administradas por la misma titular.
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-emerald hover:bg-brand-emeraldBright hover:text-swiss-pine text-white font-bold text-sm transition-all shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Activar por WhatsApp</span>
                  </a>

                  <a
                    href="#plan-pyme"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all"
                  >
                    <span>Ver Suite PYME ($69/mes)</span>
                    <ArrowUpRight className="w-4 h-4 text-brand-emeraldBright" />
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
                        Presentación Exclusiva · Vanessa Vergara Airbnb
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
                      src="/assets/video/Video_Vanessa_Airbnb_GrupoVolia_16x9.mp4"
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

        {/* Quiénes Somos & Comparativa */}
        <section id="quienes-somos" className="py-16 sm:py-20 bg-swiss-canvas border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emeraldSoft border border-brand-emerald/30 text-brand-pine text-xs font-mono font-bold">
                  <Building2 className="w-3.5 h-3.5 text-brand-emerald" />
                  <span>QUIÉNES SOMOS · GRUPOVOLIA S.A.S.</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-swiss-pine">
                  Una Plantilla Modular Unificada frente a Guesty y Hostaway
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  En <strong className="text-swiss-pine">GRUPOVOLIA S.A.S.</strong> (RUC{" "}
                  <span className="font-mono">0993410068001</span>) construimos software modular
                  adaptado a la realidad operativa y tributaria del Ecuador. A diferencia de{" "}
                  <strong className="text-swiss-pine">Guesty o Hostaway</strong> —que cobran por
                  cada propiedad en USD y{" "}
                  <strong className="text-swiss-pine">
                    no tienen inventario de insumos ni facturación electrónica SRI Ecuador
                  </strong>
                  —, nuestra plantilla modular unificada resuelve reservas, liquidaciones, bodega
                  de amenidades y facturación en un solo lugar.
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
                        Comparativa Directa
                      </div>
                      <div className="font-bold text-swiss-pine">
                        Grupo Volia vs. Plataformas Extranjeras
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-swiss-pine">Guesty / Hostaway:</strong> cobro por
                        propiedad en USD, sin kardex de limpieza ni SRI.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-swiss-pine">Grupo Volia:</strong> tarifa plana
                        PYME hasta 15 propiedades, insumos, OPEX/CAPEX y SRI nativo.
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
                <Home className="w-3.5 h-3.5 text-brand-emerald" />
                <span>OPERACIÓN CO-HOSTING &amp; PROPIEDADES</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-swiss-pine">
                Soluciones Específicas para su Portafolio
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Cada detalle operativo resuelto: desde el reparto de porcentajes por inmueble hasta
                el control de sábanas, café, arreglos y factura de honorarios.
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
                            PILAR {item.num}
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

        {/* Plan PYME + Fair Use */}
        <section id="plan-pyme" className="py-16 sm:py-20 bg-swiss-canvas border-y border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emeraldSoft border border-brand-emerald/30 text-brand-pine text-xs font-mono font-bold">
                <TrendingUp className="w-3.5 h-3.5 text-brand-emerald" />
                <span>PLAN RECOMENDADO &amp; FAIR-USE</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-swiss-pine">
                Suite PYME · Co-Hosting &amp; Propiedades
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                Diseñada para crecer con su cartera bajo reglas transparentes y sin sorpresas por moneda extranjera.
              </p>
            </div>

            <div className="rounded-3xl bg-swiss-pine text-white border border-brand-emerald/40 shadow-2xl p-7 sm:p-10 relative overflow-hidden">
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-emerald/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-emerald/20 border border-brand-emeraldBright/40 text-brand-emeraldBright text-xs font-mono font-bold">
                    HASTA 15 PROPIEDADES INCLUIDAS
                  </span>

                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-4xl sm:text-5xl font-extrabold tabular-nums text-white">
                      $69
                    </span>
                    <span className="text-base font-semibold text-brand-emeraldBright">
                      /mes + IVA en pago anual
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-mono text-slate-300">
                    Equivalente a <strong className="text-white">$828/año + IVA</strong> · o{" "}
                    <strong className="text-white">$83/mes + IVA</strong> en pago mensual.
                  </p>

                  <div className="inline-block rounded-xl bg-swiss-pineMid border border-white/15 px-4 py-2.5 text-xs sm:text-sm text-slate-200">
                    Setup único de configuración y capacitación:{" "}
                    <strong className="text-brand-emeraldBright font-mono">$120 + IVA</strong>
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-3 bg-swiss-pineMid/90 rounded-2xl p-5 border border-white/10">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-brand-emeraldBright">
                    Regla Anti-Abuso / Fair-Use
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-emeraldBright shrink-0 mt-0.5" />
                      <span>Hasta 15 propiedades administradas por la misma titular</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-emeraldBright shrink-0 mt-0.5" />
                      <span>$5/mes por propiedad adicional (o hasta 40 en Corporativo)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-emeraldBright shrink-0 mt-0.5" />
                      <span>No permite incluir propiedades de terceros ajenos a su administración</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-emeraldBright shrink-0 mt-0.5" />
                      <span>Incluye inventario de insumos, OPEX/CAPEX y facturación SRI</span>
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
              ¿Listos para ordenar su operación de Co-Hosting y propiedades?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Escríbanos por WhatsApp para revisar sus contratos actuales de Split, catálogo de
              amenidades y configurar su Suite PYME en pocos días.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-emerald hover:bg-brand-pine text-white font-bold text-sm transition-all shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Conversar por WhatsApp</span>
              </a>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-swiss-canvas hover:bg-brand-emeraldSoft border border-slate-200 hover:border-brand-emerald/40 text-swiss-pine font-bold text-sm transition-all"
              >
                <span>Conocer Grupo Volia</span>
                <ArrowUpRight className="w-4 h-4 text-brand-emerald" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-swiss-pine text-slate-300 py-8 border-t border-white/10 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <strong className="text-white">GRUPOVOLIA S.A.S.</strong> · RUC 0993410068001 ·
            Presentación Ejecutiva Vanessa Vergara · Ecuador
          </div>
          <div className="font-mono text-slate-400">
            Francisco de la Vera · info@grupovolia.com · +593 98 337 4133
          </div>
        </div>
      </footer>
    </div>
  );
}
