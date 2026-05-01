import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlaceDetails } from "@/components/place-details";
import { prisma } from "@/lib/prisma";
import { toPlaceDto } from "@/lib/place-utils";

interface PlacePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PlacePage({ params }: PlacePageProps) {
  const { id } = await params;
  const placeId = Number(id);

  if (!Number.isFinite(placeId)) {
    notFound();
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
    notFound();
  }

  const placeDto = toPlaceDto(place);

  return (
    <div className="w-full px-4 py-8 md:px-8">
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/search">
          <Button variant="ghost" size="sm">
            ← Back to Search
          </Button>
        </Link>

        {/* Place Details */}
        <PlaceDetails place={placeDto} />
      </div>
    </div>
  );
}
