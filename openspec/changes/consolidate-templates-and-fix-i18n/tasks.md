# Tasks — consolidate-templates-and-fix-i18n

## Batch 1: Infrastructure & SEO Helper

- [ ] 1.1 Crear `lib/metadata.ts` con la función `constructMetadata`.
- [ ] 1.2 Migrar `app/[locale]/propiedades/page.tsx` para usar el helper.
- [ ] 1.3 Verificar que el SEO no haya cambiado (canonical y OG tags).

## Batch 2: Global Layout Centralization

- [ ] 2.1 Modificar `app/[locale]/layout.tsx` para incluir `<Navbar />` y `<Footer />`.
- [ ] 2.2 Eliminar `<Navbar />` y `<Footer />` de `app/[locale]/page.tsx`.
- [ ] 2.3 Eliminar de `app/[locale]/nosotros/page.tsx`.
- [ ] 2.4 Eliminar de `app/[locale]/propiedades/page.tsx`.
- [ ] 2.5 Eliminar de `app/[locale]/premium/page.tsx`.
- [ ] 2.6 Verificar visualmente que no haya duplicación de headers/footers.

## Batch 3: Template Consolidation & i18n Fix

- [ ] 3.1 Crear `components/property-category-view.tsx` basándose en el código compartido.
- [ ] 3.2 Agregar las traducciones faltantes en `messages/es.json` y `en.json` para residenciales y comerciales.
- [ ] 3.3 Actualizar `app/[locale]/residenciales/page.tsx` para usar el nuevo componente.
- [ ] 3.4 Actualizar `app/[locale]/comerciales/page.tsx` para usar el nuevo componente.
- [ ] 3.5 Borrar archivos obsoletos: `residenciales-content.tsx` y `comerciales-content.tsx`.

## Batch 4: Verification & Final Polish

- [ ] 4.1 Verificar que los links hardcodeados en `PremiumContent` y otros componentes usen ahora el sistema de navegación correcto o tengan prefijos.
- [ ] 4.2 Ejecutar `tsc --noEmit` para asegurar integridad de tipos.
- [ ] 4.3 Smoke test en español e inglés.
