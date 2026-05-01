import { Prisma } from "@prisma/client";
import { Place } from "@/types/place";

type PlaceCategory = Place["category"];

export type PlaceWithTags = Prisma.PlaceGetPayload<{
  include: {
    placeTags: {
      include: {
        tag: true;
      };
    };
  };
}>;

export type CreatePlaceInput = {
  name: string;
  category: PlaceCategory;
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  openHours: string;
  priceRange: string;
  featured: boolean;
  tags: string[];
  imageUrls: string[];
};

export function toPlaceDto(place: PlaceWithTags, distance?: number): Place {
  return {
    id: place.id,
    name: place.name,
    category: place.category,
    address: place.address,
    lat: place.lat,
    lng: place.lng,
    phone: place.phone ?? undefined,
    openHours: place.openHours,
    priceRange: place.priceRange,
    tags: place.placeTags.map((pt) => pt.tag.name),
    featured: place.featured,
    imageUrls: place.imageUrls,
    images: place.imageUrls,
    distanceKm: distance,
  };
}

export function normalizeTagList(tags: string[]): string[] {
  return Array.from(
    new Set(
      tags
        .map((tag) => tag.trim().toLowerCase())
        .filter((tag) => tag.length > 0),
    ),
  );
}

export function parseCommaSeparated(value: string | undefined): string[] {
  if (!value) {
    return [];
  }

  return normalizeTagList(value.split(","));
}

export function parseImageUrls(value: string | undefined): string[] {
  if (!value) {
    return [];
  }

  return Array.from(
    new Set(
      value
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0),
    ),
  );
}

export function categoryFromString(value: string | null): PlaceCategory | null {
  if (!value) return null;

  if (value === "restaurant" || value === "hospital" || value === "diagnostic") {
    return value;
  }

  return null;
}
