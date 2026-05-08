# Spec — fix-critical-inconsistencies / components

**Domain**: components  
**Change**: fix-critical-inconsistencies  
**Date**: 2026-05-08

RFC 2119: MUST, SHALL, SHOULD, MAY

---

## REQ-C01: El layout DEBE NOT renderizar el modal de Navidad

El `PromotionalModal` con id `"navidad-2024"` MUST ser eliminado del layout global. El layout NO SHALL importar ni instanciar ese componente.

### Scenario C01-1: Layout no renderiza el modal vencido

```
Given  el archivo app/[locale]/layout.tsx
When  se inspecciona el JSX del componente LocaleLayout
Then  NO existe ninguna instancia de <PromotionalModal> con id="navidad-2024"
And   NO existe import de imágenes /images/promo-navidad-*.png
```

### Scenario C01-2: Carga de página sin modal

```
Given  el usuario abre /es/ en el navegador
When  la página termina de cargar
Then  NO aparece ningún modal de promoción de Navidad
And   NO se ejecuta ningún setTimeout relacionado al modal vencido
```

---

## REQ-C02: El modal promocional DEBE usar el número de WhatsApp de CONTACT

El componente `PromotionalModal` MUST obtener el número de WhatsApp desde `CONTACT.whatsapp.raw` de `@/lib/config`. SHALL NOT contener ningún número de teléfono hardcodeado.

### Scenario C02-1: URL de WhatsApp usa número real

```
Given  el componente promotional-modal.tsx
When  se busca cualquier URL de wa.me en el código fuente
Then  NO existe la cadena "50760000000" (número falso)
And   el número proviene de CONTACT.whatsapp.raw o equivalente importado
```

### Scenario C02-2: CTA de WhatsApp lleva al número correcto

```
Given  un modal promocional visible con ctaAction="whatsapp"
When  el usuario hace click en el CTA
Then  se abre WhatsApp con el número +50766770577 (CONTACT.whatsapp.raw)
```

---

## REQ-C03: El modal MUST NOT usar <style jsx>

El componente `promotional-modal.tsx` MUST NOT contener la etiqueta `<style jsx>`. Las animaciones necesarias MUST definirse en `app/globals.css` como `@keyframes` nativos o como clases Tailwind estándar.

### Scenario C03-1: Sin styled-jsx en el modal

```
Given  el archivo components/promotional-modal.tsx
When  se busca la cadena "<style jsx"
Then  NO se encuentra ninguna coincidencia
```

### Scenario C03-2: Las animaciones del modal siguen funcionando

```
Given  un modal promocional visible
When  el modal aparece en pantalla
Then  aplica una animación de fade-in al overlay
And   aplica una animación de scale-in al contenedor del modal
```

---

## REQ-C04: El botón flotante de WhatsApp DEBE renderizarse desde un único lugar

El `Navbar` MUST NOT contener el botón flotante de WhatsApp inline. El componente `WhatsAppButton` SHALL ser el único punto de renderizado del botón flotante. El Navbar SHOULD importar y usar `WhatsAppButton` si es composable, O eliminarlo y dejar que el componente exista independientemente en el layout.

### Scenario C04-1: Navbar sin botón WhatsApp inline

```
Given  el archivo components/navbar.tsx
When  se busca el div con el botón de WhatsApp (wa.me link o bg-[#25D366])
Then  NO existe código inline del botón flotante dentro del Navbar
```

### Scenario C04-2: Botón WhatsApp sigue visible en producción

```
Given  el usuario navega a cualquier página del sitio
When  la página está completamente cargada
Then  el botón flotante verde de WhatsApp está visible en la esquina inferior derecha
And   al hacer click abre WhatsApp con el número correcto
```

---

## REQ-C05: isPremium() DEBE considerar propiedades en alquiler de alto valor

La función `isPremium()` en `lib/utils-premium.ts` MUST retornar `true` cuando:
- `property.price >= 250_000` (venta — criterio existente), O
- `property.pricePerMonth >= 2_500` (alquiler — criterio nuevo)

### Scenario C05-1: Venta de alto valor sigue siendo premium

```
Given  una propiedad con operation="Venta" y price=300000
When  se llama isPremium(property)
Then  retorna true
```

### Scenario C05-2: Alquiler de alto valor es premium

```
Given  una propiedad con operation="Alquiler", price=0, pricePerMonth=3000
When  se llama isPremium(property)
Then  retorna true
```

### Scenario C05-3: Alquiler de precio bajo no es premium

```
Given  una propiedad con operation="Alquiler", price=0, pricePerMonth=800
When  se llama isPremium(property)
Then  retorna false
```

### Scenario C05-4: Propiedad sin precio no es premium

```
Given  una propiedad con price=0 y pricePerMonth=null
When  se llama isPremium(property)
Then  retorna false
```
