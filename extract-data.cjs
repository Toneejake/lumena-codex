// Extract species and learnset data from the JS bundle into JSON
const fs = require('fs');
const path = require('path');

const candidates = [
  path.join(__dirname, 'raw-data', 'species-data.js'),
  path.join(__dirname, '..', 'species-data-DlvlOJH1.js'),
  path.join(__dirname, 'species-data-DlvlOJH1.js'),
];

let rawPath = candidates.find(p => fs.existsSync(p));
if (!rawPath) {
  console.error('Error: Raw species data file not found in any candidate path.');
  process.exit(1);
}

console.log(`Using source file: ${rawPath}`);
const src = fs.readFileSync(rawPath, 'utf8');

const fn = new Function(`
  ${src.replace(/export \{.*\}/g, '')}
  return { learnsets: e, species: t };
`);

const data = fn();

const dataDir = path.join(__dirname, 'src', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

fs.writeFileSync(
  path.join(dataDir, 'species.json'),
  JSON.stringify(data.species, null, 0)
);

fs.writeFileSync(
  path.join(dataDir, 'learnsets.json'),
  JSON.stringify(data.learnsets, null, 0)
);

console.log(`Extracted ${data.species.species.length} species`);
console.log(`Extracted ${Object.keys(data.learnsets.learnsets).length} learnsets`);
