"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AgencyCard } from "@/components/agencies/AgencyCard";
import { Agency } from "@/lib/types";
import { Sparkles, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

type FunnelStep = "describe" | "questions" | "results" | "capture";

interface FunnelState {
  step: FunnelStep;
  description: string;
  answers: Record<string, string>;
  matchedAgencies: Agency[];
  followUpQuestions: string[];
  isLoading: boolean;
}

export function AiLeadFunnel() {
  const [state, setState] = useState<FunnelState>({
    step: "describe",
    description: "",
    answers: {},
    matchedAgencies: [],
    followUpQuestions: [],
    isLoading: false,
  });

  const handleDescribeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.description.trim()) return;

    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      // Call AI search API
      const response = await fetch("/api/ai-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: state.description,
          history: [],
        }),
      });

      const data = await response.json();

      if (data.followUpQuestions && data.followUpQuestions.length > 0) {
        // Move to questions step
        setState((prev) => ({
          ...prev,
          step: "questions",
          followUpQuestions: data.followUpQuestions,
          matchedAgencies: data.agencies || [],
          isLoading: false,
        }));
      } else if (data.agencies && data.agencies.length > 0) {
        // Move directly to results
        setState((prev) => ({
          ...prev,
          step: "results",
          matchedAgencies: data.agencies || [],
          isLoading: false,
        }));
      } else {
        // No matches, show results anyway
        setState((prev) => ({
          ...prev,
          step: "results",
          matchedAgencies: [],
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error("AI search error:", error);
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleQuestionAnswer = (question: string, answer: string) => {
    const newAnswers = { ...state.answers, [question]: answer };
    setState((prev) => ({ ...prev, answers: newAnswers }));

    // Auto-advance if all questions answered
    const answeredCount = Object.keys(newAnswers).length;
    if (answeredCount >= state.followUpQuestions.length) {
      // Refine search with answers
      refineSearch(newAnswers);
    }
  };

  const refineSearch = async (answers: Record<string, string>) => {
    setState((prev) => ({ ...prev, isLoading: true }));

    const refinedQuery = `${state.description}\n\nAdditional details:\n${Object.entries(answers)
      .map(([q, a]) => `${q}: ${a}`)
      .join("\n")}`;

    try {
      const response = await fetch("/api/ai-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: refinedQuery,
          history: [],
        }),
      });

      const data = await response.json();
      setState((prev) => ({
        ...prev,
        step: "results",
        matchedAgencies: data.agencies || [],
        isLoading: false,
      }));
    } catch (error) {
      console.error("Refined search error:", error);
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleSkipToResults = () => {
    setState((prev) => ({ ...prev, step: "results" }));
  };

  const handleViewResults = () => {
    setState((prev) => ({ ...prev, step: "capture" }));
  };

  const handleLeadCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const leadData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      companySize: formData.get("companySize") as string,
      description: state.description,
      answers: state.answers,
      matchedAgencies: state.matchedAgencies.map((a) => a.id),
    };

    try {
      // Save lead to API
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      });

      setState((prev) => ({ ...prev, step: "results" }));
    } catch (error) {
      console.error("Lead capture error:", error);
    }
  };

  return (
    <section id="ai-lead-funnel" className="py-16 lg:py-24">
      <div className="max-w-4xl mx-auto">
        {/* Step 1: Describe */}
        {state.step === "describe" && (
          <Card className="p-8 lg:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                <Sparkles className="h-8 w-8 text-slate-900" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Tell us what you need
              </h2>
              <p className="text-slate-600">
                Describe your outsourcing needs and we&apos;ll use AI to find the perfect agencies for you.
              </p>
            </div>

            <form onSubmit={handleDescribeSubmit} className="space-y-6">
              <Textarea
                value={state.description}
                onChange={(e) =>
                  setState((prev) => ({ ...prev, description: e.target.value }))
                }
                placeholder="E.g., 'I need a 24/7 customer support team in the Philippines with crypto-friendly payments. Team size: 5-10 people. Budget: $5-10/hr.'"
                rows={6}
                className="resize-none"
                disabled={state.isLoading}
                required
              />
              <Button type="submit" size="lg" className="w-full" disabled={state.isLoading}>
                {state.isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Finding matches...
                  </>
                ) : (
                  <>
                    Find matches
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </Card>
        )}

        {/* Step 2: Follow-up Questions */}
        {state.step === "questions" && (
          <Card className="p-8 lg:p-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                A few quick questions to refine your search
              </h2>
              <p className="text-slate-600">
                Help us understand your needs better to find the perfect match.
              </p>
            </div>

            <div className="space-y-6">
              {state.followUpQuestions.map((question, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {question}
                  </label>
                  <Input
                    value={state.answers[question] || ""}
                    onChange={(e) => handleQuestionAnswer(question, e.target.value)}
                    placeholder="Your answer..."
                    className="w-full"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              <Button
                onClick={() => refineSearch(state.answers)}
                size="lg"
                disabled={state.isLoading}
                className="flex-1"
              >
                {state.isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Refining...
                  </>
                ) : (
                  "Refine matches"
                )}
              </Button>
              <Button
                onClick={handleSkipToResults}
                variant="outline"
                size="lg"
              >
                Skip to results
              </Button>
            </div>
          </Card>
        )}

        {/* Step 3: Results */}
        {state.step === "results" && (
          <div className="space-y-8">
            <Card className="p-8">
              <div className="text-center mb-8">
                <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  {state.matchedAgencies.length > 0
                    ? `We found ${state.matchedAgencies.length} matching agencies`
                    : "No exact matches found"}
                </h2>
                <p className="text-slate-600">
                  {state.matchedAgencies.length > 0
                    ? "Review the agencies below and get in touch to compare options."
                    : "Try adjusting your search criteria or browse all agencies."}
                </p>
              </div>

              {state.matchedAgencies.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {state.matchedAgencies.slice(0, 4).map((agency) => (
                      <AgencyCard key={agency.id} agency={agency} />
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button onClick={handleViewResults} size="lg" className="flex-1">
                      Get contact details & compare
                    </Button>
                    <Link href="/agencies" className="flex-1">
                      <Button variant="outline" size="lg" className="w-full">
                        Browse all agencies
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <Link href="/agencies">
                    <Button size="lg">Browse all agencies</Button>
                  </Link>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Step 4: Lead Capture */}
        {state.step === "capture" && (
          <Card className="p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                Get full access to agency details
              </h2>
              <p className="text-slate-600">
                Share your contact info to receive detailed agency profiles and comparison data.
              </p>
            </div>

            <form onSubmit={handleLeadCapture} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Name
                </label>
                <Input name="name" type="text" required placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Work email
                </label>
                <Input name="email" type="email" required placeholder="you@company.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Company size
                </label>
                <select
                  name="companySize"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md"
                  required
                >
                  <option value="">Select size...</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-1000">201-1000 employees</option>
                  <option value="1000+">1000+ employees</option>
                </select>
              </div>
              <Button type="submit" size="lg" className="w-full">
                Get agency details
              </Button>
            </form>
          </Card>
        )}
      </div>
    </section>
  );
}

