'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const BG = '#161616'
const SF = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif'

function PaperPlaneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4L2 9.5l7.5 3L13 21z"/>
      <path d="M9.5 12.5L20 4"/>
    </svg>
  )
}

const NAV_LINKS: { label: string; href: string; badge?: string }[] = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'MCP', href: '#mcp', badge: 'NEW' },
]

interface NavbarProps {
  onOpenModal: () => void
  onOpenPricing?: () => void
}

export function Navbar({ onOpenModal, onOpenPricing }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleHashClick = (href: string) => (e: React.MouseEvent) => {
    if (!href.startsWith('#')) return
    const el = typeof document !== 'undefined' ? document.getElementById(href.slice(1)) : null
    if (!el) return
    e.preventDefault()
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (mobileOpen) setMobileOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className="relative">

        {/* === Mobile: compact pill === */}
        <nav
          className="sm:hidden relative mx-auto flex items-center gap-3 rounded-full border h-[50px] w-fit pl-3 pr-1.5"
          style={{
            marginTop: 14,
            background: BG,
            borderColor: 'rgba(255,255,255,0.10)',
            boxShadow: '0 4px 18px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === '/') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }
            }}
            className="inline-flex items-center transition-opacity duration-200 hover:opacity-75"
          >
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden>
              <rect width="32" height="32" rx="7" fill="#000000" />
              <circle cx="16" cy="16" r="9" fill="#3E6DF2" />
            </svg>
          </Link>
          <span aria-hidden className="block h-5 w-px" style={{ background: 'rgba(255,255,255,0.12)' }} />
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-xl p-2 transition-colors"
            style={{ color: '#ffffff' }}
            aria-label="Toggle navigation"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span key="close" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.18 }} className="block">
                  <X className="size-5" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }} transition={{ duration: 0.18 }} className="block">
                  <Menu className="size-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>

        {/* === Desktop === */}
        <nav
          className="hidden sm:flex relative items-center justify-between h-[68px] w-full px-10"
          style={{
            background: BG,
            borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
            transition: 'border-color 300ms ease',
          }}
        >
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === '/') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }
            }}
            className="inline-flex items-center transition-opacity duration-200 hover:opacity-80 px-1"
          >
            <span
              className="text-[17px] font-semibold"
              style={{ fontFamily: 'var(--font-syne)', color: '#ffffff', letterSpacing: '-0.01em' }}
            >
              avora
            </span>
          </Link>

          <ul className="flex items-center gap-2 shrink-0 absolute left-1/2 -translate-x-1/2" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={handleHashClick(link.href)}
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium px-3 py-1.5 rounded-lg transition-all duration-150 hover:bg-white/[0.07]"
                  style={{ fontFamily: SF, color: 'rgba(255,255,255,0.60)' }}
                >
                  {link.label}
                  {link.badge && (
                    <span
                      className="ml-0.5 rounded-md px-1.5 py-px text-[9px] font-semibold tracking-wide"
                      style={{ background: '#3E6DF2', color: '#FFFFFF' }}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={onOpenModal}
            className="inline-flex items-center justify-center rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] shrink-0 cursor-pointer"
            style={{
              fontFamily: SF,
              background: 'linear-gradient(180deg, #5B85FF 0%, #2D54E0 100%)',
              color: '#FFFFFF',
              boxShadow: '0 1px 2px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.35)',
            }}
          >
            Get Started
          </button>
        </nav>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-4 mt-2 overflow-hidden rounded-2xl border shadow-2xl sm:hidden"
            style={{
              background: BG,
              borderColor: 'rgba(255,255,255,0.10)',
            }}
          >
            <ul className="flex flex-col px-3 py-3 gap-0.5" role="list">
              {NAV_LINKS.map((link, i) => (
                <motion.li key={link.label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06, duration: 0.22 }}>
                  <Link
                    href={link.href}
                    onClick={handleHashClick(link.href)}
                    className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-normal transition-colors duration-150"
                    style={{ fontFamily: SF, color: 'rgba(255,255,255,0.75)' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="border-t px-4 py-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <button
                onClick={() => { setMobileOpen(false); onOpenModal() }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-[14px] font-medium text-white transition-transform duration-200 hover:scale-[1.01] active:scale-[0.98]"
                style={{
                  fontFamily: SF,
                  background: 'linear-gradient(180deg, #5B85FF 0%, #2D54E0 100%)',
                  boxShadow: '0 6px 16px -4px rgba(45,84,224,0.40), inset 0 1px 0 rgba(255,255,255,0.35)',
                }}
              >
                Join waitlist
                <PaperPlaneIcon />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
