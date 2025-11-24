export type Region =
  | "LATAM"
  | "Africa"
  | "Asia"
  | "Europe"
  | "North America"
  | "Oceania"
  | "Global";

export type ServiceCategory =
  | "General VA"
  | "Customer Support"
  | "Sales / SDR"
  | "E-commerce Support"
  | "Real Estate VA"
  | "Accounting / Bookkeeping"
  | "Medical Billing"
  | "Tech Support"
  | "Back Office"
  | "Other";

export type CertificationBadge =
  | "SigmaVerified"
  | "PayrollReady"
  | "CryptoFriendly"
  | "LatamSpecialist"
  | "AfricaSpecialist";

export interface AgencyLocation {
  country: string;
  city?: string;
  timeZoneLabel?: string; // e.g. "GMT-5"
}

export interface PriceRange {
  minUsdPerHour: number;
  maxUsdPerHour: number;
}

export interface Agency {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  websiteUrl?: string;
  logoUrl?: string;
  foundedYear?: number;
  teamSize?: {
    min: number;
    max: number;
  };
  hqLocation: AgencyLocation;
  deliveryLocations: AgencyLocation[];
  regionsServed: Region[];
  services: ServiceCategory[];
  languages: string[];
  priceRange: PriceRange;
  minMonthlyRetainerUsd?: number;
  typicalEngagementLengthMonths?: number;
  certifications: CertificationBadge[];
  /**
   * True if this agency is already using SigmaRemote rails for payroll.
   */
  isSigmaRemotePartner: boolean;
  /**
   * Short description on how they integrate with SigmaRemote (USD wallets, stablecoins, no FX).
   */
  sigmaRemoteNotes?: string;
  /**
   * Human-readable phrases describing what they are especially good at.
   * Example: ["24/7 customer support for SaaS", "Cold outbound for US real estate teams"].
   */
  primaryUseCases: string[];
  /**
   * Simple review summary approximations, inspired by G2/Clutch.
   */
  reviewSummary?: {
    g2LikeScore?: number;     // 1 to 5
    clutchLikeScore?: number; // 1 to 5
    totalReviews?: number;
  };
}

export interface AgencyFilterOptions {
  query?: string;
  region?: Region;
  services?: ServiceCategory[];
  priceMin?: number;
  priceMax?: number;
  certification?: CertificationBadge | "Any";
}

