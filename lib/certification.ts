/**
 * Certification Badge System for SigmaVendor
 * 
 * This module provides metadata, explanations, and utilities for certification badges.
 * Badges help agencies stand out and help buyers identify agencies with specific capabilities.
 * 
 * FUTURE EXTENSION: This will integrate with Supabase to track badge assignments,
 * certification criteria validation, and automated badge updates based on agency data.
 */

import { CertificationBadge } from "./types";
import { CheckCircle2, Wallet, Coins, MapPin, Globe } from "lucide-react";
import { LucideIcon } from "lucide-react";

/**
 * Badge metadata including label, color classes, icon, and explanation
 */
export interface BadgeMetadata {
  label: string;
  color: string; // Tailwind classes for background, text, and border
  icon: LucideIcon;
  explanation: string;
  criteria?: string; // Optional criteria description for certification page
}

/**
 * Complete badge metadata registry
 */
export const BADGE_METADATA: Record<CertificationBadge, BadgeMetadata> = {
  SigmaVerified: {
    label: "Sigma Verified",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: CheckCircle2,
    explanation:
      "Core quality and operational checks. Agencies with this badge have been verified for reliability, professionalism, and quality of service.",
    criteria:
      "Agencies must pass basic verification checks including business registration, team size validation, client references, and operational standards.",
  },
  PayrollReady: {
    label: "Payroll Ready",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: Wallet,
    explanation:
      "Agency can seamlessly pay via SigmaRemote rails. All contractors are onboarded and ready for USD wallet payments with zero FX fees.",
    criteria:
      "Agency must be integrated with SigmaRemote, have all contractors onboarded to USD wallets, and demonstrate successful payroll processing.",
  },
  CryptoFriendly: {
    label: "Crypto Friendly",
    color: "bg-purple-100 text-purple-800 border-purple-200",
    icon: Coins,
    explanation:
      "Supports stablecoin payouts and USDC/USDT flows. Ideal for crypto and Web3 companies looking for crypto-native payment solutions.",
    criteria:
      "Agency must accept and process payments in stablecoins (USDC/USDT) via SigmaRemote, and have experience serving crypto/Web3 clients.",
  },
  LatamSpecialist: {
    label: "LATAM Specialist",
    color: "bg-orange-100 text-orange-800 border-orange-200",
    icon: MapPin,
    explanation:
      "Real experience with LATAM teams and clients. Proven track record serving Latin American markets with bilingual teams.",
    criteria:
      "Agency must demonstrate significant experience serving LATAM markets, have bilingual (English/Spanish) teams, and show case studies from LATAM clients.",
  },
  AfricaSpecialist: {
    label: "Africa Specialist",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Globe,
    explanation:
      "Real experience with African teams and clients. Deep understanding of African markets and time zones.",
    criteria:
      "Agency must demonstrate significant experience serving African markets, have teams located in Africa, and show case studies from African clients.",
  },
};

/**
 * Get badge metadata for a specific badge
 */
export function getBadgeMetadata(badge: CertificationBadge): BadgeMetadata {
  return BADGE_METADATA[badge];
}

/**
 * Get badge label (human-readable name)
 */
export function getBadgeLabel(badge: CertificationBadge): string {
  return BADGE_METADATA[badge].label;
}

/**
 * Get badge explanation (what it means)
 */
export function getBadgeExplanation(badge: CertificationBadge): string {
  return BADGE_METADATA[badge].explanation;
}

/**
 * Get badge color classes for styling
 */
export function getBadgeColor(badge: CertificationBadge): string {
  return BADGE_METADATA[badge].color;
}

/**
 * Get badge icon component
 */
export function getBadgeIcon(badge: CertificationBadge): LucideIcon {
  return BADGE_METADATA[badge].icon;
}

/**
 * Get all badges with their metadata (useful for certification page)
 */
export function getAllBadges(): Array<{ badge: CertificationBadge; metadata: BadgeMetadata }> {
  return Object.entries(BADGE_METADATA).map(([badge, metadata]) => ({
    badge: badge as CertificationBadge,
    metadata,
  }));
}

/**
 * FUTURE EXTENSION HOOKS:
 * 
 * 1. Supabase Integration:
 *    - Store badge assignments in `agency_certifications` table
 *    - Track certification application status in `certification_applications` table
 *    - Automatically update badges based on SigmaRemote integration status
 * 
 * 2. AI Matching Integration:
 *    - Use badge data to improve AI search relevance
 *    - Weight agencies with matching badges higher in search results
 *    - Include badge explanations in AI context for better matching
 * 
 * 3. Automated Badge Assignment:
 *    - PayrollReady: Auto-assign when agency connects to SigmaRemote
 *    - CryptoFriendly: Auto-assign when agency accepts stablecoin payments
 *    - Region Specialists: Auto-assign based on delivery locations and case studies
 */

