"use client";

import { DestinationCard } from "@/components/ui/destination-card";

export function SigmaCtaBlock() {
  const handleGetStarted = () => {
    window.open("https://sigmaremote.com", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="h-[500px]">
      <DestinationCard
        imageUrl="/section above footer/working-with-a-team.jpg"
        title="Already working with a team?"
        description="Run global payroll via SigmaRemote. 180+ countries. USD wallets & stablecoins."
        buttonText="Talk to SigmaRemote"
        onButtonClick={handleGetStarted}
        showLikeButton={false}
        className="border-white/20"
      />
    </div>
  );
}

