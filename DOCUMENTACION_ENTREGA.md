# 🏢 Somos Properties - Documentación de Entrega

**Fecha:** 18 de Mayo de 2026
**Plataforma:** Next.js 16 (App Router), React, TailwindCSS
**Despliegue:** Vercel (Producción)

---

## 1. Resumen de Optimización y Entrega
La plataforma web de **Somos Properties** ha sido estabilizada y llevada a un estado óptimo de producción. Se resolvieron todos los bloqueos técnicos de construcción (errores estrictos de TypeScript) y se perfeccionó la lógica de negocio para la gestión y visualización del inventario inmobiliario.

## 2. Gestión del Inventario (`data/properties.json`)
La base de datos estática es el corazón del catálogo. Para garantizar el buen funcionamiento visual, siga estas reglas:

### 2.1. Estados de la Propiedad (`status`)
La propiedad debe tener uno de los siguientes estados:
- `"available"`: La propiedad está disponible. Aparecerá en el catálogo y en la página principal si cumple con otros filtros (ej. tener un precio o ser destacada).
- `"rented"`: La propiedad ha sido alquilada. Mostrará automáticamente la estampa diagonal roja gigante **ALQUILADO** sobre la imagen principal.
- `"sold"`: La propiedad ha sido vendida. Mostrará la estampa diagonal roja gigante **VENDIDO** sobre la imagen principal.

### 2.2. Visibilidad (`hidden`)
- Para ocultar temporal o permanentemente una propiedad de *toda* la página (búsquedas, catálogos, página principal), configure `"hidden": true`. 
- Si desea que una propiedad vendida o alquilada sea visible como vitrina de éxito, asegúrese de que **NO** tenga `"hidden": true` (puede omitirse el campo o poner `"hidden": false`).

### 2.3. Precios y Operaciones
Si una propiedad es un proyecto macro (ej. una plaza entera) o su precio es indefinido (`"price": 0` y `"pricePerMonth": 0`), el sistema automáticamente ocultará el `$0` y mostrará **"Consultar Precio"** para proteger la experiencia del usuario y evitar confusiones comerciales.

### 2.4. Imágenes
Las rutas de las imágenes deben ser absolutas desde la carpeta `public/`. 
**Importante:** Asegúrese de colocar la ruta exacta hasta el archivo final. 
*Ejemplo correcto:* `"/images/properties/central-plaza/hero/hero.webp"`

---

## 3. Correcciones Estructurales Implementadas

* **Integridad de Tipos (TypeScript):** Se corrigieron todas las definiciones globales de objetos para integraciones de analíticas (Píxeles de Meta, LinkedIn, TikTok y Google Analytics) que impedían la compilación en Vercel. El proyecto ahora es 100% Type-Safe.
* **Componentes de UI Dinámicos:** El componente `PropertyCard` fue refactorizado. Cuenta con clases responsivas (`truncate`, `flex-shrink-0`) que impiden que los precios muy largos pisen u oculten la información de los metros cuadrados.
* **Internacionalización:** Se solventó el error crítico de variables no declaradas (`useTranslations`) en las barras de búsqueda y filtros.
* **Contacto Global:** Todos los formularios de la API, correos automáticos, y documentos legales fueron actualizados para apuntar unificadamente a `ventas@somosproperties.com`.

---

## 4. Instrucciones para el Futuro

1. **Añadir nuevas locaciones:** Al crear copias o nuevos registros en `properties.json`, preste atención a generar siempre un `id` único.
2. **Sincronización:** Cada vez que actualice inventario, puede buscar la propiedad y cambiar `"status": "sold"` para que automáticamente le aplique la estampa visual a la imagen.
3. **Imágenes:** Verifique siempre probar su entorno en local (`npm run dev`) para confirmar que el path de la foto principal (`"image"`) cargue, o la UI mostrará un panel gris con el texto "Sin Imagen".

## 5. Cierre
El código fuente en la rama `main` de GitHub se encuentra limpio y alineado automáticamente con Vercel. Cualquier `git push` a la rama `main` generará un despliegue transparente y libre de fallas técnicas.
