/**
 * Script de prueba para verificar el sistema de promociones de Kings Park
 */

const path = require('path');
const fs = require('fs');

// Simular la lógica del sistema
const PROPERTY_SLUG_MAPPINGS = [
  { slug: 'kings-park', id: 1, name: 'Kings Park' },
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

function getPropertySpecificPromotion(slug) {
  const desktopPath = PROMOTION_NAMING_CONVENTIONS.propertySpecific.desktop(slug);
  const mobilePath = PROMOTION_NAMING_CONVENTIONS.propertySpecific.mobile(slug);

  const desktopExists = verifyImageExists(desktopPath);
  const mobileExists = verifyImageExists(mobilePath);

  console.log(`\n🔍 Verificando promoción para: ${slug}`);
  console.log(`  Desktop: ${desktopPath}`);
  console.log(`    ✓ Existe: ${desktopExists}`);
  console.log(`  Mobile: ${mobilePath}`);
  console.log(`    ✓ Existe: ${mobileExists}`);

  if (!desktopExists || !mobileExists) {
    console.log(`  ❌ Promoción NO disponible (faltan archivos)\n`);
    return null;
  }

  const promotion = {
    id: `${slug}-specific`,
    title: `Promoción especial para ${slug}`,
    type: 'property-specific',
    images: {
      desktop: desktopPath,
      mobile: mobilePath,
      thumbnail: mobilePath,
    },
    propertySlug: slug,
  };

  console.log(`  ✅ Promoción disponible!`);
  console.log(`  ID: ${promotion.id}`);
  console.log(`  Título: ${promotion.title}\n`);

  return promotion;
}

// Probar con Kings Park (ID: 1)
console.log('═══════════════════════════════════════════════════');
console.log('  PRUEBA DEL SISTEMA DE PROMOCIONES - KINGS PARK');
console.log('═══════════════════════════════════════════════════');

const propertyId = 1;
const slug = getPropertySlugById(propertyId);

if (!slug) {
  console.log(`❌ Error: No se encontró slug para property ID: ${propertyId}`);
  process.exit(1);
}

console.log(`\n✓ Property ID ${propertyId} → slug: "${slug}"`);

const promotion = getPropertySpecificPromotion(slug);

if (promotion) {
  console.log('═══════════════════════════════════════════════════');
  console.log('  ✅ RESULTADO: Sistema funcionando correctamente');
  console.log('═══════════════════════════════════════════════════');
  console.log('\nLa promoción se mostrará en:');
  console.log(`  📍 http://localhost:3000/propiedad/${propertyId}`);
  console.log(`  📍 http://localhost:3000/propiedad/kings-park (si usas slug)\n`);
} else {
  console.log('═══════════════════════════════════════════════════');
  console.log('  ❌ RESULTADO: Sistema NO funcionando');
  console.log('═══════════════════════════════════════════════════\n');
}
