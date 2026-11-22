"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Briefcase, FileDown, ShieldCheck, X } from "lucide-react";

const LEGAL_DISCLAIMERS = [
  {
    title: "1. Responsabilidad Tributaria SRI, Reintento Automático & Normativa NIIF",
    text: "Grupo Volia provee la infraestructura tecnológica de Facturación Inteligente con Reintento Automático SRI (reintento automático en segundo plano ante intermitencias o caídas del portal del SRI), generación XML v2.0.0, firma XAdES-BES (.p12), RIDE PDF personalizado, Libro Diario NIIF y pre-reportes ATS/103/104. La declaración final en el portal del SRI y la validación contable/fiscal corresponden exclusivamente al Contribuyente y su Contador General autorizado.",
  },
  {
    title: "2. Oráculo IA, Proyecciones Financieras y No Asesoría Bursátil",
    text: "Los reportes temporales del Oráculo IA (5m–24h), simuladores Quant Sentinel FP&A y titulares de mercado/insumos constituyen herramientas informativas y analíticas operativas. No constituyen asesoría de inversión regulada ni recomendación bursátil o de compra/venta de valores.",
  },
  {
    title: "3. Privacidad, LOPDP Ecuador & Bóveda Criptográfica AES-256-GCM",
    text: "Cumplimos con la Ley Orgánica de Protección de Datos Personales (LOPDP) de Ecuador. Las firmas electrónicas .p12, notas clínicas CIE-10 y expedientes confidenciales se cifran con AES-256-GCM y aislamiento estricto multi-tenant (Row Level Security). Grupo Volia nunca comercializa ni entrena modelos públicos con datos privados del cliente.",
  },
  {
    title: "4. Política de Facturación Ilimitada & Uso Justo de Cuota IA",
    text: "Los planes Suite incluyen emisión ilimitada de facturas electrónicas SRI ($0 extra por documento) sujeto a uso empresarial legítimo. Las consultas analíticas al Copiloto IA corporativo cuentan con 1,500 interacciones/mes incluidas por empresa, mientras el enrutador de ayuda UI y noticias RSS operan a 0 tokens.",
  },
  {
    title: "5. Vigencia Anual Sin Penalización (Cláusula Undécima), SLA & Propiedad 100% de Datos",
    text: "La vigencia legal del contrato SaaS es anual con cancelación anticipada sin penalización conforme a la Cláusula Undécima. Cada implementación personalizada contempla hasta 4 semanas de parametrización White-Label y 3 rondas de ajuste previas a producción. El cliente conserva el 100% de la propiedad sobre su base SQL, XML autorizados, RIDE PDFs y respaldos exportables en todo momento.",
  },
  {
    title: "6. Descargo de Responsabilidad de IA y Revisión Humana Obligatoria",
    text: "Todo contenido, cálculo, clasificación tributaria, proforma, alerta operativa o sugerencia generado mediante Inteligencia Artificial (incluyendo Anna IA, Copiloto IA Interno, Proformas IA y Oráculo IA) puede contener errores o imprecisiones y requiere siempre revisión y validación final de un ser humano (contador, profesional responsable o gerencia autorizada) antes de su emisión o ejecución definitiva.",
  },
];

export default function Footer() {
  const [legalModalOpen, setLegalModalOpen] = useState(false);

  return (
    <footer className="bg-swiss-pine text-slate-300 py-14 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/15">
          {/* Col 1: Brand */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-white/20 flex items-center justify-center p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/branding/logo_grupovolia_isotipo_clean.png"
                  alt="Grupo Volia"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-white text-base tracking-tight">
                  GRUPO <span className="text-brand-emeraldBright">VOLIA</span>
                </span>
                <span className="block text-[10px] font-mono text-slate-300">
                  Ecuador, Latinoamérica & Estados Unidos
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-300/90 leading-relaxed max-w-md">
              Boutique de Ingeniería Agéntica, Soluciones Empresariales (ERP, Facturación Electrónica SRI con Retenciones, Inventario Conectado vía API, Finanzas NIIF, CRM), Motores Algorítmicos Cuantitativos y Producción Audiovisual con IA.
            </p>
            <div className="text-[11px] font-mono text-slate-400 space-y-1">
              <div>Fundador &amp; CEO: Francisco de la Vera · www.grupovolia.com</div>
              <div className="text-brand-emeraldBright">
                ventas@grupovolia.com · info@grupovolia.com · soporte@grupovolia.com
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3">
              Soluciones B2B
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/#doble-agente" className="hover:text-brand-emeraldBright transition-colors">
                  Copiloto IA Interno
                </Link>
              </li>
              <li>
                <Link href="/#lineas-negocio" className="hover:text-brand-emeraldBright transition-colors">
                  Suites ERP, Inventario, SRI & CRM
                </Link>
              </li>
              <li>
                <Link href="/#algoritmos-cuantitativos" className="hover:text-brand-emeraldBright transition-colors">
                  Motores Algorítmicos & Oráculos
                </Link>
              </li>
              <li>
                <Link href="/#tarifario-calculadora" className="hover:text-brand-emeraldBright transition-colors">
                  Tarifario y Calculadora de Ahorro
                </Link>
              </li>
              <li>
                <Link href="/#credenciales" className="hover:text-brand-emeraldBright transition-colors">
                  Misión, Visión y Respaldo
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Ecosystem & Downloads */}
          <div className="md:col-span-4 space-y-2.5">
            <div className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3">
              Ecosistema & Documentos Oficiales
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="https://app.grupovolia.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-200 hover:text-brand-emeraldBright transition-colors font-semibold"
              >
                <span>Acceso Clientes / Panel ERP</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <Link
                href="/vendedores"
                className="inline-flex items-center gap-1.5 text-brand-emeraldBright hover:underline font-semibold"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Programa para Vendedores (Bienvenida y Beneficios)</span>
              </Link>
              <a
                href="https://app.grupovolia.com/ventas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-200 hover:text-brand-emeraldBright transition-colors font-semibold"
              >
                <span>Acceso Fuerza Comercial (Web App /ventas)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="/docs/Dossier_Comercial_GrupoVolia_SAS.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-emeraldBright hover:underline font-semibold"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Descargar Dossier Comercial PYME / Mediana (PDF)</span>
              </a>
              <a
                href="https://www.voliafitness.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-200 hover:text-brand-emeraldBright transition-colors"
              >
                <span>Volia Fitness (Caso de Éxito B2C #1)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.franciscodelavera.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-200 hover:text-brand-emeraldBright transition-colors"
              >
                <span>Portafolio Ejecutivo Francisco de la Vera</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="/docs/Francisco_De_La_Vera_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-200 hover:text-brand-emeraldBright transition-colors"
              >
                <span>CV Ejecutivo del Fundador (PDF)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Resumen visible de Disclaimers Legales & LOPDP */}
        <div className="pt-6 pb-6 border-b border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-[11px] text-slate-300/90">
          <div className="max-w-4xl leading-relaxed space-y-1">
            <div className="font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-emeraldBright" />
              <span>Avisos Legales, Disclaimers SRI / NIIF / Oráculo IA &amp; Cumplimiento LOPDP Ecuador:</span>
            </div>
            <p className="text-slate-400">
              Las herramientas contables, proformas y sugerencias de IA pueden contener errores o imprecisiones y requieren siempre revisión y validación final de un ser humano (no constituyen asesoría tributaria ni bursátil regulada). Tus datos, XML SRI y firmas `.p12` están aislados bajo RLS y cifrados con AES-256-GCM bajo propiedad 100% del cliente. Vigencia anual SaaS con cancelación anticipada sin penalización (Cláusula Undécima).
            </p>
          </div>
          <button
            type="button"
            onClick={() => setLegalModalOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-brand-emerald text-white font-bold text-[11px] shrink-0 transition-colors border border-white/15"
          >
            Leer Disclaimers, Privacidad LOPDP y Términos SLA
          </button>
        </div>

        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} Grupo Volia. Todos los derechos reservados.
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span>Ingeniería Agéntica, ERP/SRI, Inventarios Conectados &amp; Oráculos Cuantitativos.</span>
            <a
              href="https://app.grupovolia.com/seguridad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-emeraldBright hover:underline font-semibold"
            >
              Centro Legal &amp; Seguridad PDF
            </a>
          </div>
        </div>
      </div>

      {legalModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setLegalModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl max-h-[85vh] bg-white text-swiss-pine rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 bg-swiss-canvas border-b border-slate-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-emerald" />
                <div>
                  <h3 className="text-sm font-extrabold text-swiss-pine">
                    Disclaimers Oficiales, Privacidad LOPDP &amp; Términos SLA
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Grupo Volia S.A.S. · Transparencia Jurídica, Técnica y Tributaria
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setLegalModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 text-xs leading-relaxed">
              {LEGAL_DISCLAIMERS.map((d) => (
                <div key={d.title} className="p-4 rounded-2xl bg-swiss-canvas border border-slate-200 space-y-1">
                  <div className="font-extrabold text-swiss-pine">{d.title}</div>
                  <p className="text-slate-600">{d.text}</p>
                </div>
              ))}
              <div className="pt-2 flex flex-wrap gap-2">
                <a
                  href="https://app.grupovolia.com/api/docs/kit?kit=privacy_security"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-emerald text-white font-bold"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Descargar Dossier Privacidad &amp; LOPDP (PDF)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
