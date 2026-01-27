const fs = require('fs');
const path = require('path');

console.log('\n=================================================================');
console.log('OPTIMIZACION: ELIMINANDO DUPLICADOS Y ACTUALIZANDO REFERENCIAS');
console.log('=================================================================\n');

// Leer properties.json
const propertiesPath = './data/properties.json';
const data = JSON.parse(fs.readFileSync(propertiesPath, 'utf8'));

// Directorios de imágenes
const imageBasePath = './public/images/properties';

// Función para obtener archivos en una carpeta
function getFilesInDir(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  
  const items = fs.readdirSync(dir, { withFileTypes: true });
  items.forEach(item => {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      getFilesInDir(fullPath, fileList);
    } else {
      const ext = path.extname(item.name).toLowerCase();
      if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
        fileList.push({
          name: item.name,
          path: fullPath,
          ext: ext,
          dir: dir
        });
      }
    }
  });
  return fileList;
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

// Encontrar duplicados y archivos para eliminar
let filesToDelete = [];
let replacements = {};

Object.entries(groupedByBase).forEach(([dir, files]) => {
  Object.entries(files).forEach(([basename, imgs]) => {
    const hasWebp = imgs.find(img => img.ext === '.webp');
    const nonWebp = imgs.filter(img => img.ext !== '.webp');
    
    // Si tiene WEBP y otros formatos, eliminar los otros y crear mapeo
    if (hasWebp && nonWebp.length > 0) {
      nonWebp.forEach(img => {
        filesToDelete.push(img.path);
        // Crear mapeo para reemplazar en JSON
        const oldPath = '/images/properties/' + path.relative(imageBasePath, img.path).replace(/\\/g, '/');
        const newPath = '/images/properties/' + path.relative(imageBasePath, hasWebp.path).replace(/\\/g, '/');
        replacements[oldPath] = newPath;
      });
    }
  });
});

console.log(`📊 PLAN DE ACCIÓN:\n`);
console.log(`Archivos a eliminar: ${filesToDelete.length}`);
console.log(`Referencias a actualizar en properties.json: ${Object.keys(replacements).length}\n`);

// Actualizar properties.json
let updated = 0;
let references = 0;

data.properties.forEach(property => {
  if (property.images && Array.isArray(property.images)) {
    property.images = property.images.map(img => {
      if (replacements[img]) {
        console.log(`  ✓ ${img} → ${replacements[img]}`);
        updated++;
        return replacements[img];
      }
      return img;
    });
    references += property.images.length;
  }
  
  if (property.planos && Array.isArray(property.planos)) {
    property.planos = property.planos.map(img => {
      if (replacements[img]) {
        console.log(`  ✓ ${img} → ${replacements[img]}`);
        updated++;
        return replacements[img];
      }
      return img;
    });
    references += property.planos.length;
  }
});

console.log(`\n✅ Referencias actualizadas: ${updated} de ${references}\n`);

// Guardar properties.json actualizado
fs.writeFileSync(propertiesPath, JSON.stringify(data, null, 2));
console.log(`✅ properties.json actualizado\n`);

// Eliminar archivos duplicados
console.log(`🗑️  Eliminando ${filesToDelete.length} archivos duplicados...\n`);
let deleted = 0;
filesToDelete.forEach(file => {
  try {
    fs.unlinkSync(file);
    console.log(`  ✓ Eliminado: ${path.basename(file)}`);
    deleted++;
  } catch (err) {
    console.log(`  ✗ Error al eliminar: ${path.basename(file)} - ${err.message}`);
  }
});

console.log(`\n=================================================================`);
console.log(`📈 RESUMEN:\n`);
console.log(`Archivos eliminados: ${deleted}/${filesToDelete.length}`);
console.log(`Espacio liberado: ~${(filesToDelete.reduce((sum, file) => {
  try {
    return sum + fs.statSync(file).size;
  } catch {
    return sum;
  }
}, 0) / 1024 / 1024).toFixed(2)}MB`);
console.log(`Referencias actualizadas en JSON: ${updated}`);
console.log(`\n✅ Optimización completada!\n`);
console.log(`=================================================================\n`);

// Guardar reporte
const report = {
  fecha: new Date().toISOString().split('T')[0],
  accion: 'Eliminacion de duplicados y conversion a WEBP',
  archivosEliminados: deleted,
  referenciasActualizadas: updated,
  detalles: {
    reemplazos: replacements
  }
};

fs.writeFileSync('./image-cleanup-report.json', JSON.stringify(report, null, 2));
