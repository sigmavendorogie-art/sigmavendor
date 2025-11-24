import { PageShell } from "@/components/layout/PageShell";
import { AgencyFilters } from "@/components/agencies/AgencyFilters";
import { AgencyCard } from "@/components/agencies/AgencyCard";
import { VendorFomoCta } from "@/components/marketing/VendorFomoCta";
import { getAllAgencies } from "@/lib/agencies";
import { filterAgencies } from "@/lib/filters";
import { AgencyFilterOptions, Region, ServiceCategory, CertificationBadge } from "@/lib/types";
import { JsonLd } from "@/components/ui/json-ld";
import {
  buildMeta,
  buildWebPageJsonLd,
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
} from "@/lib/seo";
import { Metadata } from "next";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(): Promise<Metadata> {
  return buildMeta({
    title: "All VA and Outsourcing Agencies | SigmaVendor",
    description:
      "Browse our directory of certified virtual assistant and outsourcing agencies. Filter by region, services, price, and certifications.",
    path: "/agencies",
  });
}

export default function AgenciesPage({ searchParams }: Props) {
  const baseUrl = "https://sigmavendor.com";

  // Parse search params
  const options: AgencyFilterOptions = {
    query: typeof searchParams.q === "string" ? searchParams.q : undefined,
    region: typeof searchParams.region === "string" ? (searchParams.region as Region) : undefined,
    services:
      typeof searchParams.services === "string"
        ? (searchParams.services.split(",") as ServiceCategory[])
        : undefined,
    priceMin:
      typeof searchParams.priceMin === "string"
        ? Number.parseFloat(searchParams.priceMin)
        : undefined,
    priceMax:
      typeof searchParams.priceMax === "string"
        ? Number.parseFloat(searchParams.priceMax)
        : undefined,
    certification:
      typeof searchParams.certification === "string"
        ? (searchParams.certification as CertificationBadge | "Any")
        : undefined,
  };

  const allAgencies = getAllAgencies();
  const filteredAgencies = filterAgencies(allAgencies, options);

  const itemUrls = filteredAgencies.map(
    (agency) => `${baseUrl}/agencies/${agency.slug}`
  );

  return (
    <>
      <JsonLd
        data={buildWebPageJsonLd({
          title: "All VA and Outsourcing Agencies | SigmaVendor",
          description:
            "Browse our directory of certified virtual assistant and outsourcing agencies.",
          url: `${baseUrl}/agencies`,
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", url: baseUrl },
          { name: "Agencies", url: `${baseUrl}/agencies` },
        ])}
      />
      <JsonLd
        data={buildCollectionPageJsonLd({
          title: "All VA and Outsourcing Agencies",
          description: "Directory of certified VA and outsourcing agencies",
          url: `${baseUrl}/agencies`,
          itemUrls,
        })}
      />

      <PageShell>
        {/* Premium Header Section */}
        <div className="mb-16 lg:mb-20">
          <div className="max-w-4xl">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              All VA and outsourcing agencies
            </h1>
            <p className="text-lg lg:text-xl text-slate-400 max-w-3xl font-medium leading-relaxed">
              Browse our directory of certified agencies. All agencies are vetted
              and many are integrated with SigmaRemote for seamless global
              payroll.
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <AgencyFilters />
          </div>

          {/* Agencies Grid */}
          <div className="lg:col-span-3">
            {/* Results Count - Premium Styling */}
            <div className="mb-8 pb-6 border-b border-slate-100">
              <p className="text-sm font-medium text-slate-500 tracking-wide uppercase">
                Showing <span className="text-slate-900 font-semibold">{filteredAgencies.length}</span> of{" "}
                <span className="text-slate-900 font-semibold">{allAgencies.length}</span> agencies
              </p>
            </div>

            {/* Agency Cards Grid */}
            {filteredAgencies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {filteredAgencies.map((agency) => (
                  <AgencyCard key={agency.id} agency={agency} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 px-4">
                <div className="max-w-md mx-auto">
                  <div className="mb-6">
                    <svg
                      className="mx-auto h-16 w-16 text-slate-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                  <p className="text-xl font-semibold text-slate-900 mb-3">
                    No agencies found matching your filters.
                  </p>
                  <p className="text-base text-slate-400 font-medium">
                    Try adjusting your search criteria or clear filters to see all available agencies.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 lg:mt-24">
          <VendorFomoCta />
        </div>
      </PageShell>
    </>
  );
}

