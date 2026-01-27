const fs = require('fs');
const path = require('path');

console.log('\n=== LIMPIEZA DE IMÁGENES DUPLICADAS ===\n');

// Leer properties.json
const data = JSON.parse(fs.readFileSync('./data/properties.json', 'utf8'));

// Duplicados conocidos (PNG con WEBP correspondiente)
const duplicados = {
  // Balboa Boutique
  '/images/properties/balboa-boutique/locales-comerciales/hero-1.png': '/images/properties/balboa-boutique/locales-comerciales/hero-1.webp',
  '/images/properties/balboa-boutique/locales-comerciales/hero-2.png': '/images/properties/balboa-boutique/locales-comerciales/hero-2.webp',
  '/images/properties/balboa-boutique/locales-comerciales/hero-3.png': '/images/properties/balboa-boutique/locales-comerciales/hero-3.webp',
  '/images/properties/balboa-boutique/locales-comerciales/hero-4.png': '/images/properties/balboa-boutique/locales-comerciales/hero-4.webp',
  '/images/properties/balboa-boutique/locales-comerciales/hero-alt.png': '/images/properties/balboa-boutique/locales-comerciales/hero-alt.webp',
  '/images/properties/balboa-boutique/locales-comerciales/local-interior.png': '/images/properties/balboa-boutique/locales-comerciales/local-interior.webp',
  '/images/properties/balboa-boutique/locales-comerciales/local-interior-1.png': '/images/properties/balboa-boutique/locales-comerciales/local-interior-1.webp',
  '/images/properties/balboa-boutique/locales-comerciales/local-interior-2.png': '/images/properties/balboa-boutique/locales-comerciales/local-interior-2.webp',
  '/images/properties/balboa-boutique/locales-comerciales/local-interior-3.png': '/images/properties/balboa-boutique/locales-comerciales/local-interior-3.webp',
  '/images/properties/balboa-boutique/locales-comerciales/local-interior-terraza.png': '/images/properties/balboa-boutique/locales-comerciales/local-interior-terraza.webp',
  '/images/properties/balboa-boutique/locales-comerciales/parking-acceso.png': '/images/properties/balboa-boutique/locales-comerciales/parking-acceso.webp',
  '/images/properties/balboa-boutique/locales-comerciales/terraza-exterior.png': '/images/properties/balboa-boutique/locales-comerciales/terraza-exterior.webp'
};

// Actualizar properties.json
let updated = 0;
data.properties.forEach(property => {
  if (property.images && Array.isArray(property.images)) {
    property.images = property.images.map(img => {
      if (duplicados[img]) {
        console.log(`✓ Actualizado: ${path.basename(img)} → ${path.basename(duplicados[img])}`);
        updated++;
        return duplicados[img];
      }
      return img;
    });
  }
  
  if (property.planos && Array.isArray(property.planos)) {
    property.planos = property.planos.map(img => {
      if (duplicados[img]) {
        console.log(`✓ Actualizado: ${path.basename(img)} → ${path.basename(duplicados[img])}`);
        updated++;
        return duplicados[img];
      }
      return img;
    });
  }
});

// Guardar
fs.writeFileSync('./data/properties.json', JSON.stringify(data, null, 2));
console.log(`\n✅ ${updated} referencias actualizadas en properties.json\n`);

// Eliminar PNG duplicados
let deleted = 0;
Object.keys(duplicados).forEach(file => {
  const filePath = '.' + file;
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`✓ Eliminado: ${path.basename(file)}`);
      deleted++;
    } catch(e) {
      console.log(`✗ Error al eliminar: ${path.basename(file)}`);
    }
  }
});

console.log(`\n✅ ${deleted} archivos PNG duplicados eliminados\n`);
