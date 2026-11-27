"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, Bot, User, Loader2, GripHorizontal } from "lucide-react";

interface GrupoVoliaChatModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function GrupoVoliaChatModal({
  isOpen,
  onOpenChange,
}: GrupoVoliaChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "¡Hola! Soy Anna, asesora ejecutiva de Grupo Volia. Puedo ayudarte a elegir entre nuestra Suite Completa PYME ($69/mes + IVA con 10 módulos e ilimitados usuarios/RRHH), la Suite Corporativa Multisucursal ($119/mes + IVA) o nuestra nueva Consola Multi-Empresa para Contadores (contadores.grupovolia.com desde $69/mes hasta 15 RUCs). ¿A qué se dedica tu empresa o estudio?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  const [chatPos, setChatPos] = useState({ x: 0, y: 0 });

  // Button drag tracking (identical to Volia Fitness FloatingChat.tsx)
  const isBtnDragging = useRef(false);
  const btnDragStart = useRef({ x: 0, y: 0 });
  const hasBtnDragged = useRef(false);

  const handleBtnPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    isBtnDragging.current = true;
    hasBtnDragged.current = false;
    btnDragStart.current = { x: e.clientX - btnPos.x, y: e.clientY - btnPos.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleBtnPointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (isBtnDragging.current) {
      let newX = e.clientX - btnDragStart.current.x;
      let newY = e.clientY - btnDragStart.current.y;

      const btnWidth = btnRef.current?.offsetWidth || 210;
      const btnHeight = btnRef.current?.offsetHeight || 48;
      const minPosX = -16;
      const maxPosX = Math.max(0, window.innerWidth - btnWidth - 32);
      const maxPosY = 16;
      const minPosY = -Math.max(0, window.innerHeight - btnHeight - 32);

      newX = Math.max(minPosX, Math.min(newX, maxPosX));
      newY = Math.max(minPosY, Math.min(newY, maxPosY));

      if (Math.abs(newX - btnPos.x) > 5 || Math.abs(newY - btnPos.y) > 5) {
        hasBtnDragged.current = true;
      }
      setBtnPos({ x: newX, y: newY });
    }
  };

  const handleBtnPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    isBtnDragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
    if (!hasBtnDragged.current) {
      onOpenChange(!isOpen);
    }
  };

  // Chat window drag tracking (identical to Volia Fitness FloatingChat.tsx)
  const isChatDragging = useRef(false);
  const chatDragStart = useRef({ x: 0, y: 0 });

  const handleChatPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isChatDragging.current = true;
    chatDragStart.current = { x: e.clientX - chatPos.x, y: e.clientY - chatPos.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleChatPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isChatDragging.current && chatRef.current) {
      let newX = e.clientX - chatDragStart.current.x;
      let newY = e.clientY - chatDragStart.current.y;

      const rect = chatRef.current.getBoundingClientRect();
      const minPosX = -16;
      const maxPosX = Math.max(0, window.innerWidth - rect.width - 32);
      const maxPosY = 16;
      const minPosY = -Math.max(0, window.innerHeight - rect.height - 32);

      newX = Math.max(minPosX, Math.min(newX, maxPosX));
      newY = Math.max(minPosY, Math.min(newY, maxPosY));

      setChatPos({ x: newX, y: newY });
    }
  };

  const handleChatPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isChatDragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const suggestedQuestions = [
    "¿Cómo funciona el módulo de Inventario y la conexión con POS en Ecuador?",
    "¿Qué hace el Copiloto IA Interno para mis empleados y gerencia?",
    "¿Cómo funciona la personalización en 1 mes y las 3 revisiones?",
    "¿Qué incluye la Suite Completa PYME ($69/mes + IVA) vs. Corporativa Multisucursal ($119/mes + IVA)?",
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: textToSend };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();
      if (res.ok && data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Puedo enviarte la cotización directa en la sección de Contacto/Calendario o vía ventas@grupovolia.com e info@grupovolia.com.",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error de conexión temporal. Por favor intenta de nuevo.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Draggable Floating Action Button (Bottom-Left) */}
      {!isOpen && (
        <div
          className="fixed bottom-5 left-5 z-50 flex flex-col items-start"
          style={{ transform: `translate(${btnPos.x}px, ${btnPos.y}px)`, touchAction: "none" }}
        >
          <button
            ref={btnRef}
            type="button"
            onPointerDown={handleBtnPointerDown}
            onPointerMove={handleBtnPointerMove}
            onPointerUp={handleBtnPointerUp}
            style={{ touchAction: "none" }}
            title="Arrastra para mover o toca para hablar con Anna"
            className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-swiss-pine hover:bg-brand-pine border border-brand-emerald/40 text-white shadow-swiss-lg transition-shadow cursor-move select-none"
          >
            <div className="w-6 h-6 rounded-full bg-white p-0.5 flex items-center justify-center shrink-0 pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/branding/logo_grupovolia_isotipo_clean.png"
                alt="Grupo Volia"
                className="w-full h-full object-contain"
              />
            </div>
            <Sparkles className="w-3.5 h-3.5 text-brand-emeraldBright animate-pulse pointer-events-none" />
            <span className="text-xs font-bold tracking-wide pointer-events-none">
              Hablar con Anna IA
            </span>
            <span className="w-2 h-2 rounded-full bg-brand-emeraldBright animate-ping pointer-events-none" />
            <GripHorizontal className="w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </button>
        </div>
      )}

      {/* Draggable Chat Window (Bottom-Left Default, Movable Anywhere) */}
      {isOpen && (
        <div
          className="fixed bottom-5 left-5 z-50 flex flex-col items-start"
          style={{ transform: `translate(${chatPos.x}px, ${chatPos.y}px)`, touchAction: "none" }}
        >
          <div
            ref={chatRef}
            className="w-[94vw] sm:w-[440px] max-w-lg h-[78vh] sm:h-[600px] max-h-[82vh] flex flex-col bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Draggable Header */}
            <div
              onPointerDown={handleChatPointerDown}
              onPointerMove={handleChatPointerMove}
              onPointerUp={handleChatPointerUp}
              style={{ touchAction: "none" }}
              className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-swiss-canvas cursor-move select-none"
              title="Mantén presionado para mover esta ventana"
            >
              <div className="flex items-center gap-3 pointer-events-none">
                <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-slate-200 bg-white p-1 flex items-center justify-center shrink-0 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/branding/logo_grupovolia_isotipo_clean.png"
                    alt="Grupo Volia"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-swiss-pine flex items-center gap-2">
                    <span>Anna</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand-emeraldSoft text-brand-emerald border border-brand-emerald/30">
                      Grupo Volia AI
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Asesora B2B · ERP/SRI, Inventarios & Cotizador
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <GripHorizontal className="w-4 h-4 text-slate-400 pointer-events-none mr-1" />
                <button
                  type="button"
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenChange(false);
                    setChatPos({ x: 0, y: 0 });
                  }}
                  className="p-2 rounded-xl text-slate-400 hover:text-swiss-pine hover:bg-slate-200/60 transition-colors relative z-50"
                  aria-label="Cerrar chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-white">
              {messages.map((msg, idx) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-2.5 ${
                      isUser ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border ${
                        isUser
                          ? "bg-swiss-pine text-white border-swiss-pine"
                          : "bg-brand-emeraldSoft text-brand-emerald border-brand-emerald/30"
                      }`}
                    >
                      {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>
                    <div
                      className={`max-w-[84%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                        isUser
                          ? "bg-brand-emerald text-white font-medium rounded-tr-none shadow-sm"
                          : "bg-swiss-canvas text-swiss-pine border border-slate-200 rounded-tl-none"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-brand-emeraldSoft text-brand-emerald border border-brand-emerald/30 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-swiss-canvas border border-slate-200 rounded-2xl rounded-tl-none px-3.5 py-2.5 text-xs text-slate-500 flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-emerald" />
                    <span>Anna está analizando tu consulta...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts */}
            {messages.length <= 2 && (
              <div className="px-4 py-2.5 border-t border-slate-200 bg-swiss-canvas">
                <p className="text-[10px] font-mono font-bold text-slate-500 uppercase mb-1.5">
                  Consultas rápidas con Anna:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSend(q)}
                      className="text-[11px] text-swiss-pine hover:text-brand-emerald bg-white hover:bg-brand-emeraldSoft border border-slate-200 rounded-lg px-2.5 py-1 text-left transition-colors font-medium"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-3.5 border-t border-slate-200 bg-swiss-canvas">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pregúntale a Anna sobre módulos, inventario o precios..."
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-swiss-pine placeholder-slate-400 focus:outline-none focus:border-brand-emerald"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="p-2.5 rounded-xl bg-brand-emerald text-white hover:bg-brand-pine disabled:opacity-40 transition-all"
                  aria-label="Enviar"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
