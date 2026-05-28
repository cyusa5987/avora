'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useTheme } from '@/lib/theme-context'

interface WaitlistModalProps {
  open: boolean
  onClose: () => void
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const SF =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif'

export function WaitlistModal({ open, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [alreadyJoined, setAlreadyJoined] = useState(false)
  const [mounted, setMounted] = useState(false)
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

  useEffect(() => {
    if (open) {
      setEmail('')
      setSubmitted(false)
      setSubmitting(false)
      setError(null)
      setAlreadyJoined(false)
    }
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
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        setError(data?.error ?? 'Something went wrong. Please try again.')
        return
      }
      setAlreadyJoined(Boolean(data?.alreadyJoined))
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
            className="fixed inset-0 z-[100] bg-black/55 backdrop-blur-md"
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="waitlist-modal-title"
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[400px] rounded-[20px] border p-7"
              style={{
                background: isDark ? '#1A1A1A' : '#FFFFFF',
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                boxShadow: isDark
                  ? '0 32px 80px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)'
                  : '0 32px 80px -12px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.9)',
                fontFamily: SF,
              }}
            >
              <button
                onClick={onClose}
                className={`absolute right-3.5 top-3.5 grid place-items-center rounded-lg w-7 h-7 transition-colors cursor-pointer ${
                  isDark
                    ? 'text-white/45 hover:text-white hover:bg-white/[0.06]'
                    : 'text-black/40 hover:text-black hover:bg-black/[0.06]'
                }`}
                aria-label="Close"
              >
                <X className="size-4" />
              </button>

              {!submitted ? (
                <>
                  <div className="mb-4 flex items-center">
                    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
                      <rect width="32" height="32" rx="7" fill="#000000" />
                      <circle cx="16" cy="16" r="9" fill="#3E6DF2" />
                    </svg>
                  </div>

                  <h2
                    id="waitlist-modal-title"
                    className="text-[18px] font-semibold leading-snug pr-6"
                    style={{ letterSpacing: '-0.01em', color: isDark ? '#ffffff' : '#111111' }}
                  >
                    Join the Avora waitlist
                  </h2>

                  <p
                    className="mt-2 text-[13.5px] leading-relaxed"
                    style={{ color: isDark ? 'rgba(255,255,255,0.55)' : '#5A5856' }}
                  >
                    Drop your email and we&apos;ll let you know the moment Avora opens up.
                  </p>

                  <label htmlFor="waitlist-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="waitlist-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (error) setError(null)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !submitting) submit()
                    }}
                    placeholder="you@example.com"
                    disabled={submitting}
                    autoComplete="email"
                    autoFocus
                    className={`mt-5 w-full rounded-xl border px-4 text-[13.5px] outline-none transition-colors duration-200 disabled:opacity-60 ${
                      isDark
                        ? 'placeholder:text-white/30 text-white'
                        : 'placeholder:text-black/30'
                    }`}
                    style={{
                      height: 44,
                      background: isDark ? '#0F0F0F' : '#F5F5F5',
                      color: isDark ? '#ffffff' : '#111111',
                      borderColor: error
                        ? 'rgba(239,68,68,0.55)'
                        : isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)',
                      boxShadow: error
                        ? 'none'
                        : isDark
                        ? 'inset 0 1px 0 rgba(255,255,255,0.02)'
                        : 'inset 0 1px 2px rgba(0,0,0,0.04)',
                    }}
                    onFocus={(e) => {
                      if (!error) {
                        e.currentTarget.style.borderColor = 'rgba(62,109,242,0.55)'
                        e.currentTarget.style.boxShadow = '0 0 0 3px rgba(62,109,242,0.18)'
                      }
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = error
                        ? 'rgba(239,68,68,0.55)'
                        : isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)'
                      e.currentTarget.style.boxShadow = error
                        ? 'none'
                        : isDark
                        ? 'inset 0 1px 0 rgba(255,255,255,0.02)'
                        : 'inset 0 1px 2px rgba(0,0,0,0.04)'
                    }}
                  />

                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 text-[12px] text-red-400"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <motion.button
                    whileTap={submitting ? undefined : { scale: 0.98 }}
                    onClick={() => {
                      if (!submitting) submit()
                    }}
                    disabled={!email || submitting}
                    className="mt-4 w-full inline-flex items-center justify-center rounded-full text-[14px] font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed transition-transform duration-150 cursor-pointer"
                    style={{
                      height: 44,
                      background: 'linear-gradient(180deg, #5B85FF 0%, #2D54E0 100%)',
                      boxShadow:
                        '0 6px 16px -4px rgba(45,84,224,0.45), 0 1px 2px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.18)',
                    }}
                  >
                    {submitting ? 'Joining…' : 'Notify me'}
                  </motion.button>

                  <p
                    className="mt-3 text-center text-[11.5px]"
                    style={{ color: isDark ? 'rgba(255,255,255,0.40)' : 'rgba(0,0,0,0.40)' }}
                  >
                    No spam. We&apos;ll only email you when access opens.
                  </p>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center py-2 text-center"
                >
                  <div
                    className="mb-4 grid place-items-center rounded-full"
                    style={{
                      width: 44,
                      height: 44,
                      background: 'rgba(62,109,242,0.14)',
                      border: '1px solid rgba(62,109,242,0.35)',
                    }}
                  >
                    <Check size={20} strokeWidth={2.4} className="text-[#5B85FF]" />
                  </div>
                  <h2
                    className="text-[17px] font-semibold"
                    style={{ letterSpacing: '-0.01em', color: isDark ? '#ffffff' : '#111111' }}
                  >
                    {alreadyJoined ? "You're already on the list" : "You're on the list"}
                  </h2>
                  <p
                    className="mt-2 text-[13.5px] leading-relaxed max-w-[280px]"
                    style={{ color: isDark ? 'rgba(255,255,255,0.55)' : '#5A5856' }}
                  >
                    {alreadyJoined ? (
                      <>
                        We already have{' '}
                        <span style={{ color: isDark ? 'rgba(255,255,255,0.85)' : '#111111' }}>{email}</span>.{' '}
                        We&apos;ll reach out as soon as Avora opens.
                      </>
                    ) : (
                      <>
                        We&apos;ll reach out to{' '}
                        <span style={{ color: isDark ? 'rgba(255,255,255,0.85)' : '#111111' }}>{email}</span>{' '}
                        the moment Avora is ready.
                      </>
                    )}
                  </p>
                  <button
                    onClick={onClose}
                    className={`mt-5 inline-flex items-center justify-center rounded-full px-5 text-[13px] font-medium transition-colors cursor-pointer ${
                      isDark
                        ? 'text-white/80 hover:bg-white/[0.06] hover:text-white'
                        : 'text-black/60 hover:bg-black/[0.05] hover:text-black'
                    }`}
                    style={{
                      height: 36,
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`,
                    }}
                  >
                    Close
                  </button>
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
