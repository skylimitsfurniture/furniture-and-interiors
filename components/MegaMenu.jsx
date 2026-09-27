"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProductArt from "@/components/ProductArt";
import { searchProducts, formatINR } from "@/lib/products";
import { getCloudinaryMedia } from "@/utils/cloudinary";
import { useAuth } from "@/context/AuthContext";

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
  const {
    user,
    profile,
    isSubscribed,
    openAuthModal,
    openPricingModal,
    signOut,
  } = useAuth();

  const [activeCategory, setActiveCategory] = useState(null);
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const boxRef = useRef(null);

  const results = searchProducts(query).slice(0, 5);

  useEffect(() => {
    function handleClickOutside(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setShowResults(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function goToSearch() {
    if (query.trim()) {
      setShowResults(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <header className="relative z-50 bg-paper border-b border-cloud font-body text-ink">
      {/* Top Notification Banner */}
      <div className="bg-timber text-paper text-xs py-2 px-4 text-center font-medium tracking-wide flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        <span>📍 Visakhapatnam Showroom: Near Railway New Colony</span>
        <span className="hidden sm:inline">•</span>
        <span>100% Termite-Proof BWP Marine Ply & Solid Teak</span>
        <span className="hidden sm:inline">•</span>
        <a href="tel:+919959427831" className="underline font-bold hover:text-amber-200">Call: +91 99594 27831</a>
      </div>

      {/* Main Bar */}
      <div className="max-w-[1180px] mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-display text-2xl font-bold tracking-tight text-timber">
          SKY LIMITS FURNITURE
        </Link>
 
        {/* Search Input */}
        <div className="flex-1 max-w-md mx-8 relative" ref={boxRef}>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") goToSearch();
              if (e.key === "Escape") setShowResults(false);
            }}
            placeholder="Search sofas, beds, desks..."
            className="w-full px-4 py-2 text-sm bg-cloud/50 border border-cloud rounded-lg focus:outline-none focus:border-timber transition-colors"
          />

          {showResults && query.trim() && (
            <div className="absolute top-full left-0 w-full bg-paper border border-cloud rounded-xl shadow-xl mt-2 overflow-hidden z-50">
              {results.length === 0 ? (
                <p className="px-4 py-4 text-sm text-ink/50">
                  No matches for “{query}” yet.
                </p>
              ) : (
                <>
                  <ul>
                    {results.map((p) => (
                      <li key={p.id}>
                        <Link
                          href={`/products/${p.id}`}
                          onClick={() => setShowResults(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-cloud/50 transition-colors"
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-cloud shrink-0 relative">
                            {p.image ? (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img
                                src={getCloudinaryMedia(p.image, { width: 120, height: 120 })}
                                alt={p.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <ProductArt tone={p.tone} className="w-full h-full" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-ink truncate">{p.name}</p>
                            <p className="text-xs text-ink/50">{p.category}</p>
                          </div>
                          <p className="text-xs text-ink/70 shrink-0">{formatINR(p.price)}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={goToSearch}
                    className="w-full text-left px-4 py-3 text-sm text-timber hover:bg-cloud/50 border-t border-cloud transition-colors"
                  >
                    See all results for “{query}” →
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Header Action Links */}
        <div className="flex items-center space-x-5 text-sm font-medium">
          {/* VIP Pro Status Pill */}
          {!isSubscribed ? (
            <button
              type="button"
              onClick={openPricingModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold hover:bg-amber-100 transition-colors shadow-xs"
            >
              <span>⭐</span>
              <span>VIP Pro</span>
            </button>
          ) : (
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold shadow-xs">
              <span>👑</span>
              <span>VIP</span>
            </span>
          )}

          {/* User Account / Sign In */}
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-ink/70 font-semibold truncate max-w-[120px]">
                {profile?.fullName || user.email?.split("@")[0]}
              </span>
              <button
                type="button"
                onClick={signOut}
                className="text-xs text-timber hover:text-timberdark underline"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => openAuthModal("login")}
              className="hover:text-timber transition-colors text-sm font-medium cursor-pointer"
            >
              Sign In
            </button>
          )}

          <Link href="/wishlist" className="hidden sm:inline hover:text-timber transition-colors">Wishlist</Link>
          <Link href="/cart" className="flex items-center gap-1 hover:text-timber transition-colors">
            <span className="text-base">🛒</span>
            <span className="hidden sm:inline">Cart</span>
          </Link>

          {/* Hamburger Menu Button for Mobile */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-ink hover:bg-cloud/60 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-paper border-t border-cloud/70 px-4 py-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="space-y-4">
            <p className="text-xs font-bold text-timber uppercase tracking-wider">Browse Collections</p>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/products?category=${encodeURIComponent(cat.name)}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl bg-cloud/40 hover:bg-cloud font-medium text-sm text-ink transition-colors block text-center"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-cloud/60 space-y-2">
              <Link
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-semibold text-timber hover:underline"
              >
                Custom Interiors & Kitchens →
              </Link>
              <Link
                href="/materials"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-semibold text-timber hover:underline"
              >
                Material & Wood Guide →
              </Link>
              <Link
                href="/estimator"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-semibold text-emerald-700 hover:underline"
              >
                Cost Estimator Tool 📐 →
              </Link>
              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-semibold text-timber hover:underline"
              >
                All Furniture Catalog →
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm text-ink/80 hover:text-timber"
              >
                Saved Wishlist
              </Link>
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm text-ink/80 hover:text-timber"
              >
                Shopping Cart
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Categories Bar */}
      <nav className="hidden md:block border-t border-cloud/60 bg-paper">
        <div className="max-w-[1180px] mx-auto px-4 flex items-center justify-between">
          <div className="flex space-x-8">
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

          <div className="flex items-center space-x-6 py-2">
            <Link
              href="/services"
              className="text-xs font-bold text-ink hover:text-timber transition-colors uppercase tracking-wider"
            >
              Custom Interiors
            </Link>
            <Link
              href="/materials"
              className="text-xs font-bold text-ink hover:text-timber transition-colors uppercase tracking-wider"
            >
              Wood & Ply Guide
            </Link>
            <Link
              href="/estimator"
              className="text-xs font-bold text-emerald-800 bg-emerald-100/70 hover:bg-emerald-200/80 px-2.5 py-1 rounded-full transition-colors uppercase tracking-wider"
            >
              Cost Estimator 📐
            </Link>
          </div>
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
                            href={`/products?category=${encodeURIComponent(
                              categories.find((c) => c.slug === activeCategory)?.name || ""
                            )}&subcategory=${encodeURIComponent(item)}`}
                            onClick={() => setActiveCategory(null)}
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