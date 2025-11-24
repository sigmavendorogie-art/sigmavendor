/**
 * Agency Data Management for SigmaVendor
 * 
 * This module provides agency data accessor functions.
 * Currently loads from both legacy static data and new vendors.json file.
 * 
 * FUTURE EXTENSION: This will be replaced with Supabase integration:
 * - Agencies will be stored in `agencies` table
 * - Real-time updates via Supabase subscriptions
 * - Filtering and search will be handled by Supabase queries
 * - Agency profiles will be fetched dynamically from database
 * 
 * The current static data structure matches the planned Supabase schema.
 */

import { Agency } from "./types";
import { getAllVendors } from "./vendors";

/**
 * Legacy static agency data - kept for backward compatibility
 * New vendors should be added to data/vendors.json
 * 
 * FUTURE: This will be replaced with:
 * - Supabase `agencies` table
 * - Real-time sync via Supabase client
 * - Caching layer for performance
 */
const LEGACY_AGENCIES: Agency[] = [
  {
    id: "1",
    slug: "philippines-va-pros",
    name: "Philippines VA Pros",
    tagline: "Premium virtual assistants from the Philippines",
    shortDescription: "Leading Philippine-based VA agency specializing in customer support and general virtual assistance for US and European clients.",
    longDescription: "Philippines VA Pros has been connecting businesses with skilled virtual assistants from the Philippines since 2018. We specialize in customer support, general VA services, and back office operations. Our team of 150+ professionals is fluent in English and works across multiple time zones to provide 24/7 support when needed. We pride ourselves on high-quality work, cultural alignment with Western businesses, and competitive pricing.",
    websiteUrl: "https://example.com/philippines-va-pros",
    foundedYear: 2018,
    teamSize: { min: 150, max: 200 },
    hqLocation: { country: "Philippines", city: "Manila", timeZoneLabel: "GMT+8" },
    deliveryLocations: [
      { country: "Philippines", city: "Manila" },
      { country: "Philippines", city: "Cebu" }
    ],
    regionsServed: ["Asia", "North America", "Europe", "Oceania"],
    services: ["General VA", "Customer Support", "Back Office", "E-commerce Support"],
    languages: ["English", "Tagalog"],
    priceRange: { minUsdPerHour: 4, maxUsdPerHour: 8 },
    minMonthlyRetainerUsd: 800,
    typicalEngagementLengthMonths: 12,
    certifications: ["SigmaVerified", "PayrollReady"],
    isSigmaRemotePartner: true,
    sigmaRemoteNotes: "All contractors already onboarded to USD wallets via SigmaRemote. Seamless payroll processing with zero FX fees.",
    primaryUseCases: [
      "24/7 customer support for SaaS companies",
      "E-commerce order processing and customer service",
      "General administrative support for startups"
    ],
    reviewSummary: {
      g2LikeScore: 4.5,
      totalReviews: 47
    }
  },
  {
    id: "2",
    slug: "mexico-sales-force",
    name: "Mexico Sales Force",
    tagline: "Bilingual sales and SDR teams from Mexico",
    shortDescription: "Specialized sales development and SDR services from Mexico, serving LATAM and North American markets.",
    longDescription: "Mexico Sales Force is a boutique agency focused exclusively on sales development and SDR services. Founded in 2020, we've built a team of 50+ bilingual (English/Spanish) sales professionals who excel at cold outbound, lead qualification, and appointment setting. Our team understands both US and LATAM markets, making us ideal for companies expanding into Spanish-speaking regions.",
    websiteUrl: "https://example.com/mexico-sales-force",
    foundedYear: 2020,
    teamSize: { min: 50, max: 75 },
    hqLocation: { country: "Mexico", city: "Mexico City", timeZoneLabel: "GMT-6" },
    deliveryLocations: [
      { country: "Mexico", city: "Mexico City" },
      { country: "Mexico", city: "Guadalajara" }
    ],
    regionsServed: ["LATAM", "North America"],
    services: ["Sales / SDR", "Customer Support"],
    languages: ["English", "Spanish"],
    priceRange: { minUsdPerHour: 7, maxUsdPerHour: 12 },
    minMonthlyRetainerUsd: 1200,
    typicalEngagementLengthMonths: 6,
    certifications: ["SigmaVerified", "LatamSpecialist", "PayrollReady"],
    isSigmaRemotePartner: true,
    sigmaRemoteNotes: "Integrated with SigmaRemote for instant USD payouts. All team members receive payments in USD wallets.",
    primaryUseCases: [
      "Cold outbound for US real estate teams",
      "Bilingual SDR support for SaaS companies",
      "Lead qualification for LATAM expansion"
    ],
    reviewSummary: {
      clutchLikeScore: 4.7,
      totalReviews: 23
    }
  },
  {
    id: "3",
    slug: "colombia-tech-support",
    name: "Colombia Tech Support",
    tagline: "Technical support specialists from Colombia",
    shortDescription: "Expert tech support and customer service teams from Colombia, serving global SaaS and tech companies.",
    longDescription: "Colombia Tech Support provides world-class technical support services to SaaS companies, fintech startups, and technology businesses. Our team of 80+ technical specialists is trained in modern support tools, ticketing systems, and can handle complex technical inquiries. We offer 24/7 coverage and specialize in supporting English and Spanish-speaking customers.",
    websiteUrl: "https://example.com/colombia-tech-support",
    foundedYear: 2019,
    teamSize: { min: 80, max: 120 },
    hqLocation: { country: "Colombia", city: "Bogotá", timeZoneLabel: "GMT-5" },
    deliveryLocations: [
      { country: "Colombia", city: "Bogotá" },
      { country: "Colombia", city: "Medellín" }
    ],
    regionsServed: ["LATAM", "North America", "Europe"],
    services: ["Tech Support", "Customer Support", "Back Office"],
    languages: ["English", "Spanish"],
    priceRange: { minUsdPerHour: 6, maxUsdPerHour: 10 },
    minMonthlyRetainerUsd: 1000,
    typicalEngagementLengthMonths: 12,
    certifications: ["SigmaVerified", "LatamSpecialist"],
    isSigmaRemotePartner: false,
    primaryUseCases: [
      "24/7 technical support for SaaS platforms",
      "Customer success for fintech companies",
      "Bilingual support for global tech companies"
    ],
    reviewSummary: {
      g2LikeScore: 4.6,
      totalReviews: 31
    }
  },
  {
    id: "4",
    slug: "kenya-customer-success",
    name: "Kenya Customer Success",
    tagline: "Customer success teams from East Africa",
    shortDescription: "Dedicated customer success and support teams from Kenya, offering cost-effective solutions for growing businesses.",
    longDescription: "Kenya Customer Success brings together talented professionals from Kenya and East Africa to deliver exceptional customer support and success services. Our team of 100+ agents is known for excellent English communication, cultural alignment with Western businesses, and competitive pricing. We specialize in customer onboarding, account management, and proactive customer success initiatives.",
    websiteUrl: "https://example.com/kenya-customer-success",
    foundedYear: 2021,
    teamSize: { min: 100, max: 150 },
    hqLocation: { country: "Kenya", city: "Nairobi", timeZoneLabel: "GMT+3" },
    deliveryLocations: [
      { country: "Kenya", city: "Nairobi" }
    ],
    regionsServed: ["Africa", "Europe", "North America"],
    services: ["Customer Support", "General VA", "Back Office"],
    languages: ["English", "Swahili"],
    priceRange: { minUsdPerHour: 5, maxUsdPerHour: 9 },
    minMonthlyRetainerUsd: 900,
    typicalEngagementLengthMonths: 12,
    certifications: ["SigmaVerified", "AfricaSpecialist"],
    isSigmaRemotePartner: false,
    primaryUseCases: [
      "Customer onboarding for SaaS companies",
      "Account management for subscription businesses",
      "24/7 customer support coverage"
    ],
    reviewSummary: {
      clutchLikeScore: 4.4,
      totalReviews: 18
    }
  },
  {
    id: "5",
    slug: "nigeria-real-estate-va",
    name: "Nigeria Real Estate VA",
    tagline: "Real estate virtual assistants from Nigeria",
    shortDescription: "Specialized real estate VA services including lead generation, CRM management, and transaction support.",
    longDescription: "Nigeria Real Estate VA is a specialized agency focused exclusively on real estate virtual assistant services. Our team of 60+ professionals understands the US real estate market and provides services including lead generation, CRM management, transaction coordination, and marketing support. We work with real estate teams, brokers, and property management companies across the United States.",
    websiteUrl: "https://example.com/nigeria-real-estate-va",
    foundedYear: 2020,
    teamSize: { min: 60, max: 90 },
    hqLocation: { country: "Nigeria", city: "Lagos", timeZoneLabel: "GMT+1" },
    deliveryLocations: [
      { country: "Nigeria", city: "Lagos" }
    ],
    regionsServed: ["Africa", "North America"],
    services: ["Real Estate VA", "Sales / SDR", "Back Office"],
    languages: ["English"],
    priceRange: { minUsdPerHour: 5, maxUsdPerHour: 8 },
    minMonthlyRetainerUsd: 850,
    typicalEngagementLengthMonths: 12,
    certifications: ["SigmaVerified", "AfricaSpecialist"],
    isSigmaRemotePartner: false,
    primaryUseCases: [
      "Real estate lead generation and follow-up",
      "CRM management for real estate teams",
      "Transaction coordination support"
    ],
    reviewSummary: {
      g2LikeScore: 4.3,
      totalReviews: 15
    }
  },
  {
    id: "6",
    slug: "india-ecommerce-support",
    name: "India E-commerce Support",
    tagline: "E-commerce specialists from India",
    shortDescription: "Comprehensive e-commerce support services including order management, customer service, and inventory coordination.",
    longDescription: "India E-commerce Support provides end-to-end e-commerce support services to online retailers, DTC brands, and marketplace sellers. Our team of 200+ professionals handles order processing, customer inquiries, returns management, inventory updates, and vendor coordination. We integrate with major e-commerce platforms including Shopify, WooCommerce, Amazon, and eBay.",
    websiteUrl: "https://example.com/india-ecommerce-support",
    foundedYear: 2017,
    teamSize: { min: 200, max: 300 },
    hqLocation: { country: "India", city: "Bangalore", timeZoneLabel: "GMT+5:30" },
    deliveryLocations: [
      { country: "India", city: "Bangalore" },
      { country: "India", city: "Hyderabad" }
    ],
    regionsServed: ["Asia", "North America", "Europe", "Oceania"],
    services: ["E-commerce Support", "Customer Support", "Back Office"],
    languages: ["English", "Hindi"],
    priceRange: { minUsdPerHour: 4, maxUsdPerHour: 7 },
    minMonthlyRetainerUsd: 750,
    typicalEngagementLengthMonths: 12,
    certifications: ["SigmaVerified"],
    isSigmaRemotePartner: false,
    primaryUseCases: [
      "E-commerce order processing and fulfillment",
      "Customer service for DTC brands",
      "Marketplace seller support"
    ],
    reviewSummary: {
      g2LikeScore: 4.5,
      totalReviews: 62
    }
  },
  {
    id: "7",
    slug: "romania-accounting-va",
    name: "Romania Accounting VA",
    tagline: "Accounting and bookkeeping specialists from Romania",
    shortDescription: "Expert accounting, bookkeeping, and financial administration services from Eastern Europe.",
    longDescription: "Romania Accounting VA specializes in accounting, bookkeeping, and financial administration services for US and European businesses. Our team of 40+ certified accountants and bookkeepers is proficient in QuickBooks, Xero, and other accounting software. We handle accounts payable, accounts receivable, bank reconciliations, and financial reporting. Our team works in European time zones, making them ideal for European clients.",
    websiteUrl: "https://example.com/romania-accounting-va",
    foundedYear: 2019,
    teamSize: { min: 40, max: 60 },
    hqLocation: { country: "Romania", city: "Bucharest", timeZoneLabel: "GMT+2" },
    deliveryLocations: [
      { country: "Romania", city: "Bucharest" }
    ],
    regionsServed: ["Europe", "North America"],
    services: ["Accounting / Bookkeeping", "Back Office"],
    languages: ["English", "Romanian"],
    priceRange: { minUsdPerHour: 8, maxUsdPerHour: 15 },
    minMonthlyRetainerUsd: 1500,
    typicalEngagementLengthMonths: 12,
    certifications: ["SigmaVerified", "PayrollReady"],
    isSigmaRemotePartner: true,
    sigmaRemoteNotes: "All accounting professionals receive payments via SigmaRemote USD wallets. Seamless integration with our payroll systems.",
    primaryUseCases: [
      "Bookkeeping for US small businesses",
      "Financial administration for European companies",
      "Accounts payable and receivable management"
    ],
    reviewSummary: {
      clutchLikeScore: 4.8,
      totalReviews: 28
    }
  },
  {
    id: "8",
    slug: "poland-medical-billing",
    name: "Poland Medical Billing",
    tagline: "Medical billing and healthcare administration from Poland",
    shortDescription: "Specialized medical billing, coding, and healthcare administration services from Poland.",
    longDescription: "Poland Medical Billing provides comprehensive medical billing, coding, and healthcare administration services to US healthcare providers. Our team of 70+ certified medical coders and billing specialists is trained in US healthcare regulations, HIPAA compliance, and major billing systems. We handle claims submission, payment posting, denial management, and patient billing inquiries.",
    websiteUrl: "https://example.com/poland-medical-billing",
    foundedYear: 2018,
    teamSize: { min: 70, max: 100 },
    hqLocation: { country: "Poland", city: "Warsaw", timeZoneLabel: "GMT+1" },
    deliveryLocations: [
      { country: "Poland", city: "Warsaw" },
      { country: "Poland", city: "Krakow" }
    ],
    regionsServed: ["Europe", "North America"],
    services: ["Medical Billing", "Back Office"],
    languages: ["English", "Polish"],
    priceRange: { minUsdPerHour: 10, maxUsdPerHour: 18 },
    minMonthlyRetainerUsd: 1800,
    typicalEngagementLengthMonths: 24,
    certifications: ["SigmaVerified"],
    isSigmaRemotePartner: false,
    primaryUseCases: [
      "Medical claims processing for US providers",
      "HIPAA-compliant healthcare administration",
      "Denial management and appeals"
    ],
    reviewSummary: {
      g2LikeScore: 4.7,
      totalReviews: 34
    }
  },
  {
    id: "9",
    slug: "global-va-network",
    name: "Global VA Network",
    tagline: "Worldwide virtual assistant network",
    shortDescription: "Global network of virtual assistants covering all time zones and service categories.",
    longDescription: "Global VA Network is a comprehensive virtual assistant agency with teams across multiple continents. We provide 24/7 coverage and support for businesses of all sizes. Our network includes specialists in customer support, sales, e-commerce, real estate, accounting, and technical support. With 500+ professionals worldwide, we can scale quickly and provide coverage in any time zone.",
    websiteUrl: "https://example.com/global-va-network",
    foundedYear: 2016,
    teamSize: { min: 500, max: 750 },
    hqLocation: { country: "United States", city: "San Francisco", timeZoneLabel: "GMT-8" },
    deliveryLocations: [
      { country: "Philippines", city: "Manila" },
      { country: "India", city: "Bangalore" },
      { country: "Mexico", city: "Mexico City" },
      { country: "Colombia", city: "Bogotá" },
      { country: "Poland", city: "Warsaw" }
    ],
    regionsServed: ["Global", "North America", "Europe", "Asia", "LATAM"],
    services: ["General VA", "Customer Support", "Sales / SDR", "E-commerce Support", "Real Estate VA", "Tech Support", "Back Office"],
    languages: ["English", "Spanish", "French", "German", "Hindi", "Tagalog"],
    priceRange: { minUsdPerHour: 6, maxUsdPerHour: 20 },
    minMonthlyRetainerUsd: 1000,
    typicalEngagementLengthMonths: 12,
    certifications: ["SigmaVerified", "PayrollReady", "CryptoFriendly"],
    isSigmaRemotePartner: true,
    sigmaRemoteNotes: "Global payroll infrastructure powered by SigmaRemote. USD wallets and stablecoin payouts available for all contractors worldwide.",
    primaryUseCases: [
      "24/7 global customer support",
      "Multi-timezone sales teams",
      "Scalable VA solutions for enterprise"
    ],
    reviewSummary: {
      g2LikeScore: 4.6,
      clutchLikeScore: 4.5,
      totalReviews: 89
    }
  },
  {
    id: "10",
    slug: "philippines-crypto-va",
    name: "Philippines Crypto VA",
    tagline: "Crypto-friendly virtual assistants from the Philippines",
    shortDescription: "Specialized VA services for crypto and Web3 companies, with crypto-native payment support.",
    longDescription: "Philippines Crypto VA is the first agency specifically designed to serve crypto and Web3 companies. Our team of 80+ professionals understands blockchain technology, DeFi protocols, and crypto-native workflows. We offer customer support for crypto exchanges, community management for NFT projects, and administrative support for DAOs. All payments are processed via stablecoins through SigmaRemote integration.",
    websiteUrl: "https://example.com/philippines-crypto-va",
    foundedYear: 2022,
    teamSize: { min: 80, max: 120 },
    hqLocation: { country: "Philippines", city: "Manila", timeZoneLabel: "GMT+8" },
    deliveryLocations: [
      { country: "Philippines", city: "Manila" }
    ],
    regionsServed: ["Asia", "North America", "Europe"],
    services: ["Customer Support", "General VA", "Tech Support"],
    languages: ["English"],
    priceRange: { minUsdPerHour: 5, maxUsdPerHour: 9 },
    minMonthlyRetainerUsd: 900,
    typicalEngagementLengthMonths: 6,
    certifications: ["SigmaVerified", "CryptoFriendly", "PayrollReady"],
    isSigmaRemotePartner: true,
    sigmaRemoteNotes: "100% crypto-native payroll via SigmaRemote. All contractors receive USDC/USDT payouts directly to their wallets.",
    primaryUseCases: [
      "Customer support for crypto exchanges",
      "Community management for NFT projects",
      "Administrative support for DAOs"
    ],
    reviewSummary: {
      clutchLikeScore: 4.6,
      totalReviews: 12
    }
  },
  {
    id: "11",
    slug: "colombia-sales-specialists",
    name: "Colombia Sales Specialists",
    tagline: "Boutique sales team from Colombia",
    shortDescription: "Elite sales development and SDR services from Colombia, specializing in B2B SaaS and fintech.",
    longDescription: "Colombia Sales Specialists is a boutique agency focused on high-quality sales development services. Our team of 30+ sales professionals specializes in B2B SaaS and fintech outbound. We provide personalized service, deep industry knowledge, and exceptional results. Our team is bilingual (English/Spanish) and understands both US and LATAM markets.",
    websiteUrl: "https://example.com/colombia-sales-specialists",
    foundedYear: 2021,
    teamSize: { min: 30, max: 45 },
    hqLocation: { country: "Colombia", city: "Medellín", timeZoneLabel: "GMT-5" },
    deliveryLocations: [
      { country: "Colombia", city: "Medellín" }
    ],
    regionsServed: ["LATAM", "North America"],
    services: ["Sales / SDR"],
    languages: ["English", "Spanish"],
    priceRange: { minUsdPerHour: 8, maxUsdPerHour: 14 },
    minMonthlyRetainerUsd: 1400,
    typicalEngagementLengthMonths: 6,
    certifications: ["SigmaVerified", "LatamSpecialist"],
    isSigmaRemotePartner: false,
    primaryUseCases: [
      "B2B SaaS outbound campaigns",
      "Fintech lead generation",
      "High-touch SDR services"
    ],
    reviewSummary: {
      g2LikeScore: 4.8,
      totalReviews: 19
    }
  },
  {
    id: "12",
    slug: "kenya-back-office",
    name: "Kenya Back Office",
    tagline: "Comprehensive back office support from Kenya",
    shortDescription: "Full-service back office operations including data entry, research, and administrative support.",
    longDescription: "Kenya Back Office provides comprehensive back office support services to businesses worldwide. Our team of 120+ professionals handles data entry, research, document processing, and administrative tasks. We serve clients across industries including real estate, healthcare, legal, and professional services. Our team is known for accuracy, attention to detail, and competitive pricing.",
    websiteUrl: "https://example.com/kenya-back-office",
    foundedYear: 2020,
    teamSize: { min: 120, max: 180 },
    hqLocation: { country: "Kenya", city: "Nairobi", timeZoneLabel: "GMT+3" },
    deliveryLocations: [
      { country: "Kenya", city: "Nairobi" }
    ],
    regionsServed: ["Africa", "Europe", "North America"],
    services: ["Back Office", "General VA", "Accounting / Bookkeeping"],
    languages: ["English"],
    priceRange: { minUsdPerHour: 4, maxUsdPerHour: 7 },
    minMonthlyRetainerUsd: 800,
    typicalEngagementLengthMonths: 12,
    certifications: ["SigmaVerified", "AfricaSpecialist"],
    isSigmaRemotePartner: false,
    primaryUseCases: [
      "Data entry and processing",
      "Research and analysis",
      "Document management"
    ],
    reviewSummary: {
      clutchLikeScore: 4.3,
      totalReviews: 22
    }
  }
];

/**
 * Get all agencies from the dataset
 * Combines legacy static data with new vendors.json data
 * 
 * FUTURE: This will query Supabase:
 * ```typescript
 * const { data } = await supabase.from('agencies').select('*');
 * return data || [];
 * ```
 */
export function getAllAgencies(): Agency[] {
  // Combine legacy agencies with new vendors from JSON
  const vendors = getAllVendors();
  // Remove duplicates by slug (vendors.json takes precedence)
  const legacyMap = new Map(LEGACY_AGENCIES.map((a) => [a.slug, a]));
  vendors.forEach((vendor) => {
    legacyMap.set(vendor.slug, vendor);
  });
  return Array.from(legacyMap.values());
}

/**
 * Get a single agency by its slug
 * 
 * FUTURE: This will query Supabase:
 * ```typescript
 * const { data } = await supabase
 *   .from('agencies')
 *   .select('*')
 *   .eq('slug', slug)
 *   .single();
 * return data;
 * ```
 */
export function getAgencyBySlug(slug: string): Agency | undefined {
  const allAgencies = getAllAgencies();
  return allAgencies.find((agency) => agency.slug === slug);
}

