"use client";

import {
  ShieldCheck,
  Lock,
  Database,
  HeartPulse,
  Building2,
  Scale,
  CheckCircle2,
} from "lucide-react";

const ADAPTIVE_INDUSTRIES = [
  "Consultorios Médicos & Odontología (CIE-10 / Historial Clínico)",
  "Escuelas, Colegios & Academias (Pensiones & Representantes)",
  "Importadoras & Comercializadoras (Landed Cost SENAE / Kardex)",
  "Constructoras & Inmobiliarias (Planillas & Radar UAFE)",
  "Agroindustria, Camaroneras & Cacao (Piscinas & Liquidaciones 03)",
  "Talleres Automotrices & Flotas (Órdenes por Placa / Chasis)",
  "Farmacias & Estética (Control Lotes ARCSA & Caducidad)",
  "Restaurantes & Catering (Escandallo Food Cost %)",
  "Gimnasios & Clubes de Membresías (Freeze & Coaches)",
  "Estudios Contables, Legales & Agencias (Igualas & Calendario SRI)",
];

export default function SecurityLopdpSection() {
  return (
    <section
      id="seguridad-lopdp"
      className="py-24 bg-swiss-canvas border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-emeraldSoft border border-brand-emerald/30 text-brand-pine text-xs font-mono font-bold mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-emerald" />
            <span>CUMPLIMIENTO LEGAL LOPDP ECUADOR + CRIPTOGRAFÍA BANCARIA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-swiss-pine tracking-tight">
            Blindaje Legal y Técnico para{" "}
            <span className="text-brand-emerald">Datos Financieros y Clínicos</span>
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Diseñado desde el código para consultorios médicos, colegios, importadoras y empresas ecuatorianas que no pueden arriesgar secretos tributarios, firmas electrónicas{" "}
            <code className="font-mono text-swiss-pine">.p12</code> ni historias clínicas confidenciales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="swiss-card rounded-2xl p-6 space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-brand-emeraldSoft text-brand-emerald flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-swiss-pine">
              Protección Legal LOPDP Ecuador
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tratamiento estricto bajo la Ley Orgánica de Protección de Datos Personales para{" "}
              <strong>datos sensibles de salud</strong> (diagnósticos CIE-10, recetas, aseguradoras), fichas de menores/representantes en colegios y retención documental tributaria SRI / UAFE.
            </p>
          </div>

          <div className="swiss-card rounded-2xl p-6 space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-brand-emeraldSoft text-brand-emerald flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-swiss-pine">
              Cifrado AES-256-GCM en Bóveda
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Las notas clínicas privadas, acuerdos comerciales y tu certificado electrónico{" "}
              <code className="font-mono">.p12</code> se cifran del lado servidor con{" "}
              <strong>AES-256-GCM (IV 96-bit + AuthTag 128-bit)</strong> con llaves derivadas exclusivamente para tu empresa y RUC.
            </p>
          </div>

          <div className="swiss-card rounded-2xl p-6 space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-brand-emeraldSoft text-brand-emerald flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-swiss-pine">
              Aislamiento Multi-Tenant RLS + Auditoría
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              49 tablas PostgreSQL con <strong>Row Level Security (RLS)</strong> estricto por empresa, bitácora forense inmutable (<code className="font-mono">append-only</code>) y cero mezcla de información entre clientes.
            </p>
          </div>
        </div>

        {/* Bloque 10 Giros Adaptativos */}
        <div className="swiss-card rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <Building2 className="w-6 h-6 text-brand-emerald shrink-0" />
              <div>
                <h3 className="text-lg font-extrabold text-swiss-pine">
                  Módulos Operativos Adaptables a las 10 Principales Industrias PYME de Ecuador
                </h3>
                <p className="text-xs text-slate-500">
                  Elige tu giro al activar la suite para adaptar fichas, calculadoras sectoriales y controles sanitarios o aduaneros sin sobrecostos.
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-brand-pine">
              <HeartPulse className="w-3.5 h-3.5 text-brand-emerald" />
              <span>Listo para Clínicas, Colegios &amp; Empresas</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
            {ADAPTIVE_INDUSTRIES.map((ind) => (
              <div
                key={ind}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-swiss-canvas border border-slate-200/80 text-slate-700 font-medium"
              >
                <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0" />
                <span>{ind}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
