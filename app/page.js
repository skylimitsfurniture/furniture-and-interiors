import CategoryGrid from "@/components/CategoryGrid";
import VideoShowcase from "@/components/VideoShowcase";
import OffersCarousel from "@/components/OffersCarousel";
import PartnersMarquee from "@/components/PartnersMarquee";
import ProductArt from "@/components/ProductArt";
import VideoBanner from "@/components/VideoBanner";
import Link from "next/link";

export const metadata = {
  title: "Skylimits Furniture | Teakwood & Coastal Architectural Living",
  description:
    "Explore 140+ handcrafted furniture pieces across Living Room, Bedroom, Dining, and Office. Visakhapatnam artisan craftsmanship built to outlast the lease.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FBFAF7] text-[#1E2A32] overflow-x-hidden">
      {/* 1. Hero Promo Banners (Dual Promo Highlight with Starting Video Banner) */}
      <section className="max-w-[1240px] mx-auto px-4 md:px-8 pt-6 pb-12 grid md:grid-cols-2 gap-5">
        <VideoBanner
          videoUrl={process.env.NEXT_PUBLIC_GANESH_VIDEO_URL || "/videos/ganesh-chaturthi.mp4"}
          posterUrl={process.env.NEXT_PUBLIC_GANESH_VIDEO_POSTER}
        />

        {/* Hero Card 2: The Hollow Bedroom Collection */}
        <Link
          href="/products?category=Bedroom"
          className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#7A2E58] to-[#451830] text-[#FBFAF7] min-h-[380px] flex flex-col justify-between p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <ProductArt
            tone="sage"
            className="absolute right-[-20px] top-[-20px] w-64 h-64 opacity-25 pointer-events-none group-hover:scale-110 transition-transform duration-700"
          />

          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#FBFAF7] text-[#7A2E58] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              <span>✦</span> New Collection 2026
            </div>
            <h1 className="font-display text-4xl md:text-5xl leading-[1.08] mt-6 tracking-tight">
              Bedrooms, <br />
              <span className="italic font-normal">reimagined.</span>
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mt-6">
            <p className="text-[#FBFAF7]/85 text-xs md:text-sm max-w-[260px] leading-relaxed">
              The Hollow edit just landed — handcrafted low-platform teakwood and moisture-resistant wood frames in deep ink and warm walnut.
            </p>
            <span className="shrink-0 px-6 py-3 rounded-full bg-[#FBFAF7] text-[#7A2E58] text-xs md:text-sm font-bold group-hover:bg-[#EDE8DE] transition-all shadow-md group-hover:scale-105">
              Shop The Edit →
            </span>
          </div>
        </Link>
      </section>

      {/* 2. Trust & Craftsmanship Value Strip */}
      <section className="max-w-[1240px] mx-auto px-4 md:px-8 mb-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 text-center">
          {[
            ["Free Shipping", "Pan-India delivery on all orders", "🚚"],
            ["1,200+ Homes", "Furnished with lasting care in Vizag", "🏡"],
            ["Solid Timber", "No flat-pack shortcuts or low-grade ply", "🪵"],
            ["10-Year Warranty", "Joinery integrity guaranteed", "🛡️"],
          ].map(([title, sub, icon]) => (
            <div
              key={title}
              className="rounded-2xl bg-white border border-[#EDE8DE] hover:border-[#8B5E3C]/30 p-4 md:p-5 shadow-xs transition-all hover:shadow-md"
            >
              <span className="text-xl md:text-2xl mb-1.5 block">{icon}</span>
              <p className="font-display text-sm md:text-base font-semibold text-[#1E2A32]">{title}</p>
              <p className="text-[11px] md:text-xs text-[#1E2A32]/60 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Hero / Category Display Section (5x5 Grid per Category Tab) */}
      <CategoryGrid />

      {/* 4. Video Display / Cinematic Event Showcase Section (Sound + Controls) */}
      <div id="video-showcase">
        <VideoShowcase />
      </div>

      {/* 5. Interactive Offers & Highlights Carousel (5 Slides + Destination Links) */}
      <OffersCarousel />

      {/* 6. Brand Statement & Studio Heritage */}
      <section id="story" className="w-full py-20 md:py-28 bg-[#EDE8DE]/50 border-y border-[#EDE8DE]">
        <div className="max-w-[1240px] mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B5E3C]/10 text-[#8B5E3C] text-xs font-bold uppercase tracking-wider mb-3">
              <span>✦</span> The Skylimits Philosophy
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-[#1E2A32] leading-tight">
              We build for real homes, not fleeting showrooms.
            </h2>
          </div>
          <div className="space-y-4 text-sm md:text-base text-[#1E2A32]/75 leading-relaxed">
            <p>
              Every frame is joined, sanded, and hand-finished by our dedicated team of carpenters in Visakhapatnam. We reject flat-pack shortcuts and synthetic composite fillers.
            </p>
            <p>
              From solid kiln-dried teak to organic linen weaves and forged brass joints, each piece is engineered to outlast leases and grow richer with patina over decades.
            </p>
            <div className="pt-2 flex items-center gap-6">
              <div>
                <p className="font-display text-2xl font-bold text-[#8B5E3C]">100%</p>
                <p className="text-xs text-[#1E2A32]/60">Hand-finished in Vizag</p>
              </div>
              <div className="h-8 w-[1px] bg-[#EDE8DE]" />
              <div>
                <p className="font-display text-2xl font-bold text-[#8B5E3C]">IS:710</p>
                <p className="text-xs text-[#1E2A32]/60">BWP Marine Grade</p>
              </div>
              <div className="h-8 w-[1px] bg-[#EDE8DE]" />
              <div>
                <p className="font-display text-2xl font-bold text-[#8B5E3C]">140+</p>
                <p className="text-xs text-[#1E2A32]/60">Original Blueprints</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Our Partners & Collaborators Section (Auto-Scrolling Ticker) */}
      <PartnersMarquee />
    </main>
  );
}
