"use client";

import Link from "next/link";
import { useState } from "react";

const ROW_SIZE = 6; // cards visible per row before "show more"

const sections = [
  {
    title: "Food & Dining",
    bg: "from-orange-50 to-amber-50",
    border: "border-orange-200",
    badge: "bg-orange-100 text-orange-700",
    titleColor: "text-orange-700",
    items: [
      { label: "Restaurants",     icon: "🍽️", q: "restaurants",        bg: "bg-orange-50",  ring: "hover:ring-orange-300" },
      { label: "Biryani",         icon: "🍛", q: "biryani",            bg: "bg-amber-50",   ring: "hover:ring-amber-300" },
      { label: "Fast Food",       icon: "🍔", q: "fast food",          bg: "bg-yellow-50",  ring: "hover:ring-yellow-300" },
      { label: "Fine Dining",     icon: "🍷", q: "fine dining",        bg: "bg-rose-50",    ring: "hover:ring-rose-300" },
      { label: "Cafe & Coffee",   icon: "☕", q: "cafe",               bg: "bg-stone-50",   ring: "hover:ring-stone-300" },
      { label: "Bakery",          icon: "🥐", q: "bakery",             bg: "bg-orange-50",  ring: "hover:ring-orange-300" },
      { label: "Family Meals",    icon: "👨‍👩‍👧‍👦", q: "family restaurant", bg: "bg-green-50",   ring: "hover:ring-green-300" },
      { label: "Street Food",     icon: "🌮", q: "street food",        bg: "bg-red-50",     ring: "hover:ring-red-300" },
      { label: "Chinese",         icon: "🥡", q: "chinese restaurant", bg: "bg-yellow-50",  ring: "hover:ring-yellow-300" },
      { label: "Desserts",        icon: "🍰", q: "desserts",           bg: "bg-pink-50",    ring: "hover:ring-pink-300" },
      { label: "Juice Bar",       icon: "🥤", q: "juice bar",          bg: "bg-lime-50",    ring: "hover:ring-lime-300" },
      { label: "Budget Meals",    icon: "💸", q: "budget food",        bg: "bg-gray-50",    ring: "hover:ring-gray-300" },
    ],
  },
  {
    title: "Health & Medical",
    bg: "from-sky-50 to-cyan-50",
    border: "border-sky-200",
    badge: "bg-sky-100 text-sky-700",
    titleColor: "text-sky-700",
    items: [
      { label: "Hospitals",       icon: "🏥", q: "hospitals",          bg: "bg-sky-50",     ring: "hover:ring-sky-300" },
      { label: "Diagnostics",     icon: "🔬", q: "diagnostic center",  bg: "bg-violet-50",  ring: "hover:ring-violet-300" },
      { label: "Pharmacy",        icon: "💊", q: "pharmacy",           bg: "bg-blue-50",    ring: "hover:ring-blue-300" },
      { label: "Emergency",       icon: "🚨", q: "emergency",          bg: "bg-red-50",     ring: "hover:ring-red-300" },
      { label: "Doctors",         icon: "👨‍⚕️", q: "doctors",           bg: "bg-teal-50",    ring: "hover:ring-teal-300" },
      { label: "Dentists",        icon: "🦷", q: "dentist",            bg: "bg-cyan-50",    ring: "hover:ring-cyan-300" },
      { label: "Eye Care",        icon: "👁️", q: "eye care",           bg: "bg-indigo-50",  ring: "hover:ring-indigo-300" },
      { label: "Cardiac Care",    icon: "❤️", q: "cardiac",            bg: "bg-rose-50",    ring: "hover:ring-rose-300" },
      { label: "Blood Tests",     icon: "🧪", q: "blood test",         bg: "bg-fuchsia-50", ring: "hover:ring-fuchsia-300" },
      { label: "Physiotherapy",   icon: "🦴", q: "physiotherapy",      bg: "bg-orange-50",  ring: "hover:ring-orange-300" },
      { label: "Skin & Derma",    icon: "🧴", q: "dermatology",        bg: "bg-pink-50",    ring: "hover:ring-pink-300" },
      { label: "24/7 Care",       icon: "🕛", q: "24 hour",            bg: "bg-slate-50",   ring: "hover:ring-slate-300" },
    ],
  },
  {
    title: "Beauty & Wellness",
    bg: "from-pink-50 to-fuchsia-50",
    border: "border-pink-200",
    badge: "bg-pink-100 text-pink-700",
    titleColor: "text-pink-700",
    items: [
      { label: "Beauty Parlour",  icon: "💅", q: "beauty parlour",     bg: "bg-pink-50",    ring: "hover:ring-pink-300" },
      { label: "Spa & Massage",   icon: "💆", q: "spa massage",        bg: "bg-purple-50",  ring: "hover:ring-purple-300" },
      { label: "Salons",          icon: "✂️", q: "salon",              bg: "bg-fuchsia-50", ring: "hover:ring-fuchsia-300" },
      { label: "Gym & Fitness",   icon: "🏋️", q: "gym",               bg: "bg-orange-50",  ring: "hover:ring-orange-300" },
      { label: "Yoga Classes",    icon: "🧘", q: "yoga",               bg: "bg-green-50",   ring: "hover:ring-green-300" },
      { label: "Mental Health",   icon: "🧠", q: "mental health",      bg: "bg-blue-50",    ring: "hover:ring-blue-300" },
    ],
  },
  {
    title: "Home & Living",
    bg: "from-teal-50 to-emerald-50",
    border: "border-teal-200",
    badge: "bg-teal-100 text-teal-700",
    titleColor: "text-teal-700",
    items: [
      { label: "Home Decor",      icon: "🛋️", q: "home decor",        bg: "bg-teal-50",    ring: "hover:ring-teal-300" },
      { label: "Electricians",    icon: "⚡", q: "electricians",       bg: "bg-yellow-50",  ring: "hover:ring-yellow-300" },
      { label: "Plumbers",        icon: "🔧", q: "plumbers",           bg: "bg-blue-50",    ring: "hover:ring-blue-300" },
      { label: "AC Repair",       icon: "❄️", q: "ac repair",          bg: "bg-cyan-50",    ring: "hover:ring-cyan-300" },
      { label: "Painters",        icon: "🖌️", q: "painters",           bg: "bg-indigo-50",  ring: "hover:ring-indigo-300" },
      { label: "Cleaning",        icon: "🧹", q: "cleaning service",   bg: "bg-green-50",   ring: "hover:ring-green-300" },
      { label: "Pest Control",    icon: "🦟", q: "pest control",       bg: "bg-lime-50",    ring: "hover:ring-lime-300" },
      { label: "Internet",        icon: "📡", q: "internet service",   bg: "bg-slate-50",   ring: "hover:ring-slate-300" },
    ],
  },
  {
    title: "Education",
    bg: "from-violet-50 to-purple-50",
    border: "border-violet-200",
    badge: "bg-violet-100 text-violet-700",
    titleColor: "text-violet-700",
    items: [
      { label: "Schools",         icon: "🏫", q: "schools",            bg: "bg-violet-50",  ring: "hover:ring-violet-300" },
      { label: "Coaching",        icon: "📚", q: "coaching center",    bg: "bg-indigo-50",  ring: "hover:ring-indigo-300" },
      { label: "Universities",    icon: "🎓", q: "university",         bg: "bg-purple-50",  ring: "hover:ring-purple-300" },
      { label: "English Course",  icon: "🗣️", q: "english course",    bg: "bg-sky-50",     ring: "hover:ring-sky-300" },
      { label: "Computer Course", icon: "💻", q: "computer training",  bg: "bg-blue-50",    ring: "hover:ring-blue-300" },
      { label: "Drawing Classes", icon: "🎨", q: "drawing classes",    bg: "bg-pink-50",    ring: "hover:ring-pink-300" },
    ],
  },
  {
    title: "Services & More",
    bg: "from-amber-50 to-orange-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
    titleColor: "text-amber-700",
    items: [
      { label: "Real Estate",     icon: "🏠", q: "real estate",        bg: "bg-amber-50",   ring: "hover:ring-amber-300" },
      { label: "Banks & ATM",     icon: "🏦", q: "bank",               bg: "bg-yellow-50",  ring: "hover:ring-yellow-300" },
      { label: "Courier",         icon: "📦", q: "courier service",    bg: "bg-orange-50",  ring: "hover:ring-orange-300" },
      { label: "Movers",          icon: "🚚", q: "packers movers",     bg: "bg-blue-50",    ring: "hover:ring-blue-300" },
      { label: "Event Planners",  icon: "🎉", q: "event organizer",    bg: "bg-pink-50",    ring: "hover:ring-pink-300" },
      { label: "Photographers",   icon: "📸", q: "photographer",       bg: "bg-purple-50",  ring: "hover:ring-purple-300" },
      { label: "Car Rental",      icon: "🚗", q: "car rental",         bg: "bg-sky-50",     ring: "hover:ring-sky-300" },
      { label: "Tailoring",       icon: "🧵", q: "tailoring",          bg: "bg-rose-50",    ring: "hover:ring-rose-300" },
      { label: "Grocery",         icon: "🛒", q: "grocery store",      bg: "bg-green-50",   ring: "hover:ring-green-300" },
      { label: "Pet Shop",        icon: "🐾", q: "pet shop",           bg: "bg-lime-50",    ring: "hover:ring-lime-300" },
      { label: "Car Repair",      icon: "🔩", q: "car repair",         bg: "bg-slate-50",   ring: "hover:ring-slate-300" },
      { label: "Bike Repair",     icon: "🏍️", q: "bike repair",       bg: "bg-gray-50",    ring: "hover:ring-gray-300" },
    ],
  },
];

function SectionBlock({ section }: { section: typeof sections[0] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? section.items : section.items.slice(0, ROW_SIZE);
  const hasMore = section.items.length > ROW_SIZE;

  return (
    <div className={`rounded-2xl border bg-gradient-to-br p-4 shadow-sm ${section.border} ${section.bg}`}>
      {/* Section header */}
      <div className="mb-3 flex items-center justify-between">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${section.badge}`}>
          {section.title}
        </span>
        {hasMore && (
          <button
            onClick={() => setExpanded(!expanded)}
            className={`flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold transition hover:shadow-sm ${section.badge} border-current/20`}
          >
            {expanded ? "Show less" : `+${section.items.length - ROW_SIZE} more`}
            <svg
              className={`h-3.5 w-3.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>

      {/* Cards grid — 6 per row on desktop */}
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
        {visible.map(({ label, icon, q, bg, ring }) => (
          <Link
            key={label}
            href={`/search?q=${encodeURIComponent(q)}`}
            className={`group flex flex-col items-center gap-2 rounded-xl border border-white/80 px-2 py-3.5 text-center shadow-sm ring-2 ring-transparent transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${bg} ${ring}`}
          >
            <span className="text-3xl leading-none transition-transform duration-200 group-hover:scale-110">
              {icon}
            </span>
            <span className="line-clamp-2 text-[11px] font-semibold leading-tight text-gray-700">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function CategoryButtons() {
  return (
    <div className="w-full space-y-4">
      {sections.map((section) => (
        <SectionBlock key={section.title} section={section} />
      ))}
    </div>
  );
}
