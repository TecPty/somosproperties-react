# 🏢 SOMOS Properties - Plataforma Inmobiliaria

[![Next.js](https://img.shields.io/badge/Next.js-15.x-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Plataforma web moderna para la gestión y visualización de propiedades inmobiliarias en Panamá. Construida con Next.js 15, TypeScript y Tailwind CSS.

---

## 🚀 Características Principales

### 🏠 Gestión de Propiedades
- **139 propiedades** en inventario (92.8% con imágenes completas)
- Categorías: Residenciales, Comerciales, Premium
- Operaciones: Venta y Alquiler
- Búsqueda avanzada con filtros (ubicación, precio, tipo, características)
- Paginación y ordenamiento dinámico

### 🎨 Interfaz de Usuario
- ✅ Diseño responsive (mobile-first)
- ✅ Modo oscuro/claro con `next-themes`
- ✅ Animaciones suaves y transiciones
- ✅ Lazy loading de imágenes con `next/image`
- ✅ Skeleton loaders para mejor UX

### 📊 Analytics & Marketing
- ✅ **Google Analytics** integrado
- ✅ **Facebook Pixel** con eventos personalizados:
  - `ViewContent` (ver propiedad)
  - `Search` (búsquedas)
  - `Contact` (contactos)
  - `Lead` (formularios)
- ✅ **Vercel Analytics** para métricas de rendimiento
- ✅ **Sistema de Consentimiento GDPR/CCPA** ⚡ NUEVO

### 🔒 Privacidad y Seguridad
- ✅ Banner de consentimiento de cookies (GDPR compliant)
- ✅ API Routes securizadas para Google Maps
- ✅ Variables de entorno protegidas
- ✅ Validación de orígenes (CSRF protection)

### 🗺️ Mapas y Ubicación
- ✅ Integración con Google Maps API
- ✅ Mapas embebidos por propiedad
- ✅ API key protegida en servidor (no expuesta en cliente)

### 📱 Páginas y Rutas

```
/                          → Home (hero, búsqueda, destacados)
/propiedades              → Listado completo con filtros
/residenciales            → Propiedades residenciales
/comerciales              → Propiedades comerciales
/premium                  → Propiedades premium (multi-idioma próximamente)
/propiedad/[id]           → Detalle de propiedad individual
/nosotros                 → Quiénes somos
/contacto                 → Formulario de contacto
/blog                     → Blog (en desarrollo)
```

---

## 📦 Estructura del Proyecto

```
somosproperties-react/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Layout global con metadata
│   ├── page.tsx                # Home page
│   ├── propiedades/            # Listado de propiedades
│   ├── residenciales/          # Categoría residencial
│   ├── comerciales/            # Categoría comercial
│   ├── premium/                # Sección premium
│   ├── propiedad/[id]/         # Página dinámica de propiedad
│   ├── nosotros/               # Acerca de
│   ├── contacto/               # Contacto
│   ├── blog/                   # Blog
│   └── api/
│       └── maps/
│           └── embed/          # API para Google Maps
│
├── components/                 # Componentes React
│   ├── navbar.tsx              # Navegación principal
│   ├── footer.tsx              # Pie de página
│   ├── property-card.tsx       # Card de propiedad
│   ├── property-grid.tsx       # Grid de propiedades
│   ├── property-filters.tsx    # Filtros de búsqueda
│   ├── property-details.tsx    # Detalle completo de propiedad
│   ├── property-map.tsx        # Componente de mapa (NUEVO)
│   ├── search-bar.tsx          # Barra de búsqueda
│   ├── contact-form.tsx        # Formulario de contacto
│   ├── pagination.tsx          # Paginación
│   ├── consent-banner.tsx      # Banner de cookies (NUEVO)
│   ├── theme-provider.tsx      # Proveedor de tema
│   └── ui/                     # Componentes UI de shadcn/ui
│
├── lib/                        # Utilidades y lógica de negocio
│   ├── types.ts                # Tipos TypeScript
│   ├── properties.ts           # Funciones de propiedades
│   ├── formatters.ts           # Formateadores (precio, fecha)
│   ├── seo.ts                  # Utilidades SEO
│   ├── facebook-pixel.ts       # Facebook Pixel con GDPR (ACTUALIZADO)
│   ├── google-analytics.ts     # Google Analytics
│   ├── useConsentManager.ts    # Hook de consentimiento (NUEVO)
│   └── utils.ts                # Utilidades generales
│
├── hooks/                      # Custom React Hooks
│   ├── use-properties.ts       # Hook de propiedades (filtros, paginación)
│   ├── use-filters.ts          # Hook de filtros
│   └── use-mobile.ts           # Detección mobile
│
├── data/
│   └── properties.json         # Base de datos de propiedades (139 items)
│
├── public/
│   ├── images/
│   │   ├── Logo-SP.png         # Logo principal
│   │   ├── hero-poster.webp    # Hero image
│   │   ├── nosotros/           # Imágenes "Nosotros"
│   │   ├── properties/         # Imágenes de propiedades (por carpeta)
│   │   └── icons/              # Iconos 3D
│   └── videos/
│       └── hero-video-desktop_webm.webm
│
├── docs/                       # Documentación
│   ├── GOOGLE_MAPS_SETUP.md
│   ├── daily-*.md
│   └── ...
│
├── next.config.mjs             # Configuración Next.js
├── tailwind.config.ts          # Configuración Tailwind
├── tsconfig.json               # Configuración TypeScript
└── package.json                # Dependencias
```

---

## 🛠️ Stack Tecnológico

### Core
- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript 5.x
- **Styling:** Tailwind CSS 3.x
- **UI Components:** Radix UI + shadcn/ui

### Librerías Principales
- **Iconos:** Lucide React
- **Temas:** next-themes
- **Analytics:** @vercel/analytics
- **Formularios:** React Hook Form (recomendado)
- **Validación:** Zod (recomendado)

### APIs y Servicios
- Google Maps Embed API
- Facebook Pixel API
- Vercel Analytics

---

## 🚀 Instalación y Desarrollo

### Requisitos Previos
- Node.js 18.x o superior
- npm/yarn/pnpm
- Git

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/somosproperties-react.git
cd somosproperties-react
```

### 2. Instalar Dependencias
```bash
npm install
# o
yarn install
# o
pnpm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Google Maps API (PRIVADA - no exponer en cliente)
GOOGLE_MAPS_API_KEY=tu_google_maps_api_key_aqui

# Meta/Facebook Pixel ID (PÚBLICA)
NEXT_PUBLIC_META_PIXEL_ID=tu_pixel_id_aqui

# URL del sitio (producción)
NEXT_PUBLIC_SITE_URL=https://www.somosproperties.com

# Vercel Analytics (opcional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=tu_vercel_analytics_id
```

### 4. Ejecutar en Desarrollo
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### 5. Build para Producción
```bash
npm run build
npm run start
```

---

## 📊 Scripts Disponibles

```json
{
  "dev": "next dev",              // Desarrollo local
  "build": "next build",          // Build de producción
  "start": "next start",          // Servir build
  "lint": "next lint",            // Linter ESLint
  "type-check": "tsc --noEmit"    // Validar TypeScript
}
```

---

## 🎯 Características Implementadas Recientemente

### ✅ Sistema de Consentimiento GDPR (Fase A - Completado)
- [x] Hook `useConsentManager()` para gestión de cookies
- [x] Banner de consentimiento multiidioma (español base)
- [x] Refactor de Facebook Pixel con respeto a consentimiento
- [x] API securizada para Google Maps (`/api/maps/embed`)
- [x] Componente `<PropertyMap />` con API key protegida
- [x] Almacenamiento de preferencias en localStorage
- [x] Eventos personalizados para cambios de consentimiento

### 🔄 En Desarrollo
- [ ] Multi-idiomas con `next-intl` (español, inglés, francés, chino)
- [ ] Migración a rutas `/[locale]/...`
- [ ] Diccionarios de traducción JSON
- [ ] Metadata SEO dinámicas mejoradas
- [ ] Sitemap.xml automático
- [ ] Robots.txt optimizado
- [ ] JSON-LD para propiedades (Schema.org)

---

## 🗺️ Roadmap

### Prioridad 1: Privacidad y Seguridad ✅ COMPLETADO
- [x] Sistema de consentimiento GDPR
- [x] Securizar Google Maps API
- [x] Refactor Facebook Pixel

### Prioridad 2: SEO y Metadata 🔄 EN PROGRESO
- [ ] generateMetadata() en todas las rutas dinámicas
- [ ] Sitemap.xml automático
- [ ] Robots.txt
- [ ] Canonical URLs
- [ ] Open Graph completo
- [ ] JSON-LD para propiedades

### Prioridad 3: Multi-idiomas 📅 PRÓXIMO
- [ ] Instalar y configurar `next-intl`
- [ ] Crear diccionarios (es, en, fr, zh)
- [ ] Migrar rutas a `/[locale]/`
- [ ] Selector de idioma en navbar
- [ ] SEO multi-idioma (hreflang)

### Prioridad 4: Performance y Optimización
- [ ] Optimizar imágenes (WebP, AVIF)
- [ ] Video hero en MP4 (fallback Safari)
- [ ] Code splitting avanzado
- [ ] ISR para propiedades populares
- [ ] Service Worker (PWA)

### Prioridad 5: Testing y QA
- [ ] Unit tests (Vitest)
- [ ] E2E tests (Playwright)
- [ ] Lighthouse CI
- [ ] Accessibility audit (axe-core)

---

## 📈 Métricas del Proyecto

### Inventario de Propiedades
- **Total:** 139 propiedades
- **Completas:** 129 (92.8%)
- **Incompletas:** 10 (7.2%)

### Categorías
- Residenciales
- Comerciales
- Premium

### Distritos Cubiertos
- Panamá
- San Miguelito
- Arraiján
- La Chorrera
- Colón
- David (Chiriquí)
- Y más...

---

## 🤝 Contribución

### Flujo de Trabajo
1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

### Convenciones de Código
- **TypeScript strict mode** activado
- **ESLint** para linting
- **Prettier** para formateo (recomendado)
- **Conventional Commits** para mensajes

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## 📞 Contacto y Soporte

- **Website:** [https://www.somosproperties.com](https://www.somosproperties.com)
- **Email:** info@somosproperties.com
- **WhatsApp:** +507 XXXX-XXXX
- **Instagram:** [@SomosProperties](https://instagram.com/SomosProperties)
- **Facebook:** [SOMOS Properties](https://facebook.com/SomosProperties)

---

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) - Framework React
- [Vercel](https://vercel.com/) - Deployment y hosting
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI
- [Lucide](https://lucide.dev/) - Iconos
- Comunidad Open Source

---

## 📝 Notas de Desarrollo

### Auditoría Completada (Fase 1)
Se realizó una auditoría completa el 2 de febrero de 2026:
- ✅ Estructura Next.js mapeada
- ✅ Componentes core identificados
- ✅ Problemas de seguridad detectados y resueltos
- ✅ Inventario de propiedades validado
- ✅ Roadmap de mejoras establecido

### Cambios Recientes (Fase 2A)
- Implementación de sistema de consentimiento GDPR
- Securización de API keys (Google Maps)
- Refactor de tracking pixels con respeto a privacidad
- Creación de componentes reutilizables para mapas

---

**Última actualización:** 2 de febrero de 2026  
**Versión:** 1.0.0  
**Estado:** En Desarrollo Activo 🚀
