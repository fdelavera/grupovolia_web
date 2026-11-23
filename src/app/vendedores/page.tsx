"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  Briefcase,
  Calculator,
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  ExternalLink,
  FileCheck2,
  FileSignature,
  Layers,
  Loader2,
  Mail,
  PlayCircle,
  RefreshCw,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import GrupoVoliaChatModal from "@/components/chat/GrupoVoliaChatModal";
import { buildGoogleCalendarBookingUrl } from "@/lib/calendar-booking";
import { VendedoresWelcomeTour } from "@/components/vendedores/VendedoresWelcomeTour";

const FOUR_CLOSING_REASONS = [
  {
    number: "01",
    icon: RefreshCw,
    title: "Facturación SRI Ilimitada con Reintento Automático",
    badge: "$0 extra por documento",
    desc: "Mientras la competencia cobra paquetes de folios por cada factura o deja ventas trabadas cuando el SRI presenta intermitencias, Grupo Volia ofrece emisión 100% ilimitada con Reintento Automático ante caídas del SRI: si el portal del SRI se cae, la suite reintenta sola en segundo plano hasta autorizar sin intervención del usuario.",
    highlight: "Cero facturas perdidas y ahorro inmediato frente a sistemas por paquetes.",
  },
  {
    number: "02",
    icon: Layers,
    title: "10 Módulos Interconectados (incl. RRHH Ecuador) & 10 Demos Vivos",
    badge: "Cierre visual al instante",
    desc: "No muestras un ERP genérico aburrido. Llegas a la cita con 10 módulos independientes e interconectados (incluyendo el nuevo Módulo 10 RRHH Ecuador + App Empleados 100% White-Label, Radar Feriados IA y Biométricos) y 10 demos vivos adaptados al lenguaje de cada industria en Ecuador.",
    highlight: "El dueño de negocio ve su propia operación resuelta en los primeros 3 minutos.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Blindaje LOPDP con Cifrado AES-256-GCM",
    badge: "Cumplimiento Ecuador",
    desc: "Las empresas ecuatorianas hoy enfrentan multas por exponer datos de pacientes, alumnos, clientes o firmas electrónicas .p12 en Excel o chats informales. Grupo Volia cifra la información sensible con estándar bancario AES-256-GCM y aislamiento estricto multi-tenant (Row Level Security).",
    highlight: "Argumento decisivo para clínicas, colegios, constructoras e inmobiliarias.",
  },
  {
    number: "04",
    icon: Smartphone,
    title: "Tu propia Web App Comercial (/ventas) en Tablet o Celular",
    badge: "Proformas IA + Firma Digital",
    desc: "Vendes con herramienta de primer nivel en el bolsillo: desde la Web App /ventas generas Proformas asistidas por IA con tu cálculo exacto, activas Pases Demo de 24 horas para que el cliente pruebe en vivo y cierras el trato con Firma Autógrafa Digital directamente en pantalla.",
    highlight: "Pasas de la demostración al cierre firmado en la misma visita o videollamada.",
  },
];

const TEN_INDUSTRIES_LIST = [
  "Consultorios Médicos & Odontología (CIE-10)",
  "Escuelas, Colegios & Academias (Pensiones 0% IVA)",
  "Importadoras, Tiendas & Mayoristas (Landed Cost + POS)",
  "Constructoras & Inmobiliarias (Alertas + XML UAFE)",
  "Restaurantes, Cafeterías & Catering (Food Cost %)",
  "Agroindustria, Camaroneras & Cacao (Liquidaciones 03)",
  "Talleres Automotrices & Flotas (Órdenes por Placa)",
  "Farmacias, Estética & Salud (Semáforo ARCSA)",
  "Gimnasios, Clubes & Membresías (Pagos Recurrentes)",
  "Estudios Contables, Legales & Agencias (ATS / 103 / 104)",
];

export default function VendedoresPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const [showWelcomePrompt, setShowWelcomePrompt] = useState(false);
  const [simClients, setSimClients] = useState(6);
  const [simPlanUsd, setSimPlanUsd] = useState<35 | 69 | 119>(69);

  useEffect(() => {
    try {
      const seen = window.localStorage.getItem("gv_vendedores_welcome_v1");
      if (!seen) setShowWelcomePrompt(true);
    } catch {
      // Storage indisponible
    }
  }, []);

  const dismissWelcomePrompt = () => {
    setShowWelcomePrompt(false);
    try {
      window.localStorage.setItem("gv_vendedores_welcome_v1", new Date().toISOString());
    } catch {
      // Ignorar
    }
  };

  const simInitialRef = Number((simClients * simPlanUsd * 0.25).toFixed(2));
  const simMonthlyRef = Number((simClients * simPlanUsd * 0.18).toFixed(2));
  const simYear1Ref = Number((simInitialRef + simMonthlyRef * 12).toFixed(2));

  const [fullName, setFullName] = useState("");
  const [roleType, setRoleType] = useState<"Asesor Comercial Independiente" | "Líder de Célula Comercial">(
    "Asesor Comercial Independiente"
  );
  const [city, setCity] = useState("Guayaquil / Quito / Remoto Ecuador");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState("");
  const [interviewDate, setInterviewDate] = useState(() => {
    const d = new Date(Date.now() + 86_400_000);
    return d.toISOString().slice(0, 10);
  });
  const [interviewTime, setInterviewTime] = useState("10:00");
  const [lastInterviewUrl, setLastInterviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const interviewCalendarUrl = buildGoogleCalendarBookingUrl({
    title: `Entrevista Fuerza Comercial Grupo Volia — ${fullName || "Postulante"}`,
    dateStr: interviewDate,
    timeStr: interviewTime,
    channelEmail: "ventas@grupovolia.com",
    details: `Rol: ${roleType}\nCiudad: ${city}\nPostulante: ${fullName || "-"} (${email || "-"})\nCanal: ventas@grupovolia.com`,
  });

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !experience.trim()) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          company: `Postulación Fuerza Comercial · ${city}`,
          email,
          phone,
          packageInterest: `Postulación: ${roleType}`,
          modality: "Portal /vendedores — Fuerza Comercial Ecuador",
          bookingDate: interviewDate,
          bookingTime: interviewTime,
          bookingChannel: "ventas@grupovolia.com",
          message: `Rol solicitado: ${roleType}\nCiudad / Cobertura: ${city}\n\nExperiencia y perfil comercial:\n${experience}`,
        }),
      });
      if (res.ok) {
        setLastInterviewUrl(interviewCalendarUrl);
        setStatus("success");
        setFullName("");
        setEmail("");
        setPhone("");
        setExperience("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-swiss-pine">
      <Navbar onOpenChat={() => setChatOpen(true)} />

      <main className="flex-1 pt-28 pb-20">
        {/* HERO RECRUITMENT SECTION */}
        <section className="bg-swiss-canvas border-b border-slate-200 pb-16 pt-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-brand-emerald transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver al portal para empresas clientes</span>
              </Link>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-brand-emerald/30 text-[11px] font-mono font-bold text-brand-pine shadow-sm">
                <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
                <span>CONVOCATORIA ECUADOR · ASESORES &amp; LÍDERES COMERCIALES</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center p-1.5 shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/assets/branding/logo_grupovolia_isotipo_clean.png"
                      alt="Grupo Volia S.A.S."
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-brand-emerald uppercase tracking-wider">
                      GRUPO VOLIA S.A.S. · PORTAL FUERZA COMERCIAL
                    </div>
                    <div className="text-xs text-slate-500">
                      Programa de Asesores Independientes y Células Comerciales
                    </div>
                  </div>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-swiss-pine leading-[1.1]">
                  Únete a la Fuerza Comercial de Grupo Volia S.A.S. ·{" "}
                  <span className="text-brand-emerald">
                    Tecnología B2B con Demanda Real en Ecuador
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                  Representa la suite empresarial que toda PYME ecuatoriana necesita hoy: Contabilidad e Inventario con{" "}
                  <strong className="text-swiss-pine">Facturación SRI Ilimitada y Reintento Automático</strong>,{" "}
                  <strong className="text-swiss-pine">10 demos especializados por industria</strong>, blindaje{" "}
                  <strong className="text-swiss-pine">LOPDP AES-256-GCM</strong> y un Copiloto IA integrado, respaldado por tu propia{" "}
                  <strong className="text-brand-emerald">Web App Comercial (/ventas)</strong> para cerrar en campo.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href="https://app.grupovolia.com/ventas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-swiss-pine hover:bg-brand-pine text-white font-bold text-xs sm:text-sm shadow-swiss-md transition-all"
                  >
                    <Briefcase className="w-4 h-4 text-brand-emeraldBright" />
                    <span>Ya soy Vendedor · Entrar a la Web App /ventas</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>

                  <a
                    href="#postular"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-brand-emerald hover:bg-brand-pine text-white font-bold text-xs sm:text-sm shadow-swiss-md transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Postular como Asesor / Líder Comercial</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      dismissWelcomePrompt();
                      setTourOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-white hover:bg-brand-emeraldSoft border-2 border-brand-emerald/40 text-brand-pine font-bold text-xs sm:text-sm shadow-sm transition-all"
                  >
                    <Compass className="w-4 h-4 text-brand-emerald" />
                    <span>Tour 60s · Descubre tu Oficina Móvil</span>
                  </button>
                </div>
              </div>

              {/* Right Summary Card */}
              <div
                data-tour-id="vend-tour-app"
                className="lg:col-span-5 swiss-card rounded-3xl p-6 sm:p-7 bg-white space-y-5"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <div className="text-[11px] font-mono font-bold text-brand-emerald uppercase">
                      HERRAMIENTAS DEL ASESOR
                    </div>
                    <h2 className="text-lg font-extrabold text-swiss-pine mt-0.5">
                      Tu Web App Comercial <span className="font-mono text-brand-emerald">/ventas</span>
                    </h2>
                  </div>
                  <div className="p-2.5 rounded-xl bg-brand-emeraldSoft text-brand-emerald border border-brand-emerald/30">
                    <FileSignature className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-600">
                  <div className="p-3 rounded-2xl bg-swiss-canvas border border-slate-200 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-swiss-pine block">Proformas IA en Segundos</strong>
                      Arma propuestas formales en PDF con logos y planes ($35–$119/m + IVA) directo desde tablet o celular.
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-swiss-canvas border border-slate-200 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-swiss-pine block">Pases Demo 24 Horas</strong>
                      Entrega al cliente un acceso demo en vivo de su industria para que pruebe antes de decidir.
                    </div>
                  </div>
                  <div className="p-3 rounded-2xl bg-swiss-canvas border border-slate-200 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-swiss-pine block">Firma Autógrafa Digital en Pantalla</strong>
                      Cierra el acuerdo en la misma reunión con firma autógrafa digital y seguimiento de tu cartera.
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Capacitación: 45 min + Guiones</span>
                  <Link href="/" className="text-brand-emerald font-bold hover:underline">
                    Ver Portal Clientes →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 REASONS WHY IT'S EASY TO CLOSE */}
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emeraldSoft border border-brand-emerald/30 text-brand-pine text-xs font-mono font-bold mb-3">
                <TrendingUp className="w-3.5 h-3.5 text-brand-emerald" />
                <span>VENTA CONSULTIVA DE ALTA CONVERSIÓN</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-swiss-pine tracking-tight">
                4 Razones por las que es Fácil Cerrar Ventas con{" "}
                <span className="text-brand-emerald">Grupo Volia</span>
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Cada objeción común del empresario ecuatoriano ya viene resuelta de fábrica dentro del producto y en tu app comercial.
              </p>
            </div>

            <div data-tour-id="vend-tour-reasons" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {FOUR_CLOSING_REASONS.map((reason) => {
                const Icon = reason.icon;
                return (
                  <div
                    key={reason.number}
                    className="swiss-card swiss-card-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-5"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="w-9 h-9 rounded-xl bg-swiss-pine text-white font-mono font-extrabold text-xs flex items-center justify-center">
                            {reason.number}
                          </span>
                          <div className="p-2.5 rounded-xl bg-brand-emeraldSoft text-brand-emerald border border-brand-emerald/30">
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-brand-emeraldSoft border border-brand-emerald/30 text-brand-pine font-mono font-bold text-[11px]">
                          {reason.badge}
                        </span>
                      </div>

                      <h3 className="text-xl font-extrabold text-swiss-pine leading-snug">
                        {reason.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {reason.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-brand-pine">
                      <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0" />
                      <span>{reason.highlight}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 10 Specialized Industries Strip */}
            <div data-tour-id="vend-tour-industries" className="rounded-3xl bg-swiss-canvas border border-slate-200 p-6 sm:p-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-mono font-bold text-brand-emerald uppercase">
                    PROSPECCIÓN SEGMENTADA EN ECUADOR
                  </div>
                  <h3 className="text-lg font-extrabold text-swiss-pine">
                    Los 10 Giros con Demo Especializado Listo para Mostrar
                  </h3>
                </div>
                <Link
                  href="/#seguridad-lopdp"
                  className="text-xs font-bold text-brand-emerald hover:underline inline-flex items-center gap-1"
                >
                  <span>Explorar las 10 industrias en el portal</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                {TEN_INDUSTRIES_LIST.map((industry) => (
                  <div
                    key={industry}
                    className="px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-[11px] font-semibold text-swiss-pine flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald shrink-0 mt-0.5" />
                    <span>{industry}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TRANSPARENT COMMISSIONS & COMMERCIAL CELLS + AGILE TRAINING */}
        <section className="py-20 bg-swiss-canvas border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-brand-emerald/30 text-brand-pine text-xs font-mono font-bold mb-3 shadow-sm">
                <Award className="w-3.5 h-3.5 text-brand-emerald" />
                <span>MODELO DE INGRESOS Y FORMACIÓN</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-swiss-pine tracking-tight">
                Comisiones Transparentes,{" "}
                <span className="text-brand-emerald">Células Comerciales</span> y Capacitación Ágil
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Dos rutas claras de crecimiento profesional según tu perfil, con reglas transparentes desde el primer día y formación rápida para empezar a facturar comisiones en tu primera semana.
              </p>
            </div>

            <div data-tour-id="vend-tour-income" className="space-y-6">
              {/* Simulador Rápido Referencial (Esquema Público 25% + 18%) */}
              <div className="swiss-card rounded-3xl p-6 sm:p-8 bg-white border border-brand-emerald/30 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-brand-emerald uppercase">
                      <Calculator className="w-3.5 h-3.5" />
                      <span>SIMULADOR REFERENCIAL DE CARTERA COMERCIAL</span>
                    </div>
                    <h3 className="text-lg font-extrabold text-swiss-pine mt-0.5">
                      Proyecta tu Ingreso con Clientes Activos en Ecuador
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 text-xs font-bold">
                    {([
                      [35, "Individual $35/m"],
                      [69, "Suite PYME $69/m"],
                      [119, "Corporativo $119/m"],
                    ] as const).map(([val, lbl]) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setSimPlanUsd(val)}
                        className={`px-3 py-1.5 rounded-xl border transition-colors ${
                          simPlanUsd === val
                            ? "bg-swiss-pine text-white border-swiss-pine"
                            : "bg-swiss-canvas text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {lbl}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                  <div className="lg:col-span-5 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-semibold">Empresas Activas Cerradas:</span>
                      <strong className="font-mono text-sm text-brand-emerald">
                        {simClients} empresa{simClients === 1 ? "" : "s"}
                      </strong>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={25}
                      value={simClients}
                      onChange={(e) => setSimClients(Number(e.target.value))}
                      className="w-full accent-brand-emerald cursor-pointer"
                    />
                    <p className="text-[11px] text-slate-500">
                      Cálculo referencial público (25% de entrada inicial + 18% recurrente mensual sobre tarifa base sin IVA). Las condiciones contractuales finales se revisan en entrevista privada.
                    </p>
                  </div>

                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-2xl bg-swiss-canvas border border-slate-200">
                      <div className="text-[10px] font-mono uppercase text-slate-500">Cierre Inicial Ref.</div>
                      <div className="text-lg font-extrabold font-mono text-swiss-pine mt-0.5 tabular-nums">
                        ${simInitialRef.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                      <div className="text-[10px] font-mono uppercase text-brand-pine">Renta Mensual Ref.</div>
                      <div className="text-lg font-extrabold font-mono text-brand-emerald mt-0.5 tabular-nums">
                        +${simMonthlyRef.toLocaleString("en-US", { minimumFractionDigits: 2 })}/m
                      </div>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-swiss-pine text-white">
                      <div className="text-[10px] font-mono uppercase text-emerald-300">Acumulado Año 1 Ref.</div>
                      <div className="text-lg font-extrabold font-mono mt-0.5 tabular-nums">
                        ${simYear1Ref.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Card 1: Independent Advisors */}
              <div className="swiss-card rounded-3xl p-6 sm:p-8 bg-white space-y-5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-brand-emeraldSoft border border-brand-emerald/30 text-brand-pine font-mono font-bold text-[11px]">
                    RUTA 1 · ASESORES INDEPENDIENTES
                  </span>
                  <FileCheck2 className="w-5 h-5 text-brand-emerald" />
                </div>
                <h3 className="text-2xl font-extrabold text-swiss-pine">
                  Comisión de Cierre + Ingreso Mensual Recurrente
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Ganas desde tu primer cliente con un esquema dual transparente: una comisión inicial sobre el primer cierre acreditado más un porcentaje recurrente mes a mes sobre las membresías activas de tu cartera.
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 pt-2 border-t border-slate-100">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                    <span>
                      <strong>Doble fuente de ingreso:</strong> comisión de entrada por cierre (esquema referencial desde 25% inicial + 18% recurrente mensual según rol y volumen) y construcción de cartera acumulativa.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                    <span>
                      <strong>Sin techo ni exclusividad restrictiva:</strong> gestiona tu tiempo y prospección en tu ciudad o sector con visibilidad clara de tus cierres en <code className="font-mono text-brand-pine">/ventas</code>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                    <span>
                      <strong>Ticket fácil de aprobar:</strong> planes PYME desde $35 hasta $119/mes + IVA (con cancelación anticipada sin penalización), muy por debajo del software tradicional.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Card 2: Commercial Cells for Leaders */}
              <div className="swiss-card rounded-3xl p-6 sm:p-8 bg-swiss-pine text-white border-swiss-pine space-y-5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-brand-emeraldBright font-mono font-bold text-[11px]">
                    RUTA 2 · LÍDERES DE EQUIPO
                  </span>
                  <Users className="w-5 h-5 text-brand-emeraldBright" />
                </div>
                <h3 className="text-2xl font-extrabold text-white">
                  Modelo de Células Comerciales para Líderes
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Si ya diriges vendedores, manejas una red de consultores o cuentas con experiencia formando equipos comerciales en Ecuador, puedes encabezar una <strong className="text-white">Célula Comercial Grupo Volia</strong>.
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200 pt-2 border-t border-white/15">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-emeraldBright shrink-0 mt-0.5" />
                    <span>
                      <strong>Diferencial e incentivo de liderazgo:</strong> además de tus propios cierres, percibes un diferencial transparente por la producción mensual y retención de tu célula comercial.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-emeraldBright shrink-0 mt-0.5" />
                    <span>
                      <strong>Acompañamiento de dirección:</strong> coordinas metas semanales, asignación de demos por industria y revisión de cierres junto al equipo central.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-emeraldBright shrink-0 mt-0.5" />
                    <span>
                      <strong>Confidencialidad y formalidad:</strong> los detalles contractuales internos, anexos de metas y acuerdos de célula se entregan únicamente en entrevista privada tras validar tu postulación.
                    </span>
                  </li>
                </ul>
              </div>
              </div>
            </div>

            {/* Agile Training Banner */}
            <div className="rounded-3xl bg-white border-2 border-brand-emerald/30 p-6 sm:p-8 shadow-swiss-md grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-brand-emerald uppercase">
                  <Clock className="w-4 h-4" />
                  <span>CAPACITACIÓN ÁGIL · SIN CURVAS LARGAS NI TEORÍA INNECESARIA</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-swiss-pine">
                  Aprende a Vender en 45 Minutos con Guiones Listos y Demos Grabados
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  No necesitas semanas de inducción ni ser ingeniero. Nuestro programa de onboarding es práctico y directo: recibes{" "}
                  <strong className="text-swiss-pine">guiones comerciales listos por industria</strong> (llamada, WhatsApp y manejo de objeciones) junto a{" "}
                  <strong className="text-swiss-pine">videollamadas grabadas de 45 minutos</strong> para dominar los 10 demos, generar Proformas IA, emitir Pases Demo 24h y cerrar con Firma Autógrafa Digital.
                </p>
              </div>
              <div className="md:col-span-4 flex flex-col gap-2.5">
                <div className="p-3.5 rounded-2xl bg-swiss-canvas border border-slate-200 flex items-center gap-3">
                  <PlayCircle className="w-5 h-5 text-brand-emerald shrink-0" />
                  <div className="text-xs">
                    <div className="font-bold text-swiss-pine">Videollamadas de 45 min</div>
                    <div className="text-slate-500">Acceso on-demand desde el día 1</div>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-swiss-canvas border border-slate-200 flex items-center gap-3">
                  <FileCheck2 className="w-5 h-5 text-brand-emerald shrink-0" />
                  <div className="text-xs">
                    <div className="font-bold text-swiss-pine">Guiones y Objeciones</div>
                    <div className="text-slate-500">Listos para WhatsApp y visita</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* APPLICATION FORM & DIRECT CHANNELS */}
        <section id="postular" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left info */}
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-emeraldSoft border border-brand-emerald/30 text-brand-pine text-xs font-mono font-bold">
                  <Briefcase className="w-3.5 h-3.5 text-brand-emerald" />
                  <span>POSTULACIÓN EN LÍNEA</span>
                </div>
                <h2 className="text-3xl font-extrabold text-swiss-pine tracking-tight">
                  Postula como Asesor o{" "}
                  <span className="text-brand-emerald">Líder Comercial</span>
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Cuéntanos tu experiencia comercial y la ciudad o sectores donde te desenvuelves. Nuestro equipo revisará tu perfil y coordinará una entrevista breve para darte acceso a la capacitación de 45 minutos y a tu cuenta en <code className="font-mono text-brand-pine">/ventas</code>.
                </p>

                <div className="swiss-card rounded-2xl p-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-brand-emeraldSoft text-brand-emerald border border-brand-emerald/30 shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-swiss-pine">
                        Correo Oficial de Reclutamiento Comercial
                      </div>
                      <a
                        href="mailto:ventas@grupovolia.com?subject=Postulaci%C3%B3n%20Fuerza%20Comercial%20Grupo%20Volia%20S.A.S."
                        className="text-xs font-mono font-bold text-brand-emerald hover:underline"
                      >
                        ventas@grupovolia.com
                      </a>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Consultas corporativas:{" "}
                        <a href="mailto:info@grupovolia.com" className="font-mono hover:underline">
                          info@grupovolia.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                    <a
                      href="https://app.grupovolia.com/ventas"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-swiss-pine hover:bg-brand-pine text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
                    >
                      <span>Ya soy Vendedor · Entrar a la Web App /ventas</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    <Link
                      href="/"
                      className="w-full py-2.5 px-4 rounded-xl bg-swiss-canvas hover:bg-brand-emeraldSoft border border-slate-200 text-swiss-pine font-bold text-xs flex items-center justify-center gap-2 transition-all"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 text-brand-emerald" />
                      <span>Regresar al Portal para Clientes (/)</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Application Form */}
              <div data-tour-id="vend-tour-apply" className="lg:col-span-7 swiss-card rounded-3xl p-6 sm:p-10">
                <h3 className="text-xl font-extrabold text-swiss-pine mb-5">
                  Formulario de Postulación Comercial
                </h3>

                <form onSubmit={handleApplicationSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-600 mb-1.5">
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ej: María José Paredes"
                        className="w-full bg-swiss-canvas border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-swiss-pine focus:outline-none focus:border-brand-emerald focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-600 mb-1.5">
                        Perfil al que Postulas *
                      </label>
                      <select
                        value={roleType}
                        onChange={(e) =>
                          setRoleType(
                            e.target.value as
                              | "Asesor Comercial Independiente"
                              | "Líder de Célula Comercial"
                          )
                        }
                        className="w-full bg-swiss-canvas border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-swiss-pine focus:outline-none focus:border-brand-emerald focus:bg-white"
                      >
                        <option value="Asesor Comercial Independiente">
                          Asesor Comercial Independiente
                        </option>
                        <option value="Líder de Célula Comercial">
                          Líder de Célula Comercial (con Equipo)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-600 mb-1.5">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu.correo.personal@gmail.com"
                        className="w-full bg-swiss-canvas border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-swiss-pine focus:outline-none focus:border-brand-emerald focus:bg-white"
                      />
                      <span className="block text-[10px] text-slate-500 mt-1">
                        Usa tu correo personal (no asignamos cuentas @grupovolia.com; sincronizarás tus demos con tu propio calendario).
                      </span>
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-600 mb-1.5">
                        WhatsApp / Teléfono
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+593 99 ..."
                        className="w-full bg-swiss-canvas border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-swiss-pine focus:outline-none focus:border-brand-emerald focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-600 mb-1.5">
                      Ciudad / Zona de Cobertura en Ecuador
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ej: Quito, Guayaquil, Cuenca, Manta, Ambato..."
                      className="w-full bg-swiss-canvas border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-swiss-pine focus:outline-none focus:border-brand-emerald focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-600 mb-1.5">
                      Experiencia en Ventas B2B / Cartera o Red de Contactos *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="Cuéntanos brevemente tu experiencia vendiendo software, servicios contables/financieros o productos B2B, o si ya cuentas con un equipo comercial para liderar una célula..."
                      className="w-full bg-swiss-canvas border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-swiss-pine focus:outline-none focus:border-brand-emerald focus:bg-white"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-brand-emerald/30 space-y-2.5 text-xs">
                    <div className="font-bold text-swiss-pine flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-brand-emerald" />
                      <span>Sugerir Fecha / Hora para Entrevista &amp; Capacitación (UTC-5)</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input
                        type="date"
                        value={interviewDate}
                        onChange={(e) => setInterviewDate(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 font-mono text-xs"
                      />
                      <select
                        value={interviewTime}
                        onChange={(e) => setInterviewTime(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 font-mono text-xs"
                      >
                        {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"].map((slot) => (
                          <option key={slot} value={slot}>
                            {slot} (45 min · ventas@grupovolia.com)
                          </option>
                        ))}
                      </select>
                    </div>
                    <a
                      href={interviewCalendarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold text-brand-pine hover:underline"
                    >
                      <span>Pre-agendar entrevista directo en Google Calendar</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-3.5 px-6 rounded-xl bg-brand-emerald hover:bg-brand-pine text-white font-bold text-sm shadow-swiss-md transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Enviando Postulación...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Enviar Postulación a Grupo Volia S.A.S.</span>
                      </>
                    )}
                  </button>

                  {status === "success" && (
                    <div className="p-4 rounded-2xl bg-brand-emeraldSoft border border-brand-emerald/30 text-xs text-brand-pine space-y-2">
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                        <div>
                          <strong>¡Postulación enviada con éxito!</strong> Revisaremos tu perfil y te contactaremos desde <strong>ventas@grupovolia.com</strong> para coordinar la capacitación de 45 min y tu acceso a <code className="font-mono">/ventas</code>.
                        </div>
                      </div>
                      {lastInterviewUrl && (
                        <a
                          href={lastInterviewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-swiss-pine text-white font-bold"
                        >
                          <Calendar className="w-3.5 h-3.5 text-emerald-300" />
                          <span>Confirmar Entrevista en Google Calendar</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}

                  {status === "error" && (
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700">
                      Hubo un inconveniente al enviar el formulario. Por favor escríbenos directamente a{" "}
                      <a href="mailto:ventas@grupovolia.com" className="font-bold underline">
                        ventas@grupovolia.com
                      </a>
                      .
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <GrupoVoliaChatModal isOpen={chatOpen} onOpenChange={setChatOpen} />
      <VendedoresWelcomeTour isOpen={tourOpen} onClose={() => setTourOpen(false)} />

      {showWelcomePrompt && !tourOpen && (
        <div className="fixed bottom-4 right-4 z-40 max-w-sm rounded-2xl bg-white border-2 border-brand-emerald shadow-2xl p-4 space-y-2.5 text-xs">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 font-extrabold text-swiss-pine">
              <Compass className="w-4 h-4 text-brand-emerald shrink-0" />
              <span>¿Evaluando unirte a Grupo Volia?</span>
            </div>
            <button
              type="button"
              onClick={dismissWelcomePrompt}
              className="text-slate-400 hover:text-swiss-pine"
              title="Ocultar aviso"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Descubre tu futura oficina móvil <code className="font-mono text-brand-pine">/ventas</code>, el simulador de ingresos y los 10 demos en <strong>60 segundos (5 paradas)</strong>.
          </p>
          <div className="flex items-center gap-2 pt-0.5">
            <button
              type="button"
              onClick={() => {
                dismissWelcomePrompt();
                setTourOpen(true);
              }}
              className="px-3.5 py-2 rounded-xl bg-brand-emerald hover:bg-brand-pine text-white font-bold"
            >
              Iniciar Tour 60s
            </button>
            <button
              type="button"
              onClick={dismissWelcomePrompt}
              className="px-3 py-2 rounded-xl bg-swiss-canvas border border-slate-200 text-slate-600 font-semibold hover:text-swiss-pine"
            >
              Más tarde
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
