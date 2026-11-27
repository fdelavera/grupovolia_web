"use client";

import { useRef, useState } from "react";
import {
  Play,
  Pause,
  ArrowUpRight,
  FileDown,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { VIDEO_CHAPTERS } from "@/data/inversionData";

export default function VideoTourHero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeChapter =
    VIDEO_CHAPTERS.find(
      (c) => currentTime >= c.startSeconds && currentTime < c.endSeconds
    ) || VIDEO_CHAPTERS[0];

  const handleJumpToChapter = (seconds: number) => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.currentTime = seconds;
    vid.play().catch(() => {});
  };

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  };

  const kpis = [
    {
      label: "PROMOCIÓN INICIAL",
      value: "$5,000 USD",
      sub: "Entrega única íntegra · Ecuador o USA",
    },
    {
      label: "RETORNO FIJO PACTADO",
      value: "+12% Fijo",
      sub: "+$600 ($5,600 total) · Sin depender de ventas",
    },
    {
      label: "PRE-PAGO VIP DESDE MAYO",
      value: "Hasta 28.8%",
      sub: "APR real cobrando los $600 íntegros",
    },
    {
      label: "GARANTÍA MICRO1 (BOA)",
      value: "12x – 25x",
      sub: "$9,075/m prom. verificado vs $466.67 cuota",
    },
  ];

  return (
    <section
      id="video-demo"
      className="relative pt-28 pb-16 sm:pt-32 sm:pb-20 bg-swiss-pine text-white overflow-hidden"
    >
      {/* Subtle architectural background glow */}
      <div className="absolute -top-32 right-0 w-[520px] h-[520px] bg-brand-emerald/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-32 w-[420px] h-[420px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Thesis + Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-swiss-pineMid border border-brand-emerald/50 text-brand-emeraldBright text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>GRUPOVOLIA S.A.S. · RONDA PUENTE COMERCIAL</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-[1.12] text-white">
              Software ERP & IA{" "}
              <span className="text-brand-emeraldBright">100% Construido.</span>{" "}
              Fondo de Promoción Inicial ($5,000).
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              No estás financiando una idea ni desarrollo de software: la plataforma de{" "}
              <strong className="text-white">10 módulos en producción</strong> ya vale{" "}
              <strong className="text-brand-emeraldBright">$55,000–$85,000 USD</strong>{" "}
              en mercado. Este financiamiento puente acelera el lanzamiento comercial de enero
              preservando depósitos a largo plazo y con{" "}
              <strong className="text-white">respaldo directo de ingresos en USA (Micro1)</strong>.
            </p>

            <div className="space-y-2 text-xs sm:text-sm text-slate-200">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-emeraldBright shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Circuito flexible Ecuador o EE.UU.:</strong>{" "}
                  Banco de Guayaquil o Bank of America / Zelle (0% ISD).
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-emeraldBright shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Pre-pago sin castigo desde Mayo:</strong>{" "}
                  Si liquidamos antes de plazo, recibes igual el 100% de los intereses (+$600).
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-brand-emeraldBright shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Cero riesgo técnico:</strong>{" "}
                  Prueba el sistema real en 10 industrias ahora mismo abajo.
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#condiciones"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-emerald hover:bg-brand-emeraldBright hover:text-swiss-pine text-white font-bold text-sm transition-all shadow-lg"
              >
                <span>Ver Condiciones y Pagaré</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="https://demo.grupovolia.com/demo/demo-comercio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all"
              >
                <span>Probar ERP en Vivo</span>
                <ArrowUpRight className="w-4 h-4 text-brand-emeraldBright" />
              </a>

              <a
                href="/docs/Presentacion_Prestamo_Puente_GrupoVolia_2027.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-swiss-pineMid hover:bg-white/10 border border-brand-emerald/40 text-brand-emeraldLight font-semibold text-sm transition-all"
              >
                <FileDown className="w-4 h-4" />
                <span>PDF (11 Láminas)</span>
              </a>
            </div>
          </div>

          {/* Right: 1:39 Official Video + Interactive Chapters */}
          <div className="lg:col-span-7 space-y-3">
            <div className="rounded-3xl bg-swiss-pineMid border border-brand-emerald/40 p-2.5 sm:p-3.5 shadow-2xl">
              <div className="flex items-center justify-between gap-2 px-2 pb-2.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-brand-emeraldBright animate-pulse" />
                  <span className="font-mono font-bold text-brand-emeraldBright uppercase tracking-wider">
                    Pitch Préstamo Puente · 60 FPS (01:46)
                  </span>
                </div>
                <span className="font-mono text-slate-300 text-[11px] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-brand-emeraldBright" />
                  Escena {activeChapter.idx}/{VIDEO_CHAPTERS.length}: {activeChapter.title}
                </span>
              </div>

              <div className="relative rounded-2xl overflow-hidden bg-black aspect-video border border-white/10">
                <video
                  ref={videoRef}
                  src="/assets/video/Video_Inversion_GrupoVolia_Pitch_16x9.mp4"
                  poster="/assets/inversion/inversion_pitch_poster_16x9.jpg"
                  controls
                  playsInline
                  preload="metadata"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Active Chapter Info + Jump Pills */}
              <div className="mt-3 px-1 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="text-slate-200">
                    <strong className="text-brand-emeraldBright">
                      {activeChapter.timeLabel} · {activeChapter.title}:
                    </strong>{" "}
                    {activeChapter.subtitle}
                  </div>
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-brand-emerald/20 hover:bg-brand-emerald/35 border border-brand-emerald/40 text-brand-emeraldLight font-mono font-bold transition-all"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlaying ? "Pausar" : "Reproducir"}</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {VIDEO_CHAPTERS.map((chap) => {
                    const isActive = chap.idx === activeChapter.idx;
                    return (
                      <button
                        key={chap.idx}
                        type="button"
                        onClick={() => handleJumpToChapter(chap.startSeconds)}
                        className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all border ${
                          isActive
                            ? "bg-brand-emerald text-white border-brand-emeraldBright font-bold shadow-sm"
                            : "bg-swiss-pine/80 hover:bg-white/10 text-slate-300 border-white/15"
                        }`}
                      >
                        <span className="font-mono opacity-80 mr-1">{chap.timeLabel}</span>
                        {chap.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 4 KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {kpis.map((kpi, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-swiss-pineMid/90 border border-brand-emerald/35 p-5 shadow-lg"
            >
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand-emeraldBright">
                {kpi.label}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 tabular-nums">
                {kpi.value}
              </div>
              <div className="text-xs text-slate-300 mt-1 leading-snug">{kpi.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
