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
          {[...Array(100)].map((_, i) => {
            const size = Math.random() * 7.26 + 3.63
            return (
            <svg
              key={`snow-${i}`}
              className="absolute animate-snowfall"
              width={size}
              height={size}
              viewBox="0 0 100 100"
              style={{
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.6 + 0.4,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              <g fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                {/* Rama superior */}
                <line x1="50" y1="50" x2="50" y2="10" />
                <line x1="50" y1="25" x2="35" y2="15" />
                <line x1="50" y1="25" x2="65" y2="15" />
                <line x1="35" y1="15" x2="30" y2="5" />
                <line x1="65" y1="15" x2="70" y2="5" />
                
                {/* Rama superior-derecha */}
                <line x1="50" y1="50" x2="75" y2="30" />
                <line x1="63" y1="40" x2="75" y2="30" />
                <line x1="63" y1="40" x2="72" y2="35" />
                <line x1="75" y1="30" x2="85" y2="25" />
                <line x1="72" y1="35" x2="82" y2="30" />
                
                {/* Rama inferior-derecha */}
                <line x1="50" y1="50" x2="75" y2="70" />
                <line x1="63" y1="60" x2="75" y2="70" />
                <line x1="63" y1="60" x2="72" y2="65" />
                <line x1="75" y1="70" x2="85" y2="75" />
                <line x1="72" y1="65" x2="82" y2="70" />
                
                {/* Rama inferior */}
                <line x1="50" y1="50" x2="50" y2="90" />
                <line x1="50" y1="75" x2="35" y2="85" />
                <line x1="50" y1="75" x2="65" y2="85" />
                <line x1="35" y1="85" x2="30" y2="95" />
                <line x1="65" y1="85" x2="70" y2="95" />
                
                {/* Rama inferior-izquierda */}
                <line x1="50" y1="50" x2="25" y2="70" />
                <line x1="37" y1="60" x2="25" y2="70" />
                <line x1="37" y1="60" x2="28" y2="65" />
                <line x1="25" y1="70" x2="15" y2="75" />
                <line x1="28" y1="65" x2="18" y2="70" />
                
                {/* Rama superior-izquierda */}
                <line x1="50" y1="50" x2="25" y2="30" />
                <line x1="37" y1="40" x2="25" y2="30" />
                <line x1="37" y1="40" x2="28" y2="35" />
                <line x1="25" y1="30" x2="15" y2="25" />
                <line x1="28" y1="35" x2="18" y2="30" />
              </g>
            </svg>
            )
          })}
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

        <div className="max-w-5xl w-full pointer-events-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12">
            
            {/* Texto Izquierdo */}
            <div className="text-center lg:text-left flex-1 px-2 lg:px-0 hidden lg:block">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white mb-2 tracking-wide">
                Feliz Navidad y
              </h1>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white mb-3 tracking-wide">
                Próspero Año Nuevo
              </h1>
              <p className="text-base text-white/80 font-light leading-relaxed">
                Les desea el equipo de SOMOS Properties
              </p>
            </div>

            {/* Árbol Centro */}
            <div className="flex-shrink-0 flex justify-center">
              <div className="relative w-[220px] sm:w-[280px] h-[320px] sm:h-[420px]" style={{ transform: 'translateY(10%)' }}>
                {/* Estrella en la punta */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-10 h-10 text-yellow-400 animate-stellarPulse" style={{ transform: 'translateY(-60%)', filter: 'drop-shadow(0 0 25px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 15px rgba(250, 204, 21, 0.9))' }}>
                  <svg fill="currentColor" viewBox="0 0 20 20" style={{ filter: 'drop-shadow(0 0 20px rgba(250, 204, 21, 0.9))' }}>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>

                {Array.from({ length: 60 }).map((_, i) => {
                  const progress = i / 60
                  const angle = progress * 6.5 * Math.PI * 2
                  const radius = 6 + progress * 85
                  const centerX = 50 // Centro horizontal al 50% del contenedor
                  const offsetX = Math.cos(angle) * radius * (1 - progress * 0.2)
                  const y = progress * 290
                  const colors = ['#67e8f9', '#22d3ee', '#06b6d4', '#0891b2', '#93c5fd']
                  const size = 2.5 + Math.random() * 3.5
                  
                  return (
                    <div
                      key={`light-${i}`}
                      className="absolute rounded-full animate-glowPulse"
                      style={{
                        left: `calc(${centerX}% + ${offsetX}px)`,
                        top: `${y}px`,
                        width: `${size}px`,
                        height: `${size}px`,
                        backgroundColor: colors[i % colors.length],
                        boxShadow: `0 0 10px ${colors[i % colors.length]}, 0 0 20px ${colors[i % colors.length]}`,
                        animation: `glowPulse 2s ease-in-out infinite`,
                        animationDelay: `${progress * 2}s`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  )
                })}

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
                  {/* Tronco del árbol */}
                  <div 
                    className="relative bg-amber-900 shadow-lg flex items-center justify-center"
                    style={{ 
                      width: '85px',
                      height: '60px',
                      clipPath: 'polygon(25% 0%, 75% 0%, 95% 100%, 5% 100%)',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <Image 
                      src="/images/Logo-SP.png" 
                      alt="SOMOS" 
                      width={60} 
                      height={20} 
                      className="h-4 sm:h-5 w-auto" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Texto Derecho */}
            <div className="text-center lg:text-left flex-1 px-2 lg:px-0">
              {/* Mobile - Mostrar título */}
              <div className="lg:hidden mb-2">
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-white mb-1 tracking-wide">
                  Feliz Navidad y Próspero Año Nuevo
                </h1>
                <p className="text-sm text-white/80 font-light mb-3">
                  Les desea SOMOS Properties
                </p>
              </div>

              {/* Mensaje principal */}
              <p className="text-sm sm:text-base text-white/90 leading-snug max-w-sm lg:max-w-md">
                Agradecemos tu confianza en este año que termina. Que esta Navidad brinde paz y prosperidad, y que el 2026 nos encuentre compartiendo nuevos logros juntos.
              </p>

              <p className="text-white/50 text-sm mt-3">Felices Fiestas del equipo de SOMOS Properties</p>
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

        @keyframes glowPulse {
          0%, 100% { 
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1);
          }
          50% { 
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2);
          }
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
        
        .animate-snowfall {
          animation: snowfall linear infinite;
        }

        .animate-glowPulse {
          animation: glowPulse 2s ease-in-out infinite;
        }

        .animate-stellarPulse {
          animation: stellarPulse 2s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
