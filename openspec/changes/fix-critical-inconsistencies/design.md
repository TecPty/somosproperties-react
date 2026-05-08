# Design — fix-critical-inconsistencies

**Change**: fix-critical-inconsistencies  
**Date**: 2026-05-08  
**Status**: APPROVED

---

## Visión general

9 cambios quirúrgicos, sin refactorizaciones masivas. Cada fix es independiente. El orden de implementación va de más crítico a menos para que el sitio esté sano lo antes posible.

---

## Decisiones de arquitectura

### ADR-01: WhatsAppButton inline del Navbar → eliminado, no reemplazado por import

**Contexto**: El Navbar renderiza su propio botón flotante de WhatsApp inline (líneas 292-306). Existe `WhatsAppButton` como componente separado.

**Análisis**:
- El `WhatsAppButton` standalone es **significativamente superior**: tiene scroll-awareness (aparece solo después de 300px), trackea 4 pixels de analytics (FB, TikTok, Google Ads, LinkedIn), usa `CONTACT.whatsapp.raw` correctamente, tiene animación `animate-ping`.
- El inline del Navbar: siempre visible, sin tracking, sin scroll-awareness.
- `WhatsAppButton` ya está siendo montado en algún lugar (existe, no es dead code).

**Decisión**: Eliminar el bloque inline del Navbar (líneas 292-306). No importarlo ahí — el botón debe vivir en el layout o como componente propio de página. Verificar dónde está siendo usado actualmente.

**Consecuencia**: El botón flotante sigue existiendo, renderizado desde su propio lugar, con tracking completo.

---

### ADR-02: Animaciones del modal → globals.css, no styled-jsx

**Contexto**: `promotional-modal.tsx` usa `<style jsx>` para definir 3 @keyframes: `fade-in`, `scale-in`, `bounce-subtle`.

**Análisis**:
- `globals.css` ya tiene el patrón correcto — `@keyframes` dentro de `@layer utilities`
- Las clases `animate-fade-in`, `animate-scale-in`, `animate-bounce-subtle` se usan en el JSX del modal
- `tw-animate-css` ya está importado en globals.css — puede proveer alternativas

**Decisión**: Mover los 3 `@keyframes` + sus clases `.animate-*` a `app/globals.css` dentro de `@layer utilities`. Eliminar el bloque `<style jsx>` completo.

---

### ADR-03: `images.unoptimized` → condicional por NODE_ENV

**Contexto**: El valor literal `true` deshabilita el optimizer en todos los entornos.

**Decisión**:
```js
images: {
  unoptimized: process.env.NODE_ENV === 'development',
}
```

Preserva la velocidad en dev local, activa el optimizer en producción. No requiere ningún cambio en cómo se usan las imágenes en los componentes.

---

### ADR-04: Metadata de residenciales/comerciales → generateMetadata async

**Contexto**: Ambas páginas usan `export const metadata` (estático). Propiedades/Premium usan `generateMetadata` (dinámico). Hay que unificar el patrón.

**Decisión**: Convertir a `generateMetadata` async con `getTranslations`. Agregar las keys faltantes en `messages/es.json` y `messages/en.json` bajo `metadata.residenciales` y `metadata.comerciales`.

**Canonical URL**: Usar `https://somosproperties.com/${locale}/residenciales` (con locale dinámico).

**Nota**: `residenciales/page.tsx` tiene función componente síncrona `ResidencialesPage()`. Al necesitar `params` para el locale, la función DEBE volverse async.

---

### ADR-05: isPremium() → umbral dual

**Contexto**: Solo chequea `price >= 250_000`.

**Decisión**:
```ts
export function isPremium(property: Property): boolean {
  const premiumBySale = Number.isFinite(property.price) && property.price >= 250_000
  const premiumByRent = Number.isFinite(property.pricePerMonth ?? NaN) && (property.pricePerMonth ?? 0) >= 2_500
  return premiumBySale || premiumByRent
}
```

Umbral de $2.500/mes basado en el segmento luxury del mercado panameño. Mantiene compatibilidad total con todos los callers existentes.

---

## Mapa de cambios por archivo

| Archivo | Tipo de cambio | Descripción |
|---------|---------------|-------------|
| `next.config.mjs` | Edición | Quitar `ignoreBuildErrors`, condicionar `unoptimized` |
| `app/[locale]/layout.tsx` | Edición | Eliminar `<PromotionalModal id="navidad-2024">` y su import |
| `components/promotional-modal.tsx` | Edición | Reemplazar número hardcodeado por `CONTACT.whatsapp.raw`, eliminar `<style jsx>` |
| `app/globals.css` | Adición | Agregar `@keyframes` del modal (fade-in, scale-in, bounce-subtle) |
| `app/[locale]/nosotros/page.tsx` | Edición | Hacer la función async, recibir `params`, usar `${locale}/` en los 4 Links |
| `app/[locale]/residenciales/page.tsx` | Refactor | Convertir a `generateMetadata` async con i18n, canonical con locale |
| `app/[locale]/comerciales/page.tsx` | Refactor | Idem residenciales |
| `messages/es.json` | Adición | Keys `metadata.residenciales` y `metadata.comerciales` |
| `messages/en.json` | Adición | Keys `metadata.residenciales` y `metadata.comerciales` en inglés |
| `lib/utils-premium.ts` | Edición | Extender `isPremium()` con criterio de alquiler |
| `components/navbar.tsx` | Edición | Eliminar bloque flotante de WhatsApp inline (líneas 292-306) |

---

## Verificar antes de implementar

- [ ] Confirmar dónde está montado actualmente `WhatsAppButton` (para no duplicarlo al eliminar el inline)
- [ ] Revisar si hay errores de TS ocultos antes de quitar `ignoreBuildErrors` — si hay muchos, documentarlos como issue separado

---

## Orden de implementación

```
Batch 1 — Fixes críticos (producción rota):
  1.1  nosotros/page.tsx → Links con locale prefix
  1.2  layout.tsx → Eliminar modal Navidad
  1.3  promotional-modal.tsx → WhatsApp correcto + sin <style jsx>
  1.4  globals.css → @keyframes del modal

Batch 2 — Config y performance:
  2.1  next.config.mjs → quitar ignoreBuildErrors + condicionar unoptimized

Batch 3 — SEO e i18n:
  3.1  messages/es.json + messages/en.json → agregar keys de metadata
  3.2  residenciales/page.tsx → generateMetadata async
  3.3  comerciales/page.tsx → generateMetadata async

Batch 4 — Lógica y componentes:
  4.1  utils-premium.ts → isPremium() con alquiler
  4.2  navbar.tsx → eliminar WhatsApp inline
```
