"use client";

import { furnitureData } from "@/data/furnitureData";

export default function CatalogSidebar({
  hierarchy,
  selectedCategory,
  selectedSection,
  selectedSubcategory,
  onSelectCategory,
  onSelectSection,
  onSelectSubcategory,
  onResetFilters,
}) {
  // Helper to get count for a subcategory
  const getSubcategoryCount = (subcatName) => {
    return furnitureData.filter(
      (item) => item.subcategory?.toLowerCase() === subcatName?.toLowerCase()
    ).length;
  };

  // Helper to get count for a main category
  const getCategoryCount = (catName) => {
    return furnitureData.filter(
      (item) => item.category?.toLowerCase() === catName?.toLowerCase()
    ).length;
  };

  return (
    <aside className="w-full lg:w-72 shrink-0 pr-0 lg:pr-8 py-2">
      {/* Header with Clear Filter */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-cloud">
        <h2 className="font-display text-lg text-ink font-bold tracking-tight">
          Categories
        </h2>
        {(selectedCategory !== "All" ||
          selectedSection !== "All" ||
          selectedSubcategory !== "All") && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs text-timber hover:text-timberdark font-medium underline underline-offset-4 cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      {/* "All Furniture" Button */}
      <button
        type="button"
        onClick={onResetFilters}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors mb-2 text-left ${
          selectedCategory === "All" &&
          selectedSection === "All" &&
          selectedSubcategory === "All"
            ? "bg-timber text-paper"
            : "text-ink/80 hover:bg-cloud/60"
        }`}
      >
        <span>All Furniture</span>
        <span
          className={`text-xs px-2 py-0.5 rounded-full ${
            selectedCategory === "All"
              ? "bg-paper/25 text-paper"
              : "bg-cloud text-ink/60"
          }`}
        >
          {furnitureData.length}
        </span>
      </button>

      {/* Hierarchical Accordion/Tree */}
      <div className="space-y-4 mt-4">
        {hierarchy.map((cat) => {
          const isCategoryActive =
            selectedCategory?.toLowerCase() === cat.name.toLowerCase();

          return (
            <div
              key={cat.slug}
              className="border border-cloud/60 rounded-xl p-3 bg-paper"
            >
              {/* Main Category Header */}
              <button
                type="button"
                onClick={() => onSelectCategory(cat.name)}
                className={`w-full flex items-center justify-between text-left font-display text-sm font-semibold transition-colors ${
                  isCategoryActive ? "text-timber" : "text-ink hover:text-timber"
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[11px] font-normal text-ink/50 bg-cloud px-2 py-0.5 rounded-full">
                  {getCategoryCount(cat.name)}
                </span>
              </button>

              {/* Child Sections & Subcategories (expanded if category active or all view) */}
              <div className="mt-3 pl-2 space-y-3 border-l-2 border-cloud/80 ml-1">
                {cat.sections.map((sec) => {
                  const isSectionActive =
                    isCategoryActive &&
                    selectedSection?.toLowerCase() === sec.name.toLowerCase();

                  return (
                    <div key={sec.slug} className="space-y-1.5">
                      {/* Section Title */}
                      <button
                        type="button"
                        onClick={() => onSelectSection(sec.name, cat.name)}
                        className={`w-full text-left text-xs font-semibold uppercase tracking-wider block transition-colors ${
                          isSectionActive
                            ? "text-timber font-bold"
                            : "text-ink/60 hover:text-ink"
                        }`}
                      >
                        {sec.name}
                      </button>

                      {/* Granular Subcategories */}
                      <div className="pl-2 space-y-1">
                        {sec.subcategories.map((sub) => {
                          const isSubActive =
                            isCategoryActive &&
                            selectedSubcategory?.toLowerCase() ===
                              sub.name.toLowerCase();

                          const count = getSubcategoryCount(sub.name);

                          return (
                            <button
                              key={sub.slug}
                              type="button"
                              onClick={() =>
                                onSelectSubcategory(sub.name, sec.name, cat.name)
                              }
                              className={`w-full flex items-center justify-between text-left text-xs py-1 px-2 rounded-lg transition-all ${
                                isSubActive
                                  ? "bg-timber/15 text-timber font-semibold"
                                  : "text-ink/75 hover:bg-cloud/50 hover:text-ink"
                              }`}
                            >
                              <span className="truncate">{sub.name}</span>
                              <span className="text-[10px] text-ink/40 ml-1 shrink-0">
                                {count}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
