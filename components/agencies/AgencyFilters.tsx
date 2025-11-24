"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Region,
  ServiceCategory,
  CertificationBadge,
  AgencyFilterOptions,
} from "@/lib/types";
import { ChevronDown, ChevronUp } from "lucide-react";

const REGIONS: Region[] = [
  "LATAM",
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "Oceania",
  "Global",
];

const SERVICES: ServiceCategory[] = [
  "General VA",
  "Customer Support",
  "Sales / SDR",
  "E-commerce Support",
  "Real Estate VA",
  "Accounting / Bookkeeping",
  "Medical Billing",
  "Tech Support",
  "Back Office",
  "Other",
];

const CERTIFICATIONS: (CertificationBadge | "Any")[] = [
  "Any",
  "SigmaVerified",
  "PayrollReady",
  "CryptoFriendly",
  "LatamSpecialist",
  "AfricaSpecialist",
];

export function AgencyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [region, setRegion] = useState<Region | "">(
    (searchParams.get("region") as Region) || ""
  );
  const [selectedServices, setSelectedServices] = useState<ServiceCategory[]>(
    searchParams.get("services")
      ? searchParams.get("services")!.split(",") as ServiceCategory[]
      : []
  );
  const [priceMin, setPriceMin] = useState(
    searchParams.get("priceMin") || ""
  );
  const [priceMax, setPriceMax] = useState(
    searchParams.get("priceMax") || ""
  );
  const [certification, setCertification] = useState<
    CertificationBadge | "Any"
  >((searchParams.get("certification") as CertificationBadge | "Any") || "Any");

  const updateFilters = () => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (region) params.set("region", region);
    if (selectedServices.length > 0)
      params.set("services", selectedServices.join(","));
    if (priceMin) params.set("priceMin", priceMin);
    if (priceMax) params.set("priceMax", priceMax);
    if (certification && certification !== "Any")
      params.set("certification", certification);

    router.push(`/agencies?${params.toString()}`);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateFilters();
    }, 300);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, region, selectedServices, priceMin, priceMax, certification]);

  const toggleService = (service: ServiceCategory) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const clearFilters = () => {
    setQuery("");
    setRegion("");
    setSelectedServices([]);
    setPriceMin("");
    setPriceMax("");
    setCertification("Any");
    router.push("/agencies");
  };

  // Collapsible sections state
  const [openSections, setOpenSections] = useState({
    search: true,
    region: true,
    services: true,
    price: true,
    certification: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const FilterSection = ({
    id,
    title,
    children,
    defaultOpen = true,
  }: {
    id: keyof typeof openSections;
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
  }) => {
    const isOpen = openSections[id] ?? defaultOpen;
    return (
      <div className="border-b border-slate-100 last:border-b-0">
        <button
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between py-4 text-left hover:bg-slate-50 -mx-6 px-6 transition-colors"
        >
          <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-slate-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-slate-400" />
          )}
        </button>
        {isOpen && <div className="pb-4 space-y-3">{children}</div>}
      </div>
    );
  };

  return (
    <Card className="sticky top-20">
      <div className="space-y-0">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs h-7"
          >
            Clear
          </Button>
        </div>

        <FilterSection id="search" title="Search">
          <Input
            placeholder="Search agencies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-9 text-sm"
          />
        </FilterSection>

        <FilterSection id="region" title="Region">
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value as Region | "")}
            className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
          >
            <option value="">All Regions</option>
            {REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </FilterSection>

        <FilterSection id="services" title="Services">
          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
            {SERVICES.map((service) => (
              <label
                key={service}
                className="flex items-center space-x-2.5 cursor-pointer group hover:bg-slate-50 -mx-2 px-2 py-1.5 rounded transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service)}
                  onChange={() => toggleService(service)}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 focus:ring-offset-0"
                />
                <span className="text-sm text-slate-700 group-hover:text-slate-900">
                  {service}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection id="price" title="Price Range">
          <div>
            <label className="text-xs text-muted-foreground mb-2 block">
              USD per hour
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                className="h-9 text-sm"
              />
              <Input
                type="number"
                placeholder="Max"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                className="h-9 text-sm"
              />
            </div>
          </div>
        </FilterSection>

        <FilterSection id="certification" title="Certification">
          <select
            value={certification}
            onChange={(e) =>
              setCertification(e.target.value as CertificationBadge | "Any")
            }
            className="flex h-9 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
          >
            {CERTIFICATIONS.map((cert) => (
              <option key={cert} value={cert}>
                {cert === "Any"
                  ? "Any"
                  : cert === "SigmaVerified"
                  ? "Sigma Verified"
                  : cert === "PayrollReady"
                  ? "Payroll Ready"
                  : cert === "CryptoFriendly"
                  ? "Crypto Friendly"
                  : cert === "LatamSpecialist"
                  ? "LATAM Specialist"
                  : "Africa Specialist"}
              </option>
            ))}
          </select>
        </FilterSection>
      </div>
    </Card>
  );
}

