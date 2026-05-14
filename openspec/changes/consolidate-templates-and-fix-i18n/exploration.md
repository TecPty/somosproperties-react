# Exploration — consolidate-templates-and-fix-i18n

## Objective
Analyze the current duplication in page templates (residential/commercial) and the manual injection of global components (Navbar/Footer) to propose a cleaner, more maintainable architecture.

## Findings

### 1. Direct Component Duplication
- `app/[locale]/residenciales/residenciales-content.tsx`
- `app/[locale]/comerciales/comerciales-content.tsx`
**Status**: 95% identical code.
**Logic**: Both use `useFilters` and `useProperties`.
**Hardcoded Strings**: Both have Spanish titles and labels hardcoded.

### 2. Layout Inefficiency
- Every page in `app/[locale]/*/page.tsx` renders its own `<Navbar />` and `<Footer />`.
- This causes unnecessary re-renders of the navigation and footer during page transitions.
- It violates the DRY principle and Next.js App Router best practices.

### 3. Metadata Redundancy
- Metadata generation (canonical URLs, OpenGraph, dynamic titles) is repeated in:
    - `residenciales/page.tsx`
    - `comerciales/page.tsx`
    - `propiedades/page.tsx`
    - `nosotros/page.tsx` (partial)
    - `premium/page.tsx` (partial)

## Proposed Refactoring Path

### Phase A: Structural Consolidation
1. Move `<Navbar />` and `<Footer />` to `app/[locale]/layout.tsx`.
2. Remove `<Navbar />` and `<Footer />` from all individual pages.
3. Adjust CSS/Layout to ensure proper spacing (main tag handling).

### Phase B: Template Consolidation
1. Create `components/category-view.tsx` as a generic client component.
2. It will receive `category` ("Residencial" | "Comercial") and `i18nNamespace` as props.
3. Replace the two individual content files with this shared component.

### Phase C: SEO Abstraction
1. Create `lib/seo.ts` helper for `generateMetadata`.
2. Standardize how `alternates.canonical` and `openGraph` are constructed across all routes.

### Phase D: i18n Cleanup
1. Ensure all remaining hardcoded strings in the consolidated templates are moved to `messages/*.json`.

## Risk Assessment
- **Breaking Layouts**: Some pages might have specific spacing that relies on the current manual placement.
- **Client/Server boundaries**: Need to ensure the consolidated components remain efficient and use server components where possible for metadata.
