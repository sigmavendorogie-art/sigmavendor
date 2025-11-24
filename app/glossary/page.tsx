import { PageShell } from "@/components/layout/PageShell";
import { Card } from "@/components/ui/card";
import { JsonLd } from "@/components/ui/json-ld";
import {
  buildMeta,
  buildWebPageJsonLd,
  buildBreadcrumbJsonLd,
} from "@/lib/seo";
import { getAllGlossaryTerms } from "@/lib/glossary";
import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

export const metadata: Metadata = buildMeta({
  title: "Glossary | Outsourcing Terms & Definitions | SigmaVendor",
  description:
    "Learn about key outsourcing terms, BPO, nearshoring, offshoring, and more with our comprehensive glossary.",
  path: "/glossary",
});

export default function GlossaryPage() {
  const baseUrl = "https://sigmavendor.com";
  const terms = getAllGlossaryTerms();

  return (
    <>
      <JsonLd
        data={buildWebPageJsonLd({
          title: "Glossary | Outsourcing Terms & Definitions",
          description:
            "Comprehensive glossary of outsourcing, BPO, and virtual assistant terms and definitions.",
          url: `${baseUrl}/glossary`,
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", url: baseUrl },
          { name: "Glossary", url: `${baseUrl}/glossary` },
        ])}
      />

      <PageShell>
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-slate-600" />
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900">
              Glossary
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-3xl">
            Learn about key terms, concepts, and definitions related to
            outsourcing, BPO, virtual assistants, and global payroll.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {terms.map((term) => (
            <Link key={term.slug} href={`/glossary/${term.slug}`}>
              <Card className="p-6 hover:shadow-md transition-all duration-200 hover:scale-[1.02] cursor-pointer h-full flex flex-col">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {term.term}
                </h3>
                <p className="text-slate-600 mb-4 flex-1 line-clamp-3">
                  {term.definition}
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span>Read more</span>
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

