/**
 * AI Client for SigmaVendor
 * 
 * Wraps access to OpenAI (or compatible) chat models.
 * 
 * Setup:
 * - Set OPENAI_API_KEY in your .env.local file
 * - Example: OPENAI_API_KEY=sk-...
 * 
 * In production, use a cost-effective model like gpt-4o-mini or gpt-4-turbo-preview
 * for better cost/performance balance.
 */

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatCompletionOptions {
  messages: ChatMessage[];
}

export async function callChatModel(
  options: ChatCompletionOptions
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.warn(
      "OPENAI_API_KEY is not set. Returning a mock AI response."
    );
    // Return a simple mock to avoid crashing in dev without key.
    return JSON.stringify({
      summary:
        "AI search is not configured yet. This is a mock summary. Please set OPENAI_API_KEY in your .env.local file to enable AI search.",
      agencies: [],
      followUpQuestions: [
        "What region do you prefer?",
        "What is your budget per hour?",
        "Do you need sales, support, or back office?",
      ],
    });
  }

  try {
    // Use OpenAI SDK
    const { OpenAI } = await import("openai");
    const client = new OpenAI({ apiKey });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // Cost-effective model, adjust as needed
      messages: options.messages,
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("Empty AI response");
    }

    return content;
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    // Return a fallback response
    return JSON.stringify({
      summary:
        "We encountered an error processing your request. Please try again or use the standard filters.",
      agencies: [],
      followUpQuestions: [
        "What region are you interested in?",
        "What is your budget per hour?",
        "What type of services do you need?",
      ],
    });
  }
}





