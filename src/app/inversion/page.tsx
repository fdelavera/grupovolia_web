"use client";

import { useState } from "react";
import InversionNavbar from "@/components/inversion/InversionNavbar";
import VideoTourHero from "@/components/inversion/VideoTourHero";
import ProductProofAndValuation from "@/components/inversion/ProductProofAndValuation";
import InteractiveLoanSimulator from "@/components/inversion/InteractiveLoanSimulator";
import BackingAndMarketingPlan from "@/components/inversion/BackingAndMarketingPlan";
import InvestorPerksAndFaq from "@/components/inversion/InvestorPerksAndFaq";

export default function InversionPage() {
  const [selectedAmount, setSelectedAmount] = useState<number>(5000);
  const [selectedCircuit, setSelectedCircuit] = useState<"usa" | "ecuador">("usa");
  const [selectedHorizonLabel, setSelectedHorizonLabel] = useState<string>(
    "Pre-Pago Mayo (~5m)"
  );

  const handleConfirmSelection = (
    amount: number,
    circuit: "usa" | "ecuador",
    horizonLabel: string
  ) => {
    setSelectedAmount(amount);
    setSelectedCircuit(circuit);
    setSelectedHorizonLabel(horizonLabel);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-swiss-pine">
      <InversionNavbar />
      <main className="flex-1">
        <VideoTourHero />
        <ProductProofAndValuation />
        <InteractiveLoanSimulator onConfirmSelection={handleConfirmSelection} />
        <BackingAndMarketingPlan />
        <InvestorPerksAndFaq
          selectedAmount={selectedAmount}
          selectedCircuit={selectedCircuit}
          selectedHorizonLabel={selectedHorizonLabel}
        />
      </main>
      <footer className="bg-swiss-pine text-slate-300 py-8 border-t border-white/10 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <strong className="text-white">GRUPOVOLIA S.A.S.</strong> · RUC 0993410068001 ·
            Presentación Ejecutiva Privada · Ecuador & EE.UU.
          </div>
          <div className="font-mono text-slate-400">
            Francisco de la Vera · info@grupovolia.com · +593 98 337 4133
          </div>
        </div>
      </footer>
    </div>
  );
}
