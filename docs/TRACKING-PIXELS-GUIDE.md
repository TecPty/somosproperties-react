# 🎯 Configuración de Píxeles Adicionales: TikTok, Google Ads y LinkedIn

## 📱 Píxeles Instalados

Tu sitio ahora está preparado para rastrear en:
- ✅ Meta Pixel (Facebook/Instagram) - Ya configurado
- ✅ Google Analytics 4 - Ya configurado
- 🔵 **TikTok Pixel** - Por configurar
- 🟢 **Google Ads** - Por configurar
- 🔵 **LinkedIn Insight Tag** - Por configurar

---

## 1️⃣ TIKTOK PIXEL

### ¿Para qué sirve?
- Crear audiencias de visitantes del sitio
- Remarketing en TikTok
- Optimizar campañas publicitarias
- Medir conversiones (contactos, leads)

### Cómo Obtener el Pixel ID:

1. **Ve a:** https://ads.tiktok.com/
2. Inicia sesión con tu cuenta empresarial de TikTok
3. En el menú, ve a **"Assets"** (Activos) → **"Events"** (Eventos)
4. Haz clic en **"Manage"** (Administrar)
5. Haz clic en **"Create Pixel"** (Crear Píxel)
6. Dale un nombre: **"SOMOS Properties Website"**
7. Selecciona **"TikTok Pixel"**
8. Elige **"Manually Install Pixel Code"** (Instalación manual)
9. Copia el **Pixel ID** (es un código alfanumérico)
   - Ejemplo: `C9BF7EMQHC1234ABCD`

### Configurar en el Proyecto:

**Archivo: `.env.local`**
```env
NEXT_PUBLIC_TIKTOK_PIXEL_ID=TU_PIXEL_ID_AQUI
```

**En Vercel:**
- Settings → Environment Variables
- Name: `NEXT_PUBLIC_TIKTOK_PIXEL_ID`
- Value: Tu Pixel ID de TikTok

### Eventos que se Rastrean:
- ✅ PageView - Cada visita a cualquier página
- ✅ Contact - Clics en WhatsApp

---

## 2️⃣ GOOGLE ADS CONVERSION TRACKING

### ¿Para qué sirve?
- Medir ROI de campañas de Google Ads
- Optimizar pujas automáticamente
- Rastrear conversiones (llamadas, contactos, formularios)
- Remarketing en Google Display Network y YouTube

### Cómo Obtener el Conversion ID:

1. **Ve a:** https://ads.google.com/
2. Inicia sesión con tu cuenta de Google Ads
3. En el menú superior, haz clic en **"Tools & Settings"** (Herramientas y configuración) ⚙️
4. En "Measurement", selecciona **"Conversions"** (Conversiones)
5. Haz clic en el botón **"+ New conversion action"** (Nueva acción de conversión)
6. Selecciona **"Website"**
7. Configura:
   - Category: **Contact** (para WhatsApp) o **Submit lead form**
   - Conversion name: **"WhatsApp Contact"**
   - Value: Puedes asignar un valor o dejarlo variable
   - Click en **"Create and continue"**
8. Selecciona **"Use Google Tag Manager"** o **"Install the tag yourself"**
9. Verás tu **Conversion ID** en formato: **`AW-XXXXXXXXXX`**
10. También verás un **Conversion Label** que necesitarás

### Configurar en el Proyecto:

**Archivo: `.env.local`**
```env
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXXX
```

**En Vercel:**
- Settings → Environment Variables
- Name: `NEXT_PUBLIC_GOOGLE_ADS_ID`
- Value: AW-XXXXXXXXXX

### Eventos que se Rastrean:
- ✅ contact - Clics en WhatsApp

### Nota Importante:
Para rastrear conversiones específicas, necesitas el **Conversion Label**. Guárdalo para configuraciones futuras.

---

## 3️⃣ LINKEDIN INSIGHT TAG

### ¿Para qué sirve?
- Rastrear visitantes profesionales
- Crear audiencias B2B
- Remarketing en LinkedIn
- Medir conversiones de campañas LinkedIn
- Demografía profesional (títulos de trabajo, empresas, industrias)

### Cómo Obtener el Partner ID:

1. **Ve a:** https://www.linkedin.com/campaignmanager/
2. Inicia sesión con tu cuenta de LinkedIn empresarial
3. Selecciona tu cuenta publicitaria (o crea una)
4. En el menú izquierdo, ve a **"Account Assets"** (Activos de cuenta)
5. Haz clic en **"Insight Tag"**
6. Haz clic en **"Install my Insight Tag"**
7. Verás tu **Partner ID** (es un número de 6-7 dígitos)
   - Ejemplo: `1234567`
8. Selecciona **"I will use a tag manager"**
9. Copia el **Partner ID**

### Configurar en el Proyecto:

**Archivo: `.env.local`**
```env
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=1234567
```

**En Vercel:**
- Settings → Environment Variables
- Name: `NEXT_PUBLIC_LINKEDIN_PARTNER_ID`
- Value: Tu Partner ID (solo números)

### Eventos que se Rastrean:
- ✅ PageView - Automático en todas las páginas
- ✅ contact_whatsapp - Clics en WhatsApp

---

## 🚀 CONFIGURACIÓN COMPLETA

### Paso 1: Obtener los IDs

Completa esta tabla con tus IDs:

| Plataforma | ID | Estado |
|------------|----| -------|
| Meta Pixel | `1645930442472719` | ✅ Configurado |
| Google Analytics | `G-JDG8E6N9M9` | ✅ Configurado |
| TikTok Pixel | `____________` | ⏳ Pendiente |
| Google Ads | `AW-__________` | ⏳ Pendiente |
| LinkedIn | `____________` | ⏳ Pendiente |

### Paso 2: Actualizar .env.local

Edita el archivo `.env.local` y reemplaza los valores:

```env
NEXT_PUBLIC_TIKTOK_PIXEL_ID=TU_ID_AQUI
NEXT_PUBLIC_GOOGLE_ADS_ID=TU_ID_AQUI
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=TU_ID_AQUI
```

### Paso 3: Configurar en Vercel (IMPORTANTE)

Para que funcione en producción:

1. Ve a: https://vercel.com/
2. Selecciona tu proyecto
3. Settings → Environment Variables
4. Agrega estas 3 variables:

```
NEXT_PUBLIC_TIKTOK_PIXEL_ID = TU_PIXEL_ID
NEXT_PUBLIC_GOOGLE_ADS_ID = AW-XXXXXXXXXX
NEXT_PUBLIC_LINKEDIN_PARTNER_ID = 1234567
```

5. Marca las 3 opciones: Production, Preview, Development
6. **Redeploy** el proyecto

### Paso 4: Verificar que Funcionan

#### TikTok:
1. Visita tu sitio web
2. Ve a TikTok Ads Manager → Events → Tu Píxel
3. En la pestaña "Test Events", deberías ver eventos llegando

#### Google Ads:
1. Google Ads → Tools → Conversions
2. Verás el estado del tag (puede tardar 24 horas)
3. Usa Chrome Extension: "Google Tag Assistant" para verificar

#### LinkedIn:
1. LinkedIn Campaign Manager → Insight Tag
2. Haz clic en "See Tag Status"
3. Deberías ver "Active" después de visitar tu sitio

---

## 📊 ¿Qué Puedes Hacer Ahora?

### Con TikTok Pixel:
- ✅ Crear audiencias de visitantes
- ✅ Remarketing en TikTok
- ✅ Optimizar campañas para contactos
- ✅ Rastrear qué anuncios generan más visitas

### Con Google Ads:
- ✅ Medir ROI de campañas de búsqueda
- ✅ Remarketing en YouTube y Display Network
- ✅ Optimización automática de pujas
- ✅ Rastrear qué palabras clave convierten

### Con LinkedIn:
- ✅ Audiencias B2B (ejecutivos, profesionales)
- ✅ Remarketing profesional
- ✅ Demografía laboral (industria, cargo, empresa)
- ✅ Lead Gen Forms de LinkedIn

---

## 🎯 Eventos Personalizados Disponibles

Los siguientes eventos ya están configurados en tu sitio:

### Para Todas las Plataformas:
- ✅ **PageView** - Visitas a páginas
- ✅ **Contact (WhatsApp)** - Clics en botón de WhatsApp

### Eventos Preparados (que puedo activar):
- 📋 **ViewContent** - Ver detalles de propiedad
- 🔍 **Search** - Buscar/filtrar propiedades
- 📝 **Lead** - Enviar formulario de contacto
- 📞 **Contact (Phone)** - Clic en teléfono
- 💰 **InitiateCheckout** - Interés en propiedad premium

---

## 💡 Mejores Prácticas

### ✅ HACER:
- Configurar los 3 píxeles (más datos = mejor targeting)
- Crear audiencias de 30, 60 y 90 días
- Excluir a quienes ya contactaron
- Usar Lookalike Audiences
- Monitorear eventos semanalmente

### ❌ NO HACER:
- No compartas tus IDs públicamente
- No uses el mismo píxel en múltiples sitios
- No ignores los datos - úsalos para optimizar
- No olvides configurar en Vercel (no solo .env.local)

---

## 🆘 Solución de Problemas

**No veo eventos en TikTok:**
- Espera 15-30 minutos después de la primera visita
- Verifica que el ID no tenga espacios
- Asegúrate de haber hecho Redeploy en Vercel

**Google Ads no rastrea:**
- El Conversion ID debe empezar con "AW-"
- Puede tardar hasta 24 horas en aparecer
- Verifica en Google Tag Assistant

**LinkedIn no funciona:**
- El Partner ID debe ser solo números
- Verifica el estado en Campaign Manager
- LinkedIn puede tardar 48 horas en mostrar datos

---

## 📞 Necesitas Ayuda?

Si tienes problemas obteniendo alguno de estos IDs o configurándolos, avísame y te ayudo paso a paso con capturas de pantalla.

---

## 🔗 Enlaces Útiles

- **TikTok Ads:** https://ads.tiktok.com/
- **Google Ads:** https://ads.google.com/
- **LinkedIn Campaign Manager:** https://www.linkedin.com/campaignmanager/
- **Google Tag Assistant:** https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk

---

**Una vez que tengas los 3 IDs, envíamelos para verificar que todo esté correcto.** 🚀
