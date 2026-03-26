"use client"

import { SchemaMarkup } from "@/components/schema-markup"
import { getLocalBusinessSchema, getOrganizationSchema } from "@/lib/schema"

export function NosotrosSchemaWrapper() {
  return (
    <SchemaMarkup
      schema={{
        "@context": "https://schema.org",
        "@graph": [getOrganizationSchema(), getLocalBusinessSchema()],
      }}
    />
  )
}
