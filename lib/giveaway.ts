// Sorteo del giveaway: jueves 16 de julio 2026, 4:00pm hora Panama (UTC-5, sin DST)
export const GIVEAWAY_DRAW_AT = new Date('2026-07-16T16:00:00-05:00')
export const GIVEAWAY_CONFETTI_DURATION_MS = 10 * 60 * 1000
export const GIVEAWAY_CONFETTI_UNTIL = new Date(
  GIVEAWAY_DRAW_AT.getTime() + GIVEAWAY_CONFETTI_DURATION_MS
)
