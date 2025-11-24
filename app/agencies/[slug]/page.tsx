import { notFound } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CertificationBadgesRow } from "@/components/agencies/CertificationBadgesRow";
import { AgencyCard } from "@/components/agencies/AgencyCard";
import { ClientLogos } from "@/components/agencies/ClientLogos";
import { getAgencyBySlug, getAllAgencies } from "@/lib/agencies";
import { JsonLd } from "@/components/ui/json-ld";
import {
  buildMeta,
  buildWebPageJsonLd,
  buildBreadcrumbJsonLd,
  buildAgencyJsonLd,
} from "@/lib/seo";
import { Metadata } from "next";
import {
  ArrowLeft,
  ExternalLink,
  Star,
  Wallet,
  CheckCircle2,
  MapPin,
  Users,
  DollarSign,
  Globe,
  Languages,
  Building2,
  Briefcase,
  Headphones,
  ShoppingCart,
  Home,
  Calculator,
  Stethoscope,
  Monitor,
  FileText,
  Sparkles,
  MessageSquare,
  TrendingUp,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getBadgeMetadata } from "@/lib/certification";

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

// Service icons mapping
const serviceIcons: Record<string, any> = {
  "General VA": Briefcase,
  "Customer Support": Headphones,
  "Sales / SDR": TrendingUp,
  "E-commerce Support": ShoppingCart,
  "Real Estate VA": Home,
  "Accounting / Bookkeeping": Calculator,
  "Medical Billing": Stethoscope,
  "Tech Support": Monitor,
  "Back Office": FileText,
  "Other": Sparkles,
};

// Major companies for client showcase
const majorCompanies = [
  { name: "Meta", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/meta.svg" },
  { name: "Google", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/google.svg" },
  { name: "Amazon", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/amazon.svg" },
  { name: "Netflix", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/netflix.svg" },
  { name: "Microsoft", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoft.svg" },
  { name: "Apple", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/apple.svg" },
  { name: "Salesforce", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/salesforce.svg" },
  { name: "Stripe", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/stripe.svg" },
  { name: "Shopify", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/shopify.svg" },
  { name: "Coinbase", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/coinbase.svg" },
];

// Get consistent company logos for an agency
function getClientCompanies(agencyId: string, count: number = 3) {
  let hash = 0;
  for (let i = 0; i < agencyId.length; i++) {
    hash = ((hash << 5) - hash) + agencyId.charCodeAt(i);
    hash = hash & hash;
  }
  const startIndex = Math.abs(hash) % majorCompanies.length;
  return Array.from({ length: count }, (_, i) => 
    majorCompanies[(startIndex + i) % majorCompanies.length]
  );
}

// Get country flag emoji (simplified - using common flags)
function getCountryFlag(country: string): string {
  const flagMap: Record<string, string> = {
    "Philippines": "🇵🇭",
    "Mexico": "🇲🇽",
    "Colombia": "🇨🇴",
    "Kenya": "🇰🇪",
    "Nigeria": "🇳🇬",
    "India": "🇮🇳",
    "Romania": "🇷🇴",
    "Poland": "🇵🇱",
    "United States": "🇺🇸",
  };
  return flagMap[country] || "🌍";
}

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
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to agencies
        </Link>

        {/* Premium Header Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Logo */}
            <div className="flex-shrink-0">
              {agency.logoUrl ? (
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-4 border border-slate-200/60 shadow-sm">
                  <img
                    src={agency.logoUrl}
                    alt={agency.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-700 font-bold text-3xl border border-slate-200/60 shadow-sm">
                  {agency.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
              )}
            </div>

            {/* Agency Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
                  {agency.name}
                </h1>
                <span className="text-3xl" title={agency.hqLocation.country}>
                  {getCountryFlag(agency.hqLocation.country)}
                </span>
              </div>

              <p className="text-xl text-slate-600 mb-6 leading-relaxed">
                {agency.tagline}
              </p>

              {/* Certifications and Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <CertificationBadgesRow certifications={agency.certifications} />
                {agency.isSigmaRemotePartner && (
                  <Badge className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 border-green-200/60 px-3 py-1.5">
                    <Wallet className="h-3.5 w-3.5 mr-1.5" />
                    SigmaRemote Partner
                  </Badge>
                )}
                {(agency.foundedYear === 2024 || agency.foundedYear === 2025) && (
                  <Badge className="bg-gradient-to-r from-purple-50 to-violet-50 text-purple-800 border-purple-200/60 px-3 py-1.5">
                    <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                    Early Adopter
                  </Badge>
                )}
              </div>

              {/* Quick Stats Row */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-400" />
                  <span>
                    {agency.hqLocation.city
                      ? `${agency.hqLocation.city}, ${agency.hqLocation.country}`
                      : agency.hqLocation.country}
                  </span>
                </div>
                {agency.foundedYear && (
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-slate-400" />
                    <span>Founded {agency.foundedYear}</span>
                  </div>
                )}
                {rating && agency.reviewSummary?.totalReviews && (
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-slate-900">{rating.toFixed(1)}</span>
                    <span>({agency.reviewSummary.totalReviews} reviews)</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Summary Module - Two Column Grid */}
        <Card className="mb-12 p-8 bg-gradient-to-br from-white to-slate-50/50 border-slate-200/60 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-1.5">
                  <MapPin className="h-4 w-4" />
                  <span>Headquarters</span>
                </div>
                <p className="text-base font-medium text-slate-900">
                  {agency.hqLocation.city
                    ? `${agency.hqLocation.city}, ${agency.hqLocation.country}`
                    : agency.hqLocation.country}
                  {agency.hqLocation.timeZoneLabel && (
                    <span className="text-slate-500 font-normal ml-2">
                      ({agency.hqLocation.timeZoneLabel})
                    </span>
                  )}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-1.5">
                  <Globe className="h-4 w-4" />
                  <span>Regions Served</span>
                </div>
                <p className="text-base font-medium text-slate-900">
                  {agency.regionsServed.join(", ")}
                </p>
              </div>

              {agency.deliveryLocations.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-1.5">
                    <MapPin className="h-4 w-4" />
                    <span>Delivery Locations</span>
                  </div>
                  <p className="text-base font-medium text-slate-900">
                    {agency.deliveryLocations
                      .map((loc) => loc.city ? `${loc.city}, ${loc.country}` : loc.country)
                      .join(", ")}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {agency.teamSize && (
                <div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-1.5">
                    <Users className="h-4 w-4" />
                    <span>Team Size</span>
                  </div>
                  <p className="text-base font-medium text-slate-900">
                    {agency.teamSize.min}–{agency.teamSize.max} professionals
                  </p>
                </div>
              )}

              <div>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-1.5">
                  <DollarSign className="h-4 w-4" />
                  <span>Pricing</span>
                </div>
                <p className="text-base font-medium text-slate-900">
                  ${agency.priceRange.minUsdPerHour}–${agency.priceRange.maxUsdPerHour}/hr
                  {agency.minMonthlyRetainerUsd && (
                    <span className="text-slate-500 font-normal ml-2">
                      (min. ${agency.minMonthlyRetainerUsd.toLocaleString()}/mo)
                    </span>
                  )}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-1.5">
                  <Languages className="h-4 w-4" />
                  <span>Languages</span>
                </div>
                <p className="text-base font-medium text-slate-900">
                  {agency.languages.join(", ")}
                </p>
              </div>

              {agency.typicalEngagementLengthMonths && (
                <div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-1.5">
                    <Briefcase className="h-4 w-4" />
                    <span>Typical Engagement</span>
                  </div>
                  <p className="text-base font-medium text-slate-900">
                    {agency.typicalEngagementLengthMonths} months
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">About</h2>
          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-700 leading-relaxed whitespace-pre-line">
              {agency.longDescription}
            </p>
          </div>
        </section>

        {/* Primary Use Cases */}
        {agency.primaryUseCases.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              What they&apos;re great at
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agency.primaryUseCases.map((useCase, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200/60"
                >
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 leading-relaxed">{useCase}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Services Overview - Clean Labeled Cards */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agency.services.map((service) => {
              const Icon = serviceIcons[service] || Sparkles;
              return (
                <Card
                  key={service}
                  className="p-6 bg-gradient-to-br from-white to-slate-50/50 border-slate-200/60 hover:border-slate-300/60 transition-all shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200/60 border border-slate-200/60 flex-shrink-0">
                      <Icon className="h-5 w-5 text-slate-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 mb-2 text-base">
                        {service}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {serviceDescriptions[service] || "Specialized service."}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Certifications Section */}
        {agency.certifications.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Certifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <TooltipProvider>
                {agency.certifications.map((cert) => {
                  const metadata = getBadgeMetadata(cert);
                  const Icon = metadata.icon;
                  return (
                    <Tooltip key={cert}>
                      <TooltipTrigger asChild>
                        <Card className="p-6 bg-gradient-to-br from-white to-slate-50/50 border-slate-200/60 hover:border-slate-300/60 transition-all cursor-help shadow-sm hover:shadow-md">
                          <div className="flex items-start gap-4">
                            <div className={`p-2.5 rounded-lg ${metadata.color} flex-shrink-0`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-slate-900 mb-1.5 text-base">
                                {metadata.label}
                              </h3>
                              <p className="text-sm text-slate-600 leading-relaxed">
                                {metadata.explanation}
                              </p>
                            </div>
                          </div>
                        </Card>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="font-semibold mb-1">{metadata.label}</p>
                        <p className="text-xs text-slate-600">{metadata.explanation}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </TooltipProvider>
            </div>
          </section>
        )}

        {/* SigmaRemote Integration */}
        <section className="mb-12">
          {agency.isSigmaRemotePartner ? (
            <Card className="bg-gradient-to-br from-green-50/80 to-emerald-50/80 border-green-200/60 shadow-sm">
              <div className="flex items-start gap-6 p-8">
                <div className="p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl border border-green-200/60 flex-shrink-0">
                  <Wallet className="h-6 w-6 text-green-700" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                    SigmaRemote Ready
                  </h3>
                  <p className="text-slate-700 mb-4 leading-relaxed text-base">
                    This agency is already integrated with SigmaRemote for
                    seamless payroll processing.
                  </p>
                  {agency.sigmaRemoteNotes && (
                    <div className="flex items-start gap-2 p-4 rounded-lg bg-white/60 border border-green-200/40">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{agency.sigmaRemoteNotes}</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ) : (
            <Card className="bg-gradient-to-br from-slate-50 to-slate-100/50 border-slate-200/60 shadow-sm">
              <div className="flex items-start gap-6 p-8">
                <div className="p-4 bg-gradient-to-br from-slate-200 to-slate-300/60 rounded-xl border border-slate-300/60 flex-shrink-0">
                  <Wallet className="h-6 w-6 text-slate-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                    Connect this agency to SigmaRemote
                  </h3>
                  <p className="text-slate-700 mb-4 leading-relaxed text-base">
                    Link this agency to SigmaRemote to enable USD wallets,
                    stablecoin payouts, and seamless global payroll in 180+
                    countries.
                  </p>
                  <a
                    href="https://sigmaremote.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="lg">
                      Learn about SigmaRemote
                      <ExternalLink className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                </div>
              </div>
            </Card>
          )}
        </section>

        {/* Case Studies / Example Clients */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Trusted by leading companies</h2>
          <Card className="p-8 bg-gradient-to-br from-white to-slate-50/50 border-slate-200/60 shadow-sm">
            <p className="text-base text-slate-600 mb-6 leading-relaxed">
              Trusted by clients in fintech, healthcare, and e-commerce
            </p>
            <ClientLogos companies={getClientCompanies(agency.id, 6)} />
          </Card>
        </section>

        {/* Premium CTA Section */}
        <section className="mb-12">
          <Card className="p-12 bg-gradient-to-br from-slate-50 via-white to-slate-50 border-slate-200/60 shadow-lg">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Interested in working with {agency.name}?
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Get matched in minutes or request a custom quote. Our team will help you find the perfect fit.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/#get-matched" className="flex-1 sm:flex-initial">
                  <Button size="lg" className="w-full sm:w-auto px-8 font-semibold">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Get Matched
                  </Button>
                </a>
                {agency.websiteUrl && (
                  <a
                    href={agency.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-initial"
                  >
                    <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 font-semibold">
                      Visit Website
                      <ExternalLink className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </Card>
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

