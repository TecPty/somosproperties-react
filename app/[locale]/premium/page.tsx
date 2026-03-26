import type { Metadata } from "next"
import { Suspense } from "react"
import PremiumContent from "./premium-content"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "Propiedades Premium en Panamá | SOMOS Properties",
  description:
    "Propiedades exclusivas con ubicaciones privilegiadas, acabados de lujo y amenidades premium. Descubre las mejores opciones en Punta Pacífica, Costa del Este y más.",
  path: "/premium",
})

export default function PremiumPage() {
  return (
    <Suspense fallback={<div className="py-12 text-center">Cargando propiedades premium...</div>}>
      <PremiumContent />
    </Suspense>
  )
}
