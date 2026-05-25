'use client'

import { motion } from 'framer-motion'

interface McpSectionProps {
  onPrimaryClick: () => void
}

/* ── Floating brand tiles (right side) ──────────────────────── */

const FLOATING_LOGOS = [
  {
    id: 'hermes',
    name: 'Hermes',
    x: '4%',
    y: '6%',
    size: 132,
    iconUrl: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/nousresearch.svg',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    x: '62%',
    y: '4%',
    size: 132,
    iconUrl: 'https://api.iconify.design/hugeicons/chat-gpt.svg?color=%23ffffff',
  },
  {
    id: 'claude',
    name: 'Claude',
    x: '10%',
    y: '58%',
    size: 132,
    iconUrl: 'https://api.iconify.design/simple-icons/claude.svg?color=%23ffffff',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    x: '60%',
    y: '60%',
    size: 132,
    iconUrl: 'https://api.iconify.design/simple-icons/cursor.svg?color=%23ffffff',
  },
]

export function McpSection({ onPrimaryClick }: McpSectionProps) {
  return (
    <section id="mcp" className="px-6 py-32" style={{ fontFamily: 'var(--font-inter)' }}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-12 text-center text-[14px] uppercase tracking-wider"
          style={{ fontFamily: 'var(--font-fragment-mono)', color: 'var(--av-text-1)' }}
        >
          <span style={{ color: 'var(--av-secondary)' }}>[</span> MCP{' '}
          <span style={{ color: 'var(--av-secondary)' }}>]</span>
        </motion.div>

        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
          {/* ── Left: copy + CTAs ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <h2
              className="text-[44px] md:text-[60px] leading-[1.04] tracking-tight"
              style={{
                fontFamily:
                  "var(--font-playfair)",
                fontWeight: 600,
                color: 'var(--av-text-1)',
              }}
            >
              The ads layer,<br />callable from anywhere.
            </h2>

            <p
              className="mt-7 max-w-xl text-[17px] leading-relaxed"
              style={{ color: 'var(--av-text-2)' }}
            >
              Avora turns your Meta campaigns into a working system that Claude, Cursor,
              ChatGPT, and any other tool can call via MCP or API.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <button
                onClick={onPrimaryClick}
                style={{
                  fontFamily: 'var(--font-albert-sans)',
                  boxShadow:
                    'inset 0 1px 0 rgba(255, 255, 255, 0.45), inset 0 -3px 6px rgba(0, 0, 0, 0.18)',
                }}
                className="btn-blue inline-flex items-center rounded-[14px] px-5 py-3 text-[15px] font-semibold"
              >
                Set up Avora MCP
              </button>
            </div>
          </motion.div>

          {/* ── Right: floating integration tiles ── */}
          <div className="relative mx-auto aspect-square w-full max-w-[460px]">
            {/* radial backdrop glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at center, rgba(0,89,255,0.12) 0%, transparent 70%)',
              }}
            />

            {FLOATING_LOGOS.map((logo, i) => (
              <motion.div
                key={logo.id}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="absolute"
                style={{
                  left: logo.x,
                  top: logo.y,
                  width: logo.size,
                  height: logo.size,
                }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4 + i * 0.7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.3,
                  }}
                  className="flex size-full items-center justify-center rounded-2xl"
                  style={{
                    background:
                      'linear-gradient(155deg, #4D86FF 0%, #0059FF 55%, #0042CC 100%)',
                    border: '1px solid rgba(255,255,255,0.22)',
                    boxShadow:
                      '0 1px 0 rgba(255,255,255,0.35) inset, 0 14px 34px rgba(0,89,255,0.38), 0 3px 8px rgba(0,40,140,0.22)',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.iconUrl}
                    alt={`${logo.name} logo`}
                    width={logo.size * 0.52}
                    height={logo.size * 0.52}
                    style={{
                      width: logo.size * 0.52,
                      height: logo.size * 0.52,
                      filter: 'brightness(0) invert(1)',
                    }}
                    loading="lazy"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
