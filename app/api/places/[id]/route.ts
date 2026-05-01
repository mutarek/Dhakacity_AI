import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toPlaceDto } from "@/lib/place-utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const placeId = Number(id);

  if (!Number.isFinite(placeId)) {
    return NextResponse.json({ error: "Invalid place id" }, { status: 400 });
  }

  const place = await prisma.place.findUnique({
    where: { id: placeId },
    include: {
      placeTags: {
        include: {
          tag: true,
        },
      },
    },
  });

  if (!place) {
    return NextResponse.json({ error: "Place not found" }, { status: 404 });
  }

  return NextResponse.json({ place: toPlaceDto(place) });
}
