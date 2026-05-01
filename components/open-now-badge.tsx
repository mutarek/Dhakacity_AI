import { Badge } from "@/components/ui/badge";

interface OpenNowBadgeProps {
  openHours: string;
}

export function OpenNowBadge({ openHours }: OpenNowBadgeProps) {
  // Simple mock logic - in production, this would check actual time
  const isOpen = openHours === "24/7" || true; // Mock: always open for demo

  return (
    <Badge variant={isOpen ? "default" : "secondary"}>
      {isOpen ? "🟢 Open Now" : "🔴 Closed"}
    </Badge>
  );
}
