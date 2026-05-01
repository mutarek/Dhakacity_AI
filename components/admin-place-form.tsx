"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AdminPlaceForm() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "restaurant",
    address: "",
    lat: "",
    lng: "",
    phone: "",
    openHours: "",
    priceRange: "৳৳",
    tags: "",
    imageUrls: "",
    featured: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaveMessage(null);
    setIsSaving(true);

    try {
      const response = await fetch("/api/places", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          lat: Number(formData.lat),
          lng: Number(formData.lng),
          tags: formData.tags,
          imageUrls: formData.imageUrls,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save place");
      }

      setSaveMessage("Place saved successfully.");
      setFormData({
        name: "",
        category: "restaurant",
        address: "",
        lat: "",
        lng: "",
        phone: "",
        openHours: "",
        priceRange: "৳৳",
        tags: "",
        imageUrls: "",
        featured: false,
      });
    } catch (error) {
      setSaveMessage(
        error instanceof Error ? error.message : "Failed to save place",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="rounded-3xl border border-white/70 bg-white/80 shadow-[0_22px_60px_-42px_rgba(15,23,42,0.78)]">
      <CardHeader>
        <CardTitle className="text-2xl font-extrabold tracking-tight">
          Add or Edit Place
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => {
                if (value !== null) {
                  handleChange("category", value);
                }
              }}
            >
              <SelectTrigger id="category" className="w-full rounded-xl border-cyan-100 bg-cyan-50/70">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="restaurant">Restaurant</SelectItem>
                <SelectItem value="hospital">Hospital</SelectItem>
                <SelectItem value="diagnostic">Diagnostic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              required
            />
          </div>

          {/* Latitude & Longitude */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="lat">Latitude</Label>
              <Input
                id="lat"
                type="number"
                step="any"
                value={formData.lat}
                onChange={(e) => handleChange("lat", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lng">Longitude</Label>
              <Input
                id="lng"
                type="number"
                step="any"
                value={formData.lng}
                onChange={(e) => handleChange("lng", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              required
            />
          </div>

          {/* Open Hours */}
          <div className="space-y-2">
            <Label htmlFor="openHours">Open Hours</Label>
            <Input
              id="openHours"
              value={formData.openHours}
              onChange={(e) => handleChange("openHours", e.target.value)}
              placeholder="e.g., 9:00 AM - 10:00 PM"
              required
            />
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <Label htmlFor="priceRange">Price Range</Label>
            <Select
              value={formData.priceRange}
              onValueChange={(value) => {
                if (value !== null) {
                  handleChange("priceRange", value);
                }
              }}
            >
              <SelectTrigger id="priceRange" className="w-full rounded-xl border-cyan-100 bg-cyan-50/70">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="৳">৳</SelectItem>
                <SelectItem value="৳৳">৳৳</SelectItem>
                <SelectItem value="৳৳৳">৳৳৳</SelectItem>
                <SelectItem value="৳৳৳৳">৳৳৳৳</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => handleChange("tags", e.target.value)}
              placeholder="e.g., Bengali, Fast Food, Biryani"
            />
          </div>

          {/* Image URLs */}
          <div className="space-y-2">
            <Label htmlFor="imageUrls">Image URLs (comma separated)</Label>
            <Input
              id="imageUrls"
              value={formData.imageUrls}
              onChange={(e) => handleChange("imageUrls", e.target.value)}
              placeholder="https://.../photo1.jpg, https://.../photo2.jpg"
            />
          </div>

          {/* Featured */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) =>
                handleChange("featured", checked as boolean)
              }
            />
            <Label htmlFor="featured">Featured</Label>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            disabled={isSaving}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-600 to-emerald-600 text-white hover:from-cyan-500 hover:to-emerald-500"
          >
            {isSaving ? "Saving..." : "Save Place"}
          </Button>

          {saveMessage ? (
            <p className="text-sm text-foreground/80" role="status">
              {saveMessage}
            </p>
          ) : null}
        </form>
      </CardContent>
    </Card>
  );
}
