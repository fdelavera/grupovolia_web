"use client";

import React, { useEffect, useState } from "react";
import { HelpCircle, X, ShieldCheck } from "lucide-react";

export type TechTermKey =
  | "LOPDP"
  | "AES-256-GCM"
  | "ARCSA"
  | "NIIF"
  | "XAdES-BES"
  | "RIDE"
  | "UAFE"
  | "CIE-10"
  | "Kardex"
  | "SENAE"
  | "ATS"
  | "ROAS"
  | "API"
  | "RLS";

export interface TechTermInfo {
  title: string;
  plainMeaning: string;
  whyItMatters: string;
}

export const TECH_TERMS_DICTIONARY: Record<TechTermKey, TechTermInfo> = {
  LOPDP: {
    title: "LOPDP — Ley Orgánica de Protección de Datos Personales (Ecuador)",
    plainMeaning:
      "Es la ley ecuatoriana que obliga a clínicas, colegios y empresas a cuidar la información privada de sus pacientes, alumnos y clientes.",
    whyItMatters:
      "Grupo Volia protege estos datos con permisos por usuario y cifrado bancario para evitar multas legales y filtraciones.",
  },
  "AES-256-GCM": {
    title: "Cifrado Bancario AES-256-GCM",
    plainMeaning:
      "Es un candado matemático de nivel militar/bancario que convierte archivos .p12, diagnósticos médicos y notas confidenciales en código ilegible para cualquiera fuera de tu empresa.",
    whyItMatters:
      "Aunque alguien intentara leer la base de datos sin permiso, tus secretos clínicos, escolares o financieros permanecen totalmente protegidos.",
  },
  ARCSA: {
    title: "ARCSA — Registro Sanitario y Lotes (Ecuador)",
    plainMeaning:
      "Control obligatorio de lotes y fechas de caducidad para medicamentos, suplementos, cosméticos e insumos médicos en Ecuador.",
    whyItMatters:
      "Grupo Volia te avisa automáticamente 60 días antes de que expire un lote para poder canjearlo con el visitador médico y evitar pérdidas.",
  },
  NIIF: {
    title: "NIIF — Normas Internacionales de Información Financiera",
    plainMeaning:
      "Son las reglas contables oficiales exigidas en Ecuador por la Superintendencia de Compañías para llevar tu Balance General y Estado de Resultados.",
    whyItMatters:
      "No tienes que ser contador experto para cuadrar cuentas: cada venta, compra o depósito genera su asiento contable NIIF automático.",
  },
  "XAdES-BES": {
    title: "Firma Electrónica Nativa XAdES-BES (.p12)",
    plainMeaning:
      "Es el sello digital oficial que firma tus facturas XML con tu certificado .p12 antes de enviarlas al SRI en segundos.",
    whyItMatters:
      "No necesitas programas aparte ni intermediarios: firmas y autorizas directo en los servidores del SRI desde la misma pantalla.",
  },
  RIDE: {
    title: "RIDE PDF — Representación Impresa de Documento Electrónico",
    plainMeaning:
      "Es el PDF visual legible de tu factura electrónica que recibe tu cliente (con tu logotipo, colores corporativos, código de barras y notas).",
    whyItMatters:
      "En Grupo Volia tu RIDE sale personalizado a tu marca y listo para enviarse automático por correo y con 1 clic por WhatsApp.",
  },
  UAFE: {
    title: "UAFE / RESU — Unidad de Análisis Financiero y Económico",
    plainMeaning:
      "Control preventivo antilavado obligatorio en Ecuador para constructoras, inmobiliarias, joyerías y venta de vehículos en pagos iguales o mayores a $10,000 en 30 días.",
    whyItMatters:
      "El Radar UAFE detecta fraccionamientos automáticamente y genera el archivo XML RESU/NO-RESU listo para subir al portal SISLAFT.",
  },
  "CIE-10": {
    title: "CIE-10 — Código Internacional de Diagnósticos Médicos",
    plainMeaning:
      "Es el código estándar médico que piden aseguradoras como SaludSA, BMI o Humana para aprobar reembolsos a tus pacientes.",
    whyItMatters:
      "Permite imprimir el diagnóstico en la casilla de Información Adicional del RIDE PDF sin afectar el XML tributario del SRI.",
  },
  Kardex: {
    title: "Kardex CPP — Costo Promedio Ponderado",
    plainMeaning:
      "Es el registro exacto de cuántas unidades entran, salen y cuánto cuesta en promedio cada producto de tu bodega.",
    whyItMatters:
      "Se actualiza al instante cada vez que vendes o importas mercadería, evitando quiebres de stock y descuadres de inventario.",
  },
  SENAE: {
    title: "SENAE / Landed Cost — Liquidación Aduanera de Importación",
    plainMeaning:
      "Es el cálculo real de cuánto te cuesta un producto puesto en tu bodega tras sumar FOB, flete, seguro, arancel DAI, FODINFA (0.5%) e ISD.",
    whyItMatters:
      "Evita vender mercadería importada por debajo de su costo real calculando todo antes de ingresar los productos al inventario.",
  },
  ATS: {
    title: "ATS XML — Anexo Transaccional Simplificado del SRI",
    plainMeaning:
      "Es el reporte mensual obligatorio que consolidan los contadores con todas las ventas, compras y retenciones para subir al portal del SRI.",
    whyItMatters:
      "Grupo Volia lo genera en XML validado en segundos junto con tus pre-llenados del Formulario 103 y 104.",
  },
  ROAS: {
    title: "ROAS — Retorno sobre Inversión Publicitaria",
    plainMeaning:
      "Indica cuántos dólares reales vendiste por cada dólar que invertiste en publicidad de Meta Ads, YouTube o TikTok.",
    whyItMatters:
      "Conectamos tu pauta con tus facturas reales para saber con certeza qué anuncios traen ventas y cuáles están quemando presupuesto.",
  },
  API: {
    title: "API / Webhooks POS — Conexión con Puntos de Venta",
    plainMeaning:
      "Es un puente seguro que conecta tu sistema actual de caja o tienda online (Loyverse, WooCommerce, PayPhone, Deuna!) con tu contabilidad.",
    whyItMatters:
      "No te obliga a botar tu sistema de caja si ya te gusta usarlo: todas las ventas viajan solas a tu contabilidad e inventario.",
  },
  RLS: {
    title: "RLS — Row Level Security (Aislamiento Bancario por Empresa)",
    plainMeaning:
      "Es una regla estricta dentro de la base de datos que garantiza que cada empresa vea única y exclusivamente su propia información.",
    whyItMatters:
      "Incluso operando múltiples empresas en la nube, tus datos financieros y de clientes están herméticamente separados.",
  },
};

function TechTermModal({
  termKey,
  onClose,
}: {
  termKey: TechTermKey;
  onClose: () => void;
}) {
  const info = TECH_TERMS_DICTIONARY[termKey];

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 backdrop-blur-[2px] p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white border border-emerald-300 shadow-2xl p-5 text-left space-y-3 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-brand-pine font-extrabold text-sm">
            <ShieldCheck className="w-4 h-4 text-brand-emerald shrink-0" />
            <span>{info.title}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar explicación"
            className="p-1 rounded-lg text-slate-400 hover:text-swiss-pine hover:bg-slate-100 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3 rounded-xl bg-swiss-canvas border border-slate-200 space-y-1">
          <div className="text-[10px] font-mono font-bold uppercase text-brand-emerald">
            En palabras sencillas
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">{info.plainMeaning}</p>
        </div>

        <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
          <div className="text-[10px] font-mono font-bold uppercase text-swiss-pine">
            ¿Por qué beneficia a tu empresa?
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">{info.whyItMatters}</p>
        </div>

        <div className="text-[10px] text-slate-400 text-right">
          Haz clic fuera de esta ventana o en la X para cerrar
        </div>
      </div>
    </div>
  );
}

export function TechTerm({
  termKey,
  label,
  className = "",
}: {
  termKey: TechTermKey;
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className={`inline-flex items-center gap-0.5 font-bold text-swiss-pine underline decoration-dotted decoration-brand-emerald underline-offset-2 hover:text-brand-emerald transition-colors cursor-pointer ${className}`}
        title={`Clic para ver qué significa ${termKey} en palabras sencillas`}
      >
        <span>{label || termKey}</span>
        <HelpCircle className="w-3 h-3 text-brand-emerald inline shrink-0" />
      </button>
      {open && <TechTermModal termKey={termKey} onClose={() => setOpen(false)} />}
    </>
  );
}

export function TechGlossaryBar({
  terms,
  title = "¿Siglas técnicas? Haz clic en cualquiera para ver qué significa en sencillo:",
}: {
  terms: TechTermKey[];
  title?: string;
}) {
  const [activeKey, setActiveKey] = useState<TechTermKey | null>(null);

  return (
    <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 flex flex-wrap items-center gap-2 text-xs">
      <span className="text-[11px] font-semibold text-slate-500 mr-1 flex items-center gap-1">
        <HelpCircle className="w-3.5 h-3.5 text-brand-emerald" />
        <span>{title}</span>
      </span>
      {terms.map((key) => (
        <button
          key={key}
          type="button"
          onClick={() => setActiveKey(key)}
          className="px-2.5 py-1 rounded-full bg-brand-emeraldSoft/70 hover:bg-brand-emerald hover:text-white text-brand-pine border border-brand-emerald/30 font-mono text-[11px] font-bold transition-colors cursor-pointer"
        >
          {key} ?
        </button>
      ))}
      {activeKey && <TechTermModal termKey={activeKey} onClose={() => setActiveKey(null)} />}
    </div>
  );
}
