"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Compass,
  DollarSign,
  Layers,
  Move,
  Smartphone,
  TrendingUp,
  X,
} from "lucide-react";

interface WelcomeStop {
  id: string;
  targetId: string;
  badge: string;
  title: string;
  summary: string;
  bullets: string[];
  icon: React.ComponentType<{ className?: string }>;
}

interface RectBox {
  top: number;
  left: number;
  width: number;
  height: number;
}

type CornerPos = "bottom-right" | "top-right" | "bottom-left" | "top-left";

const CORNER_CLASSES: Record<CornerPos, string> = {
  "bottom-right": "bottom-3 right-3 sm:bottom-5 sm:right-5",
  "top-right": "top-3 right-3 sm:top-5 sm:right-5",
  "bottom-left": "bottom-3 left-3 sm:bottom-5 sm:left-5",
  "top-left": "top-3 left-3 sm:top-5 sm:left-5",
};

const CORNER_ORDER: CornerPos[] = ["bottom-right", "top-right", "top-left", "bottom-left"];

const WELCOME_STOPS: WelcomeStop[] = [
  {
    id: "reasons",
    targetId: "vend-tour-reasons",
    badge: "Parada 1 · Propuesta de Valor",
    title: "4 Razones por las que Cierra Fácil en Ecuador",
    summary:
      "Cada objeción común del empresario PYME viene resuelta: SRI ilimitado con Auto-Retry, 10 módulos sincronizados que reemplazan CRMs de WhatsApp de $50–$300/mes (con Inbox WhatsApp SLA, Round-Robin, segmentación por compras SRI y Ads IA), cifrado LOPDP y herramientas móviles.",
    bullets: [
      "$0 adicional por factura electrónica SRI y sin cobros por usuario extra en Suite.",
      "El cliente entiende el ahorro frente a herramientas sueltas en los primeros 3 minutos.",
    ],
    icon: TrendingUp,
  },
  {
    id: "industries",
    targetId: "vend-tour-industries",
    badge: "Parada 2 · 10 Giros Vivos",
    title: "Los 10 Giros con Demo Especializado Listo",
    summary:
      "Prospecta consultorios CIE-10, colegios, importadoras, constructoras UAFE, farmacias ARCSA, restaurantes, camaroneras, talleres, gimnasios y estudios contables con su propio vocabulario.",
    bullets: [
      "Muestras un sandbox especializado con datos reales en vivo, nunca diapositivas vacías.",
    ],
    icon: Layers,
  },
  {
    id: "income",
    targetId: "vend-tour-income",
    badge: "Parada 3 · Ingresos & Simulador",
    title: "Simulador, Comisiones Claras & Células Comerciales",
    summary:
      "Calcula tu ingreso referencial (esquema base desde 25% inicial + 18% recurrente mensual según modalidad y plan $35–$119/m) y conoce las dos rutas: Asesor Independiente o Líder de Célula.",
    bullets: [
      "Capacitación práctica de 45 minutos con guiones listos para empezar desde la semana 1.",
      "Detalles contractuales y anexos de metas se entregan en entrevista privada.",
    ],
    icon: DollarSign,
  },
  {
    id: "app",
    targetId: "vend-tour-app",
    badge: "Parada 4 · Tu Oficina Móvil",
    title: "Tu Web App Comercial (/ventas) en Tablet o Celular",
    summary:
      "Desde /ventas creas Proformas IA en segundos con los módulos a medida del cliente, envías Pases Demo 24h por WhatsApp y capturas Firma Autógrafa Digital en pantalla.",
    bullets: [
      "Instalable como app PWA en iPad, tablet Android, iPhone o laptop.",
    ],
    icon: Smartphone,
  },
  {
    id: "apply",
    targetId: "vend-tour-apply",
    badge: "Parada 5 · Postula & Agenda",
    title: "Envía tu Perfil y Agenda Entrevista (45 min)",
    summary:
      "Completa el formulario de postulación, sugiere fecha/hora y pre-agenda tu entrevista directo en Google Calendar con nuestro canal oficial ventas@grupovolia.com.",
    bullets: [
      "Recibirás confirmación y acceso a las sesiones grabadas tras validar tu postulación.",
    ],
    icon: Calendar,
  },
];

function chooseCorner(rect: RectBox | null, vw: number, vh: number): CornerPos {
  if (!rect) return "bottom-right";
  const cardW = Math.min(430, vw - 32);
  const cardH = Math.min(380, vh - 32);
  const pad = 20;
  const boxes: Array<{ id: CornerPos; x1: number; y1: number; x2: number; y2: number }> = [
    { id: "bottom-right", x1: vw - cardW - pad, y1: vh - cardH - pad, x2: vw - pad, y2: vh - pad },
    { id: "top-right", x1: vw - cardW - pad, y1: pad, x2: vw - pad, y2: pad + cardH },
    { id: "bottom-left", x1: pad, y1: vh - cardH - pad, x2: pad + cardW, y2: vh - pad },
    { id: "top-left", x1: pad, y1: pad, x2: pad + cardW, y2: pad + cardH },
  ];
  const rx2 = rect.left + rect.width;
  const ry2 = rect.top + rect.height;
  let best: CornerPos = "bottom-right";
  let minArea = Infinity;
  for (const b of boxes) {
    const ox = Math.max(0, Math.min(b.x2, rx2) - Math.max(b.x1, rect.left));
    const oy = Math.max(0, Math.min(b.y2, ry2) - Math.max(b.y1, rect.top));
    const area = ox * oy;
    if (area < minArea) {
      minArea = area;
      best = b.id;
    }
    if (area === 0) return b.id;
  }
  return best;
}

export function VendedoresWelcomeTour({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [stepIdx, setStepIdx] = useState(0);
  const [rect, setRect] = useState<RectBox | null>(null);
  const [autoCorner, setAutoCorner] = useState<CornerPos>("bottom-right");
  const [manualCorner, setManualCorner] = useState<CornerPos | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStepIdx(0);
      setManualCorner(null);
    }
  }, [isOpen]);

  const current = WELCOME_STOPS[stepIdx] ?? WELCOME_STOPS[0];

  const measure = useCallback(
    (scroll: boolean) => {
      if (!isOpen || !current) return;
      const el = document.querySelector<HTMLElement>(`[data-tour-id="${current.targetId}"]`);
      if (!el) {
        setRect(null);
        return;
      }
      if (scroll) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      const raw = el.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const top = Math.max(8, Math.min(vh - 48, raw.top));
      const left = Math.max(8, Math.min(vw - 48, raw.left));
      const bottom = Math.min(vh - 8, raw.bottom);
      const right = Math.min(vw - 8, raw.right);
      const box: RectBox = {
        top: Math.round(top - 4),
        left: Math.round(left - 4),
        width: Math.max(40, Math.round(right - left + 8)),
        height: Math.max(36, Math.round(bottom - top + 8)),
      };
      setRect(box);
      setAutoCorner(chooseCorner(box, vw, vh));
    },
    [isOpen, current]
  );

  useEffect(() => {
    if (!isOpen) return;
    setManualCorner(null);
    const t1 = window.setTimeout(() => measure(true), 100);
    const t2 = window.setTimeout(() => measure(false), 450);
    const onSync = () => measure(false);
    window.addEventListener("scroll", onSync, true);
    window.addEventListener("resize", onSync);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("scroll", onSync, true);
      window.removeEventListener("resize", onSync);
    };
  }, [isOpen, current, measure]);

  if (!isOpen || !current) return null;

  const Icon = current.icon;
  const corner = manualCorner ?? autoCorner;

  return (
    <>
      {rect && (
        <div
          aria-hidden="true"
          className="fixed z-40 pointer-events-none rounded-2xl border-2 border-brand-emerald ring-4 ring-brand-emerald/35 transition-all duration-300"
          style={{
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            boxShadow: "0 0 0 9999px rgba(6, 32, 22, 0.42)",
          }}
        >
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-emerald text-white font-mono text-[10px] font-bold shadow-md -translate-y-3 translate-x-3">
            ★ {current.badge}
          </span>
        </div>
      )}

      <div
        className={`fixed z-50 bottom-2 left-2 right-2 sm:left-auto sm:right-auto ${CORNER_CLASSES[corner]} sm:w-full sm:max-w-md transition-all duration-300`}
      >
        <div className="rounded-3xl bg-white border-2 border-brand-emerald shadow-2xl overflow-hidden">
          <div className="bg-swiss-pine text-white px-4 py-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-xl bg-brand-emerald flex items-center justify-center shrink-0">
                <Compass className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-mono uppercase tracking-wider text-brand-emeraldBright font-bold truncate">
                  Tour Bienvenida · 60 Segundos
                </div>
                <div className="text-[11px] font-extrabold truncate">
                  Descubre tu Futura Oficina Móvil Grupo Volia
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => {
                  const pos = CORNER_ORDER.indexOf(corner);
                  setManualCorner(CORNER_ORDER[(pos + 1) % CORNER_ORDER.length]);
                }}
                className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-bold text-white"
                title="Mover panel a otra esquina"
              >
                <Move className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
                title="Cerrar tour"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-brand-pine font-bold border border-emerald-200">
                <Icon className="w-3.5 h-3.5 text-brand-emerald" />
                <span>{current.badge}</span>
              </span>
              <span>
                Parada {stepIdx + 1} / {WELCOME_STOPS.length}
              </span>
            </div>

            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-emerald transition-all duration-300"
                style={{ width: `${Math.round(((stepIdx + 1) / WELCOME_STOPS.length) * 100)}%` }}
              />
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-swiss-pine leading-snug">
                {current.title}
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{current.summary}</p>
            </div>

            <ul className="space-y-1.5 bg-swiss-canvas border border-slate-200 rounded-2xl p-3">
              {current.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-[11.5px] text-swiss-pine">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1">
              {WELCOME_STOPS.map((stop, idx) => (
                <button
                  key={stop.id}
                  type="button"
                  onClick={() => setStepIdx(idx)}
                  className={`w-6 h-6 rounded-lg font-mono text-[10px] font-bold transition-colors ${
                    idx === stepIdx
                      ? "bg-swiss-pine text-white"
                      : idx < stepIdx
                      ? "bg-emerald-100 text-brand-pine"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                  title={stop.title}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
              <button
                type="button"
                onClick={onClose}
                className="px-2.5 py-1.5 rounded-xl text-slate-500 hover:text-swiss-pine font-semibold"
              >
                Omitir
              </button>
              <div className="flex items-center gap-1.5">
                {stepIdx > 0 && (
                  <button
                    type="button"
                    onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-swiss-pine font-bold hover:bg-slate-50"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Anterior</span>
                  </button>
                )}
                {stepIdx < WELCOME_STOPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setStepIdx((i) => Math.min(WELCOME_STOPS.length - 1, i + 1))}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-emerald hover:bg-brand-pine text-white font-bold shadow-sm"
                  >
                    <span>Siguiente</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <a
                    href="#postular"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-swiss-pine hover:bg-brand-pine text-white font-bold shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-emeraldBright" />
                    <span>Postular Ahora</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
