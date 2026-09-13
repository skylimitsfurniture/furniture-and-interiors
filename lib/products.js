export const products = [
  { id: "sofa-arden", name: "Arden 3-Seater Sofa", category: "Living Room", price: 42999, tone: "timber", size: "large" },
  { id: "chair-linden", name: "Linden Accent Chair", category: "Living Room", price: 18499, tone: "sage", size: "small" },
  { id: "bed-hollow", name: "Hollow Platform Bed", category: "Bedroom", price: 35999, tone: "ink", size: "large" },
  { id: "table-marrow", name: "Marrow Dining Table", category: "Dining", price: 27999, tone: "timber", size: "medium" },
  { id: "desk-fenn", name: "Fenn Writing Desk", category: "Office", price: 15999, tone: "brass", size: "small" },
  { id: "shelf-alcove", name: "Alcove Bookshelf", category: "Living Room", price: 21999, tone: "sage", size: "medium" },
  { id: "chair-dining-nook", name: "Nook Dining Chair", category: "Dining", price: 6999, tone: "timber", size: "small" },
  { id: "wardrobe-haven", name: "Haven Wardrobe", category: "Bedroom", price: 39999, tone: "ink", size: "large" },
];

export function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
