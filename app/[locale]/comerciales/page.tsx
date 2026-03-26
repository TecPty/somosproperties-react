import type { Metadata } from "next"
import { Suspense } from "react"
import ComercialesContent from "./comerciales-content"

export const metadata: Metadata = {
  title: "Propiedades Comerciales en Panamá | SOMOS Properties",
  description: "Locales comerciales y oficinas en venta y alquiler en Panamá. Invierte en propiedades comerciales premium.",
  alternates: {
    canonical: "https://somosproperties.com/comerciales",
  },
  openGraph: {
    title: "Propiedades Comerciales en Panamá",
    description: "Locales comerciales y oficinas en venta y alquiler.",
    type: "website",
    url: "https://somosproperties.com/comerciales",
    siteName: "SOMOS Properties",
  },
}

export default function ComercialesPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center">Cargando...</div>}>
      <ComercialesContent />
    </Suspense>
  )
}

