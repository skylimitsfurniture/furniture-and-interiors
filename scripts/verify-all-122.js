const https = require('https');
const fs = require('fs');

const ids = JSON.parse(fs.readFileSync('scripts/all-unique-ids.json', 'utf8'));

function checkUrl(id) {
  return new Promise((resolve) => {
    const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=80`;
    const req = https.request(url, { method: 'HEAD', timeout: 5000 }, (res) => {
      resolve({ id, status: res.statusCode });
    });
    req.on('error', () => resolve({ id, status: 'error' }));
    req.on('timeout', () => { req.destroy(); resolve({ id, status: 'timeout' }); });
    req.end();
  });
}

async function run() {
  console.log('Verifying', ids.length, 'IDs...');
  const results = await Promise.all(ids.map(checkUrl));
  const valid = results.filter(r => r.status === 200).map(r => r.id);
  console.log('Valid 200 OK IDs:', valid.length);
  fs.writeFileSync('scripts/final-verified-ids.json', JSON.stringify(valid, null, 2));
}

run();
