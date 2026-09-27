"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { furnitureData, formatINR } from "@/data/furnitureData";

import { getCloudinaryMedia } from "@/utils/cloudinary";

const CATEGORIES = [

  {
    key: "Living Room",
    label: "Living Room",
    icon: "🏠",
    accentColor: "#8B5E3C",
    tagline: "Handcrafted comfort, timeless silhouette",
    href: "/products?category=Living%20Room",
  },
  {
    key: "Bedroom",
    label: "Bedroom",
    icon: "🛏️",
    accentColor: "#7A2E58",
    tagline: "Serene silhouettes in premium teakwood, MDF wood & brass",
    href: "/products?category=Bedroom",
  },
  {
    key: "Dining Room",
    label: "Dining",
    icon: "🍽️",
    accentColor: "#B08D57",
    tagline: "Solid wood tables & crafted ergonomic seating",
    href: "/products?category=Dining%20Room",
  },
  {
    key: "Office",
    label: "Office",
    icon: "💼",
    accentColor: "#7C8C7A",
    tagline: "Focus-forward executive desks & library shelves",
    href: "/products?category=Office",
  },
];

function ProductMiniCard({ product, index }) {
  const [imgError, setImgError] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const discount = [20, 15, 30, 25, 10, 18, 22, 12, 28, 35][index % 10] || 15;
  const originalPrice = Math.round(product.price / (1 - discount / 100));
  const optimizedImg = getCloudinaryMedia(product.image, { width: 600 });

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-[#EDE8DE]/90 hover:border-[#8B5E3C]/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] bg-[#EDE8DE]/30 overflow-hidden">
        {product.image && !imgError ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={optimizedImg}
            alt={product.title || product.name}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-[#EDE8DE]/60 flex items-center justify-center">
            <span className="text-3xl opacity-40">🪑</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
          <span className="bg-[#E8583A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs tracking-wide">
            {discount}% OFF
          </span>
          <span className="bg-emerald-600/90 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-xs flex items-center gap-0.5">
            <span>⚡</span> Vizag
          </span>
        </div>

        {/* Quick Actions Hover Overlay */}
        <div className="absolute inset-0 bg-[#1E2A32]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex flex-col items-center justify-center gap-2 p-3 z-20">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-full py-2 text-xs font-bold rounded-full transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 shadow-md ${added
                ? "bg-emerald-600 text-white"
                : "bg-white text-[#1E2A32] hover:bg-[#8B5E3C] hover:text-white"
              }`}
          >
            {added ? "✓ In Cart" : "+ Add to Cart"}
          </button>
          <Link
            href={`/products/${product.id}`}
            className="w-full py-2 text-xs font-semibold rounded-full bg-[#8B5E3C] text-white text-center hover:bg-[#5E3E27] transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 delay-75 shadow-md"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Card Info Section */}
      <div className="p-3.5 flex flex-col flex-1 justify-between bg-white">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#1E2A32]/60 mb-1">
            <span className="truncate max-w-[120px] font-medium">{product.subcategory}</span>
            {product.rating && (
              <span className="flex items-center gap-0.5 font-semibold text-amber-600 shrink-0">
                ★ {product.rating}
              </span>
            )}
          </div>
          <Link href={`/products/${product.id}`} className="block">
            <h3 className="font-display text-sm font-semibold text-[#1E2A32] line-clamp-1 group-hover:text-[#8B5E3C] transition-colors">
              {product.title || product.name}
            </h3>
          </Link>
          <p className="text-[11px] text-[#1E2A32]/50 line-clamp-1 mt-0.5">
            {product.material || product.description}
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-[#EDE8DE]/60 flex items-baseline justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-sm text-[#1E2A32]">
              {formatINR(product.price)}
            </span>
            <span className="text-[11px] text-[#1E2A32]/40 line-through">
              {formatINR(originalPrice)}
            </span>
          </div>
          <Link
            href={`/products/${product.id}`}
            className="text-[11px] font-semibold text-[#8B5E3C] hover:text-[#5E3E27] transition-colors"
          >
            Explore →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CategoryGrid() {
  const [activeTab, setActiveTab] = useState("Living Room");
  const [animating, setAnimating] = useState(false);
  const tabsRef = useRef(null);

  const activeCat = CATEGORIES.find((c) => c.key === activeTab) || CATEGORIES[0];

  // Retrieve products based on selected tab
  const getTabProducts = (tabKey) => {
    return furnitureData.filter((p) => p.category === tabKey);
  };

  const allTabProducts = getTabProducts(activeTab);
  const categoryProducts = allTabProducts.slice(0, 25);

  const handleTabChange = (key) => {
    if (key === activeTab) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveTab(key);
      setAnimating(false);
    }, 180);
  };

  return (
    <section id="categories-grid" className="w-full py-16 md:py-24 bg-[#FBFAF7]">
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5E3C]/10 text-[#8B5E3C] text-xs font-bold uppercase tracking-wider mb-3">
              <span>✦</span> Curated Collection Showcase
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-[#1E2A32] tracking-tight">
              Featured Rooms & Daily Living
            </h2>
            <p className="text-sm md:text-base text-[#1E2A32]/65 mt-2 max-w-xl">
              Signature sofas, daily use essentials, and handpicked room collections. Built from solid timber, forged brass, and sustainable linens.
            </p>
          </div>
          <Link
            href={activeCat.href}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#8B5E3C] hover:text-[#5E3E27] transition-colors group self-start md:self-end"
          >
            View all {activeCat.label} items
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Categories Tab Navigation */}
        <div
          ref={tabsRef}
          className="flex items-center gap-2.5 mb-8 overflow-x-auto pb-2 scrollbar-none border-b border-[#EDE8DE]/80"
          style={{ scrollbarWidth: "none" }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.key;
            const tabCount = getTabProducts(cat.key).length;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => handleTabChange(cat.key)}
                className={`flex-shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${isActive
                    ? "bg-[#1E2A32] text-white shadow-md scale-102"
                    : "bg-[#EDE8DE]/70 text-[#1E2A32]/80 hover:bg-[#EDE8DE] hover:text-[#1E2A32]"
                  }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.label}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${isActive ? "bg-white/20 text-white" : "bg-[#1E2A32]/10 text-[#1E2A32]"
                    }`}
                >
                  {tabCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Category Tagline & Counter */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
          <p className="text-xs md:text-sm text-[#1E2A32]/70">
            <span className="font-semibold text-[#1E2A32]">{activeCat.tagline}</span> — Displaying {categoryProducts.length} curated pieces
          </p>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8B5E3C]">
            <span className="w-2 h-2 rounded-full bg-[#8B5E3C] animate-pulse" />
            100% Unique Verified Photography
          </div>
        </div>

        {/* Grid Layout: 5 columns on desktop, 3 on tablet, 2 on mobile */}
        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 md:gap-4.5 transition-all duration-250 ${animating ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
            }`}
        >
          {categoryProducts.map((product, index) => (
            <ProductMiniCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-12 text-center">
          <Link
            href={activeCat.href}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1E2A32] text-white text-sm font-semibold hover:bg-[#8B5E3C] transition-all shadow-md hover:shadow-lg hover:scale-102"
          >
            <span>Explore Complete {activeCat.label} Catalog</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
