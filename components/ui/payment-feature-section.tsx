"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

interface PaymentFeatureSectionProps {
  badge?: string;
  heading?: string;
  description?: string;
  bulletPoints?: string[];
  ctaText?: string;
  ctaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
}

const PaymentFeatureSection = ({
  badge = "SigmaRemote Integration",
  heading = "Pay your matched talent instantly with SigmaRemote",
  description = "SigmaVendor connects directly with SigmaRemote so you can pay approved vendors and talent in seconds - in USD or local currency - with fully automated payouts and compliance built in.",
  bulletPoints = [
    "Instant onboarding and fast global payouts",
    "USD, stablecoins, or local currency",
    "Automated invoices and payout tracking",
    "Global compliance handled for you",
  ],
  ctaText = "Learn how payouts work",
  ctaHref = "https://www.sigmaremote.com",
  imageSrc = "/sigmaremote-section/sigma app photo.avif",
  imageAlt = "SigmaRemote app",
}: PaymentFeatureSectionProps) => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto">
        {/* card */}
        <div className="mx-auto max-w-screen-xl rounded-2xl bg-black bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-gradient-3.svg')] bg-center bg-cover border border-purple-500/20 shadow-[0_0_80px_-10px_rgba(120,70,255,0.45)] p-6 lg:p-16 overflow-visible">
          <div className="grid place-items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* text column */}
            <div className="flex flex-col gap-5">
              {badge && (
                <Badge variant="outline" className="w-fit bg-white/10 border-white/20 text-white">
                  {badge}
                </Badge>
              )}
              <h3 className="text-3xl font-semibold lg:text-5xl text-white">
                {heading}
              </h3>
              <p className="text-slate-300 lg:text-lg">
                {description}
              </p>
              <h4 className="text-xl font-semibold text-white mt-2">Benefits</h4>
              <ul className="space-y-4 text-left">
                {bulletPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1 text-slate-400">•</span>
                    <span className="text-slate-300 lg:text-lg">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
              {ctaHref && (
                <Button
                  asChild
                  className="mt-2.5 w-fit gap-2 bg-white text-black hover:bg-white/90 border-2 border-white/50 shadow-lg shadow-purple-500/20"
                  size="lg"
                >
                  <a
                    href={ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {ctaText}
                  </a>
                </Button>
              )}
            </div>

            {/* image column */}
            <div className="relative flex w-full justify-end">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 40 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="relative w-full max-w-[780px]"
              >
                <div
                  className="
                    relative
                    w-full
                    scale-125
                    lg:scale-[1.55]
                    xl:scale-[1.65]
                    lg:ml-12
                    xl:ml-16
                    drop-shadow-2xl
                  "
                >
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={1600}
                    height={1000}
                    className="h-auto w-full rounded-xl"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { PaymentFeatureSection };

