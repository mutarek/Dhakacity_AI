import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Place } from "@/types/place";
import { OpenNowBadge } from "./open-now-badge";
import { MapEmbed } from "./map-embed";

interface PlaceDetailsProps {
  place: Place;
}

export function PlaceDetails({ place }: PlaceDetailsProps) {
  const categoryEmoji = {
    restaurant: "🍽️",
    hospital: "🏥",
    diagnostic: "🔬",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="rounded-3xl border border-white/70 bg-white/80 shadow-[0_20px_60px_-38px_rgba(15,23,42,0.75)]">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <CardTitle className="text-2xl md:text-3xl flex items-center gap-3">
                <span className="text-4xl">{categoryEmoji[place.category]}</span>
                {place.name}
              </CardTitle>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="capitalize">
                  {place.category}
                </Badge>
                <OpenNowBadge openHours={place.openHours} />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Contact */}
          <div className="space-y-2">
            <h3 className="font-semibold">Contact</h3>
            <p className="text-sm text-muted-foreground">{place.address}</p>
            {place.phone ? (
              <a
                href={`tel:${place.phone}`}
                className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-600 to-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:from-cyan-500 hover:to-emerald-500 sm:w-auto"
              >
                📞 Call {place.phone}
              </a>
            ) : (
              <p className="text-sm text-muted-foreground">Phone not provided</p>
            )}
          </div>

          {/* Details */}
          <div className="space-y-2">
            <h3 className="font-semibold">Details</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                <span className="mr-1">⏰</span>
                {place.openHours}
              </Badge>
              <Badge variant="secondary">
                <span className="mr-1">💰</span>
                {place.priceRange}
              </Badge>
            </div>
          </div>

          {/* Tags */}
          {place.tags.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {place.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* AI Summary */}
          <div className="space-y-2">
            <h3 className="font-semibold">AI Summary</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {place.name} is a {place.category} located in Dhanmondi. It offers{" "}
              {place.tags.slice(0, 2).join(" and ")} services. Open{" "}
              {place.openHours}, with a price range of {place.priceRange}.
              {place.featured &&
                " This is a highly recommended and featured location in the area."}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Map */}
      <MapEmbed lat={place.lat} lng={place.lng} name={place.name} />
    </div>
  );
}
