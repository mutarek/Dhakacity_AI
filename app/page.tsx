"use client";

import { useState } from "react";
import { ChatBox } from "@/components/chat-box";
import { CategoryButtons } from "@/components/category-buttons";
import { PlaceCard } from "@/components/place-card";
import { Place } from "@/types/place";

const QUICK_QUERIES = [
  "Best biryani nearby",
  "Hospitals in Dhanmondi",
  "Open 24h pharmacy",
  "Coffee shop",
  "Diagnostic center",
];

export default function Home() {
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Place[]>([]);

  const handleChatSubmit = async (message: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: message }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to get AI response");
      }

      setAnswer(data.answer ?? "Here are some recommendations.");
      setResults(data.places ?? []);
      setShowResults(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Failed to get AI response",
      );
      setResults([]);
      setShowResults(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* ── Hero ── */}
      <section className="w-full bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 py-14 md:py-20">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 px-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-semibold text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-green-300" />
            AI-Powered Local Discovery
          </span>
          <h1 className="text-balance text-4xl font-black leading-tight text-white md:text-5xl">
            Find trusted places<br className="hidden sm:block" /> in Dhaka — instantly
          </h1>
          <p className="max-w-md text-base text-teal-100 md:text-lg">
            Restaurants, hospitals, pharmacies and more. Ask in plain English.
          </p>
          <ChatBox onSubmit={handleChatSubmit} isLoading={isLoading} />
          <div className="flex flex-wrap justify-center gap-2">
            {QUICK_QUERIES.map((q) => (
              <button
                key={q}
                onClick={() => handleChatSubmit(q)}
                disabled={isLoading}
                className="rounded-full border border-white/25 bg-white/15 px-3.5 py-1.5 text-xs font-medium text-white/90 transition-colors hover:bg-white/25 disabled:opacity-60"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="w-full bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
          {showResults ? (
            <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2">
              <button
                onClick={() => setShowResults(false)}
                className="flex items-center gap-1 text-sm font-medium text-teal-600 hover:underline"
              >
                ← Browse categories
              </button>
              {answer && (
                <div className="rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">AI Response</p>
                  <p className="text-gray-800">{answer}</p>
                </div>
              )}
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}
              {results.length === 0 && !error && (
                <p className="text-sm text-gray-500">No matching places found.</p>
              )}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Browse by category</h2>
                <p className="mt-1 text-sm text-gray-500">Tap a category to explore places in Dhaka</p>
              </div>
              <CategoryButtons />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
