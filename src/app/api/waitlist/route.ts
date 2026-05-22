import { Resend } from 'resend'

// Basic RFC-5322-ish email check — good enough to reject obvious junk.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  let email: unknown
  try {
    ({ email } = await request.json())
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (typeof email !== 'string' || !EMAIL_RE.test(email.trim())) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }
  const address = email.trim().toLowerCase()

  const apiKey = process.env.RESEND_API_KEY
  const notifyTo = process.env.WAITLIST_NOTIFY_TO
  // Resend's shared sandbox sender works without domain verification for testing.
  const from = process.env.WAITLIST_FROM ?? 'Avora <onboarding@resend.dev>'

  if (!apiKey || !notifyTo) {
    console.error('Waitlist signup received but RESEND_API_KEY / WAITLIST_NOTIFY_TO are not set:', address)
    return Response.json(
      { error: 'Waitlist is not configured yet. Please try again later.' },
      { status: 503 },
    )
  }

  const resend = new Resend(apiKey)

  try {
    const { error } = await resend.emails.send({
      from,
      to: [notifyTo],
      replyTo: address,
      subject: `New Avora waitlist signup: ${address}`,
      text: `${address} just joined the Avora waitlist.`,
    })

    if (error) {
      console.error('Resend error:', error)
      return Response.json({ error: 'Could not submit right now. Please try again.' }, { status: 502 })
    }
  } catch (err) {
    console.error('Waitlist send failed:', err)
    return Response.json({ error: 'Could not submit right now. Please try again.' }, { status: 502 })
  }

  return Response.json({ ok: true })
}
