'use client'

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useMemo,
  type FormEvent,
} from 'react'
import {
  motion,
  AnimatePresence,
  type Transition,
  type VariantLabels,
  type Target,
  type TargetAndTransition,
  type Variants,
} from 'framer-motion'
import { PlasticButton } from '@/components/ui/plastic-button'

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ')
}

/* ── RotatingText ───────────────────────────────────────────────── */

interface RotatingTextRef {
  next: () => void
  previous: () => void
  jumpTo: (index: number) => void
  reset: () => void
}

interface RotatingTextProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof motion.span>,
    'children' | 'transition' | 'initial' | 'animate' | 'exit'
  > {
  texts: string[]
  transition?: Transition
  initial?: boolean | Target | VariantLabels
  animate?: boolean | VariantLabels | TargetAndTransition
  exit?: Target | VariantLabels
  animatePresenceMode?: 'sync' | 'wait'
  animatePresenceInitial?: boolean
  rotationInterval?: number
  staggerDuration?: number
  staggerFrom?: 'first' | 'last' | 'center' | 'random' | number
  loop?: boolean
  auto?: boolean
  splitBy?: 'characters' | 'words' | 'lines' | string
  onNext?: (index: number) => void
  mainClassName?: string
  splitLevelClassName?: string
  elementLevelClassName?: string
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(
  (
    {
      texts,
      transition = { type: 'spring', damping: 25, stiffness: 300 },
      initial = { y: '100%', opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: '-120%', opacity: 0 },
      animatePresenceMode = 'wait',
      animatePresenceInitial = false,
      rotationInterval = 2200,
      staggerDuration = 0.01,
      staggerFrom = 'last',
      loop = true,
      auto = true,
      splitBy = 'characters',
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      ...rest
    },
    ref,
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState<number>(0)

    const splitIntoCharacters = (text: string): string[] => {
      if (typeof Intl !== 'undefined' && Intl.Segmenter) {
        try {
          const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' })
          return Array.from(segmenter.segment(text), (segment) => segment.segment)
        } catch {
          return text.split('')
        }
      }
      return text.split('')
    }

    const elements = useMemo(() => {
      const currentText: string = texts[currentTextIndex] ?? ''
      if (splitBy === 'characters') {
        const words = currentText.split(/(\s+)/)
        let charCount = 0
        return words
          .filter((part) => part.length > 0)
          .map((part) => {
            const isSpace = /^\s+$/.test(part)
            const chars = isSpace ? [part] : splitIntoCharacters(part)
            const startIndex = charCount
            charCount += chars.length
            return { characters: chars, isSpace, startIndex }
          })
      }
      if (splitBy === 'words') {
        return currentText
          .split(/(\s+)/)
          .filter((word) => word.length > 0)
          .map((word, i) => ({ characters: [word], isSpace: /^\s+$/.test(word), startIndex: i }))
      }
      if (splitBy === 'lines') {
        return currentText.split('\n').map((line, i) => ({ characters: [line], isSpace: false, startIndex: i }))
      }
      return currentText.split(splitBy).map((part, i) => ({ characters: [part], isSpace: false, startIndex: i }))
    }, [texts, currentTextIndex, splitBy])

    const totalElements = useMemo(
      () => elements.reduce((sum, el) => sum + el.characters.length, 0),
      [elements],
    )

    const getStaggerDelay = useCallback(
      (index: number, total: number): number => {
        if (total <= 1 || !staggerDuration) return 0
        const stagger = staggerDuration
        switch (staggerFrom) {
          case 'first':
            return index * stagger
          case 'last':
            return (total - 1 - index) * stagger
          case 'center': {
            const center = (total - 1) / 2
            return Math.abs(center - index) * stagger
          }
          case 'random':
            return Math.random() * (total - 1) * stagger
          default:
            if (typeof staggerFrom === 'number') {
              const fromIndex = Math.max(0, Math.min(staggerFrom, total - 1))
              return Math.abs(fromIndex - index) * stagger
            }
            return index * stagger
        }
      },
      [staggerFrom, staggerDuration],
    )

    const handleIndexChange = useCallback(
      (newIndex: number) => {
        setCurrentTextIndex(newIndex)
        onNext?.(newIndex)
      },
      [onNext],
    )

    const next = useCallback(() => {
      const nextIndex =
        currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1
      if (nextIndex !== currentTextIndex) handleIndexChange(nextIndex)
    }, [currentTextIndex, texts.length, loop, handleIndexChange])

    const previous = useCallback(() => {
      const prevIndex =
        currentTextIndex === 0 ? (loop ? texts.length - 1 : currentTextIndex) : currentTextIndex - 1
      if (prevIndex !== currentTextIndex) handleIndexChange(prevIndex)
    }, [currentTextIndex, texts.length, loop, handleIndexChange])

    const jumpTo = useCallback(
      (index: number) => {
        const validIndex = Math.max(0, Math.min(index, texts.length - 1))
        if (validIndex !== currentTextIndex) handleIndexChange(validIndex)
      },
      [texts.length, currentTextIndex, handleIndexChange],
    )

    const reset = useCallback(() => {
      if (currentTextIndex !== 0) handleIndexChange(0)
    }, [currentTextIndex, handleIndexChange])

    useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [next, previous, jumpTo, reset])

    useEffect(() => {
      if (!auto || texts.length <= 1) return
      const intervalId = setInterval(next, rotationInterval)
      return () => clearInterval(intervalId)
    }, [next, rotationInterval, auto, texts.length])

    return (
      <motion.span
        className={cn('inline-flex flex-wrap whitespace-pre-wrap relative align-bottom pb-[10px]', mainClassName)}
        {...rest}
        layout
      >
        <span className="sr-only">{texts[currentTextIndex]}</span>
        <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
          <motion.div
            key={currentTextIndex}
            className={cn(
              'inline-flex flex-wrap relative',
              splitBy === 'lines' ? 'flex-col items-start w-full' : 'flex-row items-baseline',
            )}
            layout
            aria-hidden="true"
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {elements.map((elementObj, elementIndex) => (
              <span
                key={elementIndex}
                className={cn('inline-flex', splitBy === 'lines' ? 'w-full' : '', splitLevelClassName)}
                style={{ whiteSpace: 'pre' }}
              >
                {elementObj.characters.map((char, charIndex) => {
                  const globalIndex = elementObj.startIndex + charIndex
                  return (
                    <motion.span
                      key={`${char}-${charIndex}`}
                      initial={initial}
                      animate={animate}
                      exit={exit}
                      transition={{
                        ...transition,
                        delay: getStaggerDelay(globalIndex, totalElements),
                      }}
                      className={cn('inline-block leading-none tracking-tight', elementLevelClassName)}
                    >
                      {char === ' ' ? ' ' : char}
                    </motion.span>
                  )
                })}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </motion.span>
    )
  },
)
RotatingText.displayName = 'RotatingText'

/* ── ShinyText (announcement chip) ──────────────────────────────── */

const ShinyText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => (
  <span className={cn('relative overflow-hidden inline-block', className)}>
    {text}
    <span
      style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
        animation: 'shine 2s infinite linear',
        opacity: 0.5,
        pointerEvents: 'none',
      }}
    />
    <style>{`
      @keyframes shine {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    `}</style>
  </span>
)

/* ── Interactive dot canvas + hero content ─────────────────────── */

interface Dot {
  x: number
  y: number
  baseColor: string
  targetOpacity: number
  currentOpacity: number
  opacitySpeed: number
  baseRadius: number
  currentRadius: number
}

interface InteractiveHeroProps {
  onOpenModal?: () => void
}

const InteractiveHero: React.FC<InteractiveHeroProps> = ({ onOpenModal }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number | null>(null)

  const dotsRef = useRef<Dot[]>([])
  const gridRef = useRef<Record<string, number[]>>({})
  const canvasSizeRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 })
  const mousePositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null })

  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const DOT_SPACING = 25
  const BASE_OPACITY_MIN = 0.4
  const BASE_OPACITY_MAX = 0.5
  const BASE_RADIUS = 1
  const INTERACTION_RADIUS = 150
  const INTERACTION_RADIUS_SQ = INTERACTION_RADIUS * INTERACTION_RADIUS
  const OPACITY_BOOST = 0.6
  const RADIUS_BOOST = 2.5
  const GRID_CELL_SIZE = Math.max(50, Math.floor(INTERACTION_RADIUS / 1.5))

  const handleMouseMove = useCallback((event: globalThis.MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) {
      mousePositionRef.current = { x: null, y: null }
      return
    }
    const rect = canvas.getBoundingClientRect()
    mousePositionRef.current = { x: event.clientX - rect.left, y: event.clientY - rect.top }
  }, [])

  const createDots = useCallback(() => {
    const { width, height } = canvasSizeRef.current
    if (width === 0 || height === 0) return

    const newDots: Dot[] = []
    const newGrid: Record<string, number[]> = {}
    const cols = Math.ceil(width / DOT_SPACING)
    const rows = Math.ceil(height / DOT_SPACING)

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * DOT_SPACING + DOT_SPACING / 2
        const y = j * DOT_SPACING + DOT_SPACING / 2
        const cellX = Math.floor(x / GRID_CELL_SIZE)
        const cellY = Math.floor(y / GRID_CELL_SIZE)
        const cellKey = `${cellX}_${cellY}`

        if (!newGrid[cellKey]) newGrid[cellKey] = []
        newGrid[cellKey].push(newDots.length)

        const baseOpacity = Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) + BASE_OPACITY_MIN
        newDots.push({
          x,
          y,
          baseColor: `rgba(0, 89, 255, ${BASE_OPACITY_MAX})`,
          targetOpacity: baseOpacity,
          currentOpacity: baseOpacity,
          opacitySpeed: Math.random() * 0.005 + 0.002,
          baseRadius: BASE_RADIUS,
          currentRadius: BASE_RADIUS,
        })
      }
    }
    dotsRef.current = newDots
    gridRef.current = newGrid
  }, [DOT_SPACING, GRID_CELL_SIZE, BASE_OPACITY_MIN, BASE_OPACITY_MAX, BASE_RADIUS])

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const container = canvas.parentElement
    const width = container ? container.clientWidth : window.innerWidth
    const height = container ? container.clientHeight : window.innerHeight

    if (
      canvas.width !== width ||
      canvas.height !== height ||
      canvasSizeRef.current.width !== width ||
      canvasSizeRef.current.height !== height
    ) {
      canvas.width = width
      canvas.height = height
      canvasSizeRef.current = { width, height }
      createDots()
    }
  }, [createDots])

  const animateDots = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const dots = dotsRef.current
    const grid = gridRef.current
    const { width, height } = canvasSizeRef.current
    const { x: mouseX, y: mouseY } = mousePositionRef.current

    if (!ctx || !dots || !grid || width === 0 || height === 0) {
      animationFrameId.current = requestAnimationFrame(animateDots)
      return
    }

    ctx.clearRect(0, 0, width, height)

    const activeDotIndices = new Set<number>()
    if (mouseX !== null && mouseY !== null) {
      const mouseCellX = Math.floor(mouseX / GRID_CELL_SIZE)
      const mouseCellY = Math.floor(mouseY / GRID_CELL_SIZE)
      const searchRadius = Math.ceil(INTERACTION_RADIUS / GRID_CELL_SIZE)
      for (let i = -searchRadius; i <= searchRadius; i++) {
        for (let j = -searchRadius; j <= searchRadius; j++) {
          const cellKey = `${mouseCellX + i}_${mouseCellY + j}`
          if (grid[cellKey]) grid[cellKey].forEach((dotIndex) => activeDotIndices.add(dotIndex))
        }
      }
    }

    dots.forEach((dot, index) => {
      dot.currentOpacity += dot.opacitySpeed
      if (dot.currentOpacity >= dot.targetOpacity || dot.currentOpacity <= BASE_OPACITY_MIN) {
        dot.opacitySpeed = -dot.opacitySpeed
        dot.currentOpacity = Math.max(BASE_OPACITY_MIN, Math.min(dot.currentOpacity, BASE_OPACITY_MAX))
        dot.targetOpacity = Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) + BASE_OPACITY_MIN
      }

      let interactionFactor = 0
      dot.currentRadius = dot.baseRadius

      if (mouseX !== null && mouseY !== null && activeDotIndices.has(index)) {
        const dx = dot.x - mouseX
        const dy = dot.y - mouseY
        const distSq = dx * dx + dy * dy
        if (distSq < INTERACTION_RADIUS_SQ) {
          const distance = Math.sqrt(distSq)
          interactionFactor = Math.max(0, 1 - distance / INTERACTION_RADIUS)
          interactionFactor = interactionFactor * interactionFactor
        }
      }

      const finalOpacity = Math.min(1, dot.currentOpacity + interactionFactor * OPACITY_BOOST)
      dot.currentRadius = dot.baseRadius + interactionFactor * RADIUS_BOOST

      const colorMatch = dot.baseColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
      const r = colorMatch ? colorMatch[1] : '0'
      const g = colorMatch ? colorMatch[2] : '89'
      const b = colorMatch ? colorMatch[3] : '255'

      ctx.beginPath()
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity.toFixed(3)})`
      ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2)
      ctx.fill()
    })

    animationFrameId.current = requestAnimationFrame(animateDots)
  }, [
    GRID_CELL_SIZE,
    INTERACTION_RADIUS,
    INTERACTION_RADIUS_SQ,
    OPACITY_BOOST,
    RADIUS_BOOST,
    BASE_OPACITY_MIN,
    BASE_OPACITY_MAX,
    BASE_RADIUS,
  ])

  useEffect(() => {
    handleResize()
    const handleMouseLeave = () => {
      mousePositionRef.current = { x: null, y: null }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', handleResize)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)

    animationFrameId.current = requestAnimationFrame(animateDots)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current)
    }
  }, [handleResize, handleMouseMove, animateDots])

  const contentDelay = 0.3
  const itemDelayIncrement = 0.1

  const bannerVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: contentDelay } },
  }
  const headlineVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: contentDelay + itemDelayIncrement } },
  }
  const subHeadlineVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: contentDelay + itemDelayIncrement * 2 } },
  }
  const formVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: contentDelay + itemDelayIncrement * 3 } },
  }
  const trialTextVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: contentDelay + itemDelayIncrement * 4 } },
  }

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const value = email.trim()
    if (!EMAIL_RE.test(value)) {
      setError('Please enter a valid email address.')
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        setError(data?.error ?? 'Something went wrong. Please try again.')
        return
      }
      setDone(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden pt-[100px]" style={{ color: 'var(--av-text-1)' }}>
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0 opacity-80" />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, var(--av-bg) 90%), radial-gradient(ellipse at center, transparent 40%, var(--av-bg) 95%)',
        }}
      />

      <main className="relative z-10 flex flex-grow flex-col items-center justify-center px-4 pt-8 pb-16 text-center">
        <motion.div variants={bannerVariants} initial="hidden" animate="visible" className="mb-6">
          <ShinyText
            text="Now in private beta — join the waitlist"
            className="cursor-pointer rounded-full border border-black/10 bg-white px-4 py-1 text-xs font-medium text-[#5b8cff] transition-colors hover:border-[#0059FF]/50 dark:border-gray-700 dark:bg-[#1a1a1a] sm:text-sm"
          />
        </motion.div>

        <motion.h1
          variants={headlineVariants}
          initial="hidden"
          animate="visible"
          className="mb-4 max-w-4xl text-4xl leading-tight sm:text-5xl lg:text-[72px]"
          style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, color: 'var(--av-text-1)' }}
        >
          Meta ads that
          <br />{' '}
          <span className="inline-block h-[1.2em] overflow-hidden align-bottom sm:h-[1.2em] lg:h-[1.2em]">
            <RotatingText
              texts={['run themselves.', 'find winners.', 'tune hourly.', 'never sleep.']}
              mainClassName="text-[#0059FF] mx-1"
              staggerFrom="last"
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '110%', opacity: 0 }}
              staggerDuration={0.01}
              transition={{ type: 'spring', damping: 18, stiffness: 250 }}
              rotationInterval={2200}
              splitBy="characters"
              auto
              loop
            />
          </span>
        </motion.h1>

        <motion.p
          variants={subHeadlineVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto mb-8 max-w-2xl text-base sm:text-lg lg:text-xl"
          style={{ color: 'var(--av-text-2)' }}
        >
          Avora creates, launches and optimises your Meta ad campaigns automatically —
          shifting budget to your winners and pausing the rest, all on autopilot.
        </motion.p>

        <motion.form
          variants={formVariants}
          initial="hidden"
          animate="visible"
          onSubmit={onSubmit}
          className="mx-auto mb-3 flex w-full max-w-md flex-col items-stretch justify-center gap-2 sm:flex-row"
        >
          {!done ? (
            <>
              <input
                type="email"
                placeholder="Your work email"
                aria-label="Email"
                required
                value={email}
                disabled={submitting}
                onChange={(e) => { setEmail(e.target.value); if (error) setError(null) }}
                className="w-full rounded-md border px-4 py-2 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#0059FF] disabled:opacity-60 sm:flex-1"
                style={{ borderColor: 'var(--av-input-border)', backgroundColor: 'var(--av-input-bg)', color: 'var(--av-text-1)' }}
              />
              <PlasticButton
                type="submit"
                disabled={submitting}
                text={submitting ? 'Joining…' : 'Get early access'}
                className="w-full flex-shrink-0 sm:w-auto"
              />
            </>
          ) : (
            <p className="text-sm font-medium text-[#5b8cff]">
              You&apos;re on the list — we&apos;ll be in touch.
            </p>
          )}
        </motion.form>

        {error && (
          <p className="mb-3 text-xs text-red-400">{error}</p>
        )}

        <motion.p variants={trialTextVariants} initial="hidden" animate="visible" className="mb-10 text-xs" style={{ color: 'var(--av-text-2)' }}>
          Early access. No credit card required.
        </motion.p>

        {onOpenModal ? null : null}
      </main>
    </div>
  )
}

export default InteractiveHero
