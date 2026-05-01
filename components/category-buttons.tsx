"use client";

import Link from "next/link";
import { useState } from "react";

const ROW_SIZE = 6;

type Section = {
  title: string;
  iconBg: string;
  accentBorder: string;
  titleColor: string;
  expandBtnClass: string;
  items: { label: string; icon: string; q: string }[];
};

const sections: Section[] = [
  {
    title: "Food & Dining",
    iconBg: "bg-orange-100",
    accentBorder: "border-l-orange-400",
    titleColor: "text-orange-700",
    expandBtnClass: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100",
    items: [
      { label: "Restaurants",   icon: "🍽️", q: "restaurants" },
      { label: "Biryani",       icon: "🍛", q: "biryani" },
      { label: "Fast Food",     icon: "🍔", q: "fast food" },
      { label: "Fine Dining",   icon: "🍷", q: "fine dining" },
      { label: "Cafe & Coffee", icon: "☕", q: "cafe" },
      { label: "Bakery",        icon: "🥐", q: "bakery" },
      { label: "Family Meals",  icon: "👨‍👩‍👧‍👦", q: "family restaurant" },
      { label: "Street Food",   icon: "🌮", q: "street food" },
      { label: "Chinese",       icon: "🥡", q: "chinese restaurant" },
      { label: "Desserts",      icon: "🍰", q: "desserts" },
      { label: "Juice Bar",     icon: "🥤", q: "juice bar" },
      { label: "Budget Meals",  icon: "💸", q: "budget food" },
    ],
  },
  {
    title: "Health & Medical",
    iconBg: "bg-sky-100",
    accentBorder: "border-l-sky-400",
    titleColor: "text-sky-700",
    expandBtnClass: "bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100",
    items: [
      { label: "Hospitals",     icon: "🏥", q: "hospitals" },
      { label: "Diagnostics",   icon: "🔬", q: "diagnostic center" },
      { label: "Pharmacy",      icon: "💊", q: "pharmacy" },
      { label: "Emergency",     icon: "🚨", q: "emergency" },
      { label: "Doctors",       icon: "👨‍⚕️", q: "doctors" },
      { label: "Dentists",      icon: "🦷", q: "dentist" },
      { label: "Eye Care",      icon: "👁️", q: "eye care" },
      { label: "Cardiac Care",  icon: "❤️", q: "cardiac" },
      { label: "Blood Tests",   icon: "🧪", q: "blood test" },
      { label: "Physiotherapy", icon: "🦴", q: "physiotherapy" },
      { label: "Skin & Derma",  icon: "🧴", q: "dermatology" },
      { label: "24/7 Care",     icon: "🕛", q: "24 hour" },
    ],
  },
  {
    title: "Beauty & Wellness",
    iconBg: "bg-pink-100",
    accentBorder: "border-l-pink-400",
    titleColor: "text-pink-700",
    expandBtnClass: "bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100",
    items: [
      { label: "Beauty Parlour", icon: "💅", q: "beauty parlour" },
      { label: "Spa & Massage",  icon: "💆", q: "spa massage" },
      { label: "Salons",         icon: "✂️", q: "salon" },
      { label: "Gym & Fitness",  icon: "🏋️", q: "gym" },
      { label: "Yoga Classes",   icon: "🧘", q: "yoga" },
      { label: "Mental Health",  icon: "🧠", q: "mental health" },
    ],
  },
  {
    title: "Home & Living",
    iconBg: "bg-teal-100",
    accentBorder: "border-l-teal-400",
    titleColor: "text-teal-700",
    expandBtnClass: "bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100",
    items: [
      { label: "Home Decor",   icon: "🛋️", q: "home decor" },
      { label: "Electricians", icon: "⚡", q: "electricians" },
      { label: "Plumbers",     icon: "🔧", q: "plumbers" },
      { label: "AC Repair",    icon: "❄️", q: "ac repair" },
      { label: "Painters",     icon: "🖌️", q: "painters" },
      { label: "Cleaning",     icon: "🧹", q: "cleaning service" },
      { label: "Pest Control", icon: "🦟", q: "pest control" },
      { label: "Internet",     icon: "📡", q: "internet service" },
    ],
  },
  {
    title: "Education",
    iconBg: "bg-violet-100",
    accentBorder: "border-l-violet-400",
    titleColor: "text-violet-700",
    expandBtnClass: "bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100",
    items: [
      { label: "Schools",         icon: "🏫", q: "schools" },
      { label: "Coaching",        icon: "📚", q: "coaching center" },
      { label: "Universities",    icon: "🎓", q: "university" },
      { label: "English Course",  icon: "🗣️", q: "english course" },
      { label: "Computer Course", icon: "💻", q: "computer training" },
      { label: "Drawing Classes", icon: "🎨", q: "drawing classes" },
    ],
  },
  {
    title: "Services & More",
    iconBg: "bg-amber-100",
    accentBorder: "border-l-amber-400",
    titleColor: "text-amber-700",
    expandBtnClass: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
    items: [
      { label: "Real Estate",    icon: "🏠", q: "real estate" },
      { label: "Banks & ATM",    icon: "🏦", q: "bank" },
      { label: "Courier",        icon: "📦", q: "courier service" },
      { label: "Movers",         icon: "🚚", q: "packers movers" },
      { label: "Event Planners", icon: "🎉", q: "event organizer" },
      { label: "Photographers",  icon: "📸", q: "photographer" },
      { label: "Car Rental",     icon: "🚗", q: "car rental" },
      { label: "Tailoring",      icon: "🧵", q: "tailoring" },
      { label: "Grocery",        icon: "🛒", q: "grocery store" },
      { label: "Pet Shop",       icon: "🐾", q: "pet shop" },
      { label: "Car Repair",     icon: "🔩", q: "car repair" },
      { label: "Bike Repair",    icon: "🏍️", q: "bike repair" },
    ],
  },
];

function SectionBlock({ section }: { section: Section }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? section.items : section.items.slice(0, ROW_SIZE);
  const extra = section.items.length - ROW_SIZE;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Section header */}
      <div className={`flex items-center justify-between border-b border-gray-100 border-l-4 px-4 py-3 ${section.accentBorder}`}>
        <span className={`text-sm font-bold ${section.titleColor}`}>{section.title}</span>
        {extra > 0 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${section.expandBtnClass}`}
          >
            {expanded ? "Show less" : `+${extra} more`}
            <svg
              className={`h-3 w-3 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-3 gap-px bg-gray-100 sm:grid-cols-4 md:grid-cols-6">
        {visible.map(({ label, icon, q }) => (
          <Link
            key={label}
            href={`/search?q=${encodeURIComponent(q)}`}
            className="group flex flex-col items-center gap-2 bg-white px-2 py-4 text-center transition-colors hover:bg-gray-50"
          >
            <span
              className={`flex h-12 w-12 items-center justify-center rounded-full text-2xl ${section.iconBg} transition-transform duration-150 group-hover:scale-110`}
            >
              {icon}
            </span>
            <span className="line-clamp-2 text-xs font-semibold leading-tight text-gray-700 group-hover:text-teal-700">
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
