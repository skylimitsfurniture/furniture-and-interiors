const https = require('https');
const fs = require('fs');

const test4 = [
  'photo-1486406146926-c627a92ad1ab',
  'photo-1497366216548-37526070297c',
  'photo-1497366811353-6870744d04b2',
  'photo-1497215842964-222b430dc094',
  'photo-1497215728101-856f4ea42174',
  'photo-1497366754035-f200968a6e72',
  'photo-1511556532299-8f662fc26c06',
  'photo-1523755231516-e43fd2e8dca5',
  'photo-1531875456634-3f5418280d20',
  'photo-1504674900247-0877df9cc836',
  'photo-1524758631624-e2822e304c36',
  'photo-1522771739844-6a9f6d5f14af',
  'photo-1507089947368-19c1da9775ae',
  'photo-1513694203232-719a280e022f',
  'photo-1513161455079-7dc1de15ef3e',
  // High quality Unsplash interior/furniture photo IDs
  'photo-1486304873000-2356438475a9',
  'photo-1489171078254-c3365d6e359f',
  'photo-1484154218962-a197022b5858',
  'photo-1493809842364-78817add7ffb',
  'photo-1499955085172-a104c9463ece',
  'photo-1502005229762-ee1b2b8ab32f',
  'photo-1505692794406-0a0e9b9211aa',
  'photo-1505692952047-1a78307da8f2',
  'photo-1512918728675-ed5a9ecdebfd',
  'photo-1516455590571-18256e5bb9ff',
  'photo-1524061614538-a7948d479ad3',
  'photo-1527030280862-64139fba04ca',
  'photo-1534889156217-d643df14f14a',
  'photo-1538688525198-9b88f6f53126',
  'photo-1540518614846-7ede433c4ef7',
  'photo-1540574163026-643ea20ade25',
  'photo-1544457070-4cd773b4d71e',
  'photo-1550581190-9c1c48d21d6c',
  'photo-1555041469-a586c61ea9bc',
  'photo-1556911220-e15b29be8c8f',
  'photo-1560448204-e02f11c3d0e2',
  'photo-1565183997392-2f6f122e5912',
  'photo-1567016432779-094069958ea5',
  'photo-1567538096630-e0c55bd6374c',
  'photo-1573866926487-a1865558a9cf',
  'photo-1577140917170-285929fb55b7',
  'photo-1580481077195-c22ae2b1e779',
  'photo-1581539250439-c96689b516dd',
  'photo-1583847268964-b28dc8f51f92',
  'photo-1586023492125-27b2c045efd7',
  'photo-1592078615290-033ee584e267',
  'photo-1595428774223-ef52624120d2',
  'photo-1595526114035-0d45ed16cfbf',
  'photo-1597072689227-8882273e8f6a',
  'photo-1598300042247-d088f8ab3a91',
  'photo-1598928506311-c55ded91a20c'
];

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
  const existing = JSON.parse(fs.readFileSync('scripts/total-verified-150-pool.json', 'utf8'));
  const uniqueToTest = Array.from(new Set(test4));
  const results = await Promise.all(uniqueToTest.map(checkUrl));
  const newValid = results.filter(r => r.status === 200).map(r => r.id);
  const total = Array.from(new Set([...existing, ...newValid]));
  console.log('Previous pool:', existing.length);
  console.log('Combined total verified 200 OK pool:', total.length);
  fs.writeFileSync('scripts/total-verified-150-pool.json', JSON.stringify(total, null, 2));
}

run();
