const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '../data/furnitureData.js');
let fileContent = fs.readFileSync(targetFile, 'utf8');

const verifiedIds = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'final-verified-ids.json'), 'utf8'));

// Find all current products and their images
const productRegex = /\{\s*"id":\s*"([^"]+)"[\s\S]*?"title":\s*"([^"]+)"[\s\S]*?"category":\s*"([^"]+)"[\s\S]*?"subcategory":\s*"([^"]+)"[\s\S]*?"image":\s*"([^"]+)"/g;

let match;
const products = [];
const imageMap = {};

while ((match = productRegex.exec(fileContent)) !== null) {
  const [_, id, title, category, subcategory, image] = match;
  products.push({ id, title, category, subcategory, image });
  if (!imageMap[image]) {
    imageMap[image] = [];
  }
  imageMap[image].push({ id, title, category, subcategory });
}

// Set of already used image IDs in furnitureData
const usedUnsplashIds = new Set();
for (const [img, list] of Object.entries(imageMap)) {
  const m = img.match(/unsplash\.com\/([a-zA-Z0-9-]+)/);
  if (m) {
    usedUnsplashIds.add(m[1]);
  }
}

console.log('Initially used Unsplash photo IDs in catalog:', usedUnsplashIds.size);

// Products that need unique images (all instances after the first one in each duplicate group)
const productsToUpdate = [];
for (const [img, list] of Object.entries(imageMap)) {
  if (list.length > 1) {
    // Keep list[0], update list[1..n]
    for (let i = 1; i < list.length; i++) {
      productsToUpdate.push(list[i]);
    }
  }
}

console.log('Total products needing new unique images:', productsToUpdate.length);

// Available verified IDs that are not yet uniquely used
const availableNewIds = verifiedIds.filter(id => !usedUnsplashIds.has(id));
console.log('Available completely unused verified IDs:', availableNewIds.length);

// If we need more than availableNewIds, we can also pick from verifiedIds that were duplicates
// because once we reassign them, only ONE product will retain the original ID!
// So let's create a full pool of 140 unique IDs: 49 already kept + 91 new.
const pool = [...availableNewIds];

// Ensure we have at least productsToUpdate.length unique IDs
for (const id of verifiedIds) {
  if (!pool.includes(id) && pool.length < productsToUpdate.length + 50) {
    pool.push(id);
  }
}

console.log('Replacements pool size:', pool.length);

// Track all currently assigned images to ensure 100% uniqueness
const assignedUrls = new Set();
// First, add the kept first items
for (const [img, list] of Object.entries(imageMap)) {
  assignedUrls.add(img);
}

let poolIdx = 0;
let replacedCount = 0;

for (const prod of productsToUpdate) {
  // Find an ID that hasn't been assigned
  let chosenId = null;
  while (poolIdx < pool.length) {
    const candidateId = pool[poolIdx++];
    const candidateUrl = `https://images.unsplash.com/${candidateId}?auto=format&fit=crop&w=1200&q=85`;
    if (!assignedUrls.has(candidateUrl)) {
      chosenId = candidateId;
      assignedUrls.add(candidateUrl);
      break;
    }
  }

  if (!chosenId) {
    console.error(`Ran out of unique IDs for ${prod.id}`);
    process.exit(1);
  }

  const newUrl = `https://images.unsplash.com/${chosenId}?auto=format&fit=crop&w=1200&q=85`;

  // Replace in fileContent for this specific product ID
  const reg = new RegExp('("id":\\s*"' + prod.id + '"[\\s\\S]*?"image":\\s*")[^"]+(")', 'm');
  if (reg.test(fileContent)) {
    fileContent = fileContent.replace(reg, '$1' + newUrl + '$2');
    replacedCount++;
  } else {
    console.error(`Regex failed to match product ${prod.id}`);
  }
}

fs.writeFileSync(targetFile, fileContent, 'utf8');
console.log(`Successfully replaced ${replacedCount} products with unique images!`);
