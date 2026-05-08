# Spec — fix-critical-inconsistencies / routing

**Domain**: routing  
**Change**: fix-critical-inconsistencies  
**Date**: 2026-05-08

RFC 2119: MUST, SHALL, SHOULD, MAY

---

## REQ-R01: Links en nosotros DEBEN incluir el locale prefix

La página `nosotros` DEBE construir todos sus hrefs con el locale dinámico del parámetro de ruta. Ningún `<Link>` en esta página SHALL usar rutas absolutas sin el segmento `/{locale}/`.

### Scenario R01-1: Navegación a Contacto desde Nosotros en español

```
Given  el usuario está en /es/nosotros
When   hace click en el botón "Hablemos"
Then   el navegador lleva al usuario a /es/contacto (200 OK)
And    NO redirige a /contacto (que devuelve 404)
```

### Scenario R01-2: Navegación a Contacto desde Nosotros en inglés

```
Given  el usuario está en /en/nosotros
When   hace click en el botón "Let's talk"
Then   el navegador lleva al usuario a /en/contacto (200 OK)
```

### Scenario R01-3: Navegación a Propiedades desde Nosotros

```
Given  el usuario está en /es/nosotros
When   hace click en cualquier botón de "Ver propiedades"
Then   el navegador lleva al usuario a /es/propiedades (200 OK)
And    los cuatro (4) Links afectados NO usan rutas sin prefix
```

---

## REQ-R02: Metadata de residenciales y comerciales DEBE ser dinámica e i18n

Las páginas `residenciales` y `comerciales` DEBEN usar `generateMetadata` con `getTranslations`, NO `export const metadata`. El canonical URL DEBE incluir el segmento `/{locale}/`.

### Scenario R02-1: Metadata en español para residenciales

```
Given  el usuario accede a /es/residenciales
When   el motor de búsqueda lee el <head>
Then   <title> contiene la traducción española de la clave 'metadata.residenciales.title'
And    <meta name="description"> usa la clave 'metadata.residenciales.description'
And    <link rel="canonical"> apunta a https://somosproperties.com/es/residenciales
```

### Scenario R02-2: Metadata en inglés para residenciales

```
Given  el usuario accede a /en/residenciales
When   el motor de búsqueda lee el <head>
Then   <title> está en inglés (distinto al de /es/residenciales)
And    <link rel="canonical"> apunta a https://somosproperties.com/en/residenciales
```

### Scenario R02-3: Metadata dinámica para comerciales

```
Given  la página app/[locale]/comerciales/page.tsx
When   se inspecciona el código
Then   exporta generateMetadata() async, NO export const metadata
And    usa getTranslations con namespace 'metadata.comerciales'
And    el canonical URL incluye el parámetro locale dinámico
```

### Scenario R02-4: Claves i18n presentes en ambos idiomas

```
Given  los archivos messages/es.json y messages/en.json
When   se busca la clave metadata.residenciales y metadata.comerciales
Then   ambos archivos contienen title y description para cada namespace
```
