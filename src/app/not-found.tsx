import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <main
      className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center"
      style={{ fontFamily: 'var(--font-inter)' }}
    >
      <div
        className="text-[14px] uppercase tracking-wider"
        style={{ fontFamily: 'var(--font-fragment-mono)', color: 'var(--av-text-1)' }}
      >
        <span style={{ color: 'var(--av-secondary)' }}>[</span> 404{' '}
        <span style={{ color: 'var(--av-secondary)' }}>]</span>
      </div>

      <h1
        className="mt-6 text-[56px] md:text-[80px] font-semibold leading-[1.02] tracking-tight"
        style={{
          fontFamily:
            "var(--font-playfair)",
          color: 'var(--av-text-1)',
        }}
      >
        Page not found
      </h1>

      <p
        className="mt-5 max-w-md text-[16px] leading-relaxed"
        style={{ color: 'var(--av-text-2)' }}
      >
        The page you&apos;re looking for has either moved or never existed.
      </p>

      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-albert-sans)',
          boxShadow:
            'inset 0 1px 0 rgba(255, 255, 255, 0.45), inset 0 -3px 6px rgba(0, 0, 0, 0.18)',
        }}
        className="btn-blue mt-9 inline-flex items-center rounded-[14px] px-5 py-3 text-[15px] font-semibold"
      >
        Back to home
      </Link>
    </main>
  )
}
