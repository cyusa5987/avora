'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Plug,
  Zap,
  Sparkles,
  Wand2,
  LineChart,
  MessageSquare,
} from 'lucide-react'
import { FeatureCard, type GridFeature } from '@/components/ui/grid-feature-cards'

const FEATURES: GridFeature[] = [
  {
    title: 'MCP-native',
    icon: Plug,
    description:
      'Trigger campaigns and pull metrics from Claude, Cursor, ChatGPT and Hermes — same toolset, anywhere.',
    pattern: [
      [7, 1],
      [8, 3],
      [9, 5],
      [10, 2],
      [7, 6],
    ],
  },
  {
    title: 'Hourly optimization',
    icon: Zap,
    description:
      'Avora reallocates spend toward winners every hour — fatigue dies, ROAS compounds.',
    pattern: [
      [8, 2],
      [10, 4],
      [7, 5],
      [9, 1],
      [10, 6],
    ],
  },
  {
    title: 'One-click setup',
    icon: Sparkles,
    description:
      'Authenticate Meta and Avora pulls every account, pixel and audience automatically.',
    pattern: [
      [7, 4],
      [8, 6],
      [9, 2],
      [10, 3],
      [9, 5],
    ],
  },
  {
    title: 'AI creative',
    icon: Wand2,
    description:
      'Headlines, body copy and full ad-set structure drafted from a one-sentence brief.',
    pattern: [
      [9, 1],
      [10, 5],
      [7, 3],
      [8, 6],
      [10, 2],
    ],
  },
  {
    title: 'Live dashboard',
    icon: LineChart,
    description:
      'ROAS, CPA and best-performing creatives in one place — updated as Avora optimizes.',
    pattern: [
      [8, 5],
      [7, 2],
      [9, 4],
      [10, 1],
      [7, 6],
    ],
  },
  {
    title: 'Plain-English logs',
    icon: MessageSquare,
    description:
      'Every budget shift and paused ad set explained in language you can actually audit.',
    pattern: [
      [10, 3],
      [8, 1],
      [9, 6],
      [7, 5],
      [10, 4],
    ],
  },
]

type AnimatedContainerProps = {
  delay?: number
  className?: string
  children: React.ReactNode
}

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function FeaturesGrid() {
  return (
    <section
      id="platform"
      className="px-6 py-32"
      style={{ fontFamily: 'var(--font-inter)' }}
    >
      <div className="mx-auto w-full max-w-5xl space-y-10 px-4">
        <AnimatedContainer className="mx-auto max-w-3xl text-center">
          <div
            className="mb-8 text-[14px] uppercase tracking-wider"
            style={{
              fontFamily: 'var(--font-fragment-mono)',
              color: 'var(--av-text-1)',
            }}
          >
            <span style={{ color: 'var(--av-secondary)' }}>[</span> PLATFORM{' '}
            <span style={{ color: 'var(--av-secondary)' }}>]</span>
          </div>

          <h2
            className="text-balance text-[36px] md:text-[52px] leading-[1.04] tracking-tight"
            style={{
              fontFamily:
                "var(--font-playfair)",
              fontWeight: 600,
              color: 'var(--av-text-1)',
            }}
          >
            Speed. Scale. ROAS.
          </h2>

          <p
            className="mx-auto mt-5 max-w-xl text-balance text-[16px] leading-relaxed"
            style={{ color: 'var(--av-text-2)' }}
          >
            Everything your ad ops needs — without the agency overhead.
          </p>
        </AnimatedContainer>

        <AnimatedContainer
          delay={0.4}
          className="grid grid-cols-1 divide-x divide-y divide-dashed border border-dashed sm:grid-cols-2 md:grid-cols-3"
        >
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </AnimatedContainer>
      </div>
    </section>
  )
}
