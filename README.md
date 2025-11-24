# SigmaVendor

AI-ready directory and certification hub for virtual assistant and outsourcing agencies, tightly integrated with SigmaRemote for global payroll.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Git Configuration

**IMPORTANT**: This project uses specific git configuration. Before making commits, ensure:

```bash
git config user.name "sigmavendor"
git config user.email "sigmavendor.ogie@gmail.com"
```

**Note**: This project uses SigmaVendor branding only. Do NOT use `office@infinus.rs` or any Infinus-related emails/names.

See `.gitrules` file for more details.

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
SigmaVendor/
├── app/                    # Next.js App Router pages
│   ├── agencies/          # Agency directory and detail pages
│   ├── api/               # API routes
│   ├── certification/     # Certification program page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── agencies/          # Agency-related components
│   ├── layout/            # Layout components (Header, Footer)
│   ├── marketing/         # Marketing components
│   └── ui/                # Reusable UI primitives
├── lib/
│   ├── agencies.ts        # Static agency dataset
│   ├── filters.ts         # Filtering utilities
│   ├── llm.ts             # LLM helpers and JSON Schema
│   ├── seo.ts             # SEO helpers and JSON-LD builders
│   ├── types.ts           # TypeScript type definitions
│   └── utils.ts           # Utility functions
└── public/
    └── llms.txt           # LLM discovery file
```

## Features

- **Agency Directory**: Browse and filter VA agencies by region, services, price, and certifications
- **Agency Profiles**: Detailed agency pages with stats, services, and SigmaRemote integration status
- **Certification Program**: Badge system highlighting agency specialties and payroll readiness
- **AI-Ready**: JSON Schema and LLM endpoints for AI integration
- **SEO Optimized**: JSON-LD structured data on all pages
- **Lead Capture**: Form for buyers to request agency matching

## API Endpoints

- `GET /api/agencies` - List agencies with filters
- `POST /api/search` - Search agencies (future: AI-powered ranking)
- `GET /api/schema/agency` - JSON Schema for Agency entity
- `GET /api/llm/agencies` - LLM-ready agency data with schema

## Tech Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** for styling
- **lucide-react** for icons
- Custom UI components (shadcn/ui inspired)

## Design System

- Light theme with `bg-slate-50` background
- Cards with `rounded-3xl` and subtle shadows
- Premium B2B SaaS aesthetic
- Fully responsive design

## Data

Currently using static TypeScript arrays for agency data. In production, this would be replaced with a database.

## Next Steps

- Add database integration
- Implement AI-powered matching
- Add authentication for agencies
- Connect lead capture to backend
- Add analytics and tracking

## License

Private - SigmaVendor

