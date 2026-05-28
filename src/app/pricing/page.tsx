'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/ui/footer-section'
import { WaitlistModal } from '@/components/waitlist-modal'

const SF =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif'

type Frequency = 'monthly' | 'yearly'

interface Plan {
  name: string
  tagline: string
  price: { monthly: number | null; yearly: number | null }
  features: string[]
  cta: string
  highlighted?: boolean
  badge?: string
}

const PLANS: Plan[] = [
  {
    name: 'Starter',
    tagline: 'Test the engine risk-free.',
    price: { monthly: 0, yearly: 0 },
    features: [
      '7-day Avora Pro trial included',
      '1 connected Meta ad account',
      'Up to 3 active campaigns',
      'Basic AI ad copy generation',
      'Community support',
    ],
    cta: 'Get started free',
  },
  {
    name: 'Pro',
    tagline: 'For solo marketers & founders.',
    price: { monthly: 49, yearly: Math.round(49 * 12 * 0.8) },
    features: [
      'Up to 5 Meta ad accounts',
      'Unlimited campaigns',
      'AI ad copy + creative variants',
      'Auto budget optimisation',
      'Real-time performance dashboard',
      'Priority email support',
    ],
    cta: 'Join waitlist',
    highlighted: true,
    badge: 'Most popular',
  },
  {
    name: 'Max',
    tagline: 'For agencies & growing teams.',
    price: { monthly: 299, yearly: Math.round(299 * 12 * 0.8) },
    features: [
      'Everything in Pro',
      'Unlimited ad accounts',
      'Multi-client workspaces',
      'White-label PDF reports',
      'Dedicated account manager',
      'API access',
      'Priority chat support',
    ],
    cta: 'Contact sales',
  },
]

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

function FrequencyToggle({
  frequency,
  setFrequency,
  isDark,
}: {
  frequency: Frequency
  setFrequency: (f: Frequency) => void
  isDark: boolean
}) {
  return (
    <div
      className="inline-flex rounded-full p-1"
      style={{
        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)'}`,
        fontFamily: SF,
      }}
    >
      {(['monthly', 'yearly'] as Frequency[]).map((freq) => (
        <button
          key={freq}
          onClick={() => setFrequency(freq)}
          className="relative px-5 py-1.5 text-[13px] capitalize font-medium cursor-pointer transition-colors duration-200 rounded-full"
          style={{
            color:
              frequency === freq
                ? isDark ? '#ffffff' : '#111111'
                : isDark ? 'rgba(255,255,255,0.50)' : 'rgba(0,0,0,0.45)',
          }}
        >
          <span className="relative z-10">{freq}</span>
          {frequency === freq && (
            <motion.span
              layoutId="pricing-freq-pill"
              transition={{ type: 'spring', duration: 0.38 }}
              className="absolute inset-0 z-0 rounded-full"
              style={{
                background: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)',
              }}
            />
          )}
          {freq === 'yearly' && (
            <span
              className="absolute -top-2.5 -right-1 rounded-full px-1.5 py-px text-[9.5px] font-semibold"
              style={{ background: '#2D54E0', color: '#fff' }}
            >
              −20%
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

function PlanCard({
  plan,
  frequency,
  isDark,
  onCta,
}: {
  plan: Plan
  frequency: Frequency
  isDark: boolean
  onCta: () => void
}) {
  const price = plan.price[frequency]
  const isHighlighted = !!plan.highlighted
  const isFree = price === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col rounded-[20px] border overflow-hidden"
      style={{
        background: isHighlighted
          ? isDark ? 'rgba(91,133,255,0.06)' : 'rgba(91,133,255,0.04)'
          : isDark ? '#1A1A1A' : '#FFFFFF',
        borderColor: isHighlighted
          ? isDark ? 'rgba(91,133,255,0.40)' : 'rgba(91,133,255,0.30)'
          : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
        boxShadow: isHighlighted
          ? isDark
            ? '0 0 0 1px rgba(91,133,255,0.20) inset'
            : '0 0 0 1px rgba(91,133,255,0.15) inset, 0 8px 32px rgba(91,133,255,0.08)'
          : 'none',
      }}
    >
      {/* Popular badge */}
      {plan.badge && (
        <div className="absolute top-4 right-4 z-10">
          <span
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white"
            style={{
              background: 'linear-gradient(180deg, #5B85FF 0%, #2D54E0 100%)',
              boxShadow: '0 2px 8px rgba(45,84,224,0.35)',
            }}
          >
            <Zap className="h-3 w-3 fill-current" strokeWidth={0} />
            {plan.badge}
          </span>
        </div>
      )}

      {/* Header */}
      <div
        className="border-b p-6"
        style={{
          borderColor: isHighlighted
            ? isDark ? 'rgba(91,133,255,0.18)' : 'rgba(91,133,255,0.14)'
            : isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)',
          background: isHighlighted
            ? isDark ? 'rgba(91,133,255,0.05)' : 'rgba(91,133,255,0.03)'
            : 'transparent',
        }}
      >
        <h3
          className="text-[16px] font-semibold"
          style={{ fontFamily: SF, color: isDark ? '#ffffff' : '#111111' }}
        >
          {plan.name}
        </h3>
        <p
          className="mt-0.5 text-[13px]"
          style={{ fontFamily: SF, color: isDark ? 'rgba(255,255,255,0.48)' : '#5A5856' }}
        >
          {plan.tagline}
        </p>
        <div className="mt-4 flex items-end gap-1.5">
          <span
            className="text-[38px] font-bold leading-none tracking-tight"
            style={{ fontFamily: SF, color: isDark ? '#ffffff' : '#111111' }}
          >
            {isFree ? 'Free' : `$${price?.toLocaleString()}`}
          </span>
          {!isFree && (
            <span
              className="mb-1.5 text-[13px]"
              style={{ fontFamily: SF, color: isDark ? 'rgba(255,255,255,0.40)' : '#5A5856' }}
            >
              /{frequency === 'monthly' ? 'mo' : 'yr'}
            </span>
          )}
        </div>
        {frequency === 'yearly' && !isFree && (
          <p
            className="mt-1 text-[12px]"
            style={{ color: isHighlighted ? (isDark ? '#93AEFD' : '#3E6DF2') : isDark ? 'rgba(255,255,255,0.40)' : '#5A5856' }}
          >
            Billed annually — save ${plan.price.monthly! * 12 - price!} this year
          </p>
        )}
      </div>

      {/* Features */}
      <div className="flex-1 p-6 space-y-3.5">
        {plan.features.map((feat) => (
          <div key={feat} className="flex items-start gap-3">
            <span
              className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
              style={{
                background: isHighlighted
                  ? isDark ? 'rgba(91,133,255,0.20)' : 'rgba(91,133,255,0.12)'
                  : isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)',
              }}
            >
              <Check
                className="h-2.5 w-2.5"
                strokeWidth={2.8}
                style={{
                  color: isHighlighted
                    ? isDark ? '#93AEFD' : '#2D54E0'
                    : isDark ? 'rgba(255,255,255,0.55)' : '#5A5856',
                }}
              />
            </span>
            <span
              className="text-[13.5px]"
              style={{ fontFamily: SF, color: isDark ? 'rgba(255,255,255,0.78)' : '#5A5856' }}
            >
              {feat}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        className="border-t p-4"
        style={{
          borderColor: isHighlighted
            ? isDark ? 'rgba(91,133,255,0.18)' : 'rgba(91,133,255,0.14)'
            : isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)',
        }}
      >
        <button
          onClick={onCta}
          className="group w-full rounded-[11px] py-2.5 text-[13.5px] font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer inline-flex items-center justify-center gap-2"
          style={{
            fontFamily: SF,
            background: isHighlighted
              ? 'linear-gradient(180deg, #5B85FF 0%, #2D54E0 100%)'
              : isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)',
            color: isHighlighted
              ? '#ffffff'
              : isDark ? 'rgba(255,255,255,0.85)' : '#111111',
            border: isHighlighted ? 'none' : `1px solid ${isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)'}`,
            boxShadow: isHighlighted
              ? '0 4px 14px rgba(45,84,224,0.38), inset 0 1px 0 rgba(255,255,255,0.28)'
              : 'none',
          }}
        >
          {plan.cta}
          <ArrowRight
            size={14}
            strokeWidth={2.2}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </motion.div>
  )
}

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
    <div
      className="border-b"
      style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
        aria-expanded={isOpen}
        style={{ fontFamily: SF }}
      >
        <span
          className="text-[15px] font-medium"
          style={{ color: isDark ? 'rgba(255,255,255,0.88)' : '#111111' }}
        >
          {item.q}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="flex-shrink-0 transition-transform duration-300"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            color: isDark ? 'rgba(255,255,255,0.45)' : '#5A5856',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p
          className="pb-5 pr-8 text-[14px] leading-relaxed"
          style={{ fontFamily: SF, color: isDark ? 'rgba(255,255,255,0.52)' : '#5A5856' }}
        >
          {item.a}
        </p>
      </motion.div>
    </div>
  )
}

export default function PricingPage() {
  const [frequency, setFrequency] = useState<Frequency>('monthly')
  const [modalOpen, setModalOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const isDark = true

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: isDark ? '#161616' : '#F5F5F5', fontFamily: SF }}
    >
      <Navbar onOpenModal={() => setModalOpen(true)} />

      <main className="px-6 pt-32 pb-24 mx-auto max-w-5xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h1
            className="text-[36px] md:text-[52px] font-bold tracking-tight"
            style={{ color: isDark ? '#ffffff' : '#111111', letterSpacing: '-0.025em' }}
          >
            Simple, transparent pricing
          </h1>
          <p
            className="mt-4 mx-auto max-w-lg text-[15px] md:text-[16px] leading-relaxed"
            style={{ color: isDark ? 'rgba(255,255,255,0.50)' : '#5A5856' }}
          >
            Whether you're testing the waters or scaling an agency — Avora has a plan for you.
            All plans include a 7-day free trial.
          </p>
          <div className="mt-7 flex justify-center">
            <FrequencyToggle
              frequency={frequency}
              setFrequency={setFrequency}
              isDark={isDark}
            />
          </div>
        </motion.div>

        {/* Plan cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.name}
              plan={plan}
              frequency={frequency}
              isDark={isDark}
              onCta={() => setModalOpen(true)}
            />
          ))}
        </div>

        {/* Compare note */}
        <p
          className="mt-6 text-center text-[12.5px]"
          style={{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.38)' }}
        >
          Need a custom plan?{' '}
          <button
            onClick={() => setModalOpen(true)}
            className="underline underline-offset-2 hover:opacity-70 transition-opacity cursor-pointer"
            style={{ color: isDark ? 'rgba(255,255,255,0.55)' : '#5A5856' }}
          >
            Contact us
          </button>
        </p>

        {/* FAQ */}
        <section className="mt-24">
          <h2
            className="text-center text-[26px] md:text-[32px] font-bold tracking-tight"
            style={{ color: isDark ? '#ffffff' : '#111111', letterSpacing: '-0.02em' }}
          >
            Frequently asked questions
          </h2>
          <div className="mt-10 max-w-2xl mx-auto">
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
        </section>

        {/* Bottom CTA */}
        <section className="mt-20 text-center">
          <div
            className="rounded-[20px] border p-10 md:p-14"
            style={{
              background: isDark ? '#1A1A1A' : '#FFFFFF',
              borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
            }}
          >
            <h2
              className="text-[24px] md:text-[30px] font-bold tracking-tight"
              style={{ color: isDark ? '#ffffff' : '#111111', letterSpacing: '-0.02em' }}
            >
              Ready to put your ads on autopilot?
            </h2>
            <p
              className="mt-3 mx-auto max-w-sm text-[14px] leading-relaxed"
              style={{ color: isDark ? 'rgba(255,255,255,0.50)' : '#5A5856' }}
            >
              Start your 7-day free trial today. No credit card required.
            </p>
            <div className="mt-7 flex items-center justify-center gap-3">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-3 rounded-full text-[13.5px] font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] cursor-pointer"
                style={{
                  height: 46,
                  paddingLeft: 22,
                  paddingRight: 6,
                  background: 'linear-gradient(180deg, #5B85FF 0%, #2D54E0 100%)',
                  boxShadow: '0 8px 24px rgba(45,84,224,0.38), inset 0 1px 0 rgba(255,255,255,0.35)',
                }}
              >
                Get started free
                <span
                  className="grid place-items-center rounded-full bg-white flex-shrink-0"
                  style={{ width: 34, height: 34 }}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2D54E0" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </button>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full px-5 text-[13.5px] font-medium transition-all duration-200 hover:scale-[1.01] cursor-pointer"
                style={{
                  height: 46,
                  background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)',
                  color: '#5A5856',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.09)'}`,
                }}
              >
                Learn more
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />

    </div>
  )
}
