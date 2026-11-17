"use client";

import { useState } from "react";
import {
  Bot,
  FileCheck2,
  TrendingUp,
  CheckCircle2,
  Briefcase,
  Boxes,
  Sparkles,
} from "lucide-react";

export default function DualAgentSection() {
  const [selectedIndustry, setSelectedIndustry] = useState<"comercio" | "inmobiliaria" | "servicios">("comercio");

  const industryExamples = {
    comercio: {
      label: "Comercio / Importadora / Ferretería",
      internalUser: "Copiloto, ¿cómo cerró nuestro margen neto, qué stock está bajo y qué retenciones del SRI vencen?",
      internalBot:
        "Resumen Gerencial NIIF: Tus ventas subieron +14.2% ($8,420 USD) con margen bruto del 38.4%. Inventario: 3 SKUs bajaron del stock mínimo y requieren reposición. SRI: Emitidas 64 facturas XAdES-BES y 5 retenciones de IVA en la fuente a proveedores nacionales; tu declaración de IVA vence el día 28 y el ATS XML ya está cuadrado.",
    },
    inmobiliaria: {
      label: "Inmobiliaria / Constructora / Promotora",
      internalUser: "Necesito el estado de flujo de obra, alerta UAFE del mes y la campaña de correo para inversionistas.",
      internalBot:
        "Reporte Listo: 1) El flujo de caja proyectado cubre el 100% de los hitos de obra del trimestre. 2) Reporte UAFE: 0 operaciones inusuales pendientes; 2 reservas superaron los $10,000 USD con debida diligencia completa. 3) Ya redacté los 4 correos mensuales con proyección de plusvalía para tus 320 leads en el CRM.",
    },
    servicios: {
      label: "Clínica / Consultora / Estudio Profesional",
      internalUser: "Explícame en sencillo por qué bajó la utilidad neta este mes aunque facturamos igual.",
      internalBot:
        "En español sencillo: Facturaste $11,200 USD (igual que el mes pasado), pero la utilidad neta bajó $680 USD porque renovaste pólizas anuales y aplicaste retenciones de IVA a proveedores de insumos (+22% en Gastos Operativos). La buena noticia: tu costo de adquisición bajó un 18% y el próximo mes no tendrás ese gasto extraordinario.",
    },
  };

  const currentExample = industryExamples[selectedIndustry];

  return (
    <section id="doble-agente" className="py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-emeraldSoft border border-brand-emerald/30 text-brand-pine text-xs font-mono font-bold mb-4">
            <Bot className="w-3.5 h-3.5 text-brand-emerald" />
            <span>COPILOTO DE INTELIGENCIA ARTIFICIAL INTEGRADO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-swiss-pine tracking-tight">
            Un{" "}
            <span className="text-brand-emerald">Copiloto de IA Interno</span>{" "}
            para tu Equipo, con el Nombre que Tú Elijas
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Cada módulo o suite de <strong className="text-swiss-pine">Grupo Volia</strong> incluye{" "}
            <strong className="text-brand-emerald">1 Asistente de IA Interno integrado directamente en tu sistema</strong>{" "}
            para que tus empleados, contador y gerencia trabajen al triple de velocidad — sin necesidad de tocar el código de tu página web externa ni depender de plataformas de terceros (con{" "}
            <strong className="text-swiss-pine">1,500 interacciones/mes incluidas</strong>).
          </p>
        </div>

        {/* Interactive Industry Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <span className="text-xs font-mono text-slate-500 mr-2">Simular consulta interna en:</span>
          {(Object.keys(industryExamples) as Array<keyof typeof industryExamples>).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedIndustry(key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedIndustry === key
                  ? "bg-brand-emerald text-white border-brand-emerald shadow-sm"
                  : "bg-swiss-canvas text-slate-700 border-slate-200 hover:border-brand-emerald/40"
              }`}
            >
              {industryExamples[key].label}
            </button>
          ))}
        </div>

        {/* Single Unified High-Impact Card */}
        <div className="swiss-card rounded-3xl p-6 sm:p-10 border border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Capabilities for Employees & Management */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-swiss-pine text-white flex items-center justify-center shrink-0">
                <Briefcase className="w-6 h-6 text-brand-emeraldBright" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-brand-emerald font-bold">
                  EXCLUSIVO PARA USUARIOS Y EMPLEADOS CON ACCESO
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-swiss-pine">
                  Tu Analista Financiero, SRI, Inventarios & Marketing
                </h3>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed">
              Vive dentro del panel privado de los módulos que contrataste. Sin nombre fijo por defecto: al personalizar tu sistema,{" "}
              <strong className="text-swiss-pine">tú eliges el nombre propio que llevará el asistente de tu empresa</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-swiss-canvas border border-slate-200">
                <FileCheck2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700">
                  Pre-llena facturas, asientos y retenciones de IVA/Renta a proveedores nacionales
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-swiss-canvas border border-slate-200">
                <Boxes className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700">
                  Detecta quiebres de stock en Inventario y sugiere reposiciones oportunas
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-swiss-canvas border border-slate-200">
                <TrendingUp className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700">
                  Explica el Balance General y Estado de Resultados NIIF en español claro
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-swiss-canvas border border-slate-200">
                <Sparkles className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700">
                  Redacta campañas de correo mensuales y alertas de cartera / UAFE
                </span>
              </div>
            </div>
          </div>

          {/* Right: Live Internal Copilot Simulation */}
          <div className="lg:col-span-6 rounded-2xl bg-swiss-canvas border border-slate-200 p-5 space-y-3.5">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 border-b border-slate-200 pb-2.5">
              <span>COPILOTO INTERNO · {currentExample.label.toUpperCase()}</span>
              <span className="text-brand-emerald font-bold">● Conectado a tus Módulos</span>
            </div>
            <div className="flex justify-end">
              <div className="bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm rounded-2xl rounded-tr-none px-4 py-3 max-w-[88%] shadow-sm">
                <span className="block text-[10px] font-mono text-slate-400 mb-1">
                  Usuario / Gerente / Contador:
                </span>
                {currentExample.internalUser}
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-white border-2 border-brand-emerald/35 text-swiss-pine text-xs sm:text-sm rounded-2xl rounded-tl-none px-4 py-3 max-w-[92%] shadow-sm leading-relaxed">
                <span className="block text-[10px] font-mono text-brand-emerald font-bold mb-1">
                  Asistente IA de tu Empresa (Nombre a tu elección):
                </span>
                {currentExample.internalBot}
              </div>
            </div>
          </div>
        </div>

        {/* Fair Use Transparency Banner */}
        <div className="mt-6 p-5 rounded-2xl bg-brand-emeraldSoft/70 border border-brand-emerald/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-brand-emerald text-white shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-swiss-pine">
                Política Transparente de Tokens IA Incluida (1,500 Interacciones / Mes)
              </h4>
              <p className="text-xs text-slate-700 mt-0.5">
                Tu mensualidad o mantenimiento ya incluye la llave API dedicada para tus empleados y gerencia con 1,500 consultas mensuales sin configuraciones externas.
              </p>
            </div>
          </div>
          <a
            href="#tarifario-calculadora"
            className="shrink-0 px-4 py-2.5 rounded-xl bg-swiss-pine hover:bg-brand-pine text-white text-xs font-bold transition-all"
          >
            Ver Planes con IA →
          </a>
        </div>
      </div>
    </section>
  );
}
