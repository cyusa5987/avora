'use client'

/* ── Inline brand glyphs (lucide-react@1.x dropped brand icons) ────── */

function XIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2H21.5l-7.5 8.567L23 22h-6.844l-5.36-6.59L4.7 22H1.44l8.018-9.155L1 2h7.018l4.844 6.04L18.244 2zm-1.2 18h1.892L7.05 4H5.04l12.004 16z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18V10H5.67v8h2.67zM7 8.86a1.56 1.56 0 1 0 0-3.11 1.56 1.56 0 0 0 0 3.11zM18.34 18v-4.4c0-2.34-1.25-3.43-2.92-3.43a2.52 2.52 0 0 0-2.29 1.26V10h-2.55v8h2.67v-4.46c0-1.18.22-2.32 1.68-2.32 1.43 0 1.45 1.34 1.45 2.4V18h2.67z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.63 22.42c.58.1.79-.25.79-.56 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.05-.71.08-.7.08-.7 1.16.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.94 10.94 0 0 1 5.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14 0 1.54-.01 2.78-.01 3.16 0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" />
    </svg>
  )
}

/* ── Footer ─────────────────────────────────────────────────────────── */

export function MinimalFooter() {
  const year = new Date().getFullYear()

  const company = [
    { title: 'About', href: '#' },
    { title: 'Careers', href: '#' },
    { title: 'Privacy Policy', href: '#' },
    { title: 'Terms of Service', href: '#' },
  ]

  const resources = [
    { title: 'Blog', href: '#' },
    { title: 'Docs', href: '#' },
    { title: 'Contact', href: '#' },
    { title: 'Status', href: '#' },
  ]

  const socialLinks = [
    { icon: <XIcon />, link: '#', label: 'X' },
    { icon: <LinkedinIcon />, link: '#', label: 'LinkedIn' },
    { icon: <InstagramIcon />, link: '#', label: 'Instagram' },
    { icon: <GithubIcon />, link: '#', label: 'GitHub' },
  ]

  return (
    <footer className="relative">
      <div className="bg-[radial-gradient(35%_80%_at_30%_0%,--theme(--color-foreground/.1),transparent)] mx-auto max-w-4xl md:border-x">
        <div className="bg-border absolute inset-x-0 h-px w-full" />
        <div className="grid max-w-4xl grid-cols-6 gap-6 p-4">
          <div className="col-span-6 flex flex-col gap-5 md:col-span-4">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              className="flex items-center gap-2 w-max transition-opacity hover:opacity-75"
            >
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
                <rect width="26" height="26" rx="7" fill="#0059FF" />
                <path d="M7.5 19.5L13 8L18.5 19.5" stroke="white" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="9.8" y1="16" x2="16.2" y2="16" stroke="white" strokeWidth="2.1" strokeLinecap="round" />
              </svg>
              <span className="text-[16px] font-bold tracking-tight" style={{ fontFamily: 'var(--font-syne)', color: 'var(--av-wordmark)' }}>
                avora
              </span>
            </a>
            <p className="text-muted-foreground max-w-sm font-mono text-sm text-balance">
              AI that creates, launches and optimises your Meta ad campaigns automatically.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  className="hover:bg-accent rounded-md border p-1.5"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  href={item.link}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-muted-foreground mb-1 text-xs">Resources</span>
            <div className="flex flex-col gap-1">
              {resources.map(({ href, title }) => (
                <a key={title} className="w-max py-1 text-sm duration-200 hover:underline" href={href}>
                  {title}
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-muted-foreground mb-1 text-xs">Company</span>
            <div className="flex flex-col gap-1">
              {company.map(({ href, title }) => (
                <a key={title} className="w-max py-1 text-sm duration-200 hover:underline" href={href}>
                  {title}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-border absolute inset-x-0 h-px w-full" />
        <div className="flex max-w-4xl flex-col justify-between gap-2 pt-2 pb-5">
          <p className="text-muted-foreground text-center font-thin">
            © Avora. All rights reserved {year}
          </p>
        </div>
      </div>
    </footer>
  )
}
