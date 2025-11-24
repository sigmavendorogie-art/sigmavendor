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
import { CheckCircle2, Wallet, Zap, Coins, TrendingUp, ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";

const baseUrl = "https://sigmavendor.com";

export default function CertificationPage() {
  const [formData, setFormData] = useState({
    agencyName: "",
    website: "",
    email: "",
    regions: "",
    services: "",
    notes: "",
    hasSigmaRemote: false,
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
        notes: "",
        hasSigmaRemote: false,
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
        {/* Hero Section */}
        <div className="mb-24 lg:mb-32">
          <div className="max-w-4xl">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Get Certified. Earn Trust. Win Better Clients.
            </h1>
            <p className="text-lg lg:text-xl text-slate-400 max-w-3xl font-medium leading-relaxed">
              SigmaVendor certification helps top agencies stand out, unlock AI-matching, and access global payroll tools.
            </p>
          </div>
        </div>

        {/* Certification Benefits - 3 Column Layout */}
        <div className="mb-24 lg:mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 mb-4 shadow-lg shadow-violet-500/20">
                <Zap className="h-7 w-7 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">AI-Matching Boost</h3>
              <p className="text-sm text-slate-600">Get prioritized in AI-powered search results</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 mb-4 shadow-lg shadow-violet-500/20">
                <Coins className="h-7 w-7 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Global Payroll via SigmaRemote</h3>
              <p className="text-sm text-slate-600">Enable USD and stablecoin payouts worldwide</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 mb-4 shadow-lg shadow-violet-500/20">
                <TrendingUp className="h-7 w-7 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Featured Placement in Search</h3>
              <p className="text-sm text-slate-600">Stand out in directory listings and recommendations</p>
            </div>
          </div>
        </div>

        {/* Certification Badges Grid */}
        <section className="mb-24 lg:mb-32">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-12 text-center">
            Certification Badges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {getAllBadges().map(({ badge, metadata }) => {
              const Icon = metadata.icon;
              return (
                <div
                  key={badge}
                  className="relative h-full rounded-xl bg-white overflow-hidden group flex flex-col shadow-lg transition-shadow duration-500 ease-out group-hover:shadow-[0_25px_60px_-12px_rgba(139,92,246,0.25)]"
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                  }}
                >
                  {/* Glow effect overlay - reduced purple */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-400/8 to-purple-400/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10"></div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>
                  <div className="absolute inset-0 rounded-xl border border-slate-200 group-hover:border-violet-300/20 transition-all duration-500 pointer-events-none"></div>
                  
                  {/* Transform wrapper for smooth animation */}
                  <div
                    className="transform transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:-translate-y-1 will-change-transform h-full flex flex-col p-6 lg:p-8"
                    style={{
                      transformOrigin: 'center center',
                      boxShadow: 'inherit',
                    }}
                  >
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${metadata.color} mb-4 transition-transform duration-500 group-hover:scale-110`}
                    >
                      <Icon className="h-6 w-6 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-950 transition-colors">
                      {metadata.label}
                    </h3>
                    <p className="text-slate-600 mb-4 leading-relaxed text-sm">{metadata.explanation}</p>
                    {metadata.criteria && (
                      <p className="text-xs text-slate-500 italic">
                        {metadata.criteria}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* How Certification Works - Horizontal Timeline */}
        <section className="mb-24 lg:mb-32">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-12 text-center">
            How Certification Works
          </h2>
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Connecting line - hidden on mobile, visible on desktop */}
              <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
                <div className="text-center relative">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-900 text-white mb-6 relative z-10">
                    <span className="text-3xl font-bold">1</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Apply
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Submit your agency information, regions served, and services offered.
                  </p>
                </div>
                
                <div className="text-center relative">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-900 text-white mb-6 relative z-10">
                    <span className="text-3xl font-bold">2</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Review
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Our team reviews your application and verifies credentials.
                  </p>
                </div>
                
                <div className="text-center relative">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-900 text-white mb-6 relative z-10">
                    <span className="text-3xl font-bold">3</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Get Certified
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Receive your badges and get featured in search results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Early Access Application Form */}
        <section className="mb-24 lg:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full max-w-7xl mx-auto">
            {/* Left Side: Title */}
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
                Early Access Application
              </h2>
              <p className="text-lg lg:text-xl text-slate-400 font-medium leading-relaxed">
                Apply for SigmaVendor certification and get featured in our directory. Stand out to serious buyers and unlock AI-powered matching.
              </p>
            </div>

            {/* Right Side: Form Card */}
            <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-xl border border-slate-200">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 tracking-tight">
                    Application received!
                  </h3>
                  <p className="text-slate-500 font-medium">
                    We&apos;ll review your application and be in touch soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-6 tracking-tight">Let&apos;s get started! 👋</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="agencyName" className="text-slate-700">Agency name</Label>
                      <Input
                        id="agencyName"
                        type="text"
                        required
                        value={formData.agencyName}
                        onChange={(e) =>
                          setFormData({ ...formData, agencyName: e.target.value })
                        }
                        placeholder="Your agency name"
                        className="border-slate-200 text-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700">Contact email</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="contact@your-agency.com"
                        className="border-slate-200 text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-slate-700">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      required
                      value={formData.website}
                      onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                      }
                      placeholder="https://your-agency.com"
                      className="border-slate-200 text-slate-900"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="regions" className="text-slate-700">Regions / Services focus</Label>
                    <Textarea
                      id="regions"
                      required
                      value={formData.regions}
                      onChange={(e) =>
                        setFormData({ ...formData, regions: e.target.value })
                      }
                      placeholder="Describe your regions served, services offered, and any specialties..."
                      rows={4}
                      className="min-h-[120px] border-slate-200 text-slate-900 resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-slate-700">Additional notes (optional)</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      placeholder="Any additional information you'd like to share..."
                      rows={3}
                      className="border-slate-200 text-slate-900 resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="hasSigmaRemote"
                      checked={formData.hasSigmaRemote}
                      onChange={(e) =>
                        setFormData({ ...formData, hasSigmaRemote: e.target.checked })
                      }
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                    />
                    <Label
                      htmlFor="hasSigmaRemote"
                      className="text-sm font-normal text-slate-700 cursor-pointer"
                    >
                      Already integrated with SigmaRemote?
                    </Label>
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium">
                    Submit application
                  </Button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* PayrollReady Highlight */}
        <section className="pt-8">
          <div
            className="relative flex flex-col items-center justify-center 
                       w-full bg-black text-white 
                       bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-gradient-3.svg')] 
                       bg-center bg-cover rounded-2xl overflow-hidden py-12 lg:py-16"
          >
            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6 px-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 mb-2">
                <Wallet className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>
              
              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                  <span className="bg-gradient-to-r from-white via-white to-[#748298] bg-clip-text text-transparent inline-block" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', paddingBottom: '0.25rem' }}>
                    Enable global payroll in days.
                  </span>
                </h2>
                <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                  SigmaRemote lets certified agencies onboard fast and accept USD/stablecoin payouts worldwide.
                </p>
              </div>
              
              <div className="pt-2">
                <a
                  href="https://sigmaremote.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-white text-black hover:bg-slate-100 font-medium h-11 px-8">
                    Learn more about PayrollReady
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </PageShell>
    </>
  );
}

