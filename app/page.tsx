"use client";

import { useState } from "react";
import { ChatBox } from "@/components/chat-box";
import { CategoryButtons } from "@/components/category-buttons";
import { PlaceCard } from "@/components/place-card";
import { Place } from "@/types/place";

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
    <div className="w-full px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-7xl flex flex-col items-center gap-8 md:gap-10">
        {/* Hero Section */}
        <div className="w-full max-w-5xl rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_20px_70px_-35px_rgba(15,23,42,0.45)] backdrop-blur-sm md:p-10">
          <div className="flex flex-col gap-6 text-center md:gap-8">
            <div className="inline-flex items-center justify-center gap-2 self-center rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1 text-xs font-bold tracking-[0.14em] text-cyan-700 uppercase">
              Local Discovery Assistant
            </div>
            <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-transparent md:text-6xl bg-gradient-to-r from-cyan-700 via-emerald-700 to-amber-600 bg-clip-text">
              Ask Dhaka AI. Find trusted places in seconds.
            </h1>
            <p className="mx-auto max-w-3xl text-base text-foreground/80 md:text-xl">
              Restaurants, hospitals, diagnostics, and quick nearby options,
              tailored for Dhanmondi with a clean mobile-first experience.
            </p>
            <div className="grid grid-cols-2 gap-3 text-left md:grid-cols-4">
              <div className="rounded-2xl border border-cyan-100 bg-cyan-50/80 px-4 py-3">
                <p className="text-xs font-semibold text-cyan-700">Places</p>
                <p className="text-xl font-bold text-cyan-900">10+</p>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 px-4 py-3">
                <p className="text-xs font-semibold text-emerald-700">Categories</p>
                <p className="text-xl font-bold text-emerald-900">3</p>
              </div>
              <div className="rounded-2xl border border-amber-100 bg-amber-50/80 px-4 py-3">
                <p className="text-xs font-semibold text-amber-700">Navigation</p>
                <p className="text-xl font-bold text-amber-900">Fast</p>
              </div>
              <div className="rounded-2xl border border-violet-100 bg-violet-50/80 px-4 py-3">
                <p className="text-xs font-semibold text-violet-700">Designed</p>
                <p className="text-xl font-bold text-violet-900">Mobile First</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Box */}
        <ChatBox onSubmit={handleChatSubmit} isLoading={isLoading} />

        {/* AI Results */}
        {showResults && (
          <div className="w-full max-w-4xl space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-xl font-semibold">
              {answer ?? "Here are some recommendations:"}
            </h2>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            {results.length === 0 ? (
              <p className="text-muted-foreground">No matching places found yet.</p>
            ) : null}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {results.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          </div>
        )}

        {/* Category Buttons */}
        {!showResults && (
          <div className="w-full flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">Or browse by category</p>
            <CategoryButtons />
          </div>
        )}
      </div>
    </div>
  );
}
