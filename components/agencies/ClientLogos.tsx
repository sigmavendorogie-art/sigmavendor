"use client";

import { Card } from "@/components/ui/card";

interface Company {
  name: string;
  logo: string;
}

interface ClientLogosProps {
  companies: Company[];
}

export function ClientLogos({ companies }: ClientLogosProps) {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {companies.map((company, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-3 rounded-lg bg-white border border-slate-200/60 hover:border-slate-300/60 transition-all shadow-sm hover:shadow-md"
        >
          <img
            src={company.logo}
            alt={company.name}
            className="h-8 w-8 object-contain opacity-70 hover:opacity-100 transition-opacity"
            style={{
              filter: 'brightness(0) saturate(100%)',
            }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent && !parent.querySelector('.fallback-text')) {
                const fallback = document.createElement('span');
                fallback.className = 'fallback-text text-slate-700 text-sm font-medium';
                fallback.textContent = company.name;
                parent.appendChild(fallback);
              }
            }}
          />
          <span className="text-sm font-medium text-slate-700 hidden sm:inline">
            {company.name}
          </span>
        </div>
      ))}
    </div>
  );
}

