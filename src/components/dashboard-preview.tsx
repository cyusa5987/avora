'use client'

import { createContext, useContext } from 'react'
import {
  Search,
  BarChart2,
  Megaphone,
  Layers,
  Image,
  Users,
  Settings,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Plus,
  ChevronDown,
} from 'lucide-react'

const SF =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif'

// Theme context scoped to the dashboard
const DCtx = createContext(true)
const useDark = () => useContext(DCtx)

function w(dark: boolean, opacity: number) {
  return dark ? `rgba(255,255,255,${opacity})` : `rgba(0,0,0,${opacity})`
}

// ─── Data ────────────────────────────────────────────────────────────────────

const METRICS = [
  { label: 'Total Spend', value: '$4,510', change: '+8%', up: true, sub: 'vs last 30 days' },
  { label: 'ROAS', value: '3.8×', change: '+12%', up: true, sub: 'return on ad spend' },
  { label: 'Impressions', value: '1.15M', change: '+18%', up: true, sub: 'total views' },
  { label: 'Conversions', value: '302', change: '-3%', up: false, sub: 'purchases & leads' },
]

type CampaignStatus = 'Active' | 'Paused' | 'Learning'

interface Campaign {
  name: string
  objective: string
  status: CampaignStatus
  spend: number
  budget: number
  roas: number
  ctr: string
}

const CAMPAIGNS: Campaign[] = [
  { name: 'Summer Sale 2026',            objective: 'Conversions',  status: 'Active',   spend: 2100, budget: 3000, roas: 4.2, ctr: '2.4%' },
  { name: 'Brand Awareness Q2',          objective: 'Reach',        status: 'Active',   spend:  840, budget: 1000, roas: 2.8, ctr: '1.8%' },
  { name: 'Cart Abandoner Retargeting',  objective: 'Conversions',  status: 'Paused',   spend:  450, budget: 1000, roas: 6.1, ctr: '3.7%' },
  { name: 'Lookalike Top Buyers',        objective: 'Conversions',  status: 'Active',   spend:  720, budget: 1500, roas: 3.9, ctr: '2.1%' },
  { name: 'Dynamic Product Ads',         objective: 'Catalogue',    status: 'Learning', spend:  400, budget: 2000, roas: 1.9, ctr: '0.9%' },
]

// ─── Nav ─────────────────────────────────────────────────────────────────────

interface NavItem { icon: React.ReactNode; label: string; active?: boolean }

const NAV_ITEMS: NavItem[] = [
  { icon: <BarChart2  size={15} strokeWidth={2} />, label: 'Overview',   active: true },
  { icon: <Megaphone  size={15} strokeWidth={2} />, label: 'Campaigns' },
  { icon: <Layers     size={15} strokeWidth={2} />, label: 'Ad Sets' },
  { icon: <Image      size={15} strokeWidth={2} />, label: 'Creatives' },
  { icon: <Users      size={15} strokeWidth={2} />, label: 'Audiences' },
]

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function SidebarItem({ item }: { item: NavItem }) {
  const dark = useDark()
  return (
    <button
      className="flex w-full items-center gap-2.5 rounded-[8px] py-1.5 text-left transition-colors cursor-pointer justify-center sm:justify-start px-1.5 sm:px-2.5"
      style={{
        background: item.active ? w(dark, 0.07) : 'transparent',
        color: item.active ? (dark ? '#ffffff' : '#111111') : w(dark, 0.50),
        border: item.active ? `1px solid ${w(dark, 0.08)}` : '1px solid transparent',
        fontFamily: SF,
      }}
      onMouseEnter={(e) => { if (!item.active) e.currentTarget.style.background = w(dark, 0.04) }}
      onMouseLeave={(e) => { if (!item.active) e.currentTarget.style.background = 'transparent' }}
    >
      <span className="flex items-center justify-center flex-shrink-0" style={{ width: 16, color: item.active ? (dark ? '#ffffff' : '#111111') : w(dark, 0.42) }}>
        {item.icon}
      </span>
      <span className="hidden sm:block text-[13.5px]" style={{ fontWeight: item.active ? 500 : 400 }}>{item.label}</span>
    </button>
  )
}

function MetaConnectedBadge() {
  const dark = useDark()
  return (
    <div className="hidden sm:flex items-center gap-2 rounded-[8px] px-2.5 py-2 mt-1" style={{ background: w(dark, 0.03), border: `1px solid ${w(dark, 0.06)}` }}>
      {/* Meta wordmark "f" icon */}
      <span className="grid place-items-center rounded-md flex-shrink-0" style={{ width: 20, height: 20, background: '#1877F2' }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="white" aria-hidden>
          <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073c0 6.03 4.388 11.03 10.125 11.927v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796v8.437C19.612 23.103 24 18.103 24 12.073z"/>
        </svg>
      </span>
      <div className="flex flex-col min-w-0">
        <span className="text-[12px] truncate" style={{ fontFamily: SF, fontWeight: 500, color: dark ? '#ffffff' : '#111111' }}>Meta Ads</span>
        <span className="text-[10.5px]" style={{ fontFamily: SF, color: '#34D399' }}>● Connected</span>
      </div>
    </div>
  )
}

function Sidebar() {
  const dark = useDark()
  return (
    <aside
      className="flex flex-col shrink-0 w-[52px] sm:w-[220px] p-2 sm:p-3"
      style={{
        background: dark ? 'rgba(255,255,255,0.015)' : 'rgba(0,0,0,0.03)',
        border: `1px solid ${w(dark, 0.06)}`,
        borderRadius: 14,
      }}
    >
      {/* Logo */}
      <div className="px-1 pt-1 pb-3 flex items-center justify-center sm:justify-start">
        <span className="hidden sm:block" style={{ fontFamily: 'var(--font-syne)', fontSize: 15, fontWeight: 600, color: dark ? '#ffffff' : '#111111', letterSpacing: '-0.01em' }}>
          avora
        </span>
        <span className="sm:hidden">
          <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden>
            <rect width="32" height="32" rx="6" fill="#000000" />
            <circle cx="16" cy="16" r="9" fill="#3E6DF2" />
          </svg>
        </span>
      </div>

      {/* Search — desktop only */}
      <div className="hidden sm:flex items-center gap-2 rounded-[8px] px-2.5 py-1.5 mb-2" style={{ background: w(dark, 0.03), border: `1px solid ${w(dark, 0.06)}` }}>
        <Search size={13} strokeWidth={2.2} style={{ color: w(dark, 0.40) }} />
        <span className="text-[13px]" style={{ fontFamily: SF, color: w(dark, 0.36) }}>Search</span>
        <span className="ml-auto rounded px-1.5 py-0.5 text-[10.5px]" style={{ background: w(dark, 0.04), color: w(dark, 0.40), border: `1px solid ${w(dark, 0.06)}`, fontFamily: SF }}>⌘K</span>
      </div>

      {/* Nav */}
      <div className="flex flex-col flex-1 sm:flex-none justify-evenly sm:justify-start gap-0 sm:gap-0.5">
        <nav className="flex flex-col gap-0 sm:gap-0.5">
          {NAV_ITEMS.map((it) => <SidebarItem key={it.label} item={it} />)}
        </nav>
        <MetaConnectedBadge />
      </div>

      {/* Bottom */}
      <div className="flex flex-col gap-2 sm:pt-4">
        <SidebarItem item={{ icon: <Settings size={15} strokeWidth={2} />, label: 'Settings' }} />
        {/* User — desktop */}
        <div className="hidden sm:flex items-center gap-2.5 rounded-[8px] px-2 py-2">
          <span className="grid place-items-center rounded-full flex-shrink-0 text-[11px] font-bold text-white" style={{ width: 26, height: 26, background: 'linear-gradient(135deg, #5B85FF, #2D54E0)', fontFamily: SF }}>A</span>
          <div className="flex flex-col min-w-0">
            <span className="text-[13px] truncate" style={{ fontFamily: SF, fontWeight: 500, color: dark ? '#ffffff' : '#111111' }}>My Workspace</span>
            <span className="text-[11px] truncate" style={{ fontFamily: SF, color: w(dark, 0.40) }}>Pro plan</span>
          </div>
        </div>
        {/* User — mobile */}
        <div className="sm:hidden flex items-center justify-center py-1">
          <span className="grid place-items-center rounded-full text-[11px] font-bold text-white" style={{ width: 24, height: 24, background: 'linear-gradient(135deg, #5B85FF, #2D54E0)', fontFamily: SF }}>A</span>
        </div>
      </div>
    </aside>
  )
}

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: CampaignStatus }) {
  const dark = useDark()
  const map: Record<CampaignStatus, { color: string; bg: string; border: string; dot: string }> = {
    Active:   { color: '#34D399', bg: dark ? 'rgba(52,211,153,0.10)'  : 'rgba(52,211,153,0.12)',  border: dark ? 'rgba(52,211,153,0.20)'  : 'rgba(52,211,153,0.28)',  dot: '#34D399' },
    Paused:   { color: dark ? 'rgba(255,255,255,0.55)' : '#5A5856', bg: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)', border: dark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)', dot: dark ? 'rgba(255,255,255,0.35)' : '#999' },
    Learning: { color: '#FBBF24', bg: dark ? 'rgba(251,191,36,0.10)'  : 'rgba(251,191,36,0.12)',  border: dark ? 'rgba(251,191,36,0.22)'  : 'rgba(251,191,36,0.28)',  dot: '#FBBF24' },
  }
  const s = map[status]
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium"
      style={{ color: s.color, background: s.bg, border: `1px solid ${s.border}`, fontFamily: SF }}
    >
      <span className="rounded-full flex-shrink-0" style={{ width: 5, height: 5, background: s.dot }} />
      {status}
    </span>
  )
}

// ─── Spend progress bar ───────────────────────────────────────────────────────

function SpendBar({ spend, budget }: { spend: number; budget: number }) {
  const dark = useDark()
  const pct = Math.min((spend / budget) * 100, 100)
  return (
    <div className="flex flex-col gap-1 min-w-0">
      <div className="flex items-center justify-between gap-1">
        <span className="text-[11.5px] font-medium tabular-nums" style={{ fontFamily: SF, color: dark ? '#ffffff' : '#111111' }}>
          ${spend.toLocaleString()}
        </span>
        <span className="text-[11px] tabular-nums" style={{ fontFamily: SF, color: w(dark, 0.40) }}>
          /${budget.toLocaleString()}
        </span>
      </div>
      <div className="rounded-full overflow-hidden" style={{ height: 4, background: w(dark, 0.07) }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #5B85FF, #2D54E0)' }} />
      </div>
    </div>
  )
}

// ─── ROAS chip ────────────────────────────────────────────────────────────────

function RoasChip({ value }: { value: number }) {
  const dark = useDark()
  const good = value >= 3
  return (
    <span
      className="inline-block tabular-nums text-[12.5px] font-semibold rounded-md px-2 py-0.5"
      style={{
        fontFamily: SF,
        color: good ? '#34D399' : (dark ? 'rgba(255,255,255,0.65)' : '#5A5856'),
        background: good ? (dark ? 'rgba(52,211,153,0.10)' : 'rgba(52,211,153,0.10)') : w(dark, 0.04),
      }}
    >
      {value}×
    </span>
  )
}

// ─── Metric card ─────────────────────────────────────────────────────────────

function MetricCard({ metric }: { metric: typeof METRICS[number] }) {
  const dark = useDark()
  return (
    <div
      className="flex flex-col gap-2 rounded-[12px] p-3.5"
      style={{
        background: dark ? 'rgba(255,255,255,0.03)' : '#ffffff',
        border: `1px solid ${w(dark, 0.06)}`,
        boxShadow: dark ? 'none' : '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      <span className="text-[11.5px]" style={{ fontFamily: SF, color: w(dark, 0.45) }}>{metric.label}</span>
      <div className="flex items-end justify-between gap-2">
        <span className="text-[22px] font-bold tabular-nums leading-none" style={{ fontFamily: SF, color: dark ? '#ffffff' : '#111111', letterSpacing: '-0.02em' }}>
          {metric.value}
        </span>
        <span
          className="inline-flex items-center gap-0.5 text-[11.5px] font-medium rounded-md px-1.5 py-0.5 mb-0.5"
          style={{
            fontFamily: SF,
            color: metric.up ? '#34D399' : '#F87171',
            background: metric.up ? (dark ? 'rgba(52,211,153,0.10)' : 'rgba(52,211,153,0.10)') : (dark ? 'rgba(248,113,113,0.10)' : 'rgba(248,113,113,0.10)'),
          }}
        >
          {metric.up ? <TrendingUp size={11} strokeWidth={2.5} /> : <TrendingDown size={11} strokeWidth={2.5} />}
          {metric.change}
        </span>
      </div>
      <span className="text-[11px]" style={{ fontFamily: SF, color: w(dark, 0.30) }}>{metric.sub}</span>
    </div>
  )
}

// ─── Campaign table ───────────────────────────────────────────────────────────

function CampaignRow({ campaign, last }: { campaign: Campaign; last?: boolean }) {
  const dark = useDark()
  return (
    <div
      className="grid items-center gap-3 py-3 px-1"
      style={{
        gridTemplateColumns: '1fr 80px 120px 64px 52px 28px',
        borderBottom: last ? 'none' : `1px solid ${w(dark, 0.05)}`,
      }}
    >
      {/* Name */}
      <div className="min-w-0">
        <div className="truncate text-[13px] font-medium" style={{ fontFamily: SF, color: dark ? '#ffffff' : '#111111' }}>
          {campaign.name}
        </div>
        <div className="text-[11.5px] mt-0.5" style={{ fontFamily: SF, color: w(dark, 0.40) }}>
          {campaign.objective}
        </div>
      </div>
      {/* Status */}
      <div><StatusBadge status={campaign.status} /></div>
      {/* Spend/Budget */}
      <div><SpendBar spend={campaign.spend} budget={campaign.budget} /></div>
      {/* ROAS */}
      <div><RoasChip value={campaign.roas} /></div>
      {/* CTR */}
      <div className="text-[12.5px] tabular-nums font-medium" style={{ fontFamily: SF, color: w(dark, 0.65) }}>
        {campaign.ctr}
      </div>
      {/* Menu */}
      <button className="grid place-items-center rounded-md transition-colors cursor-pointer" style={{ width: 26, height: 26, color: w(dark, 0.35) }}
        onMouseEnter={e => (e.currentTarget.style.background = w(dark, 0.05))}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
        <MoreHorizontal size={14} strokeWidth={2} />
      </button>
    </div>
  )
}

function CampaignTable() {
  const dark = useDark()
  return (
    <div
      className="rounded-[12px] overflow-hidden"
      style={{ background: dark ? 'rgba(255,255,255,0.025)' : '#ffffff', border: `1px solid ${w(dark, 0.06)}` }}
    >
      {/* Table header */}
      <div
        className="grid items-center gap-3 px-1 py-2.5"
        style={{
          gridTemplateColumns: '1fr 80px 120px 64px 52px 28px',
          borderBottom: `1px solid ${w(dark, 0.06)}`,
          background: dark ? 'rgba(255,255,255,0.018)' : 'rgba(0,0,0,0.02)',
        }}
      >
        {['Campaign', 'Status', 'Spend / Budget', 'ROAS', 'CTR', ''].map((h) => (
          <span key={h} className="text-[11px] font-semibold uppercase tracking-wider" style={{ fontFamily: SF, color: w(dark, 0.35), letterSpacing: '0.06em' }}>
            {h}
          </span>
        ))}
      </div>
      {/* Rows */}
      <div className="px-2">
        {CAMPAIGNS.map((c, i) => (
          <CampaignRow key={c.name} campaign={c} last={i === CAMPAIGNS.length - 1} />
        ))}
      </div>
    </div>
  )
}

// ─── Top bar ─────────────────────────────────────────────────────────────────

function TopBar() {
  const dark = useDark()
  return (
    <div className="flex items-center justify-between gap-3 mb-4">
      <div>
        <h1 className="text-[15px] font-semibold leading-none" style={{ fontFamily: SF, color: dark ? '#ffffff' : '#111111', letterSpacing: '-0.01em' }}>
          Overview
        </h1>
        <p className="text-[12px] mt-0.5" style={{ fontFamily: SF, color: w(dark, 0.40) }}>Last 30 days · Meta Ads</p>
      </div>
      <div className="flex items-center gap-2">
        {/* Date chip — hide on mobile */}
        <button className="hidden sm:inline-flex items-center gap-1.5 rounded-[8px] px-3 py-1.5 text-[12.5px] cursor-pointer transition-colors" style={{ fontFamily: SF, background: w(dark, 0.04), border: `1px solid ${w(dark, 0.08)}`, color: w(dark, 0.60) }}>
          May 2026
          <ChevronDown size={12} strokeWidth={2.2} />
        </button>
        {/* New campaign */}
        <button className="inline-flex items-center gap-1.5 rounded-[8px] px-3 py-1.5 text-[12.5px] font-semibold text-white cursor-pointer transition-opacity hover:opacity-90" style={{ fontFamily: SF, background: 'linear-gradient(180deg, #5B85FF 0%, #2D54E0 100%)', boxShadow: '0 2px 8px rgba(45,84,224,0.32)' }}>
          <Plus size={13} strokeWidth={2.5} />
          <span className="hidden sm:inline">New campaign</span>
          <span className="sm:hidden">New</span>
        </button>
      </div>
    </div>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function DashboardPreview({ isDark = true }: { isDark?: boolean }) {
  return (
    <DCtx.Provider value={isDark}>
      <div
        className="rounded-[18px] p-3 mx-auto w-full"
        style={{
          background: isDark ? '#161616' : '#F0F0F0',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
          boxShadow: isDark
            ? '0 30px 80px -20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)'
            : '0 30px 80px -20px rgba(0,0,0,0.12)',
          maxWidth: 1280,
        }}
      >
        <div className="flex gap-3">
          <Sidebar />

          {/* Main content */}
          <div className="flex-1 min-w-0 flex flex-col py-1 pr-1">
            <TopBar />

            {/* Metric cards */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-4">
              {METRICS.map((m) => <MetricCard key={m.label} metric={m} />)}
            </div>

            {/* Campaign table */}
            <CampaignTable />
          </div>
        </div>
      </div>
    </DCtx.Provider>
  )
}
