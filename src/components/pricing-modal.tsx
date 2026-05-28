'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, Transition } from 'framer-motion'
import { X, Check, Zap } from 'lucide-react'
import { useTheme } from '@/lib/theme-context'

interface PricingModalProps {
  open: boolean
  onClose: () => void
  onJoinWaitlist: () => void
}

type Frequency = 'monthly' | 'yearly'
const FREQUENCIES: Frequency[] = ['monthly', 'yearly']

const SF =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif'

interface Plan {
  name: string
  info: string
  price: { monthly: number; yearly: number }
  features: string[]
  cta: string
  ctaDisabled?: boolean
  highlighted?: boolean
}

const PLANS: Plan[] = [
  {
    name: 'Starter',
    info: 'Test the engine.',
    price: { monthly: 0, yearly: 0 },
    features: [
      '7-day Avora Pro trial',
      '1 connected Meta ad account',
      'Up to 3 active campaigns',
      'Basic AI ad copy',
      'Community support',
    ],
    cta: 'Get started free',
    ctaDisabled: false,
  },
  {
    name: 'Pro',
    info: 'For solo marketers & founders.',
    price: { monthly: 49, yearly: Math.round(49 * 12 * 0.8) },
    features: [
      'Up to 5 Meta ad accounts',
      'Unlimited campaigns',
      'AI ad copy + creative variants',
      'Auto budget optimization',
      'Performance dashboard',
      'Email support',
    ],
    cta: 'Join waitlist',
    highlighted: true,
  },
  {
    name: 'Max',
    info: 'For agencies & growing teams.',
    price: { monthly: 299, yearly: Math.round(299 * 12 * 0.8) },
    features: [
      'Everything in Pro',
      'Unlimited ad accounts',
      'Multi-client workspaces',
      'White-label reports',
      'Dedicated account manager',
      'API access',
      'Priority chat support',
    ],
    cta: 'Contact sales',
  },
]

function BorderTrail({ size = 100, transition }: { size?: number; transition?: Transition }) {
  const base: Transition = { repeat: Infinity, duration: 5, ease: 'linear' }
  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
      <motion.div
        className="absolute aspect-square"
        style={{
          width: size,
          background:
            'radial-gradient(circle, rgba(91,133,255,0.9) 0%, rgba(45,84,224,0.45) 40%, transparent 70%)',
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          filter: 'blur(2px)',
        }}
        animate={{ offsetDistance: ['0%', '100%'] }}
        transition={transition ?? base}
      />
    </div>
  )
}

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
      className="mx-auto flex w-fit rounded-full p-1"
      style={{
        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)'}`,
      }}
    >
      {FREQUENCIES.map((freq) => (
        <button
          key={freq}
          onClick={() => setFrequency(freq)}
          className="relative px-5 py-1.5 text-[13px] capitalize font-medium cursor-pointer transition-colors duration-200"
          style={{
            fontFamily: SF,
            color:
              frequency === freq
                ? isDark ? '#161616' : '#ffffff'
                : isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)',
          }}
        >
          <span className="relative z-10">{freq}</span>
          {frequency === freq && (
            <motion.span
              layoutId="pricing-frequency"
              transition={{ type: 'spring', duration: 0.4 }}
              className="absolute inset-0 z-0 rounded-full"
              style={{ background: isDark ? '#ffffff' : '#1a1a1a' }}
            />
          )}
        </button>
      ))}
    </div>
  )
}

function PlanCard({
  plan,
  frequency,
  onCtaClick,
  isDark,
}: {
  plan: Plan
  frequency: Frequency
  onCtaClick: () => void
  isDark: boolean
}) {
  const price = plan.price[frequency]
  const yearlyDiscount =
    plan.price.monthly > 0
      ? Math.round(
          ((plan.price.monthly * 12 - plan.price.yearly) / (plan.price.monthly * 12)) * 100
        )
      : 0

  return (
    <div
      className="relative flex w-full flex-col overflow-hidden rounded-2xl border"
      style={{
        background: plan.highlighted
          ? isDark ? 'rgba(91,133,255,0.06)' : 'rgba(91,133,255,0.04)'
          : isDark ? '#1C1C1E' : '#F7F7F7',
        borderColor: plan.highlighted
          ? isDark ? 'rgba(91,133,255,0.35)' : 'rgba(91,133,255,0.30)'
          : isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
      }}
    >
      {plan.highlighted && <BorderTrail size={110} />}

      {/* Header */}
      <div
        className="relative border-b p-5"
        style={{
          background: plan.highlighted
            ? isDark ? 'rgba(91,133,255,0.07)' : 'rgba(91,133,255,0.05)'
            : isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.025)',
          borderColor: plan.highlighted
            ? isDark ? 'rgba(91,133,255,0.25)' : 'rgba(91,133,255,0.20)'
            : isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)',
        }}
      >
        {/* Badges */}
        <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5">
          {plan.highlighted && (
            <span
              className="flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold"
              style={{
                background: 'linear-gradient(180deg, #5B85FF 0%, #2D54E0 100%)',
                color: '#ffffff',
              }}
            >
              <Zap className="h-3 w-3 fill-current" strokeWidth={0} />
              Popular
            </span>
          )}
          {frequency === 'yearly' && yearlyDiscount > 0 && (
            <span
              className="rounded-md px-2 py-0.5 text-[11px] font-semibold"
              style={{
                background: isDark ? 'rgba(91,133,255,0.20)' : 'rgba(91,133,255,0.12)',
                color: isDark ? '#93AEFD' : '#3E6DF2',
                border: `1px solid ${isDark ? 'rgba(91,133,255,0.35)' : 'rgba(91,133,255,0.25)'}`,
              }}
            >
              {yearlyDiscount}% off
            </span>
          )}
        </div>

        <div
          className="text-[15px] font-semibold"
          style={{ fontFamily: SF, color: isDark ? '#ffffff' : '#111111' }}
        >
          {plan.name}
        </div>
        <p
          className="mt-0.5 text-[13px]"
          style={{ fontFamily: SF, color: isDark ? 'rgba(255,255,255,0.50)' : '#5A5856' }}
        >
          {plan.info}
        </p>
        <div className="mt-3 flex items-end gap-1">
          <span
            className="text-[32px] font-bold leading-none tracking-tight"
            style={{ fontFamily: SF, color: isDark ? '#ffffff' : '#111111' }}
          >
            ${price === 0 ? '0' : price.toLocaleString()}
          </span>
          {plan.price.monthly > 0 && (
            <span
              className="mb-1 text-[13px]"
              style={{ fontFamily: SF, color: isDark ? 'rgba(255,255,255,0.45)' : '#5A5856' }}
            >
              /{frequency === 'monthly' ? 'mo' : 'yr'}
            </span>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="flex-1 space-y-3 px-5 py-5">
        {plan.features.map((feature) => (
          <div
            key={feature}
            className="flex items-start gap-2.5 text-[13px]"
            style={{ fontFamily: SF, color: isDark ? 'rgba(255,255,255,0.80)' : '#5A5856' }}
          >
            <span
              className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full"
              style={{
                background: plan.highlighted
                  ? isDark ? 'rgba(91,133,255,0.18)' : 'rgba(91,133,255,0.12)'
                  : isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)',
              }}
            >
              <Check
                className="h-2.5 w-2.5"
                strokeWidth={2.8}
                style={{
                  color: plan.highlighted
                    ? isDark ? '#93AEFD' : '#3E6DF2'
                    : isDark ? 'rgba(255,255,255,0.60)' : '#5A5856',
                }}
              />
            </span>
            <span>{feature}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        className="border-t p-3"
        style={{
          borderColor: plan.highlighted
            ? isDark ? 'rgba(91,133,255,0.20)' : 'rgba(91,133,255,0.15)'
            : isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)',
        }}
      >
        <button
          onClick={onCtaClick}
          className="w-full rounded-xl py-2.5 text-[13.5px] font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          style={{
            fontFamily: SF,
            background: plan.highlighted
              ? 'linear-gradient(180deg, #5B85FF 0%, #2D54E0 100%)'
              : isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)',
            color: plan.highlighted
              ? '#ffffff'
              : isDark ? 'rgba(255,255,255,0.85)' : '#111111',
            border: plan.highlighted
              ? 'none'
              : `1px solid ${isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)'}`,
            boxShadow: plan.highlighted
              ? '0 4px 16px rgba(45,84,224,0.35), inset 0 1px 0 rgba(255,255,255,0.30)'
              : 'none',
          }}
        >
          {plan.cta}
        </button>
      </div>
    </div>
  )
}

export function PricingModal({ open, onClose, onJoinWaitlist }: PricingModalProps) {
  const [mounted, setMounted] = useState(false)
  const [frequency, setFrequency] = useState<Frequency>('monthly')
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="pricing-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/55 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            key="pricing-modal"
            initial={{ opacity: 0, scale: 0.97, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pricing-title"
            className="fixed inset-0 z-[101] flex items-start justify-center overflow-y-auto p-4"
            onClick={onClose}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative my-8 w-full max-w-5xl rounded-[24px] border p-6 md:p-10"
              style={{
                background: isDark ? '#161616' : '#FFFFFF',
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                boxShadow: isDark
                  ? '0 32px 80px -12px rgba(0,0,0,0.65)'
                  : '0 32px 80px -12px rgba(0,0,0,0.14)',
                fontFamily: SF,
              }}
            >
              {/* Close */}
              <button
                onClick={onClose}
                className={`absolute right-5 top-5 z-20 grid place-items-center rounded-lg w-8 h-8 transition-colors cursor-pointer ${
                  isDark
                    ? 'text-white/40 hover:text-white hover:bg-white/[0.06]'
                    : 'text-black/35 hover:text-black hover:bg-black/[0.06]'
                }`}
                aria-label="Close"
              >
                <X className="size-4.5" />
              </button>

              {/* Header */}
              <div className="text-center max-w-xl mx-auto">
                <h2
                  id="pricing-title"
                  className="text-[26px] md:text-[32px] font-bold tracking-tight"
                  style={{ fontFamily: SF, color: isDark ? '#ffffff' : '#111111', letterSpacing: '-0.02em' }}
                >
                  Plans that scale with you
                </h2>
                <p
                  className="mt-2.5 text-[14px] md:text-[15px] leading-relaxed"
                  style={{ color: isDark ? 'rgba(255,255,255,0.50)' : '#5A5856' }}
                >
                  Whether you&apos;re just starting out or running a full agency — Avora grows with you. No hidden costs.
                </p>
              </div>

              {/* Frequency toggle */}
              <div className="mt-7">
                <FrequencyToggle frequency={frequency} setFrequency={setFrequency} isDark={isDark} />
              </div>

              {/* Plans */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                {PLANS.map((plan) => (
                  <PlanCard
                    key={plan.name}
                    plan={plan}
                    frequency={frequency}
                    isDark={isDark}
                    onCtaClick={() => {
                      onClose()
                      onJoinWaitlist()
                    }}
                  />
                ))}
              </div>

              {/* Footer note */}
              <p
                className="mt-7 text-center text-[12.5px]"
                style={{ color: isDark ? 'rgba(255,255,255,0.40)' : 'rgba(0,0,0,0.40)' }}
              >
                All plans include a 7-day free trial. No credit card required.{' '}
                <button
                  onClick={() => { onClose(); onJoinWaitlist() }}
                  className="underline underline-offset-2 transition-colors hover:opacity-80 cursor-pointer"
                  style={{ color: isDark ? 'rgba(255,255,255,0.65)' : '#5A5856' }}
                >
                  Questions? Contact us
                </button>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
