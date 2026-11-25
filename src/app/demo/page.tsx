"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Loader2,
  PlayCircle,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserCheck,
} from "lucide-react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import GrupoVoliaChatModal from "@/components/chat/GrupoVoliaChatModal";
import { getStoredAttribution, trackWebEvent } from "@/lib/attribution";

const DEMO_INDUSTRIES = [
  { slug: "demo-comercio", label: "Comercio, Ferretería & Importadora (Kardex + SRI)" },
  { slug: "demo-salud", label: "Clínica & Consultorio Médico (CIE-10 + LOPDP)" },
  { slug: "demo-colegio", label: "Colegio, Escuela & Academia (Pensiones + Portal)" },
  { slug: "demo-servicios", label: "Servicios Profesionales & Estudio Contable" },
  { slug: "demo-inmobiliaria", label: "Inmobiliaria & Constructora (Radar UAFE RESU)" },
  { slug: "demo-restaurante", label: "Restaurante & Gastronomía (Recetas + Caja)" },
  { slug: "demo-agro", label: "Agroindustria & Camaronera (Liquidaciones 03)" },
  { slug: "demo-taller", label: "Taller Automotriz & Flotas (Órdenes + Repuestos)" },
  { slug: "demo-farmacia", label: "Farmacia & Salud (Caducidad ARCSA FEFO)" },
  { slug: "demo-gimnasio", label: "Gimnasio, Fitness & Clubes (Membresías)" },
];

function DemoGatewayContent() {
  const searchParams = useSearchParams();
  const [chatOpen, setChatOpen] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [slug, setSlug] = useState("demo-comercio");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [unlockedUrl, setUnlockedUrl] = useState<string | null>(null);

  useEffect(() => {
    const paramSlug = searchParams.get("slug");
    if (paramSlug && DEMO_INDUSTRIES.some((d) => d.slug === paramSlug)) {
      setSlug(paramSlug);
    }
  }, [searchParams]);

  const handleActivateDemo = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    try {
      const attrib = getStoredAttribution();
      const eventId = `demo_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      const res = await fetch("/api/demo-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          company,
          slug,
          attribution: attrib,
          eventId,
        }),
      });
      const json = (await res.json()) as { demoUrl?: string; error?: string };
      if (!res.ok || !json.demoUrl) {
        setErrorMsg(json.error || "No se pudo abrir el pase de demo.");
      } else {
        trackWebEvent("Lead", {
          contentName: `demo_24h_${slug}`,
          value: 69,
          email: email || undefined,
          phone,
        });
        setUnlockedUrl(json.demoUrl);
        window.location.assign(json.demoUrl);
      }
    } catch {
      setErrorMsg("Error de conexión activando tu demo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-swiss-canvas text-swiss-pine">
      <Navbar onOpenChat={() => setChatOpen(true)} />
      <main className="flex-1 pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Context */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-emeraldSoft border border-brand-emerald/30 text-brand-pine text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-brand-emerald" />
              <span>SANDBOX INTERACTIVO 24 HORAS · $0</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-swiss-pine leading-tight">
              Prueba los 10 Módulos en Vivo{" "}
              <span className="text-brand-emerald">Ahora Mismo</span>
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Activa tu pase privado por 24 horas sin registrar tarjeta ni instalar nada. Cambia al instante entre los 10 giros de negocio en Ecuador, emite comprobantes de prueba y recorre el Copiloto IA.
            </p>
            <div className="space-y-3 pt-2">
              {[
                {
                  icon: PlayCircle,
                  text: "Acceso instantáneo con pase criptográfico válido por 24 horas.",
                },
                {
                  icon: Smartphone,
                  text: "Prueba escáner CODE128, roles por empleado y Portal Autoservicio B2B.",
                },
                {
                  icon: ShieldCheck,
                  text: "Tus datos están protegidos bajo LOPDP Ecuador · Sin spam ni tarjetas.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <item.icon className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 swiss-card rounded-3xl p-6 sm:p-8 bg-white">
            <h2 className="text-lg font-extrabold text-swiss-pine mb-1">
              Generar Pase de Acceso Inmediato
            </h2>
            <p className="text-xs text-slate-500 mb-5">
              Completa tus datos en 15 segundos y te redirigimos directo dentro del sistema.
            </p>

            {unlockedUrl ? (
              <div className="p-6 rounded-2xl bg-brand-emeraldSoft border border-brand-emerald/40 text-center space-y-4">
                <CheckCircle2 className="w-10 h-10 text-brand-emerald mx-auto" />
                <div className="font-extrabold text-swiss-pine">
                  ¡Tu Pase Demo 24h está activo!
                </div>
                <p className="text-xs text-slate-600">
                  Si el navegador no te redirigió automáticamente, pulsa el botón de abajo:
                </p>
                <a
                  href={unlockedUrl}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-emerald text-white font-bold text-sm hover:bg-brand-pine"
                >
                  <span>Entrar a la Demo Interactiva</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ) : (
              <form onSubmit={handleActivateDemo} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-600 mb-1.5">
                    Elige la Industria del Demo *
                  </label>
                  <select
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full bg-swiss-canvas border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-swiss-pine"
                  >
                    {DEMO_INDUSTRIES.map((ind) => (
                      <option key={ind.slug} value={ind.slug}>
                        {ind.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-600 mb-1.5">
                      Tu Nombre Completo *
                    </label>
                    <div className="relative">
                      <UserCheck className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej: María Fernanda López"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 bg-swiss-canvas text-xs sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-600 mb-1.5">
                      WhatsApp (con código o 09...) *
                    </label>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ej: 0991234567"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-swiss-canvas text-xs sm:text-sm font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-600 mb-1.5">
                      Empresa o Negocio
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Ej: Comercial Andina"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 bg-swiss-canvas text-xs sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-600 mb-1.5">
                      Correo Corporativo (opcional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="gerencia@tuempresa.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-swiss-canvas text-xs sm:text-sm"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-brand-emerald hover:bg-brand-pine text-white font-extrabold text-sm inline-flex items-center justify-center gap-2 shadow-swiss-md transition-all disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Activando Pase Demo 24h...</span>
                    </>
                  ) : (
                    <>
                      <span>Entrar al ERP Demo Ahora (Gratis 24h)</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="mt-5 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <span>¿Prefieres una reunión guiada por Google Meet?</span>
              <Link href="/#contacto" className="font-bold text-brand-emerald hover:underline">
                Agendar 30 min con Especialista →
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <GrupoVoliaChatModal isOpen={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
}

export default function DemoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-swiss-canvas" />}>
      <DemoGatewayContent />
    </Suspense>
  );
}
