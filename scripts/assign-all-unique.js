const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '../data/furnitureData.js');
let fileContent = fs.readFileSync(targetFile, 'utf8');

const verifiedPool = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'total-verified-150-pool.json'), 'utf8'));

// Extract each product object
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

console.log('Total products:', products.length);
console.log('Total unique images before assignment:', Object.keys(imageMap).length);

// The first item of each duplicate group keeps its image
const assignedImages = new Set();
const productsNeedingNewImage = [];

for (const [img, list] of Object.entries(imageMap)) {
  // First item keeps the image
  assignedImages.add(img);
  for (let i = 1; i < list.length; i++) {
    productsNeedingNewImage.push(list[i]);
  }
}

console.log('Kept images:', assignedImages.size);
console.log('Products needing new unique image:', productsNeedingNewImage.length);

// Find verified IDs not in assignedImages
const availableIds = verifiedPool.filter(id => {
  const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=85`;
  return !assignedImages.has(url);
});

console.log('Available unassigned verified photo IDs:', availableIds.length);

if (availableIds.length < productsNeedingNewImage.length) {
  console.error(`Not enough available IDs: need ${productsNeedingNewImage.length}, got ${availableIds.length}`);
  process.exit(1);
}

let replacedCount = 0;
for (let i = 0; i < productsNeedingNewImage.length; i++) {
  const prod = productsNeedingNewImage[i];
  const newId = availableIds[i];
  const newUrl = `https://images.unsplash.com/${newId}?auto=format&fit=crop&w=1200&q=85`;
  assignedImages.add(newUrl);

  const reg = new RegExp('("id":\\s*"' + prod.id + '"[\\s\\S]*?"image":\\s*")[^"]+(")', 'm');
  if (reg.test(fileContent)) {
    fileContent = fileContent.replace(reg, '$1' + newUrl + '$2');
    replacedCount++;
  } else {
    console.error(`Failed to find product ${prod.id} in fileContent`);
  }
}

fs.writeFileSync(targetFile, fileContent, 'utf8');
console.log(`Successfully replaced ${replacedCount} products with unique images!`);
