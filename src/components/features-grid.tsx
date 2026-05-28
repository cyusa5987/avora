'use client'

import { motion } from 'framer-motion'
import {
  Rocket,
  TrendingUp,
  PauseCircle,
  BarChart2,
  Users,
  CheckCircle2,
  Zap,
  FileText,
} from 'lucide-react'

const SF =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif'

// Meta-ads activity feed items (doubled for seamless loop)
const ACTIVITIES = [
  {
    icon: Rocket,
    color: '#5B85FF',
    title: 'Campaign launched',
    subtitle: 'Summer Sale 2026 · Meta',
  },
  {
    icon: TrendingUp,
    color: '#34D399',
    title: 'Budget shifted',
    subtitle: '+$150 to top performer',
  },
  {
    icon: PauseCircle,
    color: '#F87171',
    title: 'Creative paused',
    subtitle: 'Low CTR detected (0.8%)',
  },
  {
    icon: BarChart2,
    color: '#FBBF24',
    title: 'ROAS updated',
    subtitle: '4.2× this week · +0.3×',
  },
  {
    icon: Users,
    color: '#A78BFA',
    title: 'Audience expanded',
    subtitle: 'Lookalike 1% activated',
  },
  {
    icon: CheckCircle2,
    color: '#34D399',
    title: 'Ad approved',
    subtitle: 'Instagram Reel · ready',
  },
  {
    icon: Zap,
    color: '#5B85FF',
    title: 'Bid adjusted',
    subtitle: 'CPC reduced by 11%',
  },
  {
    icon: FileText,
    color: '#FBBF24',
    title: 'Weekly report ready',
    subtitle: 'Spend · ROAS · conversions',
  },
]

const BADGES = ['AI Campaign Builder', 'Real-time Optimisation', 'Zero Ads Manager']

function ActivityFeed({ isDark }: { isDark: boolean }) {
  const items = [...ACTIVITIES, ...ACTIVITIES] // seamless infinite loop

  return (
    <div
      className="relative overflow-hidden rounded-[18px]"
      style={{
        height: 340,
        background: isDark
          ? 'rgba(255,255,255,0.03)'
          : '#ffffff',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)'}`,
        boxShadow: isDark
          ? '0 20px 60px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.05)'
          : '0 8px 40px rgba(0,0,0,0.08)',
      }}
    >
      {/* Scrolling list */}
      <motion.div
        className="flex flex-col absolute w-full"
        animate={{ y: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 18,
          ease: 'linear',
        }}
      >
        {items.map((item, i) => {
          const Icon = item.icon
          return (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3.5"
              style={{
                borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
              }}
            >
              {/* Icon bubble */}
              <span
                className="grid place-items-center rounded-[10px] flex-shrink-0"
                style={{
                  width: 36,
                  height: 36,
                  background: `${item.color}18`,
                  border: `1px solid ${item.color}30`,
                }}
              >
                <Icon size={15} strokeWidth={2} style={{ color: item.color }} />
              </span>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-[13px] font-medium truncate"
                  style={{ fontFamily: SF, color: isDark ? '#ffffff' : '#111111' }}
                >
                  {item.title}
                </p>
                <p
                  className="text-[11.5px] truncate mt-0.5"
                  style={{ fontFamily: SF, color: isDark ? 'rgba(255,255,255,0.42)' : '#7A7876' }}
                >
                  {item.subtitle}
                </p>
              </div>

              {/* Live dot */}
              <span
                className="rounded-full flex-shrink-0"
                style={{ width: 6, height: 6, background: item.color, opacity: 0.7 }}
              />
            </div>
          )
        })}
      </motion.div>

      {/* Top fade */}
      <div
        className="absolute top-0 left-0 w-full h-14 pointer-events-none z-10"
        style={{
          background: `linear-gradient(to bottom, ${isDark ? '#161616' : '#ffffff'}, transparent)`,
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 w-full h-14 pointer-events-none z-10"
        style={{
          background: `linear-gradient(to top, ${isDark ? '#161616' : '#ffffff'}, transparent)`,
        }}
      />
    </div>
  )
}

export function FeaturesGrid({ isDark }: { isDark: boolean }) {
  return (
    <section className="w-full py-24 px-6" id="features">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-14 md:gap-20">

          {/* LEFT — scrolling activity feed */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <ActivityFeed isDark={isDark} />
          </motion.div>

          {/* RIGHT — copy */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            {/* Label */}
            <span
              className="inline-flex self-start rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em]"
              style={{
                fontFamily: SF,
                color: '#5B85FF',
                background: isDark ? 'rgba(91,133,255,0.12)' : 'rgba(91,133,255,0.08)',
                border: `1px solid ${isDark ? 'rgba(91,133,255,0.25)' : 'rgba(91,133,255,0.20)'}`,
              }}
            >
              Your one-stop shop
            </span>

            {/* Heading */}
            <h2
              style={{
                fontFamily: SF,
                fontWeight: 700,
                fontSize: 'clamp(26px, 3.5vw, 40px)',
                lineHeight: 1.12,
                letterSpacing: '-0.025em',
                color: isDark ? '#ffffff' : '#111111',
              }}
            >
              Every Meta ads task,{' '}
              <span style={{ color: isDark ? 'rgba(255,255,255,0.40)' : '#999' }}>
                handled automatically — so you never have to open Ads Manager again.
              </span>
            </h2>

            {/* Supporting copy */}
            <p
              className="text-[15px] leading-relaxed"
              style={{ fontFamily: SF, color: isDark ? 'rgba(255,255,255,0.52)' : '#5A5856' }}
            >
              Avora watches every campaign in real time, rotates creatives, shifts
              budget to winners, and surfaces the insights that matter. From launch
              to scale, the AI does the work.
            </p>

            {/* Feature chips */}
            <div className="flex flex-wrap gap-2">
              {BADGES.map((b) => (
                <span
                  key={b}
                  className="rounded-full px-3.5 py-1.5 text-[12.5px] font-medium"
                  style={{
                    fontFamily: SF,
                    background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)'}`,
                    color: isDark ? 'rgba(255,255,255,0.75)' : '#444',
                  }}
                >
                  {b}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
