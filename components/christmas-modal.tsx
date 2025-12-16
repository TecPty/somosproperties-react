"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function ChristmasModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Mostrar modal cada vez que se carga la página de inicio
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
      {/* Fondo azul brillante estrellado */}
      <div 
        className="fixed inset-0 z-[9998] animate-in fade-in duration-1000"
        style={{
          background: 'radial-gradient(ellipse at bottom, #2563eb 0%, #1e3a8a 100%)',
        }}
        onClick={handleClose}
      >
        {/* Estrellas de fondo */}
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

        {/* Copos de nieve cayendo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={`snow-${i}`}
              className="absolute text-white animate-snowfall"
              style={{
                fontSize: `${Math.random() * 12 + 8}px`,
                left: `${Math.random() * 100}%`,
                top: `-20px`,
                opacity: Math.random() * 0.7 + 0.3,
                animationDuration: `${Math.random() * 8 + 8}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              ❄
            </div>
          ))}
        </div>
      </div>

      {/* Contenido del Modal */}
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center min-h-screen p-3 sm:p-4 py-8 sm:py-12 pointer-events-none overflow-y-auto">
        {/* Botón cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white pointer-events-auto backdrop-blur-sm"
          aria-label="Cerrar"
        >
          <svg className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="max-w-sm sm:max-w-md pointer-events-auto text-center">
          {/* Mensaje superior */}
          <div className="mb-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white mb-2 tracking-wide">
              Feliz Navidad y Próspero Año Nuevo
            </h1>
          </div>

          {/* Árbol de Navidad animado con logo como tronco */}
          <div className="relative mb-6 flex justify-center">
            <div className="christmas-tree relative w-[200px] sm:w-[280px] h-[280px] sm:h-[380px]">
              {/* Estrella en la punta */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
                {/* Brillo blanco estelar detrás */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/40 blur-xl animate-pulse" style={{
                    animation: 'stellarPulse 2s ease-in-out infinite'
                  }}></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/60 blur-lg animate-pulse" style={{
                    animation: 'stellarPulse 1.5s ease-in-out infinite',
                    animationDelay: '0.3s'
                  }}></div>
                </div>
                {/* Estrella amarilla */}
                <div className="star-glow relative w-8 h-8 text-yellow-400 animate-pulse">
                  <svg fill="currentColor" viewBox="0 0 20 20" style={{ filter: 'drop-shadow(0 0 20px rgba(250, 204, 21, 1)) drop-shadow(0 0 30px rgba(251, 191, 36, 0.8))' }}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>

              {/* Espiral de luces brillantes - Efecto partículas */}
              {Array.from({ length: 65 }).map((_, i) => {
                const progress = i / 65
                const spiralTurns = 6.5
                const angle = progress * spiralTurns * Math.PI * 2
                // Radio crece progresivamente para formar cono (más ancho abajo)
                const radius = 6 + progress * 90
                const centerX = 50 // Porcentaje
                const offsetX = Math.cos(angle) * radius
                const y = 25 + progress * 270
                
                const colors = ['#67e8f9', '#22d3ee', '#06b6d4', '#0891b2', '#93c5fd', '#60a5fa']
                const color = colors[i % colors.length]
                const size = Math.random() * 6 + 3
                const glowIntensity = Math.random() * 20 + 15
                
                return (
                  <div
                    key={`spiral-${i}`}
                    className="absolute rounded-full"
                    style={{
                      left: `${centerX}%`,
                      top: `${y}px`,
                      width: `${size}px`,
                      height: `${size}px`,
                      backgroundColor: color,
                      boxShadow: `
                        0 0 ${glowIntensity}px ${color},
                        0 0 ${glowIntensity * 1.5}px ${color},
                        0 0 ${glowIntensity * 2}px ${color}
                      `,
                      animation: `glowPulse ${1 + Math.random()}s ease-in-out infinite`,
                      animationDelay: `${progress * 2}s`,
                      transform: `translate(calc(-50% + ${offsetX}px), -50%)`,
                    }}
                  />
                )
              })}

              {/* Partículas adicionales para más brillo */}
              {Array.from({ length: 30 }).map((_, i) => {
                const progress = i / 30
                const spiralTurns = 6.5
                const angle = progress * spiralTurns * Math.PI * 2 + Math.PI / 4
                const radius = 10 + progress * 85
                const centerX = 50
                const offsetX = Math.cos(angle) * radius
                const y = 28 + progress * 265
                
                const size = Math.random() * 3 + 1.5
                const color = '#ffffff'
                
                return (
                  <div
                    key={`glow-${i}`}
                    className="absolute rounded-full"
                    style={{
                      left: `${centerX}%`,
                      top: `${y}px`,
                      width: `${size}px`,
                      height: `${size}px`,
                      backgroundColor: color,
                      boxShadow: `0 0 12px ${color}, 0 0 20px ${color}`,
                      opacity: 0.6,
                      animation: `glowPulse ${0.8 + Math.random() * 0.4}s ease-in-out infinite`,
                      animationDelay: `${progress * 2.5}s`,
                      transform: `translate(calc(-50% + ${offsetX}px), -50%)`,
                    }}
                  />
                )
              })}

              {/* Rastro de brillo detrás del árbol */}
              {Array.from({ length: 45 }).map((_, i) => {
                const progress = i / 45
                const spiralTurns = 6.5
                const angle = progress * spiralTurns * Math.PI * 2
                const radius = 8 + progress * 88
                const centerX = 50
                const offsetX = Math.cos(angle) * radius
                const y = 26 + progress * 268
                
                return (
                  <div
                    key={`trail-${i}`}
                    className="absolute rounded-full"
                    style={{
                      left: `${centerX}%`,
                      top: `${y}px`,
                      width: '16px',
                      height: '16px',
                      background: 'radial-gradient(circle, rgba(103, 232, 249, 0.25) 0%, rgba(103, 232, 249, 0) 70%)',
                      animation: `glowPulse ${1.5}s ease-in-out infinite`,
                      animationDelay: `${progress * 2}s`,
                      transform: `translate(calc(-50% + ${offsetX}px), -50%)`,
                      pointerEvents: 'none',
                    }}
                  />
                )
              })}

              {/* Logo como tronco del árbol */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
                <div className="bg-white/30 backdrop-blur-sm rounded-t-sm rounded-b-md px-3 sm:px-4 py-2 sm:py-3 shadow-2xl" style={{
                  boxShadow: '0 0 25px rgba(103, 232, 249, 0.4), 0 15px 35px rgba(0, 0, 0, 0.3)',
                  clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)'
                }}>
                  <Image
                    src="/images/Logo-SP.png"
                    alt="SOMOS Properties"
                    width={140}
                    height={46}
                    className="h-8 sm:h-10 w-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Texto debajo del árbol */}
          <p className="text-xs sm:text-sm text-white/80 uppercase tracking-wider font-light mb-3">
            Les desea SOMOS Properties
          </p>

          {/* Línea decorativa */}
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent mx-auto mb-4"></div>

          {/* Mensaje inferior */}
          <p className="text-xs sm:text-sm text-white/90 mb-4 sm:mb-6 max-w-sm mx-auto leading-snug px-2 sm:px-3">
            Agradecemos tu confianza en este año que termina. 
            Que esta Navidad brinde paz y prosperidad, y que el 2026 nos encuentre 
            compartiendo nuevos logros juntos.
          </p>

          {/* Botones */}
          <div className="flex flex-col w-full sm:flex-row gap-2 sm:gap-3 justify-center px-2 max-w-xs mx-auto">
            <Link
              href="/propiedades"
              className="inline-block bg-white/90 hover:bg-white text-[#1B2735] px-5 sm:px-6 py-2 sm:py-2.5 rounded-md font-semibold transition-all shadow-lg hover:shadow-xl backdrop-blur-sm text-xs sm:text-sm flex-1 sm:flex-none"
              onClick={handleClose}
            >
              Ver Propiedades
            </Link>
            <button
              onClick={handleClose}
              className="inline-block bg-white/10 hover:bg-white/20 border border-white/30 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-md font-semibold transition-all backdrop-blur-sm text-xs sm:text-sm flex-1 sm:flex-none"
            >
              Continuar
            </button>
          </div>

          <p className="text-white/50 text-xs mt-4 sm:mt-6 px-2">
            Felices Fiestas del equipo de SOMOS Properties
          </p>
        </div>
      </div>

      {/* Estilos de animaciones */}
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
        
        @keyframes glowPulse {
          0%, 100% { 
            opacity: 0.6;
          }
          50% { 
            opacity: 1;
          }
        }
        
        @keyframes stellarPulse {
          0%, 100% { 
            opacity: 0.4;
            transform: scale(1);
          }
          50% { 
            opacity: 0.8;
            transform: scale(1.3);
          }
        }
        
        .star-glow {
          filter: drop-shadow(0 0 20px rgba(103, 232, 249, 0.9));
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
