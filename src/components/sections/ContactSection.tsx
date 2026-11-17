"use client";

import { useState, useEffect } from "react";
import {
  Send,
  CheckCircle2,
  Loader2,
  FileDown,
  Globe2,
  Mail,
  Sparkles,
} from "lucide-react";

interface ContactSectionProps {
  preselectedPackage?: string;
  preselectedModality?: string;
}

export default function ContactSection({
  preselectedPackage,
  preselectedModality,
}: ContactSectionProps) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [packageInterest, setPackageInterest] = useState(
    "2. Suite Completa PYME Estrella ($69/mes o $890 Licencia)"
  );
  const [modality, setModality] = useState("Modalidad B: Membresía Mensual");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    if (preselectedPackage) setPackageInterest(preselectedPackage);
    if (preselectedModality) setModality(preselectedModality);
  }, [preselectedPackage, preselectedModality]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company,
          email,
          phone,
          packageInterest,
          modality,
          message,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setName("");
        setCompany("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contacto" className="py-24 bg-swiss-canvas border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-emerald/30 text-brand-pine text-xs font-mono font-bold shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-brand-emerald" />
              <span>INICIA TU TRANSFORMACIÓN CON GRUPO VOLIA</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-swiss-pine tracking-tight">
              Solicita tu Demo en Vivo o{" "}
              <span className="text-brand-emerald">Propuesta Formal</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Cuéntanos qué módulos (Contabilidad SRI con Retenciones, Inventario Conectado, Finanzas, CRM o Marketing) o servicios audiovisuales necesita tu empresa. En menos de 24 horas recibirás una propuesta clara o agendaremos una demostración personalizada.
            </p>

            {/* Coverage & Contact Card */}
            <div className="swiss-card rounded-2xl p-6 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-brand-emeraldSoft text-brand-emerald border border-brand-emerald/30 shrink-0">
                  <Globe2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-swiss-pine">
                    Cobertura & Alcance Operativo
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Marca Comercial: <strong className="text-swiss-pine">Grupo Volia</strong>
                    <br />
                    Regiones: <strong className="text-brand-emerald">Ecuador, Latinoamérica & EE.UU.</strong>
                    <br />
                    Implementación en 1 mes (hasta 3 revisiones previas a entrega)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-slate-200">
                <div className="p-2.5 rounded-xl bg-brand-emeraldSoft text-brand-emerald border border-brand-emerald/30 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-swiss-pine">Contacto Ejecutivo Directo</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Corporativo: <strong className="text-brand-emerald">info@grupovolia.com</strong>
                    <br />
                    Dirección General: <strong className="text-swiss-pine">fdelavera@grupovolia.com</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Downloadable Dossier Card */}
            <div className="p-5 rounded-2xl bg-white border-2 border-brand-emerald/30 shadow-sm flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-brand-emerald font-bold uppercase">
                  DOSSIER EJECUTIVO DESCARGABLE
                </div>
                <div className="text-sm font-bold text-swiss-pine mt-0.5">
                  Presentación Comercial PYME y Mediana Empresa (PDF)
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Incluye 5 módulos (con Inventario y Retenciones), Copiloto IA Interno y tarifas.
                </p>
              </div>
              <a
                href="/docs/Dossier_Comercial_GrupoVolia_SAS.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-emerald text-white font-bold text-xs hover:bg-brand-pine transition-all"
              >
                <FileDown className="w-4 h-4" />
                <span>PDF</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive B2B Form */}
          <div className="lg:col-span-7 swiss-card rounded-3xl p-6 sm:p-10">
            <h3 className="text-xl font-bold text-swiss-pine mb-6">
              Configura tu Solicitud Comercial
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-600 mb-1.5">
                    Tu Nombre y Cargo *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: Ing. Carlos Viteri - Gerente"
                    className="w-full bg-swiss-canvas border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-swiss-pine focus:outline-none focus:border-brand-emerald focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-600 mb-1.5">
                    Empresa / Razón Social
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Ej: Importadora Del Pacífico"
                    className="w-full bg-swiss-canvas border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-swiss-pine focus:outline-none focus:border-brand-emerald focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-600 mb-1.5">
                    Correo Electrónico Corporativo *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="gerencia@tuempresa.com"
                    className="w-full bg-swiss-canvas border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-swiss-pine focus:outline-none focus:border-brand-emerald focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-600 mb-1.5">
                    WhatsApp / Teléfono de Contacto
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ej: +593 99 000 0000"
                    className="w-full bg-swiss-canvas border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-swiss-pine focus:outline-none focus:border-brand-emerald focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-600 mb-1.5">
                    Solución Principal de Interés
                  </label>
                  <select
                    value={packageInterest}
                    onChange={(e) => setPackageInterest(e.target.value)}
                    className="w-full bg-swiss-canvas border border-slate-300 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-swiss-pine focus:outline-none focus:border-brand-emerald focus:bg-white"
                  >
                    <option value="1. Módulo Individual PYME ($35/mes o $490 Licencia)">
                      1. Módulo Individual PYME ($35/mes o $490)
                    </option>
                    <option value="2. Suite Completa PYME Estrella ($69/mes o $890 Licencia)">
                      2. Suite Completa PYME Estrella ($69/mes o $890)
                    </option>
                    <option value="3. Suite Corporativa Multisucursal ($119/mes o $1,490 Licencia)">
                      3. Suite Corporativa Multisucursal ($119/mes o $1,490)
                    </option>
                    <option value="Oráculo Cuantitativo / Algoritmo a Medida ($490 - $1,200)">
                      Oráculo Cuantitativo / Algoritmo en Tiempo Real
                    </option>
                    <option value="Producción Audiovisual IA Estándares Internacionales ($250 - $450)">
                      Producción Audiovisual IA Estándares Internacionales / Virtual Staging
                    </option>
                    <option value="Estudio de Mercado + Modelo Financiero Excel ($199 - $350)">
                      Estudio de Mercado + Modelo Financiero Excel
                    </option>
                    <option value="Alianza Comercial / Contable (25% + 18%)">
                      Alianza Contadores y Referidores (25% + 18%)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-600 mb-1.5">
                    Modalidad Preferida
                  </label>
                  <select
                    value={modality}
                    onChange={(e) => setModality(e.target.value)}
                    className="w-full bg-swiss-canvas border border-slate-300 rounded-xl px-3.5 py-3 text-xs sm:text-sm text-swiss-pine focus:outline-none focus:border-brand-emerald focus:bg-white"
                  >
                    <option value="Modalidad B: Membresía Mensual">
                      Modalidad B: Membresía Mensual
                    </option>
                    <option value="Modalidad A: Compra de Licencia (Diseño Incluido)">
                      Modalidad A: Compra de Licencia (Diseño Incluido)
                    </option>
                    <option value="Modalidad C: Proyecto / Estudio / Producción Audiovisual">
                      Modalidad C: Servicio por Proyecto o Iguala
                    </option>
                    <option value="Deseo asesoría para elegir la mejor opción">
                      Deseo asesoría para comparar opciones
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-600 mb-1.5">
                  Cuéntanos brevemente sobre tu empresa o requerimiento *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ej: Somos una empresa comercial en Guayaquil, manejamos inventario de 800 SKUs, emitimos facturas en el SRI con retenciones a proveedores y queremos conectar nuestro POS..."
                  className="w-full bg-swiss-canvas border border-slate-300 rounded-xl px-4 py-3 text-xs sm:text-sm text-swiss-pine focus:outline-none focus:border-brand-emerald focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 rounded-xl bg-brand-emerald hover:bg-brand-pine text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Enviando Solicitud a Grupo Volia...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Enviar Solicitud y Recibir Propuesta</span>
                  </>
                )}
              </button>

              {status === "success" && (
                <div className="p-4 rounded-xl bg-brand-emeraldSoft border border-brand-emerald/40 text-brand-pine text-xs sm:text-sm flex items-center gap-2.5 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-brand-emerald shrink-0" />
                  <span>
                    ¡Solicitud recibida con éxito! Francisco de la Vera y el equipo de Grupo Volia se pondrán en contacto contigo a la brevedad.
                  </span>
                </div>
              )}

              {status === "error" && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm">
                  Hubo un inconveniente temporal al enviar el formulario. Por favor escríbenos directamente a{" "}
                  <a href="mailto:fdelavera@grupovolia.com" className="underline font-semibold">
                    fdelavera@grupovolia.com
                  </a>{" "}
                  o{" "}
                  <a href="mailto:info@grupovolia.com" className="underline font-semibold">
                    info@grupovolia.com
                  </a>
                  .
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
