"use client"


import { useEffect, useRef, useState } from "react"
import styles from "./promotional-modal.module.css"
import { X } from "lucide-react"
import { useFocusTrap } from "@/hooks/use-focus-trap"

// CAMBIO: props flexibles y control de frecuencia
// RAZÓN: permite reutilizar el modal para cualquier promoción y controlar aparición
interface PromotionalModalProps {
  id: string
  startsAt?: Date
  endsAt?: Date
  showOncePerSession?: boolean
  desktop: string
  mobile?: string
  badge?: string
  headline?: string
  ctaText?: string
  ctaAction?: "contact" | "whatsapp"
  onClose?: () => void
}

export function PromotionalModal({
  id,
  startsAt,
  endsAt,
  showOncePerSession = false,
  desktop,
  mobile,
  badge,
  headline,
  ctaText = "Más Información",
  ctaAction = "contact",
  onClose,
}: PromotionalModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  useFocusTrap(isVisible, modalRef, handleClose)

  // CAMBIO: control de frecuencia y fechas
  // RAZÓN: solo mostrar si está dentro del rango y no se ha visto en la sesión
  useEffect(() => {
    const now = new Date()
    if ((startsAt && now < startsAt) || (endsAt && now > endsAt)) return
    if (showOncePerSession && sessionStorage.getItem(`promo-seen-${id}`) === "true") return
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    const timer = setTimeout(() => setIsVisible(true), 2000)
    return () => {
      window.removeEventListener("resize", checkMobile)
      clearTimeout(timer)
    }
  }, [id, startsAt, endsAt, showOncePerSession])

  function handleClose() {
    setIsVisible(false)
    if (showOncePerSession) sessionStorage.setItem(`promo-seen-${id}`, "true")
    onClose?.()
  }

  function handleCTA() {
    if (ctaAction === "whatsapp") {
      const message = `Hola! Estoy interesado en una promoción. ¿Podrían darme más información?`
      const whatsappUrl = `https://wa.me/50760000000?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, "_blank")
    } else {
      const contactForm = document.getElementById("contact-section")
      if (contactForm) {
        contactForm.scrollIntoView({ behavior: "smooth" })
      } else {
        window.location.href = "/contacto"
      }
    }
    handleClose()
  }

  // CAMBIO: generación determinista de decoraciones
  // RAZÓN: evitar hydration mismatch y mantener estética
  function renderStarsAndSnowflakes() {
    const items = []
    for (let i = 0; i < 60; i++) {
      const left = (i * 37) % 100
      const top = (i * 53) % 100
      const size = 8 + ((i * 13) % 16)
      items.push(
        <div
          key={"star-" + i}
          className={styles.starDecoration}
          style={{
            // @ts-ignore
            ['--left' as any]: `${left}%`,
            ['--top' as any]: `${top}%`,
            ['--size' as any]: `${size}px`,
          }}
        >
          ★
        </div>
      )
    }
    for (let i = 0; i < 30; i++) {
      const left = (i * 61) % 100
      const top = (i * 29) % 100
      const size = 10 + ((i * 7) % 12)
      items.push(
        <div
          key={"snow-" + i}
          className={styles.snowDecoration}
          style={{
            // @ts-ignore
            ['--left' as any]: `${left}%`,
            ['--top' as any]: `${top}%`,
            ['--size' as any]: `${size}px`,
          }}
        >
          ❄
        </div>
      )
    }
    return items
  }

  if (!isVisible) return null
  const imageSrc = isMobile && mobile ? mobile : desktop

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="relative max-w-sm md:max-w-md pointer-events-auto animate-scale-in rounded-2xl overflow-hidden shadow-2xl w-[95vw] md:w-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* CAMBIO: decoraciones deterministas */}
        <div className="absolute inset-0 z-0 pointer-events-none">{renderStarsAndSnowflakes()}</div>
        {/* Badge */}
        {badge && (
          <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce-subtle">
            {badge}
          </div>
        )}
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Cerrar"
          data-autofocus="true"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>
        {/* Imagen principal */}
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={imageSrc}
            alt={headline || "Promoción"}
            className="w-full h-auto max-w-full"
            loading="eager"
          />
          {/* CTA buttons overlay (bottom) */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6">
            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <button
                onClick={handleCTA}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all hover:scale-105 active:scale-95 text-sm"
              >
                {ctaText}
              </button>
              <button
                onClick={handleClose}
                className="sm:w-auto bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-3 px-6 rounded-lg border border-white/30 transition-all hover:scale-105 active:scale-95 text-sm"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
        {/* Headline overlay (top, if provided) */}
        {headline && (
          <div className="absolute top-20 left-0 right-0 text-center px-4">
            <h2 id="modal-title" className="text-2xl md:text-4xl font-bold text-white drop-shadow-2xl">
              {headline}
            </h2>
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); }
        }
        @keyframes bounce-subtle {
          0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-scale-in { animation: scale-in 0.4s ease-out; }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
      `}</style>
    </div>
  )
}
