const fs = require('fs');

// Leer el archivo JSON
const data = JSON.parse(fs.readFileSync('./data/properties.json', 'utf8'));

// Análisis
const sinImagenes = [];
const pocasImagenes = [];
const sinDescripcion = [];
const sinPrecio = [];
const sinAmenities = [];
const completas = [];

data.properties.forEach(prop => {
  const issues = [];
  
  // Verificar imágenes
  if (!prop.images || prop.images.length === 0) {
    sinImagenes.push(prop);
    issues.push('sin imágenes');
  } else if (prop.images.length <= 2) {
    pocasImagenes.push(prop);
    issues.push(`solo ${prop.images.length} imagen(es)`);
  }
  
  // Verificar descripción
  if (!prop.description || prop.description.trim().length < 20) {
    sinDescripcion.push(prop);
    issues.push('descripción incompleta');
  }
  
  // Verificar precio
  if (!prop.price || prop.price === 0) {
    sinPrecio.push(prop);
    issues.push('sin precio');
  }
  
  // Verificar amenities
  if (!prop.amenities || prop.amenities.length === 0) {
    sinAmenities.push(prop);
    issues.push('sin amenities');
  }
  
  if (issues.length === 0) {
    completas.push(prop);
  }
});

// Reporte
console.log('\n=======================================================');
console.log('📊 REPORTE DE PROPIEDADES - SOMOS PROPERTIES');
console.log('=======================================================\n');

console.log(`Total de propiedades: ${data.properties.length}\n`);

console.log('🔴 PROPIEDADES SIN IMÁGENES:');
console.log(`Total: ${sinImagenes.length}`);
if (sinImagenes.length > 0) {
  sinImagenes.forEach(p => {
    console.log(`  • ID ${p.id}: ${p.title || 'Sin título'}`);
  });
}
console.log('');

console.log('🟡 PROPIEDADES CON POCAS IMÁGENES (1-2):');
console.log(`Total: ${pocasImagenes.length}`);
if (pocasImagenes.length > 0) {
  pocasImagenes.forEach(p => {
    console.log(`  • ID ${p.id}: ${p.title || 'Sin título'} - ${p.images.length} imagen(es)`);
  });
}
console.log('');

console.log('📝 PROPIEDADES SIN DESCRIPCIÓN O INCOMPLETA:');
console.log(`Total: ${sinDescripcion.length}`);
if (sinDescripcion.length > 0) {
  sinDescripcion.slice(0, 10).forEach(p => {
    console.log(`  • ID ${p.id}: ${p.title || 'Sin título'}`);
  });
  if (sinDescripcion.length > 10) {
    console.log(`  ... y ${sinDescripcion.length - 10} más`);
  }
}
console.log('');

console.log('💰 PROPIEDADES SIN PRECIO:');
console.log(`Total: ${sinPrecio.length}`);
if (sinPrecio.length > 0) {
  sinPrecio.forEach(p => {
    console.log(`  • ID ${p.id}: ${p.title || 'Sin título'}`);
  });
}
console.log('');

console.log('🏠 PROPIEDADES SIN AMENITIES:');
console.log(`Total: ${sinAmenities.length}`);
if (sinAmenities.length > 0) {
  sinAmenities.slice(0, 10).forEach(p => {
    console.log(`  • ID ${p.id}: ${p.title || 'Sin título'}`);
  });
  if (sinAmenities.length > 10) {
    console.log(`  ... y ${sinAmenities.length - 10} más`);
  }
}
console.log('');

console.log('✅ PROPIEDADES COMPLETAS (100%):');
console.log(`Total: ${completas.length} de ${data.properties.length} (${Math.round(completas.length/data.properties.length*100)}%)\n`);

console.log('=======================================================');
console.log('📋 RESUMEN PARA COORDINACIÓN CON LÍA:');
console.log('=======================================================\n');

const totalIncompletas = data.properties.length - completas.length;
console.log(`Propiedades que requieren atención: ${totalIncompletas}`);
console.log(`Porcentaje de completitud: ${Math.round(completas.length/data.properties.length*100)}%`);
console.log(`\nPrioridad 1 (Sin imágenes): ${sinImagenes.length} propiedades`);
console.log(`Prioridad 2 (Pocas imágenes): ${pocasImagenes.length} propiedades`);
console.log(`Prioridad 3 (Sin precio): ${sinPrecio.length} propiedades`);
console.log(`Prioridad 4 (Sin descripción): ${sinDescripcion.length} propiedades\n`);

// Guardar IDs de propiedades incompletas
const incompletas = data.properties.filter(p => !completas.includes(p));
const reporteDetallado = {
  fecha: new Date().toISOString().split('T')[0],
  totalPropiedades: data.properties.length,
  completitud: Math.round(completas.length/data.properties.length*100),
  propiedadesCompletas: completas.length,
  propiedadesIncompletas: totalIncompletas,
  detalles: {
    sinImagenes: sinImagenes.map(p => ({ id: p.id, title: p.title })),
    pocasImagenes: pocasImagenes.map(p => ({ id: p.id, title: p.title, cantidad: p.images.length })),
    sinPrecio: sinPrecio.map(p => ({ id: p.id, title: p.title })),
    sinDescripcion: sinDescripcion.map(p => ({ id: p.id, title: p.title }))
  }
};

fs.writeFileSync('./reporte-propiedades.json', JSON.stringify(reporteDetallado, null, 2));
console.log('✅ Reporte detallado guardado en: reporte-propiedades.json\n');
