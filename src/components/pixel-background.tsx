'use client'

import { useEffect, useRef } from 'react'

export function PixelBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Capture as non-null for use inside closures
    const cvs = canvas
    const cx  = ctx

    const SPACING = 32   // grid cell size
    const RADIUS   = 1.4 // dot radius
    const DRIFT    = 7   // max px displacement from grid position

    interface Dot {
      gx: number; gy: number
      phase: number; speed: number; angleOffset: number
    }

    let dots: Dot[] = []
    let w = 0, h = 0

    function resize() {
      w = cvs.width  = window.innerWidth
      h = cvs.height = window.innerHeight
      dots = []
      const cols = Math.ceil(w / SPACING) + 2
      const rows = Math.ceil(h / SPACING) + 2
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          dots.push({
            gx: c * SPACING,
            gy: r * SPACING,
            phase:       Math.random() * Math.PI * 2,
            speed:       0.25 + Math.random() * 0.35,
            angleOffset: Math.random() * Math.PI * 2,
          })
        }
      }
    }

    resize()
    window.addEventListener('resize', resize)

    let t = 0
    let animId: number

    function draw() {
      cx.clearRect(0, 0, w, h)
      t += 0.006

      for (const d of dots) {
        // Wave flowing diagonally across the grid
        const wave = Math.sin(d.gx * 0.012 + d.gy * 0.008 + t * 1.2 + d.phase)
        const dx = Math.sin(t * d.speed + d.phase) * DRIFT * 0.6
        const dy = Math.cos(t * d.speed + d.phase + d.angleOffset) * DRIFT * 0.6

        const x = d.gx + dx
        const y = d.gy + dy

        const opacity = 0.08 + (wave * 0.5 + 0.5) * 0.18

        cx.beginPath()
        cx.arc(x, y, RADIUS, 0, Math.PI * 2)
        cx.fillStyle = `rgba(255,255,255,${opacity.toFixed(3)})`
        cx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10"
    />
  )
}
