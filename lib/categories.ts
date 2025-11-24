/**
 * Category and Role Definitions for SigmaVendor
 * 
 * Defines service categories and industry sectors that agencies can specialize in.
 * Used for category pages, filtering, and SEO.
 * 
 * FUTURE EXTENSION: This will be stored in Supabase with:
 * - Category metadata table
 * - Category-agency relationships
 * - Dynamic category generation from agency data
 */

import { ServiceCategory } from "./types";

export interface CategoryDefinition {
  slug: string;
  title: string;
  description: string;
  definition: string; // Expanded explanation
  services: string[]; // What services can be outsourced in this category
  relatedCategories: string[]; // Related category slugs
  industrySectors?: string[]; // e.g., Healthcare, Fintech, Travel
  icon?: string; // Icon identifier for UI
}

/**
 * Category definitions mapped to ServiceCategory types
 */
export const CATEGORIES: Record<ServiceCategory, CategoryDefinition> = {
  "General VA": {
    slug: "general-va",
    title: "General Virtual Assistant Services",
    description: "Comprehensive virtual assistant services for administrative tasks, scheduling, and business support.",
    definition:
      "General Virtual Assistant (VA) services encompass a wide range of administrative and support tasks that help businesses operate more efficiently. VAs handle everything from email management and calendar scheduling to data entry, research, and document preparation. They serve as remote extensions of your team, providing flexible support that scales with your needs.",
    services: [
      "Email and calendar management",
      "Data entry and document processing",
      "Research and information gathering",
      "Travel planning and booking",
      "Social media management",
      "Content creation and editing",
      "CRM and database management",
      "Project coordination and follow-ups",
      "Expense tracking and reporting",
      "General administrative support",
    ],
    relatedCategories: ["customer-support", "back-office", "e-commerce-support"],
    industrySectors: ["All Industries"],
  },
  "Customer Support": {
    slug: "customer-support",
    title: "Customer Support & Service Teams",
    description: "Dedicated customer support teams for handling inquiries, tickets, and support requests across channels.",
    definition:
      "Customer support outsourcing involves delegating customer service operations to specialized teams that handle inquiries, resolve issues, and maintain customer satisfaction. These teams are trained in your products, services, and brand voice, providing seamless support across email, chat, phone, and social media channels. They can offer 24/7 coverage, multilingual support, and scale quickly during peak periods.",
    services: [
      "24/7 customer support coverage",
      "Multi-channel support (email, chat, phone, social)",
      "Ticket management and resolution",
      "Customer onboarding and training",
      "Account management and retention",
      "Technical support and troubleshooting",
      "Returns and refunds processing",
      "Customer feedback collection",
      "Live chat and real-time support",
      "Support analytics and reporting",
    ],
    relatedCategories: ["tech-support", "e-commerce-support", "general-va"],
    industrySectors: ["SaaS", "E-commerce", "Fintech", "Healthcare", "Travel"],
  },
  "Sales / SDR": {
    slug: "sales-sdr",
    title: "Sales Development & SDR Services",
    description: "Sales development representatives and outbound sales teams for lead generation and qualification.",
    definition:
      "Sales Development Representative (SDR) services focus on outbound lead generation, prospecting, and appointment setting. SDR teams help businesses identify potential customers, qualify leads, and schedule meetings for your sales team. They specialize in cold outreach, email campaigns, LinkedIn prospecting, and follow-up sequences that convert prospects into qualified opportunities.",
    services: [
      "Cold outbound and prospecting",
      "Lead qualification and scoring",
      "Appointment setting and scheduling",
      "Email and LinkedIn outreach campaigns",
      "CRM data entry and management",
      "Sales pipeline development",
      "Market research and targeting",
      "Follow-up sequences and nurturing",
      "Sales reporting and analytics",
      "B2B and B2C sales support",
    ],
    relatedCategories: ["customer-support", "back-office"],
    industrySectors: ["B2B SaaS", "Real Estate", "Fintech", "Professional Services"],
  },
  "E-commerce Support": {
    slug: "e-commerce-support",
    title: "E-commerce & Marketplace Support",
    description: "Specialized support for online retailers, DTC brands, and marketplace sellers.",
    definition:
      "E-commerce support services help online retailers manage day-to-day operations, from order processing and inventory management to customer service and marketplace administration. These teams understand e-commerce platforms like Shopify, WooCommerce, Amazon, and eBay, and can handle everything from product listings to returns processing.",
    services: [
      "Order processing and fulfillment",
      "Inventory management and updates",
      "Product listing and optimization",
      "Customer service for online stores",
      "Returns and refunds processing",
      "Marketplace seller support",
      "Review management and responses",
      "Shipping coordination",
      "Vendor and supplier communication",
      "E-commerce analytics and reporting",
    ],
    relatedCategories: ["customer-support", "back-office", "general-va"],
    industrySectors: ["E-commerce", "DTC Brands", "Marketplace Sellers", "Retail"],
  },
  "Real Estate VA": {
    slug: "real-estate-va",
    title: "Real Estate Virtual Assistant Services",
    description: "Specialized virtual assistants for real estate agents, brokers, and property management companies.",
    definition:
      "Real Estate VAs provide specialized support for real estate professionals, handling tasks like lead generation, CRM management, transaction coordination, and marketing. They understand the real estate industry's unique workflows and can help agents and brokers scale their operations while maintaining high-quality client relationships.",
    services: [
      "Lead generation and follow-up",
      "CRM management (Follow Up Boss, Chime, etc.)",
      "Transaction coordination",
      "Listing management and updates",
      "Marketing and social media",
      "Open house coordination",
      "Client communication and scheduling",
      "Document preparation and filing",
      "Market research and comps",
      "Referral program management",
    ],
    relatedCategories: ["sales-sdr", "back-office", "general-va"],
    industrySectors: ["Real Estate", "Property Management", "Real Estate Investment"],
  },
  "Accounting / Bookkeeping": {
    slug: "accounting-bookkeeping",
    title: "Accounting & Bookkeeping Services",
    description: "Professional accounting, bookkeeping, and financial administration services.",
    definition:
      "Accounting and bookkeeping outsourcing provides businesses with professional financial management services, including accounts payable, accounts receivable, bank reconciliations, and financial reporting. These services are typically handled by certified accountants and bookkeepers who are proficient in accounting software like QuickBooks, Xero, and other platforms.",
    services: [
      "Accounts payable and receivable",
      "Bank reconciliations",
      "Financial reporting and statements",
      "Invoice processing and management",
      "Expense tracking and categorization",
      "Payroll processing support",
      "Tax preparation assistance",
      "Financial data entry",
      "Budget and forecast preparation",
      "Compliance and audit support",
    ],
    relatedCategories: ["back-office", "general-va"],
    industrySectors: ["All Industries", "Professional Services", "SMB"],
  },
  "Medical Billing": {
    slug: "medical-billing",
    title: "Medical Billing & Healthcare Administration",
    description: "Specialized medical billing, coding, and healthcare administration services.",
    definition:
      "Medical billing and coding services help healthcare providers manage claims submission, payment posting, denial management, and patient billing. These teams are trained in US healthcare regulations, HIPAA compliance, and major billing systems, ensuring accurate and timely reimbursement for medical services.",
    services: [
      "Medical claims processing",
      "ICD-10 and CPT coding",
      "Claims submission and follow-up",
      "Payment posting and reconciliation",
      "Denial management and appeals",
      "Patient billing and collections",
      "HIPAA-compliant data handling",
      "Prior authorization support",
      "Revenue cycle management",
      "Healthcare reporting and analytics",
    ],
    relatedCategories: ["back-office", "accounting-bookkeeping"],
    industrySectors: ["Healthcare", "Medical Practices", "Hospitals", "Clinics"],
  },
  "Tech Support": {
    slug: "tech-support",
    title: "Technical Support Services",
    description: "Technical support teams for software, SaaS, and technology companies.",
    definition:
      "Technical support outsourcing provides specialized help desk and technical assistance for software, SaaS platforms, and technology products. These teams are trained in your products and can handle complex technical inquiries, troubleshooting, bug reporting, and user onboarding. They often provide 24/7 coverage and can scale with your user base.",
    services: [
      "Help desk and ticketing support",
      "Technical troubleshooting",
      "Bug reporting and tracking",
      "User onboarding and training",
      "Product documentation and guides",
      "API and integration support",
      "Account setup and configuration",
      "Technical documentation",
      "User feedback collection",
      "Support analytics and metrics",
    ],
    relatedCategories: ["customer-support", "back-office"],
    industrySectors: ["SaaS", "Fintech", "Software", "Technology"],
  },
  "Back Office": {
    slug: "back-office",
    title: "Back Office Operations",
    description: "Comprehensive back office support including data entry, research, and administrative tasks.",
    definition:
      "Back office operations encompass a wide range of administrative and operational tasks that support business functions but don't directly interact with customers. These include data entry, research, document processing, compliance tasks, and various administrative functions that keep businesses running smoothly.",
    services: [
      "Data entry and processing",
      "Document management and filing",
      "Research and analysis",
      "Compliance and regulatory support",
      "Record keeping and archiving",
      "Database management",
      "Report generation",
      "Quality assurance and auditing",
      "Process documentation",
      "Administrative task automation",
    ],
    relatedCategories: ["general-va", "accounting-bookkeeping", "customer-support"],
    industrySectors: ["All Industries"],
  },
  "Other": {
    slug: "other",
    title: "Other Specialized Services",
    description: "Custom and specialized outsourcing services tailored to unique business needs.",
    definition:
      "Other specialized services cover custom outsourcing needs that don't fit into standard categories. These can include industry-specific support, niche services, or tailored solutions designed for unique business requirements. Many agencies specialize in specific verticals or offer custom service packages.",
    services: [
      "Custom service packages",
      "Industry-specific support",
      "Niche service offerings",
      "Tailored solutions",
      "Specialized project support",
      "Consulting and advisory services",
      "Training and development",
      "Quality assurance and testing",
      "Content moderation",
      "Specialized research and analysis",
    ],
    relatedCategories: [],
    industrySectors: ["All Industries"],
  },
};

/**
 * Get category definition by slug
 */
export function getCategoryBySlug(slug: string): CategoryDefinition | undefined {
  return Object.values(CATEGORIES).find((cat) => cat.slug === slug);
}

/**
 * Get category definition by ServiceCategory
 */
export function getCategoryByServiceCategory(
  serviceCategory: ServiceCategory
): CategoryDefinition {
  return CATEGORIES[serviceCategory];
}

/**
 * Get all categories
 */
export function getAllCategories(): CategoryDefinition[] {
  return Object.values(CATEGORIES);
}

/**
 * Get categories by industry sector
 */
export function getCategoriesBySector(sector: string): CategoryDefinition[] {
  return Object.values(CATEGORIES).filter(
    (cat) => cat.industrySectors?.includes(sector) || cat.industrySectors?.includes("All Industries")
  );
}

