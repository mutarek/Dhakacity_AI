export type Place = {
  id: number | string;
  name: string;
  category: "restaurant" | "hospital" | "diagnostic";
  address: string;
  lat: number;
  lng: number;
  phone?: string;
  openHours: string;
  priceRange: string;
  tags: string[];
  featured: boolean;
  images?: string[];
  imageUrls?: string[];
  distanceKm?: number;
};
