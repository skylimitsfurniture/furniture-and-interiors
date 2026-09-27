const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '../data/furnitureData.js');
const content = fs.readFileSync(targetFile, 'utf8');

const regex = /\{\s*"id":\s*"([^"]+)"[\s\S]*?"title":\s*"([^"]+)"[\s\S]*?"category":\s*"([^"]+)"[\s\S]*?"subcategory":\s*"([^"]+)"[\s\S]*?"image":\s*"([^"]+)"/g;

let match;
const products = [];
const imageMap = {};

while ((match = regex.exec(content)) !== null) {
  const [_, id, title, category, subcategory, image] = match;
  products.push({ id, title, category, subcategory, image });
  if (!imageMap[image]) {
    imageMap[image] = [];
  }
  imageMap[image].push({ id, title, category, subcategory });
}

// Keep the first product of each image URL, the rest need new unique images!
const productsNeedingNewImage = [];
for (const [img, list] of Object.entries(imageMap)) {
  if (list.length > 1) {
    // Keep list[0] with its existing image, replace list[1], list[2], etc.
    for (let i = 1; i < list.length; i++) {
      productsNeedingNewImage.push(list[i]);
    }
  }
}

console.log('Total products:', products.length);
console.log('Products that already have unique image (including 1 per dupe group):', products.length - productsNeedingNewImage.length);
console.log('Products needing a new unique image:', productsNeedingNewImage.length);

const bySubcategory = {};
productsNeedingNewImage.forEach(p => {
  bySubcategory[p.subcategory] = (bySubcategory[p.subcategory] || 0) + 1;
});
console.log('\nBreakdown by subcategory:');
console.table(bySubcategory);

fs.writeFileSync(path.resolve(__dirname, 'needed-replacements.json'), JSON.stringify(productsNeedingNewImage, null, 2));
