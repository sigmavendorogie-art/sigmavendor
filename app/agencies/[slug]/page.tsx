import { notFound } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AgencyStatsBar } from "@/components/agencies/AgencyStatsBar";
import { CertificationBadgesRow } from "@/components/agencies/CertificationBadgesRow";
import { AgencyCard } from "@/components/agencies/AgencyCard";
import { getAgencyBySlug, getAllAgencies } from "@/lib/agencies";
import { JsonLd } from "@/components/ui/json-ld";
import {
  buildMeta,
  buildWebPageJsonLd,
  buildBreadcrumbJsonLd,
  buildAgencyJsonLd,
} from "@/lib/seo";
import { Metadata } from "next";
import { ArrowLeft, ExternalLink, Star, Wallet, CheckCircle2 } from "lucide-react";

type Props = {
  params: { slug: string };
};

const serviceDescriptions: Record<string, string> = {
  "General VA": "General virtual assistant services including administrative tasks, scheduling, and data entry.",
  "Customer Support": "Customer support and service teams for handling inquiries, tickets, and support requests.",
  "Sales / SDR": "Sales development and SDR services including lead generation, outbound, and appointment setting.",
  "E-commerce Support": "E-commerce support including order processing, inventory management, and customer service.",
  "Real Estate VA": "Real estate virtual assistant services including lead generation, CRM management, and transaction support.",
  "Accounting / Bookkeeping": "Accounting and bookkeeping services including financial reporting and reconciliation.",
  "Medical Billing": "Medical billing and coding services for healthcare providers.",
  "Tech Support": "Technical support services for software and technology companies.",
  "Back Office": "Back office operations including data entry, research, and administrative tasks.",
  "Other": "Other specialized services tailored to your needs.",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const agency = getAgencyBySlug(params.slug);
  if (!agency) {
    return buildMeta({ title: "Agency not found" });
  }
  return buildMeta({
    title: `${agency.name} | VA agency profile | SigmaVendor`,
    description: agency.shortDescription,
    path: `/agencies/${agency.slug}`,
  });
}

export default function AgencyDetailPage({ params }: Props) {
  const baseUrl = "https://sigmavendor.com";
  const agency = getAgencyBySlug(params.slug);

  if (!agency) {
    notFound();
  }

  // Find similar agencies (same region or sharing at least one service)
  const allAgencies = getAllAgencies();
  const similarAgencies = allAgencies
    .filter(
      (a) =>
        a.id !== agency.id &&
        (a.regionsServed.some((r) => agency.regionsServed.includes(r)) ||
          a.services.some((s) => agency.services.includes(s)))
    )
    .slice(0, 3);

  const rating =
    agency.reviewSummary?.g2LikeScore ||
    agency.reviewSummary?.clutchLikeScore;

  return (
    <>
      <JsonLd
        data={buildWebPageJsonLd({
          title: `${agency.name} | VA agency profile`,
          description: agency.shortDescription,
          url: `${baseUrl}/agencies/${agency.slug}`,
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", url: baseUrl },
          { name: "Agencies", url: `${baseUrl}/agencies` },
          { name: agency.name, url: `${baseUrl}/agencies/${agency.slug}` },
        ])}
      />
      <JsonLd
        data={buildAgencyJsonLd(
          agency,
          `${baseUrl}/agencies/${agency.slug}`
        )}
      />

      <PageShell>
        <Link
          href="/agencies"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to agencies
        </Link>

        {/* Header */}
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {agency.logoUrl ? (
              <img
                src={agency.logoUrl}
                alt={agency.name}
                className="w-24 h-24 rounded-2xl object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-2xl">
                {agency.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                    {agency.name}
                  </h1>
                  <p className="text-lg text-slate-600 mb-4">{agency.tagline}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span>📍</span>
                  <span>
                    {agency.hqLocation.city
                      ? `${agency.hqLocation.city}, ${agency.hqLocation.country}`
                      : agency.hqLocation.country}
                  </span>
                </div>
                {agency.foundedYear && (
                  <div className="text-sm text-slate-600">
                    Founded {agency.foundedYear}
                  </div>
                )}
                {rating && agency.reviewSummary?.totalReviews && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{rating.toFixed(1)}</span>
                    <span className="text-sm text-slate-600">
                      ({agency.reviewSummary.totalReviews} reviews)
                    </span>
                  </div>
                )}
              </div>
              <CertificationBadgesRow certifications={agency.certifications} />
              {/* Early Adopter Badge - agencies founded in 2024-2025 or joined early */}
              {(agency.foundedYear === 2024 || agency.foundedYear === 2025) && (
                <Badge className="bg-purple-100 text-purple-800 border-purple-200 mt-2 w-fit">
                  <span className="mr-1">✨</span>
                  Early Adopter
                </Badge>
              )}
            </div>
          </div>
        </Card>

        <AgencyStatsBar agency={agency} />

        {/* About */}
        <section className="py-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">About</h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">
              {agency.longDescription}
            </p>
          </div>
        </section>

        {/* Primary Use Cases */}
        {agency.primaryUseCases.length > 0 && (
          <section className="py-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              What they&apos;re great at
            </h2>
            <ul className="space-y-2">
              {agency.primaryUseCases.map((useCase, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">{useCase}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Services */}
        <section className="py-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agency.services.map((service) => (
              <Card key={service} className="p-4">
                <h3 className="font-semibold text-slate-900 mb-2">{service}</h3>
                <p className="text-sm text-slate-600">
                  {serviceDescriptions[service] || "Specialized service."}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* SigmaRemote Integration */}
        <section className="py-8">
          {agency.isSigmaRemotePartner ? (
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Wallet className="h-6 w-6 text-green-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    SigmaRemote Ready
                  </h3>
                  <p className="text-slate-700 mb-4">
                    This agency is already integrated with SigmaRemote for
                    seamless payroll processing.
                  </p>
                  {agency.sigmaRemoteNotes && (
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{agency.sigmaRemoteNotes}</span>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </Card>
          ) : (
            <Card className="bg-slate-50 border-slate-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-200 rounded-lg">
                  <Wallet className="h-6 w-6 text-slate-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Connect this agency to SigmaRemote
                  </h3>
                  <p className="text-slate-700 mb-4">
                    Link this agency to SigmaRemote to enable USD wallets,
                    stablecoin payouts, and seamless global payroll in 180+
                    countries.
                  </p>
                  <a
                    href="https://sigmaremote.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline">Learn about SigmaRemote</Button>
                  </a>
                </div>
              </div>
            </Card>
          )}
        </section>

        {/* CTAs */}
        <section className="py-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {agency.websiteUrl && (
              <a
                href={agency.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button size="lg" variant="outline" className="w-full">
                  Visit website
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </a>
            )}
            <a href="/#get-matched" className="flex-1">
              <Button size="lg" className="w-full">
                Talk to SigmaVendor about matching
              </Button>
            </a>
          </div>
        </section>

        {/* Similar Agencies */}
        {similarAgencies.length > 0 && (
          <section className="py-8 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Similar agencies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarAgencies.map((similarAgency) => (
                <AgencyCard key={similarAgency.id} agency={similarAgency} />
              ))}
            </div>
          </section>
        )}
      </PageShell>
    </>
  );
}

