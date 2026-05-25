'use client'

import { motion } from 'framer-motion'
import { Users, Sparkles, Building2, CheckCircle2, XCircle, type LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import * as PricingCard from '@/components/ui/pricing-card'

interface Plan {
  name: string
  icon: LucideIcon
  badge: string
  price: string
  originalPrice: string
  features: string[]
  lockedFeatures: string[]
  highlighted: boolean
}

const PLANS: Plan[] = [
  {
    name: 'Starter',
    icon: Users,
    badge: 'For Individuals',
    price: '$49',
    originalPrice: '$69',
    features: [
      '1 ad account connected',
      'Up to 3 active campaigns',
      'AI creative generation',
      'Hourly optimisation',
    ],
    lockedFeatures: [
      'Unlimited campaigns',
      'Advanced budget reallocation',
      'Priority support',
    ],
    highlighted: false,
  },
  {
    name: 'Pro',
    icon: Sparkles,
    badge: 'Most Popular',
    price: '$99',
    originalPrice: '$149',
    features: [
      '3 ad accounts connected',
      'Unlimited campaigns',
      'Advanced budget reallocation',
      'A/B testing automation',
      'Priority support',
    ],
    lockedFeatures: [
      'Multi-account dashboard',
      'Team seats',
      'Dedicated success manager',
    ],
    highlighted: true,
  },
  {
    name: 'Business',
    icon: Building2,
    badge: 'For Agencies',
    price: '$249',
    originalPrice: '$349',
    features: [
      '10 ad accounts connected',
      'Multi-account dashboard',
      'Team seats',
      'Dedicated success manager',
      'Custom integrations',
    ],
    lockedFeatures: [],
    highlighted: false,
  },
]

interface PricingProps {
  onGetStarted: () => void
}

export function Pricing({ onGetStarted }: PricingProps) {
  return (
    <section id="pricing" className="px-6 py-32" style={{ fontFamily: 'var(--font-inter)' }}>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-16"
        >
          <div className="text-center text-[14px] uppercase tracking-wider" style={{ fontFamily: 'var(--font-fragment-mono)', color: 'var(--av-text-1)' }}>
            <span style={{ color: 'var(--av-secondary)' }}>[</span> PRICING <span style={{ color: 'var(--av-secondary)' }}>]</span>
          </div>
          <h2 className="mt-7 text-[40px] md:text-[52px] font-bold leading-[1.05] tracking-tight" style={{ color: 'var(--av-text-1)' }}>
            Pricing that scales<br />with you
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col items-stretch justify-center gap-6 md:flex-row md:items-start">
          {PLANS.map((plan, i) => {
            const Icon = plan.icon
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.08 }}
                className="flex justify-center"
              >
                <PricingCard.Card
                  className={cn(
                    plan.highlighted && 'border-[#0059FF]/60 shadow-[0_0_60px_rgba(0,89,255,0.22)]',
                  )}
                >
                  <PricingCard.Header>
                    <PricingCard.Plan>
                      <PricingCard.PlanName>
                        <Icon aria-hidden="true" />
                        <span className="text-muted-foreground">{plan.name}</span>
                      </PricingCard.PlanName>
                      <PricingCard.Badge
                        className={cn(plan.highlighted && 'border-[#0059FF]/60 text-[#5b8cff]')}
                      >
                        {plan.badge}
                      </PricingCard.Badge>
                    </PricingCard.Plan>
                    <PricingCard.Price>
                      <PricingCard.MainPrice>{plan.price}</PricingCard.MainPrice>
                      <PricingCard.Period>/ month</PricingCard.Period>
                      <PricingCard.OriginalPrice className="ml-auto">
                        {plan.originalPrice}
                      </PricingCard.OriginalPrice>
                    </PricingCard.Price>
                    {plan.highlighted ? (
                      <Button
                        onClick={onGetStarted}
                        className="btn-blue w-full font-semibold text-white"
                      >
                        Get started
                      </Button>
                    ) : (
                      <Button
                        onClick={onGetStarted}
                        variant="outline"
                        className="w-full font-semibold"
                      >
                        Get started
                      </Button>
                    )}
                  </PricingCard.Header>
                  <PricingCard.Body>
                    <PricingCard.List>
                      {plan.features.map((item) => (
                        <PricingCard.ListItem key={item}>
                          <span className="mt-0.5">
                            <CheckCircle2 className="h-4 w-4 text-[#5b8cff]" aria-hidden="true" />
                          </span>
                          <span>{item}</span>
                        </PricingCard.ListItem>
                      ))}
                    </PricingCard.List>
                    {plan.lockedFeatures.length > 0 && (
                      <>
                        <PricingCard.Separator>Upgrade for</PricingCard.Separator>
                        <PricingCard.List>
                          {plan.lockedFeatures.map((item) => (
                            <PricingCard.ListItem key={item} className="opacity-70">
                              <span className="mt-0.5">
                                <XCircle className="text-destructive h-4 w-4" aria-hidden="true" />
                              </span>
                              <span>{item}</span>
                            </PricingCard.ListItem>
                          ))}
                        </PricingCard.List>
                      </>
                    )}
                  </PricingCard.Body>
                </PricingCard.Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
