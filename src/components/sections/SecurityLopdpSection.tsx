"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Lock,
  Database,
  HeartPulse,
  Building2,
  Scale,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { TechGlossaryBar, TechTerm } from "@/components/ui/TechTermPopover";

interface IndustryCardSpec {
  id: string;
  label: string;
  headline: string;
  easySummary: string;
  highlights: string[];
}

const ADAPTIVE_INDUSTRIES: IndustryCardSpec[] = [
  {
    id: "salud",
    label: "Consultorios Médicos & Odontología",
    headline: "Facturas 0% IVA, Seguros Médicos y Ficha Clínica Segura",
    easySummary:
      "Emite la factura con tu logo e incluye el Diagnóstico CIE-10 y Póliza de Seguro listo para que tu paciente pida reembolso en SaludSA, BMI o Humana, sin complicaciones.",
    highlights: [
      "Historias clínicas, diagnósticos y recetas cifradas con AES-256-GCM (cumplimiento LOPDP).",
      "Directorio separado de Pacientes y Visitadores Médicos / Laboratorios con caducidad <= 60 días.",
      "Envío directo de PDF + XML al correo y 1 clic al WhatsApp de tu paciente.",
    ],
  },
  {
    id: "colegios",
    label: "Escuelas, Colegios & Academias",
    headline: "Pensiones sin Enredos y Facturación Automática al Representante",
    easySummary:
      "Organiza alumnos por curso y paralelo, emite la factura electrónica 0% IVA a nombre del papá o representante e imprime el nombre del estudiante en el PDF.",
    highlights: [
      "Control claro de pensiones pagadas, becas y saldos por cobrar mes a mes.",
      "Expedientes de menores protegidos bajo LOPDP Ecuador con acceso restringido por rol.",
      "Inventario opcional de uniformes, libros y bar escolar integrado.",
    ],
  },
  {
    id: "comercio",
    label: "Importadoras, Tiendas & Mayoristas",
    headline: "Costo Real de Importación, Kardex Ilimitado y Conexión POS",
    easySummary:
      "Sube tus productos por Excel, calcula cuánto te cuesta cada artículo nacionalizado (FOB + flete + DAI + FODINFA + ISD) y factura sin límites desde caja o web.",
    highlights: [
      "Oráculo IA en plataforma rastreando precios y fletes de insumos clave (chips, aires, repuestos).",
      "Retenciones 07 a proveedores, Guías de Remisión 06 y liquidación Datafast/Medianet.",
      "Conecta tu punto de venta actual (Loyverse, WooCommerce, PayPhone) sin cambiar de equipo.",
    ],
  },
  {
    id: "construccion",
    label: "Constructoras & Inmobiliarias (UAFE)",
    headline: "Planillas por Obra y Cumplimiento UAFE Sin Estrés Contable",
    easySummary:
      "Controla materiales e ingresos por proyecto y genera automáticamente las alertas y el archivo XML RESU de la UAFE cuando un cliente supera los $10,000 en 30 días.",
    highlights: [
      "Expedientes KYC/PEP y sustentos de origen lícito de fondos cifrados AES-256-GCM.",
      "Guías de Remisión 06 de materiales entre bodegas y proyectos.",
      "Simulador financiero y seguimiento de precios de acero y materiales en plataforma.",
    ],
  },
  {
    id: "restaurantes",
    label: "Restaurantes, Cafeterías & Catering",
    headline: "Control de Recetas (Food Cost %), Caja Diaria y Compras Agro",
    easySummary:
      "Descubre en segundos cuánto te cuesta preparar cada plato frente a tu precio de carta para no perder plata sin darte cuenta, y cuadra tu caja + Datafast cada noche.",
    highlights: [
      "Calculadora de Escandallo y Food Cost % integrada en tu módulo operativo.",
      "Liquidaciones de Compra 03 rápidas para comprar directo a productores rurales sin RUC.",
      "Calendario IA para publicar promos semanales en Reels, TikTok y WhatsApp.",
    ],
  },
  {
    id: "agro",
    label: "Agroindustria, Camaroneras & Cacao",
    headline: "Control por Piscina o Finca y Liquidaciones 03 al Día",
    easySummary:
      "Registra balanceado, diésel y cosechas por piscina o hacienda, liquida compras rurales con comprobante 03 y vigila futuros de Cacao NY y energía en plataforma.",
    highlights: [
      "Facturación 0% IVA y guías de traslado de cosecha a empacadora o puerto.",
      "Oráculo IA Argon/Neon con precios de materias primas, fletes marítimos y noticias.",
      "Inventarios de insumos por finca con trazabilidad completa.",
    ],
  },
  {
    id: "talleres",
    label: "Talleres Automotrices, Servitecas & Flotas",
    headline: "Órdenes de Trabajo por Placa, Repuestos y Factura 1-Clic",
    easySummary:
      "Anota el ingreso del carro por placa, chasis y kilometraje; carga los repuestos desde inventario y convierte el presupuesto en factura electrónica SRI en un clic.",
    highlights: [
      "Historial técnico cifrado de cada vehículo y avisos automáticos de mantenimiento.",
      "Calculadora Landed Cost si importas autopartes y repuestos OEM directamente.",
      "Separación clara entre repuestos 15% IVA y mano de obra.",
    ],
  },
  {
    id: "farmacias",
    label: "Farmacias, Estética & Salud ARCSA",
    headline: "Semáforo de Caducidad y Mix 0% / 15% IVA Sin Errores",
    easySummary:
      "Recibe alerta temprana 60 días antes de que expire un lote o producto con registro sanitario ARCSA para canjearlo a tiempo con el visitador médico.",
    highlights: [
      "Agenda directa de laboratorios, visitadores médicos y condiciones de devolución.",
      "Custodia cifrada LOPDP para recetas retenidas o tratamientos crónicos frecuentes.",
      "Facturación automática combinando medicinas 0% IVA y dermocosmética 15% IVA.",
    ],
  },
  {
    id: "fitness",
    label: "Gimnasios, Clubes & Membresías",
    headline: "Socios Activos, Congelamientos (Freeze) y Pagos Recurrentes",
    easySummary:
      "Heredado de nuestra propia operación en producción (Volia Fitness): controla renovaciones, coaches, ventas de bar/suplementos y pagos por tarjeta sin filas.",
    highlights: [
      "Valoraciones físicas cifradas AES-256-GCM y alertas automáticas de vencimiento.",
      "Control de stock de proteínas, bebidas e indumentaria con costo promedio.",
      "Programa de coaches/embajadores con códigos de referido conectados a contabilidad.",
    ],
  },
  {
    id: "estudios",
    label: "Estudios Contables, Legales & Agencias",
    headline: "Igualas Mensuales, Calendario SRI y Custodia de Expedientes",
    easySummary:
      "Cobra tus igualas puntualmente, automatiza el calendario SRI según el 9no dígito del RUC y protege contratos o declaraciones sensibles con cifrado bancario.",
    highlights: [
      "Generación rápida de Proformas, Estados Financieros NIIF, Form 103/104 y ATS XML.",
      "Alianzas con comisiones recurrentes conectadas directo a bancos y contabilidad.",
      "Sin límite artificial de facturas ni de usuarios en cada empresa cliente.",
    ],
  },
];

export default function SecurityLopdpSection() {
  const [selectedIndustryId, setSelectedIndustryId] = useState("salud");
  const currentIndustry =
    ADAPTIVE_INDUSTRIES.find((i) => i.id === selectedIndustryId) || ADAPTIVE_INDUSTRIES[0];

  return (
    <section
      id="seguridad-lopdp"
      className="py-24 bg-swiss-canvas border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-emeraldSoft border border-brand-emerald/30 text-brand-pine text-xs font-mono font-bold mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-emerald" />
            <span>10 INDUSTRIAS PYME ECUADOR + BLINDAJE LEGAL LOPDP</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-swiss-pine tracking-tight">
            Se Adapta a Tu Industria y Protege tus Datos con{" "}
            <span className="text-brand-emerald">Seguridad Bancaria</span>
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            No tienes que ajustar tu empresa a un software rígido ni ser experto en computación. Selecciona tu giro para ver cómo Grupo Volia trabaja para ti desde el primer día:
          </p>
        </div>

        {/* Selector Interactivo de las 10 Industrias */}
        <div className="swiss-card rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 space-y-6">
          <div className="flex flex-wrap gap-2">
            {ADAPTIVE_INDUSTRIES.map((ind) => {
              const active = ind.id === selectedIndustryId;
              return (
                <button
                  key={ind.id}
                  type="button"
                  onClick={() => setSelectedIndustryId(ind.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                    active
                      ? "bg-brand-emerald text-white border-brand-emerald shadow-sm"
                      : "bg-swiss-canvas text-slate-700 border-slate-200 hover:border-brand-emerald/50"
                  }`}
                >
                  {ind.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2 border-t border-slate-100">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-brand-emerald uppercase">
                <Building2 className="w-3.5 h-3.5" />
                <span>Plantilla Lista para {currentIndustry.label}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-swiss-pine">
                {currentIndustry.headline}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {currentIndustry.easySummary}
              </p>
              <div className="pt-2">
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-swiss-pine hover:bg-brand-pine text-white text-xs font-bold transition-all"
                >
                  <span>Pedir Demo de {currentIndustry.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-2.5">
              {currentIndustry.highlights.map((h) => (
                <div
                  key={h}
                  className="p-3.5 rounded-2xl bg-swiss-canvas border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bloque ¿Tu equipo no es amigo de la tecnología? */}
        <div className="p-6 sm:p-8 rounded-3xl bg-swiss-pine text-white grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="md:col-span-1 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-brand-emeraldBright font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CERO ESTRÉS TÉCNICO</span>
            </div>
            <h3 className="text-lg font-extrabold leading-snug">
              ¿Tu equipo le tiene miedo a los sistemas complicados?
            </h3>
          </div>
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1">
              <div className="font-mono text-brand-emeraldBright font-bold">PASO 1</div>
              <div className="font-bold text-sm">Te lo entregamos listo</div>
              <p className="text-slate-200 leading-relaxed">
                Subimos tu logo, tu firma .p12, tus productos y tus clientes actuales para que no arranques desde cero.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1">
              <div className="font-mono text-brand-emeraldBright font-bold">PASO 2</div>
              <div className="font-bold text-sm">Aprende como en WhatsApp</div>
              <p className="text-slate-200 leading-relaxed">
                Botones grandes en español normal, tour paso a paso y un Asistente IA al que le preguntas en tus propias palabras.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1">
              <div className="font-mono text-brand-emeraldBright font-bold">PASO 3</div>
              <div className="font-bold text-sm">SRI siempre al día</div>
              <p className="text-slate-200 leading-relaxed">
                Si cambia el SRI o la ley tributaria, nosotros actualizamos la plataforma sin cobrarte extras en tu membresía.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Tarjetas Blindaje Legal & Técnico */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="swiss-card rounded-2xl p-6 space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-brand-emeraldSoft text-brand-emerald flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-swiss-pine">
              Protección Legal <TechTerm termKey="LOPDP" /> Ecuador
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tratamiento estricto bajo la Ley Orgánica de Protección de Datos Personales para{" "}
              <strong>datos sensibles de salud</strong> (diagnósticos <TechTerm termKey="CIE-10" />, recetas, aseguradoras), fichas escolares de menores y control sanitario <TechTerm termKey="ARCSA" /> o <TechTerm termKey="UAFE" />.
            </p>
          </div>

          <div className="swiss-card rounded-2xl p-6 space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-brand-emeraldSoft text-brand-emerald flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-swiss-pine">
              Cifrado <TechTerm termKey="AES-256-GCM" label="AES-256-GCM" /> en Bóveda
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Las notas clínicas privadas, acuerdos comerciales y tu certificado electrónico{" "}
              <code className="font-mono">.p12</code> se cifran del lado servidor con{" "}
              <strong>AES-256-GCM (IV 96-bit + AuthTag 128-bit)</strong> con llaves exclusivas por empresa.
            </p>
          </div>

          <div className="swiss-card rounded-2xl p-6 space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-brand-emeraldSoft text-brand-emerald flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-swiss-pine">
              Aislamiento Bancario <TechTerm termKey="RLS" /> + Auditoría
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              49 tablas PostgreSQL con <strong>Row Level Security (RLS)</strong> estricto por empresa, bitácora forense inmutable y cálculo contable bajo <TechTerm termKey="NIIF" /> y <TechTerm termKey="SENAE" />.
            </p>
            <div className="pt-1 inline-flex items-center gap-1.5 text-[11px] font-bold text-brand-pine">
              <HeartPulse className="w-3.5 h-3.5 text-brand-emerald" />
              <span>Apto para Médicos, Colegios &amp; Corporativos</span>
            </div>
          </div>
        </div>

        <TechGlossaryBar
          title="Haz clic en cualquier término legal, contable o técnico para ver su significado en palabras sencillas:"
          terms={["LOPDP", "AES-256-GCM", "RLS", "CIE-10", "ARCSA", "UAFE", "SENAE", "NIIF", "Kardex"]}
        />
      </div>
    </section>
  );
}
