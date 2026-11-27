"use client";

import { useState } from "react";
import {
  Gift,
  Landmark,
  ChevronDown,
  Send,
  Loader2,
  CheckCircle2,
  MessageCircle,
  FileDown,
  ArrowUpRight,
  Scale,
} from "lucide-react";
import { INVESTOR_PERKS, INVESTMENT_FAQS } from "@/data/inversionData";

export default function InvestorPerksAndFaq() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [circuitField, setCircuitField] = useState(
    "EE.UU. (Bank of America / Zelle · 0% ISD)"
  );
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const whatsappText = encodeURIComponent(
    `Hola Francisco, revisé la presentación y el modelo de pagaré de Grupo Volia (/inversion). Me gustaría conversar sobre la propuesta vía ${circuitField}.`
  );
  const whatsappUrl = `https://wa.me/593983374133?text=${whatsappText}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company: "Círculo Privado / Inversión en Promoción ($5k)",
          email,
          phone,
          packageInterest: "Inversión en Promoción de Lanzamiento Grupo Volia ($5,000 USD)",
          modality: circuitField,
          message:
            notes.trim() ||
            `Interés enviado desde www.grupovolia.com/inversion (circuito preferido: ${circuitField}).`,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setName("");
        setEmail("");
        setPhone("");
        setNotes("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="circuitos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Perks Exclusivos Círculo Fundador */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-emeraldSoft border border-brand-emerald/30 text-brand-pine text-xs font-mono font-bold mb-3">
              <Gift className="w-3.5 h-3.5 text-brand-emerald" />
              <span>VENTAJAS ADICIONALES PARA AMIGOS &amp; FAMILIA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-swiss-pine tracking-tight">
              Más allá del +12% Fijo:{" "}
              <span className="text-brand-emerald">Beneficios del Círculo Fundador</span>
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Queremos que ayudar a despegar Grupo Volia sea un excelente negocio para quienes confían
              desde el arranque.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INVESTOR_PERKS.map((perk) => (
              <div
                key={perk.title}
                className="swiss-card swiss-card-hover rounded-3xl p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <span className="inline-block text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-brand-emeraldSoft text-brand-pine border border-brand-emerald/30">
                    {perk.badge}
                  </span>
                  <h3 className="text-base font-extrabold text-swiss-pine leading-snug">
                    {perk.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {perk.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-200 text-xs font-bold text-brand-emerald">
                  ★ {perk.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Two Banking Circuits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-brand-emeraldSoft border-2 border-brand-emerald p-6 sm:p-7 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold uppercase text-brand-pine flex items-center gap-1.5">
                <Landmark className="w-4 h-4 text-brand-emerald" />
                Opción A · Circuito EE.UU. (Recomendado 0% ISD)
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-brand-emerald text-white text-[10px] font-mono font-bold">
                SIN IMPUESTOS DE SALIDA
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-swiss-pine">
              Bank of America / Zelle EE.UU.
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Si tu liquidez está en EE.UU., se recibe directo vía{" "}
              <strong>Zelle (+1 407-205-5921)</strong> o{" "}
              <strong>Bank of America Checking (#898145828511)</strong>. Las pautas de Meta/Google
              se pagan en USD directo desde EE.UU. sin pagar 5% ISD ecuatoriano, y tus cuotas o
              pre-pago regresan dentro de EE.UU. con $0 comisiones.
            </p>
          </div>

          <div className="swiss-card rounded-3xl p-6 sm:p-7 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono font-bold uppercase text-slate-500 flex items-center gap-1.5">
                <Landmark className="w-4 h-4 text-swiss-pine" />
                Opción B · Circuito Local Ecuador
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-swiss-pine text-[10px] font-mono font-bold">
                BANCO DE GUAYAQUIL
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-swiss-pine">
              Banco de Guayaquil Cta. Cte. #19156303 (GRUPOVOLIA S.A.S.)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Si tu dinero está en Ecuador, se deposita directo en la cuenta corriente empresarial de{" "}
              <strong>GRUPOVOLIA S.A.S. (RUC 0993410068001)</strong>. El capital permanece en el país,
              el 5% ISD aplicable únicamente a pagos de publicidad exterior se cubre con la reserva de
              pauta, y todas tus cuotas o pre-pago se acreditan localmente dentro de Ecuador.
            </p>
          </div>
        </div>

        {/* FAQ + Direct Confirmation Form */}
        <div id="confirmar" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start pt-4">
          {/* FAQ Accordion */}
          <div className="lg:col-span-6 space-y-3">
            <h3 className="text-2xl font-extrabold text-swiss-pine mb-4">
              Preguntas Clave Antes de Decidir
            </h3>
            {INVESTMENT_FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-slate-200 bg-swiss-canvas overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-3 p-4 text-left font-bold text-xs sm:text-sm text-swiss-pine hover:bg-white transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-brand-emerald shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/70 pt-3 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="pt-3 flex flex-wrap gap-2.5">
              <a
                href="/docs/Presentacion_Prestamo_Puente_GrupoVolia_2027.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-swiss-pine hover:bg-brand-pine text-white text-xs font-bold transition-all"
              >
                <FileDown className="w-4 h-4 text-brand-emeraldBright" />
                <span>Presentación (PDF)</span>
              </a>
              <a
                href="/docs/Modelo_Pagare_Internacional_GrupoVolia_2027.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-emerald hover:bg-brand-pine text-white text-xs font-bold transition-all"
              >
                <Scale className="w-4 h-4" />
                <span>Modelo de Pagaré (PDF)</span>
              </a>
              <a
                href="https://app.grupovolia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 hover:border-brand-emerald text-xs font-bold text-swiss-pine transition-all"
              >
                <span>Ver app.grupovolia.com</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-brand-emerald" />
              </a>
            </div>
          </div>

          {/* Direct Action Box */}
          <div className="lg:col-span-6 swiss-card rounded-3xl p-6 sm:p-8 space-y-5 border-2 border-brand-emerald/35">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase text-brand-emerald">
                PASO SIGUIENTE DIRECTO CON FRANCISCO
              </span>
              <h3 className="text-2xl font-extrabold text-swiss-pine mt-1">
                ¿Conversamos los detalles o revisamos condiciones?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Escríbeme directo por WhatsApp para revisar dudas o cualquier planteamiento, o
                déjame tus datos y preparamos el pagaré personalizado para firma digital.
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-brand-emerald hover:bg-brand-pine text-white font-bold text-sm transition-all shadow-md"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Escribir a Francisco por WhatsApp (+593 98 337 4133)</span>
            </a>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200" />
              <span className="flex-shrink mx-3 text-[11px] font-mono text-slate-400 uppercase">
                O envía tu confirmación por aquí
              </span>
              <div className="flex-grow border-t border-slate-200" />
            </div>

            {status === "success" ? (
              <div className="p-5 rounded-2xl bg-brand-emeraldSoft border border-brand-emerald text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-brand-emerald mx-auto" />
                <div className="text-base font-extrabold text-swiss-pine">
                  ¡Confirmación recibida!
                </div>
                <p className="text-xs text-slate-600">
                  Francisco recibió tu mensaje por correo y te contactará hoy mismo.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-slate-500 uppercase mb-1">
                      Tu Nombre *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. Sofía Mendoza / Carlos Paredes"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-emerald"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-slate-500 uppercase mb-1">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@correo.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-emerald"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-slate-500 uppercase mb-1">
                      Circuito Bancario
                    </label>
                    <select
                      value={circuitField}
                      onChange={(e) => setCircuitField(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-emerald bg-white"
                    >
                      <option value="EE.UU. (Bank of America / Zelle · 0% ISD)">
                        EE.UU. (BoA / Zelle · 0% ISD)
                      </option>
                      <option value="Ecuador (Banco de Guayaquil Cta. Cte. #19156303)">
                        Ecuador (Banco de Guayaquil)
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-slate-500 uppercase mb-1">
                      WhatsApp / Teléfono (Opcional)
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+593 / +1 ..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-emerald"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-500 uppercase mb-1">
                    Comentarios, Dudas o Fecha Sugerida para Conversar
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ej. Revisé el video y el modelo de pagaré; me gustaría conversar condiciones esta semana..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-emerald"
                  />
                </div>

                {status === "error" && (
                  <p className="text-xs text-red-600 font-semibold">
                    No pudimos enviar el correo automático; por favor usa el botón verde de WhatsApp arriba.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-swiss-pine hover:bg-brand-pine text-white font-bold text-xs sm:text-sm transition-all disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-brand-emeraldBright" />
                      <span>Enviar Mensaje de Interés por Email</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
