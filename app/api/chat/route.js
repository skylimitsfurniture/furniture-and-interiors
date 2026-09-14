import { products, formatINR, searchProducts } from "@/lib/products";

const FAQ = [
  {
    keywords: ["shipping", "delivery", "deliver"],
    answer: "We offer free shipping pan-India on every order — no minimum order value required.",
  },
  {
    keywords: ["return", "refund", "exchange"],
    answer: "You can return any item within 7 days, no questions asked.",
  },
  {
    keywords: ["material", "wood", "timber", "quality", "made"],
    answer: "Everything is built from solid timber and hand-finished by our team in Visakhapatnam — no flat-pack shortcuts.",
  },
  {
    keywords: ["discount", "coupon", "code", "offer", "sale"],
    answer: "Use code SKYLIMITS10 for an extra 10% off orders above ₹25,000.",
  },
  {
    keywords: ["budget", "cheap", "affordable", "under"],
    answer: null, // handled by price-aware search below
  },
];

function extractBudget(text) {
  const match = text.match(/(\d[\d,]{2,})/);
  if (!match) return null;
  return parseInt(match[1].replace(/,/g, ""), 10);
}

export async function POST(req) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || "";

  // 1. Check for an FAQ match first
  const faqHit = FAQ.find((f) => f.answer && f.keywords.some((k) => lastMessage.includes(k)));
  if (faqHit) {
    return Response.json({ reply: faqHit.answer });
  }

  // 2. Try to find matching products
  let matches = searchProducts(lastMessage);

  // Budget-aware filtering, e.g. "bed under 30000"
  const budget = extractBudget(lastMessage);
  if (budget) {
    const pool = matches.length ? matches : products;
    matches = pool.filter((p) => p.price <= budget);
  }

  if (matches.length > 0) {
    const top = matches.slice(0, 3);
    const lines = top.map((p) => `• ${p.name} — ${formatINR(p.price)}`).join("\n");
    return Response.json({
      reply: `Here's what I'd suggest:\n${lines}\n\nWant to see any of these in the catalog?`,
    });
  }

  // 3. Nothing matched
  return Response.json({
    reply:
      "I couldn't find an exact match for that — try mentioning a room (living room, bedroom, dining, office) or an item type like sofa, bed, or desk. You can also ask about shipping, returns, or our current discount code.",
  });
}