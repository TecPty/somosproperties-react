"use client"

import { useEffect, useMemo, useState } from "react"
import { GIVEAWAY_DRAW_AT, GIVEAWAY_CONFETTI_UNTIL } from "@/lib/giveaway"

const COLORS = ["#3898EC", "#E1C26A", "#22c55e", "#ef4444", "#a855f7", "#f97316"]
const PIECE_COUNT = 120

interface ConfettiPiece {
  id: number
  left: number
  color: string
  width: number
  height: number
  duration: number
  delay: number
  drift: number
}

function createPieces(): ConfettiPiece[] {
  return Array.from({ length: PIECE_COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: COLORS[i % COLORS.length],
    width: 6 + Math.random() * 6,
    height: 10 + Math.random() * 8,
    duration: 3 + Math.random() * 2.5,
    delay: Math.random() * 4,
    drift: Math.random() * 120 - 60,
  }))
}

export function GiveawayConfetti() {
  const [isActive, setIsActive] = useState(false)
  const pieces = useMemo(() => (isActive ? createPieces() : []), [isActive])

  useEffect(() => {
    function check() {
      const now = Date.now()
      setIsActive(now >= GIVEAWAY_DRAW_AT.getTime() && now < GIVEAWAY_CONFETTI_UNTIL.getTime())
    }
    check()
    const interval = setInterval(check, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 z-[90] pointer-events-none overflow-hidden" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="absolute top-[-5vh] rounded-sm animate-confetti-fall"
          style={{
            left: `${piece.left}%`,
            width: piece.width,
            height: piece.height,
            backgroundColor: piece.color,
            animationDuration: `${piece.duration}s`,
            animationDelay: `${piece.delay}s`,
            ["--confetti-drift" as string]: `${piece.drift}px`,
          }}
        />
      ))}
    </div>
  )
}
