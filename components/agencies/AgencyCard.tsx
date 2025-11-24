"use client";

import Link from "next/link";
import { Agency } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CertificationBadgesRow } from "./CertificationBadgesRow";
import { MapPin, DollarSign, ArrowRight } from "lucide-react";

export function AgencyCard({ agency }: { agency: Agency }) {
  const initials = agency.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="group hover:shadow-lg shadow-md transition-all duration-300 cursor-pointer h-full flex flex-col p-6 md:p-8">
      <Link href={`/agencies/${agency.slug}`} className="flex-1 flex flex-col">
        {/* Logo and Header Section */}
        <div className="flex items-start gap-4 mb-6">
          {agency.logoUrl ? (
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-slate-200 p-0.5 flex-shrink-0">
              <img
                src={agency.logoUrl}
                alt={agency.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          ) : (
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-slate-200 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-700 font-semibold text-sm md:text-base flex-shrink-0">
              {initials}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-1.5 group-hover:text-slate-950 transition-colors">
              {agency.name}
            </h3>
            <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
              {agency.tagline}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-4 flex-1">
          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
            <span className="text-muted-foreground">
              {agency.hqLocation.city
                ? `${agency.hqLocation.city}, ${agency.hqLocation.country}`
                : agency.hqLocation.country}
            </span>
          </div>

          {/* Price Range */}
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <DollarSign className="h-4 w-4 text-slate-400 flex-shrink-0" />
            <span className="text-muted-foreground">
              ${agency.priceRange.minUsdPerHour}–{agency.priceRange.maxUsdPerHour}
              /hr
            </span>
          </div>

          {/* Service Tags */}
          <div className="flex flex-wrap gap-1.5">
            {agency.services.slice(0, 3).map((service) => (
              <Badge
                key={service}
                variant="secondary"
                className="text-xs font-normal text-muted-foreground bg-slate-50 border-slate-200"
              >
                {service}
              </Badge>
            ))}
            {agency.services.length > 3 && (
              <Badge
                variant="secondary"
                className="text-xs font-normal text-muted-foreground bg-slate-50 border-slate-200"
              >
                +{agency.services.length - 3}
              </Badge>
            )}
          </div>

          {/* Certification Badges */}
          {agency.certifications.length > 0 && (
            <CertificationBadgesRow certifications={agency.certifications} />
          )}

          {/* SigmaRemote Partner Badge */}
          {agency.isSigmaRemotePartner && (
            <div className="pt-2">
              <Badge
                variant="default"
                className="text-xs bg-slate-900 text-white border-0"
              >
                SigmaRemote Partner
              </Badge>
            </div>
          )}
        </div>

        {/* CTA Footer */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <Button
            variant="default"
            size="sm"
            className="w-full group-hover:bg-slate-800 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/agencies/${agency.slug}`;
            }}
          >
            View Profile
            <ArrowRight className="ml-2 h-3.5 w-3.5" />
          </Button>
        </div>
      </Link>
    </Card>
  );
}

