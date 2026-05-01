import Link from "next/link";

const sections = [
  {
    title: "Food & Dining",
    color: "text-orange-700",
    items: [
      { label: "Restaurants",     icon: "🍽️", q: "restaurants" },
      { label: "Biryani",         icon: "🍛", q: "biryani" },
      { label: "Fast Food",       icon: "🍔", q: "fast food" },
      { label: "Fine Dining",     icon: "🍷", q: "fine dining" },
      { label: "Cafe & Coffee",   icon: "☕", q: "cafe" },
      { label: "Bakery",          icon: "🥐", q: "bakery" },
      { label: "Family Meals",    icon: "👨‍👩‍👧‍👦", q: "family restaurant" },
      { label: "Street Food",     icon: "🌮", q: "street food" },
      { label: "Chinese",         icon: "🥡", q: "chinese restaurant" },
      { label: "Desserts",        icon: "🍰", q: "desserts" },
      { label: "Juice Bar",       icon: "🥤", q: "juice bar" },
      { label: "Budget Friendly", icon: "💸", q: "budget food" },
    ],
  },
  {
    title: "Health & Medical",
    color: "text-sky-700",
    items: [
      { label: "Hospitals",       icon: "🏥", q: "hospitals" },
      { label: "Diagnostics",     icon: "🔬", q: "diagnostic center" },
      { label: "Pharmacy",        icon: "💊", q: "pharmacy" },
      { label: "Emergency",       icon: "🚨", q: "emergency" },
      { label: "Doctors",         icon: "👨‍⚕️", q: "doctors" },
      { label: "Dentists",        icon: "🦷", q: "dentist" },
      { label: "Eye Care",        icon: "👁️", q: "eye care" },
      { label: "Cardiac Care",    icon: "❤️", q: "cardiac" },
      { label: "Blood Tests",     icon: "🧪", q: "blood test" },
      { label: "Physiotherapy",   icon: "🦴", q: "physiotherapy" },
      { label: "Skin & Derma",    icon: "🧴", q: "dermatology" },
      { label: "24/7 Care",       icon: "🕛", q: "24 hour" },
    ],
  },
  {
    title: "Beauty & Wellness",
    color: "text-pink-700",
    items: [
      { label: "Beauty Parlour",  icon: "💅", q: "beauty parlour" },
      { label: "Spa & Massage",   icon: "💆", q: "spa massage" },
      { label: "Salons",          icon: "✂️", q: "salon" },
      { label: "Gym & Fitness",   icon: "🏋️", q: "gym" },
      { label: "Yoga Classes",    icon: "🧘", q: "yoga" },
      { label: "Mental Health",   icon: "🧠", q: "mental health" },
    ],
  },
  {
    title: "Home & Living",
    color: "text-teal-700",
    items: [
      { label: "Home Decor",      icon: "🛋️", q: "home decor" },
      { label: "Electricians",    icon: "⚡", q: "electricians" },
      { label: "Plumbers",        icon: "🔧", q: "plumbers" },
      { label: "AC Repair",       icon: "❄️", q: "ac repair" },
      { label: "Painters",        icon: "🖌️", q: "painters" },
      { label: "Cleaning",        icon: "🧹", q: "cleaning service" },
      { label: "Pest Control",    icon: "🦟", q: "pest control" },
      { label: "Internet",        icon: "📡", q: "internet service" },
    ],
  },
  {
    title: "Education",
    color: "text-violet-700",
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
    color: "text-amber-700",
    items: [
      { label: "Real Estate",     icon: "🏠", q: "real estate" },
      { label: "Banks & ATM",     icon: "🏦", q: "bank" },
      { label: "Courier",         icon: "📦", q: "courier service" },
      { label: "Movers",          icon: "🚚", q: "packers movers" },
      { label: "Event Planners",  icon: "🎉", q: "event organizer" },
      { label: "Photographers",   icon: "📸", q: "photographer" },
      { label: "Car Rental",      icon: "🚗", q: "car rental" },
      { label: "Tailoring",       icon: "🧵", q: "tailoring" },
      { label: "Grocery",         icon: "🛒", q: "grocery store" },
      { label: "Pet Shop",        icon: "🐾", q: "pet shop" },
      { label: "Car Repair",      icon: "🔩", q: "car repair" },
      { label: "Bike Repair",     icon: "🏍️", q: "bike repair" },
    ],
  },
];

export function CategoryButtons() {
  return (
    <div className="w-full space-y-8">
      {sections.map((section) => (
        <div key={section.title}>
          <h3 className={`mb-3 text-sm font-bold uppercase tracking-widest ${section.color}`}>
            {section.title}
          </h3>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12">
            {section.items.map(({ label, icon, q }) => (
              <Link
                key={label}
                href={`/search?q=${encodeURIComponent(q)}`}
                className="flex flex-col items-center gap-1.5 rounded-xl border border-gray-100 bg-white px-2 py-3 text-center shadow-sm transition hover:border-teal-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <span className="text-2xl leading-none">{icon}</span>
                <span className="line-clamp-2 text-[11px] font-semibold leading-tight text-gray-700">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
