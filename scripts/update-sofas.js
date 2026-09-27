const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '../data/furnitureData.js');
let content = fs.readFileSync(targetFile, 'utf8');

const replacements = [
  {
    id: 'sofa-arden-2s',
    newUrl: 'https://images.unsplash.com/photo-1491926626787-62db157af940?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'sofa-lune-2s',
    newUrl: 'https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'sofa-calix-2s',
    newUrl: 'https://images.unsplash.com/photo-1519974719765-e6559eac2575?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'sofa-mira-2s',
    newUrl: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'sofa-koto-2s',
    newUrl: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'sofa-finch-2s',
    newUrl: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'sofa-porto-2s',
    newUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'sofa-astrid-2s',
    newUrl: 'https://images.unsplash.com/photo-1582582621959-48d27397dc69?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'sofa-ember-2s',
    newUrl: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'sofa-sol-2s',
    newUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85'
  }
];

let updatedCount = 0;
for (const r of replacements) {
  const reg = new RegExp('("id":\\s*"' + r.id + '"[\\s\\S]*?"image":\\s*")[^"]+(")', 'm');
  if (reg.test(content)) {
    content = content.replace(reg, '$1' + r.newUrl + '$2');
    updatedCount++;
  } else {
    console.error('Failed to match ' + r.id);
  }
}

fs.writeFileSync(targetFile, content, 'utf8');
console.log('Successfully updated ' + updatedCount + ' sofa images.');
