const fs = require('fs');

const content = fs.readFileSync('data/furnitureData.js', 'utf8');
const regex = /\{\s*"id":\s*"([^"]+)"[\s\S]*?"image":\s*"([^"]+)"/g;
let match;
const items = [];
const imgMap = {};
while ((match = regex.exec(content)) !== null) {
  const [_, id, img] = match;
  items.push({ id, img });
  imgMap[img] = imgMap[img] || [];
  imgMap[img].push(id);
}
console.log('Total products:', items.length);
console.log('Unique image URLs currently in file:', Object.keys(imgMap).length);
const toChange = [];
for (const [img, ids] of Object.entries(imgMap)) {
  for (let i = 1; i < ids.length; i++) {
    toChange.push(ids[i]);
  }
}
console.log('Products that need a new unique image:', toChange.length);
console.log('First 5 to change:', toChange.slice(0, 5));
