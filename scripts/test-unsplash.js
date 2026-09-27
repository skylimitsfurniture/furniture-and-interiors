const https = require('https');
const fs = require('fs');
const path = require('path');

// Candidate Unsplash IDs for various furniture types
const candidateIds = {
  accentChairs: [
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
    'photo-1581539250439-c96689b516dd',
    'photo-1505693416388-ac5ce068fe85'
  ],
  diningChairs: [
    'photo-1503602642458-232111445657',
    'photo-1567538096630-e0c55bd6374c',
    'photo-1592078615290-033ee584e267',
    'photo-1580481077195-c22ae2b1e779',
    'photo-1617364852223-75f57e78dc96',
    'photo-1551298370-9d3d53740c72',
    'photo-1549497538-303791108f95',
    'photo-1519974719765-e6559eac2575',
    'photo-1517705008128-361805f42e86',
    'photo-1507652313519-d4e9174996dd',
    'photo-1584622650111-993a426fbf0a',
    'photo-1582582621959-48d27397dc69',
    'photo-1486406146926-c627a92ad1ab',
    'photo-1616046229478-9901c5536a45',
    'photo-1618219908412-a29a1bb7b86e'
  ],
  barStools: [
    'photo-1503602642458-232111445657',
    'photo-1533090161767-e6ffed986c88',
    'photo-1530018607912-eff2daa1bac4',
    'photo-1565183997392-2f6f122e5912',
    'photo-1615066390971-03e4e1c36ddf',
    'photo-1597072689227-8882273e8f6a',
    'photo-1577140917170-285929fb55b7',
    'photo-1532323544230-7191fd51bc1b',
    'photo-1616486338812-3dadae4b4ace',
    'photo-1586023492125-27b2c045efd7'
  ]
};

console.log('Script loaded');
