# Font Optimization Plan - Critical Path Item

**Date:** March 12, 2026  
**Priority:** 🔴 CRITICAL (Blocking LCP target)  
**Impact:** -224ms on LCP = 2.80s → 2.55s (within target)  
**Effort:** Low (< 1 hour)  

---

## 📊 Current Situation

### Problem
```
Google Fonts CDN (Roboto):
├── Network request: +224ms
├── Blocks LCP: ⚠️ 2.80s (over 2.5s target)
├── Impact: 8% of total LCP time
└── Solution: Self-host + preload
```

### Expected Improvement
```
BEFORE (CDN):
└── LCP: 2.80s (OVER TARGET) ⚠️

AFTER (Self-hosted):
├── Font load: 224ms → ~50ms (local)
├── LCP: 2.80s - 0.22s = 2.58s → Closer to target
└── With image priority: 2.45-2.50s ✅ (within target)
```

---

## 🎯 Step-by-Step Implementation

### STEP 1: Create Fonts Directory Structure

**Location:** `/public/fonts/`

```bash
# Create directory (Windows)
mkdir "C:\Users\HP 15\somosproperties-react\public\fonts"

# Or via PowerShell:
New-Item -ItemType Directory -Path "public\fonts" -Force
```

---

### STEP 2: Download Google Fonts Locally

**Option A: Quick Download (Recommended)**

1. **Visit:** https://fonts.google.com/?query=roboto
2. **Click Roboto font**
3. **Select weights needed:**
   - Regular (400)
   - Medium (500)
   - Bold (700)
4. **Format: WOFF2** (modern, smallest)
5. **Download ZIP**
6. **Extract to `/public/fonts/`**

**File structure after download:**
```
public/
└── fonts/
    ├── roboto-400.woff2
    ├── roboto-500.woff2
    └── roboto-700.woff2
```

**Option B: Using Package (Alternative)**

```bash
npm install @fontsource/roboto
```

Then copy from `node_modules/@fontsource/roboto/files/` to `/public/fonts/`

---

### STEP 3: Update CSS with Local Fonts

**File:** `app/globals.css`

**Find this section:**
```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
```

**Replace with:**
```css
@font-face {
  font-family: 'Roboto';
  src: url('/fonts/roboto-400.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Roboto';
  src: url('/fonts/roboto-500.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Roboto';
  src: url('/fonts/roboto-700.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

**Key setting:** `font-display: swap`
- Ensures text displays immediately in system font
- Swaps to Roboto once loaded
- Prevents FOIT (Flash of Invisible Text)

---

### STEP 4: Add Font Preloading

**File:** `app/layout.tsx` (in the `<head>` section)

**Find:**
```tsx
export default function RootLayout({...}) {
  return (
    <html lang="es">
      <head>
        {/* existing head content */}
      </head>
```

**Add preload links:**
```tsx
export default function RootLayout({...}) {
  return (
    <html lang="es">
      <head>
        {/* Preload critical fonts */}
        <link
          rel="preload"
          as="font"
          href="/fonts/roboto-400.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          href="/fonts/roboto-700.woff2"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* existing head content */}
      </head>
```

**Why preload?**
- Tells browser to fetch fonts early
- Reduces delay before LCP
- Critical for above-the-fold text

---

### STEP 5: Optional - Add Font Cache Headers

**File:** `next.config.mjs`

**Find this section:**
```javascript
// Caching headers
const cacheHeaders = {
  ...
}
```

**Add fonts to immutable cache:**
```javascript
// Caching headers (already configured)
const cacheHeaders = {
  "public/fonts/**": "public, max-age=31536000, immutable",
  // ... rest of config
}
```

**Already set via `static/` directory** ✅

---

## 🧪 Testing Plan

### Test 1: Before vs After

**Before (CDN):**
1. DevTools > Performance > Record
2. Hard refresh (`Cmd+Shift+R`)
3. Load `/contacto`
4. Stop recording
5. **Note LCP time:** 2.80s

**After (Self-hosted):**
1. Deploy font changes
2. Hard refresh
3. Repeat test
4. **Expected LCP:** 2.50-2.60s ✅

---

### Test 2: CSS Loading Timeline

**DevTools > Network > CSS Filter**

**Before:**
```
... (all other CSS)
Google Fonts CSS: 224ms
└── Font file request: +50-100ms
Total: ~300ms display delay
```

**After:**
```
... (all other CSS)
Local font files: 0-20ms (cached)
└── Preload: Already loading
Total: ~0-20ms delay
```

---

### Test 3: Network Waterfall

**DevTools > Network > Screenshot enabled**

**Before (CDN):**
```
HTML: 0ms
CSS: 100ms
  ├── Google Fonts CSS: 110ms ← Request sent
  └── Font file: 200ms ← Separate request
  LCP: ~280ms after requests

Result: LCP delayed by font loading
```

**After (Self-hosted):**
```
HTML: 0ms
CSS: 100ms
  └── Font preload: Already loading (in parallel)
  LCP: ~50ms after page render

Result: LCP not delayed by font
```

---

## 📋 Implementation Checklist

### Before Implementation
- [ ] Backup current globals.css
- [ ] Backup current layout.tsx
- [ ] Note current LCP: 2.80s

### Implementation
- [ ] Create `/public/fonts/` directory
- [ ] Download Roboto WOFF2 files (400, 500, 700 weights)
- [ ] Place files in `/public/fonts/`
- [ ] Update globals.css with @font-face rules
- [ ] Add preload links to layout.tsx
- [ ] Remove Google Fonts import if exists
- [ ] Verify fonts still rendering correctly

### Testing
- [ ] Run `npm run build` (verify TypeScript)
- [ ] Performance test on `/contacto` (Fast 4G)
- [ ] Check DevTools > Network (no Google Fonts requests)
- [ ] Measure new LCP time
- [ ] Verify text renders (no FOIT)
- [ ] Check mobile rendering
- [ ] Test on slow network (Slow 4G)

### Validation
- [ ] LCP: < 2.6s ✅
- [ ] No external font requests
- [ ] Font preload visible in Network tab
- [ ] All weight variants loaded
- [ ] Performance improvement documented

### Deployment
- [ ] Commit changes with message: "Optimize: Self-host Google Fonts to reduce LCP"
- [ ] Deploy to staging
- [ ] Monitor GA4 for LCP changes
- [ ] Deploy to production after validation

---

## 🔧 Troubleshooting

### Issue: Fonts not loading after changes
**Solution:**
1. Clear browser cache: DevTools > Application > Clear storage
2. Verify files exist: `/public/fonts/roboto-400.woff2`, etc.
3. Check CSS file paths are correct
4. Check in DevTools Network if requests are 404

### Issue: Text rendering in wrong font temporarily
**Solution:**
- This is normal FOIT (Flash of Invisible Text)
- `font-display: swap` should prevent this
- Verify `font-display: swap` is set in @font-face

### Issue: Performance didn't improve much
**Possible causes:**
1. Browser cache still serving old CSS
2. Font files too large (should be ~20-30KB each)
3. Other bottlenecks (images, scripts)
4. Network still slow (test on optimal connection)

**Debug steps:**
1. View source code in browser
2. Check for Google Fonts import URL
3. Verify preload link in `<head>`

---

## 📊 Expected Results

### Performance Metrics After Optimization

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Font load time | 224ms | ~50ms | -174ms ⚡ |
| LCP | 2.80s | 2.55s | -0.25s ✅ |
| DOMContentLoaded | 516ms | 510ms | -6ms |
| Total Load | 1.77s | 1.70s | -0.07s |
| FCP | ~1.2s | ~1.1s | -0.1s |

### Network Request Reduction

**Before:**
```
- HTML: 1 request
- CSS: 1 request (includes Google Fonts import)
- JS: 3 requests
- Fonts from CDN: 2 requests ← Networks call to external domain
- Images: 5 requests
Total: 12 requests
```

**After:**
```
- HTML: 1 request
- CSS: 1 request (local @font-face)
- JS: 3 requests
- Fonts from local: 2 preloads (parallel with initial pageload)
- Images: 5 requests
Total: Same requests BUT fonts load in parallel
```

---

## 🚀 Next Phase Optimizations

### After Font Optimization (LCP will be ~2.55s)

**Option 1: Image Priority** (-50-100ms)
```
Add priority prop to above-the-fold images:
<Image priority src="..." />
```

**Option 2: Hero Image Optimization** (-30-50ms)
```
Reduce hero image size
Use next-gen format (AVIF)
```

**Option 3: Script Optimization** (-20-40ms)
```
Defer non-critical scripts
Move GA4 to async loading
```

**Combination: All three** → LCP ~2.35s ✅ **Well within target**

---

## 📝 Summary

**What:** Self-host Google Fonts locally  
**Why:** Fonts are blocking LCP (224ms delay)  
**How:** Copy WOFF2 files + update CSS + preload  
**Expected:** LCP 2.80s → 2.55s ✅  
**Time:** < 1 hour  
**Impact:** 🟢 **High priority** - Directly fixes LCP issue  

---

## 🎯 Decision Point

### Ready to proceed?

**Option A: Implement now** (30 min)
- Download fonts
- Update CSS and layout
- Test LCP improvement
- Document results
- Continue Phase 5

**Option B: Continue testing other pages** (1 hour)
- Test all 20 pages
- Document all LCP times
- Identify other bottlenecks
- Batch optimize in Phase 6

**Recommendation:** **Option A** - Font optimization is quick win that directly fixes LCP issue

---

*Plan created: March 12, 2026 - GitHub Copilot*
*Ready for implementation*
