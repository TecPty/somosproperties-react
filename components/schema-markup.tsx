interface SchemaProps {
  schema: Record<string, unknown>
}

// CAMBIO: el JSON-LD se renderiza como <script> en el JSX en vez de inyectarse con useEffect.
// RAZÓN: useEffect no corre en el servidor, asi que el HTML inicial no traia datos estructurados
// y los crawlers de IA (GPTBot, ClaudeBot, OAI-SearchBot) no ejecutan JavaScript.
// Se escapa "<" para que un texto con "</script>" no pueda cerrar el tag antes de tiempo.
function serializeSchema(schema: Record<string, unknown>): string {
  return JSON.stringify(schema).replace(/</g, "\\u003c")
}

/**
 * Renders a JSON-LD schema block into the initial HTML.
 * Works in both server and client components.
 */
export function SchemaMarkup({ schema }: SchemaProps) {
  if (!schema) return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeSchema(schema) }}
    />
  )
}

/**
 * Multiple schemas renderer
 * Pass array of schemas to render multiple structured data blocks
 */
export function SchemaMarkupMultiple({ schemas }: { schemas: Record<string, unknown>[] }) {
  if (!schemas || schemas.length === 0) return null

  return (
    <>
      {schemas.map((schema, index) => (
        <SchemaMarkup key={index} schema={schema} />
      ))}
    </>
  )
}
