const { execSync } = require('child_process');
const fs = require('fs');

const diff = execSync('git diff cdf80a4^! -- data/furnitureData.js').toString();
const reg = /image:\s*"https:\/\/images\.unsplash\.com\/([^?]+)/g;
let m;
const origIds = new Set();
while ((m = reg.exec(diff)) !== null) {
  origIds.add(m[1]);
}
console.log('Unique IDs in cdf80a4:', origIds.size);
console.log(JSON.stringify(Array.from(origIds), null, 2));
