'use client'

import { ArrowUp } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'

function OpenAIIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.032.067L9.67 19.95a4.5 4.5 0 0 1-6.07-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.677l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.843-3.369 2.02-1.168a.076.076 0 0 1 .071 0l4.83 2.786a4.494 4.494 0 0 1-.676 8.108V12.48a.797.797 0 0 0-.402-.729zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
    </svg>
  )
}

function GeminiIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none">
      <path d="M12 2C12 2 8.5 8.5 2 12C8.5 15.5 12 22 12 22C12 22 15.5 15.5 22 12C15.5 8.5 12 2Z" fill="url(#gem2)"/>
      <defs>
        <linearGradient id="gem2" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4285F4"/><stop offset="1" stopColor="#EA4335"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

function ClaudeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none">
      <circle cx="12" cy="12" r="10" fill="#D97757"/>
      <path d="M8 16l2.5-8M13.5 16L16 8M9.5 13h5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function PerplexityIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none">
      <circle cx="12" cy="12" r="10" fill="#1FB8CD"/>
      <path d="M12 5v14M7.5 8.5L12 5l4.5 3.5M7.5 15.5L12 19l4.5-3.5M7.5 8.5v7M16.5 8.5v7" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function NotionIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor">
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 2.028c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933z"/>
    </svg>
  )
}

const adCards = [
  { brand: 'Summer Drop', bg: 'linear-gradient(135deg,#f97316,#fb923c)', text: 'SHOP THE\nSUMMER\nSALE →' },
  { brand: 'Glow Co',     bg: 'linear-gradient(135deg,#ec4899,#f472b6)', text: 'VITAMIN C\nBRIGHTENING\nSERUM' },
  { brand: 'Avora',       bg: 'linear-gradient(135deg,#2786B9,#4DA5D4)', text: 'AI ADS\nON\nAUTOPILOT' },
  { brand: 'Topicals',    bg: 'linear-gradient(135deg,#6366f1,#818cf8)', text: 'SAVINGS\nEVENT\nNOW LIVE' },
  { brand: 'Bold Brand',  bg: 'linear-gradient(135deg,#eab308,#facc15)', text: '30% OFF\nSITE\nWIDE' },
]

const works = [
  { Icon: OpenAIIcon,     label: 'ChatGPT' },
  { Icon: GeminiIcon,     label: 'Gemini' },
  { Icon: ClaudeIcon,     label: 'Claude' },
  { Icon: PerplexityIcon, label: 'Perplexity' },
  { Icon: NotionIcon,     label: 'Notion' },
]

const PROMPTS = [
  'Show me my top performing ads this week',
  'Which campaign has the best ROAS?',
  'Pause underperforming ad sets',
  'Scale my winning creatives by 20%',
  "What's my average CPM this month?",
  "Summarise yesterday's performance",
]

const TYPE_SPEED = 38
const DELETE_SPEED = 18
const PAUSE_AFTER_TYPE = 1800
const PAUSE_AFTER_DELETE = 400

function LoopingPrompt() {
  const [displayed, setDisplayed] = useState('')
  const [promptIdx, setPromptIdx] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting' | 'waiting'>('typing')
  const charIdx = useRef(0)

  useEffect(() => {
    const target = PROMPTS[promptIdx]

    if (phase === 'typing') {
      if (charIdx.current >= target.length) {
        setPhase('pausing')
        return
      }
      const t = setTimeout(() => {
        charIdx.current += 1
        setDisplayed(target.slice(0, charIdx.current))
        // stay in typing phase
      }, TYPE_SPEED)
      return () => clearTimeout(t)
    }

    if (phase === 'pausing') {
      const t = setTimeout(() => setPhase('deleting'), PAUSE_AFTER_TYPE)
      return () => clearTimeout(t)
    }

    if (phase === 'deleting') {
      if (charIdx.current === 0) {
        setPhase('waiting')
        return
      }
      const t = setTimeout(() => {
        charIdx.current -= 1
        setDisplayed(target.slice(0, charIdx.current))
      }, DELETE_SPEED)
      return () => clearTimeout(t)
    }

    if (phase === 'waiting') {
      const t = setTimeout(() => {
        setPromptIdx((i) => (i + 1) % PROMPTS.length)
        setPhase('typing')
      }, PAUSE_AFTER_DELETE)
      return () => clearTimeout(t)
    }
  }, [phase, displayed, promptIdx])

  return (
    <p className="text-[15px] min-h-[24px]" style={{ color: 'var(--av-text-1)' }}>
      {displayed}
      <span
        className="inline-block w-[2px] h-[1em] ml-[1px] align-middle"
        style={{
          backgroundColor: '#2786B9',
          animation: 'blink 1s step-end infinite',
        }}
      />
    </p>
  )
}

export function McpSection() {
  return (
    <>
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
      <section id="mcp" className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="flex items-start justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <h2
                className="text-[48px] md:text-[56px] leading-[1.08] tracking-tight mb-4"
                style={{ fontFamily: 'var(--font-instrument-serif)', fontWeight: 400, color: 'var(--av-text-1)' }}
              >
                Ask your AI.
              </h2>
              <p className="text-[16px] leading-relaxed" style={{ color: 'var(--av-text-2)' }}>
                Connect to Claude, ChatGPT, Perplexity and more to pull{' '}
                <span style={{ color: 'var(--av-text-1)' }}>campaigns</span>,{' '}
                <span style={{ color: 'var(--av-text-1)' }}>creatives</span>,{' '}
                <span style={{ color: 'var(--av-text-1)' }}>performance data</span>,
                {' '}and everything else Avora tracks.
              </p>
            </div>
            <button
              className="flex-shrink-0 rounded-full px-5 py-2.5 text-[13px] font-medium transition-opacity hover:opacity-70 mt-2 cursor-pointer"
              style={{
                backgroundColor: 'var(--av-card)',
                border: '1px solid var(--av-border)',
                color: 'var(--av-text-1)',
              }}
            >
              Learn more
            </button>
          </div>

          {/* Widget card */}
          <div
            className="rounded-2xl overflow-hidden border"
            style={{ borderColor: 'var(--av-border)', backgroundColor: 'var(--av-surface)' }}
          >
            {/* Ad cards strip */}
            <div className="flex gap-3 px-5 pt-5 pb-4 overflow-x-auto border-b" style={{ borderColor: 'var(--av-border)' }}>
              {adCards.map((card, i) => (
                <div key={i} className="flex-shrink-0 rounded-xl overflow-hidden border" style={{ borderColor: 'var(--av-border)', width: 128 }}>
                  <div className="flex flex-col justify-between px-3 py-2.5 h-[108px]" style={{ background: card.bg }}>
                    <span className="text-[9px] font-semibold text-white/80">{card.brand}</span>
                    <span className="text-[11px] font-black text-white leading-tight whitespace-pre-line">{card.text}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Animated prompt input */}
            <div className="px-5 py-4">
              <LoopingPrompt />
              <div className="flex items-center justify-between mt-4">
                <div
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium"
                  style={{
                    backgroundColor: 'rgba(39,134,185,0.1)',
                    border: '1px solid rgba(39,134,185,0.25)',
                    color: '#2786B9',
                  }}
                >
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: '#2786B9' }} />
                  Avora
                  <span className="opacity-50 ml-0.5 text-[11px]">×</span>
                </div>
                <button
                  className="h-8 w-8 rounded-full flex items-center justify-center text-white cursor-pointer"
                  style={{ backgroundColor: '#2786B9' }}
                >
                  <ArrowUp className="size-4" />
                </button>
              </div>
            </div>

            {/* Works with */}
            <div
              className="flex flex-col items-center gap-3 py-5 border-t"
              style={{ borderColor: 'var(--av-border)', backgroundColor: 'var(--av-subtle)' }}
            >
              <p className="text-[12px]" style={{ color: 'var(--av-text-2)' }}>Works with</p>
              <div className="flex items-center gap-3">
                {works.map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="h-9 w-9 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: 'var(--av-surface)',
                      border: '1px solid var(--av-border)',
                      color: 'var(--av-text-1)',
                    }}
                    title={label}
                  >
                    <Icon />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
