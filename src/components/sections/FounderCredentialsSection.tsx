"use client";

import Image from "next/image";
import {
  ShieldCheck,
  Tv,
  Cpu,
  GraduationCap,
  Building2,
  ArrowUpRight,
  FileText,
  Target,
  Compass,
} from "lucide-react";

export default function FounderCredentialsSection() {
  const credentials = [
    {
      org: "CoStar Group (Richmond, VA, EE.UU.)",
      period: "2022 – Febrero 2026",
      role: "Operations & AI Post-Production Pipeline Manager / Senior Specialist",
      metric: "+312% Velocidad Operativa · 4.0/4.0 QA",
      icon: Building2,
      desc: "Diseñó e integró automatización con IA Generativa en el pipeline de producción audiovisual para Homes.com y Apartments.com en Estados Unidos, triplicando la entrega diaria de activos con 100% de puntualidad y calificación perfecta.",
    },
    {
      org: "Micro1 (Silicon Valley / Remoto EE.UU.)",
      period: "Mayo 2026 – Presente",
      role: "Pre & Post-Completion QA Reviewer & AI Operations Lead",
      metric: "4.5–5.0 / 5.0 QA Score (~90% AHT)",
      icon: Cpu,
      desc: "Lidera la auditoría de calidad en entrenamiento de Robótica Autónoma (Embodied AI), física de Video Generativo y análisis multimodal humano, operando un 10% más rápido que el benchmark internacional.",
    },
    {
      org: "TC Televisión (Cadena Nacional, Ecuador)",
      period: "2010 – 2020 (10 Años)",
      role: "Director de Producción Broadcast, Realizador y Guionista",
      metric: "28 Profesionales a Cargo · +1,000h en Vivo",
      icon: Tv,
      desc: "Realizador, guionista y director de un departamento multidisciplinario de 28 especialistas a tiempo completo, reduciendo tiempos de entrega en un -35% y dirigiendo más de 1,000 horas de televisión en vivo sin fallos críticos.",
    },
    {
      org: "New Jersey City University (NJCU, EE.UU.)",
      period: "Formación Ejecutiva & Certificaciones",
      role: "B.S. in Leadership in a Global Business Environment",
      metric: "NJCU (EE.UU.) + 4x ISSA + SHRM/PMI",
      icon: GraduationCap,
      desc: "Licenciado en Liderazgo Global de Negocios en Estados Unidos, certificado en Gestión de Rendimiento (SHRM/HRCI/PMI), Ingeniería Agéntica y Arquitecto Full-Stack de sistemas financieros, inventarios y contables.",
    },
  ];

  return (
    <section
      id="credenciales"
      className="py-24 bg-white border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-emeraldSoft border border-brand-emerald/30 text-brand-pine text-xs font-mono font-bold mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-emerald" />
            <span>IDENTIDAD CORPORATIVA, MISIÓN, VISIÓN & RESPALDO EJECUTIVO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-swiss-pine tracking-tight">
            ¿Por qué{" "}
            <span className="text-brand-emerald">Grupo Volia</span> Entrega Estándar Internacional a un Precio Justo?
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            Las agencias tradicionales trasladan a tu factura sus alquileres y nóminas ociosas.{" "}
            <strong className="text-swiss-pine">Grupo Volia</strong> opera bajo un modelo ágil de ingeniería automatizada: tratas directamente con su fundador y arquitecto principal respaldado por tecnología de vanguardia.
          </p>
        </div>

        {/* Misión y Visión de Grupo Volia */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          <div className="swiss-card rounded-3xl p-6 sm:p-8 border-l-4 border-brand-emerald">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-brand-emeraldSoft text-brand-emerald border border-brand-emerald/30">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-swiss-pine uppercase tracking-wide font-mono">
                Nuestra Misión
              </h3>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Democratizar la ingeniería agéntica, los sistemas contables/tributarios inteligentes, el control de inventarios conectados y la producción audiovisual con IA para que las PYMEs y corporativos de Ecuador, Latinoamérica y Estados Unidos operen con eficiencia de clase mundial a costos justos.
            </p>
          </div>

          <div className="swiss-card rounded-3xl p-6 sm:p-8 border-l-4 border-swiss-pine">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-swiss-canvas text-swiss-pine border border-slate-300">
                <Compass className="w-5 h-5 text-brand-emerald" />
              </div>
              <h3 className="text-lg font-extrabold text-swiss-pine uppercase tracking-wide font-mono">
                Nuestra Visión
              </h3>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Consolidar a <strong className="text-swiss-pine">Grupo Volia</strong> como el referente tecnológico en la región en automatización financiera, inventarios integrados vía API, oráculos cuantitativos de decisión y agentes autónomos de Inteligencia Artificial al servicio del crecimiento empresarial sostenible.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Founder Card (Clean, without internal RUC / legal / internal infra details) */}
          <div className="lg:col-span-5 swiss-card rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-brand-emerald shadow-sm shrink-0">
                <Image
                  src="/assets/images/francisco_profile_avatar.png"
                  alt="Francisco de la Vera - Fundador & CEO de Grupo Volia"
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-brand-emerald font-bold">
                  FUNDADOR, CEO & ARQUITECTO PRINCIPAL
                </span>
                <h3 className="text-2xl font-extrabold text-swiss-pine">
                  Francisco de la Vera
                </h3>
                <p className="text-xs text-slate-500">
                  B.S. Global Business Leadership (NJCU, EE.UU.) · AI & Full-Stack Architect
                </p>
              </div>
            </div>

            <blockquote className="p-4 rounded-2xl bg-swiss-canvas border-l-4 border-brand-emerald text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-6">
              &ldquo;Después de liderar equipos de 28 personas en televisión nacional como realizador y guionista, y de escalar flujos de producción con IA en Estados Unidos, fundé Grupo Volia con una convicción clara: poner en manos del empresario de Ecuador y Latinoamérica tecnología agéntica, contable y cuantitativa de primer mundo a un precio accesible.&rdquo;
            </blockquote>

            <div className="flex flex-wrap gap-3">
              <a
                href="/docs/Francisco_De_La_Vera_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-swiss-canvas hover:bg-brand-emeraldSoft border border-slate-300 hover:border-brand-emerald text-xs font-bold text-swiss-pine transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-brand-emerald" />
                <span>Ver CV Ejecutivo (PDF)</span>
              </a>
              <a
                href="https://www.franciscodelavera.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600 transition-all"
              >
                <span>Web Personal</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: 4 Verified Credentials */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {credentials.map((cred, idx) => {
              const Icon = cred.icon;
              return (
                <div
                  key={idx}
                  className="swiss-card swiss-card-hover rounded-3xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="p-2.5 rounded-xl bg-brand-emeraldSoft border border-brand-emerald/30 text-brand-emerald">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">{cred.period}</span>
                    </div>
                    <h4 className="text-base font-bold text-swiss-pine">{cred.org}</h4>
                    <div className="text-xs font-semibold text-slate-700 mt-0.5">{cred.role}</div>
                    <p className="text-xs text-slate-600 mt-3 leading-relaxed">{cred.desc}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200">
                    <span className="text-xs font-mono font-bold text-brand-emerald">
                      ★ {cred.metric}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
