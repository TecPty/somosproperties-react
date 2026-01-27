const fs = require('fs');
const path = require('path');

function getImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getImageFiles(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'].includes(ext)) {
        fileList.push({
          path: filePath.replace(/\\/g, '/'),
          name: file,
          ext: ext,
          size: stat.size,
          folder: path.dirname(filePath).replace(/\\/g, '/').split('/').pop()
        });
      }
    }
  });
  
  return fileList;
}

// Obtener todas las imágenes
const imagesDir = path.join(__dirname, 'public', 'images', 'properties');
const images = getImageFiles(imagesDir);

// Agrupar por extensión
const byExtension = {};
images.forEach(img => {
  if (!byExtension[img.ext]) {
    byExtension[img.ext] = [];
  }
  byExtension[img.ext].push(img);
});

// Agrupar por carpeta de proyecto
const byProject = {};
images.forEach(img => {
  const projectMatch = img.path.match(/properties\/([^\/]+)\//);
  if (projectMatch) {
    const project = projectMatch[1];
    if (!byProject[project]) {
      byProject[project] = { '.png': 0, '.jpg': 0, '.jpeg': 0, '.webp': 0, '.gif': 0, '.svg': 0, total: 0 };
    }
    byProject[project][img.ext] = (byProject[project][img.ext] || 0) + 1;
    byProject[project].total++;
  }
});

// Reporte
console.log('\n================================================================');
console.log('🖼️  ANÁLISIS DE FORMATOS DE IMÁGENES - SOMOS PROPERTIES');
console.log('================================================================\n');

console.log('📊 RESUMEN GENERAL:\n');
console.log(`Total de imágenes: ${images.length}\n`);

Object.entries(byExtension).sort((a, b) => b[1].length - a[1].length).forEach(([ext, files]) => {
  const percentage = ((files.length / images.length) * 100).toFixed(1);
  console.log(`${ext.toUpperCase().padEnd(8)} ${files.length.toString().padStart(4)} archivos (${percentage}%)`);
});

console.log('\n\n================================================================');
console.log('📁 DESGLOSE POR PROYECTO:');
console.log('================================================================\n');

Object.entries(byProject)
  .sort((a, b) => b[1].total - a[1].total)
  .forEach(([project, formats]) => {
    console.log(`\n${project.toUpperCase()}`);
    console.log(`  Total: ${formats.total} imágenes`);
    
    const formatDetails = Object.entries(formats)
      .filter(([key]) => key !== 'total' && formats[key] > 0)
      .sort((a, b) => b[1] - a[1])
      .map(([ext, count]) => `${ext}: ${count}`)
      .join(', ');
    
    console.log(`  Formatos: ${formatDetails}`);
  });

console.log('\n\n================================================================');
console.log('⚠️  RECOMENDACIONES:');
console.log('================================================================\n');

// Detectar inconsistencias
const projectsWithMixedFormats = Object.entries(byProject).filter(([project, formats]) => {
  const usedFormats = Object.entries(formats)
    .filter(([key, count]) => key !== 'total' && count > 0)
    .length;
  return usedFormats > 1;
});

if (projectsWithMixedFormats.length > 0) {
  console.log('🔸 Proyectos con formatos mezclados (recomendado estandarizar):\n');
  projectsWithMixedFormats.forEach(([project, formats]) => {
    const formatList = Object.entries(formats)
      .filter(([key, count]) => key !== 'total' && count > 0)
      .map(([ext, count]) => `${ext}: ${count}`)
      .join(', ');
    console.log(`  • ${project}: ${formatList}`);
  });
  console.log('');
}

console.log('💡 Mejor práctica:');
console.log('  • WebP: Mejor compresión y calidad (recomendado para web)');
console.log('  • PNG: Imágenes con transparencia o logos');
console.log('  • JPEG/JPG: Fotos sin necesidad de transparencia\n');

// Buscar archivos grandes
const largeFiles = images.filter(img => img.size > 500000).sort((a, b) => b.size - a.size);
if (largeFiles.length > 0) {
  console.log(`\n🔴 Archivos grandes (>500KB) - ${largeFiles.length} encontrados:\n`);
  largeFiles.slice(0, 10).forEach(img => {
    const sizeMB = (img.size / 1024 / 1024).toFixed(2);
    const projectMatch = img.path.match(/properties\/([^\/]+)\//);
    const project = projectMatch ? projectMatch[1] : 'unknown';
    console.log(`  • ${sizeMB}MB - ${project}/${img.name}`);
  });
  if (largeFiles.length > 10) {
    console.log(`  ... y ${largeFiles.length - 10} más\n`);
  }
}

// Guardar reporte detallado
const report = {
  fecha: new Date().toISOString().split('T')[0],
  totalImagenes: images.length,
  porFormato: Object.fromEntries(
    Object.entries(byExtension).map(([ext, files]) => [
      ext, 
      { cantidad: files.length, porcentaje: ((files.length / images.length) * 100).toFixed(1) }
    ])
  ),
  porProyecto: byProject,
  archivosGrandes: largeFiles.slice(0, 20).map(img => ({
    path: img.path.replace(/^.*properties\//, 'properties/'),
    size: `${(img.size / 1024 / 1024).toFixed(2)}MB`,
    ext: img.ext
  }))
};

fs.writeFileSync('./reporte-formatos-imagenes.json', JSON.stringify(report, null, 2));
console.log('\n✅ Reporte detallado guardado en: reporte-formatos-imagenes.json\n');
