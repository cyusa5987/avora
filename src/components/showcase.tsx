'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

/* ── Mini sparkline SVG ───────────────────────────────────── */
function Sparkline({ up }: { up: boolean }) {
  const points = up
    ? '0,18 8,14 16,16 24,10 32,12 40,6 48,8 56,3 64,5'
    : '0,5 8,8 16,6 24,12 32,10 40,14 48,12 56,16 64,18'
  return (
    <svg width="64" height="22" viewBox="0 0 64 22" fill="none">
      <polyline
        points={points}
        stroke={up ? '#22c55e' : '#ef4444'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

/* ── Ad thumbnail placeholder ─────────────────────────────── */
function AdThumb({ color }: { color: string }) {
  return (
    <div
      className="h-8 w-8 rounded flex-shrink-0"
      style={{ backgroundColor: color, opacity: 0.85 }}
    />
  )
}

/* ── Status pill ──────────────────────────────────────────── */
function StatusPill({ active }: { active: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
      style={{
        backgroundColor: active ? 'rgba(34,197,94,0.12)' : 'rgba(156,163,175,0.15)',
        color: active ? '#16a34a' : '#6b7280',
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: active ? '#22c55e' : '#9ca3af' }}
      />
      {active ? 'Active' : 'Paused'}
    </span>
  )
}

/* ── Dashboard mockup ─────────────────────────────────────── */
const campaigns = [
  { name: 'Summer Sale — Retargeting', budget: '$120/d', spend: '$94.20', roas: '4.2×', ctr: '3.8%', up: true,  colors: ['#f97316','#fb923c','#fed7aa'] },
  { name: 'Brand Awareness Q3',        budget: '$60/d',  spend: '$58.40', roas: '2.1×', ctr: '1.4%', up: false, colors: ['#6366f1','#818cf8','#c7d2fe'] },
  { name: 'Lookalike — Purchasers',    budget: '$80/d',  spend: '$79.90', roas: '5.8×', ctr: '4.9%', up: true,  colors: ['#2786B9','#4DA5D4','#7dd3fc'] },
  { name: 'DPA — Abandoned Cart',      budget: '$40/d',  spend: '$38.10', roas: '6.3×', ctr: '5.5%', up: true,  colors: ['#ec4899','#f472b6','#fbcfe8'] },
  { name: 'Cold — Interest Stack',     budget: '$50/d',  spend: '$22.70', roas: '1.4×', ctr: '0.9%', up: false, colors: ['#eab308','#facc15','#fef08a'] },
]

function DashboardMockup() {
  return (
    <div className="flex h-full overflow-hidden" style={{ fontSize: 11 }}>
      {/* Sidebar */}
      <div
        className="flex flex-col gap-0.5 px-2 py-4 w-28 flex-shrink-0 border-r"
        style={{ backgroundColor: 'var(--av-surface)', borderColor: 'var(--av-border)' }}
      >
        <div className="px-2 pb-3 mb-1 border-b" style={{ borderColor: 'var(--av-border)' }}>
          <span className="font-bold text-[12px]" style={{ color: 'var(--av-text-1)', fontFamily: 'var(--font-syne)' }}>avora</span>
        </div>
        {['Dashboard','Campaigns','Ad Sets','Ads','Analytics','Settings'].map((item, i) => (
          <div
            key={item}
            className="rounded-md px-2 py-1.5 cursor-pointer"
            style={{
              backgroundColor: i === 1 ? 'rgba(39,134,185,0.12)' : 'transparent',
              color: i === 1 ? '#2786B9' : 'var(--av-text-2)',
              fontWeight: i === 1 ? 600 : 400,
            }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top bar */}
        <div
          className="flex items-center gap-2 px-4 py-2.5 border-b flex-shrink-0"
          style={{ borderColor: 'var(--av-border)', backgroundColor: 'var(--av-surface)' }}
        >
          <span className="font-semibold text-[12px]" style={{ color: 'var(--av-text-1)' }}>Campaigns</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--av-subtle)', color: 'var(--av-text-2)' }}>5</span>
          <div className="flex gap-1.5 ml-3 flex-wrap">
            {['All','Active','Paused','Draft'].map((f, i) => (
              <span
                key={f}
                className="rounded-full px-2.5 py-0.5 text-[10px]"
                style={{
                  backgroundColor: i === 0 ? '#2786B9' : 'var(--av-subtle)',
                  color: i === 0 ? '#fff' : 'var(--av-text-2)',
                  border: '1px solid',
                  borderColor: i === 0 ? '#2786B9' : 'var(--av-border)',
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Table header */}
        <div
          className="grid items-center px-4 py-1.5 border-b flex-shrink-0"
          style={{
            gridTemplateColumns: '1fr 60px 52px 52px 44px 44px 68px 72px',
            borderColor: 'var(--av-border)',
            backgroundColor: 'var(--av-subtle)',
            color: 'var(--av-text-2)',
            fontSize: 10,
          }}
        >
          <span>Campaign</span>
          <span>Status</span>
          <span>Budget</span>
          <span>Spend</span>
          <span>ROAS</span>
          <span>CTR</span>
          <span>Trend</span>
          <span>Creatives</span>
        </div>

        {/* Rows */}
        <div className="flex-1 overflow-auto" style={{ backgroundColor: 'var(--av-bg)' }}>
          {campaigns.map((c, i) => (
            <div
              key={i}
              className="grid items-center px-4 py-2 border-b"
              style={{
                gridTemplateColumns: '1fr 60px 52px 52px 44px 44px 68px 72px',
                borderColor: 'var(--av-border)',
              }}
            >
              <div>
                <div className="font-medium leading-tight truncate pr-2" style={{ color: 'var(--av-text-1)', fontSize: 11 }}>{c.name}</div>
              </div>
              <StatusPill active={i !== 1 && i !== 4} />
              <span style={{ color: 'var(--av-text-2)' }}>{c.budget}</span>
              <span style={{ color: 'var(--av-text-1)', fontWeight: 500 }}>{c.spend}</span>
              <span style={{ color: c.up ? '#16a34a' : '#ef4444', fontWeight: 600 }}>{c.roas}</span>
              <span style={{ color: 'var(--av-text-2)' }}>{c.ctr}</span>
              <Sparkline up={c.up} />
              <div className="flex gap-1">
                {c.colors.map((col, j) => <AdThumb key={j} color={col} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Browser chrome wrapper ───────────────────────────────── */
function BrowserFrame() {
  return (
    <div
      className="rounded-xl overflow-hidden shadow-2xl border flex flex-col"
      style={{
        borderColor: 'var(--av-border)',
        backgroundColor: 'var(--av-surface)',
        height: 380,
      }}
    >
      {/* Chrome bar */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 border-b flex-shrink-0"
        style={{ borderColor: 'var(--av-border)', backgroundColor: 'var(--av-surface)' }}
      >
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
        </div>
        <div
          className="ml-3 flex-1 rounded-md px-3 py-1 text-[11px]"
          style={{ backgroundColor: 'var(--av-subtle)', color: 'var(--av-text-2)' }}
        >
          app.avora.ai/campaigns
        </div>
      </div>

      {/* Dashboard */}
      <div className="flex-1 overflow-hidden">
        <DashboardMockup />
      </div>
    </div>
  )
}

/* ── Steps ────────────────────────────────────────────────── */
const STEPS = [
  {
    n: '01',
    title: 'Connect your ad account',
    body: 'Link your Meta Business account in one click. Avora reads your historical data to understand what\'s worked before.',
  },
  {
    n: '02',
    title: 'Set your goal, not your settings',
    body: 'Tell Avora what you\'re optimising for — purchases, leads, or awareness. It handles audience, creative, and bidding automatically.',
  },
  {
    n: '03',
    title: 'Watch performance in real time',
    body: 'Your live dashboard shows every campaign\'s spend, ROAS, and trend. Avora shifts budget to winners around the clock — no manual work.',
  },
]

/* ── Main export ──────────────────────────────────────────── */
export function Showcase() {
  const [active, setActive] = useState(2)

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl flex flex-col lg:flex-row gap-16 items-start">
        {/* Steps */}
        <div className="flex flex-col gap-8 lg:w-[38%] lg:pt-4 lg:sticky lg:top-24">
          {STEPS.map((step, i) => {
            const isActive = i === active
            return (
              <button
                key={step.n}
                onClick={() => setActive(i)}
                className="text-left group"
              >
                <div
                  className="pl-4 border-l-2 transition-colors duration-200"
                  style={{ borderColor: isActive ? '#2786B9' : 'transparent' }}
                >
                  <div
                    className="text-[11px] mb-1.5 font-mono"
                    style={{ color: 'var(--av-text-2)' }}
                  >
                    {step.n}
                  </div>
                  <div
                    className="text-[22px] leading-snug transition-colors duration-200"
                    style={{
                      fontFamily: 'var(--font-instrument-serif)',
                      color: isActive ? 'var(--av-text-1)' : 'var(--av-text-2)',
                      fontWeight: isActive ? 500 : 400,
                    }}
                  >
                    {step.title}
                  </div>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="mt-2 text-[14px] leading-relaxed overflow-hidden"
                        style={{ color: 'var(--av-text-2)' }}
                      >
                        {step.body}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            )
          })}
        </div>

        {/* Browser mockup */}
        <div className="flex-1 w-full">
          <BrowserFrame />
        </div>
      </div>
    </section>
  )
}
