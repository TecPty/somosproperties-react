# Sprint 1 — Quick Reference Card

**Imprime esto o guarda como favorito en VS Code**

---

## 🔧 Comandos Clave

```bash
# Instalar Resend
npm install resend

# Remover deps no usadas
npm uninstall recharts react-resizable-panels vaul cmdk date-fns react-day-picker embla-carousel-react input-otp

# Build test
npm run build

# Dev server test
npm run dev

# Push cambios
git add .
git commit -m "chore: description"
git push
```

---

## 📁 Archivos a Crear/Modificar

### ✏️ CREAR (Nuevos)

| Archivo | Contenido | Tamaño |
|---------|----------|--------|
| `lib/config.ts` | Config con env variables | ~10 líneas |
| `.vercelignore` | Ignore archivos en Vercel build | ~20 líneas |
| `.nvmrc` | Node version pin | 1 línea |
| `app/api/contact/route.ts` | Resend email handler | ~60 líneas |

### ✏️ MODIFICAR (Existentes)

| Archivo | Cambios |
|---------|---------|
| `.env.example` | Agregar RESEND_API_KEY variable |
| `components/contact-form.tsx` | Reemplazar setTimeout → fetch real |
| `components/whatsapp-button.tsx` | Importar + usar `config.whatsapp` |
| `components/lead-qualifier.tsx` | Importar + usar `config.whatsapp` |
| `app/contacto/page.tsx` | Usar `config.phone`, `config.email` |
| `components/property-details.tsx` | Agregar aria-labels en botones |
| `components/navbar.tsx` | Agregar aria-labels + role |
| `components/search-bar.tsx` | Agregar aria-label |
| `package.json` | Agregar section "engines" |
| `README.md` | Agregar sección Resend setup |

---

## 🎯 Snippets para Copy-Paste

### 1. lib/config.ts (Completo)
```typescript
export const config = {
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "50766770577",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "ventas@somosproperties.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+507 6677-0577",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://somosproperties.com",
  googleMapsKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
  gaId: process.env.NEXT_PUBLIC_GA_ID,
}
```

### 2. Actualizar whatsapp-button.tsx
```typescript
// Reemplazar:
const phoneNumber = "50766770577"

// Con:
import { config } from '@/lib/config'
// Usar: config.whatsapp
```

### 3. Actualizar lead-qualifier.tsx
```typescript
// Reemplazar:
const WHATSAPP_NUMBER = "50766770577"

// Con:
import { config } from '@/lib/config'
const WHATSAPP_NUMBER = config.whatsapp
```

### 4. .vercelignore (Completo)
```
ROADMAP.md
SECURITY.md
TROUBLESHOOTING.md
ANALYTICS-GUIDE.md
GOOGLE-ANALYTICS-SETUP.md
META-PIXEL-SETUP.md
TRACKING-PIXELS-GUIDE.md
estructura.txt
analyze-*.js
analyze-*.ps1
reporte-*.json
image-*.json
*.log
```

### 5. .nvmrc
```
20.11.0
```

### 6. package.json — Agregar engines
```json
{
  "name": "my-v0-project",
  "version": "0.1.0",
  "engines": {
    "node": "20.11.0",
    "npm": "10.x"
  },
  ...
}
```

### 7. .env.example — Agregar
```
NEXT_PUBLIC_WHATSAPP_NUMBER=50766770577
NEXT_PUBLIC_CONTACT_EMAIL=ventas@somosproperties.com
NEXT_PUBLIC_CONTACT_PHONE=+507 6677-0577
NEXT_PUBLIC_SITE_URL=https://somosproperties.com
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_google_maps_key
NEXT_PUBLIC_GA_ID=your_ga_id
RESEND_API_KEY=your_resend_key_here
```

### 8. contact-form.tsx — Reemplazar handleSubmit
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!validateForm()) return

  setIsSubmitting(true)

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    const result = await response.json()

    if (response.ok) {
      setSubmitted(true)

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
      // Mostrar error (sin toast por ahora)
      alert(result.error || 'Error al enviar')
    }
  } catch (error) {
    alert('Error de conexión')
    console.error(error)
  } finally {
    setIsSubmitting(false)
  }
}
```

### 9. app/api/contact/route.ts (Completo)
```typescript
import { Resend } from 'resend'
import type { ContactFormData } from '@/lib/types'
import { config } from '@/lib/config'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(req: Request) {
  try {
    const body: ContactFormData = await req.json()

    if (!body.name?.trim() || !body.email?.trim() || !body.phone?.trim()) {
      return Response.json(
        { success: false, error: 'Campos requeridos incompletos' },
        { status: 400 }
      )
    }

    // Email al cliente
    await resend.emails.send({
      from: 'contacto@somosproperties.com',
      to: body.email,
      subject: '✓ Confirmación de contacto — SOMOS Properties',
      html: `
        <h2>¡Hola ${body.name.split(' ')[0]}!</h2>
        <p>Recibimos tu mensaje y nos pondremos en contacto pronto.</p>
        <p><strong>Detalles:</strong></p>
        <ul>
          <li><strong>Consulta:</strong> ${body.consultationType}</li>
          <li><strong>Teléfono:</strong> ${body.phone}</li>
        </ul>
        <p>Nuestro equipo se contactará en 24 horas.</p>
      `,
    })

    // Email al equipo
    await resend.emails.send({
      from: 'contacto@somosproperties.com',
      to: config.email,
      subject: `🔔 Nuevo contacto: ${body.name}`,
      html: `
        <h3>Nuevo contacto</h3>
        <p><strong>Nombre:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Teléfono:</strong> ${body.phone}</p>
        <p><strong>Consulta:</strong> ${body.consultationType}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${body.message.replace(/\n/g, '<br>')}</p>
      `,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('[Contact Error]', error)
    return Response.json(
      { success: false, error: 'Error al procesar' },
      { status: 500 }
    )
  }
}
```

### 10. Aria-labels — Plantilla
```typescript
// ❌ Antes
<button onClick={() => setLightboxOpen(false)} className="...">
  <svg>...</svg>
</button>

// ✅ Después
<button 
  onClick={() => setLightboxOpen(false)} 
  aria-label="Cerrar galería de imágenes"
  className="..."
>
  <svg>...</svg>
</button>
```

---

## ✅ Testing Checklist

### Pre-Commit
```bash
✓ npm run build (sin errors)
✓ npm run dev (abre en localhost:3000)
✓ Contact form envía email
✓ Email recibido en bandeja
✓ Verifica Resend Dashboard
```

### Lighthouse
```
LCP: < 3.5s
FID: < 100ms  
CLS: < 0.1
Performance: > 80
```

### Manual Test
```
✓ Home page carga
✓ Propiedades visibles
✓ Filtros funcionan
✓ Búsqueda funciona
✓ WhatsApp button abre chat
✓ Lead qualifier funciona
```

---

## 📊 Ganancia Esperada

| Métrica | Antes | Después | Ganancia |
|---------|-------|---------|----------|
| Bundle Size | 300+ KB extra | Clean | -400 KB 🚀 |
| Contact Conversion | 0% (no funciona) | 100% | ✅ Leads salvos |
| Security | Hardcoded | Secure | ✅ Safe |
| Build Time | +30s | -6s | 20% faster |
| A11y Coverage | ~70% | 85% | +15% |

---

## 🐛 If Things Break

| Error | Fix |
|-------|-----|
| `npm ERR! 404` | `npm cache clean --force` + retry |
| Build fails después remover deps | `rm -rf .next && npm run build` |
| Resend email doesn't arrive | Check `.env.local` + Resend dashboard |
| Aria-label no functiona | Ctrl+S en VS Code + refresh browser |
| Git merge conflict | `git merge --abort` + pull main primero |

---

## 📞 Resources

- [Resend Documentation](https://resend.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [ARIA Labels (WCAG)](https://www.w3.org/WAI/tutorials/forms/labels/)
- [Node Version Management](https://github.com/nvm-sh/nvm)

---

## 🚀 Go Time!

**Lunes Start:** ⏰ 9:00 AM
**Jueves End:** 🎉 5:00 PM (Viernes = Respirar)

**Total Time:** 7.5-8.5 horas ≈ 1-2 horas/día promedio

**You got this!** 💪

---

Última actualización: 23 Feb 2026  
Sprint: 1/3 (Critical Phase)  
Status: 🟢 READY TO START
