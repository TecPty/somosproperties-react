# Specification — consolidate-templates-and-fix-i18n

## Domain: Structural Layout (REQ-S01)

### S01.1: Root Locale Layout
- **Requirement**: `app/[locale]/layout.tsx` must render the global navigation and footer.
- **Scenario**: When a user navigates between `/es/residenciales` and `/en/comerciales`, the Navbar and Footer components should remain mounted and not re-render/flicker.
- **Constraint**: The `main` content area must have consistent padding/margin now that it's part of a global layout.

## Domain: Template Consolidation (REQ-S02)

### S02.1: PropertyCategoryView Component
- **Requirement**: A single component must handle the logic for filtering and displaying properties by category.
- **Interface**:
    ```tsx
    interface PropertyCategoryViewProps {
      category: "Residencial" | "Comercial";
      titleKey: string; // e.g., 'residenciales.title'
      namespace: string; // for useTranslations
    }
    ```
- **Scenario**: If `category="Residencial"` is passed, only residential properties should be shown and the page title should use the residential translation key.

### S02.2: Localization
- **Requirement**: Zero hardcoded strings in the grid view.
- **Scenario**: The "propiedades encontradas" label must be retrieved via `t('resultsCount', { count: totalProperties })`.

## Domain: SEO & Metadata (REQ-S03)

### S03.1: Metadata Helper
- **Requirement**: Centralize the logic for constructing `Metadata` objects.
- **Logic**:
    - Automatically detect the current `locale`.
    - Construct the `alternates.canonical` URL based on the `siteUrl` and current path.
    - Merge passed overrides (title, description, image) with defaults.
- **Scenario**: `generateMetadata` in any page should be reduced to:
    ```ts
    return constructMetadata({ 
      title: t('seo.title'), 
      description: t('seo.description'),
      path: '/residenciales'
    });
    ```
