import { Suspense } from "react";
import CatalogView from "@/components/CatalogView";

export const metadata = {
  title: "Artisanal Furniture Catalog | Skylimits",
  description:
    "Explore our complete handcrafted furniture catalog across Living Room, Bedroom, Dining Room, and Office. Presented in high-definition photography with dynamic CDN delivery.",
};

export default async function ProductsPage({ searchParams }) {
  const resolvedParams = (await searchParams) || {};

  return (
    <main className="max-w-content mx-auto px-4 md:px-10 py-8 min-h-screen">
      <Suspense
        fallback={
          <div className="py-24 text-center">
            <div className="inline-block w-8 h-8 border-4 border-timber border-t-transparent rounded-full animate-spin mb-4" />
            <p className="font-display text-lg text-ink">Loading catalog...</p>
          </div>
        }
      >
        <CatalogView initialFilters={resolvedParams} />
      </Suspense>
    </main>
  );
}