"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"

interface LazyMapProps {
  mapSrc: string | null
  propertyLocation: string
}

export function LazyMap({ mapSrc, propertyLocation }: LazyMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const t = useTranslations('common')

  useEffect(() => {
    if (!mapSrc || typeof window === "undefined") return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: "50px",
        threshold: 0.01,
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [mapSrc])

  if (!mapSrc) {
    return (
      <div className="w-full h-[200px] rounded-lg border border-dashed border-[#cccccc] bg-[#fafafa] flex flex-col items-center justify-center text-[#999999] text-sm gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-[#cccccc]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>{t('locationUnavailable')}</span>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg border border-[#eeeeee]">
      {isVisible ? (
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          className="border-0"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map: ${propertyLocation}`}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#f0f0f0] to-[#e8e8e8] flex items-center justify-center">
          <div className="text-[#999999] text-center">
            <div className="inline-block">
              <svg
                className="animate-spin h-8 w-8 text-[#0066cc]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
            <p className="text-sm mt-2">{t('loadingMap')}</p>
          </div>
        </div>
      )}
    </div>
  )
}
