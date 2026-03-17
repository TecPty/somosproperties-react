"use client"

import { useCallback, useMemo, useRef } from "react"
import OptimizedImage from "@/components/optimized-image"

interface VirtualGalleryProps {
  images: string[]
  selectedImage: number
  onSelectImage: (index: number) => void
  propertyTitle: string
}

export function VirtualGallery({ images, selectedImage, onSelectImage, propertyTitle }: VirtualGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsPerRow = typeof window !== "undefined" && window.innerWidth >= 1024 ? 6 : typeof window !== "undefined" && window.innerWidth >= 768 ? 5 : 3
  const visibleRange = useMemo(() => {
    // Show selected image and neighbors to avoid jarring transitions
    const buffer = itemsPerRow * 2
    const start = Math.max(0, selectedImage - buffer)
    const end = Math.min(images.length, selectedImage + buffer)
    return { start, end }
  }, [selectedImage, itemsPerRow, images.length])

  const handleSelectImage = useCallback(
    (index: number) => {
      onSelectImage(index)
      // Scroll thumbnail into view
      setTimeout(() => {
        const thumbnails = containerRef.current?.querySelectorAll("button")
        thumbnails?.[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })
      }, 0)
    },
    [onSelectImage]
  )

  return (
    <div ref={containerRef} className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 overflow-x-auto pb-2">
      {images.map((img, index) => {
        const isVisible = index >= visibleRange.start && index < visibleRange.end
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleSelectImage(index)}
            aria-label={`Ver imagen ${index + 1} de ${images.length}`}
            className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
              selectedImage === index ? "border-[#3898EC] scale-105 shadow-lg" : "border-transparent hover:border-[#cccccc] hover:scale-102"
            }`}
          >
            {isVisible ? (
              <OptimizedImage
                src={img || "/placeholder.svg"}
                alt={`${propertyTitle} - Miniatura ${index + 1}`}
                type="thumbnail"
                width={200}
                height={150}
                sizes="96px"
                priority={index === selectedImage}
              />
            ) : (
              // Placeholder for non-visible images
              <div className="w-full h-full bg-gradient-to-br from-[#f0f0f0] to-[#e8e8e8]" />
            )}
          </button>
        )
      })}
    </div>
  )
}
