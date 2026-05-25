'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { WaitlistModal } from '@/components/waitlist-modal'

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Navbar onOpenModal={() => setModalOpen(true)} />

      <main className="flex min-h-screen flex-col items-center justify-start pt-36 px-6 text-center">
        {/* Badge */}
        <div
          className="mb-8 inline-flex items-center rounded-full border px-4 py-1.5 text-[13px]"
          style={{
            borderColor: 'var(--av-border)',
            backgroundColor: 'var(--av-surface)',
            color: 'var(--av-text-1)',
          }}
        >
          Now in private beta · Join the waitlist
        </div>

        {/* Headline */}
        <h1
          className="mb-7 max-w-4xl text-[72px] leading-[1.05] tracking-tight"
          style={{ fontFamily: 'var(--font-instrument-serif)', fontWeight: 400, color: 'var(--av-text-1)' }}
        >
          Meta ads that run<br />on autopilot.
        </h1>

        {/* Subheadline */}
        <p
          className="mb-10 max-w-[480px] text-[17px] leading-relaxed"
          style={{ color: 'var(--av-text-2)' }}
        >
          Avora uses AI to generate, optimise, and distribute your
          campaigns across every channel — automatically.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-lg px-5 py-2 text-[13px] font-normal transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#DDDBD8', color: '#888884' }}
          >
            Join waitlist
          </button>
          <button
            className="rounded-lg px-5 py-2 text-[13px] font-normal transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#DDDBD8', color: '#888884' }}
          >
            See how it works
          </button>
        </div>

        {/* Fine print */}
        <p
          className="mt-5 text-[12px]"
          style={{ color: 'var(--av-text-2)' }}
        >
          Early access · No credit card required
        </p>
      </main>

      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
