# Solución de Problemas

## Error 400 en optimización de imágenes (`&q=75.1`)

### Síntomas:
```
Failed to load resource: the server responded with a status of 400 (Bad Request)
:3000/_next/image?url=..jpg&w=1200&q=75.1
```

### Causa:
El parámetro `q=75.1` es inválido (debe ser `q=75` sin el `.1`). Esto puede ser causado por:
- Cache corrupta del navegador
- Bug temporal del dev server de Next.js
- Extensiones del navegador modificando las URLs

### Soluciones:

#### 1. Limpiar cache del navegador:
- **Chrome/Edge**: `Ctrl + Shift + Del` → Seleccionar "Cached images and files" → Clear data
- **Firefox**: `Ctrl + Shift + Del` → Seleccionar "Cache" → Clear

#### 2. Reiniciar dev server:
```cmd
pnpm dev
```
O detener con `Ctrl + C` y volver a ejecutar `pnpm dev`

#### 3. Limpiar cache de Next.js:
```cmd
rd /s /q .next
pnpm dev
```

#### 4. Hard refresh del navegador:
- `Ctrl + Shift + R` (Windows/Linux)
- `Cmd + Shift + R` (Mac)

#### 5. Modo incógnito:
Abre `http://localhost:3000` en una ventana de incógnito para verificar si el problema persiste.

#### 6. Deshabilitar extensiones:
Temporalmente deshabilita extensiones del navegador que puedan modificar requests (ad blockers, etc.)

---

## Advertencia: Image missing "sizes" prop

### Síntomas:
```
Image with src "/images/properties/pacific-point/hero-1.webp" has "fill" but is missing "sizes" prop.
```

### Solución:
✅ **Ya resuelto** - Se agregó la prop `sizes` a todos los componentes Image:

```tsx
<Image
  src={property.image}
  alt={property.title}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
/>
```

### Valores recomendados de `sizes`:
- **Tarjetas de grid**: `"(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"`
- **Imágenes hero full-width**: `"100vw"`
- **Detalles de propiedad**: `"(max-width: 768px) 100vw, 1200px"`
- **Thumbnails**: `"120px"`
- **Badges pequeños**: `"80px"`
