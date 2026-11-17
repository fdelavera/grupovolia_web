"use client";

import { useState } from "react";
import {
  Bot,
  MessageSquare,
  FileCheck2,
  CalendarCheck,
  TrendingUp,
  CheckCircle2,
  Users,
  Briefcase,
  AlertCircle,
} from "lucide-react";

export default function DualAgentSection() {
  const [activeTab, setActiveTab] = useState<"both" | "external" | "internal">("both");
  const [selectedIndustry, setSelectedIndustry] = useState<"comercio" | "inmobiliaria" | "servicios">("comercio");

  const industryExamples = {
    comercio: {
      label: "Comercio / Importadora / Ferretería",
      externalUser: "Hola, ¿tienen disponible el lote mayorista y emiten factura con crédito a 15 días?",
      externalBot:
        "¡Hola! Sí, revisé el Módulo de Inventario y contamos con 48 unidades en stock inmediato. Para compras mayores a $500 USD aplicamos 8% de descuento o crédito directo a 15 días previa validación de RUC. ¿Me compartes tu RUC para generarte la proforma y agendar entrega hoy?",
      internalUser: "Agente, ¿cómo cerró nuestro margen neto, qué stock está bajo y qué retenciones del SRI vencen?",
      internalBot:
        "Resumen Gerencial NIIF: Tus ventas subieron +14.2% ($8,420 USD) con margen bruto del 38.4%. Inventario: 3 SKUs bajaron del stock mínimo. SRI: Emitidas 64 facturas XAdES-BES y 5 retenciones de IVA en la fuente a proveedores nacionales; tu declaración de IVA vence el día 28 y el ATS XML ya está cuadrado.",
    },
    inmobiliaria: {
      label: "Inmobiliaria / Constructora / Promotora",
      externalUser: "Me interesa el departamento de 2 dormitorios en Samborondón. ¿Aceptan financiamiento y cuándo puedo visitarlo?",
      externalBot:
        "¡Excelente elección! La unidad 4B (92 m²) está disponible en nuestro inventario de unidades y aplica para reserva con el 10% y financiamiento bancario o directo a 18 meses. Tengo disponibilidad para recorrido presencial o tour Virtual Staging IA mañana a las 11:00 o 16:30. ¿Cuál horario te agendo?",
      internalUser: "Necesito el estado de flujo de obra, alerta UAFE del mes y la campaña de correo para inversionistas.",
      internalBot:
        "Reporte Listo: 1) El flujo de caja proyectado cubre el 100% de los hitos de obra del trimestre. 2) Reporte UAFE: 0 operaciones inusuales pendientes; 2 reservas superaron los $10,000 USD con debida diligencia completa. 3) Ya redacté los 4 correos mensuales con proyección de plusvalía para tus 320 leads VIP.",
    },
    servicios: {
      label: "Clínica / Consultora / Estudio Profesional",
      externalUser: "Buenas tardes, quisiera saber el valor de la consulta especializada y si tienen turno para este jueves.",
      externalBot:
        "¡Buenas tardes! La consulta integral incluye diagnóstico digital y tiene un valor de $60 USD. Este jueves tenemos cupo a las 10:00 AM y 15:00 PM. Si confirmas tu correo y cédula/RUC, te bloqueo el turno y te envío el enlace de pago.",
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
            <span>EL DIFERENCIADOR ESTRELLA DE GRUPO VOLIA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-swiss-pine tracking-tight">
            Arquitectura de{" "}
            <span className="text-brand-emerald">&ldquo;Doble Agente IA&rdquo;</span>{" "}
            Incluida en Todo Módulo
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Cada solución de <strong className="text-swiss-pine">Grupo Volia</strong> incorpora{" "}
            <strong className="text-brand-emerald">2 Agentes de Inteligencia Artificial especializados</strong>{" "}
            conectados en tiempo real a tu inventario, facturación y CRM (con cuota de uso justo de{" "}
            <strong className="text-swiss-pine">1,500 interacciones/mes incluidas</strong>).
          </p>
        </div>

        {/* Interactive Industry Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <span className="text-xs font-mono text-slate-500 mr-2">Simular flujo en sector:</span>
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

        {/* Mobile Tab Switcher */}
        <div className="flex justify-center gap-2 mb-6 lg:hidden">
          <button
            type="button"
            onClick={() => setActiveTab("both")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
              activeTab === "both" ? "bg-swiss-pine text-white" : "bg-swiss-canvas text-slate-600"
            }`}
          >
            Ver Ambos
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("external")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
              activeTab === "external" ? "bg-brand-emerald text-white" : "bg-swiss-canvas text-slate-600"
            }`}
          >
            Agente #1 (Clientes)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("internal")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
              activeTab === "internal" ? "bg-brand-pine text-white" : "bg-swiss-canvas text-slate-600"
            }`}
          >
            Agente #2 (Gerencia)
          </button>
        </div>

        {/* Dual Agent Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AGENTE IA #1: EXTERNO (CLIENTES) */}
          {(activeTab === "both" || activeTab === "external") && (
            <div className="swiss-card rounded-3xl p-6 sm:p-8 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-brand-emeraldSoft border border-brand-emerald/30 flex items-center justify-center text-brand-emerald">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-brand-emerald font-bold">
                        AGENTE IA #1 · FRENTE EXTERNO
                      </span>
                      <h3 className="text-xl font-bold text-swiss-pine">
                        Vendedor & Concierge 24/7 para tus Clientes
                      </h3>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-emeraldSoft text-brand-pine text-xs font-mono font-semibold border border-brand-emerald/30">
                    Web · API WhatsApp*
                  </span>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  Opera nativamente en la web de tu negocio: atiende prospectos al instante 24/7, consulta stock real en tu módulo de inventario, califica el presupuesto y{" "}
                  <strong className="text-swiss-pine">agenda citas o proformas directamente en tu CRM</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-swiss-canvas border border-slate-200">
                    <MessageSquare className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700">
                      Respuesta instantánea 24/7 en Web y enlazable a WhatsApp Business Web*
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-swiss-canvas border border-slate-200">
                    <CalendarCheck className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700">
                      Calificación automática y creación de leads en el Pipeline CRM
                    </span>
                  </div>
                </div>
              </div>

              {/* Clean Chat Simulation Box */}
              <div className="rounded-2xl bg-swiss-canvas border border-slate-200 p-4 space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 border-b border-slate-200 pb-2">
                  <span>SIMULACIÓN EN VIVO · {currentExample.label.toUpperCase()}</span>
                  <span className="text-brand-emerald font-bold">● Online 24/7</span>
                </div>
                <div className="flex justify-end">
                  <div className="bg-white border border-slate-200 text-slate-800 text-xs rounded-2xl rounded-tr-none px-3.5 py-2.5 max-w-[85%] shadow-sm">
                    <span className="block text-[10px] font-mono text-slate-400 mb-0.5">Prospecto / Cliente:</span>
                    {currentExample.externalUser}
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-brand-emeraldSoft border border-brand-emerald/30 text-swiss-pine text-xs rounded-2xl rounded-tl-none px-3.5 py-2.5 max-w-[90%]">
                    <span className="block text-[10px] font-mono text-brand-emerald font-bold mb-0.5">
                      Agente IA Externo (Tu Empresa):
                    </span>
                    {currentExample.externalBot}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AGENTE IA #2: INTERNO (EMPLEADOS & GERENCIA) */}
          {(activeTab === "both" || activeTab === "internal") && (
            <div className="swiss-card rounded-3xl p-6 sm:p-8 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-swiss-pine text-white flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-brand-emeraldBright" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-brand-pine font-bold">
                        AGENTE IA #2 · COPILOTO INTERNO
                      </span>
                      <h3 className="text-xl font-bold text-swiss-pine">
                        Analista Financiero, SRI, Inventarios & Marketing
                      </h3>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-swiss-canvas text-swiss-pine text-xs font-mono font-semibold border border-slate-300">
                    SRI · Stock · NIIF
                  </span>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  Vive dentro de tu panel administrativo: pre-llena facturas y retenciones de IVA a proveedores nacionales, monitorea alertas de inventario, redacta campañas y{" "}
                  <strong className="text-swiss-pine">explica el Balance General al gerente en español sencillo</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-swiss-canvas border border-slate-200">
                    <FileCheck2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700">
                      Pre-llenado SRI (Facturas, Retenciones IVA/Renta, ATS) y alertas de stock
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-swiss-canvas border border-slate-200">
                    <TrendingUp className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-700">
                      Explicación de Estados NIIF y redacción de campañas de correo
                    </span>
                  </div>
                </div>
              </div>

              {/* Clean Chat Simulation Box */}
              <div className="rounded-2xl bg-swiss-canvas border border-slate-200 p-4 space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 border-b border-slate-200 pb-2">
                  <span>COPILOTO GERENCIAL · {currentExample.label.toUpperCase()}</span>
                  <span className="text-brand-pine font-bold">● Conectado a SRI/Stock</span>
                </div>
                <div className="flex justify-end">
                  <div className="bg-white border border-slate-200 text-slate-800 text-xs rounded-2xl rounded-tr-none px-3.5 py-2.5 max-w-[85%] shadow-sm">
                    <span className="block text-[10px] font-mono text-slate-400 mb-0.5">Gerente / Contador:</span>
                    {currentExample.internalUser}
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white border-2 border-brand-emerald/35 text-swiss-pine text-xs rounded-2xl rounded-tl-none px-3.5 py-2.5 max-w-[90%] shadow-sm">
                    <span className="block text-[10px] font-mono text-brand-emerald font-bold mb-0.5">
                      Agente IA Interno (Copiloto CFO/SRI):
                    </span>
                    {currentExample.internalBot}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* WhatsApp Business Technical Transparency Notice (Meta / Cloud API Web Only) */}
        <div className="mt-8 p-5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-800 shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            <strong className="text-swiss-pine block mb-1">
              *Nota Técnica sobre Enlace con WhatsApp Business (Meta):
            </strong>
            El Agente IA #1 funciona de manera nativa y sin costos adicionales dentro de tu página web. Si deseas enlazarlo a WhatsApp: (1){" "}
            <strong className="text-swiss-pine">WhatsApp Business API debe ser contratado directamente por tu empresa con Meta</strong>{" "}
            (es un costo aparte pagado directamente a Meta según su tarifa de conversaciones); (2){" "}
            <strong className="text-swiss-pine">Grupo Volia</strong> realiza la integración técnica de tu agente personalizado directo a tu cuenta; y (3){" "}
            <strong className="text-brand-pine">
              esta conexión funciona exclusivamente en la versión Web (Cloud API) y requiere un número telefónico nuevo o que NO sea ya de WhatsApp ni WhatsApp Business
            </strong>.
          </div>
        </div>

        {/* Fair Use Transparency Banner */}
        <div className="mt-5 p-5 rounded-2xl bg-brand-emeraldSoft/70 border border-brand-emerald/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-brand-emerald text-white shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-swiss-pine">
                Política Transparente de Tokens IA Incluida (1,500 Interacciones / Mes)
              </h4>
              <p className="text-xs text-slate-700 mt-0.5">
                Tu mensualidad o mantenimiento ya incluye la llave API dedicada de tu empresa con 1,500 consultas mensuales de alta velocidad sin configuraciones complejas.
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
