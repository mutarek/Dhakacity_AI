"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { SearchFilters } from "@/components/search-filters";
import { PlaceCard } from "@/components/place-card";
import { Button } from "@/components/ui/button";
import { Place } from "@/types/place";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState(categoryParam || "all");
  const [openNow, setOpenNow] = useState(false);
  const [priceRange, setPriceRange] = useState("all");
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  useEffect(() => {
    const controller = new AbortController();

    async function loadPlaces() {
      setIsLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (searchQuery.trim()) params.set("q", searchQuery.trim());
        if (category !== "all") params.set("category", category);
        if (openNow) params.set("openNow", "true");
        if (priceRange !== "all") params.set("priceRange", priceRange);
        if (location) {
          params.set("lat", String(location.lat));
          params.set("lng", String(location.lng));
        }

        const response = await fetch(`/api/places?${params.toString()}`, {
          signal: controller.signal,
          cache: "no-store",
        });

        const raw = await response.text();
        const data = raw ? (JSON.parse(raw) as { error?: string; places?: Place[] }) : {};

        if (!response.ok) {
          throw new Error(data.error || "Failed to load places");
        }

        setFilteredPlaces(data.places ?? []);
      } catch (fetchError) {
        if ((fetchError as Error).name === "AbortError") {
          return;
        }

        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Failed to load places",
        );
        setFilteredPlaces([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadPlaces();

    return () => {
      controller.abort();
    };
  }, [searchQuery, category, openNow, priceRange, location]);

  // Set initial category from URL params
  useEffect(() => {
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [categoryParam]);

  const handleNearMe = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported in this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => {
        setError("Unable to access location. Please allow location permission.");
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const clearNearMe = () => {
    setLocation(null);
  };

  return (
    <div className="w-full px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-7xl space-y-6 md:space-y-8">
        {/* Search Bar */}
        <div className="rounded-3xl border border-white/70 bg-white/75 p-5 shadow-[0_22px_65px_-40px_rgba(15,23,42,0.75)] backdrop-blur-sm md:p-7">
          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Search Places
            </h1>
            <p className="text-sm text-foreground/70 md:text-base">
              Filter by category, availability, and budget to find the right
              place fast.
            </p>
          </div>
          <Input
            type="text"
            placeholder="Search by name, location, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-4 h-12 max-w-2xl text-base"
          />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
              onClick={handleNearMe}
            >
              Use My Location
            </Button>
            {location ? (
              <Button
                type="button"
                variant="ghost"
                className="rounded-xl"
                onClick={clearNearMe}
              >
                Clear Near Me
              </Button>
            ) : null}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[310px_1fr]">
          {/* Filters Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <SearchFilters
              category={category}
              openNow={openNow}
              priceRange={priceRange}
              onCategoryChange={setCategory}
              onOpenNowChange={setOpenNow}
              onPriceRangeChange={setPriceRange}
            />
          </aside>

          {/* Results */}
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-white/70 bg-white/70 px-4 py-3">
              <h2 className="text-lg font-semibold md:text-xl">
                {filteredPlaces.length} places found
              </h2>
              {isLoading ? (
                <span className="text-sm text-foreground/60">Loading...</span>
              ) : null}
            </div>

            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            {filteredPlaces.length === 0 ? (
              <div className="rounded-2xl border border-white/70 bg-white/70 py-12 text-center">
                <p className="text-lg text-muted-foreground">
                  No places found matching your criteria
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {filteredPlaces.map((place) => (
                  <PlaceCard key={place.id} place={place} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="w-full px-4 py-8">Loading search...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
