'use client'

import { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { WaitlistModal } from '@/components/waitlist-modal'

const FlickeringGrid = dynamic(
  () => import('@/components/flickering-grid').then((m) => m.FlickeringGrid),
  { ssr: false }
)

function PaperPlaneIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 4L2 9.5l7.5 3L13 21z"/>
      <path d="M9.5 12.5L20 4"/>
    </svg>
  )
}

const FAQS = [
  { q: 'How does Avora optimise my campaigns?', a: 'Avora monitors your campaign metrics hourly and uses AI to reallocate budget toward top-performing ad sets, pause underperformers, and refresh creative — all automatically.' },
  { q: 'Which ad platforms does Avora support?', a: 'Avora currently supports Meta Ads (Facebook & Instagram). Google Ads and TikTok Ads are on the roadmap and coming soon.' },
  { q: 'How long does it take to set up?', a: 'Most users are live within 10 minutes. Connect your Meta account, describe your offer, and Avora builds your first campaign structure immediately.' },
  { q: 'Is there a free trial?', a: "We're currently in early access. Join the waitlist and we'll reach out with trial access as spots open up." },
  { q: 'Can I still make changes manually?', a: 'Yes. Avora gives you full visibility and control. You can override any AI decision, adjust budgets manually, or pause automation at any time.' },
]

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const [openFaq,   setOpenFaq]   = useState<number | null>(null)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const heroRef = useRef<HTMLElement>(null)
  const [pulses, setPulses] = useState<Array<{ id: number; x: number; y: number }>>([])

  const firePulse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const hr = heroRef.current?.getBoundingClientRect()
    if (!hr) { setModalOpen(true); return }
    const br = e.currentTarget.getBoundingClientRect()
    const id = Date.now()
    setPulses(p => [...p, { id, x: br.left - hr.left + br.width / 2, y: br.top - hr.top + br.height / 2 }])
    setTimeout(() => setPulses(p => p.filter(q => q.id !== id)), 1400)
    setModalOpen(true)
  }

  return (
    <>
      {/* Site-wide flickering grid — fixed behind every section */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <FlickeringGrid
          squareSize={3}
          gridGap={7}
          flickerChance={0.45}
          color="rgb(255,255,255)"
          maxOpacity={0.32}
        />
      </div>

      <Navbar onOpenModal={() => setModalOpen(true)} />

      <main>
        {/* ── Hero ── */}
        <section
          ref={heroRef}
          className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-28 pb-24 text-center overflow-hidden"
        >
          {pulses.map(pulse => (
            <div key={pulse.id}>
              <motion.div className="pointer-events-none absolute rounded-full"
                style={{ left: pulse.x, top: pulse.y, x: '-50%', y: '-50%', border: '1.5px solid rgba(249,115,22,0.55)' }}
                initial={{ width: 10, height: 10, opacity: 1 }}
                animate={{ width: 340, height: 340, opacity: 0 }}
                transition={{ duration: 1.1, ease: [0.12, 0.8, 0.3, 1] }} />
              <motion.div className="pointer-events-none absolute rounded-full"
                style={{ left: pulse.x, top: pulse.y, x: '-50%', y: '-50%', border: '1px solid rgba(249,115,22,0.28)' }}
                initial={{ width: 10, height: 10, opacity: 1 }}
                animate={{ width: 210, height: 210, opacity: 0 }}
                transition={{ duration: 0.85, ease: [0.12, 0.8, 0.3, 1], delay: 0.1 }} />
            </div>
          ))}

          <h1
            style={{
              fontFamily: "'Canela Light', 'Canela', 'Playfair Display', Georgia, serif",
              fontWeight: 300,
              color: 'var(--av-text-1)',
            }}
            className="text-5xl md:text-7xl leading-[1.1] max-w-3xl"
          >
            Meta ads that run<br />on{' '}
            <em
              style={{
                fontStyle: 'italic',
                background: 'linear-gradient(to bottom, #fb923c 0%, #f97316 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              autopilot.
            </em>
          </h1>

          <button
            onClick={firePulse}
            style={{ fontFamily: 'var(--font-albert-sans)' }}
            className="btn-cta mt-12 inline-flex items-center gap-2.5 rounded-[11px] px-7 py-3.5 text-[16px] font-medium"
          >
            Join waitlist
            <PaperPlaneIcon />
          </button>

        </section>

        {/* ── FAQs (2-column layout) ── */}
        <section className="px-6 pb-36 pt-24" style={{ fontFamily: 'var(--font-inter)' }}>
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14">

            {/* LEFT — header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="lg:sticky lg:top-32 h-fit"
            >
              <div
                className="text-[15px] uppercase tracking-wider"
                style={{ color: 'var(--av-text-1)', fontFamily: 'var(--font-fragment-mono)' }}
              >
                // FAQ
              </div>
            </motion.div>

            {/* RIGHT — FAQ list */}
            <div className="flex flex-col gap-3">
              {FAQS.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.06 }}
                >
                  <div
                    className="rounded-xl overflow-hidden"
                    style={{ background: 'var(--av-surface)', border: '1px solid var(--av-border)' }}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-5 py-5 text-left transition-colors hover:opacity-90"
                    >
                      <span className="text-[14.5px] font-medium pr-4" style={{ color: 'var(--av-text-1)' }}>
                        {faq.q}
                      </span>
                      <motion.span
                        animate={{ rotate: openFaq === i ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[20px] flex-shrink-0 inline-block origin-center leading-none"
                        style={{ color: 'var(--av-text-2)' }}
                      >
                        +
                      </motion.span>
                    </button>
                    <AnimatePresence initial={false}>
                      {openFaq === i && (
                        <motion.div
                          key="body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                          style={{ borderTop: '1px solid var(--av-border)' }}
                        >
                          <p
                            className="px-5 pb-5 pt-3.5 text-[13.5px] leading-relaxed"
                            style={{ color: 'var(--av-text-2)' }}
                          >
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="px-6 py-10" style={{ borderTop: '1px solid var(--av-border)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span style={{ fontFamily: 'var(--font-syne)', color: 'var(--av-wordmark)' }} className="text-[14px] font-bold tracking-tight">
            avora
          </span>

          <p className="text-[12px]" style={{ color: 'var(--av-text-2)' }}>
            © {new Date().getFullYear()} Avora. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            {['Privacy', 'Terms', 'Contact'].map((label) => (
              <button
                key={label}
                className="text-[12px] transition-opacity duration-150 hover:opacity-100 opacity-60"
                style={{ color: 'var(--av-text-2)' }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </footer>

      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
