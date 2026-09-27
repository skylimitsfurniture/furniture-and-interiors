const { execSync } = require('child_process');
const fs = require('fs');

const log = execSync('git log -p -S "images.unsplash.com" -- data/').toString();
const reg = /https:\/\/images\.unsplash\.com\/([a-zA-Z0-9_-]+)/g;
let match;
const foundIds = new Set();
while ((match = reg.exec(log)) !== null) {
  foundIds.add(match[1]);
}
console.log('Total unique Unsplash photo IDs found in git history:', foundIds.size);

const hugePool = JSON.parse(fs.readFileSync('scripts/huge-verified-pool.json', 'utf8'));
const allTogether = Array.from(new Set([...foundIds, ...hugePool]));
console.log('Combined with verified pool:', allTogether.length);

fs.writeFileSync('scripts/git-unsplash-ids.json', JSON.stringify(allTogether, null, 2));
