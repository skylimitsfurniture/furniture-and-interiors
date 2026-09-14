"use client";

import { useState, useMemo, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  categoryHierarchy,
  furnitureData,
} from "@/data/furnitureData";

export function useCatalogState(initialFilters = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read URL params or fallback to initialFilters
  const paramCategory = searchParams?.get("category") || initialFilters.category || "All";
  const paramSection = searchParams?.get("section") || initialFilters.section || "All";
  const paramSubcategory = searchParams?.get("subcategory") || initialFilters.subcategory || "All";
  const paramQuery = searchParams?.get("q") || initialFilters.q || "";
  const paramSort = searchParams?.get("sort") || initialFilters.sort || "featured";

  const [category, setCategoryState] = useState(paramCategory);
  const [section, setSectionState] = useState(paramSection);
  const [subcategory, setSubcategoryState] = useState(paramSubcategory);
  const [query, setQueryState] = useState(paramQuery);
  const [sortBy, setSortByState] = useState(paramSort);

  // Sync state to URL
  const updateUrl = useCallback(
    (newCat, newSec, newSub, newQ, newSort) => {
      const params = new URLSearchParams();
      if (newCat && newCat !== "All") params.set("category", newCat);
      if (newSec && newSec !== "All") params.set("section", newSec);
      if (newSub && newSub !== "All") params.set("subcategory", newSub);
      if (newQ && newQ.trim()) params.set("q", newQ.trim());
      if (newSort && newSort !== "featured") params.set("sort", newSort);

      const queryString = params.toString();
      const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.push(targetUrl, { scroll: false });
    },
    [pathname, router]
  );

  // Filter actions
  const selectCategory = useCallback(
    (cat) => {
      setCategoryState(cat);
      setSectionState("All");
      setSubcategoryState("All");
      updateUrl(cat, "All", "All", query, sortBy);
    },
    [query, sortBy, updateUrl]
  );

  const selectSection = useCallback(
    (sec, cat) => {
      const parentCat = cat || category;
      setCategoryState(parentCat);
      setSectionState(sec);
      setSubcategoryState("All");
      updateUrl(parentCat, sec, "All", query, sortBy);
    },
    [category, query, sortBy, updateUrl]
  );

  const selectSubcategory = useCallback(
    (subcat, sec, cat) => {
      const parentCat = cat || category;
      const parentSec = sec || section;
      setCategoryState(parentCat);
      setSectionState(parentSec);
      setSubcategoryState(subcat);
      updateUrl(parentCat, parentSec, subcat, query, sortBy);
    },
    [category, section, query, sortBy, updateUrl]
  );

  const setSearch = useCallback(
    (q) => {
      setQueryState(q);
      updateUrl(category, section, subcategory, q, sortBy);
    },
    [category, section, subcategory, sortBy, updateUrl]
  );

  const setSort = useCallback(
    (s) => {
      setSortByState(s);
      updateUrl(category, section, subcategory, query, s);
    },
    [category, section, subcategory, query, updateUrl]
  );

  const resetFilters = useCallback(() => {
    setCategoryState("All");
    setSectionState("All");
    setSubcategoryState("All");
    setQueryState("");
    setSortByState("featured");
    updateUrl("All", "All", "All", "", "featured");
  }, [updateUrl]);

  // Compute filtered products
  const filteredProducts = useMemo(() => {
    let list = furnitureData.filter((item) => {
      // Category match
      if (category !== "All" && item.category?.toLowerCase() !== category?.toLowerCase()) {
        return false;
      }
      // Section match
      if (section !== "All" && item.section?.toLowerCase() !== section?.toLowerCase()) {
        return false;
      }
      // Subcategory match
      if (subcategory !== "All" && item.subcategory?.toLowerCase() !== subcategory?.toLowerCase()) {
        return false;
      }
      // Search query match
      if (query.trim()) {
        const qLower = query.toLowerCase().trim();
        const haystack = [
          item.title,
          item.category,
          item.section,
          item.subcategory,
          item.material,
          ...(item.tags || []),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(qLower)) return false;
      }
      return true;
    });

    // Sorting
    if (sortBy === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      list = [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return list;
  }, [category, section, subcategory, query, sortBy]);

  // Compute multi-level breadcrumbs: Home > Living Room > Sofas & Sectionals > 3-Seater Sofas
  const breadcrumbs = useMemo(() => {
    const crumbs = [
      {
        label: "Home",
        href: "/",
        isClickable: true,
      },
      {
        label: "All Catalog",
        onClick: () => resetFilters(),
        isActive: category === "All" && section === "All" && subcategory === "All",
        isClickable: true,
      },
    ];

    if (category && category !== "All") {
      crumbs.push({
        label: category,
        onClick: () => selectCategory(category),
        isActive: section === "All" && subcategory === "All",
        isClickable: true,
      });
    }

    if (section && section !== "All") {
      crumbs.push({
        label: section,
        onClick: () => selectSection(section, category),
        isActive: subcategory === "All",
        isClickable: true,
      });
    }

    if (subcategory && subcategory !== "All") {
      crumbs.push({
        label: subcategory,
        isActive: true,
        isClickable: false,
      });
    }

    return crumbs;
  }, [category, section, subcategory, resetFilters, selectCategory, selectSection]);

  return {
    category,
    section,
    subcategory,
    query,
    sortBy,
    filteredProducts,
    breadcrumbs,
    totalCount: filteredProducts.length,
    hierarchy: categoryHierarchy,
    selectCategory,
    selectSection,
    selectSubcategory,
    setSearch,
    setSort,
    resetFilters,
  };
}
