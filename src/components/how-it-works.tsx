'use client'

import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

/* ── Visual cards ─────────────────────────────────────────── */

function ConnectVisual() {
  const platforms = [
    { name: 'Meta Ads',    color: '#f97316', connected: true  },
    { name: 'Google Ads',  color: '#4285F4', connected: false },
    { name: 'TikTok Ads',  color: '#69C9D0', connected: false },
  ]
  return (
    <div className="rounded-2xl p-6" style={{ background: 'rgb(18,18,20)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="text-[10px] mb-4 tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>Ad Platforms</div>
      {platforms.map((p) => (
        <div key={p.name} className="flex items-center justify-between px-3 py-3 rounded-xl mb-2"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: p.color + '22' }}>
              <div className="w-3 h-3 rounded-full" style={{ background: p.color }} />
            </div>
            <span className="text-[13px]" style={{ color: p.connected ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.38)' }}>{p.name}</span>
          </div>
          {p.connected ? (
            <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.2)' }}>
              ✓ Connected
            </span>
          ) : (
            <span className="text-[10px] px-2.5 py-0.5 rounded-full cursor-pointer" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.09)' }}>
              Connect
            </span>
          )}
        </div>
      ))}
      <div className="mt-4 rounded-xl px-4 py-3 flex items-center gap-2" style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.18)' }}>
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#f97316', boxShadow: '0 0 6px #f97316' }} />
        <span className="text-[11px]" style={{ color: '#f97316' }}>Meta account synced — 3 ad accounts found</span>
      </div>
    </div>
  )
}

function BriefVisual() {
  return (
    <div className="rounded-2xl p-6" style={{ background: 'rgb(18,18,20)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="text-[10px] mb-4 tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>Campaign Brief</div>
      <div className="rounded-xl p-4 mb-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="text-[11px] mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>Describe your product or offer</div>
        <div className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.82)' }}>
          Premium yoga gear for women who take their practice seriously. We want conversions from cold audiences.
        </div>
        <div className="w-0.5 h-4 mt-1 inline-block animate-pulse rounded-full" style={{ background: '#f97316' }} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: 'Industry',  value: 'E-commerce'  },
          { label: 'Goal',      value: 'Conversions' },
          { label: 'Budget',    value: '$500 / day'  },
          { label: 'Audience',  value: 'Women 25–44' },
        ].map((f) => (
          <div key={f.label} className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-[10px] mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{f.label}</div>
            <div className="text-[12px]" style={{ color: 'rgba(255,255,255,0.78)' }}>{f.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GenerateVisual() {
  const ads = [
    { headline: 'Transform Your Practice',  body: 'Premium gear designed for serious practitioners. Free shipping over $75.' },
    { headline: 'Join 50,000 Yogis',        body: 'The mat that moves with you. Bestselling collection — now 20% off.' },
    { headline: 'Your Flow. Elevated.',     body: 'Studio-quality gear without the studio price. See why athletes choose us.' },
  ]
  return (
    <div className="rounded-2xl p-6" style={{ background: 'rgb(18,18,20)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>Generated Ads</div>
        <div className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(249,115,22,0.12)', color: '#f97316', border: '1px solid rgba(249,115,22,0.22)' }}>✦ AI</div>
      </div>
      <div className="space-y-2">
        {ads.map((ad, i) => (
          <div key={i} className="rounded-xl p-3.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-[12px] font-semibold mb-1" style={{ color: 'rgba(255,255,255,0.9)' }}>{ad.headline}</div>
            <div className="text-[11px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.42)' }}>{ad.body}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ScaleVisual() {
  const points = [28,34,31,40,38,50,46,58,54,66,62,74,70,84,80,96]
  const max = 96
  const W = points.length * 22
  const H = 80
  const pts = points.map((v, i) => `${i * 22 + 11},${H - (v / max) * (H - 8)}`).join(' ')

  return (
    <div className="rounded-2xl p-6" style={{ background: 'rgb(18,18,20)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-center justify-between mb-1">
        <div className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>ROAS over time</div>
        <span className="text-[12px] font-semibold" style={{ color: '#4ade80' }}>+34% ↑</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ marginBottom: 16 }}>
        <defs>
          <linearGradient id="lg-scale" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`M ${pts} L ${(points.length-1)*22+11},${H} L 11,${H} Z`} fill="url(#lg-scale)" />
        <polyline points={pts} fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'ROAS',  value: '4.2×',  green: true  },
          { label: 'Spend', value: '$24K',  green: false },
          { label: 'CPC',   value: '$0.76', green: false },
        ].map((s) => (
          <div key={s.label} className="rounded-lg p-3 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-[10px] mb-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{s.label}</div>
            <div className="text-[15px] font-semibold" style={{ color: s.green ? '#4ade80' : 'rgba(255,255,255,0.88)' }}>{s.value}</div>
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
    title: 'Connect your ad account',
    description:
      'Link your Meta Ads Manager in seconds. No complex setup, no agency handoffs — just authenticate and Avora has everything it needs to get started.',
    visual: <ConnectVisual />,
  },
  {
    number: '02',
    title: 'Describe your business',
    description:
      'Tell Avora what you sell, who you\'re targeting, and what a win looks like. Our AI uses this brief to nail your brand voice and campaign goals from day one.',
    visual: <BriefVisual />,
  },
  {
    number: '03',
    title: 'AI builds your campaigns',
    description:
      'Avora writes ad copy, selects audiences, allocates budget across ad sets, and structures every campaign — all in under a minute, ready to review and launch.',
    visual: <GenerateVisual />,
  },
  {
    number: '04',
    title: 'It scales itself',
    description:
      'Once live, Avora monitors every metric every hour. It reallocates spend toward what\'s working, kills underperformers, and compounds your ROAS — no manual babysitting required.',
    visual: <ScaleVisual />,
  },
]

/* ── Section ──────────────────────────────────────────────── */

export function HowItWorks() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 pb-40">
      {/* Heading */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="text-center mb-24"
      >
        <p className="text-[11px] tracking-[0.18em] uppercase mb-4" style={{ color: '#f97316' }}>How it works</p>
        <h2
          className="text-4xl md:text-5xl font-normal leading-tight"
          style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', color: 'var(--av-text-1)' }}
        >
          From zero to optimised<br />in four steps.
        </h2>
      </motion.div>

      {/* Steps */}
      <div className="flex flex-col gap-32">
        {STEPS.map((step, i) => {
          const isEven = i % 2 === 0
          return (
            <div
              key={step.number}
              className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center ${isEven ? '' : 'md:[&>*:first-child]:order-2'}`}
            >
              {/* Text side */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                <div
                  className="text-[72px] font-bold leading-none mb-6 select-none"
                  style={{ fontFamily: 'var(--font-syne)', color: 'rgba(255,255,255,0.04)' }}
                >
                  {step.number}
                </div>
                <h3
                  className="text-2xl md:text-3xl font-normal mb-5 leading-snug"
                  style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic', color: 'var(--av-text-1)' }}
                >
                  {step.title}
                </h3>
                <p className="text-[15px] leading-relaxed" style={{ color: 'var(--av-text-2)' }}>
                  {step.description}
                </p>
              </motion.div>

              {/* Visual side */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: 0.12 }}
              >
                {step.visual}
              </motion.div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
