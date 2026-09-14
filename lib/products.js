export const products = [
  { id: "sofa-arden", name: "Arden 3-Seater Sofa", category: "Living Room", price: 42999, tone: "timber", size: "large", tags: ["sofa", "seating", "living room", "3 seater sofas", "sofa sets"] },
  { id: "chair-linden", name: "Linden Accent Chair", category: "Living Room", price: 18499, tone: "sage", size: "small", tags: ["chair", "accent", "seating"] },
  { id: "bed-hollow", name: "Hollow Platform Bed", category: "Bedroom", price: 35999, tone: "ink", size: "large", tags: ["bed", "platform bed"] },
  { id: "table-marrow", name: "Marrow Dining Table", category: "Dining", price: 27999, tone: "timber", size: "medium", tags: ["dining table", "table"] },
  { id: "desk-fenn", name: "Fenn Writing Desk", category: "Office", price: 15999, tone: "brass", size: "small", tags: ["desk", "study table", "office"] },
  { id: "shelf-alcove", name: "Alcove Bookshelf", category: "Living Room", price: 21999, tone: "sage", size: "medium", tags: ["shelf", "bookshelf", "storage"] },
  { id: "chair-dining-nook", name: "Nook Dining Chair", category: "Dining", price: 6999, tone: "timber", size: "small", tags: ["chair", "dining chair"] },
  { id: "wardrobe-haven", name: "Haven Wardrobe", category: "Bedroom", price: 39999, tone: "ink", size: "large", tags: ["wardrobe", "storage", "almirah"] },
  { id: "bedside-arlo", name: "Arlo Bedside Table", category: "Bedroom", price: 8999, tone: "brass", size: "small", tags: ["bedside table", "nightstand", "side table"] },
  { id: "bedside-nook", name: "Nook Bedside Table", category: "Bedroom", price: 7499, tone: "timber", size: "small", tags: ["bedside table", "nightstand", "side table"] },
  { id: "stool-pella", name: "Pella Bar Stool", category: "Dining", price: 5499, tone: "sage", size: "small", tags: ["stool", "bar stool", "seating"] },
  { id: "table-console-reed", name: "Reed Console Table", category: "Living Room", price: 16999, tone: "brass", size: "medium", tags: ["console table", "entryway table", "side table"] },
];

export function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function searchProducts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) => {
    const haystack = [p.name, p.category, ...(p.tags || [])].join(" ").toLowerCase();
    return haystack.includes(q);
  });
}
