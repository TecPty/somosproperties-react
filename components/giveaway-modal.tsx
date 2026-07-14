"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { useFocusTrap } from "@/hooks/use-focus-trap"
import { useCountdown } from "@/hooks/use-countdown"
import { useTranslations } from "next-intl"
import { GIVEAWAY_DRAW_AT } from "@/lib/giveaway"

const INSTAGRAM_URL = "https://www.instagram.com/somosproperties/?hl=es-la"
const SESSION_KEY = "giveaway-seen"
const SHOW_DELAY_MS = 800

function pad(value: number) {
  return value.toString().padStart(2, "0")
}

export function GiveawayModal() {
  const t = useTranslations("giveawayModal")
  const [isVisible, setIsVisible] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const countdown = useCountdown(GIVEAWAY_DRAW_AT)
  useFocusTrap(isVisible, modalRef, handleClose)

  useEffect(() => {
    if (Date.now() >= GIVEAWAY_DRAW_AT.getTime()) return
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
          className="block rounded-2xl overflow-hidden shadow-2xl"
        >
          <img
            src="/promociones/giveaway.webp"
            alt={t("imageAlt")}
            className="w-full h-auto max-w-full"
            loading="eager"
          />
        </a>

        <div className="px-4 pt-4 text-center">
          {countdown.isOver ? (
            <p className="text-sm font-bold text-white">{t("countdownEnded")}</p>
          ) : (
            <>
              <p className="text-xs font-semibold text-gray-300 uppercase tracking-wide mb-1">
                {t("countdownLabel")}
              </p>
              <div className="flex items-center justify-center gap-1 font-mono text-[1.53rem] font-bold text-white tabular-nums">
                <span>{pad(countdown.hours)}</span>
                <span>:</span>
                <span>{pad(countdown.minutes)}</span>
                <span>:</span>
                <span>{pad(countdown.seconds)}</span>
              </div>
            </>
          )}
        </div>

        <div className="p-4">
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
