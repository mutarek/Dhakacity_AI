"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFiltersProps {
  category: string;
  openNow: boolean;
  priceRange: string;
  onCategoryChange: (category: string) => void;
  onOpenNowChange: (checked: boolean) => void;
  onPriceRangeChange: (range: string) => void;
}

export function SearchFilters({
  category,
  openNow,
  priceRange,
  onCategoryChange,
  onOpenNowChange,
  onPriceRangeChange,
}: SearchFiltersProps) {
  return (
    <Card className="rounded-3xl border border-white/70 bg-white/80 shadow-[0_18px_60px_-40px_rgba(15,23,42,0.75)]">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h3 className="text-base font-bold tracking-tight">Filters</h3>

          {/* Category Filter */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={category}
              onValueChange={(value) => {
                if (value !== null) {
                  onCategoryChange(value);
                }
              }}
            >
              <SelectTrigger id="category" className="w-full rounded-xl border-cyan-100 bg-cyan-50/70">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="restaurant">🍽️ Restaurants</SelectItem>
                <SelectItem value="hospital">🏥 Hospitals</SelectItem>
                <SelectItem value="diagnostic">🔬 Diagnostics</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Open Now Filter */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="openNow"
              checked={openNow}
              onCheckedChange={(checked) =>
                onOpenNowChange(checked as boolean)
              }
            />
            <Label
              htmlFor="openNow"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Open Now
            </Label>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2">
            <Label htmlFor="priceRange">Price Range</Label>
            <Select
              value={priceRange}
              onValueChange={(value) => {
                if (value !== null) {
                  onPriceRangeChange(value);
                }
              }}
            >
              <SelectTrigger id="priceRange" className="w-full rounded-xl border-cyan-100 bg-cyan-50/70">
                <SelectValue placeholder="All prices" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="৳">৳ Budget</SelectItem>
                <SelectItem value="৳৳">৳৳ Moderate</SelectItem>
                <SelectItem value="৳৳৳">৳৳৳ Expensive</SelectItem>
                <SelectItem value="৳৳৳৳">৳৳৳৳ Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
