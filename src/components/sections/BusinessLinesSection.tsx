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
  FolderKanban,
  ShieldAlert,
  Globe,
  Bot,
  UserCheck,
  Network,
} from "lucide-react";
import { TechGlossaryBar } from "@/components/ui/TechTermPopover";

export default function BusinessLinesSection() {
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);

  const erpModules = [
    {
      badge: "MÓDULO 1 · CUMPLIMIENTO TRIBUTARIO ECUADOR",
      title: "Contabilidad SRI, Auto-Retry & Retención Proveedores",
      icon: Landmark,
      features: [
        "Firma electrónica nativa XAdES-BES con archivo .p12 directo al SRI con Reintento Automático en segundo plano si los servidores del SRI se caen.",
        "Facturación SRI 100% ilimitada ($0 por documento) con RIDE PDF personalizado a tu marca: logotipo, colores corporativos, código de barras de 49 dígitos y diagnóstico/notas adicionales.",
        "Envío automático de PDF + XML al correo del cliente y botón 1-Clic para WhatsApp Web o celular normal.",
        "Suite Contable NIIF completa: Retenciones 07, Compras XML, Liquidaciones 03, CxC/CxP, Partida Doble automática desde Ventas/Inventario/RRHH, Activos Fijos, ATS XML y Migración Histórica IA.",
      ],
      techStack: "XAdES-BES · Auto-Retry SRI · RIDE White-Label · ATS / 103 / 104",
    },
    {
      badge: "MÓDULO 2 · CONTROL DE STOCK, ESCÁNER & POS",
      title: "Inventario Multibodega, Kardex CPP & Escáner Móvil",
      icon: Boxes,
      features: [
        "Kardex atómico Costo Promedio Ponderado (NIIF NIC 2) con escáner móvil de códigos de barras CODE128 y carga masiva inteligente desde Excel, Contífico, Alegra o Perseo.",
        "Enlazado automáticamente con Facturación SRI, Contabilidad (COGS automático) y Copiloto IA (alerta quiebres de stock y caducidad ARCSA).",
        "Cálculo de Landed Cost aduanero SENAE (FOB, flete, seguro, DAI, FODINFA, ISD) y recetas/Food Cost % para restaurantes.",
        "Webhooks firmados HMAC-SHA256 conectables con Loyverse, WooCommerce, PayPhone, Deuna! y POS usados en Ecuador.",
      ],
      techStack: "Kardex NIIF NIC 2 · Escáner CODE128 · Landed Cost SENAE · API POS",
    },
    {
      badge: "MÓDULO 3 · DIRECCIÓN FINANCIERA & ORÁCULO MULTI-BOLSA",
      title: "Finanzas NIIF, Bancos EC & Oráculo Bursátil + Insumos",
      icon: BarChart3,
      features: [
        "Estado de Resultados (P&L) NIIF, Balance General, Flujo de Caja (con previsión automática de Nómina e IESS día 15 desde RRHH) y simulador Quant Sentinel FP&A.",
        "Conciliación bancaria y cooperativa Ecuador (todos los Bancos Privados, Públicos, Cooperativas SEPS como JEP, Jardín Azuayo, Policía Nacional, 29 de Octubre, Oscus, Mutualistas y Red SPI) más liquidación de lotes Datafast/Medianet.",
        "Oráculo IA Multi-Bolsa en vivo dentro del panel: Bolsa de Valores de Quito y Guayaquil (BVQ/BVG acciones y renta fija) + LATAM, NYSE/NASDAQ y mercados globales con enlaces a fuentes.",
        "Rastreo inteligente de insumos clave importados, fletes y noticias de tu industria a 0 tokens mediante feeds RSS + motores Argon/Hydrogen/Neon.",
      ],
      techStack: "NIIF P&L · BVQ/BVG + Global · Bancos EC CSV · Quant Sentinel FP&A",
    },
    {
      badge: "MÓDULO 4 · CRECIMIENTO, 10 INDUSTRIAS & BLINDAJE LOPDP",
      title: "CRM 10 Giros PYME Ecuador & Expedientes Cifrados LOPDP",
      icon: Users,
      features: [
        "Embudo Kanban comercial y automatizaciones Inngest de seguimiento, cotizaciones, cobranza y reactivación.",
        "Adaptable en 1 clic a 10 Industrias PYME EC (Clínicas CIE-10, Colegios, Importadoras SENAE, Constructoras UAFE, Agro/Camaroneras, Farmacias ARCSA, Talleres, Restaurantes, Gimnasios y Estudios).",
        "Cifrado bancario AES-256-GCM en cumplimiento de la LOPDP Ecuador: historias clínicas, recetas, fichas escolares y notas financieras protegidas extremo a extremo.",
        "Directorio 360° de Clientes/Pacientes y Proveedores sincronizado con Facturación y Retenciones SRI.",
      ],
      techStack: "LOPDP AES-256-GCM · 10 Giros Verticales · 14 Switches On/Off",
    },
    {
      badge: "MÓDULO 5 · EJECUCIÓN DE EQUIPO & CALENDARIO SINCRONIZADO",
      title: "Project Manager Enterprise (4 Modos) & Agenda Google/Outlook",
      icon: FolderKanban,
      features: [
        "Módulo independiente del CRM con 4 modos de dependencia: Proyectos Independientes, Subproyectos Padre-Hijo, Secuenciales Fin-a-Inicio y Co-dependientes Sincronizados.",
        "Alterna en 1 clic entre Tablero estilo Monday (presupuesto USD y subtareas), Kanban de 5 columnas y Mapa/Gantt visual.",
        "Agenda sincronizada con Google Calendar, Microsoft Outlook/365 y Apple Calendar (.ics) con protección anti-choques.",
        "Interconectado con RRHH: las vacaciones aprobadas bloquean la agenda automáticamente y las horas de turnos etiquetados a proyectos suman costo laboral real al presupuesto.",
      ],
      techStack: "Tablero Monday · Kanban · Gantt · Google/Outlook Sync · Costeo RRHH",
    },
    {
      badge: "MÓDULO 6 · ADQUISICIÓN MULTICANAL, COMMS & AFILIADOS",
      title: "Marketing Ops IA, Comunicados Internos & Afiliados NIIF",
      icon: Megaphone,
      features: [
        "Calendario editorial IA de 30 días, campañas Meta/YouTube/TikTok y envíos por correo o WhatsApp API con ROAS y CPL ligados a tus ventas reales en Finanzas.",
        "Pestaña de Comunicaciones Internas conectada directo a la App White-Label de Empleados para lanzar campañas, promociones y avisos corporativos al equipo.",
        "Gestión de PR/Influencers y programa de Partners/Afiliados en doble vía contable (comisiones por pagar y depósitos detectados desde extractos bancarios).",
        "Funciona de manera autónoma si contratas solo Marketing, o enlazado con Finanzas, Contabilidad y RRHH.",
      ],
      techStack: "Meta/YT/TikTok ROAS · WhatsApp API · Comms Internas · Afiliados NIIF",
    },
    {
      badge: "MÓDULO 7 · PREVENCIÓN ANTILAVADO ECUADOR",
      title: "Radar Preventivo UAFE ($10,000) & XML SISLAFT RESU",
      icon: ShieldAlert,
      features: [
        "Monitoreo automático de operaciones y abonos acumulados iguales o superiores a $10,000 USD en ventanas móviles de 30 días por cliente.",
        "Ideal para constructoras, inmobiliarias, concesionarios, joyerías y sectores obligados ante la UAFE en Ecuador.",
        "Matriz KYC / PEP integrada al expediente del cliente sin doble digitación.",
        "Generación directa del archivo XML mensual RESU / NO-RESU listo para validación del Oficial de Cumplimiento.",
      ],
      techStack: "Umbral $10k/30d · Matriz KYC/PEP · Exportador XML RESU/NO-RESU",
    },
    {
      badge: "MÓDULO 8 · AUTOSERVICIO CLIENTES & PROVEEDORES",
      title: "Portal B2B White-Label 24/7 (/portal/tu-empresa)",
      icon: Globe,
      features: [
        "Ventanilla digital con la marca y colores de tu empresa para que clientes descarguen sus XML y RIDE PDF autorizados del SRI sin llamar a oficina.",
        "Consulta en línea de saldos de vales y créditos en tienda (vigencia 365 días bajo NIIF 15).",
        "Buzón digital para que tus proveedores suban sus facturas XML y descarguen sus Retenciones 07 al instante.",
        "Aislamiento estricto por empresa (Row Level Security) y cero exposición de datos de otros clientes.",
      ],
      techStack: "Portal White-Label · Descarga RIDE/XML · Buzón Proveedores 24/7",
    },
    {
      badge: "MÓDULO 9 · INTELIGENCIA ARTIFICIAL CORPORATIVA",
      title: "Copiloto IA Flotante y Movible (Personalizable a tu Marca)",
      icon: Bot,
      features: [
        "Asistente IA integrado dentro de tus módulos con nombre y logotipo 100% personalizables para tu empresa (1,500 consultas/mes incluidas).",
        "Detecta el usuario conectado y su rol (Dueño, Contadora, Ventas, Bodega) respetando permisos granulares y guardrails definidos por gerencia.",
        "Sube tus reglamentos, catálogos o listas de precios (.txt/.md/.csv/.json) para que tu equipo consulte procedimientos en español sencillo.",
        "Las preguntas de guía UI ('¿dónde hago...?') y titulares RSS operan a 0 tokens sin consumir tu cuota mensual.",
      ],
      techStack: "Guardrails 3 Capas · Docs Propios · Permisos por Rol · 0-Token UI Help",
    },
    {
      badge: "MÓDULO 10 · NUEVO · TALENTO HUMANO ECUADOR & APP WHITE-LABEL",
      title: "RRHH Ecuador, Nómina IESS/Servicios, Radar Feriados IA & App Empleados",
      icon: UserCheck,
      features: [
        "Reclutamiento & Candidatos (ATS) integrado: crea vacantes por Nuevo Cargo o Reemplazo por Salida, gestiona postulantes internos y externos con archivo/actualización de CV (PDF/DOCX) y transfiere automáticamente datos y CV a Nuevo Colaborador en 1 clic.",
        "Onboarding Legal Paso 0 (Dependencia IESS, Independiente RIMPE, Comisionista o NO COMISIONISTA $0) con expediente de CV + Enlaces 1-Clic de Registro para colaboradores (Web App por rol) y vendedores (/ventas).",
        "Horarios departamentales con sobretiempo automático +25%/+50%/+100%, Radar IA Dominical de feriados nacionales y cantonales (18 cantones incl. Cuenca y Manta), relojes biométricos ZKTeco/Hikvision y App Empleados PWA 100% White-Label (/empleado/tu-empresa) con switch GPS ON/OFF.",
        "Offboarding legal inmutable con Acta de Finiquito PDF, Utilidades 15%, lotes TXT / SPI Interbancario para 61 bancos y cooperativas EC, RDEP CSV y Migración Inteligente IA editable.",
      ],
      techStack: "ATS + CVs · IESS + RIMPE · Enlaces 1-Clic · 25/50/100% · App WL · Finiquito",
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
            Empieza activando solo el módulo que hoy necesitas o conecta los 10 en{" "}
            <strong className="text-swiss-pine">una sola Suite sincronizada</strong> — además de nuestra consola independiente{" "}
            <strong className="text-brand-emerald">contadores.grupovolia.com</strong> para contadores y estudios contables en Ecuador.
          </p>
          <div className="mt-6 text-left">
            <TechGlossaryBar
              title="Glosario fácil (haz clic en cualquier sigla):"
              terms={["XAdES-BES", "RIDE", "ATS", "Kardex", "API", "NIIF", "ROAS"]}
            />
          </div>
        </div>

        {/* LÍNEA 1: LOS 10 MÓDULOS EMPRESARIALES B2B INTERCONECTADOS */}
        <div className="swiss-card rounded-3xl p-6 sm:p-10 mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-brand-emerald font-bold">
                LÍNEA DE NEGOCIO 1 · SUITE EMPRESARIAL B2B (10 MÓDULOS INTERCONECTADOS · MIGRACIÓN IA)
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-swiss-pine mt-1">
                10 Módulos Independientes e Interconectados (Juntos en Suite o por Separado)
              </h3>
            </div>
            <a
              href="#tarifario-calculadora"
              className="self-start lg:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-emeraldSoft hover:bg-brand-emeraldLight text-brand-pine border border-brand-emerald/30 text-xs font-bold transition-all"
            >
              <span>Desde $35/mes + IVA (Individual) o $69/mes + IVA (Suite 10 Módulos)</span>
              <ArrowUpRight className="w-4 h-4 text-brand-emerald" />
            </a>
          </div>

          {/* Callout Elegante: Consola Multi-Empresa para Contadores (Servicio Independiente) */}
          <div className="mb-7 p-5 rounded-2xl bg-swiss-pine text-white border border-emerald-700/60 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs shadow-sm">
            <div className="space-y-1.5 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-emerald-300 font-bold">
                <span>NUEVO SERVICIO INDEPENDIENTE · contadores.grupovolia.com</span>
              </div>
              <h4 className="text-base sm:text-lg font-extrabold text-white">
                Consola Multi-Empresa para Contadores &amp; Estudios Contables (Ecuador)
              </h4>
              <p className="text-emerald-100/90 leading-relaxed">
                Herramienta exclusiva e independiente de nuestros 10 módulos regulares: administra <strong>Empresas/Sociedades y Personas Naturales</strong> (Régimen General, RIMPE Emprendedor y Negocio Popular) desde una sola consola. Cada cliente adapta su Plan de Cuentas (NIIF SCVS, Simplificado PN o Propio) y módulos editables cuando crezca, con <strong>Calendario Fiscal SRI consolidado por 9no dígito del RUC</strong> (IVA 104, Retenciones 103, ATS e <strong>Impuesto a la Renta 101/102</strong>).
              </p>
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-900/80 border border-emerald-600/50 text-emerald-200 font-bold">
                  Contador Independiente: $69 + IVA/mes (hasta 15 RUCs · $4.60/cliente)
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-900/80 border border-emerald-600/50 text-emerald-200 font-bold">
                  Estudio Contable: $119 + IVA/mes (hasta 40 RUCs · +$5/RUC extra)
                </span>
              </div>
            </div>
            <a
              href="https://contadores.grupovolia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-emerald hover:bg-emerald-500 text-white font-extrabold transition-all"
            >
              <span>Abrir contadores.grupovolia.com</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Callout Elegante: Una Sola Suite Sincronizada o Cada Módulo Independiente */}
          <div className="mb-7 p-4 rounded-2xl bg-brand-emeraldSoft/60 border border-brand-emerald/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
            <div className="flex items-start gap-2.5">
              <Network className="w-5 h-5 text-brand-emerald shrink-0 mt-0.5" />
              <p className="text-slate-700 leading-relaxed">
                <strong className="text-swiss-pine">A tu medida — Juntos en una Suite Sincronizada o por Separado:</strong>{" "}
                Cada uno de nuestros 10 módulos trabaja de manera totalmente autónoma si hoy solo necesitas resolver una prioridad (ej. Facturación SRI o solo RRHH Ecuador). Cuando decides activar varios, se sincronizan automáticamente entre sí sin doble digitación (Ventas ↔ Inventario ↔ Contabilidad ↔ Finanzas ↔ Proyectos ↔ Marketing ↔ RRHH y App Empleados), incluyendo <strong>migración asistida por IA y editable manualmente</strong>.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Module Selector Tabs */}
            <div className="lg:col-span-5 space-y-2 max-h-[540px] overflow-y-auto pr-1">
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
                  + Integrado con el Copiloto IA Interno
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* LÍNEAS 2 Y 3: OCULTAS TEMPORALMENTE PARA ENFOQUE 100% EN SUITE B2B + CONSOLA CONTADORES */}
        {false && (
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
        )}

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
