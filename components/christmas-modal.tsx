"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function ChristmasModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Fondo */}
      <div 
        className="fixed inset-0 z-[9998] animate-in fade-in duration-1000"
        style={{
          background: 'radial-gradient(ellipse at bottom, #2563eb 0%, #1e3a8a 100%)',
        }}
        onClick={handleClose}
      >
        {/* Estrellas */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(200)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                width: Math.random() > 0.7 ? '2px' : '1px',
                height: Math.random() > 0.7 ? '2px' : '1px',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 2}s`,
              }}
            />
          ))}
        </div>

        {/* Nieve */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(100)].map((_, i) => (
            <div
              key={`snow-${i}`}
              className="absolute rounded-full bg-white animate-snowfall"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.6 + 0.4,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 pointer-events-none overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white pointer-events-auto backdrop-blur-sm"
          aria-label="Cerrar"
        >
          <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="max-w-3xl w-full pointer-events-auto">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            
            {/* Árbol */}
            <div className="flex-shrink-0">
              <div className="relative w-[140px] sm:w-[180px] h-[200px] sm:h-[260px]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-6 h-6 text-yellow-400">
                  <svg fill="currentColor" viewBox="0 0 20 20" style={{ filter: 'drop-shadow(0 0 15px rgba(250, 204, 21, 0.8))' }}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>

                {Array.from({ length: 50 }).map((_, i) => {
                  const progress = i / 50
                  const angle = progress * 6 * Math.PI * 2
                  const radius = 5 + progress * 65
                  const x = 70 + Math.cos(angle) * radius
                  const y = 15 + progress * 220
                  const colors = ['#67e8f9', '#22d3ee', '#06b6d4', '#0891b2']
                  const size = 2 + Math.random() * 3
                  
                  return (
                    <div
                      key={`light-${i}`}
                      className="absolute rounded-full"
                      style={{
                        left: `${x}px`,
                        top: `${y}px`,
                        width: `${size}px`,
                        height: `${size}px`,
                        backgroundColor: colors[i % colors.length],
                        boxShadow: `0 0 8px ${colors[i % colors.length]}`,
                        animation: `pulse 2s ease-in-out infinite`,
                        animationDelay: `${progress * 1.5}s`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  )
                })}

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-white/20 backdrop-blur-sm rounded-t-sm p-1.5 sm:p-2" style={{ boxShadow: '0 0 15px rgba(103, 232, 249, 0.3)' }}>
                    <Image src="/images/Logo-SP.png" alt="SOMOS" width={110} height={36} className="h-6 sm:h-7 w-auto" />
                  </div>
                </div>
              </div>
            </div>

            {/* Texto */}
            <div className="text-center md:text-left flex-1 px-2">
              <h1 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-white mb-1 tracking-wide">
                Feliz Navidad y
              </h1>
              <h1 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-white mb-2 md:mb-3 tracking-wide">
                Próspero Año Nuevo
              </h1>

              <p className="text-xs text-white/80 uppercase tracking-wider font-light mb-2">
                Les desea SOMOS Properties
              </p>

              <div className="h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent mb-2 md:mb-3"></div>

              <p className="text-xs text-white/90 mb-3 md:mb-4 leading-snug max-w-sm">
                Agradecemos tu confianza en este año que termina. Que esta Navidad brinde paz y prosperidad, y que el 2026 nos encuentre compartiendo nuevos logros juntos.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 md:justify-start mb-2 md:mb-3">
                <Link
                  href="/propiedades"
                  className="bg-white/90 hover:bg-white text-[#1B2735] px-4 py-1.5 rounded-md font-semibold transition-all shadow-lg hover:shadow-xl backdrop-blur-sm text-xs"
                  onClick={handleClose}
                >
                  Ver Propiedades
                </Link>
                <button
                  onClick={handleClose}
                  className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-4 py-1.5 rounded-md font-semibold transition-all backdrop-blur-sm text-xs"
                >
                  Continuar
                </button>
              </div>

              <p className="text-white/50 text-xs">Felices Fiestas del equipo de SOMOS Properties</p>
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes snowfall {
          0% {
            transform: translateY(-10vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% {
            transform: translateY(110vh) translateX(100px) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        .animate-twinkle {
          animation: twinkle linear infinite;
        }
        
        .animate-snowfall {
          animation: snowfall linear infinite;
        }
      `}</style>
    </>
  )
}
