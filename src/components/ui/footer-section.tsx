'use client'

import React from 'react'
import type { ComponentProps, ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  )
}

const LINKS = [
  {
    label: 'Product',
    items: [
      { title: 'Features', href: '/#features' },
      { title: 'Pricing', href: '/pricing' },
      { title: 'Dashboard', href: '/dashboard' },
      { title: 'Integrations', href: '/#mcp' },
    ],
  },
  {
    label: 'Company',
    items: [
      { title: 'About', href: '/about' },
      { title: 'Blog', href: '/blog' },
      { title: 'Changelog', href: '/changelog' },
      { title: 'Brand', href: '/brand' },
    ],
  },
  {
    label: 'Legal',
    items: [
      { title: 'Privacy Policy', href: '/privacy' },
      { title: 'Terms of Service', href: '/terms' },
      { title: 'FAQs', href: '/#faq' },
      { title: 'Help', href: '/help' },
    ],
  },
]

const SOCIALS = [
  { label: 'X (Twitter)', href: '#', icon: XIcon },
  { label: 'Instagram', href: '#', icon: InstagramIcon },
  { label: 'LinkedIn', href: '#', icon: LinkedinIcon },
  { label: 'GitHub', href: '#', icon: GitHubIcon },
]

type ViewAnimationProps = {
  delay?: number
  className?: ComponentProps<typeof motion.div>['className']
  children: ReactNode
}

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion()
  if (shouldReduceMotion) return <>{children}</>
  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function Footer() {
  return (
    <footer
      className="relative w-full"
      style={{
        background: '#0E0E0E',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Subtle top glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)' }}
      />

      <div className="mx-auto max-w-6xl px-6 pt-14 pb-10">

        {/* Top row: brand + links */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <AnimatedContainer className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span
                className="text-[20px] font-bold tracking-tight text-white"
                style={{ fontFamily: 'var(--font-syne)' }}
              >
                avora
              </span>
            </Link>
            <p className="text-[13.5px] leading-relaxed max-w-[240px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
              AI-powered Meta ads that launch, test, and scale — without the manual work.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2 mt-5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid place-items-center rounded-[9px] w-8 h-8 transition-colors duration-150 hover:bg-white/10"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.55)',
                  }}
                >
                  <s.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </AnimatedContainer>

          {/* Link columns */}
          {LINKS.map((col, i) => (
            <AnimatedContainer key={col.label} delay={0.1 + i * 0.08}>
              <h3
                className="text-[11px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                {col.label}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.items.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className="text-[13.5px] transition-colors duration-150 hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.52)' }}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </AnimatedContainer>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="text-[12.5px] order-2 sm:order-1" style={{ color: 'rgba(255,255,255,0.30)' }}>
            © {new Date().getFullYear()} Avora, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-5 order-1 sm:order-2">
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-[12.5px] transition-colors duration-150 hover:text-white"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
