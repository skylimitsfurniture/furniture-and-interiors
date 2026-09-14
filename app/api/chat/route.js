import { products, formatINR, searchProducts } from "@/lib/products";
import { furnitureData } from "@/data/furnitureData";

const FAQ = [
  {
    keywords: ["shipping", "delivery", "deliver", "pan-india", "charges", "courier"],
    answer:
      "We offer 100% free white-glove shipping pan-India on every order — no minimum order value required. Deliveries are scheduled directly to your room of choice with expert assembly included.",
  },
  {
    keywords: ["return", "refund", "exchange", "guarantee", "policy"],
    answer:
      "Every Skylimits piece comes with our 7-day hassle-free return guarantee. If the piece doesn't fit your space or lighting, our team will pick it up at zero return charge.",
  },
  {
    keywords: ["material", "wood", "timber", "quality", "made", "craftsmanship", "artisan"],
    answer:
      "All Skylimits furniture is hand-joined from kiln-dried solid Indian hardwoods (Teak, Sheesham, Oak, Smoked Beech) and finished with low-VOC organic oils by master carpenters in Visakhapatnam. Never flat-pack particle board.",
  },
  {
    keywords: ["discount", "coupon", "code", "offer", "sale", "promo"],
    answer:
      "Use coupon code **SKYLIMITS10** for an additional 10% off orders above ₹25,000. VIP Pro members also receive an exclusive stackable 15% discount!",
  },
  {
    keywords: ["vip", "pro", "subscription", "perk", "benefit"],
    answer:
      "Skylimits VIP Pro gives you unlimited AI interior styling sessions, early access to interactive 3D AR furniture models, an exclusive 15% discount code, and direct consultation with our interior architects.",
  },
];

// Helper to parse price/budget limit from query
function extractBudget(text) {
  const match = text.match(/(?:under|below|budget|less than|within|around)\s*(?:rs\.?|inr|₹)?\s*(\d[\d,]{2,})/i) ||
                text.match(/(?:rs\.?|inr|₹)\s*(\d[\d,]{2,})/i);
  if (!match) return null;
  return parseInt(match[1].replace(/,/g, ""), 10);
}

// Helper to identify dimension inquiries
function isDimensionQuery(text) {
  return /dimension|dimensions|size|height|width|depth|measure|how big|how tall|how wide|fit in/i.test(text);
}

// Helper to identify styling inquiries
function isStylingQuery(text) {
  return /style|styling|match|matches|pair|pairing|palette|aesthetic|look with|goes with|interior design|decor/i.test(text);
}

export async function POST(req) {
  try {
    const { messages = [] } = await req.json();
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const cleanText = lastUserMessage.trim().toLowerCase();

    if (!cleanText) {
      return Response.json({
        reply: "Hello! I am your Skylimits Interior Stylist. You can ask me to search our catalog, check dimensions of any piece, or suggest styling combinations for your space.",
        products: [],
      });
    }

    // 1. Check for standard FAQ match
    const faqHit = FAQ.find((f) => f.keywords.some((k) => cleanText.includes(k)));
    if (faqHit && !isDimensionQuery(cleanText) && !cleanText.includes("sofa") && !cleanText.includes("bed") && !cleanText.includes("chair")) {
      return Response.json({
        reply: faqHit.answer,
        products: [],
      });
    }

    // 2. Check for Specific Dimension Inquiry
    if (isDimensionQuery(cleanText)) {
      // Score candidates to find the most relevant product mentioned
      const words = cleanText
        .replace(/dimension|dimensions|size|height|width|depth|measure|how big|how tall|how wide|fit in/gi, "")
        .trim()
        .split(/\s+/)
        .filter((w) => w.length > 2);

      const scored = furnitureData
        .map((p) => {
          const title = p.title.toLowerCase();
          let score = 0;
          for (const w of words) {
            if (title.includes(w)) score += (w === "sofa" || w === "bed" || w === "chair" || w === "table") ? 1 : 4;
            if (p.id.includes(w)) score += 3;
          }
          return { product: p, score };
        })
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score);

      if (scored.length > 0) {
        const product = scored[0].product;
        return Response.json({
          reply: `📐 **${product.title} Dimensions & Specs:**\n` +
                 `• **Dimensions:** ${product.dimensions || "Standard dimensions available upon request"}\n` +
                 `• **Primary Material:** ${product.material}\n` +
                 `• **Finish / Wood Tone:** ${product.tone}\n` +
                 `• **Price:** ${formatINR(product.price)}\n\n` +
                 `This piece is hand-proportioned for comfortable everyday living. Would you like styling suggestions to complement it?`,
          products: [product],
        });
      }
    }

    // 3. Check for Interior Styling & Pairing Advice
    if (isStylingQuery(cleanText)) {
      // Check if a specific product or room is mentioned
      let stylingMatches = searchProducts(cleanText);
      if (stylingMatches.length === 0) {
        stylingMatches = furnitureData.slice(0, 3);
      }
      const topItems = stylingMatches.slice(0, 3);

      return Response.json({
        reply: `✨ **Interior Styling Recommendation:**\n` +
               `For a warm, balanced atmosphere, we recommend pairing natural timber grains with muted earthy tones like sage linen, warm terracotta, and textured brass accents.\n\n` +
               `Here are cohesive handcrafted pieces that work wonderfully together:`,
        products: topItems,
      });
    }

    // 4. Product Search & Budget Filtering
    let matchedProducts = searchProducts(cleanText);
    const budget = extractBudget(cleanText);

    if (budget) {
      const pool = matchedProducts.length > 0 ? matchedProducts : furnitureData;
      matchedProducts = pool.filter((p) => p.price <= budget);
    }

    if (matchedProducts.length > 0) {
      const topMatches = matchedProducts.slice(0, 3);
      const budgetNote = budget ? ` under ${formatINR(budget)}` : "";
      return Response.json({
        reply: `I found ${matchedProducts.length} handcrafted piece${matchedProducts.length === 1 ? "" : "s"}${budgetNote} matching your search:`,
        products: topMatches,
      });
    }

    // 5. Friendly Fallback
    return Response.json({
      reply:
        "I couldn't find an exact item matching that description. Try asking about:\n" +
        "• Specific rooms (e.g., *'3-seater sofas for living room'* or *'minimalist platform bed'*)\n" +
        "• Dimensions (e.g., *'What are the dimensions of the Solis curved sofa?'*)\n" +
        "• Budget search (e.g., *'solid wood dining tables under ₹35,000'*)\n" +
        "• Styling advice (e.g., *'how to style oak coffee tables'*)\n" +
        "• Policies (e.g., *'free delivery and return policy'*)\n\n" +
        "Feel free to ask!",
      products: furnitureData.slice(0, 2),
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { reply: "Sorry, I had trouble processing your request. Please try again in a moment." },
      { status: 500 }
    );
  }
}