"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const SLIDES = [
  {
    id: "franchise",
    tag: "Expansion Opportunity",
    tagColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    title: "Franchise Opportunities",
    subtitle: "Partner with Skylimits Furniture and bring solid teakwood & engineered MDF luxury to prime retail locations nationwide.",
    buttonText: "Explore Franchise Model",
    link: "/franchise",
    image: "/images/franchise.jpg",
    accentGradient: "from-black/80 via-black/40 to-transparent",
  },
  {
    id: "new-collections",
    tag: "Just Landed",
    tagColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    title: "The Hollow Collection",
    subtitle: "Minimalist platform bed frames, floating nightstands, and deep walnut finishes designed for tranquil sleep sanctuaries.",
    buttonText: "Shop New Collections",
    link: "/products?category=Bedroom",
    image: "/images/new_collection.jpg",
    accentGradient: "from-black/80 via-black/40 to-transparent",
  },
  {
    id: "1k-club",
    tag: "VIP Membership",
    tagColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    title: "1K Club & Membership Rewards",
    subtitle: "Unlock priority workshop fabrication, complimentary home interior styling consultations, and 15% lifetime discount privileges.",
    buttonText: "Join 1K Club Today",
    link: "/pricing",
    image: "/images/1k_club.jpg",
    accentGradient: "from-black/80 via-black/40 to-transparent",
  },
  {
    id: "workshops",
    tag: "Live Masterclass",
    tagColor: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    title: "Workshop Updates & Events",
    subtitle: "Hands-on wood carving, joinery masterclasses, and sustainable teakwood & MDF craft open days in our flagship studio.",
    buttonText: "Reserve Workshop Pass",
    link: "/events",
    image: "/images/workshop.jpg",
    accentGradient: "from-black/80 via-black/40 to-transparent",
  },
  {
    id: "sofa-fabrics",
    tag: "Coastal Fabric Studio",
    tagColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    title: "Popular Sofa Cloth & Swatches",
    subtitle: "D'Decor, Sarom, Rayna & GM Fabrics paired with solid teak frames. Engineered for Vizag's coastal humidity.",
    buttonText: "Explore Fabric Guide",
    link: "/materials",
    image: "/images/vizag_sofa_fabrics_showcase_1790102086202.jpg",
    accentGradient: "from-black/80 via-black/40 to-transparent",
  },
  {
    id: "seasonal-discounts",
    tag: "Limited Festive Sale",
    tagColor: "bg-rose-500/20 text-rose-300 border-rose-500/30",
    title: "Seasonal Discounts & Offers",
    subtitle: "Save up to 40% across living room modular suites and solid dining sets with complimentary white-glove assembly.",
    buttonText: "Claim Festive Offers",
    link: "/products",
    image: "/images/seasonal_sale.jpg",
    accentGradient: "from-black/80 via-black/40 to-transparent",
  },
];

export default function OffersCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-advance every 5 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  return (
    <section className="w-full py-16 md:py-24 bg-[#EDE8DE]/40">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5E3C]/10 text-[#8B5E3C] text-xs font-bold uppercase tracking-wider mb-3">
              <span>★</span> Featured Highlights & Opportunities
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-[#1E2A32] tracking-tight">
              Interactive Offers & Highlights
            </h2>
            <p className="text-sm md:text-base text-[#1E2A32]/65 mt-2 max-w-lg">
              Explore our multi-tier franchise program, new arrivals, artisan studio workshops, and seasonal savings.
            </p>
          </div>

          {/* Slide Navigation Buttons */}
          <div className="flex items-center gap-2.5 self-start md:self-end">
            <button
              type="button"
              onClick={prevSlide}
              className="p-3 rounded-full bg-white border border-[#EDE8DE] text-[#1E2A32] hover:bg-[#8B5E3C] hover:text-white transition-all shadow-sm hover:scale-105 active:scale-95"
              aria-label="Previous Slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="p-3 rounded-full bg-white border border-[#EDE8DE] text-[#1E2A32] hover:bg-[#8B5E3C] hover:text-white transition-all shadow-sm hover:scale-105 active:scale-95"
              aria-label="Next Slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Viewport Container */}
        <div
          className="relative rounded-3xl overflow-hidden shadow-xl min-h-[440px] md:min-h-[520px] bg-[#1E2A32] flex items-center"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {SLIDES.map((slide, index) => {
            const isActive = index === current;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                {/* Background Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center"
                />

                {/* Dark Vignette Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 md:p-14 flex flex-col justify-between max-w-2xl">
                  {/* Top Badge */}
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${slide.tagColor}`}>
                      {slide.tag}
                    </span>
                  </div>

                  {/* Main Copy */}
                  <div className="my-auto py-6">
                    <h3 className="font-display text-3xl md:text-5xl text-white font-bold tracking-tight leading-tight">
                      {slide.title}
                    </h3>
                    <p className="text-white/80 text-sm md:text-lg mt-3 leading-relaxed max-w-xl">
                      {slide.subtitle}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <Link
                        href={slide.link}
                        className="px-7 py-3.5 rounded-full bg-[#8B5E3C] hover:bg-[#5E3E27] text-white text-sm font-semibold transition-all shadow-lg hover:scale-103"
                      >
                        {slide.buttonText} →
                      </Link>
                      <Link
                        href="/products"
                        className="px-6 py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-sm font-medium backdrop-blur-md transition-all border border-white/20"
                      >
                        Browse All Items
                      </Link>
                    </div>
                  </div>

                  {/* Footer Slide Indicator Info */}
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <span>Slide {index + 1} of {SLIDES.length}</span>
                    <span>•</span>
                    <span>Touch swipe or use arrows to navigate</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Dots Indicator */}
          <div className="absolute bottom-6 right-6 md:bottom-8 md:right-10 flex items-center gap-2 z-20">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-white shadow-md"
                    : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
