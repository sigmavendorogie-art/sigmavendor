"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Agency } from "@/lib/types";
import { CertificationBadgesRow } from "@/components/agencies/CertificationBadgesRow";
import { Loader2, Send, Sparkles } from "lucide-react";
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
    <Card className="p-6 lg:p-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-slate-600" />
          <h2 className="text-2xl font-bold text-slate-900">Ask SigmaVendor AI</h2>
        </div>
        <p className="text-slate-600">
          Describe the VA agency you&apos;re looking for and let AI suggest matches.
        </p>
      </div>

      {/* Chat area */}
      <div className="mb-6 space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {messages.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            <p>Start a conversation to find the perfect VA agency for your needs.</p>
            <p className="text-sm mt-2">
              Try: &quot;I need a Spanish-speaking sales team in LATAM&quot;
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFollowUp("I need 24/7 customer support in the Philippines")}
                className="text-xs"
              >
                💬 24/7 Support
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFollowUp("Show me crypto-friendly agencies")}
                className="text-xs"
              >
                ₿ Crypto-Friendly
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFollowUp("I need a sales team in LATAM")}
                className="text-xs"
              >
                🌎 LATAM Sales
              </Button>
            </div>
          </div>
        )}

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
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-900"
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
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
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
                              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                                <div className="space-y-2">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-semibold text-slate-900 truncate">
                                        {agency.name}
                                      </h4>
                                      <p className="text-xs text-slate-600 line-clamp-1">
                                        {agency.tagline}
                                      </p>
                                    </div>
                                  </div>
                                  {reason && (
                                    <p className="text-xs text-slate-700 italic bg-slate-50 p-2 rounded">
                                      {reason}
                                    </p>
                                  )}
                                  <div className="flex items-center gap-2 text-xs text-slate-600">
                                    <span>
                                      ${agency.priceRange.minUsdPerHour}–
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
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-2">
                          Follow-up questions:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {message.followUpQuestions.map((question, qIndex) => (
                            <Button
                              key={qIndex}
                              variant="outline"
                              size="sm"
                              onClick={() => handleFollowUp(question)}
                              className="text-xs"
                            >
                              {question}
                            </Button>
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
            <div className="bg-slate-100 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2 text-slate-600">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input area */}
      <form id="ai-search-form" onSubmit={handleSubmit} className="space-y-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="E.g., 'I need a 24/7 customer support team in the Philippines with crypto-friendly payments'"
          rows={3}
          className="resize-none"
          disabled={isLoading}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Ask AI
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}

