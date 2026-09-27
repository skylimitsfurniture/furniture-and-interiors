const https = require('https');
const fs = require('fs');

const test5 = [
  'photo-1540555700478-4be289fbecef',
  'photo-1505691723518-36a5ac3be353',
  'photo-1505693314120-0d443867891c',
  'photo-1507089947368-19c1da9775ae',
  'photo-1512915922686-57c11dde9b6b',
  'photo-1512917774080-9991f1c4c750',
  'photo-1513694203232-719a280e022f',
  'photo-1519710164239-da123dc03ef4',
  'photo-1524758631624-e2822e304c36',
  'photo-1538688525198-9b88f6f53126',
  'photo-1544457070-4cd773b4d71e',
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
  const uniqueToTest = Array.from(new Set(test5));
  const results = await Promise.all(uniqueToTest.map(checkUrl));
  const newValid = results.filter(r => r.status === 200).map(r => r.id);
  const total = Array.from(new Set([...existing, ...newValid]));
  console.log('Previous pool:', existing.length);
  console.log('Combined total verified 200 OK pool:', total.length);
  fs.writeFileSync('scripts/total-verified-150-pool.json', JSON.stringify(total, null, 2));
}

run();
