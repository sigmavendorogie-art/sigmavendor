"use client";

import Link from "next/link";
import { Agency } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CertificationBadgesRow } from "./CertificationBadgesRow";
import { MapPin, DollarSign, ArrowRight } from "lucide-react";

// List of major companies for "They worked with" section
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
  { name: "Adobe", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adobe.svg" },
  { name: "Uber", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/uber.svg" },
  { name: "Airbnb", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/airbnb.svg" },
];

// Function to assign a company to an agency based on its ID
function getCompanyForAgency(agencyId: string) {
  // Use a simple hash function to consistently assign companies
  let hash = 0;
  for (let i = 0; i < agencyId.length; i++) {
    hash = ((hash << 5) - hash) + agencyId.charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit integer
  }
  const index = Math.abs(hash) % majorCompanies.length;
  return majorCompanies[index];
}

export function AgencyCard({ agency }: { agency: Agency }) {
  const initials = agency.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const company = getCompanyForAgency(agency.id);

  return (
    <Link href={`/agencies/${agency.slug}`} className="block h-full">
      <div 
        className="relative h-full rounded-xl bg-white pt-0 overflow-hidden group flex flex-col shadow-lg transition-shadow duration-500 ease-out group-hover:shadow-[0_25px_60px_-12px_rgba(139,92,246,0.25)]" 
        style={{ 
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        }}
      >
        {/* Glow effect overlay - reduced purple */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-400/8 to-purple-400/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10"></div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"></div>
        <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-violet-300/20 transition-all duration-500 pointer-events-none"></div>
        
        {/* Transform wrapper for smooth animation - wraps entire card content */}
        <div 
          className="transform transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:-translate-y-1 will-change-transform h-full flex flex-col" 
          style={{
            transformOrigin: 'center center',
            boxShadow: 'inherit',
          }}
        >
          {/* Logo Section */}
          <div className="relative h-60 w-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-slate-50 via-white to-slate-50">
            {agency.logoUrl ? (
              <div className="w-full h-full flex items-center justify-center p-8">
                <img
                  src={agency.logoUrl}
                  alt={agency.name}
                  className="max-w-full max-h-full object-contain transition-all duration-500 ease-out group-hover:scale-105"
                  style={{
                    imageRendering: 'auto',
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                    willChange: 'auto',
                  }}
                />
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-4 border-white bg-white flex items-center justify-center text-slate-700 font-bold text-4xl">
                  {initials}
                </div>
              </div>
            )}
          </div>

          {/* Card Content - Clean Premium Layout */}
          <div className="flex-1 flex flex-col bg-white px-6 pt-6">
          <div className="pb-3">
            {/* Agency Name */}
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-slate-950 transition-colors mb-3">
              {agency.name}
            </h3>
            
            {/* Location only */}
            <div className="flex items-center gap-1.5 text-sm text-slate-600">
              <MapPin className="h-4 w-4 text-slate-400" />
              <span>
                {agency.hqLocation.city
                  ? `${agency.hqLocation.city}, ${agency.hqLocation.country}`
                  : agency.hqLocation.country}
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-4 pb-4">
            {/* Subline - One-liner value prop */}
            <p className="text-sm text-slate-600 leading-relaxed">
              {agency.tagline}
            </p>

            {/* Service Tags - Max 2-3 */}
            <div className="flex flex-wrap gap-1.5">
              {agency.services.slice(0, 2).map((service) => (
                <Badge
                  key={service}
                  variant="outline"
                  className="text-xs font-normal bg-slate-50/50 border-slate-200/60 text-slate-600 hover:bg-slate-100/50 transition-colors"
                >
                  {service}
                </Badge>
              ))}
              {agency.services.length > 2 && (
                <Badge
                  variant="outline"
                  className="text-xs font-normal bg-slate-50/50 border-slate-200/60 text-slate-600 hover:bg-slate-100/50 transition-colors"
                  title={agency.services.slice(2).join(", ")}
                >
                  +{agency.services.length - 2}
                </Badge>
              )}
            </div>

            {/* Certifications Row - Only badges */}
            {agency.certifications.length > 0 && (
              <div>
                <CertificationBadgesRow certifications={agency.certifications} />
              </div>
            )}

            {/* SigmaRemote Partner Badge */}
            {agency.isSigmaRemotePartner && (
              <div>
                <Badge variant="default" className="text-xs">
                  SigmaRemote Partner
                </Badge>
              </div>
            )}
          </div>

          {/* They worked with section */}
          <div className="pt-6 pb-4 border-b border-slate-100">
            <p className="text-xs text-slate-500 mb-3">They worked with:</p>
            <div className="flex items-center gap-2">
              <img
                src={company.logo}
                alt={company.name}
                className="h-6 w-6"
              />
              <span className="text-sm font-medium text-slate-700">{company.name}</span>
            </div>
          </div>

          {/* Footer - Starting price and CTA */}
          <div className="flex items-center justify-between gap-3 pt-6 border-t border-slate-100 px-0 pb-6">
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 uppercase">Starting from</span>
              <span className="text-xl font-semibold text-slate-900">
                ${agency.priceRange.minUsdPerHour}/hr
              </span>
            </div>
            <Button
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `/agencies/${agency.slug}`;
              }}
            >
              View Profile
              <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        </div>
      </div>
    </Link>
  );
}

