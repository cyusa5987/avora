'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

function PaperPlaneIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4L2 9.5l7.5 3L13 21z"/>
      <path d="M9.5 12.5L20 4"/>
    </svg>
  )
}

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: null },
  { label: 'MCP', href: '#mcp' },
]

interface NavbarProps {
  onOpenModal: () => void
}

export function Navbar({ onOpenModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div
        className="transition-all duration-300 pt-5"
        style={scrolled ? {
          backgroundColor: 'rgba(22,22,22,0.55)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        } : {}}
      >
        <nav
          className={cn(
            'relative mx-auto flex max-w-7xl items-center justify-between transition-all duration-300 px-10',
            scrolled ? 'h-[56px]' : 'h-[52px]'
          )}
        >
          {/* Wordmark */}
          <Link
            href="/"
            style={{ fontFamily: 'var(--font-syne)', color: 'var(--av-wordmark)' }}
            className="ml-24 text-[16px] font-bold tracking-tight rounded-[8px] px-2.5 py-1 transition-all duration-200 hover:bg-white/[0.10] hover:text-white"
          >
            avora
          </Link>

          {/* Desktop nav links — absolutely centred */}
          <ul className="hidden md:flex items-center gap-5 absolute left-1/2 -translate-x-1/2" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                {link.href ? (
                  <Link
                    href={link.href}
                    style={{ color: 'var(--av-nav-link)' }}
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-normal rounded-[8px] px-3 py-1 transition-all duration-200 hover:bg-white/[0.10] hover:text-white"
                  >
                    {link.label}
                    {link.label === 'MCP' && (
                      <span
                        className="rounded-full px-1.5 py-[2px] text-[9px] font-semibold uppercase tracking-wide leading-none"
                        style={{
                          background: 'linear-gradient(to bottom, #3D7DFF 0%, #0059FF 100%)',
                          color: '#fff',
                        }}
                      >
                        new
                      </span>
                    )}
                  </Link>
                ) : (
                  <span
                    style={{ color: 'var(--av-nav-link)', cursor: 'pointer' }}
                    className="inline-flex items-center gap-1.5 text-[13.5px] font-normal rounded-[8px] px-3 py-1 transition-all duration-200 hover:bg-white/[0.10] hover:text-white"
                  >
                    {link.label}
                  </span>
                )}
              </li>
            ))}
          </ul>

          {/* Right: CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              onClick={onOpenModal}
              className="btn-cta hidden md:inline-flex items-center gap-1.5 rounded-[9px] px-3.5 py-1.5 text-[12.5px] font-medium"
            >
              Join waitlist
              <PaperPlaneIcon />
            </motion.button>

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
                      onClick={() => setMobileOpen(false)}
                      style={{ color: 'var(--av-nav-link)' }}
                      className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-normal transition-opacity duration-150 hover:opacity-80"
                    >
                      {link.label}
                      {link.label === 'MCP' && (
                        <span
                          className="rounded-full px-1.5 py-[2px] text-[9px] font-semibold uppercase tracking-wide leading-none"
                          style={{
                            background: 'linear-gradient(to bottom, #3D7DFF 0%, #0059FF 100%)',
                            color: '#fff',
                          }}
                        >
                          new
                        </span>
                      )}
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
