const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '../data/furnitureData.js');
const content = fs.readFileSync(targetFile, 'utf8');

// Match each object block with id, title, category, subcategory, image
const productRegex = /\{\s*"id":\s*"([^"]+)"[\s\S]*?"title":\s*"([^"]+)"[\s\S]*?"category":\s*"([^"]+)"[\s\S]*?"subcategory":\s*"([^"]+)"[\s\S]*?"image":\s*"([^"]+)"/g;

let match;
const products = [];
const imageMap = {};

while ((match = productRegex.exec(content)) !== null) {
  const [_, id, title, category, subcategory, image] = match;
  products.push({ id, title, category, subcategory, image });
  if (!imageMap[image]) {
    imageMap[image] = [];
  }
  imageMap[image].push({ id, title, category, subcategory });
}

console.log('Total products scanned:', products.length);

const duplicates = Object.entries(imageMap).filter(([img, list]) => list.length > 1);
console.log('Unique images with duplicates:', duplicates.length);

duplicates.forEach(([img, list], index) => {
  console.log(`\nDuplicate #${index + 1} (${list.length} products share this image):`);
  console.log(`URL: ${img}`);
  list.forEach(p => console.log(`  - [${p.id}] "${p.title}" (${p.category} -> ${p.subcategory})`));
});
