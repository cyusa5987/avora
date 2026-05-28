'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { WaitlistModal } from '@/components/waitlist-modal'
import { PricingModal } from '@/components/pricing-modal'
import { Footer } from '@/components/ui/footer-section'
import { DashboardPreview } from '@/components/dashboard-preview'
import { FeaturesGrid } from '@/components/features-grid'
import { HowItWorks } from '@/components/how-it-works'
import { useTheme } from '@/lib/theme-context'

const FAQS = [
  {
    q: 'What is Avora?',
    a: 'Avora is an AI-powered Meta ads platform that launches, tests, and scales your campaigns automatically — so you can run paid ads without the day-to-day grind.',
  },
  {
    q: 'How does the AI optimization work?',
    a: 'Avora watches every campaign in real time, redistributes budget toward the best-performing creatives and audiences, and pauses what underperforms. You get higher ROAS without manually tweaking each ad set.',
  },
  {
    q: 'Which platforms do you support?',
    a: 'Right now Avora runs ads across Meta (Facebook & Instagram). Google, TikTok, and LinkedIn are on the roadmap and ship to Pro & Max plans first.',
  },
  {
    q: 'Do I need to give Avora access to my ad account?',
    a: 'Yes — you connect via Meta\'s official OAuth flow. Avora only touches the accounts you grant access to, and you can revoke access at any time from your Meta settings.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Every paid plan includes a 7-day free trial. No credit card required to start, and you can cancel anytime before the trial ends.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Plans are monthly with no long-term contracts. Cancel in one click from your dashboard and you keep access until the end of the billing period.',
  },
]

function FaqItem({
  item,
  isOpen,
  onToggle,
  isDark,
}: {
  item: { q: string; a: string }
  isOpen: boolean
  onToggle: () => void
  isDark: boolean
}) {
  return (
    <div className="border-b" style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-200"
        style={{ color: isOpen ? (isDark ? '#ffffff' : '#111111') : (isDark ? 'rgba(255,255,255,0.85)' : '#5A5856') }}
        aria-expanded={isOpen}
      >
        <span className="text-[15.5px] font-medium" style={{ fontFamily: SF_FONT_STACK }}>
          {item.q}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="flex-shrink-0 transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-8 text-[14px]" style={{ fontFamily: SF_FONT_STACK, color: isDark ? 'rgba(255,255,255,0.55)' : '#5A5856', lineHeight: 1.6 }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const SF_FONT_STACK =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif'

const ACCENT = '#3E6DF2'

function PrimaryCTA({ children, onClick }: { children: React.ReactNode; onClick?: () => void; isDark?: boolean }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-3 rounded-full text-[13.5px] font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] cursor-pointer"
      style={{
        height: 46,
        paddingLeft: 22,
        paddingRight: 6,
        background: 'linear-gradient(180deg, #5B85FF 0%, #2D54E0 100%)',
        boxShadow:
          '0 8px 24px rgba(45,84,224,0.38), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.12)',
      }}
    >
      {children}
      <span
        className="grid place-items-center rounded-full bg-white flex-shrink-0"
        style={{ width: 34, height: 34 }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2D54E0" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polyline points="9 18 15 12 9 6" />
        </svg>

      </span>
    </button>
  )
}

function SecondaryCTA({ children, onClick, isDark }: { children: React.ReactNode; onClick?: () => void; isDark: boolean }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-2xl px-5 text-[13.5px] font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] cursor-pointer"
      style={{
        height: 46,
        background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)',
        color: '#5A5856',
      }}
    >
      {children}
    </button>
  )
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const [pricingOpen, setPricingOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: isDark ? '#161616' : '#F5F5F5' }}
    >
      <Navbar
        onOpenModal={() => setModalOpen(true)}
        onOpenPricing={() => setPricingOpen(true)}
      />
      <main className="pt-48 min-h-screen flex flex-col items-center px-6">
        <h1
          className="max-w-3xl text-center"
          style={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontWeight: 400,
            fontSize: 'clamp(36px, 5vw, 68px)',
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
            color: isDark ? '#ffffff' : '#111111',
          }}
        >
          Your Meta ads,{' '}
          <span style={{ color: ACCENT, fontStyle: 'italic' }}>on autopilot.</span>
        </h1>

        <p
          className="mt-6 max-w-lg text-center"
          style={{
            fontFamily: SF_FONT_STACK,
            fontWeight: 400,
            fontSize: 'clamp(14px, 1.1vw, 16px)',
            lineHeight: 1.6,
            color: isDark ? 'rgba(255,255,255,0.55)' : '#5A5856',
          }}
        >
          Connect your Meta account and let AI launch, test and scale every
          campaign — so you can grow without living inside Ads Manager.
        </p>

        <div className="mt-8 flex justify-center">
          <PrimaryCTA onClick={() => setModalOpen(true)} isDark={isDark}>Get started</PrimaryCTA>
        </div>

        <p
          className="mt-4 text-center"
          style={{
            fontFamily: SF_FONT_STACK,
            fontWeight: 400,
            fontSize: '12px',
            color: isDark ? 'rgba(255,255,255,0.32)' : '#5A5856',
          }}
        >
          Free 7-day trial · No credit card required ·{' '}
          <Link
            href="/dashboard"
            className="underline underline-offset-2 hover:opacity-70 transition-opacity"
            style={{ color: 'inherit' }}
          >
            Preview dashboard →
          </Link>
        </p>

        <div className="mt-16 w-full max-w-[1280px] px-2">
          <DashboardPreview isDark={isDark} />
        </div>
      </main>

      <FeaturesGrid isDark={isDark} />

      <HowItWorks isDark={isDark} />

      <section className="border-t px-6 py-24" id="faq" style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}>
        <div className="mx-auto max-w-2xl">
          <h2
            className="text-center"
            style={{
              fontFamily: SF_FONT_STACK,
              fontWeight: 700,
              fontSize: 'clamp(24px, 3vw, 36px)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: isDark ? '#ffffff' : '#111111',
            }}
          >
            Frequently asked questions
          </h2>
          <p
            className="mt-3 text-center"
            style={{
              fontFamily: SF_FONT_STACK,
              fontWeight: 400,
              fontSize: '15px',
              color: isDark ? 'rgba(255,255,255,0.55)' : '#5A5856',
            }}
          >
            Everything you need to know about running Avora.
          </p>
          <div className="mt-10">
            {FAQS.map((item, i) => (
              <FaqItem
                key={item.q}
                item={item}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                isDark={isDark}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t px-6 py-20 text-center" style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}>
        <h2
          style={{
            fontFamily: SF_FONT_STACK,
            fontWeight: 700,
            fontSize: 'clamp(24px, 3vw, 36px)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: isDark ? '#ffffff' : '#111111',
          }}
        >
          Ready to put your ads on autopilot?
        </h2>
        <p
          className="mt-3 mx-auto max-w-md"
          style={{
            fontFamily: SF_FONT_STACK,
            fontWeight: 400,
            fontSize: '15px',
            lineHeight: 1.5,
            color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.52)',
          }}
        >
          Get started in minutes with a 7-day free trial.
        </p>
        <div className="mt-8 flex items-center justify-center">
          <PrimaryCTA onClick={() => setModalOpen(true)} isDark={isDark}>Get started free</PrimaryCTA>
        </div>
      </section>

      <Footer />
      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <PricingModal
        open={pricingOpen}
        onClose={() => setPricingOpen(false)}
        onJoinWaitlist={() => { setPricingOpen(false); setModalOpen(true) }}
      />

      {/* Light / dark toggle */}
      <motion.button
        onClick={toggle}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-6 right-6 z-50 grid place-items-center rounded-full w-10 h-10 cursor-pointer transition-colors duration-200"
        style={{
          background: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)',
          border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.10)',
          backdropFilter: 'blur(12px)',
          color: isDark ? 'rgba(255,255,255,0.70)' : 'rgba(0,0,0,0.60)',
        }}
        aria-label="Toggle light/dark mode"
      >
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
      </motion.button>
    </div>
  )
}
