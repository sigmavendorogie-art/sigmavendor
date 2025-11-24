import { PageShell } from "@/components/layout/PageShell";
import { Card } from "@/components/ui/card";
import { JsonLd } from "@/components/ui/json-ld";
import {
  buildMeta,
  buildWebPageJsonLd,
  buildBreadcrumbJsonLd,
} from "@/lib/seo";
import { getAllCategories } from "@/lib/categories";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = buildMeta({
  title: "Service Categories | Outsourcing Services | SigmaVendor",
  description:
    "Browse outsourcing service categories including customer support, sales development, e-commerce support, and more.",
  path: "/categories",
});

export default function CategoriesPage() {
  const baseUrl = "https://sigmavendor.com";
  const categories = getAllCategories();

  return (
    <>
      <JsonLd
        data={buildWebPageJsonLd({
          title: "Service Categories | Outsourcing Services",
          description:
            "Browse outsourcing service categories and find agencies that specialize in each area.",
          url: `${baseUrl}/categories`,
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", url: baseUrl },
          { name: "Categories", url: `${baseUrl}/categories` },
        ])}
      />

      <PageShell>
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Outsourcing Service Categories
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            Explore different types of outsourcing services and find agencies
            that specialize in each category.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.slug} href={`/categories/${category.slug}`}>
              <Card className="p-6 hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer h-full flex flex-col">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-slate-600 mb-4 flex-1 line-clamp-3">
                  {category.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span>Learn more</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </PageShell>
    </>
  );
}

