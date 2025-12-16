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
      {/* Fondo azul brillante estrellado */}
      <div className="christmas-modal-bg fixed inset-0 z-[9998] animate-in fade-in duration-1000" onClick={handleClose}>
        {/* Estrellas de fondo */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(200)].map((_, i) => {
            const size = Math.random() > 0.7 ? 2 : 1
            return (
              <div
                key={`star-${i}`}
                className={`christmas-star christmas-star-${size}`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${Math.random() * 2 + 2}s`,
                }}
              />
            )
          })}
        </div>

        {/* Copos de nieve cayendo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={`snow-${i}`}
              className="christmas-snowflake"
              style={{
                fontSize: `${Math.random() * 12 + 8}px`,
                left: `${Math.random() * 100}%`,
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
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
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
                {/* Brillos estelares */}
                <div className="christmas-star-glow-outer" />
                <div className="christmas-star-glow-inner" />

                {/* Estrella amarilla */}
                <div className="christmas-star-icon">
                  <svg fill="currentColor" viewBox="0 0 20 20" className="christmas-star-svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>

              {/* Espiral de luces brillantes */}
              {Array.from({ length: 65 }).map((_, i) => {
                const progress = i / 65
                const spiralTurns = 6.5
                const angle = progress * spiralTurns * Math.PI * 2
                const radius = 6 + progress * 90
                const centerX = 50
                const offsetX = Math.cos(angle) * radius
                const y = 25 + progress * 270

                const colors = ["cyan-300", "cyan-400", "cyan-500", "cyan-600", "blue-300", "blue-400"]
                const colorClass = colors[i % colors.length]
                const size = Math.random() * 6 + 3

                return (
                  <div
                    key={`spiral-${i}`}
                    className={`christmas-light bg-${colorClass}`}
                    style={{
                      left: `calc(${centerX}% + ${offsetX}px)`,
                      top: `${y}px`,
                      width: `${size}px`,
                      height: `${size}px`,
                      animationDelay: `${progress * 2}s`,
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

                return (
                  <div
                    key={`glow-${i}`}
                    className="christmas-particle"
                    style={{
                      left: `calc(${centerX}% + ${offsetX}px)`,
                      top: `${y}px`,
                      width: `${size}px`,
                      height: `${size}px`,
                      animationDelay: `${progress * 2.5}s`,
                    }}
                  />
                )
              })}

              {/* Rastro de brillo */}
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
                    className="christmas-trail"
                    style={{
                      left: `calc(${centerX}% + ${offsetX}px)`,
                      top: `${y}px`,
                      animationDelay: `${progress * 2}s`,
                    }}
                  />
                )
              })}

              {/* Logo como tronco del árbol */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
                <div className="christmas-tree-trunk">
                  <Image src="/images/Logo-SP.png" alt="SOMOS Properties" width={140} height={46} className="h-8 sm:h-10 w-auto" />
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
            Agradecemos tu confianza en este año que termina. Que esta Navidad brinde paz y prosperidad, y que el 2026
            nos encuentre compartiendo nuevos logros juntos.
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

          <p className="text-white/50 text-xs mt-4 sm:mt-6 px-2">Felices Fiestas del equipo de SOMOS Properties</p>
        </div>
      </div>

      {/* Estilos CSS */}
      <style jsx>{`
        /* Fondo gradiente azul */
        .christmas-modal-bg {
          background: radial-gradient(ellipse at bottom, #2563eb 0%, #1e3a8a 100%);
        }

        /* Estrellas */
        .christmas-star {
          position: absolute;
          border-radius: 9999px;
          background-color: white;
        }
        .christmas-star-1 {
          width: 1px;
          height: 1px;
          opacity: 0.5;
        }
        .christmas-star-2 {
          width: 2px;
          height: 2px;
          opacity: 0.8;
        }

        /* Copos de nieve */
        .christmas-snowflake {
          position: absolute;
          color: white;
          top: -20px;
          opacity: 0.7;
          animation: snowfall linear infinite;
        }

        /* Brillos estelares */
        .christmas-star-glow-outer {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 4rem;
          height: 4rem;
          border-radius: 9999px;
          background-color: rgba(255, 255, 255, 0.4);
          filter: blur(1.5rem);
          animation: stellarPulse 2s ease-in-out infinite;
        }

        .christmas-star-glow-inner {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          border-radius: 9999px;
          background-color: rgba(255, 255, 255, 0.6);
          filter: blur(0.75rem);
          animation: stellarPulse 1.5s ease-in-out infinite;
          animation-delay: 0.3s;
        }

        .christmas-star-icon {
          position: relative;
          width: 2rem;
          height: 2rem;
          color: rgb(250 204 21);
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .christmas-star-svg {
          filter: drop-shadow(0 0 20px rgba(250, 204, 21, 1)) drop-shadow(0 0 30px rgba(251, 191, 36, 0.8));
        }

        /* Luces del árbol */
        .christmas-light {
          position: absolute;
          border-radius: 9999px;
          transform: translate(-50%, -50%);
          animation: glowPulse 1.2s ease-in-out infinite;
        }

        .bg-cyan-300 {
          background-color: #67e8f9;
          box-shadow: 0 0 15px #67e8f9, 0 0 22px #67e8f9, 0 0 30px #67e8f9;
        }
        .bg-cyan-400 {
          background-color: #22d3ee;
          box-shadow: 0 0 15px #22d3ee, 0 0 22px #22d3ee, 0 0 30px #22d3ee;
        }
        .bg-cyan-500 {
          background-color: #06b6d4;
          box-shadow: 0 0 15px #06b6d4, 0 0 22px #06b6d4, 0 0 30px #06b6d4;
        }
        .bg-cyan-600 {
          background-color: #0891b2;
          box-shadow: 0 0 15px #0891b2, 0 0 22px #0891b2, 0 0 30px #0891b2;
        }
        .bg-blue-300 {
          background-color: #93c5fd;
          box-shadow: 0 0 15px #93c5fd, 0 0 22px #93c5fd, 0 0 30px #93c5fd;
        }
        .bg-blue-400 {
          background-color: #60a5fa;
          box-shadow: 0 0 15px #60a5fa, 0 0 22px #60a5fa, 0 0 30px #60a5fa;
        }

        /* Partículas blancas */
        .christmas-particle {
          position: absolute;
          border-radius: 9999px;
          background-color: #ffffff;
          box-shadow: 0 0 12px #ffffff, 0 0 20px #ffffff;
          opacity: 0.6;
          transform: translate(-50%, -50%);
          animation: glowPulse 1s ease-in-out infinite;
        }

        /* Rastro de brillo */
        .christmas-trail {
          position: absolute;
          border-radius: 9999px;
          width: 16px;
          height: 16px;
          background: radial-gradient(circle, rgba(103, 232, 249, 0.25) 0%, rgba(103, 232, 249, 0) 70%);
          transform: translate(-50%, -50%);
          pointer-events: none;
          animation: glowPulse 1.5s ease-in-out infinite;
        }

        /* Tronco del árbol (logo) */
        .christmas-tree-trunk {
          background-color: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(4px);
          border-top-left-radius: 0.125rem;
          border-top-right-radius: 0.125rem;
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
          padding: 0.5rem 0.75rem;
          box-shadow: 0 0 25px rgba(103, 232, 249, 0.4), 0 15px 35px rgba(0, 0, 0, 0.3);
          clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
        }
        @media (min-width: 640px) {
          .christmas-tree-trunk {
            padding: 0.75rem 1rem;
          }
        }

        /* Animaciones */
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes snowfall {
          0% {
            transform: translateY(-10vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) translateX(100px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes glowPulse {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes stellarPulse {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.3);
          }
        }

        .christmas-star {
          animation: twinkle linear infinite;
        }
      `}</style>
    </>
  )
}
