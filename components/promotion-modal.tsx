'use client'

/**
 * Modal de Promoción - Client Component
 * 
 * Muestra imagen completa de promoción en modal responsive.
 * Detecta dispositivo para mostrar versión desktop o mobile.
 */

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import type { Promotion } from '@/types/promotions'
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface PromotionModalProps {
  promotion: Promotion
  isOpen: boolean
  onClose: () => void
}

export function PromotionModal({ promotion, isOpen, onClose }: PromotionModalProps) {
  const [isMobile, setIsMobile] = useState(false)

  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Check inicial
    checkMobile()

    // Escuchar cambios de tamaño
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Cerrar con tecla ESC (manejado por Dialog, pero por si acaso)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  // Seleccionar imagen según dispositivo
  const imageSource = isMobile ? promotion.images.mobile : promotion.images.desktop

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        {/* Backdrop personalizado */}
        <DialogOverlay className="bg-black/70 backdrop-blur-sm" />

        {/* Contenido del Modal */}
        <div
          className={cn(
            'fixed inset-0 z-50',
            'flex items-center justify-center',
            'p-4'
          )}
        >
          {/* Contenedor de Imagen */}
          <div
            className={cn(
              'relative',
              'max-w-6xl w-full',
              'max-h-[90vh]',
              'bg-white dark:bg-gray-900',
              'rounded-lg shadow-2xl',
              'overflow-hidden'
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón Cerrar */}
            <button
              onClick={onClose}
              className={cn(
                'absolute top-4 right-4 z-10',
                'p-2 rounded-full',
                'bg-black/60 hover:bg-black/80',
                'text-white',
                'transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black'
              )}
              aria-label="Cerrar modal"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Imagen Responsive */}
            <div className="relative w-full">
              <Image
                src={imageSource}
                alt={promotion.title}
                width={isMobile ? 600 : 1200}
                height={isMobile ? 1000 : 800}
                className="w-full h-auto"
                priority
                quality={90}
              />
            </div>

            {/* Opcional: Footer con CTA (comentado por ahora) */}
            {/* 
            <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <button
                  className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                  onClick={() => {
                    // Acción de contacto
                    window.location.href = 'mailto:ventas@somosproperties.com'
                  }}
                >
                  Contactar Ahora
                </button>
                <button
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  onClick={onClose}
                >
                  Cerrar
                </button>
              </div>
            </div>
            */}
          </div>
        </div>
      </DialogPortal>
    </Dialog>
  )
}
