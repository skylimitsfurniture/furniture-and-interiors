const { execSync } = require('child_process');
const fs = require('fs');

const oldContent = execSync('git show cdf80a4:data/furnitureData.js').toString();
const reg = /image:\s*"https:\/\/images\.unsplash\.com\/([^?]+)/g;
let m;
const oldIds = new Set();
while ((m = reg.exec(oldContent)) !== null) {
  oldIds.add(m[1]);
}
console.log('Unique IDs in cdf80a4:', oldIds.size);

const hugePool = JSON.parse(fs.readFileSync('scripts/huge-verified-pool.json', 'utf8'));
const merged = Array.from(new Set([...oldIds, ...hugePool]));
console.log('Merged with hugePool:', merged.length);
fs.writeFileSync('scripts/merged-pool.json', JSON.stringify(merged, null, 2));
