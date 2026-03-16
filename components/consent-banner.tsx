"use client"

import dynamic from "next/dynamic"

// Carga dinámica del contenido del banner para evitar problemas de hidratación
const ConsentBannerContent = dynamic(
  () => import("@/components/consent-banner-content"),
  { ssr: false }
)

export default function ConsentBanner() {
  return <ConsentBannerContent />
}
