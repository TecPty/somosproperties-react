import nextConfig from "eslint-config-next"
import nextCoreWebVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

export default [
  // Ignore generated/external files
  {
    ignores: [
      "components/ui/**",
      "scripts/**",
      ".next/**",
      "node_modules/**",
    ],
  },
  ...nextConfig,
  ...nextCoreWebVitals,
  ...nextTs,
  // Project-level overrides
  {
    rules: {
      // Standard hydration mount pattern in Next.js — not a problem
      "react-hooks/set-state-in-effect": "off",
    },
  },
]
