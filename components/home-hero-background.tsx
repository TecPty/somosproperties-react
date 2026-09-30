"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export default function HomeHeroBackground() {
  const [playVideo, setPlayVideo] = useState(false)
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)")
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setPlayVideo(desktop.matches && !reducedMotion.matches)
    update()
    desktop.addEventListener("change", update)
    reducedMotion.addEventListener("change", update)
    return () => {
      desktop.removeEventListener("change", update)
      reducedMotion.removeEventListener("change", update)
    }
  }, [])
  return (
    <>
      <Image src="/images/hero-poster.webp" alt="" fill priority sizes="100vw" className="object-cover" />
      {playVideo && (
        <video autoPlay loop muted playsInline preload="metadata" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" poster="/images/hero-poster.webp">
          <source src="/videos/hero-video-desktop.mp4" type="video/mp4" />
          <source src="/videos/hero-video-desktop_webm.webm" type="video/webm" />
        </video>
      )}
    </>
  )
}
