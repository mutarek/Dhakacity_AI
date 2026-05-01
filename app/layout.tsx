import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DhakaCity AI - Find Restaurants & Healthcare in Dhanmondi",
  description: "AI assistant for finding restaurants, hospitals, and diagnostic centers in Dhanmondi, Dhaka",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">

        {/* Sticky Header — JustDial-style */}
        <header className="sticky top-0 z-50 w-full shadow-md">
          {/* Top utility bar */}
          <div className="w-full bg-gray-100 border-b border-gray-200">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs text-gray-600">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="font-medium text-emerald-700">AI-Powered Live Search</span>
                <span className="hidden sm:inline text-gray-400 ml-2">— Find food, hospitals &amp; more across Dhanmondi, Dhaka</span>
              </div>
              <nav className="flex items-center gap-4">
                <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
                <Link href="/search" className="hover:text-teal-600 transition-colors">Explore</Link>
                <Link href="/admin" className="font-semibold text-orange-600 hover:text-orange-700 transition-colors">Admin</Link>
              </nav>
            </div>
          </div>

          {/* Main header bar */}
          <div className="w-full bg-white border-b border-gray-200">
            <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:py-4">
              {/* Logo */}
              <Link href="/" className="flex shrink-0 items-center gap-2.5 mr-2">
                <span className="inline-grid h-10 w-10 place-content-center rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white text-lg shadow">
                  🌆
                </span>
                <span className="hidden sm:block">
                  <span className="block text-xl font-black tracking-tight text-teal-700 leading-tight">DhakaCity AI</span>
                  <span className="block text-[10px] font-medium uppercase tracking-widest text-gray-400">Smart Local Discovery</span>
                </span>
              </Link>

              {/* Search form */}
              <form
                action="/search"
                method="GET"
                className="flex flex-1 items-stretch rounded-lg border-2 border-teal-500 overflow-hidden shadow-sm min-w-0"
              >
                <div className="flex flex-1 items-center border-r border-gray-200 bg-white px-3 min-w-0">
                  <svg className="mr-2 h-4 w-4 shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                  </svg>
                  <input
                    name="q"
                    type="text"
                    placeholder="What are you looking for? (biryani, hospital, lab…)"
                    className="w-full py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                  />
                </div>
                <div className="hidden sm:flex items-center border-r border-gray-200 bg-white px-3 w-44 shrink-0">
                  <svg className="mr-2 h-4 w-4 shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 0 1-2.828 0l-4.243-4.243a8 8 0 1 1 11.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  </svg>
                  <input
                    name="area"
                    type="text"
                    placeholder="Area in Dhaka"
                    className="w-full py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="shrink-0 bg-teal-500 hover:bg-teal-600 active:bg-teal-700 px-5 py-2.5 text-sm font-bold text-white transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          </div>

          {/* Category nav bar */}
          <div className="w-full bg-white border-b border-gray-100 overflow-x-auto scrollbar-hide">
            <div className="mx-auto flex max-w-7xl items-center gap-1 px-4 py-2 whitespace-nowrap">
              {[
                { label: "Restaurants", icon: "🍽️", q: "restaurants" },
                { label: "Hospitals",   icon: "🏥", q: "hospitals" },
                { label: "Diagnostics", icon: "🔬", q: "diagnostic center" },
                { label: "Pharmacy",    icon: "💊", q: "pharmacy" },
                { label: "Biryani",     icon: "🍛", q: "biryani" },
                { label: "Fast Food",   icon: "🍔", q: "fast food" },
                { label: "Emergency",   icon: "🚨", q: "emergency" },
                { label: "Eye Care",    icon: "👁️", q: "eye care" },
                { label: "Dental",      icon: "🦷", q: "dental" },
                { label: "Bakery",      icon: "🥐", q: "bakery" },
                { label: "Cafe",        icon: "☕", q: "cafe" },
                { label: "Cardiac",     icon: "❤️", q: "cardiac" },
              ].map(({ label, icon, q }) => (
                <Link
                  key={label}
                  href={`/search?q=${encodeURIComponent(q)}`}
                  className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 px-3.5 py-1.5 text-xs font-semibold text-gray-700 transition-colors"
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="w-full bg-slate-950 text-white">
          <div className="w-full">
            <div className="relative px-5 py-10 md:px-8 md:py-12">
              <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr] md:items-start">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-grid h-11 w-11 place-content-center rounded-2xl bg-gradient-to-br from-cyan-400 via-emerald-400 to-amber-300 text-lg text-slate-950 shadow-[0_16px_28px_-18px_rgba(56,189,248,0.95)]">
                      🌆
                    </span>
                    <div>
                      <p className="text-xl font-black tracking-tight">DhakaCity AI</p>
                      <p className="text-sm text-white/60">Find trusted places faster</p>
                    </div>
                  </div>
                  <p className="max-w-md text-sm leading-6 text-white/72 md:text-base">
                    A bold local guide for restaurants, hospitals, diagnostics, and nearby essentials across Dhanmondi.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                    <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5">Food Discovery</span>
                    <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5">Healthcare Access</span>
                    <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5">Mobile First</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-200">Quick Routes</p>
                  <div className="flex flex-col gap-2 text-sm text-white/72">
                    <Link href="/" className="footer-link">Home</Link>
                    <Link href="/search" className="footer-link">Search Places</Link>
                    <Link href="/admin" className="footer-link">Admin Dashboard</Link>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-amber-200">Why It Stands Out</p>
                  <div className="space-y-2 text-sm text-white/72">
                    <p>Curated categories with fast shortcut discovery.</p>
                    <p>Built for quick decisions on desktop and mobile.</p>
                    <p>Designed around local trust and visual clarity.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
                <p>© 2026 DhakaCity AI. Made for Dhanmondi residents.</p>
                <p>Sharper local search, better city navigation.</p>
              </div>
            </div>
        </footer>
      </body>
    </html>
  );
}
