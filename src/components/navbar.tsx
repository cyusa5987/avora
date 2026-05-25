'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import { useTheme } from '@/lib/theme-context'

function PaperPlaneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4L2 9.5l7.5 3L13 21z"/>
      <path d="M9.5 12.5L20 4"/>
    </svg>
  )
}

function AvoraLogoMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      <rect width="26" height="26" rx="7" fill="#969492" />
      <path
        d="M7.5 19.5L13 8L18.5 19.5"
        stroke="white"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="9.8" y1="16" x2="16.2" y2="16" stroke="white" strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  )
}

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'MCP', href: '#mcp' },
]

interface NavbarProps {
  onOpenModal: () => void
}

export function Navbar({ onOpenModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Smooth-scroll for in-page hash links (Lenis-friendly).
  const handleHashClick = (href: string) => (e: React.MouseEvent) => {
    if (!href.startsWith('#')) return
    const id = href.slice(1)
    const el = typeof document !== 'undefined' ? document.getElementById(id) : null
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
      <div className="relative transition-all duration-300">
        {/* Blur layer sits behind the nav content and fades out at the bottom
            so the navbar blends seamlessly into the page — no fill, no hard edge. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 transition-opacity duration-300"
          style={{
            bottom: '-2px',
            opacity: scrolled ? 1 : 0,
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            maskImage:
              'linear-gradient(to bottom, black 0%, black 92%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, black 0%, black 92%, transparent 100%)',
          }}
        />
        <nav
          className={cn(
            'relative mx-auto flex max-w-7xl items-center justify-between transition-all duration-300 px-6',
            scrolled ? 'h-[48px]' : 'h-[48px]'
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="px-1 py-1 transition-opacity duration-200 hover:opacity-75"
          >
            <span
              className="text-[15px] font-bold tracking-tight"
              style={{ fontFamily: 'var(--font-syne)', color: 'var(--av-wordmark)' }}
            >
              avora
            </span>
          </Link>

          {/* Desktop nav links — absolutely centred */}
          <ul className="hidden md:flex items-center gap-5 absolute left-1/2 -translate-x-1/2" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                {link.href ? (
                  <Link
                    href={link.href}
                    onClick={handleHashClick(link.href)}
                    style={{ color: 'var(--av-nav-link)' }}
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-normal px-1 py-1 transition-all duration-200 hover:font-semibold"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <span
                    style={{ color: 'var(--av-nav-link)', cursor: 'pointer' }}
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-normal px-1 py-1 transition-all duration-200 hover:font-semibold"
                  >
                    {link.label}
                  </span>
                )}
              </li>
            ))}
          </ul>

          {/* Right: CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <LiquidButton
              onClick={onOpenModal}
              size="sm"
              className="hidden md:inline-flex"
              style={{ color: 'var(--av-text-1)' }}
            >
              Join waitlist
            </LiquidButton>

            {/* Mobile hamburger */}
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden rounded-xl p-2 transition-colors"
              style={{ color: 'var(--av-text-2)' }}
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
          </div>
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
            className="mx-4 mt-2 overflow-hidden rounded-2xl border shadow-2xl md:hidden"
            style={{
              backgroundColor: 'var(--av-surface)',
              borderColor: 'var(--av-border)',
              backdropFilter: 'blur(24px)',
            }}
          >
            <ul className="flex flex-col px-3 py-3 gap-0.5" role="list">
              {NAV_LINKS.map((link, i) => (
                <motion.li key={link.label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06, duration: 0.22 }}>
                  {link.href ? (
                    <Link
                      href={link.href}
                      onClick={handleHashClick(link.href)}
                      style={{ color: 'var(--av-nav-link)' }}
                      className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-normal transition-opacity duration-150 hover:opacity-80"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <span
                      style={{ color: 'var(--av-nav-link)', cursor: 'pointer' }}
                      className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-normal transition-opacity duration-150 hover:opacity-80"
                    >
                      {link.label}
                    </span>
                  )}
                </motion.li>
              ))}
            </ul>
            <div className="border-t px-4 py-3" style={{ borderColor: 'var(--av-border)' }}>
              <button
                onClick={() => { setMobileOpen(false); onOpenModal() }}
                className="btn-cta inline-flex w-full items-center justify-center gap-2 rounded-[9px] px-4 py-1.5 text-[12px] font-medium"
                style={{ transform: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'none')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
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
