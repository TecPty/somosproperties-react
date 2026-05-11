/**
 * fix-encoding.js
 * Fixes mojibake (Latin-1 misinterpreted UTF-8) in data/properties.json
 * Run: node scripts/fix-encoding.js
 */

const fs = require('fs');
const path = require('path');

function fixMojibake(str) {
  if (typeof str !== 'string') return str;
  try {
    const bytes = new Uint8Array(str.length);
    let allLatin1 = true;
    for (let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i);
      if (code > 255) { allLatin1 = false; break; }
      bytes[i] = code;
    }
    if (!allLatin1) return str;
    const decoded = new TextDecoder('utf-8').decode(bytes);
    // If decoded contains replacement chars, the bytes weren't valid UTF-8
    if (decoded.includes('\uFFFD')) return str;
    return decoded;
  } catch (e) {
    return str;
  }
}

// Second pass: fix known residual bad patterns that survived the mojibake decode
const KNOWN_BAD = [
  [/\u2014\u20AC\u00A2/g, '\u2022'],  // —€¢ → •
  [/\u00D1\u0081rea/g, '\u00C1rea'],    // Ñ<0081>rea → Área (control char residual)
  [/D\u00DAplex/g, 'D\u00FAplex'],     // DÚplex → Dúplex
  [/\u00C3\u00A1/g, '\u00E1'],         // Ã¡ → á (any residual Latin-1 sequences)
];

function fixKnownBad(str) {
  if (typeof str !== 'string') return str;
  let result = str;
  for (const [pattern, replacement] of KNOWN_BAD) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

function fixObject(obj) {
  if (typeof obj === 'string') return fixKnownBad(fixMojibake(obj));
  if (Array.isArray(obj)) return obj.map(fixObject);
  if (obj && typeof obj === 'object') {
    const result = {};
    for (const key of Object.keys(obj)) {
      result[key] = fixObject(obj[key]);
    }
    return result;
  }
  return obj;
}

const dataPath = path.join(__dirname, '..', 'data', 'properties.json');
const raw = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(raw);

console.log('Before fix — sample title (ID 25):');
const before = data.properties.find(p => p.id === 25);
console.log(' ', before.title);
console.log(' ', before.description.substring(0, 120));

const fixed = fixObject(data);

console.log('\nAfter fix — sample title (ID 25):');
const after = fixed.properties.find(p => p.id === 25);
console.log(' ', after.title);
console.log(' ', after.description.substring(0, 120));

fs.writeFileSync(dataPath, JSON.stringify(fixed, null, 2), 'utf8');
console.log('\n✅ Done — data/properties.json updated with correct encoding.');
