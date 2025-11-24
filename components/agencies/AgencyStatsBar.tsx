import { Agency } from "@/lib/types";
import { Users, DollarSign, Globe, Languages } from "lucide-react";

export function AgencyStatsBar({ agency }: { agency: Agency }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-slate-200">
      {agency.teamSize && (
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-100 rounded-lg">
            <Users className="h-5 w-5 text-slate-600" />
          </div>
          <div>
            <p className="text-sm text-slate-600">Team Size</p>
            <p className="text-lg font-semibold text-slate-900">
              {agency.teamSize.min}-{agency.teamSize.max}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-100 rounded-lg">
          <DollarSign className="h-5 w-5 text-slate-600" />
        </div>
        <div>
          <p className="text-sm text-slate-600">Price Range</p>
          <p className="text-lg font-semibold text-slate-900">
            ${agency.priceRange.minUsdPerHour}-{agency.priceRange.maxUsdPerHour}/hr
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-100 rounded-lg">
          <Globe className="h-5 w-5 text-slate-600" />
        </div>
        <div>
          <p className="text-sm text-slate-600">Regions</p>
          <p className="text-lg font-semibold text-slate-900">
            {agency.regionsServed.slice(0, 2).join(", ")}
            {agency.regionsServed.length > 2 && " +"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-100 rounded-lg">
          <Languages className="h-5 w-5 text-slate-600" />
        </div>
        <div>
          <p className="text-sm text-slate-600">Languages</p>
          <p className="text-lg font-semibold text-slate-900">
            {agency.languages.slice(0, 2).join(", ")}
            {agency.languages.length > 2 && " +"}
          </p>
        </div>
      </div>
    </div>
  );
}

