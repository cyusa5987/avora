'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart2,
  Target,
  TrendingUp,
  Users,
  CreditCard,
  Settings,
  Bell,
  ChevronDown,
  Plus,
  Play,
  Pause,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Search,

  Menu,
  X,
  Layers,
  AlertCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  Activity,
} from 'lucide-react'
import Link from 'next/link'

const SF =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif'

// ─── Mock data ────────────────────────────────────────────────────────────────

const METRICS = [
  {
    label: 'ROAS',
    value: '3.8×',
    raw: 3.8,
    change: +12,
    icon: TrendingUp,
    color: '#22C55E',
  },
  {
    label: 'Total Spend',
    value: '$4,510',
    raw: 4510,
    change: +8,
    icon: DollarSign,
    color: '#3E6DF2',
  },
  {
    label: 'Revenue',
    value: '$17,138',
    raw: 17138,
    change: +21,
    icon: Activity,
    color: '#A855F7',
  },
  {
    label: 'Conversions',
    value: '302',
    raw: 302,
    change: -3,
    icon: Target,
    color: '#F59E0B',
  },
]

const CAMPAIGNS = [
  {
    name: 'Summer Collection 2026',
    status: 'active',
    roas: 4.2,
    spend: 1240,
    budget: 2000,
    conversions: 89,
    change: +15,
    objective: 'Conversions',
  },
  {
    name: 'Brand Awareness — Q2',
    status: 'active',
    roas: 2.8,
    spend: 850,
    budget: 1500,
    conversions: 34,
    change: -4,
    objective: 'Reach',
  },
  {
    name: 'Cart Abandoner Retargeting',
    status: 'paused',
    roas: 6.1,
    spend: 320,
    budget: 500,
    conversions: 52,
    change: 0,
    objective: 'Conversions',
  },
  {
    name: 'Lookalike — Top Customers',
    status: 'active',
    roas: 3.9,
    spend: 2100,
    budget: 3000,
    conversions: 147,
    change: +22,
    objective: 'Conversions',
  },
  {
    name: 'Dynamic Product Ads',
    status: 'learning',
    roas: 1.9,
    spend: 180,
    budget: 500,
    conversions: 12,
    change: +6,
    objective: 'Catalogue Sales',
  },
]

const INSIGHTS = [
  {
    type: 'opportunity',
    icon: Zap,
    color: '#22C55E',
    bg: 'rgba(34,197,94,0.10)',
    title: 'Resume high-ROAS campaign',
    body: 'Cart Abandoner Retargeting has a 6.1× ROAS but is currently paused. Resuming with a +$200 daily budget could yield an estimated +$1,200 revenue/week.',
    action: 'Resume campaign',
  },
  {
    type: 'warning',
    icon: Clock,
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.10)',
    title: 'Learning phase — avoid edits',
    body: 'Dynamic Product Ads is still in the learning phase. Editing the campaign in the next 18 hours may reset delivery and extend the learning period.',
    action: 'View status',
  },
  {
    type: 'suggestion',
    icon: TrendingUp,
    color: '#5B85FF',
    bg: 'rgba(91,133,255,0.10)',
    title: 'Budget reallocation opportunity',
    body: 'Moving $300 from Brand Awareness to Summer Collection aligns spend with your top ROAS campaign. Estimated +$800 in weekly revenue.',
    action: 'Apply change',
  },
]

const NAV_ITEMS = [
  { icon: BarChart2, label: 'Overview', href: '/dashboard', active: true },
  { icon: Target, label: 'Campaigns', href: '/dashboard/campaigns' },
  { icon: TrendingUp, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Users, label: 'Audiences', href: '/dashboard/audiences' },
  { icon: Layers, label: 'Ad Accounts', href: '/dashboard/accounts' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function w(dark: boolean, opacity: number) {
  return dark ? `rgba(255,255,255,${opacity})` : `rgba(0,0,0,${opacity})`
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string; bg: string; icon: React.ElementType }> = {
    active:   { label: 'Active',   color: '#22C55E', bg: 'rgba(34,197,94,0.12)',   icon: CheckCircle2 },
    paused:   { label: 'Paused',   color: '#F59E0B', bg: 'rgba(245,158,11,0.12)',  icon: Pause },
    learning: { label: 'Learning', color: '#5B85FF', bg: 'rgba(91,133,255,0.12)',  icon: Clock },
    error:    { label: 'Error',    color: '#EF4444', bg: 'rgba(239,68,68,0.12)',   icon: AlertCircle },
  }
  const s = map[status] ?? map.active
  const Icon = s.icon
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-medium"
      style={{ color: s.color, background: s.bg }}
    >
      <Icon size={11} strokeWidth={2.4} />
      {s.label}
    </span>
  )
}

function RoasBar({ roas, isDark }: { roas: number; isDark: boolean }) {
  const pct = Math.min((roas / 8) * 100, 100)
  const color = roas >= 4 ? '#22C55E' : roas >= 2.5 ? '#F59E0B' : '#EF4444'
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="text-[13.5px] font-semibold tabular-nums w-[36px]"
        style={{ color, fontFamily: SF }}
      >
        {roas}×
      </span>
      <div
        className="h-1.5 w-[60px] rounded-full overflow-hidden"
        style={{ background: w(isDark, 0.07) }}
      >
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  )
}

function SpendProgress({ spend, budget, isDark }: { spend: number; budget: number; isDark: boolean }) {
  const pct = Math.round((spend / budget) * 100)
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[12px] tabular-nums" style={{ fontFamily: SF, color: w(isDark, 0.75) }}>
          ${spend.toLocaleString()}
        </span>
        <span className="text-[11px]" style={{ fontFamily: SF, color: w(isDark, 0.38) }}>
          of ${budget.toLocaleString()}
        </span>
      </div>
      <div className="h-1 w-full rounded-full overflow-hidden" style={{ background: w(isDark, 0.07) }}>
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: pct > 85 ? '#EF4444' : pct > 65 ? '#F59E0B' : '#3E6DF2',
          }}
        />
      </div>
    </div>
  )
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({ isDark, open, onClose }: { isDark: boolean; open: boolean; onClose: () => void }) {
  const sidebarBg = isDark ? '#0E0E0E' : '#FFFFFF'
  const border = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full z-40 flex flex-col transition-transform duration-300 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        style={{
          width: 220,
          background: sidebarBg,
          borderRight: `1px solid ${border}`,
          fontFamily: SF,
        }}
      >
        {/* Logo */}
        <div className="px-5 pt-5 pb-4" style={{ borderBottom: `1px solid ${border}` }}>
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden>
                <rect width="32" height="32" rx="7" fill="#000000" />
                <circle cx="16" cy="16" r="9" fill="#3E6DF2" />
              </svg>
              <span
                style={{
                  fontFamily: 'var(--font-syne)',
                  fontSize: 15,
                  fontWeight: 600,
                  color: isDark ? '#ffffff' : '#111111',
                  letterSpacing: '-0.01em',
                }}
              >
                avora
              </span>
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden grid place-items-center rounded-lg w-7 h-7 transition-colors cursor-pointer"
              style={{ color: w(isDark, 0.4) }}
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Account selector */}
        <div className="px-3 py-2.5">
          <button
            className="w-full flex items-center gap-2.5 rounded-[9px] px-3 py-2 transition-colors cursor-pointer"
            style={{
              background: w(isDark, 0.04),
              border: `1px solid ${w(isDark, 0.06)}`,
            }}
          >
            <div
              className="w-6 h-6 rounded-md flex-shrink-0 grid place-items-center text-[10px] font-bold text-white"
              style={{ background: '#3E6DF2' }}
            >
              A
            </div>
            <div className="flex-1 text-left">
              <div className="text-[12.5px] font-medium" style={{ color: isDark ? '#ffffff' : '#111111' }}>
                Acme Store
              </div>
              <div className="text-[10.5px]" style={{ color: w(isDark, 0.45) }}>
                Meta Ads
              </div>
            </div>
            <ChevronDown size={13} style={{ color: w(isDark, 0.4) }} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto">
          <div className="flex flex-col gap-0.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2.5 rounded-[9px] px-3 py-2 transition-colors duration-150"
                  style={{
                    background: item.active ? w(isDark, 0.07) : 'transparent',
                    color: item.active ? (isDark ? '#ffffff' : '#111111') : w(isDark, 0.50),
                    border: item.active ? `1px solid ${w(isDark, 0.08)}` : '1px solid transparent',
                    fontFamily: SF,
                  }}
                  onMouseEnter={(e) => {
                    if (!item.active)
                      e.currentTarget.style.background = w(isDark, 0.04)
                  }}
                  onMouseLeave={(e) => {
                    if (!item.active) e.currentTarget.style.background = 'transparent'
                  }}
                >
                  <Icon
                    size={15}
                    strokeWidth={2}
                    style={{ color: item.active ? (isDark ? '#ffffff' : '#111111') : w(isDark, 0.42) }}
                  />
                  <span className="text-[13.5px]" style={{ fontWeight: item.active ? 500 : 400 }}>
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-4 flex flex-col gap-0.5" style={{ borderTop: `1px solid ${w(isDark, 0.06)}`, paddingTop: 12 }}>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-2.5 rounded-[9px] px-3 py-2 transition-colors duration-150 cursor-pointer"
            style={{ color: w(isDark, 0.50), fontFamily: SF }}
            onMouseEnter={(e) => (e.currentTarget.style.background = w(isDark, 0.04))}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <Settings size={15} strokeWidth={2} style={{ color: w(isDark, 0.42) }} />
            <span className="text-[13.5px]">Settings</span>
          </Link>
          <div className="flex items-center gap-2.5 px-3 py-2 mt-1 rounded-[9px]" style={{ background: w(isDark, 0.03), border: `1px solid ${w(isDark, 0.06)}` }}>
            <div
              className="w-7 h-7 rounded-full flex-shrink-0 grid place-items-center text-[11px] font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #5B85FF, #2D54E0)' }}
            >
              C
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] font-medium truncate" style={{ color: isDark ? '#ffffff' : '#111111' }}>
                Cyusa
              </div>
              <div className="text-[10.5px] truncate" style={{ color: w(isDark, 0.40) }}>
                Pro plan
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const isDark = true
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeInsight, setActiveInsight] = useState<number | null>(null)

  const mainBg = isDark ? '#111111' : '#F5F5F5'
  const cardBg = isDark ? '#1A1A1A' : '#FFFFFF'
  const border = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: mainBg, fontFamily: SF }}>
      <Sidebar isDark={isDark} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-[220px]">

        {/* Top bar */}
        <header
          className="flex items-center gap-4 px-6 h-[56px] flex-shrink-0"
          style={{
            background: isDark ? '#0E0E0E' : '#FFFFFF',
            borderBottom: `1px solid ${border}`,
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden grid place-items-center rounded-lg w-8 h-8 transition-colors cursor-pointer"
            style={{ color: w(isDark, 0.50) }}
          >
            <Menu size={16} />
          </button>

          {/* Search */}
          <div
            className="hidden sm:flex items-center gap-2 rounded-[8px] px-3 py-1.5"
            style={{
              background: w(isDark, 0.04),
              border: `1px solid ${w(isDark, 0.07)}`,
              width: 220,
            }}
          >
            <Search size={13} strokeWidth={2} style={{ color: w(isDark, 0.38) }} />
            <span className="text-[13px]" style={{ color: w(isDark, 0.35) }}>
              Search campaigns…
            </span>
            <span
              className="ml-auto rounded px-1.5 py-0.5 text-[10px]"
              style={{ background: w(isDark, 0.05), color: w(isDark, 0.38), border: `1px solid ${w(isDark, 0.07)}` }}
            >
              ⌘K
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Date range */}
            <button
              className="hidden md:flex items-center gap-1.5 rounded-[8px] px-3 py-1.5 text-[13px] transition-colors cursor-pointer"
              style={{
                background: w(isDark, 0.04),
                border: `1px solid ${w(isDark, 0.07)}`,
                color: w(isDark, 0.65),
              }}
            >
              Last 30 days
              <ChevronDown size={12} />
            </button>

            {/* New campaign */}
            <button
              className="inline-flex items-center gap-1.5 rounded-[9px] px-3.5 py-1.5 text-[13px] font-medium text-white transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              style={{
                background: 'linear-gradient(180deg, #5B85FF 0%, #2D54E0 100%)',
                boxShadow: '0 2px 8px rgba(45,84,224,0.30), inset 0 1px 0 rgba(255,255,255,0.28)',
              }}
            >
              <Plus size={14} strokeWidth={2.4} />
              New campaign
            </button>

            {/* Notifications */}
            <button
              className="relative grid place-items-center rounded-[9px] w-8 h-8 transition-colors cursor-pointer"
              style={{ background: w(isDark, 0.04), border: `1px solid ${w(isDark, 0.07)}`, color: w(isDark, 0.55) }}
            >
              <Bell size={14} strokeWidth={2} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#3E6DF2]" />
            </button>

          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-6 py-6">

          {/* Page header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1
                className="text-[22px] font-bold tracking-tight"
                style={{ color: isDark ? '#ffffff' : '#111111', letterSpacing: '-0.015em' }}
              >
                Overview
              </h1>
              <p className="text-[13px] mt-0.5" style={{ color: w(isDark, 0.45) }}>
                Acme Store · Jun 1 – Jun 28, 2026
              </p>
            </div>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {METRICS.map((m, i) => {
              const Icon = m.icon
              const up = m.change >= 0
              return (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[14px] border p-4"
                  style={{ background: cardBg, borderColor: border }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[12px] font-medium" style={{ color: w(isDark, 0.50) }}>
                      {m.label}
                    </span>
                    <span
                      className="grid place-items-center rounded-[8px] w-7 h-7"
                      style={{ background: `${m.color}18` }}
                    >
                      <Icon size={13} strokeWidth={2} style={{ color: m.color }} />
                    </span>
                  </div>
                  <div
                    className="text-[22px] font-bold tracking-tight leading-none"
                    style={{ color: isDark ? '#ffffff' : '#111111' }}
                  >
                    {m.value}
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {up ? (
                      <ArrowUpRight size={13} strokeWidth={2.2} style={{ color: '#22C55E' }} />
                    ) : (
                      <ArrowDownRight size={13} strokeWidth={2.2} style={{ color: '#EF4444' }} />
                    )}
                    <span
                      className="text-[12px] font-medium"
                      style={{ color: up ? '#22C55E' : '#EF4444' }}
                    >
                      {up ? '+' : ''}{m.change}%
                    </span>
                    <span className="text-[11.5px]" style={{ color: w(isDark, 0.35) }}>
                      vs last period
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Main grid: campaigns + insights */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5">

            {/* Campaigns table */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[16px] border overflow-hidden"
              style={{ background: cardBg, borderColor: border }}
            >
              {/* Table header */}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: `1px solid ${border}` }}
              >
                <h2
                  className="text-[14px] font-semibold"
                  style={{ color: isDark ? '#ffffff' : '#111111' }}
                >
                  Campaigns
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-[12px]" style={{ color: w(isDark, 0.40) }}>
                    {CAMPAIGNS.length} total
                  </span>
                  <button
                    className="inline-flex items-center gap-1.5 rounded-[7px] px-2.5 py-1 text-[12px] transition-colors cursor-pointer"
                    style={{
                      background: w(isDark, 0.05),
                      border: `1px solid ${w(isDark, 0.08)}`,
                      color: w(isDark, 0.60),
                    }}
                  >
                    <Plus size={11} strokeWidth={2.4} />
                    New
                  </button>
                </div>
              </div>

              {/* Column headers */}
              <div
                className="grid px-5 py-2.5 text-[11.5px] font-medium"
                style={{
                  gridTemplateColumns: '1fr 100px 110px 130px 90px 36px',
                  color: w(isDark, 0.38),
                  borderBottom: `1px solid ${w(isDark, 0.05)}`,
                }}
              >
                <span>Campaign</span>
                <span>Status</span>
                <span>ROAS</span>
                <span>Spend / Budget</span>
                <span className="text-right">Conv.</span>
                <span />
              </div>

              {/* Rows */}
              {CAMPAIGNS.map((c, i) => (
                <div
                  key={c.name}
                  className="grid items-center px-5 py-3.5 transition-colors duration-150 cursor-pointer"
                  style={{
                    gridTemplateColumns: '1fr 100px 110px 130px 90px 36px',
                    borderBottom: i < CAMPAIGNS.length - 1 ? `1px solid ${w(isDark, 0.04)}` : 'none',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = w(isDark, 0.025))}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <div>
                    <div
                      className="text-[13.5px] font-medium truncate pr-4"
                      style={{ color: isDark ? '#ffffff' : '#111111' }}
                    >
                      {c.name}
                    </div>
                    <div
                      className="text-[11.5px] mt-0.5"
                      style={{ color: w(isDark, 0.38) }}
                    >
                      {c.objective}
                    </div>
                  </div>
                  <div><StatusBadge status={c.status} /></div>
                  <div><RoasBar roas={c.roas} isDark={isDark} /></div>
                  <div className="pr-4"><SpendProgress spend={c.spend} budget={c.budget} isDark={isDark} /></div>
                  <div className="text-right">
                    <div className="text-[13.5px] tabular-nums font-medium" style={{ color: isDark ? '#ffffff' : '#111111' }}>
                      {c.conversions}
                    </div>
                    <div
                      className="text-[11px] mt-0.5 inline-flex items-center gap-0.5"
                      style={{ color: c.change > 0 ? '#22C55E' : c.change < 0 ? '#EF4444' : w(isDark, 0.35) }}
                    >
                      {c.change > 0 && <ArrowUpRight size={10} />}
                      {c.change < 0 && <ArrowDownRight size={10} />}
                      {c.change !== 0 ? `${c.change > 0 ? '+' : ''}${c.change}%` : '—'}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="grid place-items-center rounded-[7px] w-7 h-7 opacity-0 transition-opacity duration-150 cursor-pointer group-hover:opacity-100"
                      style={{ color: w(isDark, 0.45) }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1'
                        e.currentTarget.style.background = w(isDark, 0.07)
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '0'
                        e.currentTarget.style.background = 'transparent'
                      }}
                      onClick={(e) => {
                        e.currentTarget.style.opacity = '1'
                      }}
                    >
                      <MoreHorizontal size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* AI Insights panel */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-3"
            >
              {/* Header card */}
              <div
                className="rounded-[16px] border p-4"
                style={{ background: cardBg, borderColor: border }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="grid place-items-center rounded-[8px] w-7 h-7"
                    style={{ background: 'rgba(91,133,255,0.12)' }}
                  >
                    <Zap size={13} strokeWidth={0} className="fill-[#5B85FF]" />
                  </span>
                  <span
                    className="text-[13.5px] font-semibold"
                    style={{ color: isDark ? '#ffffff' : '#111111' }}
                  >
                    AI Insights
                  </span>
                  <span
                    className="ml-auto rounded-full px-2 py-0.5 text-[10.5px] font-semibold"
                    style={{ background: 'rgba(91,133,255,0.12)', color: '#5B85FF' }}
                  >
                    3 new
                  </span>
                </div>
                <p className="text-[12px]" style={{ color: w(isDark, 0.42) }}>
                  Avora has analysed your campaigns and found actions that could improve your ROAS.
                </p>
              </div>

              {/* Insight cards */}
              {INSIGHTS.map((ins, i) => {
                const Icon = ins.icon
                const open = activeInsight === i
                return (
                  <div
                    key={i}
                    className="rounded-[14px] border overflow-hidden"
                    style={{
                      background: cardBg,
                      borderColor: open ? ins.color.replace(')', ',0.35)').replace('rgb', 'rgba') : border,
                      transition: 'border-color 200ms',
                    }}
                  >
                    <button
                      onClick={() => setActiveInsight(open ? null : i)}
                      className="w-full flex items-start gap-3 p-4 text-left cursor-pointer"
                    >
                      <span
                        className="mt-0.5 flex-shrink-0 grid place-items-center rounded-[8px] w-7 h-7"
                        style={{ background: ins.bg }}
                      >
                        <Icon size={13} strokeWidth={2} style={{ color: ins.color }} />
                      </span>
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-[13px] font-medium"
                          style={{ color: isDark ? '#ffffff' : '#111111' }}
                        >
                          {ins.title}
                        </div>
                        {!open && (
                          <div
                            className="text-[12px] mt-0.5 line-clamp-1"
                            style={{ color: w(isDark, 0.42) }}
                          >
                            {ins.body}
                          </div>
                        )}
                      </div>
                    </button>
                    {open && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22 }}
                        className="px-4 pb-4"
                      >
                        <p
                          className="text-[12.5px] leading-relaxed mb-3"
                          style={{ color: w(isDark, 0.58) }}
                        >
                          {ins.body}
                        </p>
                        <button
                          className="inline-flex items-center gap-1.5 rounded-[8px] px-3 py-1.5 text-[12px] font-medium cursor-pointer transition-colors"
                          style={{
                            background: ins.bg,
                            color: ins.color,
                          }}
                        >
                          {ins.action}
                          <ArrowUpRight size={11} strokeWidth={2.2} />
                        </button>
                      </motion.div>
                    )}
                  </div>
                )
              })}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
