"use client";

import Image from "next/image";
import { Timeline } from "@/components/ui/timeline";
import { AnimatedHeading } from "@/components/ui/animated-heading";

export function HowItWorks() {
  const timelineData = [
    {
      title: "Step 1",
      content: (
        <div>
          <h4 className="text-white text-xl md:text-2xl font-semibold mb-4 tracking-tight">
            Describe your ideal agency
          </h4>
          <p className="text-slate-300 text-sm md:text-base font-medium mb-8">
            Tell us what services you&apos;re outsourcing - location, skills, pricing, and more. SigmaVendor AI will handle the rest. Examples: Virtual Assistant, LATAM, Crypto-friendly, &lt; $10/hr
          </p>
          <div className="grid grid-cols-1 gap-4">
            <Image
              src="/How it works/image1.jpg"
              alt="Describe your ideal agency"
              width={800}
              height={500}
              className="rounded-lg object-cover h-44 md:h-60 lg:h-80 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Step 2",
      content: (
        <div>
          <h4 className="text-white text-xl md:text-2xl font-semibold mb-4 tracking-tight">
            Get matched - fast and accurately
          </h4>
          <p className="text-slate-300 text-sm md:text-base font-medium mb-8">
            Our AI engine curates your shortlist from certified agencies. Compare reviews, badges, and pricing - all in one place. Look for SigmaVerified badges and 24hr turnaround times.
          </p>
          <div className="grid grid-cols-1 gap-4">
            <Image
              src="/How it works/image2.jpg"
              alt="Get matched"
              width={800}
              height={500}
              className="rounded-lg object-cover h-44 md:h-60 lg:h-80 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Step 3",
      content: (
        <div>
          <h4 className="text-white text-xl md:text-2xl font-semibold mb-4 tracking-tight">
            Hire with confidence
          </h4>
          <p className="text-slate-300 text-sm md:text-base font-medium mb-8">
            Finalize the match, sign contracts. Global payments, done right. Start onboarding your new team today.
          </p>
          <div className="grid grid-cols-1 gap-4">
            <Image
              src="/How it works/image3.jpg"
              alt="Hire with confidence"
              width={800}
              height={500}
              className="rounded-lg object-cover h-44 md:h-60 lg:h-80 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="relative w-screen overflow-hidden bg-black pt-16 lg:pt-24 pb-0 bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-gradient-3.svg')] bg-center bg-cover">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 pb-0">
        <div className="text-center mb-12">
          <AnimatedHeading>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 tracking-tight">
              How it works
            </h2>
          </AnimatedHeading>
          <AnimatedHeading delay={0.2}>
            <p className="text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto font-medium">
              Find and verify VA agencies easily
            </p>
          </AnimatedHeading>
        </div>
      </div>

      <div className="relative z-10 w-full">
        <Timeline data={timelineData} />
      </div>

      {/* Gradient fade overlay for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none z-20" />
    </section>
  );
}

