/**
 * fix-sunset-strip.mjs
 * Sync Sunset Strip locals to verified price table.
 *
 * Source of truth (price table):
 *   LOCAL 019 – 113 m²  – $3,500/mo – HOA $226  → NEW id:272
 *   LOCAL 021 – 113 m²  – $3,500/mo – HOA $226  → NEW id:273
 *   LOCAL 026 – 98 m²   – $2,500/mo – HOA $196  → UPDATE id:143
 *   LOCAL 029 – 164 m²  – $5,100/mo – HOA $328  → UPDATE id:148
 *   LOCAL 112 – 46 m²   – $830/mo   – HOA $69   → UPDATE id:144
 *   LOCAL 306 – 80 m²   – $1,375/mo – HOA $120  → UPDATE id:141
 *   LOCAL 311 – 36 m²   – $650/mo   – HOA $54   → NEW id:274
 *   LOCAL 411 – 36 m²   – $680/mo   – HOA $54   → UPDATE id:271
 *
 * Hidden (not in table): id 33, 142, 145, 146, 147, 255, 256, 257
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, '..', 'data', 'properties.json');

const data = JSON.parse(readFileSync(dataPath, 'utf-8'));
const properties = data.properties;

// ─── Shared image assets ────────────────────────────────────────────────────
const heroImages = [
  '/images/properties/sunset-strip/hero/fachada-principal-via-israel.webp',
  '/images/properties/sunset-strip/hero/fachada-frontal-strip-mall.webp',
  '/images/properties/sunset-strip/hero/fachada-torre-bella-vista.webp',
];
const galleryImages = [
  '/images/properties/sunset-strip/gallery/lobby-vidrio-acceso-locales.webp',
  '/images/properties/sunset-strip/gallery/escaleras-electricas-lobby.webp',
  '/images/properties/sunset-strip/gallery/pasillo-comercial-interior.webp',
  '/images/properties/sunset-strip/gallery/lobby-recepcion-cowork.webp',
];
const allImages = [...heroImages, ...galleryImages];

const floorPlanta0 = ['/images/properties/sunset-strip/floorplans/nivel-00.webp'];
const floorNivel1  = ['/images/properties/sunset-strip/floorplans/nivel-100.webp'];
const floorNivel2  = ['/images/properties/sunset-strip/floorplans/nivel-200.webp'];

const amenities = [
  'Acceso directo desde estacionamiento',
  'Fachada con vitrina de piso a techo',
  'Pasillo climatizado y escaleras eléctricas',
  'Seguridad 24/7 y CCTV',
];

const baseTemplate = {
  category:    'Comercial',
  operation:   'Alquiler',
  price:       0,
  location:    'Vía Israel, San Francisco, Ciudad de Panamá',
  city:        'Ciudad de Panamá',
  district:    'San Francisco',
  bedrooms:    0,
  bathrooms:   1,
  parkingSpots: 0,
  builtYear:   2024,
  featured:    false,
  status:      'available',
  type:        'Local',
  image:       heroImages[0],
  images:      allImages,
  planos:      [],
  amenities,
  hidden:      false,
};

// ─── Helper ──────────────────────────────────────────────────────────────────
function findById(id) {
  return properties.find(p => p.id === id);
}

function applyUpdate(id, patch) {
  const idx = properties.findIndex(p => p.id === id);
  if (idx === -1) { console.error(`❌  id:${id} not found`); return; }
  properties[idx] = { ...properties[idx], ...patch };
  console.log(`✅  Updated id:${id} — ${properties[idx].title}`);
}

function hideById(id) {
  applyUpdate(id, { hidden: true });
}

// ─── HIDE units not in price table ──────────────────────────────────────────
const toHide = [33, 142, 145, 146, 147, 255, 256, 257];
toHide.forEach(id => hideById(id));

// ─── UPDATE id:141  →  Local 306  (Nivel 3, 80 m², $1,375/mo, HOA $120) ────
applyUpdate(141, {
  title:          'Sunset Strip – Local 306',
  slug:           'sunset-strip-local-306',
  area:           80,
  pricePerMonth:  1375,
  hoa:            120,
  status:         'available',
  hidden:         false,
  images:         allImages,
  image:          heroImages[0],
  planos:         floorNivel2,        // nearest available: nivel-200.webp for level 3
  description:
    'Local 306 en Plaza Sunset Strip (Nivel 3), 80 m². ' +
    'Canon $1,375/mes + mantenimiento $1.50/m² ($120/mes). ' +
    'Local interior en pasillo climatizado con escaleras eléctricas. ' +
    'Ideal para boutique, estudio o servicio especializado.',
  description_en:
    'Unit 306 at Plaza Sunset Strip (Level 3), 80 m². ' +
    'Rent $1,375/mo + maintenance fee $1.50/m² ($120/mo). ' +
    'Interior unit in climate-controlled corridor with escalators. ' +
    'Ideal for boutique, studio or specialized services.',
  highlights: [
    '80 m² en Nivel 3',
    'Canon $1,375 + HOA $120/mes',
    'Pasillo climatizado',
    'Seguridad 24/7',
  ],
});

// ─── UPDATE id:143  →  Local 026  (Planta Baja, 98 m², $2,500/mo, HOA $196) ─
applyUpdate(143, {
  title:          'Sunset Strip – Local 026',
  slug:           'sunset-strip-local-026',
  area:           98,
  pricePerMonth:  2500,
  hoa:            196,
  status:         'available',
  hidden:         false,
  images:         allImages,
  image:          heroImages[0],
  planos:         floorPlanta0,
  description:
    'Local 026 en Plaza Sunset Strip (Planta Baja), 69 m² interiores + 29 m² de terraza = 98 m² totales. ' +
    'Canon $2,500/mes + mantenimiento $2.00/m² ($196/mes). ' +
    'Con acceso directo desde estacionamiento y vitrina de piso a techo.',
  description_en:
    'Unit 026 at Plaza Sunset Strip (Ground Floor), 69 m² interior + 29 m² terrace = 98 m² total. ' +
    'Rent $2,500/mo + maintenance fee $2.00/m² ($196/mo). ' +
    'Direct parking access and floor-to-ceiling storefront window.',
  highlights: [
    '69 m² + 29 m² terraza (98 m² totales)',
    'Canon $2,500 + HOA $196/mes',
    'Acceso directo desde estacionamiento',
    'Vitrina de piso a techo',
  ],
});

// ─── UPDATE id:144  →  Local 112  (Nivel 1, 46 m², $830/mo, HOA $69) ────────
applyUpdate(144, {
  title:          'Sunset Strip – Local 112',
  slug:           'sunset-strip-local-112',
  area:           46,
  pricePerMonth:  830,
  hoa:            69,
  status:         'available',
  hidden:         false,
  images:         allImages,
  image:          heroImages[0],
  planos:         floorNivel1,
  description:
    'Local 112 en Plaza Sunset Strip (Nivel 1), 46 m². ' +
    'Canon $830/mes + mantenimiento $1.50/m² ($69/mes). ' +
    'Local en planta alta con escaleras eléctricas y pasillo climatizado.',
  description_en:
    'Unit 112 at Plaza Sunset Strip (Level 1), 46 m². ' +
    'Rent $830/mo + maintenance fee $1.50/m² ($69/mo). ' +
    'Upper-floor unit with escalator access and climate-controlled corridor.',
  highlights: [
    '46 m² en Nivel 1',
    'Canon $830 + HOA $69/mes',
    'Acceso por escaleras eléctricas',
    'Pasillo climatizado',
  ],
});

// ─── UPDATE id:148  →  Local 029  (Planta Baja, 164 m², $5,100/mo, HOA $328) ─
applyUpdate(148, {
  title:          'Sunset Strip – Local 029',
  slug:           'sunset-strip-local-029',
  area:           164,
  pricePerMonth:  5100,
  hoa:            328,
  status:         'available',
  hidden:         false,
  images:         allImages,
  image:          heroImages[0],
  planos:         floorPlanta0,
  description:
    'Local 029 en Plaza Sunset Strip (Planta Baja), 164 m². ' +
    'Canon $5,100/mes + mantenimiento $2.00/m² ($328/mes). ' +
    'El local más grande de Planta Baja, con acceso directo desde estacionamiento y frente a vía principal.',
  description_en:
    'Unit 029 at Plaza Sunset Strip (Ground Floor), 164 m². ' +
    'Rent $5,100/mo + maintenance fee $2.00/m² ($328/mo). ' +
    'Largest ground-floor unit with direct parking access and main street frontage.',
  highlights: [
    '164 m² en Planta Baja',
    'Canon $5,100 + HOA $328/mes',
    'Acceso directo desde estacionamiento',
    'Local de mayor tamaño en Planta Baja',
  ],
});

// ─── UPDATE id:271  →  Local 411  (Nivel 4, 36 m², $680/mo, HOA $54) ────────
applyUpdate(271, {
  title:          'Sunset Strip – Local 411',
  slug:           'sunset-strip-local-411',
  area:           36,
  pricePerMonth:  680,
  hoa:            54,
  status:         'available',
  hidden:         false,
  images:         allImages,
  image:          heroImages[0],
  planos:         [],
  description:
    'Local 411 en Plaza Sunset Strip (Nivel 4), 36 m². ' +
    'Canon $680/mes + mantenimiento $1.50/m² ($54/mes). ' +
    'Ideal para oficina boutique, consultorio o estudio creativo en planta alta.',
  description_en:
    'Unit 411 at Plaza Sunset Strip (Level 4), 36 m². ' +
    'Rent $680/mo + maintenance fee $1.50/m² ($54/mo). ' +
    'Ideal for a boutique office, clinic, or creative studio on the upper floor.',
  highlights: [
    '36 m² en Nivel 4',
    'Canon $680 + HOA $54/mes',
    'Pasillo climatizado',
    'Seguridad 24/7',
  ],
});

// ─── CREATE id:272  →  Local 019  (Planta Baja, 113 m², $3,500/mo, HOA $226) ─
properties.push({
  ...baseTemplate,
  id:             272,
  title:          'Sunset Strip – Local 019',
  slug:           'sunset-strip-local-019',
  area:           113,
  pricePerMonth:  3500,
  hoa:            226,
  planos:         floorPlanta0,
  description:
    'Local 019 en Plaza Sunset Strip (Planta Baja), 113 m². ' +
    'Canon $3,500/mes + mantenimiento $2.00/m² ($226/mes). ' +
    'Local de gran frente peatonal con vitrina de piso a techo y acceso directo desde estacionamiento.',
  description_en:
    'Unit 019 at Plaza Sunset Strip (Ground Floor), 113 m². ' +
    'Rent $3,500/mo + maintenance fee $2.00/m² ($226/mo). ' +
    'Large pedestrian frontage with floor-to-ceiling window and direct parking access.',
  highlights: [
    '113 m² en Planta Baja',
    'Canon $3,500 + HOA $226/mes',
    'Frente peatonal',
    'Vitrina de piso a techo',
  ],
});
console.log('✅  Created id:272 — Sunset Strip – Local 019');

// ─── CREATE id:273  →  Local 021  (Planta Baja, 113 m², $3,500/mo, HOA $226) ─
properties.push({
  ...baseTemplate,
  id:             273,
  title:          'Sunset Strip – Local 021',
  slug:           'sunset-strip-local-021',
  area:           113,
  pricePerMonth:  3500,
  hoa:            226,
  planos:         floorPlanta0,
  description:
    'Local 021 en Plaza Sunset Strip (Planta Baja), 113 m². ' +
    'Canon $3,500/mes + mantenimiento $2.00/m² ($226/mes). ' +
    'Local de gran frente peatonal con vitrina de piso a techo y acceso directo desde estacionamiento.',
  description_en:
    'Unit 021 at Plaza Sunset Strip (Ground Floor), 113 m². ' +
    'Rent $3,500/mo + maintenance fee $2.00/m² ($226/mo). ' +
    'Large pedestrian frontage with floor-to-ceiling window and direct parking access.',
  highlights: [
    '113 m² en Planta Baja',
    'Canon $3,500 + HOA $226/mes',
    'Frente peatonal',
    'Vitrina de piso a techo',
  ],
});
console.log('✅  Created id:273 — Sunset Strip – Local 021');

// ─── CREATE id:274  →  Local 311  (Nivel 3, 36 m², $650/mo, HOA $54) ─────────
properties.push({
  ...baseTemplate,
  id:             274,
  title:          'Sunset Strip – Local 311',
  slug:           'sunset-strip-local-311',
  area:           36,
  pricePerMonth:  650,
  hoa:            54,
  planos:         floorNivel2,
  description:
    'Local 311 en Plaza Sunset Strip (Nivel 3), 36 m². ' +
    'Canon $650/mes + mantenimiento $1.50/m² ($54/mes). ' +
    'Compacto y eficiente, ideal para oficina unipersonal o consultorio.',
  description_en:
    'Unit 311 at Plaza Sunset Strip (Level 3), 36 m². ' +
    'Rent $650/mo + maintenance fee $1.50/m² ($54/mo). ' +
    'Compact and efficient — ideal for a solo office or consulting room.',
  highlights: [
    '36 m² en Nivel 3',
    'Canon $650 + HOA $54/mes',
    'Pasillo climatizado',
    'Seguridad 24/7',
  ],
});
console.log('✅  Created id:274 — Sunset Strip – Local 311');

// ─── Write output ────────────────────────────────────────────────────────────
writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
console.log(`\n🎉  Done — ${dataPath} updated. Total properties: ${properties.length}`);
