import { products, formatINR, searchProducts } from "@/lib/products";
import { furnitureData } from "@/data/furnitureData";

// Package definition for ₹2,50,000 2 BHK Interior Package
const PACKAGE_2_5_LAKH = {
  price: "₹2,50,000",
  title: "Sky Limits 2 BHK Essential Interior Package",
  items: [
    {
      name: "Bedroom Cupboard / Wardrobe",
      material: "Waterproof Gurjan Marine Plywood (BWP IS:710)",
      finish: "1 mm Sunmica / Laminate Finish",
      zone: "High Moisture / Heavy Daily Use",
      backing: "8 mm Heavy-Duty Substrate Backing Board",
    },
    {
      name: "Kitchen Units (Single Wall - Stove Side)",
      material: "Waterproof Gurjan Marine Plywood (BWP IS:710) - Top & Bottom Cabinets",
      finish: "1 mm High-Gloss / Matte Sunmica Laminate",
      zone: "Wet Cooking & Moisture Zone",
      backing: "8 mm Marine Grade Carcass Panel",
    },
    {
      name: "TV Unit",
      material: "Engineered Wood / MDF / HDF",
      finish: "PVC / Textured Laminate Finish",
      zone: "Dry Living Area",
      backing: "Sturdy Rear Anchor Panel",
    },
    {
      name: "Crockery Unit",
      material: "Engineered Wood / MDF / HDF",
      finish: "Laminate / Glass Profile Finish",
      zone: "Dry Dining Area",
      backing: "Balanced Backing Substrate",
    },
    {
      name: "Dressing Table",
      material: "Engineered Wood / MDF / HDF with Mirror Frame",
      finish: "Sunmica / PU Edging Finish",
      zone: "Bedroom Dry Zone",
      backing: "Concealed Wall Cleat",
    },
    {
      name: "Shoe Rack",
      material: "Engineered Wood / MDF / HDF with Louvered/Ventilated Shutters",
      finish: "Durable PVC / Sunmica Finish",
      zone: "Foyer / Entryway",
      backing: "Rigid Structural Frame",
    },
  ],
  specs: [
    "Core Plywood: Waterproof Gurjan Marine Plywood (BWP 710 Grade) for Kitchen & Wardrobe.",
    "Laminate / Sunmica: 1 mm thick decorative laminates (Sunmica) with termite-resistant PVC edge-banding.",
    "Substrate Panel: 8 mm backing ply/board for carcass structural rigidity and longevity.",
    "Hardware & Fittings: 100% Stainless Steel (SS 304 Grade) handles & premium bonus/mortise locks.",
  ],
  guardrails: [
    "Standard package is engineered up to standard room dimensions (sq. ft caps apply).",
    "Final execution depends on site laser measurement.",
    "Upgrades to Gurjan Plywood for dry-zone units (TV unit, Crockery, etc.) are available at direct raw material difference.",
  ],
};

function generatePackageExplanation(query = "") {
  const isUpgradingQuery = /upgrade|tv unit gurjan|all gurjan|full plywood|change material/i.test(query);

  if (isUpgradingQuery) {
    return (
      `### Customization & Upgrades on the ₹2,50,000 2 BHK Package\n\n` +
      `Yes, you can upgrade dry-zone units (such as the TV unit, Crockery unit, Dressing table, or Shoe rack) to **Waterproof Gurjan Marine Plywood (BWP IS:710)**.\n\n` +
      `**Important Cost Consideration:**\n` +
      `The ₹2,50,000 package is specifically calibrated to offer aggressive factory pricing by reserving premium Gurjan BWP ply for wet/moisture-prone zones (Kitchen & Wardrobe) and high-density engineered wood for dry decorative pieces. Upgrading the remaining 4 units to Gurjan Plywood will increase the raw material and fabrication cost beyond the ₹2.5 Lakhs base offer.\n\n` +
      `Would you like us to calculate the exact material price difference based on your flat's floor plan?`
    );
  }

  return (
    `### Sky Limits 2 BHK Interior Package — ₹2,50,000 (Complete 6-Item Scope)\n\n` +
    `Yes, **₹2,50,000 is an aggressive, highly competitive package price** offered directly from our Visakhapatnam workshop. We achieve this budget without sacrificing structural integrity through strategic material allocation:\n\n` +
    `#### Itemized Scope & Material Allocation:\n` +
    `1. **Bedroom Wardrobe / Cupboard** — **Waterproof Gurjan Plywood (BWP IS:710)** with 1 mm Sunmica laminate.\n` +
    `2. **Kitchen Units (Stove-Side Wall)** — **Waterproof Gurjan Plywood (BWP IS:710)** for both top & bottom cabinets.\n` +
    `3. **Living Room TV Unit** — **Engineered Wood / MDF / HDF** with durable PVC/laminate finish.\n` +
    `4. **Dining Crockery Unit** — **Engineered Wood / MDF / HDF** with designer laminate.\n` +
    `5. **Bedroom Dressing Table** — **Engineered Wood / MDF / HDF** with mirror console & drawers.\n` +
    `6. **Foyer Shoe Rack** — **Engineered Wood / MDF / HDF** with ventilated storage shutters.\n\n` +
    `#### Technical Specifications & Standard Hardware:\n` +
    `• **Core Plywood:** 100% Waterproof Gurjan Marine Plywood (BWP 710 Grade) in all wet/moisture zones.\n` +
    `• **Laminate Standard:** 1 mm thick decorative Sunmica (Note: "8 mm" refers to the heavy-duty structural backing/carcass ply board, while decorative laminates are 1 mm).\n` +
    `• **Fittings & Hardware:** Rust-proof Stainless Steel (SS 304) handles & premium bonus/mortise locks.\n` +
    `• **Termite Protection:** Factory pressure-treated and sealed against coastal humidity.\n\n` +
    `*Note: Standard package covers up to standard room square footage caps. Final execution is verified during site laser measurement.*\n\n` +
    `**Next Step:** Would you like to share your 2 BHK floor plan or schedule a free site laser measurement with our Visakhapatnam team?`
  );
}

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
    keywords: ["material", "wood", "timber", "quality", "made", "craftsmanship", "artisan", "plywood", "termite", "marine", "gurjan"],
    answer:
      "All Sky Limits furniture and interiors are custom manufactured in Visakhapatnam using 100% seasoned Solid Teak Wood (Burma & C.P. Teak) and IS:710 BWP (Boiling Water Proof) Gurjan Marine Plywood. We strictly avoid cheap particle board and never use MDF in high-moisture kitchen zones.",
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

// Helper to check 2.5 lakh package inquiries
function isPackageQuery(text) {
  return (
    /2\.5\s*(?:lakh|lakhs|lac|lacs|l)|250000|2,50,000|250k|2\s*bhk\s*package|package for 2\s*bhk|6\s*item|six\s*item/i.test(text) ||
    (/2\s*bhk/i.test(text) && /cost|price|package|budget|estimate|quote|items/i.test(text)) ||
    (/gurjan/i.test(text) && /package|kitchen|wardrobe|2\s*bhk/i.test(text)) ||
    (/8\s*mm\s*sunmica/i.test(text))
  );
}

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
        reply: "Hello! I am Sky Limits AI, your senior interior consultant. How can I assist you with our 2 BHK interior packages, custom woodwork, or material specifications today?",
        products: [],
      });
    }

    // 1. Check for 2.5 Lakh 2 BHK Package Inquiries (Priority System Role)
    if (isPackageQuery(cleanText)) {
      const packageReply = generatePackageExplanation(cleanText);
      return Response.json({
        reply: packageReply,
        products: [],
      });
    }

    // 2. Check for standard FAQ match
    const faqHit = FAQ.find((f) => f.keywords.some((k) => cleanText.includes(k)));
    if (faqHit && !isDimensionQuery(cleanText) && !cleanText.includes("sofa") && !cleanText.includes("bed") && !cleanText.includes("chair")) {
      return Response.json({
        reply: faqHit.answer,
        products: [],
      });
    }

    // 3. Check for Specific Dimension Inquiry
    if (isDimensionQuery(cleanText)) {
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

    // 4. Check for Interior Styling & Pairing Advice
    if (isStylingQuery(cleanText)) {
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

    // 5. Product Search & Budget Filtering
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

    // 6. Friendly Fallback
    return Response.json({
      reply:
        "I can assist you with:\n" +
        "• **2 BHK Interior Package (₹2,50,000)**: Complete 6-item scope with Waterproof Gurjan Ply & Sunmica.\n" +
        "• **Material Specifications**: Gurjan BWP 710 vs. BWR Ply vs. Teak Wood.\n" +
        "• **Custom Furniture**: Solid wood dining, sofas, and platform beds.\n" +
        "• **Site Measurements & Quotes**: Booking laser visits in Visakhapatnam.\n\n" +
        "What specific project or room can I help you plan?",
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