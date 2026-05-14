
const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'data/properties.json',
  'properties_source.json',
  'lib/schema.ts',
  'lib/seo.ts',
  'lib/promotions.config.ts',
  'lib/config.ts',
  'components/navbar.tsx',
  'components/footer.tsx',
  'components/business-card.tsx',
  'app/[locale]/nosotros/page.tsx',
  'app/[locale]/card/xtra/page.tsx',
  'app/[locale]/card/mark/page.tsx',
  'app/[locale]/card/bizsolutions/page.tsx'
];

filesToUpdate.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    console.log(`Actualizando referencias en: ${file}`);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace .png, .jpg, .jpeg with .webp
    // But avoid favicons and apple-touch-icons
    content = content.replace(/(?<!favicon|apple-touch-icon)\.(png|jpg|jpeg)(?=["']|\s|$)/g, '.webp');
    
    fs.writeFileSync(filePath, content);
  } else {
    console.warn(`Archivo no encontrado: ${file}`);
  }
});
