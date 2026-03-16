"use client"

import Image from "next/image"
import { useState, useCallback } from "react"
import { generateSrcSet, generateSizes, BLUR_DATA_URL, IMAGE_SIZES } from "@/lib/image-config"

interface OptimizedImageProps {
  src: string
  alt: string
  /**
   * Tipo de imagen para determinar tamaños responsivos
   * @default 'propertyCard'
   */
  type?: keyof typeof IMAGE_SIZES
  /**
   * Ancho en píxeles (requerido para layout)
   */
  width?: number
  /**
   * Alto en píxeles (requerido para layout)
   */
  height?: number
  /**
   * Cargar imagen con prioridad (alto LCP)
   */
  priority?: boolean
  /**
   * Mostrar placeholder blur mientras carga
   */
  blur?: boolean
  /**
   * Callback cuando la imagen carga
   */
  onLoad?: () => void
  /**
   * Callback cuando hay error
   */
  onError?: () => void
  /**
   * CSS classes adicionales
   */
  className?: string
  /**
   * Porcentaje de ancho en el contenedor
   * Si se proporciona, el componente será responsivo
   */
  fill?: boolean
  /**
   * Objeto cover/contain/fill
   */
  objectFit?: "cover" | "contain" | "fill"
  /**
   * Posición del objeto
   */
  objectPosition?: string
  /**
   * Quién carga primero cuando hay multiples imágenes
   */
  decoding?: "auto" | "sync" | "async"
  /**
   * Media query sizes para srcSet
   */
  sizes?: string
}

/**
 * Componente optimizado de imagen con:
 * - Lazy loading automático
 * - WebP format con fallback
 * - Responsive srcSet
 * - Blur placeholder
 * - Error handling
 *
 * @example
 * ```tsx
 * <OptimizedImage
 *   src="/images/property.jpg"
 *   alt="Propiedad en Panamá"
 *   type="propertyCard"
 *   priority={false}
 *   blur
 * />
 * ```
 */
export default function OptimizedImage({
  src,
  alt,
  type = "propertyCard",
  width,
  height,
  priority = false,
  blur = true,
  onLoad,
  onError,
  className = "",
  fill = false,
  objectFit = "cover",
  objectPosition = "center",
  decoding = "async",
  sizes: customSizes,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
    onLoad?.()
  }, [onLoad])

  const handleError = useCallback(() => {
    setHasError(true)
    setIsLoading(false)
    onError?.()
  }, [onError])

  // Generar sizes responsivos si no se proporcionan
  const imageSizes = customSizes || generateSizes()

  // Asegurarse de que src es válido
  if (!src) {
    return (
      <div
        className={`bg-[#f3f3f3] flex items-center justify-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="text-[#aaaaaa] text-xs">Imagen no disponible</span>
      </div>
    )
  }

  // Cuando fill=true, la altura viene del contenedor padre
  // No crear wrapper adicional, aplicar className al Image directamente
  if (fill) {
    return (
      <>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={imageSizes}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          decoding={decoding}
          quality={80}
          placeholder={blur ? "blur" : "empty"}
          blurDataURL={blur ? BLUR_DATA_URL : undefined}
          onLoadingComplete={handleLoadingComplete}
          onError={handleError}
          style={{
            objectFit: objectFit as React.CSSProperties['objectFit'],
            objectPosition: objectPosition as React.CSSProperties['objectPosition'],
          }}
          className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"} ${className}`}
        />

        {/* Loading skeleton */}
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#f3f3f3] via-[#f9f9f9] to-[#f3f3f3] animate-pulse pointer-events-none" />
        )}

        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 bg-[#f3f3f3] flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <svg
                className="h-8 w-8 text-[#aaaaaa] mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-xs text-[#aaaaaa]">Error al cargar imagen</p>
            </div>
          </div>
        )}
      </>
    )
  }

  // Layout estándar (requiere width y height)
  if (!width || !height) {
    console.warn(
      `OptimizedImage: width y height son requeridos cuando fill=false. src: ${src}`
    )
    return <span className="text-red-500 text-xs">Error: width/height requeridos</span>
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ maxWidth: "100%" }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={imageSizes}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        decoding={decoding}
        quality={80}
        placeholder={blur ? "blur" : "empty"}
        blurDataURL={blur ? BLUR_DATA_URL : undefined}
        onLoadingComplete={handleLoadingComplete}
        onError={handleError}
        style={{
          width: "100%",
          height: "auto",
        }}
        className={`transition-opacity duration-300 ${isLoading ? "opacity-0" : "opacity-100"}`}
      />

      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#f3f3f3] via-[#f9f9f9] to-[#f3f3f3] animate-pulse" />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-[#f3f3f3] flex items-center justify-center">
          <div className="text-center">
            <svg
              className="h-8 w-8 text-[#aaaaaa] mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-xs text-[#aaaaaa]">Error al cargar imagen</p>
          </div>
        </div>
      )}
    </div>
  )
}
