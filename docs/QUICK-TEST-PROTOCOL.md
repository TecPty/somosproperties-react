# 🚀 Phase 5 Part 2: Quick Testing Protocol - 5 Páginas

**Goal:** Complete baseline in 1-1.5 hours  
**Pages to Test:** 5 critical pages  
**Methodology:** Performance Recording only (Quick 5min per page)  
**Then:** 1 Lighthouse audit (pick fastest/slowest)  

---

## 📋 Testing Order

| # | Page | Route | Priority | Type |
|---|------|-------|----------|------|
| 2 | Home | `/` | 🔴 HIGH | Landing |
| 3 | Propiedades | `/propiedades` | 🔴 HIGH | Heavy component |
| 4 | Residenciales | `/residenciales` | 🟡 MED | Category page |
| 5 | Premium | `/premium` | 🟡 MED | Feature page |
| 6 | Comerciales | `/comerciales` | 🟡 MED | Category page |

---

## ⚡ QUICK TEST PROTOCOL (5 min per page)

### Template for Each Page

**PASO 1: Prepare**
```
1. Open DevTools (F12)
2. Go to Performance tab
3. Set Network: "Fast 4G" (same as /contacto)
4. Disable cache: DevTools > Settings > Network conditions > "Disable cache"
5. Clear previous recording
```

**PASO 2: Record**
```
1. Click "Start recording"
2. Navigate to page (click link or type URL)
3. Wait for page fully loaded (interactive)
4. Click "Stop recording"
Total time: ~30-45 seconds
```

**PASO 3: Measure (Read from Performance graph)**
```
Look at the Performance timeline:
├─ Largest blue line = DOMContentLoaded (when HTML parsed)
├─ Red line = Load (when all resources done)
├─ Find LCP event = Largest Contentful Paint
│
Record these 3 metrics:
├─ DOMContentLoaded: ___ ms
├─ Load: ___ s
└─ LCP: ___ s
```

**PASO 4: Document**
```
Write in [BASELINE-MEASUREMENTS-2026-03-12.md]:

### Page 2: `/propiedades` - Performance Recording
- DOMContentLoaded: ___ ms
- Load: ___ s
- LCP: ___ s
- Notes: [Any observations]
```

---

## 📝 EXACT STEPS FOR PAGE 2: `/`

### Setup (First time only)
```
1. Open http://localhost:3000 in browser
   (or npm run dev if not running)
2. DevTools > Performance tab
3. Settings > Network conditions:
   └─ Throttling: "Fast 4G"
   └─ "Disable cache" ✓
4. Ready!
```

### Record Home Page
```
1. DevTools > Performance > Red circle (Start)
2. In address bar: Type just "/" then Enter
3. Watch page load
4. When done (~2-3 sec), click stop (red square)
```

### Read Metrics
```
In Performance graph, look for these:
├─ BLUE vertical line = DOMContentLoaded
│  └─ Example: 450ms
├─ RED vertical line = Load
│  └─ Example: 1.8s
└─ YELLOW marker = LCP (Largest Contentful Paint)
   └─ Example: 2.2s
```

### Record Results
```markdown
### Page 2: `/` (Home)
- **DOMContentLoaded:** 450ms
- **Load:** 1.8s
- **LCP:** 2.2s
- **Images on page:** Hero image lazy loaded?
- **Third-party scripts:** Blocks rendering?
```

---

## 📝 EXACT STEPS FOR PAGE 3: `/propiedades`

**Key point:** This page has dynamic PropertyGrid component

```
Setup:
└─ Continue from previous setting (Fast 4G, cache disabled)

Record:
1. DevTools > Performance > Start
2. Navigate to http://localhost:3000/propiedades
3. Wait for page fully loaded
4. Stop recording

Measure:
1. Look for DOMContentLoaded line
2. Look for Load line
3. Find LCP marker

Document:
```markdown
### Page 3: `/propiedades`
- **DOMContentLoaded:** ___ ms
- **Load:** ___ s
- **LCP:** ___ s
- **Dynamic import triggering:** [Did PropertyGrid load under-demand?]
- **Filter component:** Loaded immediately or on interaction?
```

**Key observation:** Does PropertyGrid lazy load or block?
```

---

## 📝 EXACT STEPS FOR PAGE 4: `/residenciales`

```
Same protocol:
1. Start recording
2. Navigate: http://localhost:3000/residenciales
3. Stop when loaded
4. Note metrics

What to look for:
- Similar to /comerciales?
- Same blocking scripts?
- Faster or slower than /propiedades?
```

---

## 📝 EXACT STEPS FOR PAGE 5: `/premium`

```
Same protocol:
1. Start recording
2. Navigate: http://localhost:3000/premium
3. Stop when loaded
4. Note metrics

What to look for:
- Content-heavy page?
- Forms present?
- Any third-party integrations?
```

---

## 📝 EXACT STEPS FOR PAGE 6: `/comerciales`

```
Same protocol:
1. Start recording
2. Navigate: http://localhost:3000/comerciales
3. Stop when loaded
4. Note metrics

What to look for:
- Similar structure to /residenciales?
- Same performance characteristics?
```

---

## 🎯 QUICK RECORDING TIPS

### Finding LCP in Timeline
```
Performance graph shows:
- Colored bars = resource loading
- Vertical lines = events

LCP = Yellow marker or in right panel:
├─ Look for "LCP" text
├─ Shows the element: "image" or "text"
└─ Shows timing: "2.34s" = 2,340ms
```

### If Can't Find LCP
```
Alternative: Look at "Largest Contentful Paint" in:
DevTools > Performance > Scroll down to "Metrics" section
```

### Network Issues
```
If page not loading:
1. Check console for errors (F12 > Console)
2. Restart dev server: npm run dev
3. Try hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
```

---

## 📊 TEMPLATE FOR DOCUMENTATION

Use this format for each page in BASELINE file:

```markdown
### Page X: `/route-name`
**Network:** Fast 4G | **Cache:** Disabled

**Timing Metrics:**
- DOMContentLoaded: ___ ms 
- Load: ___ s
- LCP: ___ s
- CLS: ✅ observed?
- Notes: [Include any observations]

**Observations:**
- Third-party scripts blocking? YES/NO
- Dynamic components lazy loaded? YES/NO
- Images lazy loading? YES/NO
- Faster/Slower than /contacto? [compare]
```

---

## 🏁 FINAL STEP: Lighthouse Audit (Optional)

**If time permits** (after 5-6 pages tested):

Pick ONE interesting page:
- Either the **fastest** page (to understand what works)
- Or the **slowest** page (to understand what blocks)

```
1. DevTools > Lighthouse
2. Mobile + Performance
3. Analyze
4. Screenshot the results
5. Note down Performance score
```

---

## ⏱️ TIME ESTIMATE

```
Page 1 (/contacto):      Already done ✅
Page 2 (/):              5 min
Page 3 (/propiedades):   5 min
Page 4 (/residenciales): 5 min
Page 5 (/premium):       5 min
Page 6 (/comerciales):   5 min
Documentation:           5 min
Optional Lighthouse:     3 min
───────────────────────────────
TOTAL: 35-40 minutes ✅
```

---

## 📋 CHECKLIST

- [ ] Page 1: `/contacto` - Results documented ✅
- [ ] Page 2: `/` - Tested & documented
- [ ] Page 3: `/propiedades` - Tested & documented
- [ ] Page 4: `/residenciales` - Tested & documented
- [ ] Page 5: `/premium` - Tested & documented
- [ ] Page 6: `/comerciales` - Tested & documented
- [ ] All results in BASELINE file
- [ ] Optional: 1 Lighthouse on interesting page
- [ ] Phase 5 Part 2: COMPLETE ✅

---

## 🎯 WHAT WE'RE LOOKING FOR

### Pattern Recognition
```
Question: Are ALL pages slow, or just /contacto?

Scenario A: All pages ~2.5-3.0s LCP
├─ GTM/TikTok/Maps issue affects all
├─ Phase 6: Global fix (defer scripts)
└─ Expected: 2-3 hour batched optimization

Scenario B: Only /contacto >3s, others <2.5s
├─ /contacto-specific issue (heavy content? maps?)
├─ Phase 6: Targeted optimization
└─ Expected: < 1 hour targeted fix

Scenario C: Mixed - some fast, some slow
├─ Different pages have different issues
├─ Phase 6: Page-by-page optimization
└─ Expected: 3-4 hours mixed improvements
```

### Critical Questions Answered After Testing
```
1. Is the Google Font issue global? (Does it affect all pages?)
2. Are third-party scripts blocking ALL pages?
3. Do category pages perform differently than detail pages?
4. Is dynamic loading helping (PropertyGrid faster loaded)?
5. What's the performance baseline for each page type?
```

---

## 🚀 GET STARTED NOW

**Step 1:** Open DevTools (F12)  
**Step 2:** Go to Performance tab  
**Step 3:** Set to Fast 4G + Disable cache  
**Step 4:** Navigate to `/`  
**Step 5:** Record and measure  
**Step 6:** Document results  

**Repeat for pages 3-6**

→ In 40 minutes you'll have complete baseline! ✅

---

## 💡 Tips for Success

1. **Be consistent:** Same throttling (Fast 4G) for all pages
2. **Cold cache:** Always disable cache per test
3. **Clean runs:** Close other tabs making network requests
4. **Take notes:** Write down unusual observations
5. **Compare:** Note which pages are faster/slower

---

**Status:** Ready to test! Go to Step 1 above 🚀

*Protocol created: March 12, 2026*
