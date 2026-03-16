# Image Assets Organization Guide
**Last Updated:** March 16, 2026  
**Status:** ✅ Migrated to standardized structure

---

## 📁 Standard Folder Structure

Every property follows this consistent structure:

```
/public/images/properties/[property-slug]/
├── hero/              # Main/featured images (portada, principal)
├── gallery/           # General interior/unit photos
│   └── [unit-id]/     # Optional: specific unit galleries
├── amenities/         # Shared facilities (pool, gym, lobby, etc.)
├── floorplans/        # Architectural floor plans
├── promotional/       # Marketing materials (flyers, banners)
│   ├── desktop/       # Desktop-optimized promos
│   └── mobile/        # Mobile-optimized promos
└── exterior/          # External views, facades, location shots
```

---

## 📋 Naming Conventions

### File Names
- **Format:** `[category]-[descriptor]-[number].webp`
- **Case:** kebab-case (lowercase with hyphens)
- **Examples:**
  ```
  hero-main.webp
  hero-night-view.webp
  gallery-living-room-1.webp
  amenity-pool-aerial.webp
  floorplan-unit-a104.webp
  promo-march-desktop.png
  exterior-facade-main.webp
  ```

### Folder Names
- **Always in English** for international compatibility
- **Consistent across all properties**
- **No spaces, use hyphens**

---

## 🔄 Migration Map (Old → New)

| Old Name | New Name | Purpose |
|----------|----------|---------|
| `planos/` | `floorplans/` | Architectural plans |
| `locales-comerciales/` | `gallery/` | Commercial unit photos |
| `interiores/` | `gallery/` | Interior photos |
| `general/` | `hero/` | Main/hero images |
| `flyers/` | `promotional/` | Marketing materials |
| `exteriores/` | `exterior/` | External views |
| `vistas/` | `exterior/` | External vistas |

---

## 🎯 Best Practices

### 1. Image Optimization
- **Format:** WebP preferred (PNG for promotional with transparency)
- **Quality:** 75-85 for photos, 90 for promotional
- **Sizes:**
  - Hero: 1920x1080 max
  - Gallery: 1200x800 max
  - Thumbnails: 400x300 max
  - Promotional desktop: 1200x800
  - Promotional mobile: 800x1200

### 2. Organization by Unit
For properties with multiple units (e.g., Pacific Point):
```
gallery/
├── unit-236/
│   ├── gallery-living-room.webp
│   ├── gallery-bedroom-1.webp
│   └── gallery-kitchen.webp
└── unit-240/
    ├── gallery-living-room.webp
    └── gallery-bedroom-1.webp
```

### 3. Promotional Assets
```
promotional/
├── desktop/
│   ├── promo-march-2026.png
│   └── promo-special-offer.png
└── mobile/
    ├── promo-march-2026.png
    └── promo-special-offer.png
```

---

## 📝 Usage in Code

### Referencing Images in properties.json
```json
{
  "id": 32,
  "title": "Balboa Boutiques - Local A-104",
  "image": "/images/properties/balboa-boutique/hero/hero-1.webp",
  "images": [
    "/images/properties/balboa-boutique/hero/hero-1.webp",
    "/images/properties/balboa-boutique/gallery/gallery-interior-1.webp",
    "/images/properties/balboa-boutique/amenities/amenity-terrace.webp"
  ],
  "planos": [
    "/images/properties/balboa-boutique/floorplans/floorplan-level-100.webp"
  ],
  "promo": {
    "desktop": "/images/properties/balboa-boutique/promotional/desktop/promo-march.png",
    "mobile": "/images/properties/balboa-boutique/promotional/mobile/promo-march.png"
  }
}
```

### Using in Components
```typescript
import OptimizedImage from "@/components/optimized-image"

// Hero image
<OptimizedImage 
  src="/images/properties/balboa-boutique/hero/hero-1.webp"
  alt="Balboa Boutiques main view"
  type="hero"
/>

// Promotional flyer
<img 
  src="/images/properties/balboa-boutique/promotional/desktop/promo-march.png"
  className="hidden md:block"
/>
<img 
  src="/images/properties/balboa-boutique/promotional/mobile/promo-march.png"
  className="md:hidden"
/>
```

---

## ✅ Migration Checklist

- [x] Backup created (`/backups/images-[timestamp]/`)
- [x] Folders renamed according to standard
- [x] properties.json paths updated
- [x] Standard folders created for all properties
- [x] Empty folders preserved with .gitkeep
- [ ] Build validated (`npm run build`)
- [ ] Images loading correctly in browser
- [ ] Promotional modals tested
- [ ] Git commit with migration changes

---

## 🚨 Rollback Instructions

If migration causes issues:

```powershell
# 1. Restore from backup
$timestamp = "YYYYMMDD-HHMMSS"  # Replace with your backup timestamp
Copy-Item -Path "backups/images-$timestamp/*" -Destination "public/images/properties/" -Recurse -Force
Copy-Item -Path "backups/properties-$timestamp.json" -Destination "data/properties.json" -Force

# 2. Rebuild
npm run build
```

---

## 📞 Support

For questions or issues with the image structure:
- Check migration logs in terminal output
- Verify backup exists before making changes
- Test in development before deploying

**Last Migration:** Run with `/scripts/migrate-images-structure.ps1`
