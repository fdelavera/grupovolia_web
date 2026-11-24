"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Menu,
  X,
  FileDown,
  Bot,
  Calculator,
  Layers,
  Cpu,
  ShieldCheck,
  ArrowUpRight,
  Briefcase,
  LogIn,
} from "lucide-react";

interface NavbarProps {
  onOpenChat: () => void;
}

export default function Navbar({ onOpenChat }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/#lineas-negocio", label: "Módulos ERP", icon: Layers },
    { href: "/#seguridad-lopdp", label: "Industrias & LOPDP", icon: ShieldCheck },
    { href: "/#algoritmos-cuantitativos", label: "Oráculos IA", icon: Cpu },
    { href: "/#doble-agente", label: "Copiloto IA", icon: Bot },
    { href: "/#tarifario-calculadora", label: "Precios", icon: Calculator },
    { href: "/#credenciales", label: "Empresa", icon: ShieldCheck },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-2.5 sm:px-5 pt-3 sm:pt-4 pointer-events-none">
      <div
        className={`max-w-[1400px] mx-auto pointer-events-auto rounded-2xl transition-all duration-300 border ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-slate-200/90 shadow-swiss-lg py-2 px-3 sm:px-5"
            : "bg-white/90 backdrop-blur-md border-slate-200/80 shadow-swiss-md py-2.5 px-3 sm:px-5"
        }`}
      >
        <div className="flex items-center justify-between gap-2 xl:gap-3">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="relative w-9 h-9 rounded-xl bg-white border border-slate-200/90 flex items-center justify-center overflow-hidden shadow-sm group-hover:border-brand-emerald/50 transition-all p-0.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/branding/logo_grupovolia_isotipo_clean.png"
                alt="Grupo Volia Logo"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex items-center">
              <span className="font-extrabold tracking-tight text-swiss-pine text-sm sm:text-base xl:text-lg leading-none whitespace-nowrap">
                GRUPO <span className="text-brand-emerald">VOLIA</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (Empresas Clientes) */}
          <nav className="hidden xl:flex items-center gap-3 2xl:gap-4 min-w-0">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] 2xl:text-xs font-semibold text-slate-600 hover:text-brand-emerald transition-colors tracking-wide whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/vendedores"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-swiss-pine text-white hover:bg-brand-pine text-[11px] font-bold tracking-wide transition-colors whitespace-nowrap shadow-sm shrink-0"
            >
              <Briefcase className="w-3 h-3 text-brand-emeraldBright" />
              <span>Para Vendedores</span>
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-1.5 xl:gap-2 shrink-0">
            <a
              href="/docs/Dossier_Comercial_GrupoVolia_SAS.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 xl:py-2 rounded-xl bg-swiss-canvas hover:bg-brand-emeraldSoft border border-slate-200 hover:border-brand-emerald/40 text-xs font-semibold text-slate-700 hover:text-brand-pine transition-all whitespace-nowrap"
              title="Descargar Dossier Comercial PDF"
            >
              <FileDown className="w-3.5 h-3.5 text-brand-emerald" />
              <span className="hidden 2xl:inline">Dossier PDF</span>
            </a>

            <a
              href="https://app.grupovolia.com/app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-xl bg-white hover:bg-swiss-canvas border border-slate-300 hover:border-brand-emerald text-xs font-bold text-swiss-pine transition-all whitespace-nowrap"
              title="Acceso Clientes · Web App Grupo Volia"
            >
              <LogIn className="w-3.5 h-3.5 text-brand-emerald" />
              <span>Acceso Clientes</span>
            </a>

            <button
              type="button"
              onClick={onOpenChat}
              className="inline-flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-xl bg-brand-emeraldSoft hover:bg-brand-emeraldLight border border-brand-emerald/30 text-xs font-bold text-brand-pine transition-all whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-emerald" />
              <span>Anna IA</span>
            </button>

            <Link
              href="/#contacto"
              className="inline-flex items-center gap-1 px-3 py-1.5 xl:py-2 rounded-xl bg-brand-emerald hover:bg-brand-pine text-white font-bold text-xs transition-all shadow-sm whitespace-nowrap"
            >
              <span>Cotizar</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile & Tablet Menu Toggle (shown below xl) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-swiss-canvas border border-slate-200 text-slate-700 hover:text-brand-emerald shrink-0"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 pt-3 border-t border-slate-200 space-y-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-brand-emeraldSoft hover:text-brand-pine transition-colors"
                >
                  <Icon className="w-4 h-4 text-brand-emerald" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <Link
              href="/vendedores"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold bg-swiss-pine text-white hover:bg-brand-pine transition-colors"
            >
              <Briefcase className="w-4 h-4 text-brand-emeraldBright" />
              <span>Para Vendedores · Portal Fuerza Comercial</span>
            </Link>
            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              <a
                href="https://app.grupovolia.com/app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-swiss-pine"
              >
                <LogIn className="w-4 h-4 text-brand-emerald" />
                <span>Acceso Clientes (Web App)</span>
              </a>
              <a
                href="/docs/Dossier_Comercial_GrupoVolia_SAS.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-swiss-canvas border border-slate-200 text-xs font-semibold text-slate-700"
              >
                <FileDown className="w-4 h-4 text-brand-emerald" />
                <span>Descargar Dossier Comercial (PDF)</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenChat();
                }}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-emeraldSoft border border-brand-emerald/30 text-xs font-bold text-brand-pine"
              >
                <Sparkles className="w-4 h-4 text-brand-emerald" />
                <span>Hablar con Anna IA</span>
              </button>
              <Link
                href="/#contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-brand-emerald text-white font-bold text-xs"
              >
                <span>Solicitar Propuesta / Demo</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
