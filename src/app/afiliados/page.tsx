"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Briefcase,
  Calculator,
  CheckCircle2,
  Handshake,
  Link2,
  ShieldCheck,
} from "lucide-react";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import GrupoVoliaChatModal from "@/components/chat/GrupoVoliaChatModal";

export default function AfiliadosPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [clients, setClients] = useState(8);
  const [planUsd, setPlanUsd] = useState<35 | 69 | 119>(69);

  const upfront25 = Number((clients * planUsd * 0.25).toFixed(2));
  const monthly18 = Number((clients * planUsd * 0.18).toFixed(2));
  const year1Total = Number((upfront25 + monthly18 * 12).toFixed(2));

  return (
    <div className="min-h-screen flex flex-col bg-white text-swiss-pine">
      <Navbar onOpenChat={() => setChatOpen(true)} />
      <main className="flex-1 pt-28 pb-20">
        {/* Hero */}
        <section className="bg-swiss-canvas border-b border-slate-200 py-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-emeraldSoft border border-brand-emerald/30 text-brand-pine text-xs font-mono font-bold">
                <Handshake className="w-3.5 h-3.5 text-brand-emerald" />
                <span>PROGRAMA OFICIAL DE PARTNERS, CONTADORES Y AFILIADOS B2B</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-swiss-pine leading-tight">
                Gana Comisiones Recurrentes en Dólares Recomendando{" "}
                <span className="text-brand-emerald">Grupo Volia S.A.S.</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Diseñado para Estudios Contables, Auditores, Cámaras, Consultores y Creadores B2B en Ecuador, Latinoamérica y EE.UU. Recibes enlaces rastreados con parámetro <code className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-xs text-brand-pine">?ref=TU_CODIGO</code> y liquidación verificada del 1 al 5 de cada mes vencido.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/#contacto"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-emerald hover:bg-brand-pine text-white font-bold text-xs sm:text-sm shadow-swiss-md"
                >
                  <span>Registrarme como Partner Contable / Referidor</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/vendedores"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-swiss-pine hover:bg-brand-pine text-white font-bold text-xs sm:text-sm"
                >
                  <Briefcase className="w-4 h-4 text-brand-emeraldBright" />
                  <span>Postular como Asesor Comercial (100% Mes 1)</span>
                </Link>
              </div>
            </div>

            {/* Calculadora interactiva de Partners */}
            <div className="lg:col-span-5 swiss-card rounded-3xl p-6 bg-white space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-emerald">
                <Calculator className="w-4 h-4" />
                <span>SIMULADOR PARTNER REFERIDOR (25% + 18%)</span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600">Empresas referidas activas:</span>
                  <strong className="font-mono text-swiss-pine">{clients} clientes</strong>
                </div>
                <input
                  type="range"
                  min={1}
                  max={40}
                  value={clients}
                  onChange={(e) => setClients(Number(e.target.value))}
                  className="w-full accent-brand-emerald cursor-pointer"
                />

                <div className="grid grid-cols-3 gap-2 pt-1">
                  {([35, 69, 119] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPlanUsd(p)}
                      className={`py-2 rounded-xl border text-xs font-bold font-mono ${
                        planUsd === p
                          ? "bg-swiss-pine text-white border-swiss-pine"
                          : "bg-swiss-canvas text-slate-700 border-slate-300"
                      }`}
                    >
                      ${p}/mes
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-200">
                <div className="p-3 rounded-xl bg-swiss-canvas border border-slate-200">
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Bono Inicial (25%)</div>
                  <div className="text-lg font-extrabold font-mono text-swiss-pine">
                    ${upfront25.toLocaleString()} USD
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-brand-emeraldSoft border border-brand-emerald/30">
                  <div className="text-[10px] font-mono text-brand-pine uppercase">Renta Mensual (18%)</div>
                  <div className="text-lg font-extrabold font-mono text-brand-emerald">
                    +${monthly18.toFixed(2)}/m
                  </div>
                </div>
              </div>

              <div className="text-xs font-bold text-brand-pine pt-1">
                Ingreso estimado en 12 meses: ${year1Total.toLocaleString()} USD
              </div>
            </div>
          </div>
        </section>

        {/* Modalidades */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Award,
              title: "1. Estudios Contables & Referidores",
              rate: "25% Inicial + 18% Recurrente",
              points: [
                "Ahorra 80% de tiempo operativo SRI: ATS, 103, 104 y descarga XML en 1 clic.",
                "Sin soporte técnico: onboarding en 4 semanas a cargo de Grupo Volia.",
                "Atribución automática por enlace ?ref= durante 30 días.",
              ],
            },
            {
              icon: Briefcase,
              title: "2. Asesores & Líderes Comerciales",
              rate: "100% Mes 1 + 20% Setup + 15%",
              points: [
                "Acceso a la PWA /ventas con proformas IA y pases Demo 24h.",
                "Líderes Master Affiliate obtienen 5% Override sobre ventas de su célula.",
                "Liquidación del 1 al 5 de cada mes vencido contra factura/RIMPE.",
              ],
            },
            {
              icon: Link2,
              title: "3. Trazabilidad Bancaria & NIIF",
              rate: "Transparente y Auditado",
              points: [
                "Cobros vía Stripe (0% recargo) o transferencia oficial GRUPOVOLIA S.A.S.",
                "Regla de cumplimiento: solo se comisionan pagos acreditados en firme.",
                "Contrato mercantil formal y blindaje LOPDP AES-256.",
              ],
            },
          ].map((card, i) => (
            <div key={i} className="swiss-card rounded-2xl p-6 space-y-3 bg-white">
              <div className="p-2.5 rounded-xl bg-brand-emeraldSoft text-brand-emerald w-fit">
                <card.icon className="w-5 h-5" />
              </div>
              <h2 className="text-base font-extrabold text-swiss-pine">{card.title}</h2>
              <div className="text-xs font-mono font-bold text-brand-emerald">{card.rate}</div>
              <ul className="space-y-2 pt-2">
                {card.points.map((pt, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-emerald shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="max-w-4xl mx-auto px-4 text-center pb-6">
          <div className="p-6 rounded-2xl bg-swiss-pine text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left space-y-1">
              <div className="text-xs font-mono text-brand-emeraldBright flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> PROGRAMA TRANSPARENTE B2B
              </div>
              <div className="font-bold text-sm">
                Solicita tu código oficial de Partner escribiendo a ventas@grupovolia.com o aquí en línea
              </div>
            </div>
            <Link
              href="/#contacto"
              className="shrink-0 px-5 py-2.5 rounded-xl bg-brand-emeraldBright text-swiss-pine font-extrabold text-xs hover:bg-white transition-all"
            >
              Solicitar Código Partner
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <GrupoVoliaChatModal isOpen={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
}
