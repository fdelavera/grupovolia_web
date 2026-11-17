"use client";

import { useState } from "react";
import Navbar from "@/components/navigation/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import DualAgentSection from "@/components/sections/DualAgentSection";
import BusinessLinesSection from "@/components/sections/BusinessLinesSection";
import QuantAlgorithmsSection from "@/components/sections/QuantAlgorithmsSection";
import PricingCalculatorSection from "@/components/sections/PricingCalculatorSection";
import FounderCredentialsSection from "@/components/sections/FounderCredentialsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/navigation/Footer";
import GrupoVoliaChatModal from "@/components/chat/GrupoVoliaChatModal";

export default function HomePage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(undefined);
  const [selectedModality, setSelectedModality] = useState<string | undefined>(undefined);

  const handleSelectPlan = (planName: string, modality: string) => {
    setSelectedPackage(planName);
    setSelectedModality(modality);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-swiss-pine">
      <Navbar onOpenChat={() => setChatOpen(true)} />
      <main className="flex-1">
        <HeroSection onOpenChat={() => setChatOpen(true)} />
        <DualAgentSection />
        <BusinessLinesSection />
        <QuantAlgorithmsSection />
        <PricingCalculatorSection onSelectPlan={handleSelectPlan} />
        <FounderCredentialsSection />
        <ContactSection
          preselectedPackage={selectedPackage}
          preselectedModality={selectedModality}
        />
      </main>
      <Footer />
      <GrupoVoliaChatModal isOpen={chatOpen} onOpenChange={setChatOpen} />
    </div>
  );
}
