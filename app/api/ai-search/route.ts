import { NextRequest, NextResponse } from "next/server";
import { runAiAgencySearch } from "@/lib/aiSearch";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = (body?.query ?? "").trim();
    const history = body?.history ?? [];

    if (!query) {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    const result = await runAiAgencySearch({ query, history });

    // Convert Map to object for JSON serialization
    const agencyReasonsObj: Record<string, string> = {};
    result.agencyReasons.forEach((reason, id) => {
      agencyReasonsObj[id] = reason;
    });

    // Optionally trim long descriptions to reduce payload size
    const trimmedResult = {
      summary: result.summary,
      agencies: result.agencies.map((agency) => ({
        ...agency,
        longDescription: undefined, // Omit for smaller payload
      })),
      agencyReasons: agencyReasonsObj,
      followUpQuestions: result.followUpQuestions,
    };

    return NextResponse.json(trimmedResult);
  } catch (error) {
    console.error("AI search error", error);
    return NextResponse.json(
      {
        summary: "We hit an error running AI search.",
        agencies: [],
        agencyReasons: {},
        followUpQuestions: [
          "Can you try again with a simpler query?",
          "What region and budget do you have in mind?",
        ],
      },
      { status: 500 }
    );
  }
}

