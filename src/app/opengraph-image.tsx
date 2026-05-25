import { ImageResponse } from 'next/og'
import { BRAND_BLUE, BRAND_BG, SITE_NAME } from '@/lib/site'

export const alt = 'Avora — AI for Meta ads, callable from anywhere'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: BRAND_BG,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          position: 'relative',
          color: '#ffffff',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -260,
            right: -180,
            width: 680,
            height: 680,
            borderRadius: 9999,
            background: BRAND_BLUE,
            opacity: 0.32,
            filter: 'blur(120px)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -240,
            left: -160,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: BRAND_BLUE,
            opacity: 0.22,
            filter: 'blur(140px)',
            display: 'flex',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <div
            style={{
              width: 84,
              height: 84,
              background: BRAND_BLUE,
              borderRadius: 22,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: -3,
              boxShadow: '0 12px 40px rgba(0,89,255,0.45)',
            }}
          >
            a
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              letterSpacing: -2,
            }}
          >
            {SITE_NAME.toLowerCase()}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -3.5,
              maxWidth: 980,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span>The ads layer,</span>
            <span style={{ color: '#9DB7FF' }}>callable from anywhere.</span>
          </div>

          <div
            style={{
              fontSize: 28,
              color: 'rgba(255,255,255,0.72)',
              maxWidth: 880,
              lineHeight: 1.35,
              display: 'flex',
            }}
          >
            AI that builds, launches and improves your Meta campaigns —
            reachable from Claude, Cursor and ChatGPT via MCP.
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
