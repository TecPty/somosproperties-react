/**
 * Script de prueba para verificar promociones en ambos apartamentos de Kings Park
 */

const path = require('path');
const fs = require('fs');

const PROPERTY_SLUG_MAPPINGS = [
  { slug: 'kings-park', id: 1, name: 'Kings Park - Torre 500, Apto 3-B' },
  { slug: 'kings-park', id: 238, name: 'Kings Park - Torre 500, Apto 10-B' },
];

const PROMOTION_NAMING_CONVENTIONS = {
  propertySpecific: {
    desktop: (slug) => `/images/properties/${slug}/promotional/modal-desktop-${slug}.png`,
    mobile: (slug) => `/images/properties/${slug}/promotional/modal-mobile-${slug}.png`,
  },
};

function getPropertySlugById(id) {
  const mapping = PROPERTY_SLUG_MAPPINGS.find(m => m.id === id);
  return mapping?.slug || null;
}

function verifyImageExists(imagePath) {
  const publicDir = path.join(process.cwd(), 'public');
  const fullPath = path.join(publicDir, imagePath);
  return fs.existsSync(fullPath);
}

function testPromotion(propertyId, propertyName) {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`  ${propertyName}`);
  console.log(`${'═'.repeat(60)}`);
  
  const slug = getPropertySlugById(propertyId);
  
  if (!slug) {
    console.log(`  ❌ Error: No slug found for property ID: ${propertyId}\n`);
    return false;
  }
  
  console.log(`  Property ID: ${propertyId}`);
  console.log(`  Slug: ${slug}`);
  
  const desktopPath = PROMOTION_NAMING_CONVENTIONS.propertySpecific.desktop(slug);
  const mobilePath = PROMOTION_NAMING_CONVENTIONS.propertySpecific.mobile(slug);
  
  const desktopExists = verifyImageExists(desktopPath);
  const mobileExists = verifyImageExists(mobilePath);
  
  console.log(`\n  Desktop: ${desktopPath}`);
  console.log(`    ${desktopExists ? '✓' : '✗'} ${desktopExists ? 'Exists' : 'NOT FOUND'}`);
  console.log(`  Mobile: ${mobilePath}`);
  console.log(`    ${mobileExists ? '✓' : '✗'} ${mobileExists ? 'Exists' : 'NOT FOUND'}`);
  
  if (desktopExists && mobileExists) {
    console.log(`\n  ✅ RESULTADO: Promoción funcionando`);
    console.log(`  📍 URL: http://localhost:3000/propiedad/${propertyId}\n`);
    return true;
  } else {
    console.log(`\n  ❌ RESULTADO: Faltan archivos de imagen\n`);
    return false;
  }
}

console.log('\n╔═══════════════════════════════════════════════════════════╗');
console.log('║  PRUEBA DE PROMOCIONES - APARTAMENTOS KINGS PARK          ║');
console.log('╚═══════════════════════════════════════════════════════════╝');

const results = [
  testPromotion(1, 'Torre 500, Apto 3-B'),
  testPromotion(238, 'Torre 500, Apto 10-B')
];

console.log(`\n${'═'.repeat(60)}`);
console.log('  RESUMEN');
console.log(`${'═'.repeat(60)}`);

const successCount = results.filter(r => r).length;
console.log(`  ${successCount}/2 propiedades configuradas correctamente`);

if (successCount === 2) {
  console.log(`  ✅ Sistema completo y funcionando`);
} else {
  console.log(`  ⚠️  Revisa las propiedades con errores arriba`);
}
console.log(`${'═'.repeat(60)}\n`);
