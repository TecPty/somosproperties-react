# Proposal — consolidate-templates-and-fix-i18n

## Intent
Clean up the "copy-paste" architecture by consolidating duplicated property view templates and centralizing global layout components. This will reduce the codebase size, improve maintenance, and ensure 100% correct i18n behavior across all property views.

## Scope
- **Consolidation**: Merge `residenciales-content.tsx` and `comerciales-content.tsx` into a single reusable component.
- **Architecture**: Move `Navbar` and `Footer` to the root locale layout.
- **i18n**: Migrate hardcoded strings to translation files.
- **SEO**: Abstract metadata generation into a shared utility.

## Motivation
The current "template duplication" (cloned files for residential/commercial) is a maintenance nightmare. A change in the grid layout currently requires editing two files. Furthermore, the manual injection of Navbar/Footer in every page causes flickering on transitions and code bloat. The hardcoded strings in property views break the site's bilingual promise.

## Proposed Approach
1. **Centralize Layout**: Update `app/[locale]/layout.tsx` to include `Navbar` and `Footer`. Remove them from all pages.
2. **Generic View Component**: Create `components/property-category-view.tsx` that takes `category` and handles its own localized titles via `next-intl`.
3. **SEO Helper**: Implement `generatePageMetadata` in `lib/metadata.ts` to automate canonical URLs and OG tags.
4. **Cleanup**: Delete redundant content files.

## Success Criteria
- [ ] Only one file manages the category grid view.
- [ ] Navbar and Footer are rendered only once in the layout.
- [ ] No hardcoded Spanish text in property listing views.
- [ ] Metadata is correctly generated for all routes using the helper.

## Rollback Plan
- Revert changes to `layout.tsx`.
- Restore individual content files from git history.
