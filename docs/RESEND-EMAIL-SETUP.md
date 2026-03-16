# Configuración de Resend Email

**Fecha de Setup:** Marzo 16, 2026  
**Status:** ✅ Backend Implementado | ⏳ API Key Pendiente

---

## 🎯 Objetivo

Integrar **Resend** como provedor de emails para:
- ✅ Formulario de contacto (`/contacto`)
- ✅ Formulario de empleo (`/empleo`) — pendiente backend
- ✅ Emails transaccionales futuras

---

## 📋 Estado de Implementación

| Componente | Status | Archivo |
|-----------|--------|---------|
| **Backend API** | ✅ Listo | `app/api/contact/route.ts` |
| **Email Template** | ✅ Listo | `lib/email-templates/contact.tsx` |
| **Formulario Cliente** | ✅ Activo | `components/contact-form.tsx` |
| **Variables Env** | ⏳ Parcial | `.env.local` |
| **API Key Resend** | ❌ Falta | Descargar de resend.com |

---

## 🚀 Pasos para Configurar

### 1️⃣ Crear Cuenta en Resend

1. Ir a **https://resend.com**
2. Hacer click en **"Sign up"**
3. Usar email corporativo: `info@somosproperties.com` (recomendado)
4. Confirmar email en la bandeja de entrada

### 2️⃣ Obtener API Key

1. En Resend dashboard → **API Keys**
2. Click en **"Create API Key"**
3. Nombrar: `SOMOS Properties - Production`
4. Copiar la clave: `re_xxxxxxxxxxxxx`

### 3️⃣ Configurar Dominio (Opcional pero Recomendado)

Para que los emails vengan de tu dominio (`noreply@somosproperties.com`):

1. En Resend → **Domains**
2. Click **"Configure Domain"**
3. Ingresar: `somosproperties.com`
4. Resend proporciona registros DNS a agregar:
   - **DKIM**
   - **SPF**
   - **MX** (si lo deseas)
5. Agregar records en tu proveedor DNS
6. Esperar 24-48h para validación

### 4️⃣ Actualizar `.env.local`

```bash
# Resend Email Configuration
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL_FROM=onboarding@resend.dev     # O tu dominio verificado
CONTACT_EMAIL_TO=ventas@somosproperties.com
```

**Nota:** Mientras no verifiques dominio, usar `onboarding@resend.dev` funciona en modo prueba.

### 5️⃣ Testing Local

```bash
# 1. Terminal 1 - Ejecutar servidor de desarrollo
npm run dev

# 2. Terminal 2 - Hacer request POST para probar
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "your-email@example.com",
    "phone": "+507 1234-5678",
    "message": "Probando integración de Resend",
    "propertyTitle": "Apartamento en Pacific Point"
  }'
```

**Respuesta esperada:**
```json
{ "ok": true }
```

Email recibirá en: `info@somosproperties.com`

---

## 📧 Estructura del Email

El template genera un email elegante con:

```
📬 Nuevo Contacto
─────────────────

Hola,

Has recibido un nuevo contacto a través de somosproperties.com...

┌─ DETALLES ─────────────────┐
│ 👤 Nombre: Juan González   │
│ ✉️ Email: user@example.com │
│ 📞 Teléfono: +507 1234-567 │
│ 📋 Tipo: Información       │
│ 🏠 Propiedad: Pacific Point │
│ 🔗 Origen: contact_form    │
└────────────────────────────┘

💬 Mensaje
─────────
"Buenas, me interesa conocer más sobre..."

[Responder a Juan González]

────────────────────────────
SOMOS Properties
📧 info@somosproperties.com | 🌐 somosproperties.com | 📍 Panamá
```

---

## 🔒 Seguridad

✅ **Validación Server-side:**
- Email regex válido
- Campos requeridos obligatorios
- API Key en variable de entorno (no en código)

✅ **Rate Limiting (Recomendado — Futuro):**
- Agregar `@upstash/ratelimit` para limitar requests
- Implementar CAPTCHA opcional

✅ **GDPR/LOPD (Ley 81 Panamá):**
- Usuario consiente al enviar formulario
- Email incluye "Reply-To" del usuario
- Datos se almacenan en Resend (revisar GDPR compliance)

---

## 💰 Costos

| Plan | Emails/Mes | Costo | Notas |
|------|-----------|-------|-------|
| **Free** | 100 | $0 | Perfecto para MVP |
| **Pay-as-you-go** | Ilimitados | $0.20 c/email | Escalable |
| **Pro** | Ilimitados | $20/mes | + features |

**Recomendación:** Comenzar con Free, escalar a Pay-as-you-go cuando superes 100 contactos/mes.

---

## 🐛 Troubleshooting

### ❌ "Email service not configured"
**Causa:** `RESEND_API_KEY` no está en `.env.local`  
**Solución:** Agregar API Key a `.env.local` y reiniciar servidor

### ❌ "Failed to send email" (502)
**Causa:** API Key inválida o expirada  
**Solución:** Verificar API Key en Resend dashboard, regenerar si es necesario

### ❌ Email va a spam
**Causa:** No tienes dominio verificado  
**Solución:** Seguir paso 3️⃣ para verificar dominio con DNS records

### ✅ Email llega correctamente
- Abrir email en Resend dashboard → **Emails**
- Verificar deliverability, open rates, clicks

---

## 📝 Próximos Pasos

### Fase 2: Empleo Backend
- [ ] Crear `app/api/empleo/route.ts` similar a contacto
- [ ] Template email para candidatos
- [ ] Notificación al admin cuando se postule

### Fase 3: Webhooks (Futuro)
- [ ] Guardar contactos en BD (Supabase/Firebase)
- [ ] Dashboard admin para ver leads
- [ ] Enviar leads a CRM automáticamente

### Fase 4: Advanced
- [ ] Agregar CAPTCHA (reCAPTCHA v3)
- [ ] Rate limiting con Upstash
- [ ] SMS notifications (Twilio)

---

## 📞 Soporte

**Documentación Resend:** https://resend.com/docs  
**GitHub:** https://github.com/resendlabs/resend-node  
**Email Support:** support@resend.com

---

**Última actualización:** Marzo 16, 2026
