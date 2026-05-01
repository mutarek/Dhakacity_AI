import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Place } from "@/types/place";

interface PlaceCardProps {
  place: Place;
}

export function PlaceCard({ place }: PlaceCardProps) {
  const categoryEmoji = {
    restaurant: "🍽️",
    hospital: "🏥",
    diagnostic: "🔬",
  };

  return (
    <Link href={`/place/${place.id}`} className="group block h-full">
      <Card className="h-full cursor-pointer rounded-3xl border border-white/70 bg-white/80 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_24px_70px_-40px_rgba(8,145,178,0.95)]">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg flex items-center gap-2 tracking-tight">
              <span className="text-2xl">{categoryEmoji[place.category]}</span>
              {place.name}
            </CardTitle>
            {place.featured && (
              <Badge variant="secondary" className="shrink-0 bg-amber-100 text-amber-800">
                ⭐ Featured
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">{place.address}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{place.category}</Badge>
              <Badge variant="outline">{place.priceRange}</Badge>
              <Badge variant="outline">{place.openHours}</Badge>
              {typeof place.distanceKm === "number" ? (
                <Badge variant="outline">{place.distanceKm.toFixed(1)} km</Badge>
              ) : null}
            </div>
            {place.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {place.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-cyan-50 px-2 py-1 text-xs text-cyan-900"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
