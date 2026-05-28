'use client'

import { motion } from 'framer-motion'
import { Link2, Target, Wand2, Rocket } from 'lucide-react'

const SF =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif'

const STEPS = [
  {
    n: '01',
    label: 'Connect',
    icon: Link2,
    title: 'Link your Meta account',
    description:
      "Connect via Meta's official OAuth flow in one click. Avora only accesses the ad accounts you choose — you can revoke access any time.",
    status: 'done' as const,
  },
  {
    n: '02',
    label: 'Brief',
    icon: Target,
    title: 'Set your goal & budget',
    description:
      'Tell the AI your campaign objective, daily budget, and target audience. No jargon, no complicated settings — plain English only.',
    status: 'done' as const,
  },
  {
    n: '03',
    label: 'Generate',
    icon: Wand2,
    title: 'AI builds your campaign',
    description:
      'Avora writes the copy, selects creatives, configures ad sets, and optimises targeting — all automatically before you even hit Launch.',
    status: 'in-progress' as const,
  },
  {
    n: '04',
    label: 'Launch',
    icon: Rocket,
    title: 'Go live in one click',
    description:
      'Review a plain-English summary of your campaign, then publish. Avora monitors performance 24/7 and auto-optimises so you never touch Ads Manager.',
    status: 'upcoming' as const,
  },
]

type Step = typeof STEPS[number]

function StepDot({ step, index }: { step: Step; index: number }) {
  const active = step.status === 'done' || step.status === 'in-progress'
  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 -top-[9px] z-10"
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.12 + 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        whileHover={{ scale: 1.25 }}
        transition={{ duration: 0.2 }}
        className="rounded-full grid place-items-center"
        style={{
          width: 18,
          height: 18,
          background: active ? 'linear-gradient(135deg, #5B85FF, #2D54E0)' : 'transparent',
          border: active ? 'none' : '2px solid rgba(255,255,255,0.18)',
          boxShadow: active ? '0 0 0 3px rgba(62,109,242,0.22)' : 'none',
        }}
      >
        <div className="rounded-full" style={{ width: 5, height: 5, background: active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.30)' }} />
      </motion.div>
    </motion.div>
  )
}

function StepCard({ step, index, isDark }: { step: Step; index: number; isDark: boolean }) {
  const Icon = step.icon
  const active = step.status === 'done' || step.status === 'in-progress'

  return (
    <motion.div
      className="relative pt-8 flex flex-col items-center text-center px-2"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <StepDot step={step} index={index} />

      {/* Step badge */}
      <span
        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold mb-3 border"
        style={{
          fontFamily: SF,
          color: active ? '#5B85FF' : (isDark ? 'rgba(255,255,255,0.38)' : '#999'),
          background: active
            ? (isDark ? 'rgba(91,133,255,0.12)' : 'rgba(91,133,255,0.08)')
            : (isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'),
          borderColor: active
            ? (isDark ? 'rgba(91,133,255,0.28)' : 'rgba(91,133,255,0.22)')
            : (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'),
        }}
      >
        {step.label}
      </span>

      {/* Icon bubble */}
      <div
        className="grid place-items-center rounded-[12px] mb-4"
        style={{
          width: 44,
          height: 44,
          background: active
            ? (isDark ? 'rgba(91,133,255,0.16)' : 'rgba(91,133,255,0.10)')
            : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'),
          border: `1px solid ${active
            ? (isDark ? 'rgba(91,133,255,0.26)' : 'rgba(91,133,255,0.20)')
            : (isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)')}`,
        }}
      >
        <Icon
          size={18}
          strokeWidth={1.8}
          style={{ color: active ? (isDark ? '#93AEFD' : '#3E6DF2') : (isDark ? 'rgba(255,255,255,0.30)' : '#bbb') }}
        />
      </div>

      {/* Title */}
      <h4
        className="text-[14.5px] font-semibold mb-2 leading-snug"
        style={{ fontFamily: SF, color: isDark ? (active ? '#ffffff' : 'rgba(255,255,255,0.55)') : (active ? '#111111' : '#999'), letterSpacing: '-0.01em' }}
      >
        {step.title}
      </h4>

      {/* Description */}
      <p
        className="text-[13px] leading-relaxed max-w-[200px]"
        style={{ fontFamily: SF, color: isDark ? 'rgba(255,255,255,0.40)' : '#7A7876' }}
      >
        {step.description}
      </p>
    </motion.div>
  )
}

export function HowItWorks({ isDark }: { isDark: boolean }) {
  return (
    <section className="w-full py-24 px-6 border-t" style={{ borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)' }}>
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.18em] mb-4"
            style={{ color: '#5B85FF', fontFamily: SF }}
          >
            Launch in minutes
          </p>
          <h2
            className="text-[32px] md:text-[46px] font-bold leading-tight"
            style={{
              fontFamily: SF,
              color: isDark ? '#ffffff' : '#111111',
              letterSpacing: '-0.025em',
            }}
          >
            From zero to live campaign<br className="hidden sm:block" /> in four steps
          </h2>
          <p
            className="mt-5 mx-auto max-w-lg text-[15px] leading-relaxed"
            style={{ fontFamily: SF, color: isDark ? 'rgba(255,255,255,0.50)' : '#5A5856' }}
          >
            No ad agency, no Ads Manager, no guesswork. Avora handles everything
            from briefing to optimisation.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div
            className="hidden sm:block absolute top-[9px] left-[12.5%] right-[12.5%] h-px pointer-events-none"
            style={{
              background: isDark
                ? 'linear-gradient(90deg, transparent, rgba(91,133,255,0.35) 20%, rgba(255,255,255,0.10) 60%, rgba(255,255,255,0.06) 100%)'
                : 'linear-gradient(90deg, transparent, rgba(91,133,255,0.25) 20%, rgba(0,0,0,0.07) 60%, rgba(0,0,0,0.04) 100%)',
            }}
          />

          {/* Steps */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-10">
            {STEPS.map((step, i) => (
              <StepCard key={step.n} step={step} index={i} isDark={isDark} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
