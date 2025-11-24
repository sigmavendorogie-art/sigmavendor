/**
 * Vendor Data Management for SigmaVendor
 * 
 * Loads vendor data from JSON file for MVP demo purposes.
 * 
 * FUTURE EXTENSION: This will be replaced with Supabase integration:
 * - Vendors will be stored in `vendors` table
 * - Real-time updates via Supabase subscriptions
 * - Filtering and search will be handled by Supabase queries
 * - Vendor profiles will be fetched dynamically from database
 */

import { Agency } from "./types";
import vendorsData from "../data/vendors.json";

/**
 * Load vendors from JSON file
 * 
 * FUTURE: This will query Supabase:
 * ```typescript
 * const { data } = await supabase.from('vendors').select('*');
 * return data || [];
 * ```
 */
export function getAllVendors(): Agency[] {
  // Type assertion - JSON data should match Agency interface
  return vendorsData as Agency[];
}

/**
 * Get a single vendor by its slug
 * 
 * FUTURE: This will query Supabase:
 * ```typescript
 * const { data } = await supabase
 *   .from('vendors')
 *   .select('*')
 *   .eq('slug', slug)
 *   .single();
 * return data;
 * ```
 */
export function getVendorBySlug(slug: string): Agency | undefined {
  const vendors = getAllVendors();
  return vendors.find((vendor) => vendor.slug === slug);
}

/**
 * Get vendors by region
 */
export function getVendorsByRegion(region: string): Agency[] {
  const vendors = getAllVendors();
  return vendors.filter((vendor) => vendor.regionsServed.includes(region as any));
}

/**
 * Get vendors by service category
 */
export function getVendorsByService(service: string): Agency[] {
  const vendors = getAllVendors();
  return vendors.filter((vendor) => vendor.services.includes(service as any));
}

/**
 * Get vendors with specific certification
 */
export function getVendorsByCertification(certification: string): Agency[] {
  const vendors = getAllVendors();
  return vendors.filter((vendor) => vendor.certifications.includes(certification as any));
}

