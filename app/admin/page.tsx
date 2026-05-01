import { AdminPlaceForm } from "@/components/admin-place-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
  const [totalPlaces, featuredPlaces, categoryCount] = await getStats();

  return (
    <div className="w-full px-4 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-4xl space-y-6 md:space-y-8">
        {/* Header */}
        <div className="rounded-3xl border border-white/70 bg-white/75 p-6 shadow-[0_22px_70px_-45px_rgba(15,23,42,0.75)] backdrop-blur-sm">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Admin Dashboard
            </h1>
            <p className="text-foreground/75">
              Manage places, restaurants, hospitals, and diagnostic centers
              from one control panel.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="rounded-2xl border-cyan-100 bg-cyan-50/70">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-cyan-700">
                Total Places
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-cyan-900">
                {totalPlaces}
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-emerald-100 bg-emerald-50/70">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-emerald-700">
                Featured
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-emerald-900">
                {featuredPlaces}
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-amber-100 bg-amber-50/70">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-amber-700">
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold text-amber-900">
                {categoryCount}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add/Edit Form */}
        <AdminPlaceForm />
      </div>
    </div>
  );
}

async function getStats(): Promise<[number, number, number]> {
  try {
    const [totalPlaces, featuredPlaces, categoryRows] = await Promise.all([
      prisma.place.count(),
      prisma.place.count({ where: { featured: true } }),
      prisma.place.groupBy({ by: ["category"] }),
    ]);

    return [totalPlaces, featuredPlaces, categoryRows.length];
  } catch {
    // Keep admin page render-safe before DATABASE_URL is configured.
    return [0, 0, 3];
  }
}
