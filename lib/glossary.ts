/**
 * Glossary Terms for SigmaVendor
 * 
 * Defines key terms, definitions, and related content for SEO and LLM understanding.
 * Used for glossary pages and internal linking.
 * 
 * FUTURE EXTENSION: This will be stored in Supabase with:
 * - Glossary terms table
 * - Related categories and agencies
 * - Auto-generated from agency descriptions
 */

export interface GlossaryTerm {
  slug: string;
  term: string;
  definition: string;
  explanation: string; // Expanded explanation
  relatedTerms: string[]; // Related term slugs
  relatedCategories?: string[]; // Related category slugs
  faq?: Array<{ question: string; answer: string }>;
}

export const GLOSSARY_TERMS: Record<string, GlossaryTerm> = {
  bpo: {
    slug: "bpo",
    term: "BPO",
    definition: "Business Process Outsourcing - the practice of contracting specific business operations to third-party service providers.",
    explanation:
      "Business Process Outsourcing (BPO) is a business strategy where companies delegate specific business processes to external service providers. BPO can include back-office functions like accounting, human resources, and data entry, as well as front-office functions like customer support and sales. BPO allows companies to focus on their core competencies while reducing costs and improving efficiency through specialized service providers.",
    relatedTerms: ["outsourcing", "nearshoring", "offshoring"],
    relatedCategories: ["back-office", "customer-support", "general-va"],
    faq: [
      {
        question: "What is the difference between BPO and outsourcing?",
        answer:
          "BPO is a specific type of outsourcing that focuses on business processes. Outsourcing is a broader term that can include BPO, IT outsourcing, manufacturing outsourcing, and more.",
      },
      {
        question: "What are the benefits of BPO?",
        answer:
          "BPO offers cost savings, access to specialized expertise, scalability, focus on core business, and 24/7 operations support.",
      },
    ],
  },
  onboarding: {
    slug: "onboarding",
    term: "Onboarding",
    definition: "The process of integrating new employees, contractors, or clients into a company's systems and workflows.",
    explanation:
      "Onboarding in the context of outsourcing refers to the process of bringing new virtual assistants, contractors, or team members into your organization. Effective onboarding includes training on your products, services, brand voice, tools, and processes. Good onboarding ensures new team members can be productive quickly and maintain quality standards.",
    relatedTerms: ["training", "ramp-up"],
    relatedCategories: ["customer-support", "general-va"],
    faq: [
      {
        question: "How long does onboarding typically take?",
        answer:
          "Onboarding can take anywhere from 1-4 weeks depending on the complexity of the role and your processes. Most agencies provide structured onboarding programs.",
      },
    ],
  },
  nearshoring: {
    slug: "nearshoring",
    term: "Nearshoring",
    definition: "Outsourcing to companies in nearby countries, often sharing similar time zones and cultural similarities.",
    explanation:
      "Nearshoring is the practice of outsourcing business processes to companies in geographically close countries, typically in the same or similar time zones. For US companies, nearshoring often means working with teams in Latin America (LATAM), Canada, or Mexico. Benefits include easier communication due to time zone alignment, cultural similarities, and often lower costs than onshore options while maintaining closer collaboration than offshoring.",
    relatedTerms: ["offshoring", "onshoring", "bpo"],
    relatedCategories: ["sales-sdr", "customer-support"],
    faq: [
      {
        question: "What are the advantages of nearshoring?",
        answer:
          "Nearshoring offers time zone alignment, cultural similarities, easier travel for in-person meetings, and often better communication compared to offshoring.",
      },
      {
        question: "Which regions are popular for nearshoring from the US?",
        answer:
          "Latin America (especially Mexico, Colombia, Argentina), Canada, and Eastern Europe are popular nearshoring destinations for US companies.",
      },
    ],
  },
  offshoring: {
    slug: "offshoring",
    term: "Offshoring",
    definition: "Outsourcing business processes to companies in distant countries, often to reduce costs.",
    explanation:
      "Offshoring involves outsourcing business operations to companies in distant countries, typically to take advantage of lower labor costs. Common offshoring destinations include the Philippines, India, Eastern Europe, and other regions with skilled, English-speaking talent at competitive rates. While offshoring can offer significant cost savings, it may require managing time zone differences and cultural considerations.",
    relatedTerms: ["nearshoring", "onshoring", "bpo"],
    relatedCategories: ["customer-support", "tech-support", "back-office"],
    faq: [
      {
        question: "What are the main benefits of offshoring?",
        answer:
          "Offshoring typically offers significant cost savings, access to large talent pools, and the ability to scale operations quickly.",
      },
      {
        question: "What are the challenges of offshoring?",
        answer:
          "Challenges can include time zone differences, cultural barriers, communication challenges, and quality control. However, many agencies specialize in overcoming these challenges.",
      },
    ],
  },
  "usdc-payroll": {
    slug: "usdc-payroll",
    term: "USDC Payroll",
    definition: "Payroll processing using USD Coin (USDC) stablecoin for payments to contractors and employees.",
    explanation:
      "USDC payroll refers to paying contractors and employees using USD Coin, a cryptocurrency stablecoin pegged to the US dollar. USDC payroll offers benefits like instant transfers, low fees, no foreign exchange costs, and global reach. It's particularly popular with crypto-native companies and agencies that support crypto-friendly payments. SigmaRemote enables USDC payroll through its platform.",
    relatedTerms: ["crypto-friendly", "stablecoin", "sigma-remote"],
    relatedCategories: ["customer-support", "general-va"],
    faq: [
      {
        question: "What is USDC?",
        answer:
          "USD Coin (USDC) is a cryptocurrency stablecoin that is pegged 1:1 with the US dollar, providing stability while enabling blockchain-based payments.",
      },
      {
        question: "Why use USDC for payroll?",
        answer:
          "USDC payroll offers instant transfers, low fees, no FX costs, global reach, and is ideal for crypto-native companies and contractors who prefer crypto payments.",
      },
    ],
  },
  "crypto-friendly": {
    slug: "crypto-friendly",
    term: "Crypto-Friendly",
    definition: "Agencies and services that accept cryptocurrency payments, particularly stablecoins like USDC and USDT.",
    explanation:
      "Crypto-friendly agencies are those that accept payments in cryptocurrency, typically stablecoins like USDC (USD Coin) or USDT (Tether). These agencies are ideal for crypto-native companies, Web3 projects, and businesses that want to leverage blockchain-based payments for their outsourcing needs. Crypto-friendly agencies often have the CryptoFriendly certification badge on SigmaVendor.",
    relatedTerms: ["usdc-payroll", "stablecoin", "sigma-remote"],
    relatedCategories: ["customer-support", "general-va"],
  },
  "sigma-remote": {
    slug: "sigma-remote",
    term: "SigmaRemote",
    definition: "Global payroll platform that enables USD wallets, stablecoin payouts, and local bank transfers in 180+ countries.",
    explanation:
      "SigmaRemote is a global payroll and payments platform that enables businesses to pay contractors and employees worldwide using USD wallets, stablecoins (USDC/USDT), and local bank transfers. Agencies with PayrollReady badges on SigmaVendor are integrated with SigmaRemote, making it easy to set up payroll and process payments with zero foreign exchange fees.",
    relatedTerms: ["usdc-payroll", "crypto-friendly", "payroll-ready"],
    relatedCategories: ["customer-support", "general-va", "sales-sdr"],
  },
  "payroll-ready": {
    slug: "payroll-ready",
    term: "PayrollReady",
    definition: "Certification badge indicating an agency is integrated with SigmaRemote for seamless payroll processing.",
    explanation:
      "PayrollReady is a certification badge on SigmaVendor that indicates an agency is fully integrated with SigmaRemote for payroll processing. Agencies with this badge have all their contractors onboarded to USD wallets and can receive payments instantly via SigmaRemote. This makes it easy for buyers to set up payroll and start working with the agency immediately.",
    relatedTerms: ["sigma-remote", "usdc-payroll"],
    relatedCategories: [],
  },
};

/**
 * Get glossary term by slug
 */
export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return GLOSSARY_TERMS[slug];
}

/**
 * Get all glossary terms
 */
export function getAllGlossaryTerms(): GlossaryTerm[] {
  return Object.values(GLOSSARY_TERMS);
}

/**
 * Search glossary terms by query
 */
export function searchGlossaryTerms(query: string): GlossaryTerm[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(GLOSSARY_TERMS).filter(
    (term) =>
      term.term.toLowerCase().includes(lowerQuery) ||
      term.definition.toLowerCase().includes(lowerQuery) ||
      term.explanation.toLowerCase().includes(lowerQuery)
  );
}

