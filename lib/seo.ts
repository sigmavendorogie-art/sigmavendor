/**
 * SEO and Structured Data Utilities for SigmaVendor
 * 
 * Provides functions for building metadata and JSON-LD structured data
 * for better SEO and LLM/Google understanding.
 * 
 * FUTURE EXTENSION:
 * - Add dynamic Open Graph images
 * - Implement structured data validation
 * - Add Twitter Card metadata
 * - Generate sitemap.xml dynamically
 */

import { Agency } from "./types";
import { Metadata } from "next";

/**
 * Build Next.js metadata object for pages
 * 
 * @param options - Metadata options
 * @returns Next.js Metadata object
 */
export function buildMeta(options: {
  title: string;
  description?: string;
  path?: string;
}): Metadata {
  const baseUrl = "https://sigmavendor.com";
  const url = options.path ? `${baseUrl}${options.path}` : baseUrl;

  return {
    title: options.title,
    description:
      options.description ??
      "SigmaVendor is the AI-ready directory and certification hub for virtual assistant and outsourcing agencies, connected to SigmaRemote for global payroll.",
    openGraph: {
      title: options.title,
      description:
        options.description ??
        "Discover vetted VA and outsourcing agencies and pay them anywhere using SigmaRemote.",
      url,
      type: "website",
    },
  };
}

/**
 * Build BreadcrumbList JSON-LD schema
 * Helps search engines understand page hierarchy
 */
export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

/**
 * Build WebPage JSON-LD schema
 * Basic page metadata for search engines
 */
export function buildWebPageJsonLd(options: {
  title: string;
  description?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": options.title,
    "url": options.url,
    "description": options.description,
  };
}

/**
 * Build CollectionPage JSON-LD schema
 * Used for directory/listing pages to indicate they contain multiple items
 */
export function buildCollectionPageJsonLd(options: {
  title: string;
  description?: string;
  url: string;
  itemUrls: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": options.title,
    "url": options.url,
    "description": options.description,
    "hasPart": options.itemUrls.map((itemUrl) => ({
      "@type": "WebPage",
      "url": itemUrl,
    })),
  };
}

/**
 * Build JSON-LD structured data for an agency profile page.
 * Returns both LocalBusiness and Organization schemas for better SEO coverage.
 * 
 * FUTURE EXTENSION: This will be enhanced with:
 * - Review data from Supabase when review system is implemented
 * - Real-time pricing updates
 * - Service offerings structured data
 */
export function buildAgencyJsonLd(agency: Agency, absoluteUrl: string) {
  const rating =
    agency.reviewSummary && agency.reviewSummary.totalReviews
      ? {
          "@type": "AggregateRating",
          "ratingValue":
            agency.reviewSummary.g2LikeScore ??
            agency.reviewSummary.clutchLikeScore ??
            4.5,
          "reviewCount": agency.reviewSummary.totalReviews,
        }
      : undefined;

  // LocalBusiness schema (for local SEO)
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": agency.name,
    "url": absoluteUrl,
    "description": agency.shortDescription,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": agency.hqLocation.country,
      "addressLocality": agency.hqLocation.city || undefined,
    },
    "areaServed": agency.regionsServed,
    "priceRange": `$${agency.priceRange.minUsdPerHour}-$${agency.priceRange.maxUsdPerHour} per hour`,
    ...(rating ? { "aggregateRating": rating } : {}),
    ...(agency.websiteUrl ? { "sameAs": [agency.websiteUrl] } : {}),
    ...(agency.foundedYear ? { "foundingDate": agency.foundedYear.toString() } : {}),
  };

  // Organization schema (for general business entity)
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": agency.name,
    "url": absoluteUrl,
    "description": agency.shortDescription,
    ...(agency.websiteUrl ? { "url": agency.websiteUrl, "sameAs": [absoluteUrl] } : {}),
    ...(agency.logoUrl ? { "logo": agency.logoUrl } : {}),
    ...(agency.foundedYear ? { "foundingDate": agency.foundedYear.toString() } : {}),
    ...(rating ? { "aggregateRating": rating } : {}),
  };

  // Return LocalBusiness as primary (better for local SEO)
  // Organization can be added separately if needed
  return localBusiness;
}

/**
 * Build enhanced agency JSON-LD with Awards and additional structured data
 * 
 * FUTURE EXTENSION: Awards will be pulled from Supabase when review/award system is implemented
 */
export function buildEnhancedAgencyJsonLd(agency: Agency, absoluteUrl: string) {
  const baseJsonLd = buildAgencyJsonLd(agency, absoluteUrl);
  
  // Add awards if agency has certifications (treat certifications as awards)
  const awards = agency.certifications.map((cert) => ({
    "@type": "Award",
    "name": cert,
    "description": `Certification badge: ${cert}`,
  }));

  return {
    ...baseJsonLd,
    ...(awards.length > 0 ? { "award": awards } : {}),
    // Add additional structured data
    ...(agency.teamSize ? {
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "minValue": agency.teamSize.min,
        "maxValue": agency.teamSize.max,
      },
    } : {}),
  };
}

/**
 * Build Organization schema separately (useful when you want both schemas)
 */
export function buildAgencyOrganizationJsonLd(agency: Agency, absoluteUrl: string) {
  const rating =
    agency.reviewSummary && agency.reviewSummary.totalReviews
      ? {
          "@type": "AggregateRating",
          "ratingValue":
            agency.reviewSummary.g2LikeScore ??
            agency.reviewSummary.clutchLikeScore ??
            4.5,
          "reviewCount": agency.reviewSummary.totalReviews,
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": agency.name,
    "url": absoluteUrl,
    "description": agency.shortDescription,
    ...(agency.websiteUrl ? { "url": agency.websiteUrl, "sameAs": [absoluteUrl] } : {}),
    ...(agency.logoUrl ? { "logo": agency.logoUrl } : {}),
    ...(agency.foundedYear ? { "foundingDate": agency.foundedYear.toString() } : {}),
    ...(rating ? { "aggregateRating": rating } : {}),
  };
}

