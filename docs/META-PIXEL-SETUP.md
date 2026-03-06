# 📱 Guía Paso a Paso: Crear Meta Pixel (Facebook/Instagram)

## 🎯 ¿Qué vas a lograr?

Con Meta Pixel podrás:
- 👥 Rastrear visitantes de tu sitio web
- 🎯 Crear audiencias para remarketing
- 📊 Medir conversiones (contactos, formularios)
- 💰 Optimizar tus anuncios de Facebook/Instagram

---

## 📋 PASO 1: Acceder a Meta Business Suite

1. **Ve a:** https://business.facebook.com/
2. **Inicia sesión** con tu cuenta de Facebook empresarial
   - Si no tienes cuenta empresarial, usa tu cuenta personal de Facebook

3. **Si es tu primera vez:**
   - Te pedirá crear una "Cuenta Comercial"
   - Dale un nombre: **"SOMOS Properties"**
   - Completa la información básica

---

## 📋 PASO 2: Ir a Administrador de Eventos

Una vez dentro de Business Suite:

1. Haz clic en el **menú de hamburguesa** (☰) arriba a la izquierda
2. Busca y haz clic en **"Todos las herramientas"** o **"All Tools"**
3. En la lista, busca y selecciona:
   - **"Administrador de eventos"** o
   - **"Events Manager"**

**Atajo directo:** https://business.facebook.com/events_manager2

---

## 📋 PASO 3: Crear un Píxel

En el Administrador de Eventos:

1. Haz clic en el botón verde **"Conectar orígenes de datos"** o **"Connect Data Sources"**
   
2. Selecciona **"Web"**

3. Haz clic en **"Conectar"** o **"Connect"**

4. Selecciona **"Meta Pixel"**

5. Haz clic en **"Conectar"** nuevamente

---

## 📋 PASO 4: Configurar el Píxel

1. **Dale un nombre a tu píxel:**
   ```
   SOMOS Properties Website
   ```

2. **URL del sitio web (opcional):**
   ```
   https://www.somosproperties.com
   ```

3. Haz clic en **"Crear píxel"** o **"Create Pixel"**

---

## 📋 PASO 5: Obtener el ID del Píxel

Después de crear el píxel:

1. Verás una pantalla que dice **"Agregar el píxel a tu sitio web"**

2. Haz clic en **"Configuración manual"** o **"Set up manually"**

3. Verás un código que empieza así:
   ```html
   <!-- Meta Pixel Code -->
   <script>
   !function(f,b,e,v,n,t,s)
   {if(f.fbq)return;n=f.fbq=function(){...
   fbq('init', '1234567890123456');  ← ESTE ES TU ID
   ```

4. **Copia solo los números** del `fbq('init', 'XXXXXXXXXXXXXXXX')`
   - Ejemplo: `1234567890123456`
   - Son entre 15-16 dígitos

---

## 📋 PASO 6: Encontrar tu Pixel ID (Método Alternativo)

Si cerraste la ventana y no viste el código:

1. En el **Administrador de Eventos**
2. Verás tu píxel listado con el nombre "SOMOS Properties Website"
3. Haz clic en el nombre del píxel
4. Arriba verás:
   ```
   Píxel de Meta
   SOMOS Properties Website
   ID: 1234567890123456  ← ESTE ES
   ```

---

## ✅ PASO 7: Dar el ID al Desarrollador

Una vez que tengas tu **Pixel ID** (los 15-16 dígitos):

**Cópialo y envíamelo** para que yo lo configure en el sitio web.

Ejemplo de formato:
```
Mi Pixel ID es: 1234567890123456
```

---

## 🎯 Eventos que Configuraremos Automáticamente

Una vez instalado el píxel, rastreará:

### Eventos Estándar:
1. **PageView** - Cada vez que alguien visita una página
2. **ViewContent** - Cuando ven detalles de una propiedad
3. **Search** - Cuando usan filtros de búsqueda
4. **Contact** - Cuando hacen clic en WhatsApp
5. **Lead** - Cuando envían formulario de contacto
6. **InitiateCheckout** - Cuando muestran interés en propiedad premium

### Parámetros Personalizados:
- Tipo de propiedad (Apartamento, Local, Casa)
- Ubicación (Torres, Arraiján, etc.)
- Precio
- ID de propiedad

---

## 📊 ¿Qué Podrás Hacer con el Píxel?

### 1. **Remarketing/Retargeting**
- Mostrar anuncios a personas que visitaron tu sitio
- Crear audiencias de personas que vieron propiedades específicas
- Anuncios de "¿Aún interesado en Kings Park?"

### 2. **Audiencias Personalizadas**
- Visitantes de los últimos 30/60/90/180 días
- Personas que vieron propiedades premium
- Personas que buscaron apartamentos vs locales

### 3. **Audiencias Similares (Lookalike)**
- Facebook encuentra personas similares a tus visitantes
- Aumenta el alcance con público calificado

### 4. **Optimización de Campañas**
- Facebook aprende qué personas convierten mejor
- Optimiza automáticamente tus anuncios
- Muestra anuncios a quienes tienen más probabilidad de contactar

### 5. **Medición de ROI**
- Ver cuántos leads vienen de Facebook/Instagram
- Cuánto cuesta cada contacto
- Qué anuncios generan más interés

---

## 💡 Tips Importantes

### ✅ HACER:
- Crear audiencias específicas (ej: "Vieron apartamentos en Torres")
- Usar eventos para optimizar campañas
- Excluir a personas que ya contactaron
- Crear Lookalike de tus mejores clientes

### ❌ NO HACER:
- No compartas tu Pixel ID públicamente
- No uses el mismo píxel para múltiples negocios
- No olvides dar permisos a tu compañera en Business Manager

---

## 🔐 Dar Acceso a tu Compañera

Para que ella pueda usar el píxel:

1. En Business Manager
2. Ve a **"Configuración de la empresa"** o **"Business Settings"**
3. Haz clic en **"Orígenes de datos"** → **"Píxeles"**
4. Selecciona tu píxel
5. Haz clic en **"Asignar personas"** o **"Assign People"**
6. Agrega a tu compañera con su email
7. Dale permisos de **"Analista del píxel"** o **"Pixel Analyst"**

---

## 🆘 Solución de Problemas

**No veo "Administrador de Eventos":**
- Asegúrate de estar en Facebook Business Suite
- Usa el enlace directo: https://business.facebook.com/events_manager2

**Me pide crear una cuenta empresarial:**
- Es normal si es tu primera vez
- Solo sigue los pasos y completa la información

**Ya tengo un píxel pero no sé cuál es el ID:**
- Ve a Administrador de Eventos
- Haz clic en tu píxel
- El ID aparece arriba junto al nombre

**¿Puedo tener múltiples píxeles?:**
- Sí, pero para un sitio web usa solo uno
- Puedes crear eventos personalizados para segmentar

---

## 📞 Siguiente Paso

**Una vez que tengas tu Pixel ID (15-16 dígitos), envíamelo y yo:**

1. ✅ Lo configuro en el proyecto
2. ✅ Instalo los eventos automáticos
3. ✅ Configuro el rastreo de propiedades
4. ✅ Agrego parámetros personalizados
5. ✅ Hago deploy a producción

**Tu compañera podrá empezar a crear audiencias inmediatamente.** 🎯

---

## 🔗 Enlaces Útiles

- Business Manager: https://business.facebook.com/
- Administrador de Eventos: https://business.facebook.com/events_manager2
- Ayuda de Meta Pixel: https://www.facebook.com/business/help/952192354843755
- Aprende sobre Audiencias: https://www.facebook.com/business/learn/facebook-ads-pixel

---

**¿Tienes el Pixel ID? ¡Envíamelo para configurarlo!** 🚀
