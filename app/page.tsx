import HeroSection from "@/components/ui/hero-section";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { ContactSection } from "@/components/ui/contact";
import { SigmaCtaBlock } from "@/components/marketing/SigmaCtaBlock";
import { VendorFomoCta } from "@/components/marketing/VendorFomoCta";
import { AgencyCard } from "@/components/agencies/AgencyCard";
import { AgencyAiSearchPanel } from "@/components/ai/AgencyAiSearchPanel";
import { PageShell } from "@/components/layout/PageShell";
import { getAllAgencies } from "@/lib/agencies";
import { JsonLd } from "@/components/ui/json-ld";
import {
  buildWebPageJsonLd,
  buildBreadcrumbJsonLd,
} from "@/lib/seo";
import { Typewriter } from "@/components/ui/typewriter-text";
import { Button } from "@/components/ui/button";
import { AnimatedHeading } from "@/components/ui/animated-heading";
import Link from "next/link";

export default function HomePage() {
  const baseUrl = "https://sigmavendor.com";
  
  // Get featured agencies (prioritize SigmaRemote partners and certified agencies)
  const allAgencies = getAllAgencies();
  const featuredAgencies = allAgencies
    .filter(
      (agency) =>
        agency.isSigmaRemotePartner ||
        agency.certifications.includes("SigmaVerified") ||
        agency.certifications.includes("PayrollReady")
    )
    .slice(0, 6);
  
  const firstThreeAgencies = featuredAgencies.slice(0, 3);
  const lastThreeAgencies = featuredAgencies.slice(3, 6);

  return (
    <>
      <JsonLd
        data={buildWebPageJsonLd({
          title: "SigmaVendor | AI-Ready VA Agency Directory",
          description:
            "Find and certify the right virtual assistant and outsourcing agencies. Integrated with SigmaRemote for global payroll.",
          url: baseUrl,
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([{ name: "Home", url: baseUrl }])}
      />

      <div className="relative min-h-screen -mt-20">
        <HeroSection />
      </div>

      <PageShell>

        <section className="py-16 lg:py-24 space-y-10">
          <div className="text-center">
            <AnimatedHeading>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                <Typewriter
                  text={["Featured and SigmaVerified agencies", "Top-rated certified agencies", "AI-ready VA agencies"]}
                  speed={100}
                  loop={true}
                />
              </h2>
            </AnimatedHeading>
            <AnimatedHeading delay={0.2}>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Discover top-rated agencies that are certified and ready to work
                with you
              </p>
            </AnimatedHeading>
          </div>

          {/* First 3 companies */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {firstThreeAgencies.map((agency) => (
              <AgencyCard key={agency.id} agency={agency} />
            ))}
          </div>

          {/* AI Section */}
          <section id="ai-search" className="py-8">
            <AgencyAiSearchPanel />
          </section>

          {/* Last 3 companies */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lastThreeAgencies.map((agency) => (
              <AgencyCard key={agency.id} agency={agency} />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center pt-6">
            <Link href="/agencies">
              <Button size="lg" variant="outline">
                View all featured companies
              </Button>
            </Link>
          </div>
        </section>
      </PageShell>

      <HowItWorks />
      <ContactSection />

      <PageShell>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto py-20">
          <VendorFomoCta />
          <SigmaCtaBlock />
        </div>
      </PageShell>
    </>
  );
}

