# Configuración de Google Maps API

## 📍 Para qué sirve

La API de Google Maps permite mostrar mapas interactivos con la ubicación de cada propiedad en la página de detalles.

**Sin API key**: Se muestra un mensaje genérico "Mapa de ubicación disponible próximamente"
**Con API key**: Se muestra un mapa interactivo incrustado

---

## 🔑 Cómo obtener tu API Key (GRATIS)

### 1. Accede a Google Cloud Console
Visita: https://console.cloud.google.com/

### 2. Crea un nuevo proyecto
- Click en el selector de proyectos (arriba a la izquierda)
- Click en "Nuevo Proyecto"
- Nombre: `Somos Properties` (o el que prefieras)
- Click en "Crear"

### 3. Habilita la API de Maps Embed
- En el menú lateral, ve a **APIs y servicios** → **Biblioteca**
- Busca: `Maps Embed API`
- Click en la API y luego en **HABILITAR**

### 4. Crea las credenciales
- Ve a **APIs y servicios** → **Credenciales**
- Click en **+ CREAR CREDENCIALES** → **Clave de API**
- Se generará tu API Key automáticamente

### 5. Restringe la API Key (IMPORTANTE para seguridad)
- Click en el nombre de tu API key recién creada
- En **Restricciones de aplicación**:
  - Selecciona: **Referentes HTTP (sitios web)**
  - Agrega estos referentes:
    ```
    localhost:3000/*
    localhost:3001/*
    *.vercel.app/*
    tudominio.com/*
    ```
- En **Restricciones de API**:
  - Selecciona: **Restringir clave**
  - Marca solo: **Maps Embed API**
- Click en **GUARDAR**

### 6. Agrega la API Key al proyecto
Edita el archivo `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_MAPS_KEY=TU_API_KEY_AQUI
```

### 7. Reinicia el servidor
```cmd
# Detener con Ctrl + C
pnpm dev
```

---

## 💰 Costos

Google Maps ofrece **$200 USD de crédito gratis por mes**, que equivale a:
- **~28,000 cargas de mapa** por mes
- Más que suficiente para un sitio de bienes raíces

**Facturación**: Aunque te pide una tarjeta de crédito, NO te cobrarán si te mantienes dentro del crédito gratuito.

---

## 🔒 Mejores Prácticas de Seguridad

✅ **SIEMPRE** restringe tu API key por:
- Dominio (HTTP Referrer)
- API específica (solo Maps Embed API)

❌ **NUNCA**:
- Compartas tu API key públicamente
- La subas a GitHub sin restricciones
- Habilites APIs innecesarias

---

## 🧪 Verificar que funciona

1. Abre cualquier propiedad: http://localhost:3000/propiedad/25
2. Desplázate a la sección "Ubicación"
3. Deberías ver un mapa interactivo de Google Maps

---

## ❓ Solución de Problemas

### Error: "This page can't load Google Maps correctly"
- Verifica que Maps Embed API esté habilitada
- Revisa que la API key esté correcta en `.env.local`
- Confirma que `localhost:3000` esté en los referentes permitidos

### El mapa no se muestra
- Reinicia el servidor después de agregar la API key
- Abre la consola del navegador (F12) para ver errores
- Verifica que NEXT_PUBLIC_GOOGLE_MAPS_KEY tenga el prefijo correcto

### "Quota exceeded"
- Has superado los $200 USD gratis/mes
- Revisa el uso en: https://console.cloud.google.com/billing
- Considera agregar caché o limitar cargas

---

## 📚 Documentación Oficial

- [Maps Embed API](https://developers.google.com/maps/documentation/embed/get-started)
- [API Key Best Practices](https://developers.google.com/maps/api-security-best-practices)
- [Pricing Calculator](https://mapsplatform.google.com/pricing/)
