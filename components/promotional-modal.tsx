"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import type { PromotionalFlyer } from "@/lib/types"
import { CONTACT } from "@/lib/config"

interface PromotionalModalProps {
  promo: PromotionalFlyer
  propertyId: number
  propertyTitle: string
  onClose: () => void
}

export function PromotionalModal({ promo, propertyId, propertyTitle, onClose }: PromotionalModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if already seen in this session
    const sessionKey = `promo-seen-${propertyId}`
    const hasSeenPromo = promo.showOnce !== false && sessionStorage.getItem(sessionKey) === "true"

    if (hasSeenPromo) {
      return
    }

    // Detect mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Show modal after delay
    const delay = promo.showDelay ?? 2000
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => {
      window.removeEventListener("resize", checkMobile)
      clearTimeout(timer)
    }
  }, [propertyId, promo.showDelay, promo.showOnce])

  const handleClose = () => {
    setIsVisible(false)
    if (promo.showOnce !== false) {
      sessionStorage.setItem(`promo-seen-${propertyId}`, "true")
    }
    onClose()
  }

  const handleCTA = () => {
    const action = promo.cta?.action || "contact"

    if (action === "whatsapp") {
      const message = `Hola! Estoy interesado en ${propertyTitle}. ¿Podrían darme más información?`
      const whatsappUrl = `https://wa.me/${CONTACT.whatsapp.raw}?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, "_blank")
    } else if (action === "contact") {
      // Scroll to contact form if exists, or navigate to contact page
      const contactForm = document.getElementById("contact-section")
      if (contactForm) {
        contactForm.scrollIntoView({ behavior: "smooth" })
      } else {
        window.location.href = `/contacto?property=${encodeURIComponent(propertyTitle)}`
      }
    }

    handleClose()
  }

  if (!isVisible) return null

  const imageSrc = isMobile ? promo.mobile : promo.desktop

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] animate-fade-in"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative w-full max-w-4xl pointer-events-auto animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Badge */}
          {promo.badge && (
            <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10 bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-full text-sm md:text-base font-bold shadow-lg animate-bounce-subtle">
              {promo.badge}
            </div>
          )}

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 left-4 md:top-6 md:left-6 z-10 bg-white/90 backdrop-blur-sm hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
          </button>

          {/* Flyer image */}
          <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={imageSrc}
              alt={promo.headline || propertyTitle}
              className="w-full h-auto"
              loading="eager"
            />

            {/* CTA buttons overlay (bottom) */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 md:p-8">
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-2xl mx-auto">
                <button
                  onClick={handleCTA}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg shadow-lg transition-all hover:scale-105 active:scale-95 text-sm md:text-base"
                >
                  {promo.cta?.text || "Más Información"}
                </button>
                <button
                  onClick={handleClose}
                  className="sm:w-auto bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg border border-white/30 transition-all hover:scale-105 active:scale-95 text-sm md:text-base"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>

          {/* Headline overlay (top, if provided) */}
          {promo.headline && (
            <div className="absolute top-20 md:top-24 left-0 right-0 text-center px-4">
              <h2 className="text-2xl md:text-4xl font-bold text-white drop-shadow-2xl">
                {promo.headline}
              </h2>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.4s ease-out;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
