import ProductArt from "@/components/ProductArt";
import { products, formatINR } from "@/lib/products";

const categories = ["All", "Living Room", "Bedroom", "Dining", "Office"];

export default async function ProductsPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const active = resolvedParams?.category || "All";
  const query = resolvedParams?.q?.toLowerCase() || "";

  const list = products.filter((p) => {
    const matchesCategory =
      active === "All" || p.category === active;

    const matchesQuery = query
      ? (p.name && p.name.toLowerCase().includes(query)) ||
        (p.category && p.category.toLowerCase().includes(query)) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(query)) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(query)))
      : true;

    return matchesCategory && matchesQuery;
  });

  return (
    <main className="max-w-content mx-auto px-6 md:px-10 py-16">
      <div className="mb-12">
        <p className="text-sm text-timber mb-3">Catalog</p>
        <h1 className="font-display text-4xl text-ink">
          {resolvedParams?.q ? `Results for "${resolvedParams.q}"` : "All furniture"}
        </h1>
      </div>

      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map((c) => (
          <a
            key={c}
            href={c === "All" ? "/products" : `/products?category=${encodeURIComponent(c)}`}
            className={`px-4 py-2 rounded-full text-sm border transition-colors ${
              active === c && !query
                ? "bg-ink text-paper border-ink"
                : "border-ink/20 text-ink/70 hover:border-ink/50"
            }`}
          >
            {c}
          </a>
        ))}
      </div>

      {/* Uniform grid for compact product cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {list.map((p) => (
          <a
            key={p.id}
            href={`/products/${p.id}`}
            className="group rounded-2xl overflow-hidden bg-cloud relative flex flex-col h-[280px]"
          >
            <ProductArt
              tone={p.tone}
              className="h-[190px] w-full group-hover:scale-[1.03] transition-transform duration-500"
            />
            <div className="p-4 bg-paper h-[90px] flex flex-col justify-center">
              <p className="text-ink text-sm font-medium truncate">{p.name}</p>
              <p className="text-ink/60 text-xs mt-1">{formatINR(p.price)}</p>
            </div>
          </a>
        ))}
      </div>

      {list.length === 0 && (
        <p className="text-ink/50 py-20 text-center">
          Nothing here yet — try a different category.
        </p>
      )}
    </main>
  );
}