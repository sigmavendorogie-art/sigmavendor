import { NextRequest, NextResponse } from "next/server";

/**
 * Lead Capture API Endpoint
 * 
 * Stores lead information and search state for retargeting and analytics.
 * 
 * FUTURE EXTENSION: This will integrate with Supabase:
 * - Store leads in `leads` table
 * - Store search sessions in `search_sessions` table
 * - Trigger email notifications
 * - Track conversion funnel
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, companySize, description, answers, matchedAgencies } = body;

    // Validate required fields
    if (!name || !email || !description) {
      return NextResponse.json(
        { error: "Name, email, and description are required" },
        { status: 400 }
      );
    }

    // TODO: Store in Supabase
    // const { data, error } = await supabase
    //   .from('leads')
    //   .insert({
    //     name,
    //     email,
    //     company_size: companySize,
    //     description,
    //     search_answers: answers,
    //     matched_agency_ids: matchedAgencies,
    //     created_at: new Date().toISOString(),
    //   });

    // For now, just log and return success
    console.log("Lead captured:", {
      name,
      email,
      companySize,
      description,
      answers,
      matchedAgencies,
    });

    return NextResponse.json({
      success: true,
      message: "Lead captured successfully",
    });
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

