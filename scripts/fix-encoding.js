const fs = require('fs');
const path = require('path');

// Mapa de correcciones UTF-8
const encodingFixes = {
  'Ã¡': 'á',
  'Ã©': 'é',
  'Ã­': 'í',
  'Ã³': 'ó',
  'Ãº': 'ú',
  'Ã±': 'ñ',
  'Ã': 'Á',
  'Ã': 'É',
  'Ã': 'Í',
  'Ã': 'Ó',
  'Ãº': 'Ú',
  'Ã': 'Ñ',
  'Â²': '²',
  'â': '—',
  'Ã³Ã³': 'ó'
};

const propertiesPath = path.join(__dirname, '../data/properties.json');

console.log('Reading properties.json...');
const data = fs.readFileSync(propertiesPath, 'utf8');

console.log('Parsing JSON...');
let properties;
try {
  properties = JSON.parse(data);
} catch (error) {
  console.error('Error parsing JSON:', error.message);
  process.exit(1);
}

console.log(`Found ${properties.properties.length} properties`);
console.log('Fixing encoding issues...');

// Convertir a string JSON
let jsonString = JSON.stringify(properties, null, 2);

// Aplicar correcciones
let fixCount = 0;
for (const [wrongChar, correctChar] of Object.entries(encodingFixes)) {
  const regex = new RegExp(wrongChar, 'g');
  const matches = jsonString.match(regex);
  if (matches) {
    fixCount += matches.length;
    jsonString = jsonString.replace(regex, correctChar);
  }
}

console.log(`Applied ${fixCount} encoding fixes`);

// Validar que el JSON es correcto
console.log('Validating corrected JSON...');
try {
  JSON.parse(jsonString);
  console.log('✓ JSON is valid');
} catch (error) {
  console.error('✗ JSON validation failed:', error.message);
  process.exit(1);
}

// Guardar
console.log('Writing corrected file...');
fs.writeFileSync(propertiesPath, jsonString, 'utf8');
console.log('✓ File saved successfully');
console.log(`✓ Fixed ${fixCount} encoding issues`);
