"use client";

import InversionNavbar from "@/components/inversion/InversionNavbar";
import VideoTourHero from "@/components/inversion/VideoTourHero";
import ProductProofAndValuation from "@/components/inversion/ProductProofAndValuation";
import LoanTermsAndNote from "@/components/inversion/LoanTermsAndNote";
import BackingAndMarketingPlan from "@/components/inversion/BackingAndMarketingPlan";
import InvestorPerksAndFaq from "@/components/inversion/InvestorPerksAndFaq";

export default function InversionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-swiss-pine">
      <InversionNavbar />
      <main className="flex-1">
        <VideoTourHero />
        <ProductProofAndValuation />
        <LoanTermsAndNote />
        <BackingAndMarketingPlan />
        <InvestorPerksAndFaq />
      </main>
      <footer className="bg-swiss-pine text-slate-300 py-8 border-t border-white/10 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <strong className="text-white">GRUPOVOLIA S.A.S.</strong> · RUC 0993410068001 ·
            Presentación Ejecutiva Privada · Ecuador &amp; EE.UU.
          </div>
          <div className="font-mono text-slate-400">
            Francisco de la Vera · info@grupovolia.com · +593 98 337 4133
          </div>
        </div>
      </footer>
    </div>
  );
}
