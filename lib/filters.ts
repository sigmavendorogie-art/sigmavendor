/**
 * Agency Filtering Logic for SigmaVendor
 * 
 * Provides client-side filtering of agencies based on various criteria.
 * 
 * FUTURE EXTENSION: This will be replaced with Supabase queries:
 * - Filters will be converted to Supabase query builders
 * - Full-text search will use Supabase's text search capabilities
 * - Price range filtering will use Supabase range queries
 * - Certification filtering will use Supabase array contains
 * 
 * Example future implementation:
 * ```typescript
 * let query = supabase.from('agencies').select('*');
 * if (options.region) {
 *   query = query.contains('regions_served', [options.region]);
 * }
 * ```
 */

import { Agency, AgencyFilterOptions, Region, ServiceCategory, CertificationBadge } from "./types";

/**
 * Filter agencies based on provided options
 * 
 * @param agencies - Array of agencies to filter
 * @param options - Filter criteria
 * @returns Filtered array of agencies
 */
export function filterAgencies(
  agencies: Agency[],
  options: AgencyFilterOptions
): Agency[] {
  let filtered = [...agencies];

  // Text query filter - searches across name, tagline, description, services, and locations
  if (options.query) {
    const query = options.query.toLowerCase().trim();
    filtered = filtered.filter((agency) => {
      const searchableText = [
        agency.name,
        agency.tagline,
        agency.shortDescription,
        ...agency.services,
        agency.hqLocation.country,
        agency.hqLocation.city,
        ...agency.deliveryLocations.map((loc) => loc.country),
        ...agency.deliveryLocations.map((loc) => loc.city || ""),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }

  // Region filter - agency must serve the specified region
  if (options.region) {
    const region = options.region;
    filtered = filtered.filter((agency) =>
      agency.regionsServed.includes(region)
    );
  }

  // Services filter - include if agency offers at least one of selected services
  if (options.services && options.services.length > 0) {
    const services = options.services;
    filtered = filtered.filter((agency) =>
      services.some((service) => agency.services.includes(service))
    );
  }

  // Price range filter - agency's price range must overlap with filter range
  if (options.priceMin !== undefined) {
    const priceMin = options.priceMin;
    filtered = filtered.filter(
      (agency) => agency.priceRange.maxUsdPerHour >= priceMin
    );
  }
  if (options.priceMax !== undefined) {
    const priceMax = options.priceMax;
    filtered = filtered.filter(
      (agency) => agency.priceRange.minUsdPerHour <= priceMax
    );
  }

  // Certification filter - agency must have the specified certification badge
  if (options.certification && options.certification !== "Any") {
    const certification = options.certification as CertificationBadge;
    filtered = filtered.filter((agency) =>
      agency.certifications.includes(certification)
    );
  }

  return filtered;
}

