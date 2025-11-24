import { NextRequest, NextResponse } from "next/server";
import { getAllAgencies } from "@/lib/agencies";
import { filterAgencies } from "@/lib/filters";
import { AgencyFilterOptions } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, filters } = body;

    const options: AgencyFilterOptions = {
      query: query || filters?.query,
      region: filters?.region,
      services: filters?.services,
      priceMin: filters?.priceMin,
      priceMax: filters?.priceMax,
      certification: filters?.certification,
    };

    const allAgencies = getAllAgencies();
    const filtered = filterAgencies(allAgencies, options);

    // TODO: In future versions, this endpoint will apply AI-based scoring and ranking
    // to the filtered results based on the query and filters.

    return NextResponse.json({
      agencies: filtered,
      meta: {
        total: filtered.length,
        queryApplied: !!query,
      },
    });
  } catch (error) {
    console.error("Error searching agencies:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

