# 🔒 Guía de Seguridad - SOMOS Properties

## ✅ Medidas Implementadas

### 1. Next.js Actualizado
- **Versión:** 16.0.10 (última estable)
- **Vulnerabilidades corregidas:** 3 CVEs críticos
- **Estado:** ✅ Sin vulnerabilidades conocidas

### 2. Headers de Seguridad HTTP
```javascript
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### 3. Variables de Entorno
- ✅ `.env.local` creado
- ✅ `.env.local.example` para referencia
- ✅ Configurado en `.gitignore`

### 4. Protección de Secrets
- ✅ No hay API keys en código
- ✅ Solo usa `NEXT_PUBLIC_*` (variables públicas)
- ✅ TypeScript strict mode habilitado

---

## ⚠️ ANTES DE PRODUCCIÓN

### 1. Configurar Variables de Entorno en Vercel

```bash
# En Vercel Dashboard → Settings → Environment Variables
NEXT_PUBLIC_SITE_URL=https://somosproperties.com
```

### 2. Implementar Backend para Formulario de Contacto

**Crear:** `/app/api/contact/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
  consultationType: z.string(),
  message: z.string().min(10).max(1000),
  terms: z.boolean().refine(val => val === true),
})

// Rate limiting (usar Vercel KV o Upstash)
const rateLimit = new Map<string, { count: number; resetAt: number }>()

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting por IP
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const now = Date.now()
    const limit = rateLimit.get(ip)
    
    if (limit && limit.count >= 3 && now < limit.resetAt) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Intenta en 1 hora.' },
        { status: 429 }
      )
    }
    
    // 2. Validar datos
    const body = await request.json()
    const validatedData = contactSchema.parse(body)
    
    // 3. Enviar email (usar Resend, SendGrid, etc.)
    // await sendEmail(validatedData)
    
    // 4. Guardar en base de datos (opcional)
    // await db.contacts.create({ data: validatedData })
    
    // 5. Actualizar rate limit
    rateLimit.set(ip, {
      count: (limit?.count || 0) + 1,
      resetAt: now + 3600000, // 1 hora
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    )
  }
}
```

### 3. Google Maps API - Configuración Segura

**En Google Cloud Console:**
1. Crear API Key
2. **Restricciones de aplicación:**
   - Tipo: Referentes HTTP (sitios web)
   - Agregar: `somosproperties.com/*`, `*.somosproperties.com/*`
3. **Restricciones de API:**
   - Solo habilitar: "Maps JavaScript API"
4. **Configurar límites:**
   - Solicitudes/día: 1,000 (ajustar según tráfico)
   - Solicitudes/minuto: 60

**En Vercel:**
```bash
NEXT_PUBLIC_GOOGLE_MAPS_KEY=AIza...
```

### 4. Agregar reCAPTCHA v3

```bash
pnpm add react-google-recaptcha-v3
```

**Actualizar `contact-form.tsx`:**
```typescript
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

const { executeRecaptcha } = useGoogleReCaptcha()

const handleSubmit = async (e) => {
  e.preventDefault()
  
  if (!executeRecaptcha) return
  
  const token = await executeRecaptcha('contact_form')
  
  await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...formData, recaptchaToken: token }),
  })
}
```

---

## 📋 Checklist Pre-Deploy

- [x] Next.js actualizado a 16.0.10+
- [x] Headers de seguridad configurados
- [x] Variables de entorno protegidas
- [x] TypeScript strict mode
- [ ] API de contacto implementada
- [ ] Rate limiting configurado
- [ ] reCAPTCHA v3 agregado
- [ ] Google Maps API con restricciones
- [ ] Variables en Vercel configuradas
- [ ] Testing en staging
- [ ] Lighthouse audit (90+ en todas las métricas)

---

## 🚀 Deploy Seguro

```bash
# 1. Build local
pnpm build

# 2. Test producción local
pnpm start

# 3. Deploy a Vercel
vercel --prod

# 4. Verificar headers
curl -I https://somosproperties.com

# 5. Verificar CSP
https://securityheaders.com/?q=somosproperties.com
```

---

## 🔍 Monitoreo Post-Deploy

1. **Vercel Analytics:** Revisar métricas diarias
2. **Sentry (opcional):** Error tracking
3. **Uptime monitoring:** UptimeRobot o Pingdom
4. **Security headers:** Verificar semanalmente

---

## 📞 Soporte

Para dudas de seguridad:
- GitHub Issues: https://github.com/TecPty/somosproperties-react/issues
- Email: security@somosproperties.com
