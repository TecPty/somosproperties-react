"use client"

import { useEffect } from "react"

interface SchemaProps {
  schema: Record<string, unknown>
}

/**
 * Component to inject JSON-LD schema markup into page head.
 * Must be used in a client component.
 * 
 * Example: SchemaMarkup component with getPropertyListingSchema from lib/schema
 */
export function SchemaMarkup({ schema }: SchemaProps) {
  useEffect(() => {
    if (!schema) return

    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.innerHTML = JSON.stringify(schema)
    script.async = true

    // Add to head for best practices
    document.head.appendChild(script)

    // Cleanup
    return () => {
      document.head.removeChild(script)
    }
  }, [schema])

  return null
}

/**
 * Multiple schemas injector
 * Pass array of schemas to inject multiple structured data blocks
 */
export function SchemaMarkupMultiple({ schemas }: { schemas: Record<string, unknown>[] }) {
  useEffect(() => {
    if (!schemas || schemas.length === 0) return

    const scripts: HTMLScriptElement[] = []

    schemas.forEach((schema) => {
      const script = document.createElement("script")
      script.type = "application/ld+json"
      script.innerHTML = JSON.stringify(schema)
      script.async = true
      document.head.appendChild(script)
      scripts.push(script)
    })

    // Cleanup
    return () => {
      scripts.forEach((script) => {
        try {
          document.head.removeChild(script)
        } catch (e) {
          // Already removed
        }
      })
    }
  }, [schemas])

  return null
}
