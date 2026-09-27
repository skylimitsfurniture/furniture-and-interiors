const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'furnitureData.js');
let content = fs.readFileSync(filePath, 'utf8');

const startMarker = 'export const furnitureData = [';
const startIdx = content.indexOf(startMarker);
const endMarker = '];\n\n/**\n * Currency Formatter (INR)';
const endIdx = content.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
  console.error("Could not find markers:", { startIdx, endIdx });
  process.exit(1);
}

const prefix = content.slice(0, startIdx + startMarker.length - 1); // up to '['
const arrayStr = content.slice(startIdx + startMarker.length - 1, endIdx + 1); // '[' to ']'
const suffix = content.slice(endIdx + 1); // from ';' onwards

const products = eval(arrayStr);
console.log(`Successfully evaluated ${products.length} products`);

const realisticImages = {
  sofas3: [
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1573866926487-a1865558a9cf?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1512212621149-107ffe572d2f?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&w=1200&q=85"
  ],
  sofas2: [
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1573866926487-a1865558a9cf?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1512212621149-107ffe572d2f?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85"
  ],
  accentChairs: [
    "https://images.unsplash.com/photo-1580481077195-c22ae2b1e779?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1519947486513-ce62b99f2162?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=85"
  ],
  coffeeTables: [
    "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1519947486513-ce62b99f2162?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1597072689227-8882273e8f6a?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85"
  ],
  beds: [
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1200&q=85"
  ],
  wardrobes: [
    "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=85"
  ],
  bedside: [
    "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1519947486513-ce62b99f2162?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1597072689227-8882273e8f6a?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85"
  ],
  diningTables: [
    "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1597072689227-8882273e8f6a?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1519947486513-ce62b99f2162?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85"
  ],
  diningChairs: [
    "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1580481077195-c22ae2b1e779?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1519947486513-ce62b99f2162?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1200&q=85"
  ],
  barStools: [
    "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1580481077195-c22ae2b1e779?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1519947486513-ce62b99f2162?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1200&q=85"
  ],
  desks: [
    "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1580481077195-c22ae2b1e779?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1519947486513-ce62b99f2162?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1597072689227-8882273e8f6a?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1200&q=85"
  ],
  ergoChairs: [
    "https://images.unsplash.com/photo-1580481077195-c22ae2b1e779?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1519947486513-ce62b99f2162?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1200&q=85"
  ],
  bookshelves: [
    "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=85"
  ]
};

const subcategoryCounters = {};

const updatedProducts = products.map((item) => {
  const cat = item.category;
  const sub = item.subcategory;
  const count = subcategoryCounters[sub] = (subcategoryCounters[sub] || 0) + 1;
  const zeroIdx = count - 1;

  // Regional delivery metadata
  item.expressVizag = true;
  item.deliveryRegions = "AP & Telangana";
  item.origin = "Manufactured & Stocked in Vizag Hub";
  item.dispatchTime = "24-48 Hours Express in Vizag • 3-5 Days across AP & Telangana";

  let title = item.title;
  let material = item.material;
  let desc = item.description;

  title = title
    .replace(/American Walnut/gi, "Teakwood")
    .replace(/White Oak/gi, "Teakwood")
    .replace(/Smoked Birch/gi, "C.P. Teak")
    .replace(/Nordic/gi, "Handcrafted")
    .replace(/Scandinavian/gi, "Contemporary")
    .replace(/Japanese/gi, "Zen Artisan");

  item.title = title;
  item.name = title;

  // 1. COTS & BEDS
  if (cat === "Bedroom" && (sub === "Platform Beds" || sub === "King Size Beds")) {
    if (count % 2 === 1) {
      material = "100% Solid C.P. Teakwood with Traditional Mortise & Tenon Joinery";
      desc = desc.replace(/oak|walnut|birch|ash|melamine/gi, "solid teakwood");
      if (!title.toLowerCase().includes("teak")) {
        item.title = `${title.replace("Bed", "").trim()} Solid Teak Cot`;
        item.name = item.title;
      }
    } else {
      material = "High-Density Moisture-Resistant MDF with Teak Veneer Facings & Hydraulic Box Storage";
      desc = desc.replace(/oak|walnut|birch|ash/gi, "high-density MDF");
      if (!title.toLowerCase().includes("mdf") && !title.toLowerCase().includes("storage")) {
        item.title = `${title.replace("Bed", "").trim()} High-Density MDF Storage Bed`;
        item.name = item.title;
      }
    }
    item.image = realisticImages.beds[zeroIdx % realisticImages.beds.length];
    item.tags = [...new Set([...(item.tags || []), "teakwood cot", "mdf bed", "vizag express", "ap telangana delivery"])];
  }

  // 2. SOFAS & SEATING
  else if (cat === "Living Room" && (sub === "3-Seater Sofas" || sub === "2-Seater Sofas" || sub === "Accent Chairs")) {
    const upholstery = material.includes("Leather")
      ? "Saddle Leatherette & High-Resilience 40-Density Foam"
      : material.includes("Velvet")
      ? "Royal Velvet & 40-Density Cushioning"
      : material.includes("Boucl")
      ? "Textured Bouclé Fabric & High-Density Foam"
      : "Heavy GSM Woven Fabric & High-Resilience Foam";

    material = `IS:303 Commercial Plywood Inner Structural Box Frame, Solid Teak Legs & ${upholstery}`;
    desc = desc.replace(/hardwood frame|oak|walnut|ash|beech/gi, "heavy-duty commercial plywood box frame");

    if (sub === "3-Seater Sofas") {
      item.image = realisticImages.sofas3[zeroIdx % realisticImages.sofas3.length];
    } else if (sub === "2-Seater Sofas") {
      item.image = realisticImages.sofas2[zeroIdx % realisticImages.sofas2.length];
    } else {
      item.image = realisticImages.accentChairs[zeroIdx % realisticImages.accentChairs.length];
    }
    item.tags = [...new Set([...(item.tags || []), "commercial plywood sofa", "plywood box frame", "vizag delivery", "ap telangana"])];
  }

  // 3. LIVING ROOM: Coffee Tables
  else if (cat === "Living Room" && sub === "Coffee Tables") {
    if (count % 2 === 1) {
      material = "100% Solid Indian Teakwood with Protective Polyurethane Polish";
    } else {
      material = "High-Density Commercial Engineered Wood & Teak Veneer with Brass Inlay";
    }
    desc = desc.replace(/oak|walnut|ash|beech/gi, "solid teakwood and commercial plywood core");
    item.image = realisticImages.coffeeTables[zeroIdx % realisticImages.coffeeTables.length];
    item.tags = [...new Set([...(item.tags || []), "teakwood table", "vizag express", "ap telangana"])];
  }

  // 4. BEDROOM: Wardrobes & Bedside Tables
  else if (cat === "Bedroom" && sub === "Wardrobes") {
    material = "Commercial Grade BWR Plywood Carcass with Teak Veneer & Hettich Soft-Close Hardware";
    desc = desc.replace(/oak|walnut|ash|beech/gi, "commercial grade plywood & teak facings");
    item.image = realisticImages.wardrobes[zeroIdx % realisticImages.wardrobes.length];
    item.tags = [...new Set([...(item.tags || []), "plywood wardrobe", "teak finish", "vizag express", "ap telangana"])];
  }
  else if (cat === "Bedroom" && sub === "Bedside Tables") {
    if (count % 2 === 1) {
      material = "Solid Teakwood & Soft-Close Commercial Drawer Slides";
    } else {
      material = "High-Density MDF with Teakwood Veneer & Brass Handles";
    }
    desc = desc.replace(/oak|walnut|ash|beech/gi, "teakwood & engineered wood");
    item.image = realisticImages.bedside[zeroIdx % realisticImages.bedside.length];
    item.tags = [...new Set([...(item.tags || []), "bedside table", "teak", "vizag express", "ap telangana"])];
  }

  // 5. DINING ROOM: Dining Tables, Dining Chairs, Bar Stools
  else if (cat === "Dining Room" && sub === "Dining Tables") {
    if (material.includes("Marble")) {
      material = "Solid C.P. Teakwood Base with Indian White Makrana Marble Top";
    } else {
      material = "100% Solid C.P. Teakwood with Moisture-Resistant PU Sealer";
    }
    desc = desc.replace(/oak|walnut|ash|beech/gi, "solid teakwood");
    item.image = realisticImages.diningTables[zeroIdx % realisticImages.diningTables.length];
    item.tags = [...new Set([...(item.tags || []), "solid teak dining", "vizag furniture", "ap telangana"])];
  }
  else if (cat === "Dining Room" && sub === "Dining Chairs") {
    material = "Solid Teakwood Ergonomic Frame with Commercial Plywood Base & Linen Cushion";
    desc = desc.replace(/oak|walnut|ash|beech/gi, "solid teakwood");
    item.image = realisticImages.diningChairs[zeroIdx % realisticImages.diningChairs.length];
    item.tags = [...new Set([...(item.tags || []), "solid teak chair", "vizag express", "ap telangana"])];
  }
  else if (cat === "Dining Room" && sub === "Bar Stools") {
    material = "Solid Teakwood Frame with Commercial Plywood Seat Core & Brass Footring";
    desc = desc.replace(/oak|walnut|ash|beech/gi, "solid teakwood");
    item.image = realisticImages.barStools[zeroIdx % realisticImages.barStools.length];
    item.tags = [...new Set([...(item.tags || []), "bar stool", "teakwood", "vizag express", "ap telangana"])];
  }

  // 6. OFFICE: Writing Desks, Ergonomic Chairs, Bookshelves
  else if (cat === "Office" && sub === "Writing Desks") {
    if (count % 2 === 1) {
      material = "Solid Teakwood Writing Top with Heavy-duty Solid Wood Legs & Brass Knobs";
    } else {
      material = "Commercial Grade Engineered Wood with Teak Veneer & Cable Management";
    }
    desc = desc.replace(/oak|walnut|ash|beech/gi, "solid teak & commercial ply");
    item.image = realisticImages.desks[zeroIdx % realisticImages.desks.length];
    item.tags = [...new Set([...(item.tags || []), "study desk", "teak desk", "vizag express", "ap telangana"])];
  }
  else if (cat === "Office" && sub === "Ergonomic Chairs") {
    material = "Commercial Molded Plywood Spine with Breathable High-Tension Mesh & Class 4 Gas Lift";
    desc = desc.replace(/oak|walnut|ash|beech/gi, "commercial grade engineered core");
    item.image = realisticImages.ergoChairs[zeroIdx % realisticImages.ergoChairs.length];
    item.tags = [...new Set([...(item.tags || []), "ergo chair", "vizag express", "ap telangana"])];
  }
  else if (cat === "Office" && sub === "Bookshelves") {
    if (count % 2 === 1) {
      material = "Solid Teakwood 5-Tier Shelving with Heavy-duty Brackets";
    } else {
      material = "High-Density Commercial Plywood with Teakwood Laminate & Fluted Details";
    }
    desc = desc.replace(/oak|walnut|ash|beech/gi, "solid teak & commercial plywood");
    item.image = realisticImages.bookshelves[zeroIdx % realisticImages.bookshelves.length];
    item.tags = [...new Set([...(item.tags || []), "bookshelf", "teak storage", "vizag express", "ap telangana"])];
  }

  item.material = material;
  item.description = desc;

  return item;
});

const formattedProducts = JSON.stringify(updatedProducts, null, 2);
const newFileContent = `${prefix}${formattedProducts};\n\n${suffix.trim()}\n`;

fs.writeFileSync(filePath, newFileContent, 'utf8');
console.log('Successfully written updated furnitureData.js with 140 products!');
