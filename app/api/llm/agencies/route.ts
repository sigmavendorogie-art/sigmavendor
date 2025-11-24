import { NextRequest, NextResponse } from "next/server";
import { getAllAgencies } from "@/lib/agencies";
import { filterAgencies } from "@/lib/filters";
import { buildLlmAgencyResponse } from "@/lib/llm";
import { AgencyFilterOptions, Region, ServiceCategory, CertificationBadge } from "@/lib/types";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const options: AgencyFilterOptions = {
      query: searchParams.get("q") || undefined,
      region: (searchParams.get("region") as Region) || undefined,
      services: searchParams.get("services")
        ? (searchParams.get("services")!.split(",") as ServiceCategory[])
        : undefined,
      priceMin: searchParams.get("priceMin")
        ? Number.parseFloat(searchParams.get("priceMin")!)
        : undefined,
      priceMax: searchParams.get("priceMax")
        ? Number.parseFloat(searchParams.get("priceMax")!)
        : undefined,
      certification: (searchParams.get("certification") as CertificationBadge | "Any") || undefined,
    };

    const allAgencies = getAllAgencies();
    const filtered = filterAgencies(allAgencies, options);
    const response = buildLlmAgencyResponse(filtered);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching LLM agencies:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

