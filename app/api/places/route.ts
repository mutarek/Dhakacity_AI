import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  categoryFromString,
  normalizeTagList,
  parseImageUrls,
  parseCommaSeparated,
  toPlaceDto,
  type PlaceWithTags,
} from "@/lib/place-utils";
import { isOpenNow } from "@/lib/open-hours";
import { distanceKm } from "@/lib/geo";
import { upsertPlaceEmbedding } from "@/lib/embeddings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ListResponse = {
  places: ReturnType<typeof toPlaceDto>[];
};

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const q = params.get("q")?.trim() ?? "";
    const category = categoryFromString(params.get("category"));
    const openNow = params.get("openNow") === "true";
    const priceRange = params.get("priceRange")?.trim();
    const limit = Number(params.get("limit") ?? "200");
    const userLat = Number(params.get("lat"));
    const userLng = Number(params.get("lng"));

    const where: Prisma.PlaceWhereInput = {
      ...(category ? { category } : {}),
      ...(priceRange && priceRange !== "all" ? { priceRange } : {}),
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { address: { contains: q, mode: "insensitive" } },
              {
                placeTags: {
                  some: {
                    tag: {
                      name: { contains: q, mode: "insensitive" },
                    },
                  },
                },
              },
            ],
          }
        : {}),
    };

    const places = await prisma.place.findMany({
      where,
      include: {
        placeTags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 500) : 200,
    });

    const filtered = openNow
      ? places.filter((place) => isOpenNow(place.openHours))
      : places;

    const withDistance = filtered.map((place) => {
      const distance =
        Number.isFinite(userLat) && Number.isFinite(userLng)
          ? distanceKm(userLat, userLng, place.lat, place.lng)
          : undefined;

      return { place, distance };
    });

    withDistance.sort((a, b) => {
      if (a.distance === undefined && b.distance === undefined) return 0;
      if (a.distance === undefined) return 1;
      if (b.distance === undefined) return -1;
      return a.distance - b.distance;
    });

    const response: ListResponse = {
      places: withDistance.map(({ place, distance }) =>
        toPlaceDto(place as PlaceWithTags, distance),
      ),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Failed to list places", error);
    return NextResponse.json(
      { error: "Failed to load places" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = String(body.name ?? "").trim();
    const category = categoryFromString(String(body.category ?? ""));
    const address = String(body.address ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const openHours = String(body.openHours ?? "").trim();
    const priceRange = String(body.priceRange ?? "").trim();
    const featured = Boolean(body.featured);
    const lat = Number(body.lat);
    const lng = Number(body.lng);
    const tags = normalizeTagList(
      Array.isArray(body.tags) ? body.tags.map(String) : parseCommaSeparated(body.tags),
    );
    const imageUrls = Array.isArray(body.imageUrls)
      ? parseImageUrls(body.imageUrls.join(","))
      : parseImageUrls(body.imageUrls);

    if (!name || !category || !address || !openHours || !priceRange) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      return NextResponse.json(
        { error: "Invalid latitude/longitude" },
        { status: 400 },
      );
    }

    const place = await prisma.place.create({
      data: {
        name,
        category,
        address,
        phone: phone || null,
        openHours,
        priceRange,
        lat,
        lng,
        featured,
        imageUrls,
        placeTags: {
          create: tags.map((tagName) => ({
            tag: {
              connectOrCreate: {
                where: { name: tagName },
                create: { name: tagName },
              },
            },
          })),
        },
      },
      include: {
        placeTags: {
          include: { tag: true },
        },
      },
    });

    await upsertPlaceEmbedding(prisma, {
      placeId: place.id,
      name: place.name,
      category: place.category,
      address: place.address,
      priceRange: place.priceRange,
      tags,
    });

    return NextResponse.json({ place: toPlaceDto(place as PlaceWithTags) }, { status: 201 });
  } catch (error) {
    console.error("Failed to create place", error);
    return NextResponse.json(
      { error: "Failed to create place" },
      { status: 500 },
    );
  }
}
