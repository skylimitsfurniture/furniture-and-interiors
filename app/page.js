import ProductArt from "@/components/ProductArt";
import { products, formatINR } from "@/lib/products";

export default function Home() {
  const featured = products.slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <section className="max-w-content mx-auto px-6 md:px-10 pt-16 md:pt-24 pb-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm text-timber mb-5">Made in India</p>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05] text-ink">
            Furniture for rooms that finally feel finished.
          </h1>
          <p className="mt-6 text-ink/70 max-w-md leading-relaxed">
            Every piece in the Skylimits catalog is built from solid timber
            frames and finished by hand in our Vizag workshop, then shipped
            straight to your door.
          </p>
          <div className="mt-9 flex gap-4">
            <a
              href="/products"
              className="px-6 py-3 rounded-full bg-ink text-paper hover:bg-timberdark transition-colors"
            >
              Browse the catalog
            </a>
            <a
              href="#story"
              className="px-6 py-3 rounded-full border border-ink/20 text-ink hover:border-ink/50 transition-colors"
            >
              Our story
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-[2rem] overflow-hidden bg-cloud grain aspect-[4/5] md:aspect-square">
            <ProductArt tone="timber" className="w-full h-full" />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-paper border border-ink/10 rounded-2xl px-5 py-4 shadow-sm hidden sm:block">
            <p className="font-display text-2xl text-ink">1,200+</p>
            <p className="text-xs text-ink/60">Homes furnished so far</p>
          </div>
        </div>
      </section>

      {/* Category strip */}
      <section className="max-w-content mx-auto px-6 md:px-10">
        <div className="rule" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink/10 my-px">
          {["Living Room", "Bedroom", "Dining", "Office"].map((cat) => (
            <a
              key={cat}
              href="/products"
              className="bg-paper py-8 text-center group hover:bg-cloud/60 transition-colors"
            >
              <span className="font-display text-lg text-ink group-hover:text-timberdark">
                {cat}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-content mx-auto px-6 md:px-10 py-24">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display text-3xl text-ink">A few favourites</h2>
          <a href="/products" className="text-sm text-timber hover:text-timberdark">
            View all
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {featured.map((p) => (
            <a key={p.id} href={`/products/${p.id}`} className="group block">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-cloud">
                <ProductArt tone={p.tone} className="w-full h-full group-hover:scale-[1.03] transition-transform duration-500" />
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <p className="text-ink">{p.name}</p>
                <p className="text-ink/60 text-sm">{formatINR(p.price)}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Brand statement */}
      <section id="story" className="bg-cloud/60">
        <div className="max-w-content mx-auto px-6 md:px-10 py-24 grid md:grid-cols-2 gap-12">
          <p className="font-display text-3xl md:text-4xl text-ink leading-snug">
            We started Skylimits because most furniture is built for the
            showroom, not the home.
          </p>
          <p className="text-ink/70 leading-relaxed self-end">
            Every frame is joined, sanded, and finished by the same small team
            of carpenters in Visakhapatnam. No flat-pack shortcuts — just
            furniture meant to be lived on for years, not one lease.
          </p>
        </div>
      </section>
    </main>
  );
}
