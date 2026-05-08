# Proposal — fix-critical-inconsistencies

**Change**: fix-critical-inconsistencies  
**Date**: 2026-05-08  
**Status**: PROPOSED  
**Author**: Antigravity (SDD)

---

## Intent

Corregir 9 inconsistencias detectadas en el análisis del proyecto somosproperties-react, agrupadas en tres categorías de severidad. Las inconsistencias van desde bugs activos que generan 404s en producción hasta deuda técnica que degrada el performance y el SEO.

## Motivation

El sitio está en producción con al menos 3 bugs críticos activos:
1. Links rotos que generan 404 en la página "Nosotros"
2. Un número de WhatsApp falso en el modal promocional
3. Código de una promoción vencida (Navidad 2024) ejecutándose en cada pageview

Además, dos decisiones de configuración marcadas como "temporales para dev" quedaron activas en producción (`ignoreBuildErrors`, `images.unoptimized`), afectando la calidad del build y el performance visual del sitio.

---

## Scope

### ✅ IN SCOPE — Lo que vamos a corregir

| ID | Descripción | Archivos afectados |
|----|-------------|-------------------|
| I-01 | Eliminar PromotionalModal de Navidad del layout | `app/[locale]/layout.tsx` |
| I-02 | Reemplazar número WhatsApp hardcodeado por `CONTACT.whatsapp.raw` | `components/promotional-modal.tsx` |
| I-03 | Agregar locale prefix a los 4 Links rotos en nosotros | `app/[locale]/nosotros/page.tsx` |
| I-04 | Remover `typescript.ignoreBuildErrors: true` | `next.config.mjs` |
| I-05 | Remover `images.unoptimized: true` (o condicionar a NODE_ENV) | `next.config.mjs` |
| I-06 | Convertir metadata de residenciales y comerciales a `generateMetadata` con i18n + canonical correcto | `app/[locale]/residenciales/page.tsx`, `app/[locale]/comerciales/page.tsx` |
| I-07 | Extender `isPremium()` para considerar alquileres de alto valor | `lib/utils-premium.ts` |
| I-08 | Eliminar `<style jsx>` del modal — mover animaciones a globals.css o Tailwind | `components/promotional-modal.tsx` |
| I-09 | Eliminar el botón WhatsApp inline del Navbar y usar `WhatsAppButton` component | `components/navbar.tsx`, `components/whatsapp-button.tsx` |

### ❌ OUT OF SCOPE — Lo que NO tocamos en este cambio

- **Agregar test runner** (vitest/jest): es una decisión de arquitectura mayor con su propio cambio
- **Refactorizar `property-filters.tsx`** para desacoplar datos: requiere rediseño de props en múltiples páginas
- **Agregar Prettier / resolver CRLF vs LF**: requiere formatear todo el codebase, enorme diff, propio cambio
- **Rediseño del modal promocional**: solo corregimos el número y eliminamos el `<style jsx>`, no rediseñamos
- **Implementar `tier` field para premium**: cambiaría la lógica de datos, no solo la función

---

## Approach

### Estrategia general
Cambios quirúrgicos, archivo por archivo. No hay refactorizaciones masivas. Cada fix es independiente y puede revisarse en aislamiento.

### Decisiones técnicas clave

**I-03 (Links sin locale):**  
`nosotros/page.tsx` es un Server Component async, por lo que tiene acceso a `params`. Usaremos `params` para construir los hrefs dinámicamente, igual que hacen `home/page.tsx` y `propiedades/page.tsx`.

**I-05 (images.unoptimized):**  
Lo condicionamos a `process.env.NODE_ENV === 'development'` en lugar de eliminarlo del todo. Así preservamos la velocidad en dev sin sacrificar el LCP en producción.

**I-06 (metadata residenciales/comerciales):**  
Convertimos `export const metadata` (estático) a `export async function generateMetadata({ params })` (dinámico con i18n). Agregaremos las keys faltantes en `messages/es.json` y `messages/en.json` bajo `metadata.residenciales` y `metadata.comerciales`.

**I-07 (isPremium con alquiler):**  
Un alquiler es "premium" si `pricePerMonth >= 2500`. Umbral basado en el mercado panameño donde $2500/mes representa el segmento luxury. El tipo `tier` en la interfaz `Property` existe pero no se usa — seguimos sin usarlo para no cambiar el schema de datos.

**I-09 (WhatsApp duplicado):**  
El Navbar renderiza el botón flotante inline porque `WhatsAppButton` puede no existir o tener una API diferente. Primero leemos `whatsapp-button.tsx` en la fase de design para decidir si es composable o si simplemente movemos el inline a un componente shared.

---

## Rollback Plan

Todos los cambios son de lógica de presentación o configuración. No hay:
- Migraciones de base de datos
- Cambios de schema en properties.json
- Modificaciones a la API de Resend

**Rollback**: `git revert` del commit generado por este cambio. No hay efectos secundarios persistentes. Tiempo estimado: < 2 minutos.

---

## Risks

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|-------------|---------|-----------|
| I-05: quitar `unoptimized` puede romper imágenes con dominios no permitidos en next.config | Baja | Media | Verificar `images.domains` antes de quitar el flag; si hay dominios sin whitelist, agregarlos |
| I-06: las keys de i18n nuevas en `messages/*.json` pueden estar desincronizadas entre es/en | Media | Baja | Agregar ambos idiomas en el mismo commit; verificar manualmente en dev |
| I-04: quitar `ignoreBuildErrors` puede revelar errores de TS latentes que bloqueen el build | Media | Alta | Resolver todos los errores antes de subir a producción; si hay demasiados, documentarlos y hacer un segundo cambio |

---

## Success Criteria

1. Ningún link en `nosotros/page.tsx` genera 404 al navegar en `/es/nosotros` o `/en/nosotros`
2. El layout no renderiza ningún modal de Navidad
3. El número de WhatsApp en el modal usa `CONTACT.whatsapp.raw`
4. `next build` completa sin `ignoreBuildErrors: true` (sin errores de TS)
5. Las imágenes en producción pasan por el Image Optimizer de Next.js
6. Las páginas `/es/residenciales` y `/en/residenciales` tienen metadata y canonical correctos en cada idioma
7. `isPremium` retorna `true` para propiedades en alquiler con `pricePerMonth >= 2500`
8. No existe `<style jsx>` en ningún componente
9. El botón flotante de WhatsApp se renderiza desde un único lugar
