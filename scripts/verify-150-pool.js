const https = require('https');
const fs = require('fs');

// We need ~25 more verified IDs to reach 145+ verified IDs.
// Let's test a batch of candidate IDs.
const testBatch = [
  'photo-1540555700478-4be289fbecef',
  'photo-1517487881594-2787fef5ebf7',
  'photo-1544457070-4cd773b4d71e',
  'photo-1507089947368-19c1da9775ae',
  'photo-1512918728675-ed5a9ecdebfd',
  'photo-1513694203232-719a280e022f',
  'photo-1513519245088-0e12902e5a38',
  'photo-1513161455079-7dc1de15ef3e',
  'photo-1534349762230-e0cadf78f5da',
  'photo-1526057565006-20beab8dd2ed',
  'photo-1540932239986-30128078f3c5',
  'photo-1501183638710-841dd1904471',
  'photo-1512917774080-9991f1c4c750',
  'photo-1586105251261-72a756497a11',
  'photo-1598300056393-4aac492f4344',
  'photo-1616486701797-0f33f61038ec',
  'photo-1616486788371-62d930495c44',
  'photo-1618221469555-7f3ad97540d6',
  'photo-1618221470438-6cf7b0fb8459',
  'photo-1618221470008-0ea1849dbcf5',
  'photo-1615529182904-14819c35db37',
  'photo-1615529162924-f8605388461d',
  'photo-1615529328331-f8917597711f',
  'photo-1499916078039-922301b0eb9b',
  'photo-1520697830682-bbb6e85e2b0b',
  'photo-1554995207-c18c20360250',
  'photo-1502672260266-1c1ef2d93688',
  'photo-1518780664697-55e3ad937233',
  'photo-1501876725168-00c445821c9e',
  'photo-1519643381401-22c77e60520e',
  'photo-1537726235470-8504e3beef77',
  'photo-1527772482340-7895c3f2b3f7',
  'photo-1519710164239-da123dc03ef4',
  'photo-1594026112284-02bb6f3352fe',
  'photo-1556228453-efd6c1ff04f6',
  'photo-1533779283484-84b238386377',
  'photo-1556911220-e15b29be8c8f',
  'photo-1556909114-f6e7ad7d3136',
  'photo-1556909190-eccf4a8bf97a',
  'photo-1556912172-45b7abe8b7e1',
  'photo-1556912167-f556f1f39fdf',
  'photo-1556909212-d5b604d0c90d',
  'photo-1556909172-54557c7e4fb7',
  'photo-1556909114-44e3e70034e2',
  'photo-1616047006789-b7af5afb8c20',
  'photo-1616486029423-aaa4789e8c9a',
  'photo-1618219740975-d40978bb7378',
  'photo-1616594039964-ae9021a400a0',
  'photo-1616137466211-f939a420be84',
  'photo-1616137422495-1e9e46e2aa77',
  'photo-1615876234886-fd9a39fa95f9',
  'photo-1600585154526-990dced4db0d',
  'photo-1600607687920-4e2a09cf159d',
  'photo-1600566752355-35792bedcfea',
  'photo-1600210491892-03d54c0aaf87',
  'photo-1600585154363-67eb9e2e2099',
  'photo-1600573472591-ee6b68d14c68',
  'photo-1600566753086-00f18fb6b3ea',
  'photo-1600607687644-c7171b42498f',
  'photo-1600566753190-17f0baa2a6c3'
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
  const existing = JSON.parse(fs.readFileSync('scripts/huge-verified-pool.json', 'utf8'));
  const uniqueToTest = Array.from(new Set(testBatch));
  const results = await Promise.all(uniqueToTest.map(checkUrl));
  const newValid = results.filter(r => r.status === 200).map(r => r.id);
  const total = Array.from(new Set([...existing, ...newValid]));
  console.log('Previous pool:', existing.length);
  console.log('New valid tested:', newValid.length);
  console.log('Combined total verified 200 OK pool:', total.length);
  fs.writeFileSync('scripts/total-verified-150-pool.json', JSON.stringify(total, null, 2));
}

run();
