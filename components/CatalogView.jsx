"use client";

import { useState } from "react";
import { useCatalogState } from "@/hooks/useCatalogState";
import CatalogBreadcrumbs from "@/components/CatalogBreadcrumbs";
import CatalogSidebar from "@/components/CatalogSidebar";
import ProductCard from "@/components/ProductCard";
import QuickViewModal from "@/components/QuickViewModal";

export default function CatalogView({ initialFilters = {} }) {
  const {
    category,
    section,
    subcategory,
    query,
    sortBy,
    filteredProducts,
    breadcrumbs,
    totalCount,
    hierarchy,
    selectCategory,
    selectSection,
    selectSubcategory,
    setSearch,
    setSort,
    resetFilters,
  } = useCatalogState(initialFilters);

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Active heading text based on current selection
  const headingText =
    subcategory !== "All"
      ? subcategory
      : section !== "All"
      ? section
      : category !== "All"
      ? category
      : "All Handcrafted Furniture";

  return (
    <div className="w-full">
      {/* Top Banner & Breadcrumbs */}
      <div className="border-b border-cloud/70 pb-6 mb-8">
        <CatalogBreadcrumbs breadcrumbs={breadcrumbs} />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2">
          <div>
            <p className="text-xs font-semibold text-timber uppercase tracking-wider">
              {category !== "All" ? category : "Artisanal Catalog"}
            </p>
            <h1 className="font-display text-3xl md:text-4xl text-ink font-bold mt-1">
              {headingText}
            </h1>
            <p className="text-xs md:text-sm text-ink/60 mt-1">
              Showing {totalCount} {totalCount === 1 ? "piece" : "pieces"} in HD photography
            </p>
          </div>

          {/* Search and Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter current view..."
                className="pl-8 pr-3 py-2 text-xs bg-cloud/50 border border-cloud rounded-lg focus:outline-none focus:border-timber w-48 md:w-56 transition-colors"
              />
              <svg
                className="w-3.5 h-3.5 text-ink/40 absolute left-2.5 top-3 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {query && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-2.5 text-ink/40 hover:text-ink text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-2 text-xs bg-cloud/50 border border-cloud rounded-lg focus:outline-none focus:border-timber text-ink font-medium"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* Mobile Filter Toggle */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-3 py-2 text-xs bg-ink text-paper rounded-lg font-medium flex items-center gap-1.5"
            >
              <span>Categories</span>
              <span className="bg-paper/20 px-1.5 py-0.5 rounded text-[10px]">
                {category !== "All" ? "1" : "All"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar + Grid */}
      <div className="flex flex-col lg:flex-row items-start gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <CatalogSidebar
            hierarchy={hierarchy}
            selectedCategory={category}
            selectedSection={section}
            selectedSubcategory={subcategory}
            onSelectCategory={selectCategory}
            onSelectSection={selectSection}
            onSelectSubcategory={selectSubcategory}
            onResetFilters={resetFilters}
          />
        </div>

        {/* Mobile Drawer */}
        {mobileFilterOpen && (
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm lg:hidden flex justify-end"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-80 max-w-full bg-paper h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-cloud">
                  <h2 className="font-display text-lg text-ink font-bold">
                    Filter by Hierarchy
                  </h2>
                  <button
                    type="button"
                    onClick={() => setMobileFilterOpen(false)}
                    className="text-ink/60 hover:text-ink text-xl font-bold"
                  >
                    ✕
                  </button>
                </div>
                <CatalogSidebar
                  hierarchy={hierarchy}
                  selectedCategory={category}
                  selectedSection={section}
                  selectedSubcategory={subcategory}
                  onSelectCategory={(c) => {
                    selectCategory(c);
                    setMobileFilterOpen(false);
                  }}
                  onSelectSection={(s, c) => {
                    selectSection(s, c);
                    setMobileFilterOpen(false);
                  }}
                  onSelectSubcategory={(sub, s, c) => {
                    selectSubcategory(sub, s, c);
                    setMobileFilterOpen(false);
                  }}
                  onResetFilters={() => {
                    resetFilters();
                    setMobileFilterOpen(false);
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full mt-6 py-3 rounded-xl bg-timber text-paper font-semibold text-sm"
              >
                View {totalCount} Items
              </button>
            </div>
          </div>
        )}

        {/* Product Grid Area */}
        <div className="flex-1 w-full min-w-0">
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center border border-dashed border-cloud rounded-2xl p-8">
              <p className="font-display text-xl text-ink font-semibold">
                No pieces found
              </p>
              <p className="text-ink/60 text-sm mt-2 max-w-md mx-auto">
                No items match your active filter criteria. Try clearing subcategory
                filters or adjusting your search query.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 px-6 py-2.5 rounded-full bg-timber text-paper text-xs font-semibold hover:bg-timberdark transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}
