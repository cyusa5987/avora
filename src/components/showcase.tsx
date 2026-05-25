'use client'

import { motion } from 'framer-motion'

/* ── Step visuals ─────────────────────────────────────────── */

function ConnectVisual() {
  const platforms = [
    { name: 'Meta Ads', color: '#0059FF', connected: true },
    { name: 'Google Ads', color: '#4285F4', connected: false },
    { name: 'TikTok Ads', color: '#69C9D0', connected: false },
  ]
  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: 'var(--av-surface)', border: '1px solid var(--av-border)' }}
    >
      <div
        className="mb-4 text-[10px] uppercase tracking-widest"
        style={{ color: 'var(--av-text-2)' }}
      >
        Ad Platforms
      </div>
      {platforms.map((p) => (
        <div
          key={p.name}
          className="mb-2 flex items-center justify-between rounded-xl px-3 py-3"
          style={{
            background: 'var(--av-subtle)',
            border: '1px solid var(--av-border)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{ background: p.color + '22' }}
            >
              <div className="h-3 w-3 rounded-full" style={{ background: p.color }} />
            </div>
            <span
              className="text-[13px]"
              style={{
                color: p.connected ? 'var(--av-text-1)' : 'var(--av-text-2)',
              }}
            >
              {p.name}
            </span>
          </div>
          {p.connected ? (
            <span
              className="rounded-full px-2 py-0.5 text-[10px]"
              style={{
                background: 'rgba(74,222,128,0.1)',
                color: '#4ade80',
                border: '1px solid rgba(74,222,128,0.2)',
              }}
            >
              ✓ Connected
            </span>
          ) : (
            <span
              className="rounded-full px-2.5 py-0.5 text-[10px]"
              style={{
                background: 'var(--av-subtle)',
                color: 'var(--av-text-2)',
                border: '1px solid var(--av-border)',
              }}
            >
              Connect
            </span>
          )}
        </div>
      ))}
      <div
        className="mt-4 flex items-center gap-2 rounded-xl px-4 py-3"
        style={{
          background: 'rgba(0,89,255,0.08)',
          border: '1px solid rgba(0,89,255,0.18)',
        }}
      >
        <div
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: '#0059FF', boxShadow: '0 0 6px #0059FF' }}
        />
        <span className="text-[11px]" style={{ color: '#5b8cff' }}>
          Meta account synced — 3 ad accounts found
        </span>
      </div>
    </div>
  )
}

function GenerateVisual() {
  const ads = [
    {
      headline: 'Transform Your Practice',
      body: 'Premium gear designed for serious practitioners. Free shipping over $75.',
    },
    {
      headline: 'Join 50,000 Yogis',
      body: 'The mat that moves with you. Bestselling collection — now 20% off.',
    },
    {
      headline: 'Your Flow. Elevated.',
      body: 'Studio-quality gear without the studio price. See why athletes choose us.',
    },
  ]
  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: 'var(--av-surface)', border: '1px solid var(--av-border)' }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--av-text-2)' }}>
          Generated Ads
        </div>
        <div
          className="rounded-full px-2 py-0.5 text-[10px]"
          style={{
            background: 'rgba(0,89,255,0.12)',
            color: '#5b8cff',
            border: '1px solid rgba(0,89,255,0.22)',
          }}
        >
          ✦ AI
        </div>
      </div>
      <div className="space-y-2">
        {ads.map((ad, i) => (
          <div
            key={i}
            className="rounded-xl p-3.5"
            style={{
              background: 'var(--av-subtle)',
              border: '1px solid var(--av-border)',
            }}
          >
            <div
              className="mb-1 text-[12px] font-semibold"
              style={{ color: 'var(--av-text-1)' }}
            >
              {ad.headline}
            </div>
            <div
              className="text-[11px] leading-relaxed"
              style={{ color: 'var(--av-text-2)' }}
            >
              {ad.body}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ScaleVisual() {
  const points = [28, 34, 31, 40, 38, 50, 46, 58, 54, 66, 62, 74, 70, 84, 80, 96]
  const max = 96
  const W = points.length * 22
  const H = 80
  const pts = points
    .map((v, i) => `${i * 22 + 11},${H - (v / max) * (H - 8)}`)
    .join(' ')

  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: 'var(--av-surface)', border: '1px solid var(--av-border)' }}
    >
      <div className="mb-1 flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--av-text-2)' }}>
          ROAS over time
        </div>
        <span className="text-[12px] font-semibold" style={{ color: '#4ade80' }}>
          +34% ↑
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ marginBottom: 16 }}>
        <defs>
          <linearGradient id="sc-scale" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0059FF" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#0059FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`M ${pts} L ${(points.length - 1) * 22 + 11},${H} L 11,${H} Z`}
          fill="url(#sc-scale)"
        />
        <polyline
          points={pts}
          fill="none"
          stroke="#0059FF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'ROAS', value: '4.2×', green: true },
          { label: 'Spend', value: '$24K', green: false },
          { label: 'CPC', value: '$0.76', green: false },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-lg p-3 text-center"
            style={{
              background: 'var(--av-subtle)',
              border: '1px solid var(--av-border)',
            }}
          >
            <div className="mb-1 text-[10px]" style={{ color: 'var(--av-text-2)' }}>
              {s.label}
            </div>
            <div
              className="text-[15px] font-semibold"
              style={{ color: s.green ? '#4ade80' : 'var(--av-text-1)' }}
            >
              {s.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Steps data ───────────────────────────────────────────── */

const STEPS = [
  {
    number: '01',
    title: 'Connect and brief',
    description:
      'Link Meta in one click and tell Avora about your offer. From there it has everything it needs — account history, audiences, and the brief that shapes every campaign.',
    visual: <ConnectVisual />,
  },
  {
    number: '02',
    title: 'Avora builds the campaigns',
    description:
      'Copy, audiences, budget splits and full ad-set structure — drafted in under a minute. You review, edit anything, and approve when ready.',
    visual: <GenerateVisual />,
  },
  {
    number: '03',
    title: 'It scales itself',
    description:
      "Once live, Avora watches every metric every hour. It reallocates spend toward winners, kills fatigue and compounds your ROAS — no manual babysitting.",
    visual: <ScaleVisual />,
  },
]

/* ── Section ──────────────────────────────────────────────── */

export function Showcase() {
  return (
    <section className="px-6 py-32" style={{ fontFamily: 'var(--font-inter)' }}>
      <div className="mx-auto max-w-7xl">
        {/* Centered eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-8 text-center text-[14px] uppercase tracking-wider"
          style={{ fontFamily: 'var(--font-fragment-mono)', color: 'var(--av-text-1)' }}
        >
          <span style={{ color: 'var(--av-secondary)' }}>[</span> PLATFORM{' '}
          <span style={{ color: 'var(--av-secondary)' }}>]</span>
        </motion.div>

        {/* Centered heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2
            className="text-[44px] md:text-[60px] leading-[1.04] tracking-tight"
            style={{
              fontFamily:
                "var(--font-playfair)",
              fontWeight: 600,
              color: 'var(--av-text-1)',
            }}
          >
            From signup to scaled<br />in three steps.
          </h2>

          <p
            className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed"
            style={{ color: 'var(--av-text-2)' }}
          >
            Connect Meta, brief Avora once, and watch your campaigns build, ship
            and improve themselves.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6 lg:gap-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.5,
                ease: 'easeOut',
                delay: i * 0.08,
              }}
              className="flex flex-col"
            >
              {/* Visual */}
              <div>{step.visual}</div>

              {/* Step number */}
              <div
                className="mt-8 text-[12px] uppercase tracking-[0.18em]"
                style={{
                  fontFamily: 'var(--font-fragment-mono)',
                  color: 'var(--av-text-2)',
                }}
              >
                {step.number}
              </div>

              {/* Title */}
              <h3
                className="mt-3 text-[24px] md:text-[26px] leading-snug tracking-tight"
                style={{
                  fontFamily:
                    "var(--font-playfair)",
                  fontWeight: 600,
                  color: 'var(--av-text-1)',
                }}
              >
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="mt-3 text-[15px] leading-relaxed"
                style={{ color: 'var(--av-text-2)' }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
