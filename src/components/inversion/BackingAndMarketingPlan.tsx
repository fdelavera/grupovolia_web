"use client";

import {
  ShieldCheck,
  Building2,
  Cpu,
  Tv,
  GraduationCap,
  Megaphone,
  CheckCircle2,
} from "lucide-react";
import {
  FUND_ALLOCATION,
  MICRO1_AUDITED_MONTHS,
  MARKETING_THREE_PILLARS,
} from "@/data/inversionData";

export default function BackingAndMarketingPlan() {
  const credentials = [
    {
      org: "Micro1 (Silicon Valley, USA)",
      role: "QA Reviewer & AI Operations Lead",
      metric: "$45–$100/h · Promedio $70/h · BoA días 5 y 20",
      icon: Cpu,
    },
    {
      org: "CoStar Group (Richmond, VA, USA)",
      role: "Operations & AI Pipeline Manager (2022–2026)",
      metric: "+312% Velocidad · 4.0/4.0 QA Perfecto",
      icon: Building2,
    },
    {
      org: "TC Televisión (Ecuador · 10 Años)",
      role: "Director de Producción & Realizador",
      metric: "Equipo de 28 personas · +1,000h en vivo",
      icon: Tv,
    },
    {
      org: "New Jersey City University (USA)",
      role: "B.S. Leadership Global Business + SHRM/PMI",
      metric: "Arquitecto Full-Stack & Ingeniería Agéntica",
      icon: GraduationCap,
    },
  ];

  const maxMicro1 = 12500;

  return (
    <section
      id="respaldo"
      className="py-20 bg-swiss-canvas border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Part 1: Direct Backing Micro1 Inc. (Deel -> BoA) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-emerald/30 text-brand-pine text-xs font-mono font-bold shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-emerald" />
              <span>CAPACIDAD DE GENERACIÓN VERIFICADA (USA + ECUADOR)</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-swiss-pine tracking-tight">
              Capacidad de Generación:{" "}
              <span className="text-brand-emerald">$8,283/mes</span> (17.8x Sobre la Cuota)
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Tu recuperación no depende de qué tan rápido venda el software en sus primeros meses.
              Durante 2026 (Ene–Nov, 11 meses auditados en cuentas bancarias USA y Ecuador), el
              fundador demostró una capacidad consolidada de generación de{" "}
              <strong>$91,117.39 USD ($8,283.40/mes promedio)</strong>, con un promedio reciente
              Jul–Oct de <strong>$10,642/mes</strong> — frente a una cuota de apenas{" "}
              <strong>$466.67 USD/mes</strong> (~5.6% de la capacidad mensual).
            </p>

            {/* 4-Month Visual Bar Card */}
            <div className="swiss-card rounded-3xl p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-extrabold text-swiss-pine">
                  Capacidad de Generación Reciente Auditada (Jul–Oct 2026)
                </h3>
                <span className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-300 text-amber-800 text-[11px] font-mono font-bold">
                  Cuota mensual: $466.67/m
                </span>
              </div>

              <div className="space-y-3.5">
                {MICRO1_AUDITED_MONTHS.map((m) => {
                  const pct = Math.round((m.amount / maxMicro1) * 100);
                  return (
                    <div key={m.month} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-swiss-pine">
                          {m.month}{" "}
                          <span className="text-slate-400 font-normal">({m.detail})</span>
                        </span>
                        <span className="font-mono font-bold text-brand-pine">
                          ${m.amount.toLocaleString("en-US", { minimumFractionDigits: 0 })}{" "}
                          <span className="text-brand-emerald">({m.coverageRatio}x cuota)</span>
                        </span>
                      </div>
                      <div className="relative h-3.5 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-brand-emerald"
                          style={{ width: `${pct}%` }}
                        />
                        {/* Quota marker line at ~$466.67 (~3.7%) */}
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-amber-500"
                          style={{ left: "3.8%" }}
                          title="Cuota mensual: $466.67"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-2xl bg-swiss-pine text-white p-4 text-xs leading-relaxed">
                <strong className="text-brand-emeraldBright block mb-0.5">
                  Ene–Nov 2026 Auditado: $91,117.39 USD generados ($8,283.40/mes prom.) · Jul–Oct: $42,569.20 ($10,642/mes)
                </strong>
                Ingresos verificados en EE.UU. (consultoría IA Silicon Valley / operaciones) y
                fuentes independientes. La cuota de $466.67 representa apenas el{" "}
                <strong>~5.6%</strong> de la capacidad mensual promedio (cobertura 17.8x).
              </div>
            </div>
          </div>

          {/* Right: Double Backing + Founder Credentials */}
          <div className="lg:col-span-6 space-y-5">
            <div className="rounded-3xl bg-brand-emeraldSoft border border-brand-emerald/35 p-6 space-y-3">
              <h3 className="text-base font-extrabold text-swiss-pine">
                Doble Capa de Seguridad (Ingresos USA + Flujo SaaS)
              </h3>
              <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-swiss-pine">Garantía Primaria (Micro1 / BoA):</strong>{" "}
                    Incluso en meses con carga parcial o tarifa de $45/h, el flujo en dólares en EE.UU.
                    cubre con holgura el servicio de la deuda.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-swiss-pine">Garantía Secundaria (Flujo SaaS):</strong>{" "}
                    Con apenas 7 empresas PYME activas, Grupo Volia S.A.S. cubre por sí sola la cuota
                    sin depender de ingresos externos.
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {credentials.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.org} className="swiss-card rounded-2xl p-5 space-y-2">
                    <div className="p-2 w-fit rounded-xl bg-brand-emeraldSoft border border-brand-emerald/30 text-brand-emerald">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-extrabold text-swiss-pine">{c.org}</h4>
                    <div className="text-xs text-slate-600">{c.role}</div>
                    <div className="text-[11px] font-mono font-bold text-brand-emerald pt-1 border-t border-slate-100">
                      ★ {c.metric}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Part 2: Founder Skin-in-the-Game + 4-Phase Organic-to-Paid Growth Plan (Dec 2026 -> Q2 2027) */}
        <div className="pt-8 border-t border-slate-200 space-y-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-emerald/30 text-brand-pine text-xs font-mono font-bold mb-3 shadow-sm">
              <Megaphone className="w-3.5 h-3.5 text-brand-emerald" />
              <span>EN MARCHA DESDE DICIEMBRE 2026 · CAPITAL PROPIO DEL FUNDADOR + PROMOCIÓN DE LANZAMIENTO</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-swiss-pine tracking-tight">
              Plan de Crecimiento Orgánico y Expansión —{" "}
              <span className="text-brand-emerald">Arranque Ya Financiado en Diciembre</span>
            </h2>
            <p className="mt-2.5 text-slate-600 text-sm sm:text-base leading-relaxed">
              El fundador <strong>ya está invirtiendo capital propio desde diciembre de 2026</strong> para calentar
              las páginas oficiales, activar el píxel de Meta, construir una lista propia de WhatsApp mediante una guía
              gratuita para emprendedores y publicar los primeros videos del calendario tributario ecuatoriano (incluido el
              décimo tercer sueldo). Además, ya contamos con <strong>3 asesores comerciales activos en campo</strong>{" "}
              prospectando clientes iniciales mientras se combina contenido animado 2D, videos del fundador y una{" "}
              <strong>portavoz corporativa con fuerte presencia en redes de imagen empresarial</strong>.
            </p>
          </div>

          {/* 4-Phase Roadmap Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                phase: "FASE 1 · DIC – ENE (EN MARCHA)",
                title: "Audiencia Caliente & Confianza",
                desc: "Arranque suave financiado por el fundador: páginas oficiales, píxel de Meta, guía gratuita para captar contactos de WhatsApp y videos educativos de RUC, RIMPE, IESS y décimo tercero para llegar a enero con el algoritmo calibrado.",
              },
              {
                phase: "FASE 2 · FEB – MAR",
                title: "Dolores Reales & Contadores",
                desc: "Series animadas 2D sobre dolores concretos (facturas SRI caídas, bodegas descuadradas, multas IESS/UAFE) + contenido dirigido a estudios contables como multiplicadores (cada contador atiende 20 a 50 PYMEs).",
              },
              {
                phase: "FASE 3 · MAR – ABR",
                title: "Grupo Volia Como Solución",
                desc: "Conversión a demos en vivo de 24h con videos del fundador, demostraciones por industria y respaldo de portavoz corporativa con fuerte presencia en redes de imagen empresarial.",
              },
              {
                phase: "FASE 4 · DESDE MAYO",
                title: "Escala con Meta Ads + Fuerza Comercial",
                desc: "Pauta pagada de alto retorno impactando audiencias tibias ya registradas por el píxel, apoyada por nuestra fuerza comercial a comisión (ya iniciada con 3 asesores activos en campo).",
              },
            ].map((item) => (
              <div
                key={item.phase}
                className="swiss-card rounded-2xl p-5 bg-white border border-emerald-200/80 space-y-2"
              >
                <span className="inline-block text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-brand-emeraldSoft text-brand-pine">
                  {item.phase}
                </span>
                <h3 className="text-sm font-extrabold text-swiss-pine">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-5 swiss-card rounded-3xl p-6 space-y-4">
              <h3 className="text-sm font-extrabold text-swiss-pine uppercase font-mono">
                Distribución del Fondo de Promoción ($5,000 USD)
              </h3>
              <div className="space-y-4">
                {FUND_ALLOCATION.map((item) => (
                  <div key={item.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-swiss-pine">
                      <span>{item.title}</span>
                      <span className="font-mono">
                        ${item.amount.toLocaleString()} ({item.percent}%)
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.colorClass}`}
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4">
              {MARKETING_THREE_PILLARS.map((pillar) => (
                <div
                  key={pillar.title}
                  className="swiss-card rounded-3xl p-5 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <span className="inline-block text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-brand-emeraldSoft text-brand-pine mb-2">
                      {pillar.badge}
                    </span>
                    <h4 className="text-sm font-extrabold text-swiss-pine mb-3">
                      {pillar.title}
                    </h4>
                    <ul className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
                      {pillar.bullets.map((b) => (
                        <li key={b.label}>
                          <strong className="text-swiss-pine">{b.label}</strong> {b.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
