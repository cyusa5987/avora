'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

/**
 * Lenis smooth-scroll wrapper — gives the buttery, Recordly-style scroll feel.
 * `lerp` = how snappy (lower = more inertia), `duration` is the easing target.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      // Touch keeps native scrolling so mobile feels right
      syncTouch: false,
    })

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
