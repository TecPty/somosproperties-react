# 🎯 Phase 5 - Hoy: Plan de Validación (March 12, 2026)

## Estado Actual
- ✅ Build completado: 10.1s (todas las 20 rutas compiladas)
- ✅ Bundle analyzer funcionando: http://localhost:4000
- ✅ Código de performance deployado
- 🔄 Validaciones en progreso

---

## 👇 PASOS PARA HOY

### PASO 1: Revisar Bundle Analyzer (5-10 min)
**URL:** http://localhost:4000

**Qué buscar:**
1. Tamaños de los chunks iniciales
2. Componentes lazy-loaded (ContactForm, PropertyGrid, etc.)
3. Compara inicial chunk vs route chunks
4. Identifica si hay duplicados

**Esperado:**
```
✅ Initial: ~80KB (sin lazy-loaded components)
✅ Dynamic: ~20-40KB cada uno
✅ Total reduction: 30-40% vs no optimization
```

**Qué anotar:**
- Tamaño total estimado
- Chunk más grande
- Qué componentes se cargan dinámicamente

---

### PASO 2: Validar Dynamic Imports en DevTools (10-15 min)

**Instrucciones:**

1. **Abre DevTools (F12)**
2. **Network tab > JS filter**
3. **Navega a `/propiedades` (tiene PropertyGrid dinámico)**
4. **Observa:**
   - Qué chunks se cargan al principio
   - Cuándo aparece el chunk de PropertyGrid
   - Tamaño de cada archivo

**Esperado:**
```
Initial load:
├── app-HASH.js (~50KB)
├── layout-HASH.js (~30KB)
└── [shared].js (~20KB)

On component mount:
└── property-grid-HASH.js (~40KB) ← Carga bajo demanda
```

**Performance Check:**
```
Si ves que PropertyGrid se carga DESPUÉS de la página 
→ ✅ Dynamic imports funcionando bien

Si se carga AL MISMO TIEMPO que todo
→ ⚠️ Revisar configuración en lib/dynamic-imports.ts
```

---

### PASO 3: Probar Prefetching Strategy (10-15 min)

**Setup en DevTools:**

1. **Network tab**
2. **Set throttling: "Slow 4G"** (simula conexión lenta)
3. **Filter: All (para ver prefetch requests)**

**Test:**
1. Navega a `/propiedades` (página principal)
2. **No hagas click aún**, solo observa
3. Mira si aparecen prefetch requests
4. Hover sobre link a `/residenciales` (pero no clickees)
5. Observa si hay prefetch request

**Esperado en Slow 4G:**
```
✅ Algunos prefetch requests
❌ NO excesivos prefetch (datos limitados)
✅ Cuando clickeas, la página carga rápido
```

**Cambiar a Fast 4G:**
1. DevTools > Network > "Fast 3G"
2. Repetir test
3. Deberías ver MÁS prefetch requests

**Esperado en Fast 3G:**
```
✅ Más prefetch requests visibles
✅ Carga aún más rápida de rutas
```

---

### PASO 4: Revisar Web Vitals en GA4 (5 min)

**Nota:** Los datos pueden tardar 24-48h en agregarse

**Cómo Revisar (cuando haya datos):**

1. **Abre Google Analytics 4**
2. **Navega a: Insights > Core Web Vitals**
3. **Verifica que veas estos events:**
   - LCP (Largest Contentful Paint)
   - INP (Interaction to Next Paint)
   - CLS (Cumulative Layout Shift)
   - FCP (First Contentful Paint)
   - TTFB (Time to First Byte)

**Dónde ver eventos individuales:**
1. **GA4 > Events**
2. **Busca eventos que comiencen con "metric_"**
3. **Ejemplo:** `metric_LCP`, `metric_INP`

**En DevTools Console (ahora):**
```javascript
// Abre DevTools Console
// Recarga la página
// Deberías ver logs como:

✓ onLCP tracking initialized
✓ onINP tracking initialized
✓ onCLS tracking initialized
✓ PerformanceProvider: LCP logged - 1847ms
✓ Web Vitals GA4 event sent
```

---

### PASO 5: Test de Rendimiento en Throttling (10-15 min)

**Setup:**
1. DevTools > Performance tab
2. Network > "Fast 3G"
3. Network > Disable cache (para simular cold cache)

**Test 1 - Cold Cache (Fast 3G):**
1. Abre DevTools Performance
2. Click en "Start recording"
3. Navega a `/propiedades`
4. Espera a que cargue completo
5. Click "Stop"

**Qué Buscar:**
- Largest Contentful Paint (LCP)
- First Contentful Paint (FCP)
- Total time to interactive

**Esperado:**
```
FCP: 1.2-1.8s ✅
LCP: 1.8-2.5s ✅
TTI: 2.5-3.5s ✅
```

**Test 2 - Warm Cache:**
1. Limpia Performance recording
2. Navega a `/residenciales`
3. Vuelve atrás a `/propiedades`
4. Recarga (`F5`)
5. Record performance again

**Esperado - Más Rápido:**
```
FCP: 0.8-1.2s ✅ (40-60% más rápido)
LCP: 1.0-1.8s ✅
`TTI: 1.5-2.5s ✅
```

---

### PASO 6: Lighthouse Audit (5 min)

**Instrucciones:**
1. DevTools > Lighthouse
2. Select "Mobile" + "Performance"
3. Click "Analyze page load"
4. Espera a que complete (~1 min)

**Verifica Scores:**
```
Performance: > 90 ✅ (Target)
Accessibility: > 95 ✅ (Target)
Best Practices: > 90 ✅ (Target)
SEO: > 95 ✅ (Target)
```

**Si alguno es < target:**
1. Scroll down a "Issues"
2. Identifica el problema
3. Anótalo para Phase 6 optimization

---

## 📊 DOCUMENTAR RESULTADOS

**Crea una nota con tus mediciones:**

```markdown
# Performance Validation Results - March 12, 2026

## Bundle Size (del Analyzer)
- Initial JS: ___ KB
- Common chunk: ___ KB
- Largest dynamic chunk: ___ KB
- Total: ___ KB

## Dynamic Imports
- ¿Se cargan bajo demanda? SI / NO
- Cuántas rutas con lazy loading?: ___
- Tamaño promedio chunk: ___ KB

## Prefetching
- En Fast 3G: ¿Prefetch visible? SI / NO
- En Slow 4G: ¿Prefetch reducido? SI / NO
- ¿Respeta data saver mode? SI / NO

## Performance (Fast 3G)
- FCP (First visit): ___ s
- LCP (First visit): ___ s
- FCP (Warm cache): ___ s
- LCP (Warm cache): ___ s

## Lighthouse
- Performance score: ___ / 100
- Accessibility: ___ / 100
- Best Practices: ___ / 100
- SEO: ___ / 100

## Web Vitals (GA4 - después de 24-48h)
- LCP: ___ ms
- INP: ___ ms
- CLS: ___
- FCP: ___ ms
- TTFB: ___ ms

## Observaciones
[Tu análisis aquí]
```

---

## 🚨 PROBLEMAS COMUNES & SOLUCIONES

### Problema: No veo datos en GA4
**Solución:** 
- Normal, espera 24-48h para aggregación
- Verifica que GA4 measurement ID está en `.env.local`
- Mira GA4 > Real-time para ver eventos actuales

### Problema: DevTools no muestra dynamic imports
**Solución:**
1. Asegúrate que estás en `/propiedades` o `/contacto` (tienen lazy loading)
2. Limpia cache: DevTools > Application > Storage > Clear site data
3. Recarga la página
4. Revisa Network tab

### Problema: Lighthouse score bajo
**Solución:**
1. Mira la sección "Issues" en Lighthouse report
2. Identifica problema específico
3. Si es "Render-blocking resources" → Esperado, es Next.js
4. Si es imagen no optimizada → Ya optimizadas, puede ser LCP

### Problema: Prefetch no visible en Network
**Solución:**
1. Verifica que la red sea 3G o mejor
2. En 2G no se hace prefetch (es por diseño)
3. Mira console para ver logs de prefetch strategy

---

## ✅ CHECKLIST DE HOY

- [ ] **PASO 1:** Revisar Bundle Analyzer (http://localhost:4000)
- [ ] **PASO 2:** DevTools Network - validar dynamic imports
- [ ] **PASO 3:** Throttling Slow 4G - verificar prefetching reducido
- [ ] **PASO 4:** Thumbs up en GA4 Console (check web vitals events)
- [ ] **PASO 5:** Performance recording - medir FCP/LCP
- [ ] **PASO 6:** Lighthouse audit - verificar scores
- [ ] **PASO 7:** Documentar todos los resultados
- [ ] **PASO 8:** Revisar docs/BASELINE-MEASUREMENTS-2026-03-12.md
- [ ] **PASO 9:** Actualizar todo list cuando completes
- [ ] **PASO 10:** Reportar hallazgos y decidir Phase 6

---

## ⏱️ TIEMPO ESTIMADO

**Total:** 1-1.5 horas

Breakdown:
- Bundle Review: 10 min
- DevTools Testing: 40 min
- Performance Recording: 15 min
- Documentation: 15 min

---

## 📞 CUANDO COMPLETES

Comparte:
1. ¿Qué tamaños de bundle viste?
2. ¿Dynamic imports se cargaron bajo demanda?
3. ¿Prefetching se redujo en redes lentas?
4. ¿Lighthouse scores cumplieron targets?
5. ¿Algún issue encontrado?

---

**Estado:** 🟢 Ready to validate - Comienza con Paso 1!

*Guía creada: March 12, 2026 - GitHub Copilot*
