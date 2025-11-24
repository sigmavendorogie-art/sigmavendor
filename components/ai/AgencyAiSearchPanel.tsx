"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Agency } from "@/lib/types";
import { CertificationBadgesRow } from "@/components/agencies/CertificationBadgesRow";
import { Loader2, Send } from "lucide-react";
import Link from "next/link";

type ConversationMessage =
  | { role: "user"; content: string }
  | {
      role: "assistant";
      content: string;
      summary?: string;
      agencies?: Agency[];
      agencyReasons?: Record<string, string>;
      followUpQuestions?: string[];
    };

export function AgencyAiSearchPanel() {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim();
    if (!query || isLoading) return;

    // Add user message
    const userMessage: ConversationMessage = { role: "user", content: query };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Build history from messages (last 4 messages for context)
      const history = messages
        .slice(-4)
        .map((msg) => ({
          role: msg.role as "user" | "assistant",
          content: msg.role === "user" ? msg.content : msg.summary || msg.content,
        }));

      // Call API
      const response = await fetch("/api/ai-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, history }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();

      // Add assistant message
      const assistantMessage: ConversationMessage = {
        role: "assistant",
        content: data.summary,
        summary: data.summary,
        agencies: data.agencies || [],
        agencyReasons: data.agencyReasons || {},
        followUpQuestions: data.followUpQuestions || [],
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("AI search error:", error);
      const errorMessage: ConversationMessage = {
        role: "assistant",
        content:
          "We're sorry, but AI search is temporarily unavailable. This could be due to a service issue or network problem. Please try again in a moment, or use the filters on the Agencies page to find agencies manually.",
        summary:
          "AI search is temporarily unavailable. Please try again or use the filters on the Agencies page.",
        agencies: [],
        agencyReasons: {},
        followUpQuestions: [
          "Try searching again",
          "Browse agencies by filters",
          "What region are you interested in?",
        ],
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollowUp = (question: string) => {
    setInput(question);
    // Auto-submit after a brief delay to allow state update
    setTimeout(() => {
      const form = document.getElementById("ai-search-form") as HTMLFormElement;
      if (form) {
        form.requestSubmit();
      }
    }, 100);
  };

  return (
    <div className="p-6 lg:p-8 bg-black text-white rounded-xl border border-white/15 shadow-sm bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-gradient-3.svg')] bg-center bg-cover relative overflow-hidden">
      <div className="relative z-10 mb-6">
        <h2 className="text-2xl font-semibold mb-2">
          <span className="bg-gradient-to-r from-white via-white to-[#748298] bg-clip-text text-transparent" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Find agencies with AI
          </span>
        </h2>
        <p className="text-slate-300 mb-4">
          Get matched with certified teams - tailored to your brief.
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>🔒 Private & secure • LLM-matched</span>
        </div>
      </div>

      {/* Chat area */}
      <div className="relative z-10 mb-6 space-y-4 max-h-[600px] overflow-y-auto pr-2">

        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === "user"
                  ? "bg-white/10 text-white"
                  : "bg-white/5 text-white border border-white/10"
              }`}
            >
              {message.role === "user" ? (
                <p className="text-sm">{message.content}</p>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm whitespace-pre-wrap">{message.summary || message.content}</p>

                  {/* Recommended agencies */}
                  {message.agencies && message.agencies.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                        Recommended Agencies ({message.agencies.length})
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {message.agencies.map((agency) => {
                          const reason = message.agencyReasons?.[agency.id];
                          return (
                            <Link
                              key={agency.id}
                              href={`/agencies/${agency.slug}`}
                              className="block"
                            >
                              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer bg-white/5 border-white/10">
                                <div className="space-y-2">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-semibold text-white truncate">
                                        {agency.name}
                                      </h4>
                                      <p className="text-xs text-slate-300 line-clamp-1">
                                        {agency.tagline}
                                      </p>
                                    </div>
                                  </div>
                                  {reason && (
                                    <p className="text-xs text-slate-300 italic bg-white/5 p-2 rounded border border-white/10">
                                      {reason}
                                    </p>
                                  )}
                                  <div className="flex items-center gap-2 text-xs text-slate-300">
                                    <span>
                                      ${agency.priceRange.minUsdPerHour}-
                                      {agency.priceRange.maxUsdPerHour}/hr
                                    </span>
                                    <span>•</span>
                                    <span>{agency.hqLocation.country}</span>
                                  </div>
                                  <CertificationBadgesRow
                                    certifications={agency.certifications}
                                  />
                                  {agency.isSigmaRemotePartner && (
                                    <Badge variant="default" className="text-xs">
                                      SigmaRemote Partner
                                    </Badge>
                                  )}
                                </div>
                              </Card>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Follow-up questions */}
                  {message.followUpQuestions &&
                    message.followUpQuestions.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-300 mb-2">
                          Follow-up questions:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {message.followUpQuestions.map((question, qIndex) => (
                            <span
                              key={qIndex}
                              onClick={() => handleFollowUp(question)}
                              className="bg-white/10 text-sm text-white px-3 py-1 rounded-full cursor-pointer hover:bg-white/20 transition-colors"
                            >
                              {question}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2 text-white">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <form id="ai-search-form" onSubmit={handleSubmit} className="relative z-10 space-y-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='E.g., "24/7 support team in the Philippines with crypto-friendly payouts"'
          rows={3}
          className="bg-white/10 border border-white/20 rounded-md text-white placeholder:text-gray-400 focus:bg-white/15 p-3 w-full resize-none focus:outline-none focus:ring-2 focus:ring-white/20"
          disabled={isLoading}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Ask AI
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

