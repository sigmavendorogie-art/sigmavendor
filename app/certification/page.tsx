"use client";

import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/ui/json-ld";
import {
  buildWebPageJsonLd,
  buildBreadcrumbJsonLd,
  buildCollectionPageJsonLd,
} from "@/lib/seo";
import { getAllBadges } from "@/lib/certification";
import { CheckCircle2, Wallet } from "lucide-react";

const baseUrl = "https://sigmavendor.com";

export default function CertificationPage() {
  const [formData, setFormData] = useState({
    agencyName: "",
    website: "",
    email: "",
    regions: "",
    services: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with actual backend API
    console.log("Certification application:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        agencyName: "",
        website: "",
        email: "",
        regions: "",
        services: "",
      });
    }, 3000);
  };

  return (
    <>
      <JsonLd
        data={buildWebPageJsonLd({
          title: "SigmaVendor Certification | VA Agency Certification Program",
          description:
            "Get certified as a VA or outsourcing agency. Highlight your specialties and connect with buyers through SigmaVendor.",
          url: `${baseUrl}/certification`,
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", url: baseUrl },
          { name: "Certification", url: `${baseUrl}/certification` },
        ])}
      />
      <JsonLd
        data={buildCollectionPageJsonLd({
          title: "SigmaVendor Certification | VA Agency Certification Program",
          description:
            "Get certified as a VA or outsourcing agency. Highlight your specialties and connect with buyers through SigmaVendor.",
          url: `${baseUrl}/certification`,
          itemUrls: [], // Certification page doesn't list individual items
        })}
      />

      <PageShell>
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            SigmaVendor certification for VA and outsourcing agencies
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-6">
            Certification highlights agencies that pass checks on reliability,
            specialties, and payroll readiness. Get certified to stand out and
            connect with serious buyers.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Why get certified on SigmaVendor?
            </h2>
            <ul className="text-left space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span><strong>AI-Powered Discovery:</strong> Our AI search automatically matches buyers with your agency based on their needs</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span><strong>Increased Visibility:</strong> Get featured in category pages, search results, and AI recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span><strong>SigmaRemote Integration:</strong> Get PayrollReady badge and enable instant USD wallet payments</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span><strong>Quality Leads:</strong> Connect with serious buyers who are actively searching for your services</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Badges Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Certification Badges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getAllBadges().map(({ badge, metadata }) => {
              const Icon = metadata.icon;
              return (
                <Card key={badge} className="p-6">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${metadata.color} mb-4`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {metadata.label}
                  </h3>
                  <p className="text-slate-600 mb-3">{metadata.explanation}</p>
                  {metadata.criteria && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <p className="text-xs font-semibold text-slate-700 mb-1">
                        Criteria:
                      </p>
                      <p className="text-xs text-slate-600">
                        {metadata.criteria}
                      </p>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </section>

        {/* How Certification Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            How certification works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                <span className="text-2xl font-bold text-slate-900">1</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Apply
              </h3>
              <p className="text-slate-600">
                Agency submits basic info, regions served, services offered, and
                any existing SigmaRemote integration.
              </p>
            </Card>
            <Card className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                <span className="text-2xl font-bold text-slate-900">2</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Review
              </h3>
              <p className="text-slate-600">
                SigmaVendor team reviews your application. In future versions,
                AI-assisted checks will help verify credentials and specialties.
              </p>
            </Card>
            <Card className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                <span className="text-2xl font-bold text-slate-900">3</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Badge and promotion
              </h3>
              <p className="text-slate-600">
                Get your certification badges, featured placements in the
                directory, and better leads from serious buyers.
              </p>
            </Card>
          </div>
        </section>

        {/* Application Form */}
        <section className="mb-16">
          <Card className="max-w-2xl mx-auto p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Early access application
              </h2>
              <p className="text-slate-600">
                Apply for SigmaVendor certification and get featured in our
                directory.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Application received!
                </h3>
                <p className="text-slate-600">
                  We&apos;ll review your application and be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="agencyName"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Agency name
                  </label>
                  <Input
                    id="agencyName"
                    type="text"
                    required
                    value={formData.agencyName}
                    onChange={(e) =>
                      setFormData({ ...formData, agencyName: e.target.value })
                    }
                    placeholder="Your agency name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="website"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Website
                  </label>
                  <Input
                    id="website"
                    type="url"
                    required
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                    placeholder="https://your-agency.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Contact email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="contact@your-agency.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="regions"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Regions / Services focus
                  </label>
                  <Textarea
                    id="regions"
                    required
                    value={formData.regions}
                    onChange={(e) =>
                      setFormData({ ...formData, regions: e.target.value })
                    }
                    placeholder="Describe your regions served, services offered, and any specialties..."
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Submit application
                </Button>
              </form>
            )}
          </Card>
        </section>

        {/* SigmaRemote CTA */}
        <section>
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0 p-8 lg:p-12">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
                <Wallet className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold">
                PayrollReady badges powered by SigmaRemote
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Agencies with PayrollReady badges are already integrated with
                SigmaRemote for seamless global payroll. Connect your agency to
                SigmaRemote to unlock this certification.
              </p>
              <a
                href="https://sigmaremote.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="bg-white text-slate-900 hover:bg-slate-100">
                  Learn about SigmaRemote
                </Button>
              </a>
            </div>
          </Card>
        </section>
      </PageShell>
    </>
  );
}

