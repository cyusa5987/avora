import { Resend } from 'resend'
import { sql, isDbConfigured } from '@/lib/db'

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

  if (!isDbConfigured || !sql) {
    console.error('Waitlist signup received but DATABASE_URL is not set:', address)
    return Response.json(
      { error: 'Waitlist is not configured yet. Please try again later.' },
      { status: 503 },
    )
  }

  // DB is the source of truth. Dedupe on email; an existing address is still a success.
  let isNew = true
  try {
    const rows = await sql`
      INSERT INTO waitlist_signups (email, source)
      VALUES (${address}, 'landing')
      ON CONFLICT (email) DO NOTHING
      RETURNING id
    `
    isNew = rows.length > 0
  } catch (err) {
    console.error('Waitlist DB insert failed:', err)
    return Response.json({ error: 'Could not submit right now. Please try again.' }, { status: 502 })
  }

  // Best-effort notification — never fail the signup if the email send fails.
  if (isNew) {
    void notifyNewSignup(address)
  }

  return Response.json({ ok: true, alreadyJoined: !isNew })
}

async function notifyNewSignup(address: string) {
  const apiKey = process.env.RESEND_API_KEY
  const notifyTo = process.env.WAITLIST_NOTIFY_TO
  const from = process.env.WAITLIST_FROM ?? 'Avora <onboarding@resend.dev>'
  if (!apiKey || !notifyTo) return

  try {
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from,
      to: [notifyTo],
      replyTo: address,
      subject: `New Avora waitlist signup: ${address}`,
      text: `${address} just joined the Avora waitlist.`,
    })
  } catch (err) {
    console.error('Waitlist notification email failed (signup was still saved):', err)
  }
}
