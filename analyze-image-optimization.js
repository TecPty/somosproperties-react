const fs = require('fs');
const path = require('path');

console.log('\n=================================================================');
console.log('IMAGE OPTIMIZATION - CONVERTING TO WEBP');
console.log('=================================================================\n');

// Leer properties.json
const propertiesPath = './data/properties.json';
const data = JSON.parse(fs.readFileSync(propertiesPath, 'utf8'));

// Directorios de imágenes
const imageBasePath = './public/images/properties';

// Función para obtener archivos en una carpeta
function getFilesInDir(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  
  const items = fs.readdirSync(dir, { withFileTypes: true });
  items.forEach(item => {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...getFilesInDir(fullPath));
    } else {
      files.push({
        name: item.name,
        path: fullPath,
        ext: path.extname(item.name).toLowerCase(),
        dir: dir
      });
    }
  });
  return files;
}

// Obtener todas las imágenes
const allImages = getFilesInDir(imageBasePath);

// Agrupar por nombre base (sin extensión)
const groupedByBase = {};
allImages.forEach(img => {
  const basename = path.basename(img.name, img.ext);
  if (!groupedByBase[img.dir]) groupedByBase[img.dir] = {};
  if (!groupedByBase[img.dir][basename]) groupedByBase[img.dir][basename] = [];
  groupedByBase[img.dir][basename].push(img);
});

// Analizar duplicados
let duplicados = [];
let soloWebp = [];
let noWebp = [];

Object.entries(groupedByBase).forEach(([dir, files]) => {
  Object.entries(files).forEach(([basename, imgs]) => {
    const hasWebp = imgs.some(img => img.ext === '.webp');
    const hasOther = imgs.some(img => img.ext !== '.webp');
    
    if (hasWebp && hasOther) {
      duplicados.push({ dir, basename, files: imgs });
    } else if (!hasWebp && hasOther) {
      noWebp.push({ dir, basename, files: imgs });
    } else if (hasWebp && !hasOther) {
      soloWebp.push({ dir, basename, files: imgs });
    }
  });
});

console.log(`📊 ANÁLISIS DE IMÁGENES:\n`);
console.log(`Total de imágenes analizadas: ${allImages.length}`);
console.log(`Archivos con duplicados (PNG/JPG/JPEG + WEBP): ${duplicados.length}`);
console.log(`Archivos que necesitan conversión a WEBP: ${noWebp.length}`);
console.log(`Archivos ya en WEBP: ${soloWebp.length}\n`);

// Reporte de duplicados
if (duplicados.length > 0) {
  console.log('🔴 DUPLICADOS ENCONTRADOS:\n');
  duplicados.forEach(dup => {
    console.log(`${dup.basename}:`);
    dup.files.forEach(file => {
      console.log(`  - ${path.basename(file.path)} (${file.ext})`);
    });
  });
  console.log('');
}

// Reporte de archivos sin WEBP
if (noWebp.length > 0) {
  console.log(`\n🟡 ARCHIVOS SIN VERSIÓN WEBP (${noWebp.length}):\n`);
  noWebp.slice(0, 10).forEach(file => {
    console.log(`  • ${file.basename} (${file.files.map(f => f.ext).join(', ')})`);
  });
  if (noWebp.length > 10) {
    console.log(`  ... y ${noWebp.length - 10} más`);
  }
}

// Guardar reporte
const report = {
  fecha: new Date().toISOString().split('T')[0],
  totalImagenes: allImages.length,
  duplicados: duplicados.length,
  sinWebp: noWebp.length,
  yaEnWebp: soloWebp.length,
  detalles: {
    duplicados: duplicados.map(d => ({
      basename: d.basename,
      archivos: d.files.map(f => ({ name: f.name, ext: f.ext }))
    })),
    sinWebp: noWebp.slice(0, 20).map(d => ({
      basename: d.basename,
      formatos: d.files.map(f => f.ext)
    }))
  }
};

fs.writeFileSync('./image-optimization-report.json', JSON.stringify(report, null, 2));
console.log('\n✅ Reporte guardado en: image-optimization-report.json\n');
