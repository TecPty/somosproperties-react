# 🚀 Configuración Rápida de Google Analytics 4

## ✅ Instalación Completada

Google Analytics 4 ya está instalado en el proyecto. Solo necesitas obtener tu ID de medición.

---

## 📋 Pasos para Activar Google Analytics (5 minutos)

### Paso 1: Crear/Acceder a tu cuenta de Google Analytics

1. **Ve a:** https://analytics.google.com/
2. **Inicia sesión** con tu cuenta de Google de la oficina
3. Si ya tienes Google Analytics:
   - Haz clic en el ícono de engranaje ⚙️ (abajo a la izquierda)
   - Selecciona tu cuenta o crea una nueva

### Paso 2: Crear una Nueva Propiedad

1. En el panel de Administrador, haz clic en **"Crear propiedad"**
2. Completa la información:
   ```
   Nombre de la propiedad: SOMOS Properties Website
   Zona horaria: (GMT-05:00) Hora estándar del Este (Panamá)
   Moneda: USD - Dólar estadounidense
   ```
3. Haz clic en **"Siguiente"**
4. Selecciona la categoría: **"Inmobiliaria"**
5. Selecciona objetivos de negocio (opcional)
6. Haz clic en **"Crear"**
7. Acepta los términos de servicio

### Paso 3: Configurar Flujo de Datos Web

1. Selecciona plataforma: **"Web"**
2. Completa:
   ```
   URL del sitio web: https://www.somosproperties.com
   Nombre del flujo: Sitio Web Principal
   ```
3. **Habilitar la medición mejorada** (recomendado) ✅
4. Haz clic en **"Crear flujo"**

### Paso 4: Obtener tu ID de Medición

Después de crear el flujo, verás una pantalla con:

```
ID DE MEDICIÓN
G-XXXXXXXXXX
```

**Copia este ID** (formato: G- seguido de números y letras)

---

## ⚙️ Configurar en el Proyecto

### Opción A: Archivo .env.local (Desarrollo)

1. Abre el archivo `.env.local` en la raíz del proyecto
2. Reemplaza `G-XXXXXXXXXX` con tu ID real:
   ```env
   NEXT_PUBLIC_GA_ID=G-TU-ID-AQUI
   ```
3. Guarda el archivo

### Opción B: Variables de Entorno en Vercel (Producción)

1. Ve a: https://vercel.com/
2. Selecciona tu proyecto `somosproperties-react`
3. Ve a **Settings** → **Environment Variables**
4. Agrega una nueva variable:
   ```
   Name: NEXT_PUBLIC_GA_ID
   Value: G-TU-ID-AQUI
   Environment: Production, Preview, Development
   ```
5. Haz clic en **"Save"**
6. **Redeploy** el proyecto para que tome efecto

---

## ✅ Verificar que Funciona

### 1. Verificación en Tiempo Real (Inmediata)

1. Ve a Google Analytics
2. En el menú izquierdo: **Informes** → **Tiempo real**
3. Abre tu sitio web: https://www.somosproperties.com
4. Deberías ver tu visita aparecer en el mapa en tiempo real ✅

### 2. Verificación Técnica

1. Abre tu sitio web
2. Presiona `F12` para abrir las herramientas de desarrollador
3. Ve a la pestaña **"Network"** (Red)
4. Busca peticiones a `google-analytics.com` o `analytics`
5. Si ves peticiones, ¡está funcionando! ✅

---

## 📊 Qué Podrás Ver en Google Analytics

### Datos Inmediatos (Tiempo Real):
- 👥 Usuarios activos ahora
- 📍 De qué ciudades están visitando
- 📄 Qué páginas están viendo
- 📱 Qué dispositivos usan

### Datos Históricos (24-48 horas):
- 📈 Visitantes por día/semana/mes
- 🌍 Países y ciudades de origen
- 🔍 Cómo te encontraron (Google, redes sociales, directo)
- 📊 Páginas más visitadas
- ⏱️ Tiempo promedio en sitio
- 📱 Dispositivos (móvil, desktop, tablet)
- 🔄 Tasa de rebote
- 🎯 Conversiones y eventos

### Eventos Automáticos que se Rastrean:
- ✅ Clics en enlaces externos
- ✅ Descargas de archivos
- ✅ Scroll en páginas
- ✅ Búsquedas en el sitio
- ✅ Reproducción de videos
- ✅ Interacciones con formularios

---

## 🎯 Eventos Personalizados para Propiedades

Si quieres rastrear acciones específicas, puedo agregar:

1. **Clic en botón WhatsApp** - Ver cuántos contactan por WhatsApp
2. **Ver detalles de propiedad** - Qué propiedades interesan más
3. **Filtrar propiedades** - Qué buscan los usuarios
4. **Enviar formulario de contacto** - Cuántos leads generas
5. **Clic en teléfono** - Rastrear llamadas
6. **Compartir propiedad** - Viralidad

**¿Quieres que implemente alguno de estos?**

---

## 💡 Tips Importantes

### ✅ HACER:
- Revisar Google Analytics semanalmente
- Configurar objetivos de conversión (WhatsApp, formularios)
- Usar datos para mejorar propiedades más vistas
- Monitorear de dónde viene el tráfico

### ❌ NO HACER:
- No compartas tu ID de Google Analytics públicamente
- No uses el mismo ID en múltiples sitios diferentes
- No ignores los datos - úsalos para mejorar

---

## 🆘 Solución de Problemas

**No veo datos en tiempo real:**
- ✅ Verifica que guardaste el ID correcto en `.env.local`
- ✅ Reinicia el servidor de desarrollo (`pnpm dev`)
- ✅ Limpia caché del navegador
- ✅ Verifica que el ID empiece con `G-`

**Los datos no aparecen después de 24 horas:**
- ✅ Verifica en Vercel que la variable de entorno esté configurada
- ✅ Haz un nuevo deploy en Vercel
- ✅ Revisa la consola del navegador por errores

**Veo mi propia visita todo el tiempo:**
- Esto es normal. Puedes filtrar tu IP en configuración de GA4
- O usa una extensión de Chrome para bloquear GA en desarrollo

---

## 📞 ¿Necesitas Ayuda?

Si tienes problemas configurando Google Analytics, avísame y te ayudo paso a paso. 

**Recuerda:** Google Analytics 4 es 100% GRATIS, no necesitas pagar nada. ✅

---

## 🔗 Enlaces Útiles

- Google Analytics: https://analytics.google.com/
- Documentación GA4: https://support.google.com/analytics/answer/9306384
- Academia de Analytics: https://analytics.google.com/analytics/academy/
