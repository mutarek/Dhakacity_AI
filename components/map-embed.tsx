import { Card, CardContent } from "@/components/ui/card";

interface MapEmbedProps {
  lat: number;
  lng: number;
  name: string;
}

export function MapEmbed({ lat, lng, name }: MapEmbedProps) {
  // Using Google Maps embed - in production, you'd need an API key
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${lat},${lng}`;

  return (
    <Card>
      <CardContent className="p-0">
        <div className="w-full h-[400px] bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center p-6">
            <p className="text-lg font-semibold mb-2">📍 Map Location</p>
            <p className="text-sm text-muted-foreground mb-4">{name}</p>
            <p className="text-xs text-muted-foreground">
              Coordinates: {lat.toFixed(6)}, {lng.toFixed(6)}
            </p>
            <p className="text-xs text-muted-foreground mt-4">
              (Map embed requires Google Maps API key)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
