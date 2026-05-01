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
        <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
          {/* Top utility bar */}
          <div className="border-b border-gray-100 bg-gray-50">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                <span className="font-medium text-green-700">AI Live Search</span>
                <span className="hidden sm:inline text-gray-400 mx-1.5">·</span>
                <span className="hidden sm:inline">Dhanmondi, Dhaka</span>
              </div>
              <nav className="flex items-center gap-5">
                <Link href="/" className="font-medium hover:text-teal-600 transition-colors">Home</Link>
                <Link href="/search" className="font-medium hover:text-teal-600 transition-colors">Explore</Link>
                <Link href="/admin" className="font-semibold text-orange-600 hover:text-orange-700 transition-colors">Admin</Link>
              </nav>
            </div>
          </div>

          {/* Main bar — logo + search */}
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
            <Link href="/" className="flex shrink-0 items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-teal-600 grid place-content-center text-xl text-white">
                🌆
              </div>
              <div className="hidden sm:block leading-tight">
                <div className="text-lg font-black text-teal-700 tracking-tight">DhakaCity AI</div>
                <div className="text-[10px] font-medium uppercase tracking-widest text-gray-400">Smart Local Discovery</div>
              </div>
            </Link>

            <form
              action="/search"
              method="GET"
              className="flex flex-1 items-stretch rounded-lg border border-gray-300 overflow-hidden transition-all focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100"
            >
              <div className="flex flex-1 items-center bg-white px-3 gap-2 min-w-0">
                <svg className="h-4 w-4 shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                </svg>
                <input
                  name="q"
                  type="text"
                  placeholder="Restaurants, hospitals, pharmacy…"
                  className="w-full py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent"
                />
              </div>
              <div className="hidden md:flex items-center border-l border-gray-200 bg-white px-3 gap-2 w-44 shrink-0">
                <svg className="h-4 w-4 shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="shrink-0 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 px-5 py-2.5 text-sm font-bold text-white transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="w-full bg-gray-900 text-white">
          <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-12">
            <div className="grid gap-8 md:grid-cols-[2fr_1fr_1fr]">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-teal-600 grid place-content-center text-lg text-white">
                    🌆
                  </div>
                  <div>
                    <p className="text-lg font-black">DhakaCity AI</p>
                    <p className="text-xs text-gray-400">Find trusted places faster</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                  A smart local guide for restaurants, hospitals, diagnostics, and nearby essentials across Dhanmondi, Dhaka.
                </p>
                <div className="flex gap-2 flex-wrap text-xs text-gray-500">
                  <span className="rounded border border-gray-700 px-2.5 py-1">Food Discovery</span>
                  <span className="rounded border border-gray-700 px-2.5 py-1">Healthcare</span>
                  <span className="rounded border border-gray-700 px-2.5 py-1">Mobile First</span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Navigation</p>
                <div className="flex flex-col gap-2 text-sm text-gray-400">
                  <Link href="/" className="hover:text-teal-400 transition-colors">Home</Link>
                  <Link href="/search" className="hover:text-teal-400 transition-colors">Search Places</Link>
                  <Link href="/admin" className="hover:text-teal-400 transition-colors">Admin Dashboard</Link>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Categories</p>
                <div className="flex flex-col gap-2 text-sm text-gray-400">
                  <Link href="/search?q=restaurants" className="hover:text-teal-400 transition-colors">Restaurants</Link>
                  <Link href="/search?q=hospitals" className="hover:text-teal-400 transition-colors">Hospitals</Link>
                  <Link href="/search?q=pharmacy" className="hover:text-teal-400 transition-colors">Pharmacy</Link>
                  <Link href="/search?q=diagnostic center" className="hover:text-teal-400 transition-colors">Diagnostics</Link>
                  <Link href="/search?q=cafe" className="hover:text-teal-400 transition-colors">Cafes</Link>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-800 pt-5 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between text-xs text-gray-600">
              <p>© 2026 DhakaCity AI. Made for Dhanmondi residents.</p>
              <p>Sharper local search · Better city navigation.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
