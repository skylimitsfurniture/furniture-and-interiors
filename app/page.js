import ProductArt from "@/components/ProductArt";
import VideoBanner from "@/components/VideoBanner";
import { products, formatINR } from "@/lib/products";
import { getCloudinaryMedia } from "@/utils/cloudinary";

export default function Home() {
  const featured = products.slice(0, 3);

  return (
    <main>
      {/* Hero — dual promo banners */}
      <section className="max-w-content mx-auto px-4 md:px-10 pt-6 pb-16 grid md:grid-cols-2 gap-4">
        <VideoBanner
          videoUrl={process.env.NEXT_PUBLIC_GANESH_VIDEO_URL || "/videos/ganesh-chaturthi.mp4"}
          posterUrl={process.env.NEXT_PUBLIC_GANESH_VIDEO_POSTER}
        />

        {/* Banner 2: New arrivals */}
        <a
          href="/products"
          className="group relative rounded-2xl overflow-hidden bg-plum text-paper min-h-[380px] flex flex-col justify-between p-8 md:p-10"
        >
          <ProductArt tone="sage" className="absolute right-[-20px] top-[-20px] w-56 h-56 opacity-25 pointer-events-none" />
          <div>
            <span className="inline-block bg-paper text-plum text-xs font-semibold px-3 py-1 rounded-full">
              New arrivals
            </span>
            <h1 className="font-display text-4xl md:text-5xl leading-[1.05] mt-5">
              Bedrooms, <br /> reimagined
            </h1>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-paper/85 text-sm max-w-[220px]">
              The Hollow collection just landed — minimalist frames in deep
              ink and walnut.
            </p>
            <span className="shrink-0 px-5 py-2.5 rounded-full bg-paper text-plum text-sm font-semibold group-hover:bg-cloud transition-colors">
              Explore
            </span>
          </div>
        </a>
      </section>

      {/* Trust strip */}
      <section className="max-w-content mx-auto px-4 md:px-10 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            ["Free Shipping", "On every order, pan-India"],
            ["1,200+", "Homes furnished so far"],
            ["Solid Timber", "No flat-pack shortcuts"],
            ["7-Day Returns", "No questions asked"],
          ].map(([title, sub]) => (
            <div key={title} className="rounded-xl bg-cloud/60 px-3 py-5">
              <p className="font-display text-lg text-ink">{title}</p>
              <p className="text-xs text-ink/60 mt-1">{sub}</p>
            </div>
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
          {featured.map((p, i) => {
            const discount = [20, 15, 30][i] || 10;
            const strikeThrough = Math.round(p.price / (1 - discount / 100));
            return (
              <a key={p.id} href={`/products/${p.id}`} className="group block">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-cloud">
                  {p.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={getCloudinaryMedia(p.image, { width: 800 })}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  ) : (
                    <ProductArt tone={p.tone} className="w-full h-full group-hover:scale-[1.03] transition-transform duration-500" />
                  )}
                  <span className="absolute top-3 left-3 bg-flame text-paper text-xs font-semibold px-2.5 py-1 rounded-full">
                    {discount}% off
                  </span>
                </div>
                <div className="mt-4 flex items-baseline justify-between">
                  <p className="text-ink">{p.name}</p>
                  <p className="text-sm">
                    <span className="text-ink/40 line-through mr-2">{formatINR(strikeThrough)}</span>
                    <span className="text-ink font-medium">{formatINR(p.price)}</span>
                  </p>
                </div>
              </a>
            );
          })}
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
