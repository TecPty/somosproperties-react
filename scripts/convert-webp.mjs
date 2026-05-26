import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const slugs = [
  'terreno-comercial-juan-diaz-av-arango-12ha',
  'locales-azuero-terminal-plaza-chitre',
  'terreno-playa-mariabes-pedasi-146ha',
  'terreno-comercial-santiago-veraguas-terminal',
  'terreno-residencial-chilibre-transistmica',
  'terreno-rm2-c3-el-ingenio-ciudad-panama',
  'locales-cativa-plaza-colon-transistmica',
  'centro-distribucion-juan-diaz-ciudad-radial',
  'terreno-mixto-juan-diaz-arango-12794m2',
  'terreno-residencial-cativa-colon-25503m2',
  'locales-david-chiriqui-interamericana',
  'local-stand-alone-cativa-colon-339m2',
  'terreno-playa-sea-cliff-rio-hato',
];

const base = path.join('public', 'images', 'properties');

let converted = 0;
for (const slug of slugs) {
  const dir = path.join(base, slug);
  const pngs = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
  if (pngs.length === 0) {
    console.log(`- ${slug}: (vacia)`);
    continue;
  }
  for (const png of pngs) {
    const input = path.join(dir, png);
    const output = path.join(dir, png.replace('.png', '.webp'));
    await sharp(input)
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(output);
    const inKB = Math.round(fs.statSync(input).size / 1024);
    const outKB = Math.round(fs.statSync(output).size / 1024);
    console.log(`OK ${slug}/${png}  ${inKB}KB -> ${outKB}KB`);
    converted++;
  }
}
console.log(`\nTotal: ${converted} imagenes convertidas.`);
