'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface WaitlistModalProps {
  open: boolean
  onClose: () => void
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function WaitlistModal({ open, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (open) { setEmail(''); setSubmitted(false); setSubmitting(false); setError(null) }
  }, [open])

  const submit = async () => {
    const value = email.trim()
    if (!EMAIL_RE.test(value)) {
      setError('Please enter a valid email address.')
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        setError(data?.error ?? 'Something went wrong. Please try again.')
        return
      }
      setSubmitted(true)
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-2xl border p-6 shadow-2xl"
              style={{
                backgroundColor: 'var(--av-surface)',
                borderColor: 'var(--av-border)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
              }}
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-lg p-1 transition-opacity opacity-30 hover:opacity-70"
                style={{ color: 'var(--av-text-1)' }}
                aria-label="Close"
              >
                <X className="size-4" />
              </button>

              {!submitted ? (
                <>
                  <h2
                    id="modal-title"
                    style={{ fontFamily: 'var(--font-albert-sans)', color: 'var(--av-text-1)' }}
                    className="text-[17px] font-bold leading-snug pr-6"
                  >
                    Join the Avora waitlist
                  </h2>

                  <p style={{ color: 'var(--av-text-2)' }} className="mt-2 text-[13px] leading-relaxed">
                    Drop your email and we'll let you know the moment Avora opens up.
                  </p>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (error) setError(null) }}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !submitting) submit() }}
                    placeholder="you@example.com"
                    disabled={submitting}
                    className="mt-5 w-full rounded-xl border px-4 py-2.5 text-[13px] outline-none transition-colors duration-200 focus:ring-1 focus:ring-[#0059FF]/30 focus:border-[#0059FF]/50 disabled:opacity-60"
                    style={{
                      backgroundColor: 'var(--av-input-bg)',
                      borderColor: error ? 'rgba(239,68,68,0.6)' : 'var(--av-input-border)',
                      color: 'var(--av-text-1)',
                    }}
                  />

                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 text-[12px]"
                        style={{ color: '#ef4444' }}
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <motion.button
                    whileHover={submitting ? undefined : { scale: 1.02, filter: 'brightness(1.06)' }}
                    whileTap={submitting ? undefined : { scale: 0.97 }}
                    onClick={() => { if (!submitting) submit() }}
                    disabled={!email || submitting}
                    className="mt-3 w-full rounded-2xl py-3 text-[13px] font-semibold text-white disabled:opacity-40 transition-[filter] duration-150"
                    style={{
                      fontFamily: 'var(--font-albert-sans)',
                      background: 'linear-gradient(to bottom, #3D7DFF 0%, #0059FF 100%)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.32), 0 4px 18px rgba(0,89,255,0.42)',
                      border: '1px solid rgba(0,0,0,0.12)',
                    }}
                  >
                    {submitting ? 'Joining…' : 'Notify me'}
                  </motion.button>

                  <p style={{ color: 'var(--av-text-2)' }} className="mt-3 text-center text-[11px]">
                    No spam. We'll only email you when access opens.
                  </p>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center py-4 text-center"
                >
                  <div className="mb-4 flex size-10 items-center justify-center rounded-full" style={{ background: 'rgba(0,89,255,0.18)' }}>
                    <span className="text-lg">✦</span>
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-syne)', color: 'var(--av-text-1)' }} className="text-[16px] font-bold">
                    You're on the list
                  </h2>
                  <p style={{ color: 'var(--av-text-2)' }} className="mt-2 text-[13px] leading-relaxed">
                    We'll reach out to <span style={{ color: 'var(--av-text-1)', opacity: 0.7 }}>{email}</span> when Avora is ready.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
