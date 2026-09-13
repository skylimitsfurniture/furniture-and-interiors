import ProductArt from "@/components/ProductArt";
import { products, formatINR } from "@/lib/products";

const categories = ["All", "Living Room", "Bedroom", "Dining", "Office"];

const spanClass = {
  large: "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto",
  medium: "md:col-span-1 md:row-span-2 aspect-[4/5]",
  small: "aspect-square",
};

export default function ProductsPage({ searchParams }) {
  const active = searchParams?.category || "All";
  const list =
    active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <main className="max-w-content mx-auto px-6 md:px-10 py-16">
      <div className="mb-12">
        <p className="text-sm text-timber mb-3">Catalog</p>
        <h1 className="font-display text-4xl text-ink">All furniture</h1>
      </div>

      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map((c) => (
          <a
            key={c}
            href={c === "All" ? "/products" : `/products?category=${encodeURIComponent(c)}`}
            className={`px-4 py-2 rounded-full text-sm border transition-colors ${
              active === c
                ? "bg-ink text-paper border-ink"
                : "border-ink/20 text-ink/70 hover:border-ink/50"
            }`}
          >
            {c}
          </a>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 md:auto-rows-[180px] gap-6">
        {list.map((p) => (
          <a
            key={p.id}
            href={`/products/${p.id}`}
            className={`group rounded-2xl overflow-hidden bg-cloud relative flex flex-col ${spanClass[p.size]}`}
          >
            <ProductArt tone={p.tone} className="flex-1 w-full group-hover:scale-[1.03] transition-transform duration-500" />
            <div className="p-4 bg-paper">
              <p className="text-ink text-sm md:text-base">{p.name}</p>
              <p className="text-ink/60 text-xs md:text-sm mt-1">{formatINR(p.price)}</p>
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
