const https = require('https');

// A rich pool of realistic furniture photography from Unsplash
const testIds = [
  // Chairs, Accent, Dining, Bar stools
  'photo-1586023492125-27b2c045efd7',
  'photo-1598300042247-d088f8ab3a91',
  'photo-1567538096630-e0c55bd6374c',
  'photo-1580481077195-c22ae2b1e779',
  'photo-1592078615290-033ee584e267',
  'photo-1519947486513-ce62b99f2162',
  'photo-1581539250439-c96689b516dd',
  'photo-1503602642458-232111445657',
  'photo-1541558869434-2840d308329a',
  'photo-1517705008128-361805f42e86',
  'photo-1617364852223-75f57e78dc96',
  'photo-1551298370-9d3d53740c72',
  'photo-1506439773649-6e0eb8cfb237',
  'photo-1549497538-303791108f95',
  'photo-1519974719765-e6559eac2575',
  'photo-1507652313519-d4e9174996dd',
  'photo-1584622650111-993a426fbf0a',
  'photo-1582582621959-48d27397dc69',
  'photo-1486406146926-c627a92ad1ab',
  'photo-1616046229478-9901c5536a45',
  'photo-1618219908412-a29a1bb7b86e',
  'photo-1580481077195-c22ae2b1e779',
  'photo-1533090161767-e6ffed986c88',
  'photo-1530018607912-eff2daa1bac4',
  'photo-1565183997392-2f6f122e5912',
  'photo-1615066390971-03e4e1c36ddf',
  'photo-1597072689227-8882273e8f6a',
  'photo-1577140917170-285929fb55b7',
  'photo-1532323544230-7191fd51bc1b',
  'photo-1616486338812-3dadae4b4ace',
  // Beds & Bedrooms
  'photo-1505693416388-ac5ce068fe85',
  'photo-1540518614846-7ede433c4ef7',
  'photo-1618221195710-dd6b41faaea6',
  'photo-1598928506311-c55ded91a20c',
  'photo-1595526114035-0d45ed16cfbf',
  'photo-1522771739844-6a9f6d5f14af',
  'photo-1560448204-e02f11c3d0e2',
  'photo-1507089947368-19c1da9775ae',
  'photo-1540574163026-643ea20ade25',
  'photo-1595428774223-ef52624120d2',
  'photo-1538688525198-9b88f6f53126',
  'photo-1617806118233-18e1de247200',
  'photo-1518455027359-f3f8164ba6bd',
  'photo-1524758631624-e2822e304c36',
  'photo-1555041469-a586c61ea9bc',
  'photo-1493663284031-b7e3aefcae8e',
  'photo-1573866926487-a1865558a9cf',
  'photo-1583847268964-b28dc8f51f92',
  'photo-1567016432779-094069958ea5',
  'photo-1512212621149-107ffe572d2f',
  'photo-1484101403633-562f891dc89a',
  'photo-1550581190-9c1c48d21d6c',
  'photo-1615873968403-89e068629265',
  'photo-1615874959474-d609969a20ed',
  'photo-1615875605825-5eb9bb5d52ac',
  'photo-1513694203232-719a280e022f',
  'photo-1600585154340-be6161a56a0c',
  'photo-1600210492486-724fe5c67fb0',
  'photo-1600565193348-f74bd3c7ccdf',
  'photo-1600607687939-ce8a6c25118c',
  'photo-1600585152220-90363fe7e115',
  'photo-1600566753376-12c8ab7fb75b',
  'photo-1600573472550-8090b5e0745e',
  'photo-1600121848594-d8644e57abab',
  'photo-1585412727339-54e4bae3bbf9',
  'photo-1631679706909-1844bbd07221',
  'photo-1505691938895-1758d7feb511',
  'photo-1533779283484-84b238386377',
  'photo-1507473885765-e6ed057f782c',
  'photo-1524758631624-e2822e304c36',
  'photo-1513694203232-719a280e022f',
  'photo-1582582621959-48d27397dc69',
  'photo-1505693416388-ac5ce068fe85',
  'photo-1540518614846-7ede433c4ef7',
  'photo-1598928506311-c55ded91a20c',
  'photo-1595526114035-0d45ed16cfbf',
  'photo-1522771739844-6a9f6d5f14af',
  'photo-1560448204-e02f11c3d0e2',
  'photo-1507089947368-19c1da9775ae',
  'photo-1616486338812-3dadae4b4ace',
  'photo-1618221195710-dd6b41faaea6',
  'photo-1595428774223-ef52624120d2',
  'photo-1538688525198-9b88f6f53126',
  'photo-1586023492125-27b2c045efd7',
  'photo-1540574163026-643ea20ade25',
  'photo-1573866926487-a1865558a9cf',
  'photo-1583847268964-b28dc8f51f92',
  'photo-1567016432779-094069958ea5',
  'photo-1512212621149-107ffe572d2f',
  'photo-1484101403633-562f891dc89a',
  'photo-1550581190-9c1c48d21d6c',
  'photo-1555041469-a586c61ea9bc',
  'photo-1493663284031-b7e3aefcae8e'
];

const uniqueIds = Array.from(new Set(testIds));
console.log('Unique candidate IDs to verify:', uniqueIds.length);

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
  const results = await Promise.all(uniqueIds.map(checkUrl));
  const valid = results.filter(r => r.status === 200);
  console.log(`Verified ${valid.length} of ${uniqueIds.length} candidate URLs as HTTP 200 OK`);
  const fs = require('fs');
  fs.writeFileSync('scripts/verified-unsplash.json', JSON.stringify(valid.map(v => v.id), null, 2));
}

run();
