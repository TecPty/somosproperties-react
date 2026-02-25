# Sprint 1 — Daily Checklist

Imprime esto o cópialo a Notion/Linear para tracking real-time.

---

## 📅 Lunes 24 Feb

### 1️⃣ Config External (30 min)

- [ ] Crear `lib/config.ts`
  ```bash
  touch lib/config.ts
  ```

- [ ] Copiar este contenido:
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

- [ ] Actualizar imports en:
  - `components/whatsapp-button.tsx`
  - `components/lead-qualifier.tsx`
  - `app/contacto/page.tsx`

- [ ] Actualizar `.env.example`:
  ```bash
  NEXT_PUBLIC_WHATSAPP_NUMBER=50766770577
  NEXT_PUBLIC_CONTACT_EMAIL=ventas@somosproperties.com
  NEXT_PUBLIC_CONTACT_PHONE=+507 6677-0577
  RESEND_API_KEY=your_key_here
  ```

- [ ] Commit:
  ```bash
  git add .
  git commit -m "chore: externalizar config a variables de entorno"
  git push
  ```

---

### 2️⃣ Remover Deps (30 min)

- [ ] Verificar en terminal:
  ```bash
  npm uninstall recharts react-resizable-panels vaul cmdk date-fns react-day-picker embla-carousel-react input-otp
  ```

- [ ] Test build:
  ```bash
  npm run build
  ```

- [ ] Debe completar sin errores ✓

- [ ] Commit:
  ```bash
  git add package.json package-lock.json
  git commit -m "chore: remover dependencias no usadas"
  git push
  ```

---

### 3️⃣ Vercel Config (30 min)

- [ ] Crear `.vercelignore` (copiar contenido del roadmap)
  ```bash
  cat > .vercelignore << 'EOF'
  ROADMAP.md
  SECURITY.md
  esquema.txt
  *.log
  EOF
  ```

- [ ] Crear `.nvmrc`:
  ```bash
  echo "20.11.0" > .nvmrc
  ```

- [ ] Actualizar `package.json`:
  ```json
  {
    "engines": {
      "node": "20.11.0",
      "npm": "10.x"
    }
  }
  ```

- [ ] Commit:
  ```bash
  git add .vercelignore .nvmrc package.json
  git commit -m "chore: setup .vercelignore y pinned Node version"
  git push
  ```

**Lunes ✅ COMPLETADO:** 1.5h cumplidas

---

## 📅 Martes 25 Feb

### 4️⃣ Resend Setup (15 min)

- [ ] Instalar:
  ```bash
  npm install resend
  ```

- [ ] Crear cuenta en https://resend.com/
  - [ ] Sign up con email profesional
  - [ ] Ir a Settings → API Keys
  - [ ] Copiar API Key

- [ ] Agregar a `.env.local`:
  ```bash
  RESEND_API_KEY=re_xxxxxxxxxxxxx
  ```

- [ ] **NO agregar a `.env.example`** (es secreto)

---

### 5️⃣ API Route (45 min)

- [ ] Crear carpeta:
  ```bash
  mkdir -p app/api/contact
  ```

- [ ] Crear `app/api/contact/route.ts` (copiar código del roadmap)

- [ ] Test en terminal:
  ```bash
  npm run dev
  # Abrir http://localhost:3000
  ```

- [ ] Usar cliente de API (Postman/Insomnia/curl):
  ```bash
  curl -X POST http://localhost:3000/api/contact \
    -H "Content-Type: application/json" \
    -d '{
      "name": "Test User",
      "email": "test@example.com",
      "phone": "12345",
      "consultationType": "Consulta General",
      "message": "Test message",
      "terms": true
    }'
  ```

- [ ] Verificar respuesta: `{ "success": true }`

- [ ] Revisar emails en Resend Dashboard

---

### 6️⃣ Contact Form Component (1 hora)

- [ ] Abrir `components/contact-form.tsx`

- [ ] Buscar la sección `const handleSubmit = async (e: React.FormEvent) => {`

- [ ] Reemplazar el `setTimeout` simulado con fetch real (ver código en roadmap)

- [ ] Agregar state para mensajes de error:
  ```typescript
  const [error, setError] = useState<string | null>(null)
  ```

- [ ] Test en `localhost:3000/contacto`:
  - [ ] Llenar form completo
  - [ ] Click Enviar
  - [ ] Debe mostrar "¡Mensaje Enviado!"
  - [ ] Revisar email recibido

- [ ] Commit:
  ```bash
  git add app/api/contact/route.ts components/contact-form.tsx
  git commit -m "feat: integrar Resend para email de contacto"
  git push
  ```

**Martes ✅ COMPLETADO:** 3-4h cumplidas

---

## 📅 Miércoles 26 Feb

### 7️⃣ Aria-labels (1 hora)

**Buscar y actualizar:**

- [ ] `components/property-details.tsx`
  - Botón cerrar lightbox → agregar `aria-label="Cerrar galería de imágenes"`
  - Botón flecha anterior → agregar `aria-label="Imagen anterior"`
  - Botón flecha siguiente → agregar `aria-label="Imagen siguiente"`

- [ ] `components/navbar.tsx`
  - Botón hamburguesa → agregar `aria-label="Abrir menú de navegación"`
  - `<nav>` → agregar `role="navigation" aria-label="Navegación principal"`

- [ ] `components/search-bar.tsx`
  - Botón submit → agregar `aria-label="Buscar propiedades"`

**Plantilla rápida:**
```tsx
<button
  onClick={() => { ... }}
  aria-label="Tu descripción aquí"
>
  <svg>...</svg>
</button>
```

- [ ] Commit:
  ```bash
  git add components/
  git commit -m "a11y: agregar aria-labels a componentes interactivos"
  git push
  ```

**Miércoles ✅ COMPLETADO:** 1h cumplida

---

## 📅 Jueves 27 Feb

### 8️⃣ Testing (1 hora)

- [ ] Build local:
  ```bash
  npm run build
  ```
  Debe completar **sin warnings** ✓

- [ ] Test dev server:
  ```bash
  npm run dev
  ```

- [ ] Abrir browser http://localhost:3000 y verificar:
  - [ ] Home page carga sin errores
  - [ ] Propiedades se muestran
  - [ ] Contact form envía email
  - [ ] Filtros funcionan
  - [ ] Búsqueda redirige
  - [ ] WhatsApp button abre chat

- [ ] Lighthouse (Chrome DevTools → Lighthouse):
  - [ ] LCP < 3.5s
  - [ ] CLS < 0.1
  - [ ] Performance > 80

---

### 9️⃣ Final Commits (30 min)

- [ ] Checkout `main` branch:
  ```bash
  git checkout main
  git pull origin main
  ```

- [ ] Merge de cambios (si usas ramas):
  ```bash
  git merge feature/sprint-1
  git push origin main
  ```

- [ ] Verificar en GitHub que todos los commits están:
  ```
  ✅ chore: externalizar config
  ✅ chore: remover dependencias
  ✅ chore: .vercelignore y .nvmrc
  ✅ feat: integrar Resend
  ✅ a11y: aria-labels
  ```

---

### 🔟 Documentación (30 min)

- [ ] Actualizar `README.md` con sección Resend (ver roadmap)

- [ ] Actualizar `.env.example`:
  ```bash
  NEXT_PUBLIC_WHATSAPP_NUMBER=50766770577
  NEXT_PUBLIC_CONTACT_EMAIL=ventas@somosproperties.com
  NEXT_PUBLIC_CONTACT_PHONE=+507 6677-0577
  RESEND_API_KEY=your_key_here
  ```

- [ ] Commit final:
  ```bash
  git add README.md .env.example
  git commit -m "docs: actualizar instrucciones de setup"
  git push
  ```

**Jueves ✅ COMPLETADO:** 2h cumplidas

---

## 🎉 Sprint Summary

```
Lunes    → Config + Deps + Vercel Setup        [1.5h] ✅
Martes   → Resend API Integration              [3-4h] ✅
Miércoles → Aria-labels & A11y                 [1h] ✅
Jueves   → Testing + Deploy + Docs             [2h] ✅
         ─────────────────────────────────────────
         TOTAL:                                [7.5-8.5h] ✅
```

---

## 📈 Validación Final

Al terminar Jueves:

- [ ] Build local sin errors
- [ ] Email de contacto funcional
- [ ] Código en main branch
- [ ] Vercel auto-deployed con cambios
- [ ] `.env` protegido en .gitignore
- [ ] Documentación actualizada
- [ ] Aria-labels agregados
- [ ] Performance optimizado

**Result:** ✅ **Sprint 1 COMPLETADO**

Próximo: [ROADMAP-SPRINT-2.md] (SEO + Performance)

---

## 💡 Pro Tips

1. **Resend Testing:** Usa `test@resend.dev` para sandbox testing
2. **Build Rápido:** `npm run build -- --profile` para profiling
3. **Env Variables:** Usar `NEXT_PUBLIC_` solo para variables públicas
4. **Git Flow:** `git branch -D feature/sprint-1` después de merge

---

## 🆘 Troubleshooting

| Problema | Solución |
|----------|----------|
| Build fails después de remover deps | `rm -rf node_modules && npm install` |
| Resend email no llega | Check spam folder + verificar API key en `.env.local` |
| Aria-labels no se aplican | Verificar que guardaste el archivo (Ctrl+S) |
| Vercel deploy falla | Ver logs: `vercel logs --follow` |

---

✅ **¡Listo para trabajar!** Copia este archivo a Notion/Jira y marca items mientras avanzas.
