import { useEffect, useState } from 'react'

interface CountdownState {
  hours: number
  minutes: number
  seconds: number
  isOver: boolean
}

export function useCountdown(targetDate: Date): CountdownState {
  const [state, setState] = useState<CountdownState>({ hours: 0, minutes: 0, seconds: 0, isOver: false })

  useEffect(() => {
    function tick() {
      const msLeft = targetDate.getTime() - Date.now()
      const totalSeconds = Math.max(0, Math.floor(msLeft / 1000))
      setState({
        hours: Math.floor(totalSeconds / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
        isOver: msLeft <= 0,
      })
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  return state
}
