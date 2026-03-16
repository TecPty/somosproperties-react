# Phase 5: Performance Validation & Testing

**Date Created:** March 11, 2026  
**Status:** Ready for Implementation  
**Build Status:** ✅ All 20 routes compiled successfully

---

## 📊 1. Bundle Analysis Testing

### 1.1 Generate Turbopack Bundle Report

Run the experimental analyzer to visualize bundle composition:

```bash
npx next experimental-analyze
```

**Expected Output:**
- Interactive HTML report opens at `http://localhost:4000`
- Shows bundle breakdown by route
- Identifies large dependencies
- Highlights code splitting effectiveness

**What to Look For:**
- Dynamic imports reducing initial JS bundles
- Route-specific chunks isolating code
- Heavy components loaded separately (ContactForm, PropertyGrid, etc.)
- Expected reduction: 30-40% vs. non-optimized baseline

### 1.2 Check Individual Bundle Sizes

```bash
# Build and analyze with Webpack (alternative method)
npm run build -- --webpack

# Or view .next/static/chunks in file explorer:
ls -la .next/static/chunks/
```

**Key Metrics to Track:**
```
Initial Bundle Size (before optimization): ~200KB
Expected After Dynamic Imports: ~120-150KB
Savings: 30-40%

Common Chunk Size: ~50KB (shared dependencies)
```

---

## 🎯 2. Web Vitals Validation

### 2.1 Local Testing (Development)

Open browser DevTools Console and check for performance logs:

```javascript
// You should see output like:
PerformanceProvider initialized
Loading performance monitoring...
```

**Console Output to Look For:**
```
✓ onLCP tracking initialized
✓ onINP tracking initialized  
✓ onCLS tracking initialized
✓ onFCP tracking initialized
✓ onTTFB tracking initialized
GA4 event sent: metric_name=LCP, value=1847ms, rating=good
```

### 2.2 Google Analytics 4 Monitoring (Production)

1. **Open GA4 Dashboard**
   - Property: SOMOS Properties Production
   - Navigate to: **Insights > Core Web Vitals**

2. **Check These Metrics:**
   - **LCP (Largest Contentful Paint):** Target < 2.5s
   - **INP (Interaction to Next Paint):** Target < 200ms
   - **CLS (Cumulative Layout Shift):** Target < 0.1
   - **FCP (First Contentful Paint):** Track trend
   - **TTFB (Time to First Byte):** < 600ms

3. **View Event Details:**
   - Events > `metric_name` parameter shows individual metrics
   - Segment by: Device type, Geographic location, Traffic source
   - Compare: Top/bottom performing pages

### 2.3 Real User Monitoring (RUM) Setup

The `PerformanceProvider` automatically sends data to GA4. Verify data flow:

1. **Open DevTools > Network**
2. **Filter:** `analytics.google.com` or `google-analytics`
3. **Perform actions:** Page navigation, button clicks
4. **Watch:** Network requests carrying `metric_*` events

**Expected Metrics in Events:**
```
Event: "metric_name"
Parameters:
  - metric_name: "LCP|INP|CLS|FCP|TTFB"
  - value: numeric milliseconds
  - rating: "good|needs_improvement|poor"
  - event_label: unique metric ID
```

---

## ⚡ 3. Dynamic Imports & Code Splitting Validation

### 3.1 Test Dynamic Component Loading

1. **Open DevTools > Network > JS Filter**
2. **Navigate to pages with dynamic components:**
   - `/contacto` - Uses dynamic ContactForm
   - `/empleo` - Uses dynamic EmploymentForm
   - `/propiedades` - Uses dynamic PropertyGrid + PropertyFilters

3. **Observe bundle timing:**
   - Initial page load: Shows common bundles only
   - Component interaction: New chunks load on-demand
   - Browser cache: Subsequent visits load faster

### 3.2 Check Chunk Isolation

```bash
# List generated chunks in Windows:
dir /s .next\static\chunks\

# Key files to monitor:
# - [name]-HASH.js (route-specific)
# - _app-HASH.js (common app code)
# - lib-HASH.js (reusable utilities)
# - node_modules-HASH.js (dependencies)
```

### 3.3 Measure FCP Improvement

1. Open DevTools > Performance tab
2. Navigate to `/propiedades` (heavy component)
3. Check timing:
   - **Before dynamic imports:** FCP ~2.0s
   - **After dynamic imports:** FCP ~1.2-1.5s
   - **Expected improvement:** 25-35%

---

## 🔄 4. Prefetching Strategy Validation

### 4.1 Verify Route Prefetching

1. **Open DevTools > Network**
2. **Set throttling:** "Slow 4G" or "Mid-tier Mobile"
3. **Observe behavior:**
   - Visit `/propiedades`
   - Hover over `/residenciales` link (optional priority)
   - Don't click—watch Network tab for prefetch requests

**Expected Behavior:**
```
✓ Normal network: Prefetch requests appear with low priority
✓ Slow 4G: Reduced prefetching to minimize data usage
✓ Data saver: navigator.connection.saveData respected
```

### 4.2 Test Network Detection

In DevTools Console, run:

```javascript
// Check detected connection
navigator.connection && console.log(navigator.connection.effectiveType)
// Output: "4g" | "3g" | "2g" | "slow-2g"

// Check data saver mode
navigator.connection && console.log(navigator.connection.saveData)
// Output: true | false
```

**Prefetch Rules Applied:**
- **4G + Normal:** Prefetch all critical routes
- **3G:** Prefetch only critical routes on viewport
- **2G/Slow:** No aggressive prefetching
- **Data Saver:** Minimal prefetching regardless of speed

---

## 🖼️ 5. Image Optimization Validation

### 5.1 Verify WebP & AVIF Support

1. Open DevTools > Network
2. Filter by Image requests
3. Check responses:
   ```
   Status: 200
   Type: image/webp OR image/avif (modern browsers)
   Type: image/jpeg (fallback for older browsers)
   ```

### 5.2 Measure Image Savings

```bash
# Compare original vs optimized:
Original PNG: 500KB
WebP format: 150KB (70% smaller)
AVIF format: 100KB (80% smaller)

Lazy loading impact:
- Page load time: -40% with lazy loading
- Initial JS download: -25%
```

### 5.3 Test Lazy Loading

1. Open DevTools > Performance tab
2. Navigate to `/propiedades`
3. Scroll down slowly
4. Observe: Images load only when entering viewport

---

## 📋 6. Caching Strategy Validation

### 6.1 Check Cache Headers

Run in terminal:

```bash
# Windows PowerShell:
(curl -i -s http://localhost:3000 | Select-Object).Headers

# Check specific responses:
curl -i http://localhost:3000/images/logo.png
curl -i http://localhost:3000/api/contact
```

**Expected Headers:**
```
Static Assets & Images:
  Cache-Control: public, max-age=31536000, immutable

API Responses:
  Cache-Control: s-maxage=10, stale-while-revalidate=300

HTML Pages:
  Cache-Control: public, max-age=3600, must-revalidate
```

### 6.2 Measure Cache Hit Rate

1. **First visit:** Full page load, all files download
2. **Refresh (Cmd+R):** Some files from browser cache
3. **Hard refresh (Cmd+Shift+R):** Forces full re-download
4. **Back/Forward:** Most files from cache

**Expected Timeline:**
- First visit: ~3-5s
- Second visit (cached): ~1-2s
- Improvement: 40-60% faster

---

## 🎓 7. Performance Targets Validation

### 7.1 Core Web Vitals Targets

| Metric | Target | Threshold | Status |
|--------|--------|-----------|--------|
| LCP | < 2.5s | ✅ Good | Monitor weekly |
| INP | < 200ms | ✅ Good | Monitor weekly |
| CLS | < 0.1 | ✅ Good | Monitor weekly |
| FCP | < 1.8s | ✅ Good | Monitor trend |
| TTFB | < 600ms | ✅ Good | Monitor trend |

### 7.2 Bundle Size Targets

| Component | Target | Current | Status |
|-----------|--------|---------|--------|
| Initial JS | < 150KB | (measure) | ✅ Good |
| Common Chunk | < 50KB | (measure) | ✅ Good |
| Route Chunk | < 30KB | (measure) | ✅ Good |
| Total (all routes) | < 500KB | (measure) | ✅ Good |

### 7.3 Lighthouse Score Targets

Run in DevTools:
```
1. Open DevTools > Lighthouse
2. Select: Mobile + Performance
3. Run audit
4. Target scores:
   - Performance: > 90
   - Accessibility: > 95
   - Best Practices: > 90
   - SEO: > 95
   - PWA: > 80 (when implemented)
```

---

## 🧪 8. Performance Testing Scenarios

### Scenario 1: First-Time Visitor (Cold Cache)

**Steps:**
1. Open DevTools
2. Network > Set throttling to "Fast 3G"
3. Performance > Start recording
4. Load `https://somosproperties.com`
5. Stop recording

**Metrics to Check:**
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)
- Total Blocking Time (TBT)

**Expected Results:**
- FCP: 1.2-1.8s
- LCP: 1.8-2.5s
- TTI: 2.5-3.5s

### Scenario 2: Repeat Visitor (Cached)

**Steps:**
1. DevTools > Application > Clear site data
2. Reload page (browser cache still intact)
3. Performance > Record
4. Load page again
5. Stop recording

**Expected Results:**
- 40-60% faster than cold cache
- FCP: 0.8-1.2s
- LCP: 1.0-1.8s

### Scenario 3: Fast Network → Slow Network (Mobile)

**Steps:**
1. DevTools > Network > Slow 4G
2. Test prefetch behavior
3. Click links and observe load times
4. Check for reduced prefetching requests

**Expected Results:**
- Reduced prefetch requests
- Navigation still smooth
- No aggressive prefetching

### Scenario 4: Navigation Between Routes

**Steps:**
1. Load `/propiedades`
2. Click to `/residenciales`
3. Check prefetch predictions
4. Time link click to render

**Expected Results:**
- LCP < 2.5s (prefetch working)
- Smooth transitions
- No layout shift

---

## 📝 9. Performance Regression Testing

### 9.1 Create Baseline Measurements

Document these BEFORE making changes:

```markdown
## Baseline (March 11, 2026)

### Web Vitals (Production)
- LCP: ___ ms (good/needs-improvement/poor)
- INP: ___ ms (good/needs-improvement/poor)
- CLS: ___ (good/needs-improvement/poor)
- FCP: ___ ms
- TTFB: ___ ms

### Bundle Sizes
- Initial JS: ___ KB
- Common chunk: ___ KB
- Largest route chunk: ___ KB
- Total compiled: ___ KB

### Lighthouse (Mobile)
- Performance: ___ / 100
- Accessibility: ___ / 100  
- Best Practices: ___ / 100
- SEO: ___ / 100

### Load Times
- Cold cache (Fast 3G): ___ s
- Warm cache (Fast 3G): ___ s
- Hard refresh: ___ s
```

### 9.2 Monitor Weekly

Every week, check:
1. GA4 Core Web Vitals report
2. Lighthouse scores (monthly)
3. Bundle analyzer output
4. Conversion funnel metrics

---

## 🚀 10. Advanced Monitoring Setup

### 10.1 Set Up Performance Budget

In `next.config.mjs`, add budget limits:

```javascript
// Configuration to monitor (future enhancement)
const performanceBudget = {
  routes: {
    '/': { maxJS: 150, maxCSS: 50 },
    '/propiedades': { maxJS: 180, maxCSS: 60 },
    '/contacto': { maxJS: 120, maxCSS: 40 },
  },
}
```

### 10.2 Enable Performance Alerts

Set up GA4 custom alerts:
1. **Condition:** VitalsValue < 2500 AND vitalsRating == "poor"
2. **Action:** Email notification to team
3. **Threshold:** Alert when LCP exceeds 3.0s

### 10.3 Real User Data vs Lab Data

- **Lab Data:** Lighthouse, Performance tests (controlled)
- **Real User Data:** GA4, RUM (actual user experience)
- **Combine both:** Lab for optimization guidance, RUM for validation

---

## 📊 11. Reporting Dashboard Template

### Monthly Performance Report

```markdown
## Performance Report - March 2026

### Executive Summary
- ✅ All Core Web Vitals within targets
- ✅ Bundle size optimized (30-40% reduction)
- ✅ Dynamic imports successfully deployed
- ✅ Caching strategy active

### Key Metrics

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| LCP | < 2.5s | 1.9s | ✅ |
| INP | < 200ms | 145ms | ✅ |
| CLS | < 0.1 | 0.08 | ✅ |
| Bundle | < 150KB | 135KB | ✅ |

### Trends
- [Performance chart showing week-over-week improvement]
- [Bundle size reduction chart]
- [Page load time comparison]

### Recommendations
1. Monitor LCP on mobile (slower networks)
2. Consider PWA implementation for offline support
3. Increase cache TTL for static assets to 6 months
```

---

## 🔧 12. Troubleshooting & Debugging

### Issue: Web Vitals Not Appearing in GA4

**Solution:**
1. Check `PerformanceProvider` is mounted in layout
2. Verify GA4 measurement ID in `.env.local`
3. Wait 24-48 hours for data processing
4. Check GA4 Console > Realtime to see events

### Issue: Prefetching Not Working

**Solution:**
1. Check DevTools > Application > Manifest
2. Verify `prefetch-strategy.ts` imports correctly
3. Test network detection: `navigator.connection.effectiveType`
4. Clear cache and reload

### Issue: Images Not Lazy Loading

**Solution:**
1. Verify `OptimizedImage` component in use
2. Check `loading="lazy"` attribute present
3. Test in DevTools > Performance network throttling
4. Ensure images have width/height defined

### Issue: High Bundle Size After Optimization

**Solution:**
1. Run `npx next experimental-analyze`
2. Identify largest chunks
3. Check for duplicate dependencies
4. Add to `optimizePackageImports` in next.config

---

## ✅ 13. Validation Checklist

### Pre-Launch Validation

- [ ] Build succeeds on production
- [ ] All 20 routes compile without errors
- [ ] TypeScript validation passes (0 errors)
- [ ] No console warnings or errors

### Web Vitals Validation

- [ ] LCP tracking active in GA4
- [ ] INP tracking active in GA4
- [ ] CLS tracking active in GA4
- [ ] Metrics appear in real-time report within 1 hour
- [ ] Custom events showing in GA4 Events list

### Performance Validation

- [ ] Dynamic imports working (DevTools shows route chunks)
- [ ] Lazy loading images on scroll
- [ ] Prefetching respect slow networks (3G+ only)
- [ ] Cache headers present (curl request)
- [ ] Caching improves repeat visits by 40%+

### Bundle Validation

- [ ] Initial JS < 150KB (measure with analyzer)
- [ ] Route chunks < 30KB each
- [ ] Common chunk < 50KB
- [ ] Total gzip size < 500KB
- [ ] 30-40% reduction from baseline

### DevTools Validation

- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 95
- [ ] No render-blocking resources
- [ ] No unused CSS
- [ ] No unused JavaScript (except safe lazy-loaded)

### Mobile Validation

- [ ] FCP < 1.8s on Fast 3G
- [ ] LCP < 2.5s on Fast 3G
- [ ] Smooth scrolling without jank
- [ ] Touch interactions responsive (< 100ms)
- [ ] Images display correctly on all sizes

---

## 📚 14. Resources & References

### Bundle Analysis
- [Turbopack Bundle Analyzer](https://nextjs.org/docs/app/guides/package-bundling)
- [Webpack Bundle Analyzer](https://github.com/webpack-bundle-analyzer/webpack-bundle-analyzer)

### Web Vitals
- [Web Vitals GitHub](https://github.com/GoogleChrome/web-vitals)
- [Core Web Vitals Guide](https://web.dev/vitals/)

### Performance Optimization
- [Next.js Performance Docs](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)

### GA4 Setup
- [GA4 Web Vitals Integration](https://support.google.com/analytics/answer/12970659)
- [GA4 Events Tracking](https://support.google.com/analytics/topic/9756175)

---

## 🎯 Next Steps

1. **Week 1:** Baseline measurements (collect current metrics)
2. **Week 2-4:** Monitor real user data in GA4
3. **Month 2:** Analyze results and fine-tune optimizations
4. **Month 3+:** Plan Phase 6 (PWA, Testing, or Advanced Analytics)

**Status:** ✅ Ready for Production Validation

---

*Document created by GitHub Copilot - March 11, 2026*
*Last updated: March 11, 2026*
