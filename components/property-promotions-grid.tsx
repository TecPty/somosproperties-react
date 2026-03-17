'use client'

/**
 * Grid de Promociones - Client Component
 * 
 * Muestra thumbnails clickeables de promociones.
 * Al hacer click, abre un modal con la imagen completa.
 */

import { useState } from 'react'
import Image from 'next/image'
import type { Promotion } from '@/types/promotions'
import { PromotionModal } from './promotion-modal'
import { cn } from '@/lib/utils'

interface PropertyPromotionsGridProps {
  promotions: Promotion[]
  propertyTitle: string
}

export function PropertyPromotionsGrid({ promotions, propertyTitle }: PropertyPromotionsGridProps) {
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Debug logging
  console.log('[PropertyPromotionsGrid] Received promotions:', promotions)
  console.log('[PropertyPromotionsGrid] Promotions count:', promotions?.length || 0)

  // Si no hay promociones, no renderizar nada
  if (!promotions || promotions.length === 0) {
    console.log('[PropertyPromotionsGrid] No promotions to display - returning null')
    return null
  }

  console.log('[PropertyPromotionsGrid] Rendering grid with', promotions.length, 'promotions')

  const handlePromotionClick = (promotion: Promotion) => {
    setSelectedPromotion(promotion)
    setIsModalOpen(true)

    // Opcional: Tracking de analytics
    // trackGaEvent('promotion_click', {
    //   promotion_id: promotion.id,
    //   promotion_type: promotion.type,
    //   property_title: propertyTitle,
    // })
  }

  return (
    <>
      {/* Sección de Promociones */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border-t-4 border-blue-600" aria-labelledby="promotions-heading">
        <div className="container-custom">
          <div className="text-center mb-8">
            <div className="inline-block mb-2">
              <span className="text-4xl">🎁</span>
            </div>
            <h2
              id="promotions-heading"
              className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-100 mb-2"
            >
              Promociones Especiales
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Haz clic en la imagen para ver los detalles completos
            </p>
          </div>

          {/* Grid Responsive */}
          <div
            className={cn(
              'grid gap-4',
              // 1 columna en mobile
              'grid-cols-1',
              // 2 columnas en tablet
              'md:grid-cols-2',
              // 2-3 columnas en desktop según cantidad
              promotions.length >= 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
            )}
          >
            {promotions.map((promotion) => (
              <PromotionThumbnail
                key={promotion.id}
                promotion={promotion}
                onClick={() => handlePromotionClick(promotion)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedPromotion && (
        <PromotionModal
          promotion={selectedPromotion}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            // Pequeño delay antes de limpiar para animación
            setTimeout(() => setSelectedPromotion(null), 200)
          }}
        />
      )}
    </>
  )
}

/**
 * Thumbnail Individual de Promoción
 */
interface PromotionThumbnailProps {
  promotion: Promotion
  onClick: () => void
}

function PromotionThumbnail({ promotion, onClick }: PromotionThumbnailProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        // Base
        'relative group overflow-hidden rounded-xl',
        'w-full',
        'bg-white dark:bg-gray-800',
        'border-4 border-blue-200 dark:border-blue-900',
        'shadow-lg',
        // Interactividad
        'cursor-pointer transition-all duration-300 ease-out',
        'hover:scale-[1.03] hover:shadow-2xl hover:border-blue-400',
        'focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2',
        'active:scale-[0.98]'
      )}
      aria-label={`Ver promoción: ${promotion.title}`}
    >
      {/* Badge "Ver Promoción" */}
      <div className="absolute top-4 right-4 z-10">
        <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          👁️ Ver Promoción
        </span>
      </div>
      {/* Imagen */}
      <Image
        src={promotion.images.thumbnail}
        alt={promotion.title}
        width={800}
        height={450}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />

      {/* Overlay Hover */}
      <div
        className={cn(
          'absolute inset-0',
          'bg-black/0 group-hover:bg-black/50',
          'transition-all duration-300',
          'flex items-center justify-center'
        )}
      >
        <span
          className={cn(
            'text-white font-bold text-xl md:text-2xl',
            'opacity-0 group-hover:opacity-100',
            'transition-opacity duration-300',
            'px-6 py-3 rounded-lg bg-blue-600 shadow-xl'
          )}
        >
          Ver detalles
        </span>
      </div>

      {/* Badge para promociones compartidas (opcional) */}
      {promotion.type === 'shared' && (
        <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
          Promoción
        </div>
      )}
    </button>
  )
}
