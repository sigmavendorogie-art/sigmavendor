import HeroSection from "@/components/ui/hero-section";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { LeadCaptureForm } from "@/components/marketing/LeadCaptureForm";
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
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Featured and SigmaVerified agencies
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover top-rated agencies that are certified and ready to work
              with you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAgencies.map((agency) => (
              <AgencyCard key={agency.id} agency={agency} />
            ))}
          </div>
        </section>

        <HowItWorks />

        <section id="ai-search" className="py-16 lg:py-24">
          <AgencyAiSearchPanel />
        </section>

        <LeadCaptureForm />

        <VendorFomoCta />

        <SigmaCtaBlock />
      </PageShell>
    </>
  );
}

