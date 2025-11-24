import { NextResponse } from "next/server";
import { getAgencyJsonSchema } from "@/lib/llm";

export async function GET() {
  try {
    const schema = getAgencyJsonSchema();
    return NextResponse.json(schema);
  } catch (error) {
    console.error("Error fetching schema:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

