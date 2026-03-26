import type { Metadata } from "next"
import { Suspense } from "react"
import ResidencialesContent from "./residenciales-content"

export const metadata: Metadata = {
  title: "Propiedades Residenciales en Panamá | SOMOS Properties",
  description: "Apartamentos y casas en venta y alquiler en Panamá. Busca propiedades residenciales en las mejores ubicaciones del país.",
  alternates: {
    canonical: "https://somosproperties.com/residenciales",
  },
  openGraph: {
    title: "Propiedades Residenciales en Panamá",
    description: "Apartamentos y casas en venta y alquiler en Panamá.",
    type: "website",
    url: "https://somosproperties.com/residenciales",
    siteName: "SOMOS Properties",
  },
}

export default function ResidencialesPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center">Cargando...</div>}>
      <ResidencialesContent />
    </Suspense>
  )
}

