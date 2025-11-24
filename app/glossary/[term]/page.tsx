import { notFound } from "next/navigation";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/ui/json-ld";
import {
  buildMeta,
  buildWebPageJsonLd,
  buildBreadcrumbJsonLd,
} from "@/lib/seo";
import {
  getGlossaryTerm,
  getAllGlossaryTerms,
} from "@/lib/glossary";
import { Metadata } from "next";
import { ArrowLeft, BookOpen } from "lucide-react";

type Props = {
  params: { term: string };
};

export async function generateStaticParams() {
  const terms = getAllGlossaryTerms();
  return terms.map((term) => ({
    term: term.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const glossaryTerm = getGlossaryTerm(params.term);
  if (!glossaryTerm) {
    return buildMeta({ title: "Term not found" });
  }

  return buildMeta({
    title: `${glossaryTerm.term} - Definition & Explanation | SigmaVendor Glossary`,
    description: glossaryTerm.definition,
    path: `/glossary/${glossaryTerm.slug}`,
  });
}

export default function GlossaryTermPage({ params }: Props) {
  const baseUrl = "https://sigmavendor.com";
  const glossaryTerm = getGlossaryTerm(params.term);

  if (!glossaryTerm) {
    notFound();
  }

  // Build FAQ schema
  const faqSchema = glossaryTerm.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: glossaryTerm.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <JsonLd
        data={buildWebPageJsonLd({
          title: `${glossaryTerm.term} - Definition & Explanation`,
          description: glossaryTerm.definition,
          url: `${baseUrl}/glossary/${glossaryTerm.slug}`,
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", url: baseUrl },
          { name: "Glossary", url: `${baseUrl}/glossary` },
          { name: glossaryTerm.term, url: `${baseUrl}/glossary/${glossaryTerm.slug}` },
        ])}
      />
      {faqSchema && <JsonLd data={faqSchema} />}

      <PageShell>
        <Link
          href="/glossary"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to glossary
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-6 w-6 text-slate-600" />
            <Badge variant="outline">Glossary</Badge>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {glossaryTerm.term}
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            {glossaryTerm.definition}
          </p>
        </div>

        {/* Explanation */}
        <Card className="mb-8 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Explanation</h2>
          <p className="text-slate-700 leading-relaxed whitespace-pre-line">
            {glossaryTerm.explanation}
          </p>
        </Card>

        {/* FAQ */}
        {glossaryTerm.faq && glossaryTerm.faq.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {glossaryTerm.faq.map((item, index) => (
                <Card key={index} className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">{item.question}</h3>
                  <p className="text-slate-700">{item.answer}</p>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Related Terms */}
        {glossaryTerm.relatedTerms.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Terms</h2>
            <div className="flex flex-wrap gap-2">
              {glossaryTerm.relatedTerms.map((relatedSlug) => {
                const relatedTerm = getGlossaryTerm(relatedSlug);
                if (!relatedTerm) return null;
                return (
                  <Link key={relatedSlug} href={`/glossary/${relatedSlug}`}>
                    <Badge variant="outline" className="hover:bg-slate-100 cursor-pointer">
                      {relatedTerm.term}
                    </Badge>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Related Categories */}
        {glossaryTerm.relatedCategories && glossaryTerm.relatedCategories.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Related Service Categories</h2>
            <div className="flex flex-wrap gap-2">
              {glossaryTerm.relatedCategories.map((categorySlug) => (
                <Link key={categorySlug} href={`/categories/${categorySlug}`}>
                  <Badge variant="secondary" className="hover:bg-slate-200 cursor-pointer">
                    {categorySlug.replace(/-/g, " ")}
                  </Badge>
                </Link>
              ))}
            </div>
          </section>
        )}
      </PageShell>
    </>
  );
}

