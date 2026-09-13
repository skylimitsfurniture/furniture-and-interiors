"use client";

import { useState } from "react";
import Link from "next/link";

const categories = [
  {
    name: "Living Room",
    slug: "living-room",
    subcategories: [
      {
        title: "Sofas",
        items: ["3 Seater Sofas", "2 Seater Sofas", "1 Seater Sofas", "Sofa Sets", "Sectional Sofas", "Sofa Cum Beds"],
      },
      {
        title: "Chairs & Seating",
        items: ["Accent Chairs", "Arm Chairs", "Recliners", "Ottomans", "Settees & Benches", "Bean Bags"],
      },
      {
        title: "Tables",
        items: ["Coffee Tables", "Side & End Tables", "Console Tables", "TV Units"],
      },
    ],
    promo: {
      title: "Arden 3-Seater Sofa",
      subtitle: "Crafted in solid timber with sage upholstery",
      offer: "Up to 30% Off",
      link: "/products/sofa-arden",
      color: "bg-timber",
    },
  },
  {
    name: "Bedroom",
    slug: "bedroom",
    subcategories: [
      {
        title: "Beds",
        items: ["King Size Beds", "Queen Size Beds", "Platform Beds", "Storage Beds"],
      },
      {
        title: "Storage",
        items: ["Wardrobes", "Chest of Drawers", "Bedside Tables", "Dressers"],
      },
      {
        title: "Mattresses",
        items: ["King Mattress", "Queen Mattress", "Orthopedic Mattresses"],
      },
    ],
    promo: {
      title: "Hollow Platform Bed",
      subtitle: "Minimalist solid wood frame in deep ink finish",
      offer: "New Arrival",
      link: "/products/bed-hollow",
      color: "bg-ink",
    },
  },
  {
    name: "Dining",
    slug: "dining",
    subcategories: [
      {
        title: "Dining Sets",
        items: ["6 Seater Sets", "4 Seater Sets", "Dining Tables", "Dining Chairs"],
      },
      {
        title: "Bar & Storage",
        items: ["Bar Stools", "Bar Cabinets", "Crockery Units", "Benches"],
      },
    ],
    promo: {
      title: "Marrow Dining Table",
      subtitle: "Handcrafted natural timber dining table",
      offer: "Special Price: ₹27,999",
      link: "/products/table-marrow",
      color: "bg-brass",
    },
  },
  {
    name: "Office",
    slug: "office",
    subcategories: [
      {
        title: "Desks",
        items: ["Writing Desks", "Executive Desks", "Compact Desks"],
      },
      {
        title: "Chairs",
        items: ["Ergonomic Chairs", "Executive Chairs", "Study Chairs"],
      },
      {
        title: "Storage",
        items: ["Bookshelves", "Filing Cabinets", "Wall Shelves"],
      },
    ],
    promo: {
      title: "Fenn Writing Desk",
      subtitle: "Brass accents with sleek walnut finish",
      offer: "Limited Stock",
      link: "/products/desk-fenn",
      color: "bg-sage",
    },
  },
];

export default function MegaMenu() {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <header className="relative z-50 bg-paper border-b border-cloud font-body text-ink">
      {/* Top Notification Banner */}
      <div className="bg-timber text-paper text-xs py-2 text-center font-medium tracking-wide">
        Extra 10% off on orders above ₹25,000 | Use Code: <span className="underline font-bold">SKYLIMITS10</span>
      </div>

      {/* Main Bar */}
      <div className="max-w-[1180px] mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-2xl font-bold tracking-tight text-timber">
          SKY LIMITS FURNITURE
        </Link>
 
        {/* Search Input */}
        <div className="flex-1 max-w-md mx-8">
          <input
            type="text"
            placeholder="Search sofas, beds, desks..."
            className="w-full px-4 py-2 text-sm bg-cloud/50 border border-cloud rounded-lg focus:outline-none focus:border-timber transition-colors"
          />
        </div>

        {/* Header Action Links */}
        <div className="flex items-center space-x-6 text-sm font-medium">
          <Link href="/account" className="hover:text-timber transition-colors">Account</Link>
          <Link href="/wishlist" className="hover:text-timber transition-colors">Wishlist</Link>
          <Link href="/cart" className="hover:text-timber transition-colors">Cart</Link>
        </div>
      </div>

      {/* Categories Bar */}
      <nav className="border-t border-cloud/60 bg-paper">
        <div className="max-w-[1180px] mx-auto px-4 flex space-x-8">
          {categories.map((cat) => (
            <div
              key={cat.slug}
              onMouseEnter={() => setActiveCategory(cat.slug)}
              className="py-3"
            >
              <button
                className={`text-sm font-medium transition-colors ${
                  activeCategory === cat.slug
                    ? "text-timber font-semibold border-b-2 border-timber pb-[10px]"
                    : "text-ink hover:text-timber"
                }`}
              >
                {cat.name}
              </button>
            </div>
          ))}
        </div>
      </nav>

      {/* Hover Dropdown Overlay */}
      {activeCategory && (
        <div
          onMouseLeave={() => setActiveCategory(null)}
          className="absolute top-full left-0 w-full bg-paper border-b border-cloud shadow-xl"
        >
          <div className="max-w-[1180px] mx-auto px-4 py-8 grid grid-cols-4 gap-8">
            <div className="col-span-3 grid grid-cols-3 gap-6">
              {categories
                .find((c) => c.slug === activeCategory)
                ?.subcategories.map((group, idx) => (
                  <div key={idx}>
                    <h4 className="text-sm font-semibold text-timber mb-3">
                      {group.title}
                    </h4>
                    <ul className="space-y-2">
                      {group.items.map((item, i) => (
                        <li key={i}>
                          <Link
                            href="#"
                            className="text-xs text-ink/80 hover:text-timber transition-colors block"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>

            {/* Promo Card */}
            {(() => {
              const promo = categories.find((c) => c.slug === activeCategory)?.promo;
              if (!promo) return null;
              return (
                <div className={`${promo.color} text-paper p-6 rounded-xl flex flex-col justify-between`}>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-paper/20 px-2 py-1 rounded">
                      {promo.offer}
                    </span>
                    <h3 className="font-display text-lg font-bold mt-4 leading-snug">
                      {promo.title}
                    </h3>
                    <p className="text-xs text-paper/80 mt-2">
                      {promo.subtitle}
                    </p>
                  </div>
                  <Link
                    href={promo.link}
                    className="mt-6 text-xs font-semibold underline underline-offset-4 hover:opacity-80 transition-opacity"
                  >
                    Explore collection →
                  </Link>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </header>
  );
}