'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  ShoppingBag,
  Megaphone,
  ShoppingCart,
  Users,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { WaitlistModal } from '@/components/waitlist-modal'
import { PricingModal } from '@/components/pricing-modal'
import { Footer } from '@/components/ui/footer-section'
import { DashboardPreview } from '@/components/dashboard-preview'
import { FeaturesGrid } from '@/components/features-grid'
import { HowItWorks } from '@/components/how-it-works'

const SF =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif'

// ─── Suggestion chips ─────────────────────────────────────────────────────────

const SUGGESTIONS = [
  {
    icon: ShoppingBag,
    title: 'Summer sale campaign',
    subtitle: 'Seasonal offer with urgency copy',
    prompt: 'Run a summer sale campaign promoting 30% off our entire store for the next 10 days, targeting warm audiences on Instagram.',
  },
  {
    icon: Megaphone,
    title: 'Brand awareness push',
    subtitle: 'Reach new audiences on Meta',
    prompt: 'Launch a brand awareness campaign to introduce Avora to cold audiences aged 25–44 interested in e-commerce and marketing.',
  },
  {
    icon: ShoppingCart,
    title: 'Cart abandoner ads',
    subtitle: 'Re-engage people who left',
    prompt: 'Create retargeting ads for visitors who added items to cart but did not purchase in the last 14 days. Offer free shipping.',
  },
  {
    icon: Users,
    title: 'Lookalike audiences',
    subtitle: 'Clone your best customers',
    prompt: 'Build a lookalike campaign based on our top 1% customers to find new buyers similar to our highest-value segment.',
  },
]

// ─── FAQ ─────────────────────────────────────────────────────────────────────

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
    a: "Yes — you connect via Meta's official OAuth flow. Avora only touches the accounts you grant access to, and you can revoke access at any time from your Meta settings.",
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

// ─── FAQ item ─────────────────────────────────────────────────────────────────

function FaqItem({
  item,
  isOpen,
  onToggle,
}: {
  item: { q: string; a: string }
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-200"
        style={{ color: isOpen ? '#ffffff' : 'rgba(255,255,255,0.75)' }}
        aria-expanded={isOpen}
      >
        <span className="text-[15.5px] font-medium" style={{ fontFamily: SF }}>
          {item.q}
        </span>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          strokeLinejoin="round" aria-hidden className="flex-shrink-0 transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
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
            <p className="pb-5 pr-8 text-[14px]" style={{ fontFamily: SF, color: 'rgba(255,255,255,0.50)', lineHeight: 1.65 }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Campaign prompt input ────────────────────────────────────────────────────

function CampaignPromptBox({ onSubmit }: { onSubmit: () => void }) {
  const [value, setValue] = useState('')

  const handleSubmit = () => {
    onSubmit()
    setValue('')
  }

  return (
    <div
      className="relative w-full rounded-[20px] p-4"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit()
        }}
        placeholder="Describe your campaign idea..."
        rows={3}
        className="w-full resize-none bg-transparent outline-none text-[15px] leading-relaxed placeholder:transition-colors"
        style={{
          fontFamily: SF,
          color: '#ffffff',
          caretColor: '#5B85FF',
        }}
        // placeholder style via globals
      />
      {/* Bottom row */}
      <div className="flex items-center justify-between mt-3">
        <span className="text-[12px]" style={{ fontFamily: SF, color: 'rgba(255,255,255,0.28)' }}>
          ⌘↵ to launch
        </span>
        <button
          onClick={handleSubmit}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
          style={{
            background: 'linear-gradient(180deg, #5B85FF 0%, #2D54E0 100%)',
            boxShadow: '0 4px 16px rgba(45,84,224,0.40), inset 0 1px 0 rgba(255,255,255,0.30)',
          }}
        >
          Launch it
          <ArrowRight size={14} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}

// ─── Suggestion card ──────────────────────────────────────────────────────────

function SuggestionCard({
  item,
  index,
  onClick,
}: {
  item: typeof SUGGESTIONS[number]
  index: number
  onClick: () => void
}) {
  const Icon = item.icon
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2 }}
      className="text-left rounded-[16px] p-4 cursor-pointer transition-colors duration-150 w-full"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
    >
      <Icon size={18} strokeWidth={1.7} style={{ color: 'rgba(255,255,255,0.40)', marginBottom: 10 }} />
      <p className="text-[13.5px] font-semibold mb-1" style={{ fontFamily: SF, color: '#ffffff' }}>
        {item.title}
      </p>
      <p className="text-[12px]" style={{ fontFamily: SF, color: 'rgba(255,255,255,0.40)' }}>
        {item.subtitle}
      </p>
    </motion.button>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const [pricingOpen, setPricingOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#161616' }}>
      <Navbar
        onOpenModal={() => setModalOpen(true)}
        onOpenPricing={() => setPricingOpen(true)}
      />

      {/* ── Hero ── */}
      <main className="flex flex-col items-center px-6 pt-36 pb-20">

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl"
          style={{
            fontFamily: SF,
            fontWeight: 800,
            fontSize: 'clamp(44px, 7.5vw, 96px)',
            lineHeight: 1.04,
            letterSpacing: '-0.035em',
            color: '#ffffff',
          }}
        >
          The fastest way to launch Meta ads
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-lg text-center text-[16px] leading-relaxed"
          style={{ fontFamily: SF, color: 'rgba(255,255,255,0.48)' }}
        >
          Describe your campaign and let AI launch, test, and scale it —
          no Ads Manager, no manual work.
        </motion.p>

        {/* Prompt input */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 w-full max-w-2xl"
        >
          <CampaignPromptBox onSubmit={() => setModalOpen(true)} />
        </motion.div>

        {/* "Not sure where to start?" */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex items-center gap-1.5"
        >
          <Sparkles size={13} style={{ color: 'rgba(255,255,255,0.30)' }} />
          <span className="text-[13px]" style={{ fontFamily: SF, color: 'rgba(255,255,255,0.35)' }}>
            Not sure where to start?
          </span>
        </motion.div>

        {/* Suggestion cards */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">
          {SUGGESTIONS.map((s, i) => (
            <SuggestionCard
              key={s.title}
              item={s}
              index={i}
              onClick={() => setModalOpen(true)}
            />
          ))}
        </div>

      </main>

      {/* ── See Avora in action ── */}
      <section className="px-6 pb-24 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center pt-20 pb-10"
            style={{
              fontFamily: SF,
              fontWeight: 700,
              fontSize: 'clamp(28px, 4vw, 48px)',
              letterSpacing: '-0.025em',
              color: '#ffffff',
            }}
          >
            See Avora in action
          </motion.h2>
          <DashboardPreview isDark={true} />
        </div>
      </section>

      {/* ── Features, How it Works, FAQ, Bottom CTA ── */}
      <FeaturesGrid isDark={true} />

      <HowItWorks isDark={true} />

      {/* FAQ */}
      <section
        className="border-t px-6 py-24"
        id="faq"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <div className="mx-auto max-w-2xl">
          <h2
            className="text-center"
            style={{
              fontFamily: SF,
              fontWeight: 700,
              fontSize: 'clamp(24px, 3vw, 36px)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: '#ffffff',
            }}
          >
            Frequently asked questions
          </h2>
          <p
            className="mt-3 text-center text-[15px]"
            style={{ fontFamily: SF, color: 'rgba(255,255,255,0.50)' }}
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
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="border-t px-6 py-20 text-center"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <h2
          style={{
            fontFamily: SF,
            fontWeight: 700,
            fontSize: 'clamp(24px, 3vw, 36px)',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: '#ffffff',
          }}
        >
          Ready to put your ads on autopilot?
        </h2>
        <p
          className="mt-3 mx-auto max-w-md text-[15px]"
          style={{ fontFamily: SF, lineHeight: 1.5, color: 'rgba(255,255,255,0.50)' }}
        >
          Get started in minutes with a 7-day free trial.
        </p>
        <div className="mt-8 flex items-center justify-center">
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] cursor-pointer"
            style={{
              fontFamily: SF,
              background: 'linear-gradient(180deg, #5B85FF 0%, #2D54E0 100%)',
              boxShadow: '0 8px 24px rgba(45,84,224,0.38), inset 0 1px 0 rgba(255,255,255,0.30)',
            }}
          >
            Get started free
            <ArrowRight size={15} strokeWidth={2.5} />
          </button>
        </div>
        <p className="mt-4 text-[12px]" style={{ fontFamily: SF, color: 'rgba(255,255,255,0.28)' }}>
          Free 7-day trial · No credit card required ·{' '}
          <Link href="/dashboard" className="underline underline-offset-2 hover:opacity-70 transition-opacity" style={{ color: 'inherit' }}>
            Preview dashboard →
          </Link>
        </p>
      </section>

      <Footer />
      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <PricingModal
        open={pricingOpen}
        onClose={() => setPricingOpen(false)}
        onJoinWaitlist={() => { setPricingOpen(false); setModalOpen(true) }}
      />
    </div>
  )
}
