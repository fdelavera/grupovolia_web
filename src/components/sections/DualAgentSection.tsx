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
  const [selectedIndustry, setSelectedIndustry] = useState<
    "comercio" | "medico" | "colegio" | "restaurante" | "agro" | "inmobiliaria" | "contadores"
  >("comercio");

  const industryExamples = {
    comercio: {
      label: "Comercio / Importadora / Tienda",
      internalUser: "Oye, ¿cuál fue mi ganancia este mes, qué productos se están acabando y qué debo pagar al SRI?",
      internalBot:
        "Resumen claro: Vendiste $8,420 USD (+14.2% vs. mes pasado) con margen de 38.4%. Inventario: 3 productos clave bajaron del mínimo y toca reponer esta semana. SRI: Emitiste 64 facturas electrónicas sin errores y tu declaración vence el 28 (el archivo ATS XML ya está listo para subir).",
    },
    medico: {
      label: "Consultorio Médico / Odontología",
      internalUser: "¿Cuántos pacientes atendí esta semana, enviaste el RIDE con CIE-10 a SaludSA y qué reactivos caducan pronto?",
      internalBot:
        "Atenciones: 34 consultas esta semana ($2,720 USD facturados a 0% IVA). Todas las facturas salieron automáticamente con código CIE-10 y PDF personalizado para reembolso SaludSA/BMI. Alerta de bodega: 2 cajas de reactivos caducan en 48 días (ya agendado aviso al visitador médico).",
    },
    colegio: {
      label: "Escuela / Colegio / Academia",
      internalUser: "¿Qué representantes deben pensiones de este mes y cuánto recaudamos hoy?",
      internalBot:
        "Hoy recaudaste $3,850 USD en pensiones (facturadas a 0% IVA con el nombre del alumno impreso en el RIDE). Tienes 9 representantes pendientes de pago este mes; si quieres, te preparo un mensaje cordial para enviarles recordatorio.",
    },
    restaurante: {
      label: "Restaurante / Cafetería / Catering",
      internalUser: "¿Por qué subió el costo de mi plato estrella y cómo cerró la caja de Datafast ayer?",
      internalBot:
        "Ojo en cocina: El costo de tus ingredientes subió de 31% a 36.8% por el precio de la proteína; conviene ajustar $0.75 el PVP o negociar lote semanal. Caja de ayer cuadrada al centavo: $1,140 en ventas netas descontada la comisión Datafast.",
    },
    agro: {
      label: "Agroindustria / Camaronera / Cacao",
      internalUser: "¿Cómo están las compras con Liquidación 03 a productores y los precios de cacao/fletes hoy?",
      internalBot:
        "Emitidas 18 Liquidaciones de Compra 03 cuadradas al día. El Oráculo Argon reporta estabilidad en cacao NY y flete marítimo en Guayaquil esta semana; tu inventario de balanceado e insumos alcanza para 24 días.",
    },
    inmobiliaria: {
      label: "Inmobiliaria / Constructora (UAFE)",
      internalUser: "Necesito el flujo de obra del trimestre y revisar si algún abono pasó el tope UAFE de $10,000.",
      internalBot:
        "Reporte listo: El flujo de caja cubre el 100% de las planillas de obra del trimestre. UAFE: 2 reservas superaron los $10,000 en 30 días y ya tienen ficha KYC completa y archivo XML RESU generado.",
    },
    contadores: {
      label: "Contadores / Estudio Contable",
      internalUser: "¿Qué clientes de mi estudio vencen esta semana por 9no dígito del RUC y quién tiene pendiente IVA 104, ATS o Impuesto a la Renta?",
      internalBot:
        "Calendario SRI al día (contadores.grupovolia.com): 4 clientes vencen el día 18 (9no dígito 5). 2 Sociedades S.A.S. ya tienen ATS XML, Ret. 103 e IVA 104 listos para subir; 1 Persona Natural RIMPE Emprendedor tiene IVA semestral pendiente y su Form. 102 de Renta anual está cuadrado con gastos personales.",
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
            <strong className="text-brand-emerald">1 Asistente de IA Interno integrado</strong>{" "}
            que funciona con la misma precisión tanto si activas un único módulo independiente como si sincronizas los 10 módulos de la Suite completa — para que gerencia y equipo trabajen al triple de velocidad sin tocar tu sitio web externo (con{" "}
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
