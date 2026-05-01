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
      <body className="app-shell min-h-full flex flex-col">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="floating-orb floating-orb-1" />
          <div className="floating-orb floating-orb-2" />
          <div className="floating-orb floating-orb-3" />
        </div>

        {/* Sticky Header */}
        <header className="sticky top-0 z-50 w-full px-3 pt-3 md:px-5 md:pt-4">
          <div className="container rounded-[2rem] border border-white/50 bg-white/68 px-4 py-3 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.72)] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/58 md:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <Link href="/" className="flex min-w-0 items-center gap-3">
                <span className="inline-grid h-11 w-11 shrink-0 place-content-center rounded-2xl bg-gradient-to-br from-cyan-500 via-emerald-400 to-amber-400 text-lg shadow-[0_18px_30px_-18px_rgba(56,189,248,0.9)] ring-1 ring-white/70">
                  🌆
                </span>
                <span className="min-w-0">
                  <span className="block text-[1.15rem] font-black tracking-tight bg-gradient-to-r from-cyan-700 via-emerald-700 to-amber-700 bg-clip-text text-transparent md:text-2xl">
                    DhakaCity AI
                  </span>
                  <span className="block truncate text-xs font-medium uppercase tracking-[0.22em] text-foreground/55 md:text-[0.7rem]">
                    Smart local discovery for Dhaka
                  </span>
                </span>
              </Link>

              <div className="flex flex-col gap-3 md:ml-auto md:items-end">
                <div className="header-ribbon hidden items-center gap-2 rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-foreground/70 md:flex">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_6px_rgba(16,185,129,0.12)]" />
                  Live search for food and care
                </div>
                <nav className="flex flex-wrap items-center gap-2 md:justify-end">
                  <Link
                    href="/"
                    className="rounded-full border border-cyan-200/70 bg-cyan-50/80 px-4 py-2 text-sm font-semibold text-cyan-900 transition hover:-translate-y-0.5 hover:bg-cyan-100"
                  >
                    Home
                  </Link>
                  <Link
                    href="/search"
                    className="rounded-full border border-emerald-200/70 bg-emerald-50/80 px-4 py-2 text-sm font-semibold text-emerald-900 transition hover:-translate-y-0.5 hover:bg-emerald-100"
                  >
                    Explore Places
                  </Link>
                  <Link
                    href="/admin"
                    className="rounded-full border border-amber-200/80 bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-2 text-sm font-semibold text-amber-950 transition hover:-translate-y-0.5 hover:from-amber-200 hover:to-orange-200"
                  >
                    Admin Studio
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="px-3 pb-4 pt-8 md:px-5 md:pb-6 md:pt-12">
          <div className="container overflow-hidden rounded-[2rem] border border-white/45 bg-slate-950 text-white shadow-[0_30px_90px_-45px_rgba(15,23,42,0.88)]">
            <div className="footer-mesh relative px-5 py-8 md:px-8 md:py-10">
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
          </div>
        </footer>
      </body>
    </html>
  );
}
