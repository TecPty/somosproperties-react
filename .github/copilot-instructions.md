# 🤖 Copilot Workspace Instructions — SOMOS Properties

## Purpose
Guides Copilot and AI agents to follow project-specific conventions, workflows, and best practices for the SOMOS Properties React codebase.

---

## 1. Build & Run Commands
- **Development:** `npm run dev`
- **Production Build:** `npm run build && npm run start`
- **Lint:** `npm run lint`
- **Type Check:** `npm run type-check`
- **Bundle Analysis:** `npm run analyze`

## 2. Key Architecture & Conventions
- **Framework:** Next.js 15 (App Router, TypeScript, Tailwind CSS)
- **Component Location:** All React components in `components/` (UI in `components/ui/`)
- **Pages:** Use the App Router in `app/` (not `pages/`)
- **Data:** Property data in `data/properties.json`
- **Images:** Organized by property in `public/images/properties/[slug]/` (see `docs/IMAGE-ORGANIZATION.md`)
- **Environment:** Sensitive keys in `.env.local` (never commit secrets)
- **Consent & Analytics:** Use `useConsentManager`, `analytics-provider`, and follow privacy guides in `docs/`

## 3. Documentation & References
- **Project Overview:** See `README.md`
- **Roadmap:** See `docs/ROADMAP.md`
- **Performance:** See `docs/PERFORMANCE-OPTIMIZATION.md`
- **Security:** See `docs/SECURITY.md`
- **Analytics:** See `docs/ANALYTICS-GUIDE.md`, `docs/GOOGLE-ANALYTICS-SETUP.md`, `docs/META-PIXEL-SETUP.md`
- **Image Structure:** See `docs/IMAGE-ORGANIZATION.md`
- **Property Inventory:** See `docs/PROPERTY_INVENTORY_REPORT.md`

## 4. Coding Standards
- **TypeScript strict mode** is enforced
- **ESLint** and **Prettier** for formatting
- **Conventional Commits** for commit messages
- **Prefer functional, typed React components**
- **Use hooks for state and effects**
- **No direct DOM manipulation** (use React refs)

## 5. Pitfalls & Gotchas
- **Do NOT expose API keys in client code**
- **Always use the App Router (`app/`)**
- **Images must be optimized (WebP/JPG, see docs)**
- **Consent is required for analytics/marketing scripts**
- **Check property completeness in `data/properties.json`**

## 6. Example Prompts
- "Add a new property to the inventory and update images per docs/IMAGE-ORGANIZATION.md."
- "Implement a new analytics event, following docs/ANALYTICS-GUIDE.md."
- "Refactor a component to use the consent manager."
- "Optimize images for a property, following naming conventions."

---

## 7. Related Customizations to Consider
- **/create-agent privacy-guardian** — Enforces privacy/consent for all analytics and marketing scripts.
- **/create-instruction optimize-images** — Ensures all property images follow the structure and naming in docs/IMAGE-ORGANIZATION.md.
- **/create-instruction property-completeness-check** — Validates that all properties in `data/properties.json` have required images and data.

---

_Last updated: 2026-03-23_
