"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  ArrowUpRight,
  Landmark,
  BarChart3,
  Users,
  Megaphone,
  Film,
  Compass,
  Layers,
  Award,
  Boxes,
} from "lucide-react";

export default function BusinessLinesSection() {
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);

  const erpModules = [
    {
      badge: "MÓDULO 1 · CUMPLIMIENTO TRIBUTARIO ECUADOR",
      title: "Contabilidad SRI, Facturación & Retención IVA Proveedores",
      icon: Landmark,
      features: [
        "Firma electrónica nativa XAdES-BES con archivo .p12 directo a los servidores SOAP del SRI (Recepción y Autorización en segundos).",
        "Emisión ilimitada de Facturas, Liquidaciones de Compra, Notas de Crédito y Comprobantes de Retención.",
        "Activación de Retención del IVA y Renta en la Fuente para proveedores nacionales (30%, 70%, 100%) con asiento contable automático.",
        "Exportación automática del Anexo Transaccional Simplificado (ATS) en XML validado, RIDE en PDF y Libro Diario de doble partida.",
      ],
      techStack: "XAdES-BES · SOAP SRI · Retenciones IVA Proveedores · ATS XML",
    },
    {
      badge: "MÓDULO 2 · CONTROL DE STOCK & CONEXIÓN POS",
      title: "Manejo de Inventario, Kardex & Conexión API de Ventas",
      icon: Boxes,
      features: [
        "Panel intuitivo para que tu equipo llene y actualice productos, precios, lotes, bodegas y costos en segundos (carga individual o masiva vía Excel/CSV).",
        "Enlazado automáticamente con Facturación SRI, Contabilidad (costo de ventas / Kardex) y Agente IA #1 (consulta stock real antes de cotizar).",
        "Arquitectura abierta conectable por API o Webhook con los sistemas de ventas, POS y facturadores más usados en Ecuador.",
        "Alertas automáticas de stock mínimo, productos de baja rotación y márgenes reales por SKU.",
      ],
      techStack: "Kardex en Tiempo Real · Carga Excel/CSV · API REST POS Ecuador · Sync ERP",
    },
    {
      badge: "MÓDULO 3 · DIRECCIÓN FINANCIERA (CFO DIGITAL)",
      title: "Finanzas Ejecutivas NIIF, Flujo de Caja & Simulador FP&A",
      icon: BarChart3,
      features: [
        "Estado de Resultados (P&L) bajo normativa NIIF, Balance General y Flujo de Efectivo en tiempo real.",
        "Simulador interactivo de proyecciones financieras (FP&A): ajusta precios, costos fijos y metas de ventas con sliders dinámicos.",
        "Conciliación de cobros locales y pasarelas multimoneda (Transferencias bancarias locales, Stripe, Kushki, PayPal).",
        "Monitoreo de márgenes unitarios, punto de equilibrio (Break-Even) y alertas de liquidez.",
      ],
      techStack: "NIIF P&L · Proyecciones FP&A · Break-Even Engine · Multimoneda",
    },
    {
      badge: "MÓDULO 4 · CRECIMIENTO Y RETENCIÓN COMERCIAL",
      title: "CRM Inteligente, Pipeline Kanban & Automatización Inngest",
      icon: Users,
      features: [
        "Tablero Kanban visual de oportunidades comerciales desde el primer contacto en la Web hasta la facturación y descarga de inventario.",
        "Flujos en segundo plano (Serverless Workflows con Inngest): seguimiento automático de cotizaciones abiertas, cobranza y reactivación.",
        "Historial unificado 360° de cada cliente: conversaciones con el Agente IA, facturas emitidas en el SRI y pagos.",
        "Alertas de cumplimiento y debida diligencia (UAFE) para sectores obligados (inmobiliarias, joyerías, vehículos).",
      ],
      techStack: "Inngest Workflows · Kanban CRM · API WhatsApp Web* · Alertas UAFE",
    },
    {
      badge: "MÓDULO 5 · ADQUISICIÓN Y CONTENIDO AUTOMATIZADO",
      title: "Marketing Ops IA, Calendario Editorial & ROAS Tracker",
      icon: Megaphone,
      features: [
        "Generador mensual con IA: crea el calendario completo de 30 días de publicaciones, guiones de Reels y boletines de correo en 1 clic.",
        "Envío masivo de correos corporativos con plantillas de alta conversión y seguimiento de apertura/clics.",
        "Dashboard de retorno sobre inversión publicitaria (Campaign ROAS) conectando inversión en pauta vs. ventas reales facturadas.",
        "Gestión de relaciones públicas (PR Outreach) y embudos de captación de leads B2B/B2C.",
      ],
      techStack: "AI Content Engine · Email Marketing · ROAS Analytics · Lead Funnels",
    },
  ];

  const activeModule = erpModules[selectedModuleIndex];
  const ActiveIcon = activeModule.icon;

  return (
    <section id="lineas-negocio" className="py-24 bg-swiss-canvas border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-emerald/30 text-brand-pine text-xs font-mono font-bold mb-4 shadow-sm">
            <Layers className="w-3.5 h-3.5 text-brand-emerald" />
            <span>ARQUITECTURA MODULAR DE 3 LÍNEAS DE NEGOCIO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-swiss-pine tracking-tight">
            Todo lo que tu Empresa Necesita para{" "}
            <span className="text-brand-emerald">Operar, Facturar y Escalar</span>
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base">
            Contrátanos por un módulo individual, activa la{" "}
            <strong className="text-swiss-pine">Suite Completa PYME (con Inventario y Retenciones SRI integrados)</strong>, o impulsa tu marca con producción audiovisual y consultoría financiera asistida por IA.
          </p>
        </div>

        {/* LÍNEA 1: LOS 5 MÓDULOS EMPRESARIALES B2B */}
        <div className="swiss-card rounded-3xl p-6 sm:p-10 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-brand-emerald font-bold">
                LÍNEA DE NEGOCIO 1 · SOFTWARE EMPRESARIAL B2B (ERP / INVENTARIO / SRI / CRM)
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-swiss-pine mt-1">
                5 Módulos Conectados (Juntos en Suite o por Separado)
              </h3>
            </div>
            <a
              href="#tarifario-calculadora"
              className="self-start lg:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-emeraldSoft hover:bg-brand-emeraldLight text-brand-pine border border-brand-emerald/30 text-xs font-bold transition-all"
            >
              <span>Desde $35/mes (Individual) o $69/mes (Suite Completa)</span>
              <ArrowUpRight className="w-4 h-4 text-brand-emerald" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Module Selector Tabs */}
            <div className="lg:col-span-5 space-y-2.5">
              {erpModules.map((mod, idx) => {
                const Icon = mod.icon;
                const isSelected = idx === selectedModuleIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedModuleIndex(idx)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start gap-3.5 ${
                      isSelected
                        ? "bg-brand-emeraldSoft/80 border-brand-emerald shadow-sm"
                        : "bg-swiss-canvas border-slate-200 hover:border-brand-emerald/40"
                    }`}
                  >
                    <div
                      className={`p-2.5 rounded-xl shrink-0 ${
                        isSelected
                          ? "bg-brand-emerald text-white"
                          : "bg-white border border-slate-200 text-brand-emerald"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block font-semibold">
                        {mod.badge}
                      </span>
                      <h4 className="text-sm font-bold text-swiss-pine mt-0.5">{mod.title}</h4>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Module Details */}
            <div className="lg:col-span-7 bg-swiss-canvas rounded-2xl p-6 sm:p-8 border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-brand-emerald text-white shrink-0">
                  <ActiveIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-brand-emerald font-bold">
                    {activeModule.badge}
                  </span>
                  <h4 className="text-xl font-bold text-swiss-pine">{activeModule.title}</h4>
                </div>
              </div>

              <div className="space-y-3.5 my-6">
                {activeModule.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-1" />
                    <p className="text-sm text-slate-700 leading-relaxed">{feat}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-mono text-slate-600">
                  Stack: <strong className="text-swiss-pine">{activeModule.techStack}</strong>
                </span>
                <span className="text-xs font-mono font-bold text-brand-emerald">
                  + Incluye los 2 Agentes de IA
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* LÍNEAS 2 Y 3: AUDIOVISUAL ESTÁNDARES INTERNACIONALES + CONSULTORÍA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Línea 2 */}
          <div className="swiss-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-brand-emerald font-bold">
                  LÍNEA DE NEGOCIO 2 · MEDIA & PROPUESTA VISUAL
                </span>
                <span className="px-3 py-1 rounded-full bg-brand-emeraldSoft text-brand-pine border border-brand-emerald/30 text-xs font-mono font-semibold">
                  Estándares Internacionales
                </span>
              </div>
              <h3 className="text-2xl font-bold text-swiss-pine flex items-center gap-2.5">
                <Film className="w-6 h-6 text-brand-emerald shrink-0" />
                <span>Producción Audiovisual IA, Virtual Staging & Comerciales</span>
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Aplicamos flujos de post-producción con Inteligencia Artificial de{" "}
                <strong className="text-swiss-pine">estándares internacionales</strong> (velocidad operativa probada en EE.UU.) combinados con 15 años de dirección en televisión nacional.
              </p>

              <div className="mt-6 space-y-3">
                <div className="p-3.5 rounded-xl bg-swiss-canvas border border-slate-200">
                  <div className="text-xs font-bold text-brand-pine font-mono">
                    PASO 1 · DIRECCIÓN VISUAL & ANIMACIÓN IA CINE 4K
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Virtual Staging para departamentos vacíos, renders animados hiperrealistas y cinemáticas comerciales en 4K sin costos de rodaje físico.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-swiss-canvas border border-slate-200">
                  <div className="text-xs font-bold text-brand-emerald font-mono">
                    PASO 2 · AUTO-EDITOR ALGORÍTMICO DE BRUTOS (VISIÓN IA)
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Nuestro motor propietario analiza tomas habladas e inmobiliarias, elimina silencios y selecciona los encuadres más estables automáticamente.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-swiss-canvas border border-slate-200">
                  <div className="text-xs font-bold text-swiss-pine font-mono">
                    PASO 3 · MASTERIZACIÓN COMERCIAL & REELS DE ALTA RETENCIÓN
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Subtitulado dinámico, música en tendencia y entrega lista para pauta en Instagram, TikTok, YouTube y portales inmobiliarios.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-600">
                Pack Proyecto: <strong className="text-swiss-pine">$250 – $450</strong> · Iguala Mensual:{" "}
                <strong className="text-brand-emerald">$290/mes</strong>
              </span>
              <a href="#contacto" className="text-brand-emerald font-bold hover:underline">
                Solicitar Reel / Demo →
              </a>
            </div>
          </div>

          {/* Línea 3 */}
          <div className="swiss-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-brand-pine font-bold">
                  LÍNEA DE NEGOCIO 3 · CONSULTORÍA & DESARROLLO A MEDIDA
                </span>
                <span className="px-3 py-1 rounded-full bg-swiss-canvas text-swiss-pine border border-slate-300 text-xs font-mono font-semibold">
                  1 Mes · 3 Revisiones
                </span>
              </div>
              <h3 className="text-2xl font-bold text-swiss-pine flex items-center gap-2.5">
                <Compass className="w-6 h-6 text-brand-emerald shrink-0" />
                <span>Estudios de Mercado IA, Modelos Excel & Módulos Propios</span>
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Antes de invertir capital en un proyecto, abrir una sucursal o lanzar un producto en Ecuador o Latinoamérica, desplegamos{" "}
                <strong className="text-swiss-pine">Subagentes de Investigación</strong> para entregarte certezas matemáticas.
              </p>

              <div className="mt-6 space-y-3">
                <div className="p-3.5 rounded-xl bg-swiss-canvas border border-slate-200">
                  <div className="text-xs font-bold text-brand-emerald font-mono">
                    ESTUDIO DE MERCADO + SIMULADOR EXCEL DINÁMICO ($199 – $350 USD)
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Investigación del mercado local y regional, análisis de competidores, modelo financiero Excel con 3 escenarios (TIR/VAN) y Dossier Ejecutivo en PDF/Word.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-swiss-canvas border border-slate-200">
                  <div className="text-xs font-bold text-brand-pine font-mono">
                    CREACIÓN DE MÓDULO NUEVO A MEDIDA ($490 – $1,200 USD)
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Si tu empresa tiene un flujo único de bodega, comisiones médicas, avalúo de joyas o logística, lo programamos y conectamos a tu Suite en 1 mes (con hasta 3 revisiones).
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-swiss-canvas border border-slate-200">
                  <div className="text-xs font-bold text-swiss-pine font-mono">
                    IMPLEMENTACIÓN WHITE-LABEL (MARCA BLANCA CORPORATIVA)
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Tu dominio, tus colores corporativos, tu logotipo en cada factura RIDE del SRI y tu Agente IA entrenado con el manual e inventario de tu empresa.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-600">
                Estudio + Excel: <strong className="text-swiss-pine">$199 – $350</strong> · Módulo a Medida:{" "}
                <strong className="text-brand-emerald">$490 – $1,200</strong>
              </span>
              <a href="#contacto" className="text-brand-emerald font-bold hover:underline">
                Cotizar Proyecto →
              </a>
            </div>
          </div>
        </div>

        {/* CASO DE ÉXITO #1: VOLIA FITNESS */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white border-2 border-brand-emerald/30 shadow-swiss-md flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 p-2.5 shadow-md">
              <Image
                src="/assets/branding/phoenix_logo_transparent.png"
                alt="Volia Fitness Logo (Marca B2C)"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-emerald font-bold uppercase">
                <Award className="w-4 h-4" />
                <span>CASO DE ÉXITO #1 EN PRODUCCIÓN REAL · PRODUCTO B2C DE GRUPO VOLIA</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-swiss-pine mt-1">
                Volia Fitness (`www.voliafitness.com`) — El Motor donde Nació Nuestra Suite B2B
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
                Los módulos empresariales de <strong className="text-swiss-pine">Grupo Volia</strong> (Facturación Electrónica SRI con firma XAdES-BES, Finanzas Ejecutivas NIIF, CRM con automatizaciones Inngest y Marketing Ops con IA) operan diariamente en producción real impulsando nuestra propia plataforma B2C de salud metabólica, ahora ampliados con Inventario Conectado y Retenciones a Proveedores para empresas comerciales.
              </p>
            </div>
          </div>

          <a
            href="https://www.voliafitness.com"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-emerald hover:bg-brand-pine text-white font-bold text-xs transition-all shadow-sm"
          >
            <span>Visitar voliafitness.com</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
