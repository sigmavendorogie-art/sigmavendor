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
        <div className="mb-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            All VA and outsourcing agencies
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            Browse our directory of certified agencies. All agencies are vetted
            and many are integrated with SigmaRemote for seamless global
            payroll.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="lg:col-span-1">
            <AgencyFilters />
          </div>
          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredAgencies.length} of {allAgencies.length}{" "}
                agencies
              </p>
            </div>
            {filteredAgencies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {filteredAgencies.map((agency) => (
                  <AgencyCard key={agency.id} agency={agency} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-slate-600 mb-4">
                  No agencies found matching your filters.
                </p>
                <p className="text-sm text-slate-500">
                  Try adjusting your search criteria.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16">
          <VendorFomoCta />
        </div>
      </PageShell>
    </>
  );
}

