"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { useFocusTrap } from "@/hooks/use-focus-trap"
import { useTranslations } from "next-intl"

const INSTAGRAM_URL = "https://www.instagram.com/somosproperties/?hl=es-la"
const SESSION_KEY = "giveaway-seen"
const SHOW_DELAY_MS = 800

export function GiveawayModal() {
  const t = useTranslations("giveawayModal")
  const [isVisible, setIsVisible] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  useFocusTrap(isVisible, modalRef, handleClose)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "true") return
    const timer = setTimeout(() => setIsVisible(true), SHOW_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  function handleClose() {
    setIsVisible(false)
    sessionStorage.setItem(SESSION_KEY, "true")
  }

  if (!isVisible) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-modal-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="giveaway-modal-title"
      tabIndex={-1}
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="relative max-w-sm md:max-w-md pointer-events-auto animate-modal-scale-in rounded-2xl overflow-hidden shadow-2xl w-[95vw] md:w-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={t("close")}
          data-autofocus="true"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        <h2 id="giveaway-modal-title" className="sr-only">
          {t("title")}
        </h2>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white rounded-2xl overflow-hidden shadow-2xl"
        >
          <img
            src="/promociones/giveaway.webp"
            alt={t("imageAlt")}
            className="w-full h-auto max-w-full"
            loading="eager"
          />
        </a>

        <div className="bg-white p-4">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all hover:scale-105 active:scale-95 text-sm"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </div>
  )
}
