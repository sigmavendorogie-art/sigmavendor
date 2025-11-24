/**
 * AI Search Orchestrator for SigmaVendor
 * 
 * Handles AI-powered agency search with natural language queries.
 * Uses the agencies dataset as context and returns structured results.
 * 
 * FUTURE EXTENSION HOOKS:
 * 
 * 1. Supabase Integration:
 *    - Replace getAllAgencies() with Supabase query
 *    - Cache agency context for better performance
 *    - Store search queries and results for analytics
 * 
 * 2. Enhanced AI Matching:
 *    - Use vector embeddings for semantic search
 *    - Implement hybrid search (keyword + semantic)
 *    - Add learning from user feedback to improve matching
 * 
 * 3. Real-time Updates:
 *    - Subscribe to agency updates via Supabase realtime
 *    - Invalidate cache when agencies change
 *    - Update AI context automatically
 */

import { Agency, Region, ServiceCategory } from "./types";
import { getAllAgencies } from "./agencies";
import { callChatModel, ChatMessage } from "./aiClient";

export interface AiSearchRequest {
  query: string;
  history?: { role: "user" | "assistant"; content: string }[];
}

export interface AiSearchResult {
  summary: string;
  agencies: Agency[];
  agencyReasons: Map<string, string>; // Map of agency ID to AI reason
  followUpQuestions: string[];
}

interface AgencyLite {
  id: string;
  reason: string;
}

interface AiResponse {
  summary: string;
  agencies: AgencyLite[];
  followUpQuestions: string[];
}

/**
 * Build a compact representation of agencies for the AI model context
 */
function buildAgencyContext(agencies: Agency[]): string {
  return JSON.stringify(
    agencies.map((a) => ({
      id: a.id,
      slug: a.slug,
      name: a.name,
      tagline: a.tagline,
      shortDescription: a.shortDescription,
      regionsServed: a.regionsServed,
      services: a.services,
      priceRange: a.priceRange,
      isSigmaRemotePartner: a.isSigmaRemotePartner,
      certifications: a.certifications,
      primaryUseCases: a.primaryUseCases,
    }))
  );
}

/**
 * Run AI-powered agency search
 */
export async function runAiAgencySearch(
  input: AiSearchRequest
): Promise<AiSearchResult> {
  try {
    // 1. Load all agencies
    const agencies = getAllAgencies();

    // 2. Build context string
    const context = buildAgencyContext(agencies);

    // 3. Create system message
    const systemMessage: ChatMessage = {
      role: "system",
      content: [
        "You are SigmaVendor AI, an expert assistant that matches users with virtual assistant and outsourcing agencies.",
        "You ONLY use the list of agencies given in the context below. Do not invent agencies.",
        "You MUST answer strictly in valid JSON, with this exact shape:",
        "{",
        '  "summary": string,',
        '  "agencies": AgencyLite[],',
        '  "followUpQuestions": string[]',
        "}",
        "",
        "Where AgencyLite is:",
        "{",
        '  "id": string,',
        '  "reason": string',
        "}",
        "",
        "The `reason` field explains why that agency is a good match (1-2 sentences).",
        "Do not include fields other than summary, agencies, followUpQuestions.",
        "",
        "Guidelines:",
        "- If the user query is vague or missing important details (e.g. region, budget, service type),",
        "  propose 2-4 follow-up questions in `followUpQuestions`.",
        "- If you cannot find any matching agencies, return an empty agencies array and use",
        "  `summary` to explain why and suggest what they might look for instead.",
        "- Prioritize agencies that match multiple criteria from the user query.",
        "- Consider price range, region, services, and certifications when matching.",
        "",
        "Context agencies JSON:",
        context,
      ].join("\n"),
    };

    // 4. Build user message
    const userMessage: ChatMessage = {
      role: "user",
      content: [
        "User query:",
        input.query,
        "",
        "Analyze the query and match it to agencies from the context. Return your response as JSON.",
      ].join("\n"),
    };

    // 5. Build messages array with history
    const historyMessages: ChatMessage[] =
      input.history?.slice(-6).map((h) => ({
        role: h.role as "user" | "assistant",
        content: h.content,
      })) || [];

    const messages: ChatMessage[] = [
      systemMessage,
      ...historyMessages,
      userMessage,
    ];

    // 6. Call AI model
    const raw = await callChatModel({ messages });

    // 7. Parse JSON response
    let aiResponse: AiResponse;
    try {
      aiResponse = JSON.parse(raw);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      throw new Error("Invalid AI response format");
    }

    // Validate response structure
    if (
      typeof aiResponse.summary !== "string" ||
      !Array.isArray(aiResponse.agencies) ||
      !Array.isArray(aiResponse.followUpQuestions)
    ) {
      throw new Error("Invalid AI response structure");
    }

    // 8. Map agency IDs back to full Agency objects
    const agencyMap = new Map(agencies.map((a) => [a.id, a]));
    const matchedAgencies: Agency[] = [];
    const agencyReasons = new Map<string, string>();

    for (const agencyLite of aiResponse.agencies) {
      const fullAgency = agencyMap.get(agencyLite.id);
      if (fullAgency) {
        matchedAgencies.push(fullAgency);
        if (agencyLite.reason) {
          agencyReasons.set(agencyLite.id, agencyLite.reason);
        }
      }
    }

    // 9. Return result
    return {
      summary: aiResponse.summary,
      agencies: matchedAgencies,
      agencyReasons,
      followUpQuestions: aiResponse.followUpQuestions || [],
    };
  } catch (error) {
    console.error("AI search error:", error);

    // Return safe fallback
    return {
      summary:
        "We couldn't run AI search right now. Please use the standard filters on the Agencies page.",
      agencies: [],
      agencyReasons: new Map(),
      followUpQuestions: [
        "What region are you interested in?",
        "What is your budget per hour?",
        "What type of services do you need?",
      ],
    };
  }
}

