# Tasks — fix-critical-inconsistencies

**Change**: fix-critical-inconsistencies  
**Date**: 2026-05-08  
**Status**: PENDING  
**Specs ref**: specs/routing, specs/components, specs/config  
**Design ref**: design.md

---

## Batch 1 — Críticos (producción rota ahora mismo)

### 1.1 — Reparar Links sin locale en nosotros/page.tsx

- [x] 1.1.1 Hacer async la función `NosotrosPage` y agregar `{ params }: { params: Promise<{ locale: string }> }` como prop
- [x] 1.1.2 Destructurar `const { locale } = await params` al inicio de la función
- [x] 1.1.3 Reemplazar `href="/contacto"` × 2 por `href={`/${locale}/contacto`}`
- [x] 1.1.4 Reemplazar `href="/propiedades"` × 2 por `href={`/${locale}/propiedades`}`
- [x] 1.1.5 Verificar que los 4 Links afectados usen el locale dinámico (ninguno hardcodeado)

**Spec cubierto**: REQ-R01 (R01-1, R01-2, R01-3)

---

### 1.2 — Eliminar modal de Navidad del layout

- [x] 1.2.1 Remover el bloque `<PromotionalModal id="navidad-2024" ... />` del JSX en `layout.tsx`
- [x] 1.2.2 Remover el `import { PromotionalModal }` si no queda ningún otro uso en el archivo
- [x] 1.2.3 Verificar que el layout no importa `/images/promo-navidad-*.png` ni referencias similares

**Spec cubierto**: REQ-C01 (C01-1, C01-2)

---

### 1.3 — Corregir WhatsApp en promotional-modal + eliminar style jsx

- [x] 1.3.1 Agregar `import { CONTACT } from "@/lib/config"` en `promotional-modal.tsx`
- [x] 1.3.2 Reemplazar `https://wa.me/50760000000` por `` `https://wa.me/${CONTACT.whatsapp.raw}` ``
- [x] 1.3.3 Eliminar el bloque `<style jsx>{`...`}</style>` completo (líneas 195-208)
- [x] 1.3.4 Reemplazar las clases `animate-fade-in`, `animate-scale-in`, `animate-bounce-subtle` que usaba el `<style jsx>` por las definidas en globals.css (tarea 1.4 las crea)

**Spec cubierto**: REQ-C02 (C02-1, C02-2), REQ-C03 (C03-1, C03-2)

---

### 1.4 — Mover animaciones del modal a globals.css

- [x] 1.4.1 Agregar `@keyframes modal-fade-in` en `globals.css` dentro de `@layer utilities`
- [x] 1.4.2 Agregar clase `.animate-modal-fade-in` que usa ese keyframe
- [x] 1.4.3 Agregar `@keyframes modal-scale-in` en `globals.css`
- [x] 1.4.4 Agregar clase `.animate-modal-scale-in`
- [x] 1.4.5 Agregar `@keyframes modal-bounce-subtle` en `globals.css`
- [x] 1.4.6 Agregar clase `.animate-modal-bounce-subtle`
- [x] 1.4.7 Actualizar referencias en `promotional-modal.tsx` para usar los nuevos nombres de clase

> **Nota**: Usamos prefijo `modal-` para no colisionar con las clases existentes de Tailwind (`animate-bounce`, `animate-fade`, etc.)

**Spec cubierto**: REQ-C03 (C03-1, C03-2)

---

## Batch 2 — Config y performance

### 2.1 — Sanear next.config.mjs

- [x] 2.1.1 Eliminar la propiedad `typescript.ignoreBuildErrors: true` (y el objeto `typescript` si queda vacío)
- [x] 2.1.2 Reemplazar `unoptimized: true` por `unoptimized: process.env.NODE_ENV === 'development'`
- [x] 2.1.3 Actualizar el comentario para reflejar el comportamiento real
- [x] 2.1.4 ⚠️ Ejecutar `npm run build` localmente para detectar errores de TS latentes — documentar si aparecen

**Spec cubierto**: REQ-CF01 (CF01-1), REQ-CF02 (CF02-1, CF02-2)

---

## Batch 3 — SEO e i18n metadata

### 3.1 — Agregar keys de metadata en messages/

- [ ] 3.1.1 Agregar en `messages/es.json` bajo `"metadata"`:
  ```json
  "residenciales": {
    "title": "Propiedades Residenciales en Panamá | SOMOS Properties",
    "description": "Apartamentos y casas en venta y alquiler en Panamá. Encuentra tu propiedad residencial ideal."
  },
  "comerciales": {
    "title": "Propiedades Comerciales en Panamá | SOMOS Properties",
    "description": "Locales comerciales y oficinas en venta y alquiler en Panamá. Invierte en propiedades comerciales premium."
  }
  ```
- [x] 3.1.2 Agregar en `messages/en.json` bajo `"metadata"` las mismas keys en inglés:
  ```json
  "residenciales": {
    "title": "Residential Properties in Panama | SOMOS Properties",
    "description": "Apartments and houses for sale and rent in Panama. Find your ideal residential property."
  },
  "comerciales": {
    "title": "Commercial Properties in Panama | SOMOS Properties",
    "description": "Commercial spaces and offices for sale and rent in Panama. Invest in premium commercial properties."
  }
  ```

**Spec cubierto**: REQ-R02 (R02-4)

---

### 3.2 — Convertir residenciales/page.tsx a generateMetadata

- [x] 3.2.1 Eliminar `export const metadata: Metadata = { ... }` (bloque estático completo)
- [x] 3.2.2 Agregar `export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata>`
- [x] 3.2.3 Obtener locale con `const { locale } = await params`
- [x] 3.2.4 Obtener traducciones con `const t = await getTranslations({ locale, namespace: 'metadata.residenciales' })`
- [x] 3.2.5 Retornar `title: t('title')`, `description: t('description')`
- [x] 3.2.6 Canonical: `` `https://somosproperties.com/${locale}/residenciales` ``
- [x] 3.2.7 OpenGraph url: `` `https://somosproperties.com/${locale}/residenciales` ``
- [x] 3.2.8 Hacer async la función componente `ResidencialesPage` y agregar `{ params }` si necesita locale (verificar si `ResidencialesContent` necesita locale)

**Spec cubierto**: REQ-R02 (R02-1, R02-2, R02-3)

---

### 3.3 — Convertir comerciales/page.tsx a generateMetadata

- [x] 3.3.1 Mismo patrón que 3.2.1–3.2.7 aplicado a `comerciales/page.tsx`
- [x] 3.3.2 Namespace: `'metadata.comerciales'`
- [x] 3.3.3 Canonical: `` `https://somosproperties.com/${locale}/comerciales` ``

**Spec cubierto**: REQ-R02 (R02-3)

---

## Batch 4 — Lógica y componentes

### 4.1 — Extender isPremium() para alquileres

- [x] 4.1.1 Reemplazar el cuerpo de `isPremium()` en `lib/utils-premium.ts`:
  ```ts
  const premiumBySale = Number.isFinite(property.price) && property.price >= 250_000
  const premiumByRent = Number.isFinite(property.pricePerMonth ?? NaN) && (property.pricePerMonth ?? 0) >= 2_500
  return premiumBySale || premiumByRent
  ```
- [x] 4.1.2 Actualizar el JSDoc de la función para documentar ambos criterios y los umbrales
- [x] 4.1.3 Verificar que `getPremiumProperties()` y `getStandardProperties()` siguen correctas (usan `isPremium()` — no cambia su firma)

**Spec cubierto**: REQ-C05 (C05-1, C05-2, C05-3, C05-4)

---

### 4.2 — Eliminar WhatsApp flotante inline del Navbar

- [x] 4.2.1 Buscar dónde está montado actualmente `<WhatsAppButton />` (probablemente en `root-layout-client.tsx` o en páginas individuales)
- [x] 4.2.2 Eliminar el bloque completo del `<div>` flotante de WhatsApp del Navbar (líneas 292-306 de `navbar.tsx`)
- [x] 4.2.3 Eliminar imports no usados en navbar.tsx si los hay tras la eliminación (`MessageCircle`, `Phone`, etc.)
- [x] 4.2.4 Verificar visualmente que el botón de WhatsApp sigue apareciendo después de 300px de scroll en cualquier página

**Spec cubierto**: REQ-C04 (C04-1, C04-2)

---

## Resumen de tareas

| Batch | Tareas | Archivos |
|-------|--------|---------|
| 1 — Críticos | 19 sub-tareas | layout.tsx, nosotros/page.tsx, promotional-modal.tsx, globals.css |
| 2 — Config | 4 sub-tareas | next.config.mjs |
| 3 — SEO/i18n | 16 sub-tareas | messages/es.json, messages/en.json, residenciales/page.tsx, comerciales/page.tsx |
| 4 — Lógica | 7 sub-tareas | utils-premium.ts, navbar.tsx |
| **Total** | **46 sub-tareas** | **11 archivos** |
