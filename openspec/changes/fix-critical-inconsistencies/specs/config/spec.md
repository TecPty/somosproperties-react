# Spec — fix-critical-inconsistencies / config

**Domain**: config  
**Change**: fix-critical-inconsistencies  
**Date**: 2026-05-08

RFC 2119: MUST, SHALL, SHOULD, MAY

---

## REQ-CF01: El build MUST completar con verificación de tipos activa

El archivo `next.config.mjs` MUST NOT contener `typescript.ignoreBuildErrors: true`. El build de producción SHALL fallar si existen errores de TypeScript.

### Scenario CF01-1: Configuración sin ignorar errores de TS

```
Given  el archivo next.config.mjs
When  se busca la propiedad typescript.ignoreBuildErrors
Then  NO existe esa propiedad, O su valor es false
```

### Scenario CF01-2: El build no reporta errores de TS ocultos

```
Given  que se ejecuta npm run build en el proyecto
When  el build completa exitosamente
Then  no hubo errores de TypeScript suprimidos
And   el output del build no contiene warnings de "ignoreBuildErrors"
```

---

## REQ-CF02: Las imágenes en producción DEBEN ser optimizadas

El optimizer de Next.js Image MUST estar activo en el entorno de producción. La propiedad `images.unoptimized` MUST ser `false` en producción (o estar ausente). MAY ser `true` en desarrollo para mayor velocidad local.

### Scenario CF02-1: Configuración condicional por entorno

```
Given  el archivo next.config.mjs
When  se inspecciona la propiedad images.unoptimized
Then  su valor es `process.env.NODE_ENV === 'development'`
   OR no existe la propiedad (lo que equivale a false)
And   NO es el valor literal `true`
```

### Scenario CF02-2: En producción las imágenes usan el optimizer

```
Given  que NODE_ENV=production
When  Next.js procesa una etiqueta <Image> o <OptimizedImage>
Then  la imagen resultante es servida por /_next/image con parámetros de optimización
And   NO incluye el parámetro que indica que está sin optimizar
```
