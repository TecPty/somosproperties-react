/**
 * generate-property-report.mjs
 * Genera un reporte HTML de todas las propiedades listo para imprimir como PDF.
 * Uso: node scripts/generate-property-report.mjs
 */

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const propertiesPath = join(__dirname, '../data/properties.json')
const outputPath = join(__dirname, '../property-report.html')

const all = JSON.parse(readFileSync(propertiesPath, 'utf-8'))
const rawProperties = Array.isArray(all) ? all : (all.properties ?? [])

// Todas las propiedades excepto las ocultas
const properties = rawProperties
  .filter(p => !p.hidden)
  .sort((a, b) => {
    const catOrder = { 'Premium': 0, 'Residencial': 1, 'Comercial': 2 }
    const ca = catOrder[a.category] ?? 9
    const cb = catOrder[b.category] ?? 9
    return ca !== cb ? ca - cb : a.id - b.id
  })

function formatPrice(p) {
  if (p.price != null && p.price > 0) {
    return `$${Number(p.price).toLocaleString('es-PA')}`
  }
  if (p.pricePerMonth != null && p.pricePerMonth > 0) {
    return `$${Number(p.pricePerMonth).toLocaleString('es-PA')}/mes`
  }
  if (p.pricePerM2 != null && p.pricePerM2 > 0) {
    return `$${Number(p.pricePerM2).toLocaleString('es-PA')}/m²`
  }
  return 'A consultar'
}

function formatArea(p) {
  if (p.area != null) return `${Number(p.area).toLocaleString('es-PA')} m²`
  if (p.areaRange) return p.areaRange
  return '—'
}

function formatOp(op) {
  const map = { 'Venta': 'Venta', 'Alquiler': 'Alquiler', 'Venta/Alquiler': 'Venta / Alquiler' }
  return map[op] ?? op ?? '—'
}

function statusBadge(status) {
  if (status === 'available' || !status) return `<span class="badge badge-available">Disponible</span>`
  if (status === 'sold')   return `<span class="badge badge-sold">Vendido</span>`
  if (status === 'rented') return `<span class="badge badge-rented">Alquilado</span>`
  return `<span class="badge badge-default">${status}</span>`
}

function opBadge(op) {
  if (op === 'Venta') return `<span class="badge badge-venta">Venta</span>`
  if (op === 'Alquiler') return `<span class="badge badge-alquiler">Alquiler</span>`
  return `<span class="badge badge-both">Venta / Alquiler</span>`
}

function catBadge(cat) {
  const map = {
    'Premium': 'badge-premium',
    'Residencial': 'badge-residencial',
    'Comercial': 'badge-comercial',
  }
  return `<span class="badge ${map[cat] ?? 'badge-default'}">${cat ?? '—'}</span>`
}

function shortDesc(desc) {
  if (!desc) return '—'
  return desc.length > 180 ? desc.slice(0, 177) + '…' : desc
}

function roomInfo(p) {
  const parts = []
  if (p.bedrooms) parts.push(`${p.bedrooms} hab.`)
  if (p.bathrooms) parts.push(`${p.bathrooms} baños`)
  if (p.parking) parts.push(`${p.parking} parq.`)
  return parts.length ? parts.join(' · ') : '—'
}

// Agrupar por categoría
const groups = {}
for (const p of properties) {
  const cat = p.category ?? 'Otros'
  if (!groups[cat]) groups[cat] = []
  groups[cat].push(p)
}

const now = new Date().toLocaleDateString('es-PA', {
  day: '2-digit', month: 'long', year: 'numeric'
})

let rows = ''
let rowNum = 0

for (const [cat, list] of Object.entries(groups)) {
  rows += `
  <tr class="section-header">
    <td colspan="9">${cat.toUpperCase()} — ${list.length} propiedades</td>
  </tr>`

  for (const p of list) {
    rowNum++
    const highlights = (p.highlights ?? []).slice(0, 4).map(h => `<li>${h}</li>`).join('')
    rows += `
    <tr class="${rowNum % 2 === 0 ? 'even' : 'odd'}">
      <td class="col-num">${rowNum}</td>
      <td class="col-title">
        <strong>${p.title ?? '—'}</strong>
        ${p.etapa ? `<br><span class="sub">Etapa ${p.etapa}</span>` : ''}
        ${p.casa ? `<span class="sub"> · Casa ${p.casa}</span>` : ''}
      </td>
      <td class="col-cat">${catBadge(p.category)}</td>
      <td class="col-status">${statusBadge(p.status)}</td>
      <td class="col-op">${opBadge(p.operation)}</td>
      <td class="col-loc">${p.location ?? p.city ?? '—'}</td>
      <td class="col-area">${formatArea(p)}</td>
      <td class="col-rooms">${roomInfo(p)}</td>
      <td class="col-price"><strong>${formatPrice(p)}</strong></td>
      <td class="col-desc">
        ${shortDesc(p.description)}
        ${highlights ? `<ul class="highlights">${highlights}</ul>` : ''}
      </td>
    </tr>`
  }
}

const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inventario de Propiedades — SOMOS Properties</title>
  <style>
    /* ── BASE ── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      font-size: 11px;
      color: #222;
      background: #fff;
    }

    /* ── HEADER ── */
    .report-header {
      padding: 24px 32px 16px;
      border-bottom: 3px solid #3898EC;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .report-header h1 {
      font-size: 22px;
      font-weight: 800;
      color: #1a1a2e;
      letter-spacing: -0.5px;
    }
    .report-header .subtitle {
      font-size: 12px;
      color: #666;
      margin-top: 4px;
    }
    .report-header .meta {
      text-align: right;
      font-size: 11px;
      color: #888;
      line-height: 1.6;
    }
    .report-header .meta strong { color: #222; }

    /* ── STATS ── */
    .stats {
      display: flex;
      gap: 24px;
      padding: 12px 32px;
      background: #f8f9fb;
      border-bottom: 1px solid #e0e0e0;
    }
    .stat { text-align: center; }
    .stat .val { font-size: 20px; font-weight: 800; color: #3898EC; }
    .stat .lbl { font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 0.5px; }

    /* ── PRINT BUTTON ── */
    .print-btn {
      display: block;
      margin: 12px 32px;
      padding: 10px 24px;
      background: #3898EC;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      width: fit-content;
    }
    .print-btn:hover { background: #0082f3; }

    /* ── TABLE ── */
    .table-wrap { padding: 0 16px 32px; overflow-x: auto; }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 10.5px;
    }

    thead th {
      background: #1a1a2e;
      color: #fff;
      padding: 8px 6px;
      text-align: left;
      font-weight: 700;
      letter-spacing: 0.3px;
      border-right: 1px solid #2a2a4e;
      white-space: nowrap;
    }
    thead th:first-child { border-radius: 4px 0 0 0; }
    thead th:last-child { border-radius: 0 4px 0 0; border-right: none; }

    tr.section-header td {
      background: #e8f2fd;
      color: #1a4a7a;
      font-weight: 800;
      font-size: 11px;
      padding: 8px 10px;
      border-top: 2px solid #3898EC;
      letter-spacing: 0.5px;
    }

    tr.odd td  { background: #fff; }
    tr.even td { background: #f9fbfe; }

    td {
      padding: 7px 6px;
      vertical-align: top;
      border-bottom: 1px solid #eee;
      border-right: 1px solid #f0f0f0;
      line-height: 1.4;
    }
    td:last-child { border-right: none; }

    tr:hover td { background: #fffbe6 !important; }

    /* ── COLUMN WIDTHS ── */
    .col-num   { width: 28px; text-align: center; color: #999; font-weight: 600; }
    .col-title { width: 180px; }
    .col-cat   { width: 80px; }
    .col-op    { width: 90px; }
    .col-loc   { width: 150px; }
    .col-area  { width: 70px; text-align: right; font-weight: 600; }
    .col-status { width: 75px; }
    .col-rooms { width: 90px; color: #555; }
    .col-price { width: 100px; text-align: right; color: #1a7a4a; font-size: 11px; }
    .col-desc  { min-width: 200px; color: #444; }

    /* ── BADGES ── */
    .badge {
      display: inline-block;
      padding: 2px 7px;
      border-radius: 99px;
      font-size: 9.5px;
      font-weight: 700;
      letter-spacing: 0.3px;
      white-space: nowrap;
    }
    .badge-premium     { background: #fef3c7; color: #92400e; }
    .badge-residencial { background: #d1fae5; color: #065f46; }
    .badge-comercial   { background: #dbeafe; color: #1e40af; }
    .badge-default     { background: #f3f4f6; color: #374151; }
    .badge-venta       { background: #fce7f3; color: #9d174d; }
    .badge-alquiler    { background: #ede9fe; color: #5b21b6; }
    .badge-both        { background: #fff7ed; color: #9a3412; }
    .badge-available   { background: #d1fae5; color: #065f46; }
    .badge-sold        { background: #fee2e2; color: #991b1b; }
    .badge-rented      { background: #e0e7ff; color: #3730a3; }

    /* ── HIGHLIGHTS ── */
    .highlights {
      margin-top: 5px;
      padding-left: 14px;
      color: #555;
      font-size: 9.5px;
    }
    .highlights li { margin-bottom: 2px; }

    .sub { font-size: 9.5px; color: #888; }

    /* ── FOOTER ── */
    .report-footer {
      padding: 12px 32px;
      border-top: 1px solid #e0e0e0;
      font-size: 10px;
      color: #aaa;
      text-align: center;
    }

    /* ── PRINT STYLES ── */
    @media print {
      @page { margin: 10mm 8mm; size: A4 landscape; }
      .print-btn { display: none !important; }
      body { font-size: 9px; }
      .report-header { padding: 12px 16px 10px; }
      .stats { padding: 8px 16px; }
      .table-wrap { padding: 0 8px 16px; }
      table { font-size: 8.5px; }
      thead th { padding: 5px 4px; }
      td { padding: 4px 4px; }
      tr.section-header td { padding: 5px 8px; }
      .col-title { width: 140px; }
      .col-desc { min-width: 160px; }
      tr:hover td { background: inherit !important; }

      /* Evitar corte dentro de una fila */
      tr { page-break-inside: avoid; }
      tr.section-header { page-break-before: auto; }
    }
  </style>
</head>
<body>

  <div class="report-header">
    <div>
      <h1>SOMOS Properties</h1>
      <div class="subtitle">Inventario Completo de Propiedades</div>
    </div>
    <div class="meta">
      <div>Generado el <strong>${now}</strong></div>
      <div>Total: <strong>${properties.length} propiedades</strong></div>
    </div>
  </div>

  <div class="stats">
    ${Object.entries(groups).map(([cat, list]) => `
    <div class="stat">
      <div class="val">${list.length}</div>
      <div class="lbl">${cat}</div>
    </div>`).join('')}
    <div class="stat">
      <div class="val">${properties.filter(p => p.operation === 'Venta' || p.operation === 'Venta/Alquiler').length}</div>
      <div class="lbl">En Venta</div>
    </div>
    <div class="stat">
      <div class="val">${properties.filter(p => p.operation === 'Alquiler' || p.operation === 'Venta/Alquiler').length}</div>
      <div class="lbl">En Alquiler</div>
    </div>
    <div class="stat">
      <div class="val">${properties.filter(p => !p.status || p.status === 'available').length}</div>
      <div class="lbl">Disponibles</div>
    </div>
    <div class="stat">
      <div class="val">${properties.filter(p => p.status === 'sold').length}</div>
      <div class="lbl">Vendidos</div>
    </div>
    <div class="stat">
      <div class="val">${properties.filter(p => p.status === 'rented').length}</div>
      <div class="lbl">Alquilados</div>
    </div>
  </div>

  <button class="print-btn" onclick="window.print()">🖨️ Imprimir / Guardar como PDF</button>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th class="col-num">#</th>
          <th class="col-title">Propiedad</th>
          <th class="col-cat">Categoría</th>
          <th class="col-status">Estado</th>
          <th class="col-op">Operación</th>
          <th class="col-loc">Ubicación</th>
          <th class="col-area">Área</th>
          <th class="col-rooms">Habitaciones</th>
          <th class="col-price">Precio</th>
          <th class="col-desc">Descripción / Detalles</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  </div>

  <div class="report-footer">
    SOMOS Properties · Panamá · www.somosproperties.com · Reporte generado el ${now}
  </div>

</body>
</html>`

writeFileSync(outputPath, html, 'utf-8')
console.log(`✅ Reporte generado: property-report.html`)
console.log(`📊 ${properties.length} propiedades incluidas`)
console.log(`   Abrí el archivo en Chrome y presioná Ctrl+P → Guardar como PDF`)
