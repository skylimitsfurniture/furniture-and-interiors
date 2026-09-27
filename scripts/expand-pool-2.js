const fs = require('fs');
const https = require('https');

// Additional curated architecture & furniture IDs
const extraIds = [
  'photo-1513161455079-7dc1de15ef3e',
  'photo-1544457070-4cd773b4d71e',
  'photo-1540932239986-30128078f3c5',
  'photo-1513519245088-0e12902e5a38',
  'photo-1526057565006-20beab8dd2ed',
  'photo-1534349762230-e0cadf78f5da',
  'photo-1501183638710-841dd1904471',
  'photo-1512917774080-9991f1c4c750',
  'photo-1600585154526-990dced4db0d',
  'photo-1600607687920-4e2a09cf159d',
  'photo-1600566752355-35792bedcfea',
  'photo-1600210491892-03d54c0aaf87',
  'photo-1600585154363-67eb9e2e2099',
  'photo-1600573472591-ee6b68d14c68',
  'photo-1600566753086-00f18fb6b3ea',
  'photo-1600607687644-c7171b42498f',
  'photo-1600566753190-17f0baa2a6c3',
  'photo-1616047006789-b7af5afb8c20',
  'photo-1616486029423-aaa4789e8c9a',
  'photo-1618219740975-d40978bb7378',
  'photo-1616594039964-ae9021a400a0',
  'photo-1616137466211-f939a420be84',
  'photo-1616137422495-1e9e46e2aa77',
  'photo-1615876234886-fd9a39fa95f9',
  'photo-1556911220-e15b29be8c8f',
  'photo-1556909114-f6e7ad7d3136',
  'photo-1556909190-eccf4a8bf97a',
  'photo-1556912172-45b7abe8b7e1',
  'photo-1556912167-f556f1f39fdf',
  'photo-1556909212-d5b604d0c90d',
  'photo-1556909172-54557c7e4fb7',
  'photo-1556909114-44e3e70034e2',
  'photo-1594026112284-02bb6f3352fe',
  'photo-1519710164239-da123dc03ef4',
  'photo-1499916078039-922301b0eb9b',
  'photo-1520697830682-bbb6e85e2b0b',
  'photo-1554995207-c18c20360250',
  'photo-1502672260266-1c1ef2d93688',
  'photo-1513694203232-719a280e022f',
  'photo-1505691938895-1758d7feb511',
  'photo-1518780664697-55e3ad937233',
  'photo-1501876725168-00c445821c9e',
  'photo-1507089947368-19c1da9775ae',
  'photo-1519643381401-22c77e60520e',
  'photo-1537726235470-8504e3beef77',
  'photo-1527772482340-7895c3f2b3f7',
  'photo-1544457070-4cd773b4d71e',
  'photo-1517705008128-361805f42e86',
  'photo-1533090161767-e6ffed986c88',
  'photo-1491926626787-62db157af940',
  'photo-1549497538-303791108f95',
  'photo-1519974719765-e6559eac2575',
  'photo-1616046229478-9901c5536a45',
  'photo-1507652313519-d4e9174996dd',
  'photo-1584622650111-993a426fbf0a',
  'photo-1582582621959-48d27397dc69',
  'photo-1486406146926-c627a92ad1ab'
];

const existing = JSON.parse(fs.readFileSync('scripts/verified-pool.json', 'utf8'));
const combined = Array.from(new Set([...existing, ...extraIds]));
console.log('Testing combined total candidates:', combined.length);

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
  const results = await Promise.all(combined.map(checkUrl));
  const valid = results.filter(r => r.status === 200).map(r => r.id);
  console.log('Final verified pool count:', valid.length);
  fs.writeFileSync('scripts/verified-pool.json', JSON.stringify(valid, null, 2));
}

run();
