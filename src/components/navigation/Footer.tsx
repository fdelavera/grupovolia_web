"use client";

import { ArrowUpRight, FileDown } from "lucide-react";

export default function Footer() {
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
            <div className="text-[11px] font-mono text-slate-400">
              Fundador & CEO: Francisco de la Vera · www.grupovolia.com
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3">
              Soluciones B2B
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#doble-agente" className="hover:text-brand-emeraldBright transition-colors">
                  Copiloto IA Interno
                </a>
              </li>
              <li>
                <a href="#lineas-negocio" className="hover:text-brand-emeraldBright transition-colors">
                  Suites ERP, Inventario, SRI & CRM
                </a>
              </li>
              <li>
                <a href="#algoritmos-cuantitativos" className="hover:text-brand-emeraldBright transition-colors">
                  Motores Algorítmicos & Oráculos
                </a>
              </li>
              <li>
                <a href="#tarifario-calculadora" className="hover:text-brand-emeraldBright transition-colors">
                  Tarifario y Calculadora de Ahorro
                </a>
              </li>
              <li>
                <a href="#credenciales" className="hover:text-brand-emeraldBright transition-colors">
                  Misión, Visión y Respaldo
                </a>
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

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} Grupo Volia. Todos los derechos reservados.
          </div>
          <div>
            Ingeniería Agéntica, ERP/SRI, Inventarios Conectados & Oráculos Cuantitativos.
          </div>
        </div>
      </div>
    </footer>
  );
}
