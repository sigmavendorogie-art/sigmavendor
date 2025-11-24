"use client";

import { DestinationCard } from "@/components/ui/destination-card";

export function VendorFomoCta() {
  const handleGetStarted = () => {
    window.location.href = "/certification";
  };

  return (
    <div className="h-[500px]">
      <DestinationCard
        imageUrl="/section above footer/not-listed-yet.jpg"
        title="Not listed yet?"
        description="Join SigmaVendor to get discovered by real buyers. Only certified agencies are accepted."
        buttonText="Apply for Certification"
        onButtonClick={handleGetStarted}
        showLikeButton={false}
        className="border-white/20"
      />
    </div>
  );
}

