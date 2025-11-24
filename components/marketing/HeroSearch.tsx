"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const quickFilters = [
  { label: "Philippines VAs", query: "Philippines" },
  { label: "Spanish-speaking sales VAs", query: "Spanish sales" },
  { label: "24/7 support", query: "24/7" },
];

export function HeroSearch() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/agencies?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/agencies");
    }
  };

  const handleQuickFilter = (query: string) => {
    router.push(`/agencies?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="text-center space-y-8 py-16 lg:py-24">
      <div className="space-y-4">
        <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 max-w-3xl mx-auto">
          Find and certify the right VA agency, in minutes
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Browse the directory, or describe what you need and let SigmaVendor AI
          suggest certified VA agencies. Integrated with SigmaRemote for global payroll.
        </p>
      </div>

      <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search agencies by name, service, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
          <Button type="submit" size="lg" className="h-12 px-8">
            Search
          </Button>
        </div>
      </form>

      <div className="flex flex-wrap justify-center gap-2">
        <span className="text-sm text-slate-600">Quick filters:</span>
        {quickFilters.map((filter) => (
          <Badge
            key={filter.label}
            variant="outline"
            className="cursor-pointer hover:bg-slate-100 transition-colors"
            onClick={() => handleQuickFilter(filter.query)}
          >
            {filter.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}

