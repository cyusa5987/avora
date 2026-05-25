'use client'

import { motion } from 'framer-motion'
import { Features11 } from '@/components/ui/features-11'

export function Features() {
  return (
    <section
      id="features"
      className="px-6 py-32"
      style={{ fontFamily: 'var(--font-inter)' }}
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mx-auto max-w-3xl text-center"
        >
          <div
            className="text-[14px] uppercase tracking-wider"
            style={{
              fontFamily: 'var(--font-fragment-mono)',
              color: 'var(--av-text-1)',
            }}
          >
            <span style={{ color: 'var(--av-secondary)' }}>[</span> FEATURES{' '}
            <span style={{ color: 'var(--av-secondary)' }}>]</span>
          </div>

          <h2
            className="mt-6 text-[40px] md:text-[56px] leading-[1.04] tracking-tight"
            style={{
              fontFamily:
                "var(--font-playfair)",
              fontWeight: 600,
              color: 'var(--av-text-1)',
            }}
          >
            Your one-stop shop<br />for Meta ads
          </h2>

          <p
            className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed"
            style={{ color: 'var(--av-text-2)' }}
          >
            Never open Ads Manager again. Avora&apos;s AI agents plan, launch
            and improve your campaigns — so you can focus on the offer.
          </p>
        </motion.div>

        <div className="mt-16">
          <Features11 />
        </div>
      </div>
    </section>
  )
}
