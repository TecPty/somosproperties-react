# Technical Design — consolidate-templates-and-fix-i18n

## Architecture Changes

### 1. Global Layout Migration
- **Target**: `app/[locale]/layout.tsx`
- **Action**: Import `Navbar` and `Footer`.
- **Structure**:
    ```tsx
    <RootLayoutClient gaId={gaId}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </RootLayoutClient>
    ```
- **Cleanup**: Remove these components from `app/[locale]/page.tsx`, `nosotros/page.tsx`, `propiedades/page.tsx`, etc.

### 2. Generic Category Component
- **Path**: `components/property-category-view.tsx`
- **Props**: `category`, `namespace`.
- **Logic**: Use `useTranslations(namespace)` to get dynamic content.
- **Replacement**: Delete `app/[locale]/residenciales/residenciales-content.tsx` and `app/[locale]/comerciales/comerciales-content.tsx`.

### 3. SEO Metadata Utility
- **Path**: `lib/metadata.ts`
- **Function**: `constructMetadata(options: MetadataOptions): Metadata`
- **Logic**:
    ```ts
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://somosproperties.com'
    // Logic to build canonical and OG objects
    ```

## File Mapping
| Change | File |
|--------|------|
| Centralize UI | `app/[locale]/layout.tsx` |
| Remove redundant UI | `app/[locale]/page.tsx`, `nosotros/page.tsx`, etc. |
| Consolidate View | `components/property-category-view.tsx` |
| SEO Utility | `lib/metadata.ts` |
| i18n Strings | `messages/es.json`, `messages/en.json` |

## Migration Strategy
1. **Step 1**: Implement `lib/metadata.ts` and verify with one page.
2. **Step 2**: Create `PropertyCategoryView` and switch `residenciales` to use it.
3. **Step 3**: Centralize Layout in `layout.tsx` and strip all other pages.
4. **Step 4**: Verify 404s and spacing.
