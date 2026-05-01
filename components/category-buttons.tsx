"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function CategoryButtons() {
  const router = useRouter();

  const categories = [
    {
      label: "Restaurants",
      description: "Popular dining picks",
      type: "category",
      value: "restaurant",
      icon: "🍽️",
      className:
        "border-amber-200/80 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 text-amber-950 shadow-[0_18px_40px_-28px_rgba(217,119,6,0.75)] hover:border-amber-300 hover:bg-gradient-to-br hover:from-amber-100 hover:via-orange-50 hover:to-rose-100",
      iconClassName: "bg-amber-100 text-amber-700",
    },
    {
      label: "Hospitals",
      description: "Trusted healthcare",
      type: "category",
      value: "hospital",
      icon: "🏥",
      className:
        "border-sky-200/80 bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50 text-sky-950 shadow-[0_18px_40px_-28px_rgba(14,116,144,0.75)] hover:border-sky-300 hover:bg-gradient-to-br hover:from-sky-100 hover:via-cyan-50 hover:to-blue-100",
      iconClassName: "bg-sky-100 text-sky-700",
    },
    {
      label: "Diagnostics",
      description: "Scans and lab work",
      type: "category",
      value: "diagnostic",
      icon: "🔬",
      className:
        "border-violet-200/80 bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50 text-violet-950 shadow-[0_18px_40px_-28px_rgba(109,40,217,0.7)] hover:border-violet-300 hover:bg-gradient-to-br hover:from-violet-100 hover:via-fuchsia-50 hover:to-pink-100",
      iconClassName: "bg-violet-100 text-violet-700",
    },
    {
      label: "Biryani Spots",
      description: "Rich local favorites",
      type: "query",
      value: "biryani",
      icon: "🍛",
      className:
        "border-orange-200/80 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 text-orange-950 shadow-[0_18px_40px_-28px_rgba(234,88,12,0.75)] hover:border-orange-300 hover:bg-gradient-to-br hover:from-orange-100 hover:via-amber-50 hover:to-yellow-100",
      iconClassName: "bg-orange-100 text-orange-700",
    },
    {
      label: "Emergency Care",
      description: "Urgent medical help",
      type: "query",
      value: "emergency",
      icon: "🚑",
      className:
        "border-rose-200/80 bg-gradient-to-br from-rose-50 via-red-50 to-orange-50 text-rose-950 shadow-[0_18px_40px_-28px_rgba(225,29,72,0.75)] hover:border-rose-300 hover:bg-gradient-to-br hover:from-rose-100 hover:via-red-50 hover:to-orange-100",
      iconClassName: "bg-rose-100 text-rose-700",
    },
    {
      label: "Blood Tests",
      description: "Fast pathology access",
      type: "query",
      value: "blood test",
      icon: "🧪",
      className:
        "border-fuchsia-200/80 bg-gradient-to-br from-fuchsia-50 via-pink-50 to-rose-50 text-fuchsia-950 shadow-[0_18px_40px_-28px_rgba(192,38,211,0.72)] hover:border-fuchsia-300 hover:bg-gradient-to-br hover:from-fuchsia-100 hover:via-pink-50 hover:to-rose-100",
      iconClassName: "bg-fuchsia-100 text-fuchsia-700",
    },
    {
      label: "Cardiac Care",
      description: "Heart specialists nearby",
      type: "query",
      value: "cardiac",
      icon: "❤️",
      className:
        "border-red-200/80 bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 text-red-950 shadow-[0_18px_40px_-28px_rgba(220,38,38,0.72)] hover:border-red-300 hover:bg-gradient-to-br hover:from-red-100 hover:via-rose-50 hover:to-pink-100",
      iconClassName: "bg-red-100 text-red-700",
    },
    {
      label: "Fine Dining",
      description: "Premium experiences",
      type: "query",
      value: "fine dining",
      icon: "🍷",
      className:
        "border-stone-200/80 bg-gradient-to-br from-stone-50 via-neutral-50 to-zinc-100 text-stone-950 shadow-[0_18px_40px_-28px_rgba(87,83,78,0.6)] hover:border-stone-300 hover:bg-gradient-to-br hover:from-stone-100 hover:via-neutral-50 hover:to-zinc-100",
      iconClassName: "bg-stone-100 text-stone-700",
    },
    {
      label: "Family Meals",
      description: "Comfort food options",
      type: "query",
      value: "family restaurant",
      icon: "👨‍👩‍👧‍👦",
      className:
        "border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-lime-50 to-teal-50 text-emerald-950 shadow-[0_18px_40px_-28px_rgba(5,150,105,0.68)] hover:border-emerald-300 hover:bg-gradient-to-br hover:from-emerald-100 hover:via-lime-50 hover:to-teal-100",
      iconClassName: "bg-emerald-100 text-emerald-700",
    },
    {
      label: "24/7 Care",
      description: "Always-open support",
      type: "query",
      value: "24/7",
      icon: "🕛",
      className:
        "border-indigo-200/80 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 text-indigo-950 shadow-[0_18px_40px_-28px_rgba(79,70,229,0.68)] hover:border-indigo-300 hover:bg-gradient-to-br hover:from-indigo-100 hover:via-blue-50 hover:to-cyan-100",
      iconClassName: "bg-indigo-100 text-indigo-700",
    },
    {
      label: "Nearby",
      description: "Quick local results",
      type: "near",
      value: "near",
      icon: "📍",
      className:
        "border-teal-200/80 bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 text-teal-950 shadow-[0_18px_40px_-28px_rgba(13,148,136,0.72)] hover:border-teal-300 hover:bg-gradient-to-br hover:from-teal-100 hover:via-cyan-50 hover:to-emerald-100",
      iconClassName: "bg-teal-100 text-teal-700",
    },
    {
      label: "Budget Friendly",
      description: "Good picks under control",
      type: "query",
      value: "budget",
      icon: "💸",
      className:
        "border-lime-200/80 bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50 text-lime-950 shadow-[0_18px_40px_-28px_rgba(101,163,13,0.68)] hover:border-lime-300 hover:bg-gradient-to-br hover:from-lime-100 hover:via-green-50 hover:to-emerald-100",
      iconClassName: "bg-lime-100 text-lime-700",
    },
  ];

  const handleCategoryClick = (category: (typeof categories)[number]) => {
    if (category.type === "near") {
      router.push("/search?near=true");
      return;
    }

    if (category.type === "query") {
      router.push(`/search?q=${encodeURIComponent(category.value)}`);
      return;
    }

    router.push(`/search?category=${category.value}`);
  };

  return (
    <div className="grid w-full max-w-6xl grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4 md:gap-4">
      {categories.map((category) => (
        <Button
          key={category.value}
          onClick={() => handleCategoryClick(category)}
          variant="outline"
          size="lg"
          className={`group h-32 rounded-[1.75rem] px-4 py-4 text-left shadow-[0_12px_30px_-24px_rgba(15,23,42,0.45)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 md:h-36 md:text-lg flex flex-col items-start justify-between ${category.className}`}
        >
          <span
            className={`flex size-12 items-center justify-center rounded-2xl text-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 md:size-14 md:text-3xl ${category.iconClassName}`}
          >
            {category.icon}
          </span>
          <span className="space-y-1">
            <span className="block tracking-tight">{category.label}</span>
            <span className="block text-xs font-medium text-current/70 md:text-sm">
              {category.description}
            </span>
          </span>
        </Button>
      ))}
    </div>
  );
}
