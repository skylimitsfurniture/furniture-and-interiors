import { furnitureData, formatINR as formatINRCurrency } from "@/data/furnitureData";

// Legacy product mappings ensuring 100% backward compatibility
const legacyAliases = [
  { id: "sofa-arden", targetId: "sofa-arden-3s" },
  { id: "chair-linden", targetId: "chair-linden-ac" },
  { id: "bed-hollow", targetId: "bed-hollow-pb" },
  { id: "table-marrow", targetId: "table-marrow-dt" },
  { id: "desk-fenn", targetId: "desk-fenn-wd" },
  { id: "shelf-alcove", targetId: "shelf-alcove-bs" },
  { id: "chair-dining-nook", targetId: "chair-dining-nook-dc" },
  { id: "wardrobe-haven", targetId: "wardrobe-haven-wd" },
  { id: "bedside-arlo", targetId: "bedside-arlo-nt" },
  { id: "bedside-nook", targetId: "bedside-nook-nt" },
  { id: "stool-pella", targetId: "stool-pella-bs" },
  { id: "table-console-reed", targetId: "table-marrow-ct" },
];

const legacyProducts = legacyAliases.map(({ id, targetId }) => {
  const found = furnitureData.find((p) => p.id === targetId);
  return {
    ...found,
    id,
    legacyId: true,
  };
});

// Full unified products list (all 140 catalog products + legacy aliases)
export const products = [
  ...legacyProducts,
  ...furnitureData,
];

export const formatINR = formatINRCurrency;

export function searchProducts(query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return [];
  return furnitureData.filter((p) => {
    const haystack = [
      p.name,
      p.title,
      p.category,
      p.section,
      p.subcategory,
      ...(p.tags || []),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}
