import { notFound } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AgencyCard } from "@/components/agencies/AgencyCard";
import { JsonLd } from "@/components/ui/json-ld";
import {
  buildMeta,
  buildWebPageJsonLd,
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
} from "@/lib/seo";
import {
  getCategoryBySlug,
  getAllCategories,
  CATEGORIES,
} from "@/lib/categories";
import { getAllAgencies } from "@/lib/agencies";
import { ServiceCategory } from "@/lib/types";
import { Metadata } from "next";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);
  if (!category) {
    return buildMeta({ title: "Category not found" });
  }

  return buildMeta({
    title: `${category.title} | Outsourcing Services | SigmaVendor`,
    description: category.description,
    path: `/categories/${category.slug}`,
  });
}

export default function CategoryPage({ params }: Props) {
  const baseUrl = "https://sigmavendor.com";
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  // Find agencies that offer this service category
  // Match by finding the ServiceCategory that corresponds to this category
  const allAgencies = getAllAgencies();
  const serviceCategory = Object.keys(CATEGORIES).find(
    (key) => CATEGORIES[key as ServiceCategory].slug === category.slug
  ) as ServiceCategory | undefined;
  
  const matchingAgencies = serviceCategory
    ? allAgencies.filter((agency) =>
        agency.services.includes(serviceCategory)
      ).slice(0, 6)
    : [];

  const itemUrls = matchingAgencies.map(
    (agency) => `${baseUrl}/agencies/${agency.slug}`
  );

  return (
    <>
      <JsonLd
        data={buildWebPageJsonLd({
          title: `${category.title} | Outsourcing Services`,
          description: category.description,
          url: `${baseUrl}/categories/${category.slug}`,
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", url: baseUrl },
          { name: "Categories", url: `${baseUrl}/categories` },
          { name: category.title, url: `${baseUrl}/categories/${category.slug}` },
        ])}
      />
      <JsonLd
        data={buildCollectionPageJsonLd({
          title: category.title,
          description: category.description,
          url: `${baseUrl}/categories/${category.slug}`,
          itemUrls,
        })}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": category.title,
          "description": category.definition,
          "url": `${baseUrl}/categories/${category.slug}`,
        }}
      />

      <PageShell>
        <Link
          href="/agencies"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to agencies
        </Link>

        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {category.title}
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mb-6">
            {category.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/#ai-search">
              <Button size="lg">
                <Sparkles className="mr-2 h-5 w-5" />
                Ask SigmaVendor AI
              </Button>
            </Link>
            <Link href="/#get-matched">
              <Button size="lg" variant="outline">
                Get Matched
              </Button>
            </Link>
          </div>
        </div>

        {/* Definition */}
        <Card className="mb-12 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What is {category.title}?</h2>
          <p className="text-slate-700 leading-relaxed whitespace-pre-line">
            {category.definition}
          </p>
        </Card>

        {/* Services List */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            What services can be outsourced in this category?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {category.services.map((service, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">{service}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Sample Vendors */}
        {matchingAgencies.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Agencies offering {category.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchingAgencies.map((agency) => (
                <AgencyCard key={agency.id} agency={agency} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href={`/agencies?services=${encodeURIComponent(category.title)}`}>
                <Button variant="outline" size="lg">
                  View all {category.title} agencies
                </Button>
              </Link>
            </div>
          </section>
        )}

        {/* Related Categories */}
        {category.relatedCategories.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Categories</h2>
            <div className="flex flex-wrap gap-2">
              {category.relatedCategories.map((relatedSlug) => {
                const relatedCategory = getCategoryBySlug(relatedSlug);
                if (!relatedCategory) return null;
                return (
                  <Link key={relatedSlug} href={`/categories/${relatedSlug}`}>
                    <Badge variant="outline" className="hover:bg-slate-100 cursor-pointer">
                      {relatedCategory.title}
                    </Badge>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Industry Sectors */}
        {category.industrySectors && category.industrySectors.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Commonly Used In</h2>
            <div className="flex flex-wrap gap-2">
              {category.industrySectors.map((sector) => (
                <Badge key={sector} variant="secondary">
                  {sector}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0 p-8 lg:p-12">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">
              Ready to find the perfect {category.title} agency?
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Use our AI-powered search to match with agencies that specialize in {category.title.toLowerCase()}, or browse our full directory.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#ai-search">
                <Button size="lg" variant="outline" className="bg-white text-slate-900 hover:bg-slate-100">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Try AI Search
                </Button>
              </Link>
              <Link href="/agencies">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Browse All Agencies
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </PageShell>
    </>
  );
}

