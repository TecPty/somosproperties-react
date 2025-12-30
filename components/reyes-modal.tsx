"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function ReyesModal() {
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
          background: "radial-gradient(ellipse at bottom, #1d4ed8 0%, #0b1120 55%, #020617 100%)",
        }}
        onClick={handleClose}
      >
        {/* Estrellas */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(220)].map((_, i) => (
            <div
              key={`star-${i}`}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                width: Math.random() > 0.7 ? "2px" : "1px",
                height: Math.random() > 0.7 ? "2px" : "1px",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.7 + 0.3,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 2}s`,
              }}
            />
          ))}
        </div>

        {/* Estrellas fugaces */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <span
              key={`shooting-${i}`}
              className="shooting-star"
              style={{
                top: `${Math.random() * 50}%`,
                left: `${Math.random() * 60}%`,
                animationDelay: `${i * 1.4}s`,
                animationDuration: `${6 + Math.random() * 3}s`,
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
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className="max-w-5xl w-full pointer-events-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12">
            {/* Texto Izquierdo */}
            <div className="text-center flex-1 px-2 hidden lg:block">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-2 tracking-wide">
                Feliz Dia de Reyes
              </h1>
              <p className="text-base text-white/80 font-light leading-relaxed">
                Que la luz guie nuevos comienzos en tu hogar
              </p>
            </div>

            {/* Estrella Centro */}
            <div className="flex-shrink-0 flex justify-center">
              <div className="relative w-[220px] sm:w-[280px] h-[320px] sm:h-[420px]">
                <div
                  className="absolute top-6 left-1/2 -translate-x-1/2 z-20 w-12 h-12 text-yellow-300 animate-stellarPulse"
                  style={{
                    filter: "drop-shadow(0 0 30px rgba(250, 204, 21, 0.9))",
                    animation: "floatingStar 3s ease-in-out infinite",
                  }}
                >
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>

                <div className="absolute inset-0 flex items-end justify-center">
                  <div className="w-full h-[220px] sm:h-[260px] rounded-[32px] bg-gradient-to-t from-[#0b1b3a] via-[#0f2a5a] to-transparent border border-white/10 backdrop-blur-sm">
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-5">
                      {[0, 1, 2].map((i) => (
                        <div key={`king-${i}`} className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-white/90" />
                          <div className="w-6 h-8 rounded-t-full bg-white/70 mt-1" />
                          <div className="w-10 h-3 rounded-full bg-white/40 mt-2" />
                        </div>
                      ))}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0b1b3a] to-transparent" />
                  </div>
                </div>
              </div>
            </div>

            {/* Texto Derecho */}
            <div className="text-center flex-1 px-2">
              {/* Mobile - Mostrar titulo */}
              <div className="lg:hidden mb-2">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-1 tracking-wide">
                  Feliz Dia de Reyes
                </h1>
                <p className="text-sm text-white/80 font-light mb-3">SOMOS Properties</p>
              </div>

              {/* Mensaje principal */}
              <p className="text-sm sm:text-base text-white/90 leading-snug">
                Que la Estrella de Belen inspire nuevos caminos y que este ano venga lleno de oportunidades para tu nuevo hogar.
              </p>
              <div className="mt-4 flex justify-center lg:justify-start">
                <Link
                  href="/premium"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/90 hover:bg-white/20 transition-colors"
                >
                  Ver propiedades destacadas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        @keyframes floatingStar {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes stellarPulse {
          0%, 100% {
            opacity: 0.8;
            transform: scale(1) drop-shadow(0 0 20px rgba(250, 204, 21, 0.6));
          }
          50% {
            opacity: 1;
            transform: scale(1.15) drop-shadow(0 0 30px rgba(250, 204, 21, 1));
          }
        }

        .animate-twinkle {
          animation: twinkle linear infinite;
        }

        .animate-stellarPulse {
          animation: stellarPulse 2s ease-in-out infinite;
        }

        .shooting-star {
          position: absolute;
          width: 140px;
          height: 2px;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0));
          border-radius: 999px;
          transform: rotate(-20deg) translateX(-120%);
          opacity: 0;
          animation: shootingStar linear infinite;
        }

        @keyframes shootingStar {
          0% {
            transform: rotate(-20deg) translateX(-120%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          40% {
            transform: rotate(-20deg) translateX(140vw);
            opacity: 0;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}
