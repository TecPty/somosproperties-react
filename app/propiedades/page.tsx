import type { Metadata } from "next"
import { Suspense } from "react"
import PropiedadesContent from "./propiedades-content"

export const metadata: Metadata = {
  title: "Todas las Propiedades | SOMOS Properties",
  description: "Explora miles de propiedades en venta y alquiler en Panamá. Residenciales, comerciales y locales.",
  alternates: {
    canonical: "https://somosproperties.com/propiedades",
  },
  openGraph: {
    title: "Todas las Propiedades",
    description: "Explora miles de propiedades en Panamá.",
    type: "website",
    url: "https://somosproperties.com/propiedades",
    siteName: "SOMOS Properties",
  },
}

export default function PropiedadesPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center">Cargando...</div>}>
      <PropiedadesContent />
    </Suspense>
  )
}
