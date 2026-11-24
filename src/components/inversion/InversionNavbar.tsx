"use client";

import Link from "next/link";
import { FileDown, ShieldCheck, MessageCircle, ArrowLeft } from "lucide-react";

export default function InversionNavbar() {
  const navItems = [
    { href: "#video-demo", label: "Video (1:39)" },
    { href: "#activo-tecnologico", label: "Activo & Demos" },
    { href: "#simulador", label: "Simulador" },
    { href: "#respaldo", label: "Respaldo Micro1" },
    { href: "#circuitos", label: "Circuitos & FAQ" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-2.5 sm:px-6 pt-2.5 sm:pt-4 pointer-events-none">
      <div className="max-w-7xl mx-auto pointer-events-auto rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-swiss-lg py-2 sm:py-2.5 px-3 sm:px-6">
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <Link href="/" className="flex items-center gap-2 group min-w-0">
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm p-0.5 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/branding/logo_grupovolia_isotipo_clean.png"
                  alt="Grupo Volia"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="leading-tight min-w-0">
                <span className="font-extrabold tracking-tight text-swiss-pine text-xs sm:text-base block truncate">
                  GRUPO <span className="text-brand-emerald">VOLIA</span>
                </span>
                <span className="hidden sm:block text-[10px] font-mono text-brand-emerald font-bold uppercase tracking-wider">
                  Propuesta Puente · $5,000
                </span>
              </div>
            </Link>

            <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-emeraldSoft border border-brand-emerald/30 text-[11px] font-mono font-bold text-brand-pine shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-emerald" />
              Círculo Privado
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-5 shrink-0">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-semibold text-slate-600 hover:text-brand-emerald transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Link
              href="/"
              className="hidden md:inline-flex items-center gap-1 px-2.5 py-2 rounded-xl border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-600 hover:text-swiss-pine transition-all"
              title="Ir a la web comercial pública"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Web</span>
            </Link>

            <a
              href="/docs/Presentacion_Prestamo_Puente_GrupoVolia_2027.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-swiss-canvas hover:bg-brand-emeraldSoft border border-slate-200 hover:border-brand-emerald/40 text-[11px] sm:text-xs font-semibold text-slate-700 hover:text-brand-pine transition-all"
            >
              <FileDown className="w-3.5 h-3.5 text-brand-emerald" />
              <span className="hidden sm:inline">Presentación PDF</span>
              <span className="sm:hidden">PDF</span>
            </a>

            <a
              href="#confirmar"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-brand-emerald hover:bg-brand-pine text-white font-bold text-[11px] sm:text-xs transition-all shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Participar</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
