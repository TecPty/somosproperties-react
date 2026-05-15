/**
 * fix-praderas.mjs
 * Sync Praderas de Arraiján properties to verified price table.
 *
 * HIDE (not in table):     ids 25, 240, 243, 246, 247
 * UPDATE area 80→70 m²:    ids 239 (Casa 186), 244 (Casa 189), 245 (Casa 192)
 * ALREADY CORRECT:         id 241 (Casa 272, Dúplex $118,073 90m²)
 *
 * CREATE — Unifamiliar 2 Rec, 70 m², $87,997:
 *   id 275 Casa 188  (Entrega Inmediata)
 *   id 276 Casa 262  (Agosto 2026)
 *   id 277 Casa 263  (Agosto 2026)
 *   id 278 Casa 264  (Agosto 2026)
 *   id 279 Casa 265  (Agosto 2026)
 *   id 280 Casa 278  (Junio 2026)
 *   id 281 Casa 279  (Junio 2026)
 *
 * CREATE — Unifamiliar 3 Rec, 80 m², $97,997:
 *   id 282 Casa 200  (Entrega Inmediata)
 *   id 283 Casa 204  (Agosto 2026)
 *   id 284 Casa 205  (Agosto 2026)
 *   id 285 Casa 206  (Agosto 2026)
 *   id 286 Casa 207  (Agosto 2026)
 *   id 287 Casa 208  (Agosto 2026)
 *   id 288 Casa 289  (Agosto 2026)
 *
 * CREATE — Dúplex Almendro 3 Rec, 90 m², $118,073:
 *   id 289 Casa 259  (Junio 2026)
 *   id 290 Casa 274  (Junio 2026)
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, '..', 'data', 'properties.json');

const raw  = JSON.parse(readFileSync(dataPath, 'utf-8'));
const props = raw.properties;

// ─── Helpers ─────────────────────────────────────────────────────────────────
function applyUpdate(id, patch) {
  const idx = props.findIndex(p => p.id === id);
  if (idx === -1) { console.error(`❌  id:${id} not found`); return; }
  props[idx] = { ...props[idx], ...patch };
  console.log(`✅  Updated id:${id} — ${props[idx].title}`);
}

const amenities = [
  'Pumptrack (Único en Panamá)',
  'Parque infantil',
  'Mini golf',
  'Cancha de fútbol',
  'Cancha de baloncesto',
  'Cancha de voleibol',
  'Gimnasio equipado',
  'Piscina comunitaria',
  'Salón de eventos',
  'BBQ y área social',
  'Seguridad 24/7',
  'Acceso controlado',
  'Ciclovía interna',
  'Áreas verdes',
  'Estación Metro Línea 3',
  'Pet-friendly',
];

const images = [
  '/images/properties/praderas-de-arraijan/exterior/praderas-fachada-principal.webp',
  '/images/properties/praderas-de-arraijan/gallery/praderas-comedor-mesa-redonda.webp',
  '/images/properties/praderas-de-arraijan/gallery/praderas-sala-ventanal-parque.webp',
  '/images/properties/praderas-de-arraijan/amenities/praderas-area-juegos-infantiles.webp',
  '/images/properties/praderas-de-arraijan/amenities/praderas-parque-central-caminos.webp',
];

const baseTemplate = {
  etapa:        'E2',
  type:         'Casa',
  category:     'Residencial',
  operation:    'Venta',
  pricePerMonth: null,
  location:     'Arraiján, Panamá Oeste',
  city:         'Arraiján',
  district:     'Arraiján',
  parkingSpots: 1,
  builtYear:    2025,
  image:        images[0],
  images,
  planos:       [],
  virtualTour:  'https://my.matterport.com/show/?m=SHsQfWJMM9J',
  amenities,
  status:       'available',
  featured:     false,
  hidden:       false,
  minIncome:    1300,
};

const base2Rec = {
  ...baseTemplate,
  bedrooms:  2,
  bathrooms: 2,
  area:      70,
  price:     87997,
};

const base3Rec = {
  ...baseTemplate,
  bedrooms:   3,
  bathrooms:  2,
  area:       80,
  price:      97997,
  minIncome:  1300,
};

const baseDuplex = {
  ...baseTemplate,
  bedrooms:    3,
  bathrooms:   2.5,
  area:        90,
  price:       118073,
  parkingSpots: 2,
  minIncome:   1500,
};

// ─── HIDE ─────────────────────────────────────────────────────────────────────
[25, 240, 243, 246, 247].forEach(id => applyUpdate(id, { hidden: true }));

// ─── UPDATE AREA 80 → 70 for 2-Rec Unifamiliares ─────────────────────────────
applyUpdate(239, {
  area:       70,
  title:      'Praderas de Arraiján - E2 Casa 186 (Unifamiliar 2 Rec)',
  highlights: [
    'Casa unifamiliar 2 recámaras',
    'Entrega Inmediata',
    '70 m² – Lote 171.00',
    'Precio: $87,997',
  ],
  description:
    'Casa 186 – Praderas de Arraiján (Etapa 2, Lote 171.00). ' +
    'Modelo Roble Unifamiliar 1 Piso · Entrega Inmediata.\n\n' +
    '2 recámaras, 2 baños, 70 m², 1 estacionamiento techado. ' +
    'Acceso directo a Línea 3 del Metro. Comunidad cerrada con Pumptrack, piscina, gimnasio y áreas verdes. ' +
    'Ingreso familiar desde $1,300.',
  description_en:
    'House 186 at Praderas de Arraiján (Stage 2, Lot 171.00). ' +
    'Roble single-story model — Immediate Delivery. ' +
    '2 bedrooms, 2 bathrooms, 70 m², 1 covered parking. ' +
    'Direct access to Metro Line 3. Gated community with Pumptrack, pool, gym and green areas. Min. household income $1,300.',
});

applyUpdate(244, {
  area:       70,
  title:      'Praderas de Arraiján - E2 Casa 189 (Unifamiliar 2 Rec)',
  highlights: [
    'Casa unifamiliar 2 recámaras',
    'Entrega Inmediata',
    '70 m² – Lote 171.00',
    'Precio: $87,997',
  ],
  description:
    'Casa 189 – Praderas de Arraiján (Etapa 2, Lote 171.00). ' +
    'Modelo Roble Unifamiliar 1 Piso · Entrega Inmediata.\n\n' +
    '2 recámaras, 2 baños, 70 m², 1 estacionamiento techado. ' +
    'Acceso directo a Línea 3 del Metro. Comunidad cerrada con Pumptrack, piscina, gimnasio y áreas verdes. ' +
    'Ingreso familiar desde $1,300.',
  description_en:
    'House 189 at Praderas de Arraiján (Stage 2, Lot 171.00). ' +
    'Roble single-story model — Immediate Delivery. ' +
    '2 bedrooms, 2 bathrooms, 70 m², 1 covered parking. ' +
    'Direct access to Metro Line 3. Gated community with Pumptrack, pool, gym and green areas. Min. household income $1,300.',
});

applyUpdate(245, {
  area:       70,
  title:      'Praderas de Arraiján - E2 Casa 192 (Unifamiliar 2 Rec)',
  highlights: [
    'Casa unifamiliar 2 recámaras',
    'Entrega Inmediata',
    '70 m² – Lote 171.00',
    'Precio: $87,997',
  ],
  description:
    'Casa 192 – Praderas de Arraiján (Etapa 2, Lote 171.00). ' +
    'Modelo Roble Unifamiliar 1 Piso · Entrega Inmediata.\n\n' +
    '2 recámaras, 2 baños, 70 m², 1 estacionamiento techado. ' +
    'Acceso directo a Línea 3 del Metro. Comunidad cerrada con Pumptrack, piscina, gimnasio y áreas verdes. ' +
    'Ingreso familiar desde $1,300.',
  description_en:
    'House 192 at Praderas de Arraiján (Stage 2, Lot 171.00). ' +
    'Roble single-story model — Immediate Delivery. ' +
    '2 bedrooms, 2 bathrooms, 70 m², 1 covered parking. ' +
    'Direct access to Metro Line 3. Gated community with Pumptrack, pool, gym and green areas. Min. household income $1,300.',
});

// ─── CREATE — Unifamiliar 2 Rec 70 m² $87,997 ────────────────────────────────
const unif2RecSpecs = [
  { id: 275, casa: 188, delivery: 'Entrega Inmediata',  slug: 'praderas-de-arraijan-e2-casa-188-unifamiliar-2rec' },
  { id: 276, casa: 262, delivery: 'Entrega Agosto 2026', slug: 'praderas-de-arraijan-e2-casa-262-unifamiliar-2rec' },
  { id: 277, casa: 263, delivery: 'Entrega Agosto 2026', slug: 'praderas-de-arraijan-e2-casa-263-unifamiliar-2rec' },
  { id: 278, casa: 264, delivery: 'Entrega Agosto 2026', slug: 'praderas-de-arraijan-e2-casa-264-unifamiliar-2rec' },
  { id: 279, casa: 265, delivery: 'Entrega Agosto 2026', slug: 'praderas-de-arraijan-e2-casa-265-unifamiliar-2rec' },
  { id: 280, casa: 278, delivery: 'Entrega Junio 2026',  slug: 'praderas-de-arraijan-e2-casa-278-unifamiliar-2rec' },
  { id: 281, casa: 279, delivery: 'Entrega Junio 2026',  slug: 'praderas-de-arraijan-e2-casa-279-unifamiliar-2rec' },
];

unif2RecSpecs.forEach(({ id, casa, delivery, slug }) => {
  props.push({
    ...base2Rec,
    id,
    casa,
    title:    `Praderas de Arraiján - E2 Casa ${casa} (Unifamiliar 2 Rec)`,
    slug,
    highlights: [
      'Casa unifamiliar 2 recámaras',
      delivery,
      '70 m² – Lote 171.00',
      'Precio: $87,997',
    ],
    description:
      `Casa ${casa} – Praderas de Arraiján (Etapa 2, Lote 171.00). ` +
      `Modelo Unifamiliar 1 Piso · ${delivery}.\n\n` +
      `2 recámaras, 2 baños, 70 m², 1 estacionamiento techado. ` +
      `Acceso directo a Línea 3 del Metro. Comunidad cerrada con Pumptrack, piscina, gimnasio y áreas verdes. ` +
      `Ingreso familiar desde $1,300.`,
    description_en:
      `House ${casa} at Praderas de Arraiján (Stage 2, Lot 171.00). ` +
      `Single-story model — ${delivery}. ` +
      `2 bedrooms, 2 bathrooms, 70 m², 1 covered parking. ` +
      `Direct access to Metro Line 3. Gated community with Pumptrack, pool, gym and green areas. Min. household income $1,300.`,
  });
  console.log(`✅  Created id:${id} — Casa ${casa} (2 Rec, ${delivery})`);
});

// ─── CREATE — Unifamiliar 3 Rec 80 m² $97,997 ────────────────────────────────
const unif3RecSpecs = [
  { id: 282, casa: 200, delivery: 'Entrega Inmediata',  slug: 'praderas-de-arraijan-e2-casa-200-unifamiliar-3rec' },
  { id: 283, casa: 204, delivery: 'Entrega Agosto 2026', slug: 'praderas-de-arraijan-e2-casa-204-unifamiliar-3rec' },
  { id: 284, casa: 205, delivery: 'Entrega Agosto 2026', slug: 'praderas-de-arraijan-e2-casa-205-unifamiliar-3rec' },
  { id: 285, casa: 206, delivery: 'Entrega Agosto 2026', slug: 'praderas-de-arraijan-e2-casa-206-unifamiliar-3rec' },
  { id: 286, casa: 207, delivery: 'Entrega Agosto 2026', slug: 'praderas-de-arraijan-e2-casa-207-unifamiliar-3rec' },
  { id: 287, casa: 208, delivery: 'Entrega Agosto 2026', slug: 'praderas-de-arraijan-e2-casa-208-unifamiliar-3rec' },
  { id: 288, casa: 289, delivery: 'Entrega Agosto 2026', slug: 'praderas-de-arraijan-e2-casa-289-unifamiliar-3rec' },
];

unif3RecSpecs.forEach(({ id, casa, delivery, slug }) => {
  props.push({
    ...base3Rec,
    id,
    casa,
    title:    `Praderas de Arraiján - E2 Casa ${casa} (Unifamiliar 3 Rec)`,
    slug,
    highlights: [
      'Casa unifamiliar 3 recámaras',
      delivery,
      '80 m²',
      'Precio: $97,997',
    ],
    description:
      `Casa ${casa} – Praderas de Arraiján (Etapa 2). ` +
      `Modelo Unifamiliar 1 Piso 3 Recámaras · ${delivery}.\n\n` +
      `3 recámaras, 2 baños, 80 m², 1 estacionamiento techado. ` +
      `Amplio diseño familiar con sala-comedor integrados y patio trasero. ` +
      `Acceso directo a Línea 3 del Metro. Pumptrack, piscina, gimnasio y áreas verdes. ` +
      `Ingreso familiar desde $1,300.`,
    description_en:
      `House ${casa} at Praderas de Arraiján (Stage 2). ` +
      `Single-story 3-bedroom model — ${delivery}. ` +
      `3 bedrooms, 2 bathrooms, 80 m², 1 covered parking. ` +
      `Open-plan living and dining area with backyard. ` +
      `Direct access to Metro Line 3. Pumptrack, pool, gym and green areas. Min. household income $1,300.`,
  });
  console.log(`✅  Created id:${id} — Casa ${casa} (3 Rec, ${delivery})`);
});

// ─── CREATE — Dúplex Almendro 3 Rec 90 m² $118,073 ───────────────────────────
const duplexSpecs = [
  { id: 289, casa: 259, delivery: 'Entrega Junio 2026', slug: 'praderas-de-arraijan-e2-casa-259-duplex-3rec' },
  { id: 290, casa: 274, delivery: 'Entrega Junio 2026', slug: 'praderas-de-arraijan-e2-casa-274-duplex-3rec' },
];

duplexSpecs.forEach(({ id, casa, delivery, slug }) => {
  props.push({
    ...baseDuplex,
    id,
    casa,
    title:    `Praderas de Arraiján - E2 Casa ${casa} (Dúplex 3 Rec)`,
    slug,
    highlights: [
      'Dúplex Almendro 3 recámaras 2.5 baños',
      delivery,
      '90 m² – 2 plantas',
      'Precio: $118,073',
    ],
    description:
      `Casa ${casa} – Praderas de Arraiján (Etapa 2). ` +
      `Modelo Almendro Dúplex 2 Pisos · ${delivery}.\n\n` +
      `3 recámaras, 2.5 baños, 90 m², 2 estacionamientos techados. ` +
      `Diseño en 2 plantas con sala-comedor en planta baja y recámaras en planta alta. ` +
      `Acceso directo a Línea 3 del Metro. Pumptrack, piscina, gimnasio y áreas verdes. ` +
      `Ingreso familiar desde $1,500.`,
    description_en:
      `House ${casa} at Praderas de Arraiján (Stage 2). ` +
      `Almendro 2-story duplex — ${delivery}. ` +
      `3 bedrooms, 2.5 bathrooms, 90 m², 2 covered parking spaces. ` +
      `Two-story layout: living/dining on ground floor, bedrooms upstairs. ` +
      `Direct access to Metro Line 3. Pumptrack, pool, gym and green areas. Min. household income $1,500.`,
  });
  console.log(`✅  Created id:${id} — Casa ${casa} (Dúplex, ${delivery})`);
});

// ─── Write ────────────────────────────────────────────────────────────────────
writeFileSync(dataPath, JSON.stringify(raw, null, 2), 'utf-8');
console.log(`\n🎉  Done — total properties: ${props.length}`);
