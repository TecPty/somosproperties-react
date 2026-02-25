# Roadmap — Sprint 1 (Semana 24 Feb - 2 Mar 2026)

**Objetivo:** Resolver hallazgos críticos de auditoría (6-8 horas de trabajo)  
**Prioridad:** 🔴 Business Critical  
**Equipo:** 1-2 developers

---

## 📋 Tareas por Día

### Lunes 24 Feb — Setup y Planificación ⚙️

#### ✅ 1. Environment Variables & Config (0.5 horas)

**Objetivo:** Externalizar datos sensibles (teléfono, email) desde hardcode

**Tareas:**
- [ ] Crear `lib/config.ts` con valores desde environment
- [ ] Actualizar `.env.example` con plantilla completa
- [ ] Validar que `.gitignore` excluye `.env` y `.env.local`

**Archivo a crear:**
```typescript
// lib/config.ts
export const config = {
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "50766770577",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "ventas@somosproperties.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+507 6677-0577",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://somosproperties.com",
  googleMapsKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
  gaId: process.env.NEXT_PUBLIC_GA_ID,
}
```

**Archivos a actualizar:**
- `components/whatsapp-button.tsx` — usar `config.whatsapp`
- `components/lead-qualifier.tsx` — usar `config.whatsapp`
- `app/contacto/page.tsx` — usar `config.phone`, `config.email`
- `.env.example` — agregar todas las variables

**Tiempo:** 30 minutos (incluyendo búsqueda-reemplazo)

---

#### ✅ 2. Remover Dependencias No Usadas (0.5 horas)

**Objetivo:** Reducir bundle size en ~400KB (gzip)

**Tareas:**
- [ ] Verificar que no hay importaciones de librerías a eliminar
- [ ] Ejecutar `npm uninstall` (1 comando)
- [ ] Hacer test de build
- [ ] Commit

**Verificación Pre-uninstall:**
```bash
# Verificar que NO se usan estas librerías
grep -r "from 'recharts'" .
grep -r "import.*recharts" .
grep -r "from '@radix-ui/react-resizable-panels'" .
grep -r "from 'vaul'" .
grep -r "from 'cmdk'" .
grep -r "date-fns" .
grep -r "react-day-picker" .
grep -r "embla-carousel" .
grep -r "input-otp" .

# Si no hay resultados, es seguro desinstalar
```

**Comando a ejecutar:**
```bash
npm uninstall recharts react-resizable-panels vaul cmdk date-fns react-day-picker embla-carousel-react input-otp
```

**Test:**
```bash
npm run build  # Debe completar sin errores
npm ls        # Verificar que fueron removidas
```

**Tiempo:** 30 minutos (15 min verificación + 15 min test/commit)

---

#### ✅ 3. Setup `.vercelignore` (0.5 horas)

**Objetivo:** Reducir build time en Vercel (~20-30%)

**Archivos a crear:**
```bash
# .vercelignore
# Documentación y análisis (no necesarias en deploy)
ROADMAP.md
SECURITY.md
TROUBLESHOOTING.md
ANALYTICS-GUIDE.md
GOOGLE-ANALYTICS-SETUP.md
META-PIXEL-SETUP.md
TRACKING-PIXELS-GUIDE.md
GOOGLE_MAPS_SETUP.md
PROPERTY_INVENTORY_REPORT.md
REPORTE_OPTIMIZACION_IMAGENES.md
*.md

# Archivos de análisis
estructura.txt
analyze-*.js
analyze-*.ps1
reporte-*.json
image-*.json
PROPERTY_INVENTORY_REPORT.json
image-cleanup-report.json
image-optimization-report.json
reporte-formatos-imagenes.json
reporte-propiedades.json

# Logs y reportes
*.log
```

**Agregar `.nvmrc`:**
```bash
# .nvmrc
20.11.0
```

**Actualizar `package.json`:**
```json
{
  "engines": {
    "node": "20.11.0",
    "npm": "10.x"
  }
}
```

**Tiempo:** 20 minutos

---

### Martes 25 Feb — Integración Resend (3-4 horas)

#### ✅ 4. Setup Resend y API Route (2 horas)

**Objetivo:** Implementar backend real para Contact Form

**Step 1: Instalar Resend (5 min)**
```bash
npm install resend
```

**Step 2: Obtener API Key (5 min)**
1. Ir a https://resend.com/
2. Sign up con email del proyecto
3. Crear API Key en Settings
4. Copiar a `.env.local`:
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxx
```

**Step 3: Crear Route Handler (30 min)**

Archivo: `app/api/contact/route.ts`
```typescript
import { Resend } from 'resend'
import type { ContactFormData } from '@/lib/types'
import { config } from '@/lib/config'

const resend = new Resend(process.env.RESEND_API_KEY!)

const EMAIL_FROM = 'contacto@somosproperties.com'
const EMAIL_TO_TEAM = config.email

export async function POST(req: Request) {
  try {
    const body: ContactFormData = await req.json()

    // Validación server-side
    if (!body.name?.trim() || !body.email?.trim() || !body.phone?.trim()) {
      return Response.json(
        { success: false, error: 'Campos requeridos incompletos' },
        { status: 400 }
      )
    }

    // Email al cliente
    await resend.emails.send({
      from: EMAIL_FROM,
      to: body.email,
      subject: '✓ Confirmación de contacto — SOMOS Properties',
      html: `
        <h2>¡Hola ${body.name.split(' ')[0]}!</h2>
        <p>Recibimos tu mensaje y nos pondremos en contacto pronto.</p>
        <p><strong>Detalles de tu consulta:</strong></p>
        <ul>
          <li><strong>Tipo:</strong> ${body.consultationType}</li>
          <li><strong>Teléfono:</strong> ${body.phone}</li>
        </ul>
        <p>Nuestro equipo se contactará contigo en las próximas 24 horas.</p>
        <hr />
        <p style="font-size: 12px; color: #999;">SOMOS Properties — Propiedades en Panamá</p>
      `,
    })

    // Email al equipo
    await resend.emails.send({
      from: EMAIL_FROM,
      to: EMAIL_TO_TEAM,
      subject: `🔔 Nuevo contacto: ${body.name}`,
      html: `
        <h3>Nuevo contacto recibido</h3>
        <p><strong>Nombre:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Teléfono:</strong> ${body.phone}</p>
        <p><strong>Tipo de consulta:</strong> ${body.consultationType}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${body.message.replace(/\n/g, '<br>')}</p>
        <hr />
        <p><strong>📊 Responder a:</strong> ${body.email}</p>
      `,
    })

    return Response.json({ success: true, message: 'Mensaje enviado correctamente' })
  } catch (error) {
    console.error('[Contact API Error]', error)
    return Response.json(
      { success: false, error: 'Error al procesar tu solicitud' },
      { status: 500 }
    )
  }
}
```

**Tiempo:** 45 minutos

---

#### ✅ 5. Actualizar Contact Form Component (1 hora)

**Archivo:** `components/contact-form.tsx`

**Cambios:**
1. Agregar state `isLoading`, `error`
2. Cambiar fetch simulado por API real
3. Manejar respuestas y errores
4. Mostrar toast de éxito/error

**Snippet clave:**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!validateForm()) return

  setIsSubmitting(true)
  setError(null)

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    const result = await response.json()

    if (response.ok) {
      setSubmitted(true)
      // Toast de éxito (si tienes toaster)
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          consultationType: "",
          message: "",
          terms: true,
        })
        setSubmitted(false)
      }, 3000)
    } else {
      setError(result.error || 'Error al enviar el mensaje')
    }
  } catch (error) {
    setError('Error de conexión. Intenta de nuevo.')
    console.error(error)
  } finally {
    setIsSubmitting(false)
  }
}
```

**Tiempo:** 1 hora (incluyendo testing)

---

#### ✅ 6. Testing y Validación (1 hora)

**Tareas:**
- [ ] Probar envío en `localhost:3000/contacto`
- [ ] Verificar que el email llega a ambos destinatarios
- [ ] Verificar que Resend muestra el email en dashboard
- [ ] Probar con email inválido → debe fallar en servidor
- [ ] Revisar logs en Resend para ver deliverability

**Test Checklist:**
```
✓ Form validation en cliente (antes de enviar)
✓ Endpoint recibe datos correctamente
✓ Email al cliente contiene su nombre personalizado
✓ Email al equipo contiene datos para contacto
✓ Error handling si API key inválida
✓ Error handling si email inválido
✓ Response 200 en caso de éxito
✓ Response 400/500 en caso de error
```

**Tiempo:** 1 hora

---

### Miércoles 26 Feb — Accesibilidad (1 hora)

#### ✅ 7. Agregar Aria-labels (1 hora)

**Objetivo:** Mejorar experiencia de usuarios con lectores de pantalla

**Archivos a revisar:**

1. **components/property-details.tsx**
   - [ ] Botón cerrar lightbox → `aria-label="Cerrar galería de imágenes"`
   - [ ] Botón anterior imagen → `aria-label="Imagen anterior"`
   - [ ] Botón siguiente imagen → `aria-label="Imagen siguiente"`

2. **components/property-card.tsx**
   - [ ] Botón favorito (si tiene) → `aria-label="Agregar a favoritos"`

3. **components/navbar.tsx**
   - [ ] Botón hamburguesa mobile → `aria-label="Abrir menú de navegación"`
   - [ ] Agregar `role="navigation"` a `<nav>`

4. **components/search-bar.tsx**
   - [ ] Botón buscar → `aria-label="Buscar propiedades"`

**Plantilla:**
```tsx
<button
  onClick={() => { ... }}
  aria-label="Descripción clara de qué hace"
  className="..."
>
  <svg>...</svg>
</button>
```

**Tiempo:** 1 hora (encontrar + agregar labels)

---

### Jueves 27 Feb — QA y Deployment (2 horas)

#### ✅ 8. Testing Completo (1 hora)

**Build Local:**
```bash
npm run build  # Debe pasar sin warnings
npm run lint   # Verificar ESLint (si existe)
npm run dev    # Probar en localhost:3000
```

**Test Manual:**
- [ ] Home page carga sin errores
- [ ] Contact form envía email ✓
- [ ] Lead qualifier funciona ✓
- [ ] Propiedades se exhiben ✓
- [ ] Filtros funcionan ✓
- [ ] Búsqueda redirige correctamente ✓
- [ ] WhatsApp button abre chat ✓

**Lighthouse:**
```
LCP: < 3.5s
FID: < 100ms
CLS: < 0.1
```

**Tiempo:** 1 hora

---

#### ✅ 9. Commit y Push (0.5 horas)

**Commits recomendados:**
```bash
git add .
git commit -m "chore: externalizar config a .env"
git push

git commit -m "chore: remover dependencias no usadas (recharts, etc)"
git push

git commit -m "feat: integrar Resend para email de contacto"
git push

git commit -m "chore: agregar .vercelignore y .nvmrc"
git push

git commit -m "a11y: agregar aria-labels a componentes interactivos"
git push
```

**Verificar en GitHub Actions** (si están configurados):
- Build succeed ✓
- Deploy a Vercel ✓

**Tiempo:** 30 minutos

---

#### ✅ 10. Actualizar Documentación (0.5 horas)

**Archivos a actualizar:**
- [ ] `.env.example` — agregar variables nuevas
- [ ] `README.md` — sección "Setup" con instrucciones de Resend
- [ ] `SECURITY.md` — confirmar que API keys están protegidas

**Entrada a añadir en README:**
```markdown
## Environment Variables

Copiar `.env.example` a `.env.local` y completar:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=50766770577
NEXT_PUBLIC_CONTACT_EMAIL=ventas@somosproperties.com
NEXT_PUBLIC_CONTACT_PHONE=+507 6677-0577
NEXT_PUBLIC_SITE_URL=https://somosproperties.com
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_api_key_here
RESEND_API_KEY=your_resend_key_here  # De https://resend.com
```

### Resend Setup

1. Crear cuenta en [resend.com](https://resend.com)
2. Obtener API Key en Settings
3. Agregar a `.env.local`
4. Verificar dominio (para producción)
```

**Tiempo:** 30 minutos

---

## 📊 Timeline Visual

```
Lunes    24 Feb  | Setup Config + Remover Deps + .vercelignore | 1.5h
                 |————————————————————————————————————————————————|

Martes   25 Feb  | Resend Integration + Contact Form Update     | 3-4h
                 |————————————————————————————————————————————————|

Miércoles 26 Feb | Aria-labels + Accesibilidad                 | 1h
                 |————————————————————————————————————————————————|

Jueves   27 Feb  | QA, Testing, Deployment                     | 2h
                 |————————————————————————————————————————————————|

                 TOTAL: 7.5 - 8.5 horas (Sprint completado)
```

---

## 🎯 Objetivos Cumplidos

Al final de esta semana habrás:

✅ **Resuelto Critical Issues:**
- Email de contacto funcional y testeable
- Teléfono/emails externalizados y seguros

✅ **Mejorado Performance:**
- 400 KB menos en bundle (sin deps no usadas)
- Build time 20-30% más rápido en Vercel

✅ **Escalado Infraestructura:**
- `.env` management setup
- Node/npm versión pinned

✅ **Cumplido Estándares:**
- Accesibilidad mejorada con aria-labels
- Documentación actualizada

---

## 🚀 Resultado Esperado

**Antes:**
```
❌ Contact Form → setTimeout → No email = Perdida de leads
❌ Config hardcodeada → Riesgo de seguridad
❌ Bundle innecesario → Performance degraded
❌ Build time lento → Slow deployments
```

**Después:**
```
✅ Contact Form → Real Resend API → Emails recibidos ✓
✅ Config external → .env secure ✓
✅ Bundle ligero → -400 KB gzip ✓
✅ Build time 30% faster → Deployments ágiles ✓
```

---

## 📞 Soporte

Si hay bloqueadores durante la semana:

1. **Error de Resend:** Check https://status.resend.com/
2. **Build failures:** `npm ci` en lugar de `npm install`
3. **Preguntas:** Revisar AUDIT-TECHNICAL.md sección "Sprint 1"

---

**¡Buena suerte! Esta semana resuelves los 3 hallazgos más críticos.** 🚀
