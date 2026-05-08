# Exploration — fix-critical-inconsistencies

**Change**: fix-critical-inconsistencies  
**Date**: 2026-05-08  
**Project**: somosproperties-react

## Objetivo de la exploración

Relevar todas las inconsistencias activas en el proyecto para tener una base sólida antes de proponer cambios. La exploración ya se realizó como análisis previo en la sesión.

## Archivos analizados

| Archivo | Rol |
|---------|-----|
| `app/[locale]/layout.tsx` | Layout raíz — renderiza PromotionalModal globalmente |
| `app/[locale]/page.tsx` | Home — usa generateMetadata + getTranslations correctamente |
| `app/[locale]/propiedades/page.tsx` | ✅ Usa generateMetadata con i18n |
| `app/[locale]/residenciales/page.tsx` | ❌ Metadata estática, hardcodeada en español |
| `app/[locale]/comerciales/page.tsx` | ❌ Metadata estática, hardcodeada en español |
| `app/[locale]/nosotros/page.tsx` | ✅ Usa generateMetadata, pero tiene Links sin locale prefix |
| `app/[locale]/premium/page.tsx` | ✅ Usa generateMetadata con i18n |
| `components/promotional-modal.tsx` | Modal con número WhatsApp falso, `<style jsx>` |
| `components/navbar.tsx` | WhatsApp flotante duplica `whatsapp-button.tsx` |
| `components/property-filters.tsx` | Importa datos directamente del dataset |
| `lib/utils-premium.ts` | isPremium() ignora pricePerMonth |
| `next.config.mjs` | ignoreBuildErrors: true, images.unoptimized: true |

## Inconsistencias encontradas

### 🔴 CRÍTICO (bugs activos en producción)

#### I-01: Modal de Navidad vencido pero ejecutando código
- **Archivo**: `app/[locale]/layout.tsx` líneas 55-66
- **Evidencia**: `endsAt={new Date('2025-01-06')}` — expiró hace ~4 meses
- **Impacto**: Carga imágenes, registra listeners de resize, ejecuta setTimeout en cada pageview
- **Root cause**: La promo terminó pero nadie limpió el layout

#### I-02: Número de WhatsApp hardcodeado incorrecto en el modal
- **Archivo**: `components/promotional-modal.tsx` línea 68
- **Evidencia**: `https://wa.me/50760000000` — número inventado
- **Impacto**: Si el CTA de WhatsApp del modal se activa, el usuario llega a un número que no existe
- **Root cause**: Número de placeholder que nunca fue reemplazado por `CONTACT.whatsapp.raw`

#### I-03: Links sin locale prefix en nosotros/page.tsx
- **Archivo**: `app/[locale]/nosotros/page.tsx` líneas 98, 104, 187, 193
- **Evidencia**: `href="/contacto"`, `href="/propiedades"` — rutas absolutas sin `/${locale}/`
- **Impacto**: Con `localePrefix: 'always'` en middleware → 404 en producción
- **Root cause**: Página escrita antes de implementar el i18n con localePrefix always

### 🟠 SEVERO

#### I-04: `typescript.ignoreBuildErrors: true` en next.config.mjs
- **Archivo**: `next.config.mjs` línea 8
- **Evidencia**: Comentario dice "Bypass remaining linting during dev" — es una config de producción
- **Impacto**: Errores de tipos reales nunca rompen el build, se descubren en runtime

#### I-05: `images.unoptimized: true` en producción
- **Archivo**: `next.config.mjs` línea 11
- **Evidencia**: Comentario dice "for dev speed" pero aplica a todos los entornos
- **Impacto**: Core Web Vitals degradados — LCP alto en todas las páginas con imágenes

#### I-06: Metadata de residenciales y comerciales sin i18n
- **Archivos**: `app/[locale]/residenciales/page.tsx`, `app/[locale]/comerciales/page.tsx`
- **Evidencia**: `export const metadata: Metadata = { title: "Propiedades Residenciales..." }` — hardcodeado en español, canonical URL sin `/[locale]/`
- **Impacto**: Usuarios en inglés ven metadata en español; Google recibe canonical URLs incorrectas

#### I-07: isPremium() ignora pricePerMonth
- **Archivo**: `lib/utils-premium.ts` línea 8
- **Evidencia**: `return property.price >= 250000` — solo chequea precio de venta
- **Impacto**: Propiedades en alquiler de alto valor ($5000+/mes) nunca se marcan como premium

### 🟡 MODERADO

#### I-08: `<style jsx>` en promotional-modal.tsx
- **Archivo**: `components/promotional-modal.tsx` líneas 195-208
- **Evidencia**: `<style jsx>{...}</style>` — styled-jsx no está en package.json
- **Impacto**: Puede fallar silenciosamente; las clases CSS definidas ahí no tienen efecto garantizado

#### I-09: Botón WhatsApp flotante duplicado
- **Archivos**: `components/navbar.tsx` (líneas 292-306), `components/whatsapp-button.tsx`
- **Evidencia**: Dos implementaciones distintas del mismo botón flotante
- **Impacto**: Doble mantenimiento; si cambia el número o el estilo, hay que actualizar dos lugares

## Conclusión de la exploración

Las inconsistencias más urgentes son I-01, I-02, I-03 (producción rota ahora mismo).  
Las más impactantes a largo plazo son I-04, I-05, I-06 (performance y SEO).  
Las moderadas (I-07, I-08, I-09) son deuda técnica sin impacto inmediato en usuario.
